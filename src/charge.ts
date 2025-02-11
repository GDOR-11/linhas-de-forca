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
            x: { min: worldX(0), max: worldX(window.innerWidth) },
            y: { min: worldY(0), max: worldY(window.innerHeight) }
        },
        charge: { label: "carga" },
        radius: { label: "raio", min: 0 },
        color: { label: "cor" },
        z_index: { label: "z-index" }
    };

    constructor(position: AbstractVector = new Vector(0, 0), charge: number = 1, radius: number = 1, color: Color = "#000000ff", z_index: number = 0) {
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
    getField(s: AbstractVector) {
        let d = s.clone().subtract(this.position);
        return d.clone().normalize().mulS(k * this.charge / d.magnitude() ** 2);
    }
}
