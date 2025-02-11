import { ctx, screenX, screenY } from "./render_utils";
import { field } from ".";
var FieldArrow = /** @class */ (function () {
    function FieldArrow(pos, size, color, width) {
        this.pos = pos;
        this.size = size;
        this.color = color;
        this.width = width;
    }
    FieldArrow.prototype.render = function () {
        var direction = field(this.pos).normalize().mulS(this.size);
        var B = this.pos.clone().add(direction.rotate(2 * Math.PI / 3));
        var C = this.pos.clone().add(direction.rotate(2 * Math.PI / 3));
        ctx.strokeStyle = this.color;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(screenX(B.x), screenY(B.y));
        ctx.lineTo(screenX(this.pos.x), screenY(this.pos.y));
        ctx.lineTo(screenX(C.x), screenY(C.y));
        ctx.stroke();
    };
    return FieldArrow;
}());
export default FieldArrow;
