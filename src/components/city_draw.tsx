import { useRef, useEffect } from "react";
import { getAgent, rotate_agent, step, type Agent } from "../lib/agent";
import { rotate } from "../lib/vector2";

export default function CityDraw() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const realCanvas = canvasRef.current;
        if (!realCanvas) return;
        const canvas = realCanvas;
        const realctx = canvas.getContext("2d", { alpha: false });
        if (!realctx) return;
        const ctx = realctx;
        let animationId: number;

        function start() {
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Set display size (css pixels)
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            // Set actual size in memory (scaled to account for extra pixel density)
            canvas.width = width * dpr;
            canvas.height = height * dpr;

            // Scale all drawing operations by the dpr
            ctx.scale(dpr, dpr);

            // Enable image smoothing for sharper lines
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            ctx.fillStyle = "#1a1d23";
            ctx.fillRect(0, 0, width, height);

            let agents = [] as Agent[]
            const angle = 60

            function spawnAgent(agent: Agent) {
                const used = agent.iter_left_init - agent.iter_left
                const progress = used / agent.iter_left_init

                const new_agent = getAgent(
                    agent.pos.x,
                    agent.pos.y,
                    agent.dir,
                    agent.speed,
                    used * (1 - progress),
                    agent.divider,
                    "pink",
                )
                rotate_agent(new_agent, 90)
                agents.push(new_agent)
            }

            const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
            const halfDiagonal = diagonal / 2

            for (let i = 0; i < 460 / angle; i++) {
                const new_agent = getAgent(
                    width / 2,
                    height / 2,
                    rotate({ x: 1, y: 1 }, angle * i),
                    1,
                    halfDiagonal / 3,
                    60,
                    "white",
                    spawnAgent
                )
                agents.push(new_agent)
            }

            let stepping = 0;
            function iterate() {
                stepping += 10
                
                if (agents.length <= 0) {
                    return;
                }

                for (let i = agents.length - 1; i >= 0; i--) {
                    const agent = agents[i];

                    step(agent, 3 * Math.sin(stepping * 0.01) * 0.5, ctx);

                    if (agent.iter_left <= 0) {
                        agents.splice(i, 1);
                    }
                    if (agent.iter_repeat_left <= 0) {
                        if (agent.action) {
                            agent.action(agent);
                            agent.iter_repeat_left = agent.iter_repeat
                        }
                    }
                }

                animationId = requestAnimationFrame(iterate);
            }
            iterate()
        }

        start();

        function handleResize() {
            cancelAnimationFrame(animationId);
            start();
        }

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            style={{ imageRendering: 'crisp-edges' }}
        />
    );
}