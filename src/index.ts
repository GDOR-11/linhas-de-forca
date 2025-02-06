import { AbstractVector, Vector } from "vector2d";
import Charge from "./charge";
import { FieldLine } from "./field_lines";
import { ctx } from "./render_utils";

export const k = 100;

const charges: Charge[] = [
    new Charge(new Vector(250, 500), -10, 10, "blue"),
    new Charge(new Vector(350, 500), 10, 10, "red"),
];
let field_lines: FieldLine[] = [];
for (let a = 0; a < 2 * Math.PI; a += 2 * Math.PI / 100) {
    let p = new Vector(250 + 10 * Math.cos(a), 500 + 10 * Math.sin(a))
    field_lines.push(new FieldLine(p, 1, "white", 0.1));
}

function field(s: AbstractVector): AbstractVector {
    return charges.reduce((a, b) => a.add(b.getField(s)), new Vector(0, 0));
}

export function render() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    field_lines.forEach(field_line => field_line.render(field));
    charges.forEach(charge => charge.render());
}
