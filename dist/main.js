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

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/*! exports provided: Block */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Block\", function() { return Block; });\nconst Block = function(x, y, width, height) {\n  return {x, y, width, height};\n}\n\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/brick.js":
/*!**********************!*\
  !*** ./src/brick.js ***!
  \**********************/
/*! exports provided: Brick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Brick\", function() { return Brick; });\nconst Brick = function(x, y, width, height) {\n  function getXofTime(x0, vx) {\n    return function(time) {\n      const t = msToSeconds(time);\n      return x0 + vx * t; // px\n    }\n  }\n\n  function getYofTime(x0, vy) {\n    const a = -3000; // px/second^2\n    return function(time) {\n      const t = msToSeconds(time);\n      return x0 + vy * t + a * t**2 / 2; // px\n    }\n  }\n\n  function msToSeconds(ms) {\n    return ms / 1000;\n  }\n\n  return {x, y, width, height, getXofTime, getYofTime, isJumping: false};\n};\n\n\n//# sourceURL=webpack:///./src/brick.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _brick_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brick.js */ \"./src/brick.js\");\n/* harmony import */ var _block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.js */ \"./src/block.js\");\n\n\n\n\nfunction GameGUI() {\n  const container = document.querySelector(\".content\");\n  const containerWidth = container.offsetWidth;\n  const containerHeight = container.offsetHeight;\n\n  const brickObj = Object(_brick_js__WEBPACK_IMPORTED_MODULE_0__[\"Brick\"])(0, 0, 50, 50);\n  const brick = initializeBlock(brickObj, \"brick\");\n\n  const blockObj = Object(_block_js__WEBPACK_IMPORTED_MODULE_1__[\"Block\"])(250, 300, 50, 50);\n  const block = initializeBlock(blockObj, \"block\");\n\n  container.addEventListener(\"click\", jump);\n\n  function jump(e) {\n    if (brickObj.isJumping) return;\n    brickObj.isJumping = true;\n    let x = brickObj.getXofTime(brickObj.x, getXspeed(e));\n    let y = brickObj.getYofTime(brickObj.y, getYspeed(e));\n    let start = performance.now();\n    requestAnimationFrame(function animate() {\n      let time = performance.now() - start;\n      brickObj.x = x(time);\n      brickObj.y = y(time);\n      if (brickObj.y < 0) {\n        brickObj.isJumping = false;\n        brickObj.y = 0;\n      } else if (isBrickOnBlock()) {\n        brickObj.isJumping = false;\n        brickObj.y = blockObj.y + blockObj.height;\n      } else if (isBrickUnderBlock()) {\n        brickObj.y = blockObj.y - brickObj.height;\n        y = brickObj.getYofTime(brickObj.y, 0);\n        requestAnimationFrame(animate);\n      } else if (isBrickNearBlock()) {\n        x = brickObj.getXofTime(brickObj.x, -getXspeed(e));\n        requestAnimationFrame(animate);\n      } else {\n        requestAnimationFrame(animate);\n      }\n      render();\n    })\n  }\n\n  function render() {\n    if (isBrickNearBlock()) console.log(isBrickNearBlock());\n    brick.style.left = brickObj.x + \"px\";\n    brick.style.bottom = brickObj.y + \"px\";\n  }\n\n  function initializeBlock(blockObj, blockClass) {\n    const block = document.createElement(\"div\");\n    block.classList.add(blockClass);\n    block.style.width = blockObj.width + \"px\";\n    block.style.height = blockObj.height + \"px\";\n    block.style.left = blockObj.x + \"px\";\n    block.style.bottom = blockObj.y + \"px\";\n    container.appendChild(block);\n    return block;\n  }\n\n  function isBrickOnBlock() {\n    return brickObj.x < (blockObj.x + blockObj.width) &&\n      brickObj.x > (blockObj.x - brickObj.width) &&\n      brickObj.y <= (blockObj.y + blockObj.height) &&\n      brickObj.y > (blockObj.y + blockObj.height/3);\n  }\n\n  function isBrickUnderBlock() {\n    return brickObj.x < (blockObj.x + blockObj.width) &&\n      brickObj.x > (blockObj.x - brickObj.width) &&\n      (brickObj.y + brickObj.height) >= blockObj.y &&\n      (brickObj.y + brickObj.height) < (blockObj.y + blockObj.height/3);\n  }\n\n  function isBrickNearBlock() {\n    return brickObj.y < (blockObj.y + blockObj.height) &&\n      brickObj.y > (blockObj.y - brickObj.height) &&\n      ((brickObj.x + brickObj.width) >= blockObj.x &&\n       (brickObj.x + brickObj.width) < blockObj.x + blockObj.width/4 ||\n       brickObj.x > (blockObj.x + blockObj.width * 3/4) &&\n       brickObj.x <= (blockObj.x + blockObj.width));\n  }\n\n  function getXspeed(e) {\n    return (e.pageX - brickObj.x) * 3;\n  }\n\n  function getYspeed(e) {\n    return (containerHeight - e.pageY - brickObj.y) * 3;\n  }\n};\n\nGameGUI();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });