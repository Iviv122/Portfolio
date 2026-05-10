
export interface Vector2 {
    x: number
    y: number
}

export function normalize(v: Vector2): Vector2 {
    const length = Math.sqrt(v.x * v.x + v.y * v.y);

    if (length === 0) {
        return { x: 0, y: 0 }; // avoid division by zero
    }

    return {
        x: v.x / length,
        y: v.y / length
    };
}
export function rotate(v: Vector2, angleDeg: number): Vector2 {
    const angleRad = angleDeg * Math.PI / 180;

    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);

    return {
        x: v.x * cos - v.y * sin,
        y: v.x * sin + v.y * cos
    };
}

