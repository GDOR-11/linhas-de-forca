import { Pane } from "tweakpane";
import Charge from "./charge";
import { addObject, getObjectAt } from ".";
import FieldLine from "./field_line";
import { canvas, worldX, worldY } from "./render_utils";
import { saveAs } from "file-saver";
import WorldObject, { open_editor } from "./world_object";
import FieldArrow from "./field_arrow";
import TextNode from "./text_node";
import { AbstractVector, Vector } from "vector2d";

const main_pane = new Pane({
    title: "editar",
    container: document.getElementById("primary-pane")
});
let secondary_pane: null | Pane = null;

function edit_object(object: WorldObject) {
    try { secondary_pane?.dispose(); } catch (err) {}
    secondary_pane = open_editor(object, document.getElementById("secondary-pane"));
}
function create_object(object: WorldObject) {
    addObject(object);
    edit_object(object);
}

main_pane.addButton({ title: "nova carga" }).on("click", () => create_object(new Charge()));
main_pane.addButton({ title: "nova linha de força" }).on("click", () => create_object(new FieldLine));
main_pane.addButton({ title: "nova seta de campo" }).on("click", () => create_object(new FieldArrow()));
main_pane.addButton({ title: "novo texto" }).on("click", () => create_object(new TextNode()));
main_pane.addButton({ title: "screenshot" }).on("click", () => canvas.toBlob(blob => saveAs(blob, "linhas de força.png")));
main_pane.addBinding(document.body.style, "backgroundColor", { label: "cor de fundo" });


let selected_object: null | WorldObject = null;
let total_pointer_distance = 0;

canvas.onpointerdown = event => {
    total_pointer_distance = 0;
    selected_object = getObjectAt(new Vector(event.x, event.y));
};

canvas.onpointermove = event => {
    total_pointer_distance += Math.hypot(event.movementX, event.movementY);
    if (total_pointer_distance < 10) return;
    if (selected_object === null) return;
    selected_object.position = new Vector(worldX(event.x), worldY(event.y))
};

window.onpointerup = () => {
    if (total_pointer_distance < 10 && selected_object !== null) {
        edit_object(selected_object);
    }
    selected_object = null;
}
