import { Color, screenLength, screenX, screenY, worldX, worldY } from "./render_utils";
import { AbstractVector, Vector } from "vector2d";
import { k } from ".";
import WorldObject from "./world_object";

export default class Charge implements WorldObject {
    position: AbstractVector;
    charge: number;
    radius: number;
    color: Color;
    z_index: number;
    
    pane_bindings = {
        position: {
            label: "posição",
            step: 0.01,
            x: { min: worldX(0), max: worldX(window.innerWidth) },
            y: { min: worldY(0), max: worldY(window.innerHeight) }
        },
        charge: { label: "carga", step: 0.1 },
        radius: { label: "raio", min: 0.1, step: 0.1 },
        color: { label: "cor" },
        z_index: { label: "z-index", step: 0.1 }
    };

    constructor(position: AbstractVector = new Vector(0, 0), charge: number = 1, radius: number = 1, color: Color = "#000000ff", z_index: number = 1) {
        this.position = position;
        this.charge = charge;
        this.radius = radius;
        this.color = color;
        this.z_index = z_index;
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(screenX(this.position.x), screenY(this.position.y), screenLength(this.radius), 0, 2 * Math.PI);
        ctx.fill();
    }
    render_hitbox(ctx: CanvasRenderingContext2D) {
        let color = this.color;
        this.color = "#000000ff";
        this.render(ctx);
        this.color = color;
    }
    getField(s: AbstractVector) {
        let d = s.clone().subtract(this.position);
        return d.clone().normalize().mulS(k * this.charge / d.magnitude() ** 2);
    }
}
