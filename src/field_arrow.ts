import { AbstractVector, Vector } from "vector2d";
import { Color, screenLength, screenX, screenY, worldX, worldY } from "./render_utils";
import { field } from ".";
import WorldObject from "./world_object";

export default class FieldArrow implements WorldObject {
    position: AbstractVector;
    head_size: number;
    length: number;
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
        head_size: { label: "tamanho da ponta", min: 0.1, step: 0.1 },
        length: { label: "comprimento", min: 0.1, step: 0.1 },
        angle: { label: "abertura", min: 0.01, max: 3.14, step: 0.01 },
        color: { label: "cor" },
        width: { label: "espessura", min: 0.01, step: 0.01 },
        z_index: { label: "z-index", step: 0.1 }
    };
    
    constructor(position: AbstractVector = new Vector(0, 0), head_size: number = 1, length: number = 2, angle: number = 1.05, color: Color = "#000000ff", width: number = 0.1, z_index: number = 3) {
        this.position = position;
        this.head_size = head_size;
        this.length = length;
        this.angle = angle;
        this.color = color;
        this.width = width;
        this.z_index = z_index;
    }

    render(ctx: CanvasRenderingContext2D) {
        let direction = field(this.position).normalize();

        let head_pos = this.position.clone().add(direction.clone().mulS(this.length));
        let B = head_pos.clone().add(direction.clone().mulS(this.head_size).rotate(Math.PI + this.angle / 2));
        let C = head_pos.clone().add(direction.clone().mulS(this.head_size).rotate(Math.PI - this.angle / 2));

        ctx.strokeStyle = this.color;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = screenLength(this.width);
        ctx.beginPath();
        ctx.moveTo(screenX(B.x), screenY(B.y));
        ctx.lineTo(screenX(head_pos.x), screenY(head_pos.y));
        ctx.lineTo(screenX(C.x), screenY(C.y));
        ctx.moveTo(screenX(head_pos.x), screenY(head_pos.y));
        ctx.lineTo(screenX(this.position.x), screenY(this.position.y));
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
