import { render } from ".";

export type Color = string;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d");

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
}
window.addEventListener("load", onResize);
window.addEventListener("resize", onResize);
