import { Pane } from "tweakpane";
import Charge from "./charge";
import { Vector } from "vector2d";
import { charges, field_lines } from ".";
import { FieldLine } from "./field_lines";

const main_pane = new Pane({
    title: "editar",
    container: document.getElementById("primary-pane")
});

export function edit_charge(charge: Charge) {
    const new_charge_pane = new Pane({
        container: document.getElementById("secondary-pane")
    });
    new_charge_pane.addBinding(charge, "pos", { label: "posição" });
    new_charge_pane.addBinding(charge, "charge", { label: "carga" });
    new_charge_pane.addBinding(charge, "radius", { label: "raio", min: 0 });
    new_charge_pane.addBinding(charge, "color", { label: "cor" });
    new_charge_pane.addButton({ title: "terminar" }).on("click", () => new_charge_pane.dispose());
}
export function edit_field_line(field_line: FieldLine) {
    const new_field_line_pane = new Pane({
        container: document.getElementById("secondary-pane")
    });
    new_field_line_pane.addBinding(field_line, "anchor_point", { label: "posição inicial" });
    new_field_line_pane.addBinding(field_line, "da", { label: "resolução angular", min: 0, max: 0.1 });
    new_field_line_pane.addBinding(field_line, "ds", { label: "resolução linear", min: 0 });
    new_field_line_pane.addBinding(field_line, "width", { label: "espessura", min: 0.01 });
    new_field_line_pane.addBinding(field_line, "color", { label: "cor" });
    new_field_line_pane.addButton({ title: "terminar" }).on("click", () => new_field_line_pane.dispose());
}

main_pane.addButton({ title: "nova carga" }).on("click", () => {
    const charge = new Charge(new Vector(0, 0), 1, 1, "#ffffffff");
    charges.push(charge);
    edit_charge(charge);
});
main_pane.addButton({ title: "nova linha de força" }).on("click", () => {
    const field_line = new FieldLine(new Vector(0, 0), 0.1, "#ffffffff", 0.1, 10);
    field_lines.push(field_line);
    edit_field_line(field_line);
});
