import { AbstractVector, Vector } from "vector2d";
import Charge from "./charge";
import { FieldLine } from "./field_lines";
import { canvas, ctx } from "./render_utils";
import "./ui_handler";
import { edit_charge, edit_field_line } from "./ui_handler";

export const k = 100;

export const charges: Charge[] = [];
export const field_lines: FieldLine[] = [];

function field(s: AbstractVector): AbstractVector {
    return charges.reduce((a, b) => a.add(b.getField(s)), new Vector(0, 0));
}

// render backwards, the first thing that renders on top of the mouse is selected
canvas.onclick = event => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const pixel_changed = () => ctx.getImageData(event.x, event.y, 1, 1).data[3] > 0;
    for (let i = charges.length - 1; i >= 0; i--) {
        charges[i].render();
        if (pixel_changed()) {
            edit_charge(charges[i]);
            return;
        }
    }
    for (let i = field_lines.length - 1; i >= 0; i--) {
        field_lines[i].render(field);
        if (pixel_changed()) {
            edit_field_line(field_lines[i]);
            return;
        }
    }
};

export function render() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    field_lines.forEach(field_line => field_line.render(field));
    charges.forEach(charge => charge.render());
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
