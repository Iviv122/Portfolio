import { useRef, useEffect } from "react";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const pixel_size = 6;

    function rand_state(): number {
        return Math.round(Math.random());
    }

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

        let rule_num = 1;
        let current = new Array(cols).fill(0);
        let next = new Array(cols).fill(0);

        ctx.imageSmoothingEnabled = true;
        canvas.style.filter = "blur(0.5px)";

        ctx.fillStyle = "#1a1d23";
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < cols; i++) {
            current[i] = rand_state();
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
            
            if (row >= rows){
                rule_num = Math.floor(Math.random() * 253 + 2);
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