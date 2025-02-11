export var canvas = document.getElementById("canvas");
export var ctx = canvas.getContext("2d");
export function screenX(world_x) {
    return window.innerWidth * (world_x / 20 + 0.5);
}
export function screenY(world_y) {
    return window.innerWidth * world_y / 20 + window.innerHeight / 2;
}
export function screenLength(world_length) {
    return window.innerWidth * world_length / 20;
}
export function worldX(screen_x) {
    return 20 * screen_x / window.innerWidth - 10;
}
export function worldY(screen_y) {
    return (screen_y - window.innerHeight / 2) * 20 / window.innerWidth;
}
export function worldLength(screen_length) {
    return 20 * screen_length / window.innerWidth;
}
function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("load", onResize);
window.addEventListener("resize", onResize);
