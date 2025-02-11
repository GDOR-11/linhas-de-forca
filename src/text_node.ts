import { AbstractVector, Vector } from "vector2d";
import { Color, screenX, screenY } from "./render_utils";
import WorldObject from "./world_object";

export default class TextNode implements WorldObject {
    position: AbstractVector;
    text: string;
    angle: number;
    size: number;
    color: Color;
    z_index: number;

    pane_bindings = {
        position: {
            label: "posição",
            x: { min: screenX(0), max: screenX(window.innerWidth) },
            y: { min: screenY(0), max: screenY(window.innerHeight) }
        },
        text: { label: "texto" },
        angle: { label: "rotação", min: 0, max: 2 * Math.PI },
        size: { label: "tamanho", min: 0 },
        color: { label: "cor" },
        z_index: { label: "z-index" }
    };

    constructor(text: string = "", position: AbstractVector = new Vector(0, 0), angle: number = 0, size: number = 1, color: Color = "#000000ff", z_index: number = 3) {
        this.text = text;
        this.position = position;
        this.angle = angle;
        this.size = size;
        this.color = color;
        this.z_index = z_index;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(screenX(this.position.x), screenY(this.position.y));
        ctx.rotate(-this.angle);
        ctx.scale(this.size, this.size);
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}
