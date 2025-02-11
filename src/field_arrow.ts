import { AbstractVector, Vector } from "vector2d";
import { Color, screenLength, screenX, screenY, worldX, worldY } from "./render_utils";
import { field } from ".";
import WorldObject from "./world_object";

export default class FieldArrow implements WorldObject {
    position: AbstractVector;
    size: number;
    color: Color;
    width: number;
    z_index: number;

    pane_bindings = {
        position: {
            label: "posição",
            x: { min: worldX(0), max: worldX(window.innerWidth) },
            y: { min: worldY(0), max: worldY(window.innerHeight) }
        },
        size: { label: "tamanho", min: 0 },
        color: { label: "cor" },
        width: { label: "espessura", min: 0 },
        z_index: { label: "z-index" }
    };
    
    constructor(position: AbstractVector = new Vector(0, 0), size: number = 1, color: Color = "#000000ff", width: number = 0.1, z_index: number = 2) {
        this.position = position;
        this.size = size;
        this.color = color;
        this.width = width;
        this.z_index = z_index;
    }

    render(ctx: CanvasRenderingContext2D) {
        let direction = field(this.position).normalize().mulS(this.size);
        let B = this.position.clone().add(direction.rotate(5 * Math.PI / 6));
        let C = this.position.clone().add(direction.rotate(Math.PI / 3));

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
}
