import { useRef, useEffect } from "react";

export default function FireBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const pixelSize = 6;
    const stages = [
        "#090909", // black
        "#111217", // near black smoke
        "#1a1d23", // dark charcoal
        "#2a1f1a", // burnt brown
        "#3b1f14", // deep ember
        "#5a1e0e", // dark red
        "#7a1d0c", // hot red
        "#9f2a0a", // lava red
        "#c43c06", // orange-red
        "#e85d04", // strong orange
        "#f48c06", // amber
        "#faa307", // bright amber
        "#ffba08", // golden
        "#ffd166", // warm yellow
        "#ffe29a", // pale yellow
        "#fff1c1", // near white
        "#ffffff", // white hot
    ];
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

            const cols = Math.floor(width / pixelSize);
            const rows = Math.floor(height / pixelSize);

            canvas.width = width;
            canvas.height = height;

            ctx.imageSmoothingEnabled = false;

            let cur = Array.from({ length: rows }, () =>
                Array(cols).fill(0)
            );

            let next = Array.from({ length: rows }, () =>
                Array(cols).fill(0)
            );

            function drawCell(x: number, y: number, state: number) {
                const index = Math.max(
                    0,
                    Math.min(stages.length - 1, Math.floor(state))
                );

                ctx.fillStyle = stages[index];

                ctx.fillRect(
                    x * pixelSize,
                    y * pixelSize,
                    pixelSize,
                    pixelSize
                );
            }

            function iterate() {
                // random fire source at bottom
                for (let x = 0; x < cols; x++) {
                    cur[rows - 1][x] =
                        Math.random() > 0.3
                            ? stages.length - 1
                            : 0;
                }

                for (let y = 0; y < rows - 1; y++) {
                    for (let x = 0; x < cols; x++) {

                        const belowLeft = cur[y + 1]?.[x - 1] ?? 0;
                        const below = cur[y + 1]?.[x] ?? 0;
                        const belowRight = cur[y + 1]?.[x + 1] ?? 0;
                        const left = cur[y]?.[x - 1] ?? 0;
                        const current = cur[y]?.[x] ?? 0;
                        const right = cur[y]?.[x + 1] ?? 0;

                        let value =
                            (below +
                                belowLeft +
                                belowRight +
                                + left
                                + right
                                + current) /
                            6 -
                            Math.random() * 0.2;

                        value = Math.max(0, value);

                        next[y][x] = value;

                        drawCell(x, y, value);
                    }
                }

                [cur, next] = [next, cur];

                animationId = requestAnimationFrame(iterate);
            }

            iterate();
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