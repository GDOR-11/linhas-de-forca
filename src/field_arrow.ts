import { AbstractVector, Vector } from "vector2d";
import { Color, screenLength, screenX, screenY, worldX, worldY } from "./render_utils";
import { field } from ".";
import WorldObject from "./world_object";

export default class FieldArrow implements WorldObject {
    position: AbstractVector;
    size: number;
    angle: number;
    color: Color;
    width: number;
    z_index: number;

    pane_bindings = {
        position: {
            label: "posição",
            step: 0.01,
            x: { min: worldX(0), max: worldX(window.innerWidth) },
            y: { min: worldY(0), max: worldY(window.innerHeight) }
        },
        size: { label: "tamanho", min: 0.1, step: 0.1 },
        angle: { label: "abertura", min: 0.01, max: 3.14, step: 0.01 },
        color: { label: "cor" },
        width: { label: "espessura", min: 0.01, step: 0.01 },
        z_index: { label: "z-index", step: 0.1 }
    };
    
    constructor(position: AbstractVector = new Vector(0, 0), size: number = 1, angle: number = 1.05, color: Color = "#000000ff", width: number = 0.1, z_index: number = 2) {
        this.position = position;
        this.size = size;
        this.angle = angle;
        this.color = color;
        this.width = width;
        this.z_index = z_index;
    }

    render(ctx: CanvasRenderingContext2D) {
        let direction = field(this.position).normalize().mulS(this.size);
        let B = this.position.clone().add(direction.clone().rotate(Math.PI + this.angle / 2));
        let C = this.position.clone().add(direction.clone().rotate(Math.PI - this.angle / 2));

        ctx.strokeStyle = this.color;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = screenLength(this.width);
        ctx.beginPath();
        ctx.moveTo(screenX(B.x), screenY(B.y));
        ctx.lineTo(screenX(this.position.x), screenY(this.position.y));
        ctx.lineTo(screenX(C.x), screenY(C.y));
        ctx.stroke();
    }
    render_hitbox(ctx: CanvasRenderingContext2D) {
        let color = this.color;
        this.color = "#000000ff";
        this.render(ctx);
        ctx.fill(); // fill the stroked path
        this.color = color;
    }
}
