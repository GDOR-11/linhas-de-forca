import { Color, screenLength, screenX, screenY } from "./render_utils";
import { AbstractVector } from "vector2d";
import { ctx } from "./render_utils";
import { k } from ".";

export default class Charge {
    pos: AbstractVector;
    charge: number;
    radius: number;
    color: Color;

    constructor(pos: AbstractVector, charge: number, radius: number, color: Color) {
        this.pos = pos;
        this.charge = charge;
        this.radius = radius;
        this.color = color;
    }
    render() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(screenX(this.pos.x), screenY(this.pos.y), screenLength(this.radius), 0, 2 * Math.PI);
        ctx.fill();
    }
    getField(s: AbstractVector) {
        let d = s.clone().subtract(this.pos);
        return d.clone().normalize().mulS(k * this.charge / d.magnitude() ** 2);
    }
}
