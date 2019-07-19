/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/brick.js":
/*!**********************!*\
  !*** ./src/brick.js ***!
  \**********************/
/*! exports provided: Brick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Brick\", function() { return Brick; });\nconst Brick = (function(x, y) {\n\n  function getXofTime(x0, vx) {\n    return function(time) {\n      const t = msToSeconds(time);\n      return x0 + vx * t; // px\n    }\n  }\n\n  function getYofTime(x0, vy) {\n    const a = -3000; // px/second^2\n    return function(time) {\n      const t = msToSeconds(time);\n      return x0 + vy * t + a * t**2 / 2; // px\n    }\n  }\n\n  function msToSeconds(ms) {\n    return ms / 1000;\n  }\n\n  return {x, y, getXofTime, getYofTime};\n})();\n\n\n//# sourceURL=webpack:///./src/brick.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _brick_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brick.js */ \"./src/brick.js\");\n\n\n\nfunction GameGUI() {\n  const container = document.querySelector(\".content\");\n  const containerWidth = container.offsetWidth;\n  const containerHeight = container.offsetHeight;\n\n  const brick = document.createElement(\"div\");\n  brick.classList.add(\"brick\");\n  brick.style.width = 50 + \"px\";\n  brick.style.height = 50 + \"px\";\n  brick.style.left = 0;\n  brick.style.bottom = 0;\n  container.appendChild(brick);\n\n  container.addEventListener(\"click\", jump);\n\n  function jump(e) {\n    const x = _brick_js__WEBPACK_IMPORTED_MODULE_0__[\"Brick\"].getXofTime(parseInt(brick.style.left), getXspeed(e));\n    const y = _brick_js__WEBPACK_IMPORTED_MODULE_0__[\"Brick\"].getYofTime(parseInt(brick.style.bottom), getYspeed(e));\n    let start = performance.now();\n    requestAnimationFrame(function animate() {\n      let time = performance.now() - start;\n      // If brick is not underground\n      if (parseInt(brick.style.bottom) >= 0) {\n        brick.style.left = x(time) + \"px\";\n        brick.style.bottom = y(time) + \"px\";\n        requestAnimationFrame(animate);\n      } else {\n        brick.style.left = x(time) + \"px\";\n        brick.style.bottom = 0;\n      }\n    })\n  }\n\n  function getXspeed(e) {\n    return (e.pageX - parseInt(brick.style.left)) * 3;\n  }\n\n  function getYspeed(e) {\n    return (containerHeight - e.pageY - parseInt(brick.style.bottom)) * 3;\n  }\n};\n\nGameGUI();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });