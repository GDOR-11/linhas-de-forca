import { BindingParams, Pane } from "tweakpane";
import { removeObject } from ".";
import { AbstractVector } from "vector2d";

export default interface WorldObject {
    pane_bindings: { [prop: string]: BindingParams }
    position: AbstractVector;
    z_index: number;
    render(ctx: CanvasRenderingContext2D): void;
    render_hitbox(ctx: CanvasRenderingContext2D): void;
};

export function open_editor(object: WorldObject, pane_container: HTMLElement): Pane {
    // alert("here");
    let pane = new Pane({ container: pane_container });
    for (let key in object.pane_bindings) {;
        // alert("1" + key);
        if (!(key in object)) throw "pane_bindings must only have keys of the class";
        // alert(key + " accepted as " + object[key] + " with settings " + JSON.stringify());
        pane.addBinding(object, key as keyof object, object.pane_bindings[key]);
    }
    pane.addButton({ title: "remover" }).on("click", () => {
        removeObject(object);
        pane.dispose();
    });
    pane.addButton({ title: "terminar" }).on("click", () => pane.dispose());

    return pane;
}
