/*
 * @Author: 冯铄
 * @Date: 2021-01-06 16:14:29
 * @LastEditTime: 2021-01-06 16:14:30
 * @Description:
 */
/******/ (() => {
	// webpackBootstrap
	/******/ 'use strict';
	/******/ var __webpack_modules__ = [
		// 数组内容为两个函数
		/* 0 */
		/***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
			__webpack_require__.r(__webpack_exports__); // define __esModule on exports
			/* harmony（和谐） import */ var _heading_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

			const heading = (0, _heading_js__WEBPACK_IMPORTED_MODULE_0__.default)();
			document.body.append(heading);

			/***/
		},
		/* 1 */
		/***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
			__webpack_require__.r(__webpack_exports__);
			/* harmony export */ __webpack_require__.d(__webpack_exports__, {
				// define getter functions for harmony exports
				/* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
				/* harmony export */
			});
			/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = () => {
				const element = document.createElement('h2');
				element.textContent = 'Hello webpack';
				element.addEventListener('click', () => alert('Hello webpack'));
				return element;
			};

			/***/
		},
		/******/
	]; // The module cache
	/************************************************************************/
	/******/ /******/ var __webpack_module_cache__ = {}; // The require function
	/******/
	/******/ /******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ if (__webpack_module_cache__[moduleId]) {
			/******/ return __webpack_module_cache__[moduleId].exports;
			/******/
		} // Create a new module (and put it into the cache)
		/******/ /******/ var module = (__webpack_module_cache__[moduleId] = {
			/******/ // no module.id needed
			/******/ // no module.loaded needed
			/******/ exports: {},
			/******/
		}); // Execute the module function
		/******/
		/******/ /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__); // Return the exports of the module
		/******/
		/******/ /******/ return module.exports;
		/******/
	} /* webpack/runtime/define property getters */
	/******/
	/************************************************************************/
	/******/ /******/ (() => {
		/******/ // define getter functions for harmony exports
		/******/ __webpack_require__.d = (exports, definition) => {
			/******/ for (var key in definition) {
				/******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
					/******/ Object.defineProperty(exports, key, {
						enumerable: true,
						get: definition[key],
					});
					/******/
				}
				/******/
			}
			/******/
		};
		/******/
	})(); /* webpack/runtime/hasOwnProperty shorthand(速记，简写) */
	/******/
	/******/ /******/ (() => {
		/******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
		/******/
	})(); /* webpack/runtime/make namespace object */
	/******/
	/******/ /******/ (() => {
		/******/ // define __esModule on exports
		/******/ __webpack_require__.r = (exports) => {
			/******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
				/******/ Object.defineProperty(exports, Symbol.toStringTag, {
					value: 'Module',
				});
				/******/
			}
			/******/ Object.defineProperty(exports, '__esModule', {
				value: true,
			});
			/******/
		};
		/******/
	})(); // startup // Load entry module
	/******/
	/************************************************************************/
	/******/ /******/ /******/ __webpack_require__(0); // 这是开始，后面的代码里会陆续调用webpack_require__(2,3,4...)
	/******/ // This entry module used 'exports' so it can't be inlined
	/******/
})();
