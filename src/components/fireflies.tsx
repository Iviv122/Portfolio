/*
*
*   This is my own cellular automata,
*   i have no idea if someone came with this before me but i thought it would be cool
*   to implement this one
*   
*    *
*   *X* every cell has 4 neighbours, and new state is defined the same way as wolfram 1d automatas
*    *
*/

import { useRef, useEffect } from "react";

export default function Fireflies() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const pixel_size = 6;


    useEffect(() => {
        const realCanvas = canvasRef.current;
        if (!realCanvas) return;
        const canvas = realCanvas;
        const realctx = canvas.getContext("2d");
        if (!realctx) return;
        const ctx = realctx;

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
        let animationId: number;
        const getRand = sfc32(2177591200, 398881965, 2286335670, 118324663);

        function start() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const cols = Math.floor(width / pixel_size);
            const rows = Math.floor(height / pixel_size);
            const defog_speed = 4.785;

            canvas.width = width;
            canvas.height = height;

            ctx.imageSmoothingEnabled = true;
            canvas.style.filter = "blur(0.5px)";
            ctx.fillStyle = "#1a1d23";
            ctx.fillRect(0, 0, width, height);

            let rule_num = 56;
            // first -> y, second -> x
            let cur = Array.from(Array(rows), () => new Array(cols).fill(0))
            let neew = Array.from(Array(rows), () => new Array(cols).fill(0))

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    cur[y][x] = Math.round(getRand());
                    drawCell(x, y, cur[y][x]);
                }
            }

            function getState(a: number, b: number, c: number, d: number) {
                const pattern = (d << 2) | (a << 2) | (b << 1) | c;
                return (rule_num >> pattern) & 1;
            }

            function drawCell(x: number, y: number, state: number) {
                ctx.fillStyle = state ? "#4a5568" : "#1a1d23";
                ctx.fillRect(x * pixel_size, y * pixel_size, pixel_size, pixel_size);
            }
            function iterate(row: number) {
                ctx.fillStyle = `rgba(26, 29, 35, ${defog_speed / cols})`;
                ctx.fillRect(0, 0, width, height);

                if (row >= rows) {
                    rule_num = Math.floor(getRand() * 65535 + 1);
                    row = 0
                }

                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < cols; x++) {

                        const left = cur[y]?.[x - 1] ?? 0;
                        const top = cur[y - 1]?.[x] ?? 0;
                        const bottom = cur[y + 1]?.[x] ?? 0;
                        const right = cur[y]?.[x + 1] ?? 0;

                        cur[y][x] = getState(left, top, bottom, right);
                        drawCell(x, y, cur[y][x]);
                    }
                }



                [cur, neew] = [cur, neew];
                animationId = requestAnimationFrame(() => iterate(row + 1));
            }

            iterate(0);
        }
        start();
        function handleResize() {
            cancelAnimationFrame(animationId)
            start()
        }

        window.addEventListener("resize", handleResize);
        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener("resize", handleResize)
        }
    }, []);


    return (
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
    );
}