import { ctx, screenX, screenY } from "./render_utils";
var TextNode = /** @class */ (function () {
    function TextNode(text, pos, angle, size, color) {
        this.text = text;
        this.pos = pos;
        this.angle = angle;
        this.size = size;
        this.color = color;
    }
    TextNode.prototype.render = function () {
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(screenX(this.pos.x), screenY(this.pos.y));
        ctx.rotate(-this.angle);
        ctx.scale(this.size, this.size);
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    };
    return TextNode;
}());
export default TextNode;
