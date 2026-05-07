import { useRef, useEffect } from "react";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const pixel_size = 6;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const realctx = canvas.getContext("2d");
        if (!realctx) return;
        const ctx = realctx;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const cols = Math.floor(width / pixel_size);
        const rows = Math.floor(height / pixel_size);
        canvas.width = width;
        canvas.height = height;

        let rule_num = 5;
        let current = new Array(cols).fill(0);
        let next = new Array(cols).fill(0);

        ctx.imageSmoothingEnabled = true;
        canvas.style.filter = "blur(0.5px)";

        ctx.fillStyle = "#1a1d23";
        ctx.fillRect(0, 0, width, height);
        
        
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

        const a = 2177591200;
        const b = 398881965;
        const c = 2286335670;
        const d = 118324663;
        console.log(a + "+" + b + "+" + c + "+" + d)
        const getRand = sfc32(a,b,c,d);

        for (let i = 0; i < cols; i++) {
            current[i] = getRand();
            drawCell(i, 0, current[i]);
        }

        function getState(a: number, b: number, c: number) {
            const pattern = (a << 2) | (b << 1) | c;
            return (rule_num >> pattern) & 1;
        }

        function drawCell(x: number, y: number, state: number) {
            ctx.fillStyle = state ? "#4a5568" : "#1a1d23";
            ctx.fillRect(x * pixel_size, y * pixel_size, pixel_size, pixel_size);
        }
        function iterate(row: number) {
            ctx.fillStyle = "rgba(26, 29, 35, 0.015)";
            ctx.fillRect(0, 0, width, height);

            if (row >= rows) {
                rule_num = Math.floor(getRand() * 254 + 1);
                iterate(0);
                return;
            }

            for (let i = 0; i < cols; i++) {
                const left = current[i - 1] ?? 0;
                const mid = current[i];
                const right = current[i + 1] ?? 0;

                next[i] = getState(left, mid, right);
                drawCell(i, row, next[i]);
            }

            [current, next] = [next, current];
            requestAnimationFrame(() => iterate(row + 1));
        }

        iterate(0);
    }, []);

    return (
        <div className="w-full h-full bg-[#1a1d23]">
            <canvas ref={canvasRef} className="absolute top-0 left-0" />
        </div>
    );
}