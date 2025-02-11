import { screenLength, screenX, screenY, worldX, worldY } from "./render_utils";
import { ctx } from "./render_utils";
import { charges, k } from ".";
import { Pane } from "tweakpane";
var Charge = /** @class */ (function () {
    function Charge(pos, charge, radius, color) {
        this.pos = pos;
        this.charge = charge;
        this.radius = radius;
        this.color = color;
    }
    Charge.prototype.render = function () {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(screenX(this.pos.x), screenY(this.pos.y), screenLength(this.radius), 0, 2 * Math.PI);
        ctx.fill();
    };
    Charge.prototype.getField = function (s) {
        var d = s.clone().subtract(this.pos);
        return d.clone().normalize().mulS(k * this.charge / Math.pow(d.magnitude(), 2));
    };
    return Charge;
}());
export default Charge;
export function edit_charge(charge, pane_container) {
    var pane = new Pane({ container: pane_container });
    pane.addBinding(charge, "pos", {
        label: "posição",
        x: { min: worldX(0), max: worldX(window.innerWidth) },
        y: { min: worldY(0), max: worldY(window.innerHeight) }
    });
    pane.addBinding(charge, "charge", { label: "carga" });
    pane.addBinding(charge, "radius", { label: "raio", min: 0 });
    pane.addBinding(charge, "color", { label: "cor" });
    pane.addButton({ title: "remover" }).on("click", function () {
        charges.splice(charges.indexOf(charge), 1);
        pane.dispose();
    });
    pane.addButton({ title: "terminar" }).on("click", function () { return pane.dispose(); });
    return pane;
}
