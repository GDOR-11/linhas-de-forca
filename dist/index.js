import { Vector } from "vector2d";
import Charge from "./charge";
import { canvas, ctx } from "./render_utils";
import "./ui_handler";
export var k = 100;
export var objects = [];
export function removeObject(object) {
    var idx = objects.indexOf(object);
    if (idx >= 0)
        objects.splice(idx, 1);
}
export function field(s) {
    return objects.filter(function (object) { return object instanceof Charge; }).reduce(function (a, b) { return a.add(b.getField(s)); }, new Vector(0, 0));
}
export function render() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = canvas.style.backgroundColor;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    objects.sort(function (a, b) { return Math.sign(a.z_index - b.z_index); });
    objects.forEach(function (object) { return object.render(); });
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
