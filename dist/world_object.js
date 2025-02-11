import { Pane } from "tweakpane";
import { removeObject } from ".";
export function open_editor(object, pane_container) {
    var pane = new Pane({ container: pane_container });
    for (var key in object.constructor.pane_bindings) {
        if (!(key in object))
            throw "pane_bindings must only have keys of the class";
        pane.addBinding(object, key, this.pane_bindings[key]);
    }
    pane.addButton({ title: "remover" }).on("click", function () {
        removeObject(object);
        pane.dispose();
    });
    pane.addButton({ title: "terminar" }).on("click", function () { return pane.dispose(); });
    return pane;
}
