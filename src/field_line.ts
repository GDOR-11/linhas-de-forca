import { AbstractVector, Vector } from "vector2d";
import { Color, screenLength, screenX, screenY, worldX, worldY } from "./render_utils";
import WorldObject from "./world_object";
import { field } from ".";

function RKstep(s: AbstractVector, f: (s: AbstractVector) => AbstractVector, dt: number): AbstractVector {
    const k1 = f(s).mulS(dt);
    const k2 = f(s.clone().add(k1.clone().divS(2))).mulS(dt);
    const k3 = f(s.clone().add(k2.clone().divS(2))).mulS(dt);
    const k4 = f(s.clone().add(k3)).mulS(dt);
    return s.clone().add(k1.add(k2.mulS(2)).add(k3.mulS(2)).add(k4).divS(6));
}

export default class FieldLine implements WorldObject {
    position: AbstractVector;
    da: number;
    ds: number;
    width: number;
    color: Color;
    z_index: number;
    max_iterations: number;

    pane_bindings = {
        position: {
            label: "posição inicial",
            step: 0.01,
            x: { min: worldX(0), max: worldX(window.innerWidth) },
            y: { min: worldY(0), max: worldY(window.innerHeight) }
        },
        da: { label: "resolução angular", min: 0.001, max: 0.1, step: 0.001 },
        ds: { label: "resolução linear", min: 0.1, max: 10, step: 0.1 },
        max_iterations: { label: "comprimento", min: 0, max: 10000, step: 1},
        width: { label: "espessura", min: 0.01, step: 0.01 },
        color: { label: "cor" },
        z_index: { label: "z-index", step: 0.1 }
    };

    constructor(position: AbstractVector = new Vector(0, 0), da: number = 0.01, ds: number = 3, width: number = 0.25, color: Color = "#000000ff", z_index: number = 0, max_iterations: number = 1000) {
        this.position = position.clone();
        this.width = width;
        this.color = color;
        this.da = da;
        this.ds = ds;
        this.z_index = z_index;
        this.max_iterations = max_iterations;
    }

    render(ctx: CanvasRenderingContext2D) {
        let integrate = (side: number) => {
            const f = (s: AbstractVector) => field(s).mulS(side).normalize();

            let s = this.position.clone();
            ctx.beginPath();
            ctx.moveTo(screenX(s.x), screenY(s.y));
            let multiplier = 1;
            for (let i = 0; i < this.max_iterations; i++) {
                let h = 1e-5;
                let E = f(s);
                let E2 = f(s.clone().add(E.clone().mulS(h)));
                let da_dt = Math.sqrt(2 - 2 * E.dot(E2)) / h;
                let dt = multiplier * Math.min((this.da / da_dt) || 10, this.ds);
                if (dt < 1e-5) break;
                let new_s = RKstep(s, f, dt);
                if (Math.min(E.dot(f(new_s)), E.dot(new_s.clone().subtract(s).normalize())) < 1 - 2 * this.da ** 2) {
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
        ctx.strokeRect(screenX(this.position.x), screenY(this.position.y), 0.1, 0.1);
    }
    render_hitbox(ctx: CanvasRenderingContext2D) {
        let color = this.color, width = this.width;
        this.color = "#000000ff";
        this.width = Math.max(this.width, 0.5);
        this.render(ctx);
        this.color = color;
        this.width = width;
    }
}
