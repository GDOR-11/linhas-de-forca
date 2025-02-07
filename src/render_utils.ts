export type Color = string;

export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d");

export function screenX(world_x: number) {
    return window.innerWidth * (world_x / 10 + 0.5);
}
export function screenY(world_y: number) {
    return window.innerWidth * world_y / 10 + window.innerHeight / 2;
}
export function screenLength(world_length: number) {
    return window.innerWidth * world_length / 10;
}

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("load", onResize);
window.addEventListener("resize", onResize);
