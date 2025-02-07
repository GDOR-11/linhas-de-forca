import { AbstractVector } from "vector2d";
import { Color, ctx, screenLength, screenX, screenY } from "./render_utils";

function RKstep(s: AbstractVector, f: (s: AbstractVector) => AbstractVector, dt: number): AbstractVector {
    const k1 = f(s).mulS(dt);
    const k2 = f(s.clone().add(k1.clone().divS(2))).mulS(dt);
    const k3 = f(s.clone().add(k2.clone().divS(2))).mulS(dt);
    const k4 = f(s.clone().add(k3)).mulS(dt);
    return s.clone().add(k1.add(k2.mulS(2)).add(k3.mulS(2)).add(k4).divS(6));
}

export class FieldLine {
    anchor_point: AbstractVector;
    width: number;
    color: Color;
    da: number;
    ds: number;

    constructor(anchor_point: AbstractVector, width: number, color: Color, da: number, ds: number) {
        this.anchor_point = anchor_point.clone();
        this.width = width;
        this.color = color;
        this.da = da;
        this.ds = ds;
    }

    render(field: (s: AbstractVector) => AbstractVector) {
        let integrate = (side: number) => {
            const f = (s: AbstractVector) => field(s).mulS(side).normalize();

            let s = this.anchor_point.clone();
            ctx.beginPath();
            ctx.moveTo(screenX(s.x), screenY(s.y));
            let multiplier = 1;
            for (let i = 0; i < 1000 && multiplier > 1e-3; i++) {
                let h = 1e-5;
                let E = f(s);
                let E2 = f(s.clone().add(E.clone().mulS(h)));
                let da_dt = Math.sqrt(2 - 2 * E.dot(E2)) / h;
                let dt = multiplier * Math.min((this.da / da_dt) || 10, this.ds);
                let new_s = RKstep(s, f, dt);
                let new_E = f(new_s);
                if (Math.min(E.dot(new_E), E.dot(new_s.clone().subtract(s).normalize())) < 1 - 2 * this.da ** 2) {
                    multiplier /= 2;
                    continue;
                }
                multiplier = 1;
                s = new_s;
                ctx.lineTo(screenX(s.x), screenY(s.y));
            }
            ctx.stroke();
        };
        ctx.strokeStyle = this.color;
        ctx.lineWidth = screenLength(this.width);
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        integrate(1);
        integrate(-1);
        ctx.strokeRect(screenX(this.anchor_point.x), screenY(this.anchor_point.y), 0.1, 0.1);
        
    }
}
