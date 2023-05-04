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

/***/ "./src.js":
/*!****************!*\
  !*** ./src.js ***!
  \****************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js */ \"https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__]);\nhttps_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n// import {AnnotationsPlugin} from '@xeokit/xeokit-sdk/src/plugins/AnnotationsPlugin/AnnotationsPlugin.js'\n// import * as xeokit from 'https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js';\n\n// const Viewer = xeokit.Viewer;\n// const WebIFCLoaderPlugin = xeokit.WebIFCLoaderPlugin;\n// const XKTLoaderPlugin = xeokit.XKTLoaderPlugin;\n// const NavCubePlugin = xeokit.NavCubePlugin;\n// const SectionPlanesPlugin = xeokit.SectionPlanesPlugin;\n// const math = xeokit.math;\n// const DistanceMeasurementsPlugin = xeokit.DistanceMeasurementsPlugin;\n// const ContextMenu = xeokit.ContextMenu;\n// const TreeViewPlugin = xeokit.TreeViewPlugin;\n// const AnnotationsPlugin = xeokit.AnnotationsPlugin;\n\n// The rest of your script\n\nvar viewer = new https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.Viewer({\n  canvasId: \"myCanvas\",\n  transparent: true\n});\nviewer.camera.eye = [-3.933, 2.855, 27.018];\nviewer.camera.look = [4.400, 3.724, 8.899];\nviewer.camera.up = [-0.018, 0.999, 0.039];\nviewer.camera.zoom(5);\nvar xktLoader = new https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.XKTLoaderPlugin(viewer);\nnew https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.NavCubePlugin(viewer, {\n  canvasId: \"myNavCubeCanvas\",\n  color: \"lightblue\",\n  visible: true,\n  // Initially visible (default)\n  cameraFly: true,\n  // Fly camera to each selected axis/diagonal\n  cameraFitFOV: 45,\n  // How much field-of-view the scene takes once camera has fitted it to view\n  cameraFlyDuration: 0.5 // How long (in seconds) camera takes to fly to each new axis/diagonal\n});\n\nvar webIFCLoader = new https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.WebIFCLoaderPlugin(viewer, {\n  wasmPath: \"https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/\"\n});\nvar model = webIFCLoader.load({\n  src: \"test.ifc\",\n  edges: true,\n  loadMetadata: true,\n  // Default\n  backfaces: true // Sometimes it's best to show backfaces, so that sliced objects look less odd\n});\n\nvar resetButton = document.getElementById(\"resetButton\");\nresetButton.addEventListener(\"click\", function () {\n  viewer.camera.eye = [-3.933, 2.855, 27.018];\n  viewer.camera.look = [4.400, 3.724, 8.899];\n  viewer.camera.up = [-0.018, 0.999, 0.039];\n});\nvar fittedButton = document.getElementById(\"fittedButton\");\nfittedButton.addEventListener(\"click\", function () {\n  viewer.cameraFlight.flyTo(model);\n});\nvar transparentButton = document.getElementById(\"transparentButton\");\ntransparentButton.addEventListener(\"click\", function () {\n  model.setOpacity(model.opacity === 1 ? 0.5 : 1);\n});\nvar createSectionPlaneButton = document.getElementById(\"createSectionPlaneButton\");\nvar createSectionPlaneMode = false;\n\n//------------------------------------------------------------------------------------------------------------------\n// Add a SectionPlanesPlugin - we'll use this to create cross-section planes\n//------------------------------------------------------------------------------------------------------------------\n\nvar sectionPlanes = new https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.SectionPlanesPlugin(viewer, {\n  overviewCanvasId: \"mySectionPlanesOverviewCanvas\",\n  overviewVisible: true\n});\ncreateSectionPlaneButton.addEventListener(\"click\", function () {\n  createSectionPlaneMode = !createSectionPlaneMode; // Toggle the value of createSectionPlaneMode\n  if (!createSectionPlaneMode) {\n    sectionPlanes.clear(); // Remove all existing section planes\n  }\n\n  createSectionPlaneButton.classList.toggle(\"active\", createSectionPlaneMode); // Toggle the active class\n  // createSectionPlaneButton.textContent = \"Remove Section Planes\";\n});\n\n//------------------------------------------------------------------------------------------------------------------\n// Use the AnnotationsPlugin to create an annotation wherever we click on an object\n//------------------------------------------------------------------------------------------------------------------\n\nvar i = 1;\nviewer.scene.input.on(\"mouseclicked\", function (coords) {\n  if (createSectionPlaneMode) {\n    var pickResult = viewer.scene.pick({\n      canvasPos: coords,\n      pickSurface: true // <<------ This causes picking to find the intersection point on the entity\n    });\n\n    if (pickResult && pickResult.worldNormal) {\n      // Disallow SectionPlanes on point clouds, because points don't have normals\n      var sectionPlane = sectionPlanes.createSectionPlane({\n        pos: pickResult.worldPos,\n        dir: https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.math.mulVec3Scalar(pickResult.worldNormal, -1)\n      });\n      sectionPlanes.showControl(sectionPlane.id);\n      i++;\n    }\n  }\n});\nvar camera = viewer.scene.camera;\nvar cameraViewType = document.getElementById(\"isoButton\");\nvar createCameraViewMode = false;\ncameraViewType.addEventListener(\"click\", function () {\n  createCameraViewMode = !createCameraViewMode; // Toggle the value of createSectionPlaneMode\n  if (createCameraViewMode) {\n    camera.projection = \"ortho\"; // Switch to ortho\n    cameraViewType.textContent = \"Isometric\";\n  } else {\n    camera.projection = \"perspective\"; // Switch to perspective\n    cameraViewType.textContent = \"Ortho\";\n  }\n});\nvar lastEntity = null;\nviewer.scene.input.on(\"mousemove\", function (coords) {\n  var hit = viewer.scene.pick({\n    canvasPos: coords\n  });\n  if (hit) {\n    if (!lastEntity || hit.entity.id !== lastEntity.id) {\n      if (lastEntity) {\n        lastEntity.highlighted = false;\n      }\n      lastEntity = hit.entity;\n      hit.entity.highlighted = true;\n    }\n  } else {\n    if (lastEntity) {\n      lastEntity.highlighted = false;\n      lastEntity = null;\n    }\n  }\n});\nvar distanceMeasurements = new https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.DistanceMeasurementsPlugin(viewer, {});\nvar measureDistanceMode = false;\nvar measurementsCleared = false;\nvar distanceMeasurementsContextMenu = new https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.ContextMenu({\n  items: [[{\n    title: \"Clear\",\n    doAction: function doAction(context) {\n      context.distanceMeasurement.destroy();\n    }\n  }, {\n    getTitle: function getTitle(context) {\n      return context.distanceMeasurement.axisVisible ? \"Hide Axis\" : \"Show Axis\";\n    },\n    doAction: function doAction(context) {\n      context.distanceMeasurement.axisVisible = !context.distanceMeasurement.axisVisible;\n    }\n  }, {\n    getTitle: function getTitle(context) {\n      return context.distanceMeasurement.labelsVisible ? \"Hide Labels\" : \"Show Labels\";\n    },\n    doAction: function doAction(context) {\n      context.distanceMeasurement.labelsVisible = !context.distanceMeasurement.labelsVisible;\n    }\n  }], [{\n    title: \"Clear All\",\n    getEnabled: function getEnabled(context) {\n      return Object.keys(context.distanceMeasurementsPlugin.measurements).length > 0;\n    },\n    doAction: function doAction(context) {\n      context.distanceMeasurementsPlugin.clear();\n      measurementsCleared = true;\n    }\n  }]]\n});\nvar canvasContextMenu = new https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.ContextMenu({\n  enabled: true,\n  context: {\n    viewer: viewer\n  },\n  items: [[{\n    getTitle: function getTitle(context) {\n      return distanceMeasurements.control.active ? \"Deactivate Control\" : \"Activate Control\";\n    },\n    doAction: function doAction(context) {\n      distanceMeasurements.control.active ? distanceMeasurements.control.deactivate() : distanceMeasurements.control.activate();\n    }\n  }]]\n});\nvar mDistanceButton = document.getElementById(\"measureDistButton\");\n// const buttonImage = mDistanceButton.querySelector(\"img\")\n// var img = document.getElementById(\"icon\");\n\nmDistanceButton.addEventListener(\"click\", function () {\n  measureDistanceMode = !measureDistanceMode;\n  if (measureDistanceMode) {\n    // buttonImage.src = \"C:\\\\Users\\\\Digitale Planung 1\\\\Documents\\\\GitHub\\\\ifc-xeo\\\\icons8-length-96.png\"\n    // img.setAttribute(\"src\", \"icons8-length-96.png\");\n    // img.setAttribute(\"src\", \"lengthx.png\");\n    // console.log(img.getAttribute(\"src\"))\n    // mDistanceButton.textContent = \"Delete Dims\";\n    mDistanceButton.classList.add(\"active\");\n    distanceMeasurements.on(\"mouseOver\", function (e) {\n      e.distanceMeasurement.setHighlighted(true);\n    });\n    distanceMeasurements.on(\"mouseLeave\", function (e) {\n      if (distanceMeasurementsContextMenu.shown && distanceMeasurementsContextMenu.context.distanceMeasurement.id === e.distanceMeasurement.id) {\n        return;\n      }\n      e.distanceMeasurement.setHighlighted(false);\n    });\n    distanceMeasurements.on(\"contextMenu\", function (e) {\n      distanceMeasurementsContextMenu.context = {\n        viewer: viewer,\n        distanceMeasurementsPlugin: distanceMeasurements,\n        distanceMeasurement: e.distanceMeasurement\n      };\n      distanceMeasurementsContextMenu.show(e.event.clientX, e.event.clientY);\n      e.event.preventDefault();\n    });\n    distanceMeasurements.control.activate();\n    if (measurementsCleared) {\n      distanceMeasurements.clear();\n      measurementsCleared = false;\n    }\n  } else {\n    // mDistanceButton.textContent = \"Measure Dist\";\n    // buttonImage.src = \"C:\\\\Users\\\\Digitale Planung 1\\\\Documents\\\\GitHub\\\\ifc-xeo\\\\lengthx.png\"\n    // img.setAttribute(\"src\", \"lengthx.png\");\n    // console.log(buttonImage)\n    // img.setAttribute(\"src\", \"icons8-length-96.png\");\n    // console.log(img.getAttribute(\"src\"))\n    mDistanceButton.classList.remove(\"active\");\n    distanceMeasurements.control.deactivate();\n    distanceMeasurements.clear();\n    measurementsCleared = false;\n  }\n});\nnew https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.TreeViewPlugin(viewer, {\n  containerElement: document.getElementById(\"treeViewContainer\"),\n  autoExpandDepth: 3 // Initially expand the root tree node\n});\n\nvar showTreeButton = document.getElementById(\"showTreeButton\");\nvar treeViewContainer = document.getElementById(\"treeViewContainer\");\nvar treeViewVisible = false;\ntreeViewContainer.style.display = \"none\";\nshowTreeButton.addEventListener(\"click\", function () {\n  if (treeViewVisible) {\n    treeViewContainer.style.display = \"none\";\n  } else {\n    treeViewContainer.style.display = \"block\";\n  }\n  treeViewVisible = !treeViewVisible;\n});\nvar listItems = document.querySelectorAll('#treeViewContainer ul li');\nfor (var i = 0; i < listItems.length; i++) {\n  listItems[i].addEventListener('mouseover', function () {\n    this.classList.add('hover');\n  });\n  listItems[i].addEventListener('mouseout', function () {\n    this.classList.remove('hover');\n  });\n}\n\n// Initialize the annotations plugin\nvar annotations = new https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.AnnotationsPlugin(viewer, {\n  markerHTML: \"<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>\",\n  labelHTML: \"<div class='annotation-label' style='background-color: {{labelBGColor}};'>\\\r\n    <div class='annotation-title'>{{title}}</div>\\\r\n    <div class='annotation-desc'>{{description}}</div>\\\r\n    </div>\",\n  values: {\n    markerBGColor: \"red\",\n    labelBGColor: \"white\",\n    glyph: \"X\",\n    title: \"Untitled\",\n    description: \"No description\"\n  }\n});\nvar numAnnotations = 0;\nvar annotationsEnabled = false;\n\n// Add event listener to PropertiesBtn button\nvar propertiesBtn = document.getElementById(\"PropertiesBtn\");\npropertiesBtn.addEventListener(\"click\", function () {\n  annotationsEnabled = !annotationsEnabled; // Toggle the boolean variable\n  if (!annotationsEnabled) {\n    annotations.clear();\n  }\n});\nviewer.scene.input.on(\"mouseclicked\", function (coords) {\n  var pickResult = viewer.scene.pick({\n    canvasPos: coords,\n    pickSurface: true\n  });\n  if (pickResult) {\n    var fixIfcString = function fixIfcString(text) {\n      var fixedText = text.replace(/\\\\X\\\\FC/g, 'ü');\n      return fixedText;\n    };\n    var entity = pickResult.entity;\n    var aabb = entity.aabb;\n    var entityCenter = https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.math.getAABB3Center(aabb);\n    console.log(entity.id);\n    var metaObject = viewer.metaScene.metaObjects[entity.id];\n    var myArray = metaObject['type'].split(\":\");\n    var name = myArray[0];\n    var type = fixIfcString(myArray[1]);\n    var output = \"Type: \" + type + \"<br> IFC Type:\" + metaObject['name'];\n    if (annotationsEnabled) {\n      annotations.createAnnotation({\n        id: \"myAnnotation\" + numAnnotations++,\n        entity: entity,\n        worldPos: entityCenter,\n        occludable: false,\n        markerShown: true,\n        labelShown: true,\n        values: {\n          glyph: \"\" + numAnnotations,\n          title: fixIfcString(name),\n          description: output,\n          markerBGColor: \"green\"\n        }\n      });\n    }\n  }\n});\nvar distm = new https_cdn_jsdelivr_net_npm_xeokit_xeokit_sdk_dist_xeokit_sdk_es_min_js__WEBPACK_IMPORTED_MODULE_0__.DistanceMeasurementsPlugin(viewer, {\n  defaultAxisVisible: false // <<------------ Hide axis wires\n});\n\nmodel.on(\"loaded\", function () {\n  //------------------------------------------------------------------------------------------------------------------\n  // Create some DistanceMeasurements\n  //------------------------------------------------------------------------------------------------------------------\n\n  // Check if component with ID 'distm1' already exists in the scene\n  var componentExists = false;\n  for (var componentId in viewer.scene.components) {\n    var component = viewer.scene.components[componentId];\n    console.log(component);\n    if (component.id === \"distm1\") {\n      componentExists = true;\n      break;\n    }\n  }\n\n  // Create the component if it doesn't exist\n  if (!componentExists) {\n    var myMeasurement1 = distm.createMeasurement({\n      id: \"distm1\",\n      origin: {\n        entity: viewer.scene.objects[\"1OyRCOdfXBQQETdHuzbyt2\"],\n        worldPos: [-3.515, 5.34, 0.0]\n      },\n      target: {\n        entity: viewer.scene.objects[\"0GsyhFZ7LE7Bs0gbJNdfxZ\"],\n        worldPos: [2.91, 5.34, 0.0]\n      },\n      visible: true,\n      wireVisible: true\n    });\n  }\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://ifc.js-parcel/./src.js?");

/***/ }),

/***/ "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js":
false

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src.js");
/******/ 	
/******/ })()
;