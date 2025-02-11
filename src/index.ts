import { AbstractVector, Vector } from "vector2d";
import Charge from "./charge";
import { canvas, ctx } from "./render_utils";
import "./ui_handler";
import WorldObject from "./world_object";

export const k = 100;

const objects: WorldObject[] = [];

export function addObject(object: WorldObject) {
    objects.push(object);
}
export function removeObject(object: WorldObject) {
    let idx = objects.indexOf(object);
    if (idx >= 0) objects.splice(idx, 1);
}

export function field(s: AbstractVector): AbstractVector {
    return objects.filter(object => object instanceof Charge).reduce((a, b) => a.add(b.getField(s)), new Vector(0, 0));
}

export function getObjectAt(screen_pos: AbstractVector): WorldObject | null {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const pixel_changed = () => ctx.getImageData(screen_pos.x, screen_pos.y, 1, 1).data[3] > 0;
    objects.sort((a, b) => Math.sign(b.z_index - a.z_index));
    for (let object of objects) {
        object.render_hitbox(ctx);
        if (pixel_changed()) return object;
    }
    return null;
}

export function render() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = canvas.style.backgroundColor;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    objects.sort((a, b) => Math.sign(a.z_index - b.z_index));
    objects.forEach(object => object.render(ctx));
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
