import { Pane } from "tweakpane";
import Charge, { edit_charge } from "./charge";
import { Vector } from "vector2d";
import { charges, field, field_lines } from ".";
import { edit_field_line, FieldLine } from "./field_lines";
import { canvas, ctx, worldX, worldY } from "./render_utils";
import { saveAs } from "file-saver";
var main_pane = new Pane({
    title: "editar",
    container: document.getElementById("primary-pane")
});
var secondary_pane = null;
function edit_object(object, edit_pane) {
    try {
        secondary_pane === null || secondary_pane === void 0 ? void 0 : secondary_pane.dispose();
    }
    catch (err) { }
    secondary_pane = edit_pane(object, document.getElementById("secondary-pane"));
}
main_pane.addButton({ title: "nova carga" }).on("click", function () {
    var charge = new Charge(new Vector(0, 0), 1, 2, "#000000ff");
    charges.push(charge);
    edit_object(charge, edit_charge);
});
main_pane.addButton({ title: "nova linha de força" }).on("click", function () {
    var field_line = new FieldLine(new Vector(0, 0), 0.2, "#000000ff", 0.01, 10);
    edit_object(field_line, edit_field_line);
});
main_pane.addButton({ title: "screenshot" }).on("click", function () { return canvas.toBlob(function (blob) { return saveAs(blob, "linhas de força.png"); }); });
main_pane.addBinding(canvas.style, "backgroundColor", { label: "cor de fundo" });
var selected_object = null;
var pointer_coords = [0, 0];
window.onpointerup = function (event) {
    if (Math.hypot(event.x - pointer_coords[0], event.y - pointer_coords[1]) < 10 && selected_object !== null) {
        if (selected_object instanceof Charge) {
            edit_object(selected_object, edit_charge);
        }
        else {
            edit_object(selected_object, edit_field_line);
        }
    }
    selected_object = null;
};
canvas.onpointerdown = function (event) {
    pointer_coords = [event.x, event.y];
    // render backwards, the first thing that renders on top of the mouse is selected
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    var pixel_changed = function () { return ctx.getImageData(event.x, event.y, 1, 1).data[3] > 0; };
    for (var i = charges.length - 1; i >= 0; i--) {
        charges[i].render();
        if (pixel_changed()) {
            selected_object = charges[i];
            return;
        }
    }
    for (var i = field_lines.length - 1; i >= 0; i--) {
        field_lines[i].render(field);
        if (pixel_changed()) {
            selected_object = field_lines[i];
            return;
        }
    }
};
canvas.onpointermove = function (event) {
    if (Math.hypot(event.x - pointer_coords[0], event.y - pointer_coords[1]) < 10)
        return;
    if (selected_object === null)
        return;
    if (selected_object instanceof Charge) {
        selected_object.pos.x = worldX(event.x);
        selected_object.pos.y = worldY(event.y);
    }
    else {
        selected_object.anchor_point.x = worldX(event.x);
        selected_object.anchor_point.y = worldY(event.y);
    }
};
