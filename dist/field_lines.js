import { Vector } from "vector2d";
import { ctx, screenLength, screenX, screenY } from "./render_utils";
import { open_editor } from "./world_object";
import { field } from ".";
function RKstep(s, f, dt) {
    var k1 = f(s).mulS(dt);
    var k2 = f(s.clone().add(k1.clone().divS(2))).mulS(dt);
    var k3 = f(s.clone().add(k2.clone().divS(2))).mulS(dt);
    var k4 = f(s.clone().add(k3)).mulS(dt);
    return s.clone().add(k1.add(k2.mulS(2)).add(k3.mulS(2)).add(k4).divS(6));
}
var FieldLine = /** @class */ (function () {
    function FieldLine(anchor_point, da, ds, width, color, z_index) {
        if (anchor_point === void 0) { anchor_point = new Vector(0, 0); }
        if (da === void 0) { da = 0.01; }
        if (ds === void 0) { ds = 10; }
        if (width === void 0) { width = 0.25; }
        if (color === void 0) { color = "#ffffffff"; }
        if (z_index === void 0) { z_index = 1; }
        this.anchor_point = anchor_point.clone();
        this.width = width;
        this.color = color;
        this.da = da;
        this.ds = ds;
        this.z_index = z_index;
    }
    FieldLine.prototype.render = function () {
        var _this = this;
        var integrate = function (side) {
            var f = function (s) { return field(s).mulS(side).normalize(); };
            var s = _this.anchor_point.clone();
            ctx.beginPath();
            ctx.moveTo(screenX(s.x), screenY(s.y));
            var multiplier = 1;
            for (var i = 0; i < 1024; i++) {
                var h = 1e-5;
                var E = f(s);
                var E2 = f(s.clone().add(E.clone().mulS(h)));
                var da_dt = Math.sqrt(2 - 2 * E.dot(E2)) / h;
                var dt = multiplier * Math.min((_this.da / da_dt) || 10, _this.ds);
                if (dt < 1e-3)
                    break;
                var new_s = RKstep(s, f, dt);
                if (Math.min(E.dot(f(new_s)), E.dot(new_s.clone().subtract(s).normalize())) < 1 - 2 * Math.pow(_this.da, 2)) {
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
        ctx.strokeRect(screenX(this.anchor_point.x), screenY(this.anchor_point.y), 0.1, 0.1);
    };
    return FieldLine;
}());
export default FieldLine;
var fl = new FieldLine();
open_editor(fl, document.body);
