import { AbstractVector } from "vector2d";
import { Color, ctx } from "./render_utils";

export class FieldLine {
    anchor_point: AbstractVector;
    width: number;
    color: Color;
    da: number;

    constructor(anchor_point: AbstractVector, width: number, color: Color, da: number) {
        this.anchor_point = anchor_point.clone();
        this.width = width;
        this.color = color;
        this.da = da;
    }

    render(field: (s: AbstractVector) => AbstractVector) {
        let integrate = (side: number) => {
            // euler integration with normalized derivative and controlled dt to maintain angular resolution da
            let s = this.anchor_point.clone();
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            let ds = 1;
            for (let i = 0; i < 10000; i++) {
                let E = field(s).mulS(side).normalize();
                let new_s = s.clone().add(E.clone().mulS(ds));
                let new_E = field(new_s).mulS(side).normalize();
                if (E.dot(new_E) < this.da ** 2 / 2) {
                    ds /= 2;
                    continue;
                } else {
                    s = new_s;
                    ds = 1;
                }
                ctx.lineTo(s.x, s.y);
            }
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;
            ctx.stroke();
        };
        integrate(1);
        integrate(-1);
    }
}
