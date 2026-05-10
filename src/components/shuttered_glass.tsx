import { useRef, useEffect } from "react";
import { getAgent, step, type Agent } from "../lib/agent";
import { rotate } from "../lib/vector2";

export default function ShatteredGlass() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const realCanvas = canvasRef.current;
        if (!realCanvas) return;
        const canvas = realCanvas;
        const realctx = canvas.getContext("2d");
        if (!realctx) return;
        const ctx = realctx;
        let animationId: number;

        function sfc32(a: number, b: number, c: number, d: number) {
            return function () {
                a |= 0; b |= 0; c |= 0; d |= 0;
                let t = (a + b | 0) + d | 0;
                d = d + 1 | 0;
                a = b ^ b >>> 9;
                b = c + (c << 3) | 0;
                c = (c << 21 | c >>> 11);
                c = c + t | 0;
                return (t >>> 0) / 4294967296;
            }
        }

        const getRand = sfc32(2177591200, 398881965, 2286335670, 118324663);

        function start() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            ctx.fillStyle = "#1a1d23";
            ctx.fillRect(0, 0, width, height);

            ctx.imageSmoothingEnabled = false;

            let agents = [] as Agent[]
            const angle = 15
            const centerX = 2;
            const centerY = 2;
            const maxDepth = 8; // Limit recursion depth
            const maxAgents = 5000; // Limit total agents

            // Initialize agents from center
            for (let i = 0; i < 6; i++) {
                const new_agent = getAgent(
                    centerX,
                    centerY,
                    rotate({ x: 1, y: 0 }, i * angle),
                    5,
                    Math.sqrt(Math.pow(width,2)+Math.pow(height,2))/10,
                    20,
                    "#4a5568",
                )
                new_agent.depth = 0; // Track depth
                agents.push(new_agent)
            }

            function iterate() {
                if (agents.length <= 0) {
                    return;
                }

                // Safety check: stop if too many agents
                if (agents.length > maxAgents) {
                    agents = agents.slice(0, maxAgents);
                }

                ctx.fillStyle = `rgba(26, 29, 35, 0.0015)`;
                ctx.fillRect(0, 0, width, height);

                for (let i = agents.length - 1; i >= 0; i--) {
                    const agent = agents[i];

                    step(agent, 0, ctx);

                    const n = (offset: number) => {
                        const new_agent = getAgent(
                            agent.pos.x,
                            agent.pos.y,
                            rotate(agent.dir, offset),
                            agent.speed * 0.9, // Slower branches
                            Math.max(agent.iter_left_init * 0.4, 10), // Minimum length
                            agent.divider,
                            "#4a5568",
                        )
                        new_agent.depth = (agent.depth || 0) + 1;
                        return new_agent
                    }

                    if (agent.iter_repeat_left <= 0) {
                        const depth = agent.depth || 0;
                        // Decrease branching chance with depth
                        const branchChance = Math.max(0.1 - (depth * 0.003), 0.005);

                        if (depth < maxDepth && getRand() < branchChance) {
                            const ba = getRand() * 45;
                            agents.push(n(ba * (getRand() * 0.8 + 0.2)));
                        }
                        if (depth < maxDepth && getRand() < branchChance) {
                            const ba = getRand() * 45;
                            agents.push(n(-ba * (getRand() * 0.8 + 0.2)));
                        }
                        agent.iter_repeat_left = agent.iter_repeat
                    }

                    if (agent.iter_left <= 0) {
                        const depth = agent.depth || 0;
                        // Final branching with depth penalty
                        const endChance = Math.max(0.2 - (depth * 0.04), 0.05);

                        if (depth < maxDepth && getRand() < endChance) {
                            const ba = getRand() * 45;
                            agents.push(n(ba * (getRand() * 0.8 + 0.2)));
                        }
                        if (depth < maxDepth && getRand() < endChance) {
                            const ba = getRand() * 45;
                            agents.push(n(-ba * (getRand() * 0.8 + 0.2)));
                        }
                        agents.splice(i, 1);
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
        />
    );
}