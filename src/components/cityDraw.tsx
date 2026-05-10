import { useRef, useEffect } from "react";
import { getAgent, rotate_agent, step, type Agent } from "../lib/agent";
import { rotate } from "../lib/vector2";

export default function CityDraw() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const realCanvas = canvasRef.current;
        if (!realCanvas) return;
        const canvas = realCanvas;
        const realctx = canvas.getContext("2d");
        if (!realctx) return;
        const ctx = realctx;
        let animationId: number;

        function start() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            ctx.fillStyle = "#1a1d23";
            ctx.fillRect(0, 0, width, height);

            ctx.imageSmoothingEnabled = false;

            let agents = [] as Agent[]
            const phi = 1.61803399
            const pi = 3.14159265359
            const angle = 60
            for (let i = 0; i < 460 / angle; i++) {
                const new_agent = getAgent(
                    width / 2,
                    height / 2,
                    rotate({ x: 1, y: 1 }, angle * i),
                    5,
                    60,
                    30,
                    "white",
                )
                agents.push(new_agent)
            }

            function iterate() {
                if(agents.length <= 0){
                    return;
                }
                ctx.fillStyle = `rgba(26, 29, 35, 0.005)`;
                ctx.fillRect(0, 0, width, height);


                for (let i = agents.length - 1; i >= 0; i--) {
                    const agent = agents[i];

                    step(agent, 1.5*-Math.sin(agent.speed), ctx);

                    if (agent.iter_left <= 0) {
                        agents.splice(i, 1);
                    }
                    if (agent.iter_repeat_left <= 0) {
                            let used = agent.iter_left_init - agent.iter_left
                            let progress = used / agent.iter_left_init

                            if (progress >= 1) {
                                progress = 0
                                used = 0
                            }
                            const new_agent = getAgent(
                                agent.pos.x,
                                agent.pos.y,
                                agent.dir,
                                agent.speed * (progress),
                                agent.iter_left_init*(progress)/2,
                                agent.divider,
                                "pink",
                            )
                            rotate_agent(new_agent, 90)

                            agent.iter_repeat *= 1.61803399
                            agent.iter_repeat_left = agent.iter_repeat
                            agents.push(new_agent)

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