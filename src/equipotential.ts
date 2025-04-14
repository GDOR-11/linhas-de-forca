import { Color, screenLength, screenX, screenY, worldX, worldY } from "./render_utils";
import { AbstractVector, Vector } from "vector2d";
import { field, potential } from ".";
import WorldObject from "./world_object";

export default class Equipotential implements WorldObject {
    position: AbstractVector;
    width: number;
    color: Color;
    z_index: number;
    dx: number;

    pane_bindings = {
        position: {
            label: "posição",
            step: 0.01,
            x: { min: worldX(0), max: worldX(window.innerWidth) },
            y: { min: worldY(0), max: worldY(window.innerHeight) }
        },
        width: { label: "espessura", min: 0.01, step: 0.01 },
        dx: { label: "resolução linear", min: 0.01, step: 0.01 },
        color: { label: "cor" },
        z_index: { label: "z-index", step: 0.1 }
    };

    constructor(position: AbstractVector = new Vector(0, 0), width: number = 0.3, dx: number = 0.25, color: Color = "#000000ff", z_index: number = 0) {
        this.position = position;
        this.width = width;
        this.dx = dx;
        this.color = color;
        this.z_index = z_index;
    }
    render(ctx: CanvasRenderingContext2D) {
        let V0 = potential(this.position);

        // find a few solutions so we can be mostly sure we have at least one point at each curve
        let zeroes = [];
        for (let x = worldX(0); x <= worldX(window.innerWidth); x += 4) {
            outer_loop: for (let y = worldY(0); y <= worldY(window.innerHeight); y += 4) {
                let p = new Vector(x, y);
                let last_E2 = -Infinity;
                for (let i = 0; i < 100; i++) {
                    let E = field(p);
                    E.mulS((potential(p) - V0) / E.lengthSq());
                    p.add(E);
                    let E2 = E.lengthSq();
                    if (E2 < 0.01 && last_E2 !== -Infinity) {
                        if (E2 < last_E2) {
                            zeroes.push(p);
                            continue outer_loop;
                        } else {
                            last_E2 = -Infinity;
                        }
                    } else if (E2 < 0.01) {
                        last_E2 = E2;
                    }
                }
            }
        }

        ctx.strokeStyle = this.color;
        ctx.lineWidth = screenLength(this.width);
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        ctx.beginPath();
        while (zeroes.length > 0) {
            let looped = false;
            let integrate = (side: number) => {
                let p = zeroes[0].clone();
                ctx.moveTo(screenX(p.x), screenY(p.y));
                let last_dp = field(p).rotate(side * Math.PI / 2).normalize().mulS(this.dx);
                p.add(last_dp);
                ctx.lineTo(screenX(p.x), screenY(p.y));
                loop: for (let i = 0; i < 1000; i++) {
                    let p0 = p.clone();
                    
                    let E = field(p);
                    let dp = new Vector(E.y, -E.x).normalize();

                    let dir = Math.sign(dp.dot(last_dp));
                    dp.mulS(this.dx * dir);
                    p.add(dp);
                    last_dp = dp;


                    let k = 0;
                    do {
                        k++;
                        E = field(p);
                        E.mulS((potential(p) - V0) / E.lengthSq());
                        if (E.lengthSq() > this.dx * this.dx) E.normalize().mulS(this.dx);
                        p.add(E);
                    } while (E.lengthSq() > 0.01 && k < 1000);
                    if (k === 1000) break loop;

                    ctx.lineTo(screenX(p.x), screenY(p.y));

                    if (screenX(p.x) < 0 || screenX(p.x) > window.innerWidth) break loop;
                    if (screenY(p.y) < 0 || screenY(p.y) > window.innerHeight) break loop;
                    let p0p = p0.clone().subtract(p).lengthSq();
                    for (let j = zeroes.length - 1; j >= 0; j--) {
                        if (p0.clone().subtract(zeroes[j]).lengthSq() < p0p) {
                            if (j === 0) {
                                looped = i > 4;
                                break loop;
                            }
                            zeroes.splice(j, 1);
                        }
                    }
                }
            }
            integrate(1);
            if (!looped) integrate(-1);
            zeroes.shift();
        }
        ctx.stroke();
    }
    render_hitbox(ctx: CanvasRenderingContext2D) {
        let { color, width } = this;
        this.color = "#000000ff";
        this.width = Math.max(0.3, this.width);
        this.render(ctx);
        this.color = color;
        this.width = width
    }
}
