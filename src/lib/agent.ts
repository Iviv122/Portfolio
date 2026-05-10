import { rotate, type Vector2 } from "./vector2"

export interface Agent {
    pos: Vector2
    dir: Vector2
    speed: number // we draw lines so should be ok

    color: string


    divider: number
    iter_left_init: number
    iter_left: number
    iter_repeat: number
    iter_repeat_left: number
    action?: () => void
}

export function getAgent(
    x: number,
    y: number,
    dir: Vector2,
    speed: number,
    iterLive: number,
    divider: number,
    color: string,
    action: () => void = () => { }
): Agent {
    return {
        pos: { x, y },
        dir,
        speed,
        color,
        divider: divider,
        iter_left_init: iterLive,
        iter_left: iterLive,
        iter_repeat: iterLive / divider,
        iter_repeat_left: iterLive / divider,
        action,
    }
}

export function rotate_agent(agent: Agent, rotation: number) {
    agent.dir = rotate(agent.dir, rotation)
}

export function step(agent: Agent, rotation: number, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = agent.color
    ctx.moveTo(agent.pos.x, agent.pos.y);
    agent.pos.x += agent.dir.x * agent.speed
    agent.pos.y += agent.dir.y * agent.speed
    ctx.lineTo(agent.pos.x, agent.pos.y);
    agent.dir = rotate(agent.dir, rotation)
    ctx.stroke();

    agent.iter_left-=1
    agent.iter_repeat_left-=1
}

