/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/charge.ts":
/*!***********************!*\
  !*** ./src/charge.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _render_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render_utils */ \"./src/render_utils.ts\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ \"./src/index.ts\");\n\n\nvar Charge = /** @class */ (function () {\n    function Charge(pos, charge, radius, color) {\n        this.pos = pos;\n        this.charge = charge;\n        this.radius = radius;\n        this.color = color;\n    }\n    Charge.prototype.render = function () {\n        _render_utils__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = this.color;\n        _render_utils__WEBPACK_IMPORTED_MODULE_0__.ctx.beginPath();\n        _render_utils__WEBPACK_IMPORTED_MODULE_0__.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);\n        _render_utils__WEBPACK_IMPORTED_MODULE_0__.ctx.fill();\n    };\n    Charge.prototype.getField = function (s) {\n        var d = s.clone().subtract(this.pos);\n        return d.clone().normalize().mulS(___WEBPACK_IMPORTED_MODULE_1__.k * this.charge / Math.pow(d.magnitude(), 2));\n    };\n    return Charge;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Charge);\n\n\n//# sourceURL=webpack://linhas-de-forca/./src/charge.ts?");

/***/ }),

/***/ "./src/field_lines.ts":
/*!****************************!*\
  !*** ./src/field_lines.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FieldLine: () => (/* binding */ FieldLine)\n/* harmony export */ });\n/* harmony import */ var _render_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render_utils */ \"./src/render_utils.ts\");\n\nvar FieldLine = /** @class */ (function () {\n    function FieldLine(anchor_point, width, color, da) {\n        this.anchor_point = anchor_point.clone();\n        this.width = width;\n        this.color = color;\n        this.da = da;\n    }\n    FieldLine.prototype.render = function (field) {\n        var _this = this;\n        var integrate = function (side) {\n            // euler integration with normalized derivative and controlled dt to maintain angular resolution da\n            var s = _this.anchor_point.clone();\n            _render_utils__WEBPACK_IMPORTED_MODULE_0__.ctx.beginPath();\n            _render_utils__WEBPACK_IMPORTED_MODULE_0__.ctx.moveTo(s.x, s.y);\n            var ds = 1;\n            for (var i = 0; i < 10000; i++) {\n                var E = field(s).mulS(side).normalize();\n                var new_s = s.clone().add(E.clone().mulS(ds));\n                var new_E = field(new_s).mulS(side).normalize();\n                if (E.dot(new_E) < Math.pow(_this.da, 2) / 2) {\n                    ds /= 2;\n                    continue;\n                }\n                else {\n                    s = new_s;\n                    ds = 1;\n                }\n                _render_utils__WEBPACK_IMPORTED_MODULE_0__.ctx.lineTo(s.x, s.y);\n            }\n            _render_utils__WEBPACK_IMPORTED_MODULE_0__.ctx.strokeStyle = _this.color;\n            _render_utils__WEBPACK_IMPORTED_MODULE_0__.ctx.lineWidth = _this.width;\n            _render_utils__WEBPACK_IMPORTED_MODULE_0__.ctx.stroke();\n        };\n        integrate(1);\n        integrate(-1);\n    };\n    return FieldLine;\n}());\n\n\n\n//# sourceURL=webpack://linhas-de-forca/./src/field_lines.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   k: () => (/* binding */ k),\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vector2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vector2d */ \"./node_modules/vector2d/src/Vec2D.js\");\n/* harmony import */ var vector2d__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vector2d__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _charge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./charge */ \"./src/charge.ts\");\n/* harmony import */ var _field_lines__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./field_lines */ \"./src/field_lines.ts\");\n/* harmony import */ var _render_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render_utils */ \"./src/render_utils.ts\");\n\n\n\n\nvar k = 100;\nvar charges = [\n    new _charge__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new vector2d__WEBPACK_IMPORTED_MODULE_0__.Vector(250, 500), -10, 10, \"blue\"),\n    new _charge__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new vector2d__WEBPACK_IMPORTED_MODULE_0__.Vector(350, 500), 10, 10, \"red\"),\n];\nvar field_lines = [];\nfor (var a = 0; a < 2 * Math.PI; a += 2 * Math.PI / 100) {\n    var p = new vector2d__WEBPACK_IMPORTED_MODULE_0__.Vector(250 + 10 * Math.cos(a), 500 + 10 * Math.sin(a));\n    field_lines.push(new _field_lines__WEBPACK_IMPORTED_MODULE_2__.FieldLine(p, 1, \"white\", 0.1));\n}\nfunction field(s) {\n    return charges.reduce(function (a, b) { return a.add(b.getField(s)); }, new vector2d__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 0));\n}\nfunction render() {\n    _render_utils__WEBPACK_IMPORTED_MODULE_3__.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);\n    field_lines.forEach(function (field_line) { return field_line.render(field); });\n    charges.forEach(function (charge) { return charge.render(); });\n}\n\n\n//# sourceURL=webpack://linhas-de-forca/./src/index.ts?");

/***/ }),

/***/ "./src/render_utils.ts":
/*!*****************************!*\
  !*** ./src/render_utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ctx: () => (/* binding */ ctx)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/index.ts\");\n\nvar canvas = document.getElementById(\"canvas\");\nvar ctx = canvas.getContext(\"2d\");\nfunction onResize() {\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n    (0,___WEBPACK_IMPORTED_MODULE_0__.render)();\n}\nwindow.addEventListener(\"load\", onResize);\nwindow.addEventListener(\"resize\", onResize);\n\n\n//# sourceURL=webpack://linhas-de-forca/./src/render_utils.ts?");

/***/ }),

/***/ "./node_modules/vector2d/src/AbstractVector.js":
/*!*****************************************************!*\
  !*** ./node_modules/vector2d/src/AbstractVector.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n/**\n * These values are used by the `AbstractVector.round` method to increase\n * performance vs. using  Number.toFixed.\n */\nvar precision = [\n    1,\n    10,\n    100,\n    1000,\n    10000,\n    100000,\n    1000000,\n    10000000,\n    100000000,\n    1000000000,\n    10000000000\n];\n/**\n * The class that all other vector representations are derived from.\n *\n * Contains the core implementation for all methods that will be exposed by\n * vector instances.\n *\n * Example of creating a custom implementation:\n *\n * ```ts\n * import { AbstractVector } from \"./AbstractVector\"\n *\n * export class MyCustomVector extends AbstractVector {\n *  constructor (x: number, y: number) {\n *    super(CustomVectorType)\n *  }\n * }\n * ```\n */\nvar AbstractVector = /** @class */ (function () {\n    function AbstractVector(ctor) {\n        this.ctor = ctor;\n    }\n    /**\n     * Set both x and y axis value\n     * @param x   New x val\n     * @param y   New y val\n     */\n    AbstractVector.prototype.setAxes = function (x, y) {\n        this.x = x;\n        this.y = y;\n        return this;\n    };\n    /**\n     * Getter for x the axis value\n     */\n    AbstractVector.prototype.getX = function () {\n        return this.x;\n    };\n    /**\n     * Setter for x axis value\n     */\n    AbstractVector.prototype.setX = function (x) {\n        this.x = x;\n        return this;\n    };\n    /**\n     * Getter for y axis value\n     */\n    AbstractVector.prototype.getY = function () {\n        return this.y;\n    };\n    /**\n     * Setter for y axis.\n     */\n    AbstractVector.prototype.setY = function (y) {\n        this.y = y;\n        return this;\n    };\n    /**\n     * Return the vector as a formatted string, e.g \"(0, 4)\"\n     */\n    AbstractVector.prototype.toString = function (round) {\n        if (round === void 0) { round = false; }\n        if (round) {\n            return \"(\" + Math.round(this.x) + \", \" + Math.round(this.y) + \")\";\n        }\n        return \"(\" + this.x + \", \" + this.y + \")\";\n    };\n    /**\n     * Return an Array containing the vector axes, e.g [0, 4]\n     */\n    AbstractVector.prototype.toArray = function () {\n        return [this.x, this.y];\n    };\n    /**\n     * Return an Object containing the vector axes, e.g { x: 0, y: 4 }\n     */\n    AbstractVector.prototype.toObject = function () {\n        return {\n            x: this.x,\n            y: this.y\n        };\n    };\n    /**\n     * Add the provided vector to this one\n     */\n    AbstractVector.prototype.add = function (vec) {\n        this.x += vec.x;\n        this.y += vec.y;\n        return this;\n    };\n    /**\n     * Subtract the provided vector from this one\n     */\n    AbstractVector.prototype.subtract = function (vec) {\n        this.x -= vec.x;\n        this.y -= vec.y;\n        return this;\n    };\n    /**\n     * Check if the provided vector equal to this one\n     */\n    AbstractVector.prototype.equals = function (vec) {\n        return vec.x === this.x && vec.y === this.y;\n    };\n    /**\n     * Multiply this vector by the provided vector\n     */\n    AbstractVector.prototype.multiplyByVector = function (vec) {\n        this.x *= vec.x;\n        this.y *= vec.y;\n        return this;\n    };\n    /**\n     * Multiply this vector by the provided vector\n     */\n    AbstractVector.prototype.mulV = function (vec) {\n        return this.multiplyByVector(vec);\n    };\n    /**\n     * Divide this vector by the provided vector\n     */\n    AbstractVector.prototype.divideByVector = function (vec) {\n        this.x /= vec.x;\n        this.y /= vec.y;\n        return this;\n    };\n    /**\n     * Divide this vector by the provided vector\n     */\n    AbstractVector.prototype.divV = function (v) {\n        return this.divideByVector(v);\n    };\n    /**\n     * Multiply this vector by the provided number\n     */\n    AbstractVector.prototype.multiplyByScalar = function (n) {\n        this.x *= n;\n        this.y *= n;\n        return this;\n    };\n    /**\n     * Multiply this vector by the provided number\n     */\n    AbstractVector.prototype.mulS = function (n) {\n        return this.multiplyByScalar(n);\n    };\n    /**\n     * Divive this vector by the provided number\n     */\n    AbstractVector.prototype.divideByScalar = function (n) {\n        this.x /= n;\n        this.y /= n;\n        return this;\n    };\n    /**\n     * Divive this vector by the provided number\n     */\n    AbstractVector.prototype.divS = function (n) {\n        return this.divideByScalar(n);\n    };\n    /**\n     * Normalise this vector\n     */\n    AbstractVector.prototype.normalise = function () {\n        return this.divideByScalar(this.magnitude());\n    };\n    /**\n     * For American spelling. Same as unit/normalise function\n     */\n    AbstractVector.prototype.normalize = function () {\n        return this.normalise();\n    };\n    /**\n     * The same as normalise and normalize\n     */\n    AbstractVector.prototype.unit = function () {\n        return this.normalise();\n    };\n    /**\n     * Returns the magnitude (length) of this vector\n     */\n    AbstractVector.prototype.magnitude = function () {\n        var x = this.x;\n        var y = this.y;\n        return Math.sqrt(x * x + y * y);\n    };\n    /**\n     * Returns the magnitude (length) of this vector\n     */\n    AbstractVector.prototype.length = function () {\n        return this.magnitude();\n    };\n    /**\n     * Returns the squred length of this vector\n     */\n    AbstractVector.prototype.lengthSq = function () {\n        var x = this.x;\n        var y = this.y;\n        return x * x + y * y;\n    };\n    /**\n     * Returns the dot product of this vector by another\n     */\n    AbstractVector.prototype.dot = function (vec) {\n        return vec.x * this.x + vec.y * this.y;\n    };\n    /**\n     * Returns the cross product of this vector by another.\n     */\n    AbstractVector.prototype.cross = function (vec) {\n        return this.x * vec.y - this.y * vec.x;\n    };\n    /**\n     * Reverses this vector i.e multiplies it by -1\n     */\n    AbstractVector.prototype.reverse = function () {\n        this.x = -this.x;\n        this.y = -this.y;\n        return this;\n    };\n    /**\n     * Set the vector axes values to absolute values\n     */\n    AbstractVector.prototype.abs = function () {\n        this.x = Math.abs(this.x);\n        this.y = Math.abs(this.y);\n        return this;\n    };\n    /**\n     * Zeroes the vector i.e sets all axes to 0\n     */\n    AbstractVector.prototype.zero = function () {\n        this.x = this.y = 0;\n        return this;\n    };\n    /**\n     * Returns the distance between this vector and another\n     */\n    AbstractVector.prototype.distance = function (v) {\n        var x = this.x - v.x;\n        var y = this.y - v.y;\n        return Math.sqrt(x * x + y * y);\n    };\n    /**\n     * Rotates the vetor by provided radians\n     */\n    AbstractVector.prototype.rotate = function (rads) {\n        var cos = Math.cos(rads);\n        var sin = Math.sin(rads);\n        var ox = this.x;\n        var oy = this.y;\n        this.x = ox * cos - oy * sin;\n        this.y = ox * sin + oy * cos;\n        return this;\n    };\n    /**\n     * Rounds this vector to n decimal places\n     */\n    AbstractVector.prototype.round = function (n) {\n        if (n === void 0) { n = 2; }\n        var p = precision[n];\n        // This performs waaay better than toFixed and give Float32 the edge again.\n        // http://www.dynamicguru.com/javascript/round-numbers-with-precision/\n        this.x = ((0.5 + this.x * p) << 0) / p;\n        this.y = ((0.5 + this.y * p) << 0) / p;\n        return this;\n    };\n    /**\n     * Returns a copy of this vector\n     */\n    AbstractVector.prototype.clone = function () {\n        return new this.ctor(this.x, this.y);\n    };\n    return AbstractVector;\n}());\nexports.AbstractVector = AbstractVector;\n//# sourceMappingURL=AbstractVector.js.map\n\n//# sourceURL=webpack://linhas-de-forca/./node_modules/vector2d/src/AbstractVector.js?");

/***/ }),

/***/ "./node_modules/vector2d/src/ArrayVector.js":
/*!**************************************************!*\
  !*** ./node_modules/vector2d/src/ArrayVector.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar AbstractVector_1 = __webpack_require__(/*! ./AbstractVector */ \"./node_modules/vector2d/src/AbstractVector.js\");\n/**\n * A vector representation that stores the axes in an Array\n *\n * ```\n * const v = new Vec2D.ArrayVector(2, 5)\n * ```\n */\nvar ArrayVector = /** @class */ (function (_super) {\n    __extends(ArrayVector, _super);\n    function ArrayVector(x, y) {\n        var _this = _super.call(this, ArrayVector) || this;\n        _this.axes = [x, y];\n        _this.ctor = ArrayVector;\n        return _this;\n    }\n    Object.defineProperty(ArrayVector.prototype, \"x\", {\n        get: function () {\n            return this.axes[0];\n        },\n        set: function (x) {\n            this.axes[0] = x;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(ArrayVector.prototype, \"y\", {\n        get: function () {\n            return this.axes[1];\n        },\n        set: function (y) {\n            this.axes[1] = y;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return ArrayVector;\n}(AbstractVector_1.AbstractVector));\nexports.ArrayVector = ArrayVector;\n//# sourceMappingURL=ArrayVector.js.map\n\n//# sourceURL=webpack://linhas-de-forca/./node_modules/vector2d/src/ArrayVector.js?");

/***/ }),

/***/ "./node_modules/vector2d/src/Float32Vector.js":
/*!****************************************************!*\
  !*** ./node_modules/vector2d/src/Float32Vector.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar AbstractVector_1 = __webpack_require__(/*! ./AbstractVector */ \"./node_modules/vector2d/src/AbstractVector.js\");\n/**\n * A vector representation that stores the axes in a Float32Array\n *\n * ```\n * const v = new Vec2D.Float32Vector(2, 5)\n * ```\n */\nvar Float32Vector = /** @class */ (function (_super) {\n    __extends(Float32Vector, _super);\n    function Float32Vector(x, y) {\n        var _this = _super.call(this, Float32Vector) || this;\n        _this.axes = new Float32Array(2);\n        _this.axes[0] = x;\n        _this.axes[1] = y;\n        return _this;\n    }\n    Object.defineProperty(Float32Vector.prototype, \"x\", {\n        get: function () {\n            return this.axes[0];\n        },\n        set: function (x) {\n            this.axes[0] = x;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Float32Vector.prototype, \"y\", {\n        get: function () {\n            return this.axes[1];\n        },\n        set: function (y) {\n            this.axes[1] = y;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return Float32Vector;\n}(AbstractVector_1.AbstractVector));\nexports.Float32Vector = Float32Vector;\n//# sourceMappingURL=Float32Vector.js.map\n\n//# sourceURL=webpack://linhas-de-forca/./node_modules/vector2d/src/Float32Vector.js?");

/***/ }),

/***/ "./node_modules/vector2d/src/Vec2D.js":
/*!********************************************!*\
  !*** ./node_modules/vector2d/src/Vec2D.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__export(__webpack_require__(/*! ./AbstractVector */ \"./node_modules/vector2d/src/AbstractVector.js\"));\n__export(__webpack_require__(/*! ./ArrayVector */ \"./node_modules/vector2d/src/ArrayVector.js\"));\n__export(__webpack_require__(/*! ./Float32Vector */ \"./node_modules/vector2d/src/Float32Vector.js\"));\n__export(__webpack_require__(/*! ./Vector */ \"./node_modules/vector2d/src/Vector.js\"));\n//# sourceMappingURL=Vec2D.js.map\n\n//# sourceURL=webpack://linhas-de-forca/./node_modules/vector2d/src/Vec2D.js?");

/***/ }),

/***/ "./node_modules/vector2d/src/Vector.js":
/*!*********************************************!*\
  !*** ./node_modules/vector2d/src/Vector.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar AbstractVector_1 = __webpack_require__(/*! ./AbstractVector */ \"./node_modules/vector2d/src/AbstractVector.js\");\n/**\n * A vector representation that stores the axes as part of the instance itself\n *\n * ```ts\n * const v = new Vec2D.Vector(2, 5)\n * ```\n */\nvar Vector = /** @class */ (function (_super) {\n    __extends(Vector, _super);\n    function Vector(x, y) {\n        var _this = _super.call(this, Vector) || this;\n        _this._x = x;\n        _this._y = y;\n        return _this;\n    }\n    Object.defineProperty(Vector.prototype, \"x\", {\n        get: function () {\n            return this._x;\n        },\n        set: function (x) {\n            this._x = x;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Vector.prototype, \"y\", {\n        get: function () {\n            return this._y;\n        },\n        set: function (y) {\n            this._y = y;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return Vector;\n}(AbstractVector_1.AbstractVector));\nexports.Vector = Vector;\n//# sourceMappingURL=Vector.js.map\n\n//# sourceURL=webpack://linhas-de-forca/./node_modules/vector2d/src/Vector.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;