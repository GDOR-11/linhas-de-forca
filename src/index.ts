import { AbstractVector, Vector } from "vector2d";
import Charge from "./charge";
import { FieldLine } from "./field_lines";
import { canvas, ctx } from "./render_utils";
import "./ui_handler";

export const k = 100;

export const charges: Charge[] = [];
export const field_lines: FieldLine[] = [];

export function field(s: AbstractVector): AbstractVector {
    return charges.reduce((a, b) => a.add(b.getField(s)), new Vector(0, 0));
}

export function render() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = canvas.style.backgroundColor;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    field_lines.forEach(field_line => field_line.render(field));
    charges.forEach(charge => charge.render());
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
