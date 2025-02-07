import { Pane } from "tweakpane";
import Charge from "./charge";
import { Vector } from "vector2d";
import { charges, field, field_lines } from ".";
import { FieldLine } from "./field_lines";
import { canvas, ctx, screenLength, worldLength, worldX, worldY } from "./render_utils";

const main_pane = new Pane({
    title: "editar",
    container: document.getElementById("primary-pane")
});
let secondary_pane: null | Pane = null;

export function edit_charge(charge: Charge) {
    try { secondary_pane?.dispose(); } catch(err) {};
    secondary_pane = new Pane({
        container: document.getElementById("secondary-pane")
    });
    secondary_pane.addBinding(charge, "pos", {
        label: "posição",
        x: { min: worldX(0), max: worldX(window.innerWidth) },
        y: { min: worldY(0), max: worldY(window.innerHeight) }
    });
    secondary_pane.addBinding(charge, "charge", { label: "carga" });
    secondary_pane.addBinding(charge, "radius", { label: "raio", min: 0 });
    secondary_pane.addBinding(charge, "color", { label: "cor" });
    secondary_pane.addButton({ title: "remover" }).on("click", () => {
        charges.splice(charges.indexOf(charge), 1);
        secondary_pane.dispose();
    });
    secondary_pane.addButton({ title: "terminar" }).on("click", () => secondary_pane.dispose());
}
export function edit_field_line(field_line: FieldLine) {
    try { secondary_pane?.dispose(); } catch(err) {};
    secondary_pane = new Pane({
        container: document.getElementById("secondary-pane")
    });
    secondary_pane.addBinding(field_line, "anchor_point", {
        label: "posição inicial",
        x: { min: worldX(0), max: worldX(window.innerWidth) },
        y: { min: worldY(0), max: worldY(window.innerHeight) }
    });
    secondary_pane.addBinding(field_line, "da", { label: "resolução angular", min: 0, max: 0.1 });
    secondary_pane.addBinding(field_line, "ds", { label: "resolução linear", min: 0 });
    secondary_pane.addBinding(field_line, "width", { label: "espessura", min: 0.01 });
    secondary_pane.addBinding(field_line, "color", { label: "cor" });
    secondary_pane.addButton({ title: "remover" }).on("click", () => {
        field_lines.splice(field_lines.indexOf(field_line), 1);
        secondary_pane.dispose();
    });
    secondary_pane.addButton({ title: "terminar" }).on("click", () => secondary_pane.dispose());
}

main_pane.addButton({ title: "nova carga" }).on("click", () => {
    const charge = new Charge(new Vector(0, 0), 1, 2, "#ffffffff");
    charges.push(charge);
    edit_charge(charge);
});
main_pane.addButton({ title: "nova linha de força" }).on("click", () => {
    const field_line = new FieldLine(new Vector(0, 0), 0.2, "#ffffffff", 0.01, 10);
    field_lines.push(field_line);
    edit_field_line(field_line);
});

let selected_object: null | Charge | FieldLine = null;
let pointer_coords: [number, number] = [0, 0];
window.onpointerup = event => {
    if (Math.hypot(event.x - pointer_coords[0], event.y - pointer_coords[1]) < 10 && selected_object !== null) {
        if (selected_object instanceof Charge) {
            edit_charge(selected_object);
        } else {
            edit_field_line(selected_object);
        }
    }
    selected_object = null;
}

canvas.onpointerdown = event => {
    pointer_coords = [event.x, event.y];

    // render backwards, the first thing that renders on top of the mouse is selected
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const pixel_changed = () => ctx.getImageData(event.x, event.y, 1, 1).data[3] > 0;
    for (let i = charges.length - 1; i >= 0; i--) {
        charges[i].render();
        if (pixel_changed()) {
            selected_object = charges[i];
            return;
        }
    }
    for (let i = field_lines.length - 1; i >= 0; i--) {
        field_lines[i].render(field);
        if (pixel_changed()) {
            selected_object = field_lines[i];
            return;
        }
    }
};

canvas.onpointermove = event => {
    if (Math.hypot(event.x - pointer_coords[0], event.y - pointer_coords[1]) < 10) return;
    if (selected_object === null) return;
    if (selected_object instanceof Charge) {
        selected_object.pos.x = worldX(event.x);
        selected_object.pos.y = worldY(event.y);
    } else {
        selected_object.anchor_point.x = worldX(event.x);
        selected_object.anchor_point.y = worldY(event.y);
    }
};
