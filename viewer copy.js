import {Viewer, WebIFCLoaderPlugin, XKTLoaderPlugin, NavCubePlugin, SectionPlanesPlugin, math, DistanceMeasurementsPlugin, ContextMenu} from
"https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

const viewer = new Viewer({
    canvasId: "myCanvas",
    transparent: true
});

viewer.camera.eye = [-3.933, 2.855, 27.018];
viewer.camera.look = [4.400, 3.724, 8.899];
viewer.camera.up = [-0.018, 0.999, 0.039];

viewer.camera.zoom(5);

// viewer.cameraControl.followPointer = true;

const xktLoader = new XKTLoaderPlugin(viewer);

new NavCubePlugin(viewer, {
    canvasId: "myNavCubeCanvas",
    color: "lightblue",
    visible: true,           // Initially visible (default)
    cameraFly: true,       // Fly camera to each selected axis/diagonal
    cameraFitFOV: 45,        // How much field-of-view the scene takes once camera has fitted it to view
    cameraFlyDuration: 0.5 // How long (in seconds) camera takes to fly to each new axis/diagonal
});

const webIFCLoader = new WebIFCLoaderPlugin(viewer, {
    wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/"
});

const model = webIFCLoader.load({
    src: "test.ifc",
    edges: true,
    backfaces: true // Sometimes it's best to show backfaces, so that sliced objects look less odd
});

// zoomInButton.addEventListener("click", () => {
//     viewer.camera.zoomIn(0.5);
// });

// const zoomOutButton = document.getElementById("zoomOutButton");
// zoomOutButton.addEventListener("click", () => {
//     viewer.camera.zoomOut(0.5);
// });

// const upButton = document.getElementById("upButton");
// upButton.addEventListener("click", () => {
//     viewer.camera.pan([0, 0.1]);
// });

// const downButton = document.getElementById("downButton");
// downButton.addEventListener("click", () => {
//     viewer.camera.pan([0, -0.1]);
// });

// const leftButton = document.getElementById("leftButton");
// leftButton.addEventListener("click", () => {
//     viewer.camera.pan([-0.1, 0]);
// });

// const rightButton = document.getElementById("rightButton");
// rightButton.addEventListener("click", () => {
//     viewer.camera.pan([0.1, 0]);
// });

// const isoButton = document.getElementById("isoButton");
// isoButton.addEventListener("click", () => {
//     viewer.camera.perspective = false;
// });

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    viewer.camera.eye = [-3.933, 2.855, 27.018];
    viewer.camera.look = [4.400, 3.724, 8.899];
    viewer.camera.up = [-0.018, 0.999, 0.039];
});

// const edgesButton = document.getElementById("edgesButton");
// edgesButton.addEventListener("click", () => {
//     model.setEdges(!model.edges);
// });

const fittedButton = document.getElementById("fittedButton");
fittedButton.addEventListener("click", () => {
    viewer.cameraFlight.flyTo(model);
});

const transparentButton = document.getElementById("transparentButton");
transparentButton.addEventListener("click", () => {
    model.setOpacity(model.opacity === 1 ? 0.5 : 1);
});

// const colorByTypeButton = document.getElementById("colorByTypeButton");
// colorByTypeButton.addEventListener("click", () => {
//     model.setColorBy("type");
// });

// const colorByLevelButton = document.getElementById("colorByLevelButton");
// colorByLevelButton.addEventListener("click", () => {
//     model.setColorBy("level");
// });


const createSectionPlaneButton = document.getElementById("createSectionPlaneButton");
let createSectionPlaneMode = false;


//------------------------------------------------------------------------------------------------------------------
// Add a SectionPlanesPlugin - we'll use this to create cross-section planes
//------------------------------------------------------------------------------------------------------------------

const sectionPlanes = new SectionPlanesPlugin(viewer, {
    overviewCanvasId: "mySectionPlanesOverviewCanvas",
    overviewVisible: true
});

createSectionPlaneButton.addEventListener("click", () => {
    createSectionPlaneMode = !createSectionPlaneMode; // Toggle the value of createSectionPlaneMode
    if (!createSectionPlaneMode) {
        sectionPlanes.clear(); // Remove all existing section planes
    }
    createSectionPlaneButton.classList.toggle("active", createSectionPlaneMode); // Toggle the active class
    createSectionPlaneButton.textContent = "Remove Section Planes";

});

//------------------------------------------------------------------------------------------------------------------
    // Use the AnnotationsPlugin to create an annotation wherever we click on an object
    //------------------------------------------------------------------------------------------------------------------

    var i = 1;

    viewer.scene.input.on("mouseclicked", (coords) => {

        if (createSectionPlaneMode) {

            var pickResult = viewer.scene.pick({
                canvasPos: coords,
                pickSurface: true  // <<------ This causes picking to find the intersection point on the entity
            });

            if (pickResult && pickResult.worldNormal) { // Disallow SectionPlanes on point clouds, because points don't have normals

                const sectionPlane = sectionPlanes.createSectionPlane({
                    pos: pickResult.worldPos,
                    dir: math.mulVec3Scalar(pickResult.worldNormal, -1)
                });

                sectionPlanes.showControl(sectionPlane.id);

                i++;
            }
        // } else {
        //     sectionPlanes.removeAllSectionPlanes(); // Remove all section planes if createSectionPlaneMode is false
         }
    });

const camera = viewer.scene.camera;

// camera.ortho.near = 0.8;
// camera.ortho.far = 10000;

const cameraViewType = document.getElementById("isoButton");
let createCameraViewMode = false;


cameraViewType.addEventListener("click", () => {
    createCameraViewMode = !createCameraViewMode; // Toggle the value of createSectionPlaneMode
    if (!createCameraViewMode) {
        camera.projection = "ortho"; // Switch to ortho
        cameraViewType.textContent = "Ortho";
    }
    else {
        camera.projection = "perspective"; // Switch to perspective
        cameraViewType.textContent = "Isometric";
    }
});

var lastEntity = null;

viewer.scene.input.on("mousemove", function (coords) {

    var hit = viewer.scene.pick({
        canvasPos: coords
    });

    if (hit) {

        if (!lastEntity || hit.entity.id !== lastEntity.id) {

            if (lastEntity) {
                lastEntity.highlighted = false;
            }

            lastEntity = hit.entity;
            hit.entity.highlighted = true;
        }
    } else {

        if (lastEntity) {
            lastEntity.highlighted = false;
            lastEntity = null;
        }
    }
});


// //------------------------------------------------------------------------------------------------------------------
// // Create an DistanceMeasurementsPlugin, activate its DistanceMeasuremntsControl
// //------------------------------------------------------------------------------------------------------------------
// // console.log(measureDistanceMode)

// const distanceMeasurements = new DistanceMeasurementsPlugin(viewer, {});

// const mDistanceButton = document.getElementById("measureDistButton");
// let measureDistanceMode = false;

// mDistanceButton.addEventListener("click", () => {
//     measureDistanceMode = !measureDistanceMode; // Toggle the value of measureDistanceMode
    
//     if (measureDistanceMode) {
//         mDistanceButton.textContent = "Delete Dims";
//         mDistanceButton.classList.add("active"); // Add the active class
//         distanceMeasurements.control.activate();
//     } else {
//         mDistanceButton.textContent = "Measure Distance";
//         mDistanceButton.classList.remove("active"); // Remove the active class
//         distanceMeasurements.clear();
//         distanceMeasurements.control.deactivate();
//     }
// });

// distanceMeasurements.on("mouseOver", (e) => {
//     if (measureDistanceMode) {
//         e.distanceMeasurement.setHighlighted(true);
//     }
// });

// distanceMeasurements.on("mouseLeave", (e) => {
//     if (measureDistanceMode) {
//         if (distanceMeasurementsContextMenu.shown && distanceMeasurementsContextMenu.context.distanceMeasurement.id === e.distanceMeasurement.id) {
//             return;
//         }
//         e.distanceMeasurement.setHighlighted(false);
//     }
// });

// distanceMeasurements.on("contextMenu", (e) => {
//     if (measureDistanceMode) {
//         distanceMeasurementsContextMenu.context = { // Must set context before showing menu
//             viewer: viewer,
//             distanceMeasurementsPlugin: distanceMeasurements,
//             distanceMeasurement: e.distanceMeasurement
//         };
//         distanceMeasurementsContextMenu.show(e.event.clientX, e.event.clientY);
//         e.event.preventDefault();
//     }
// });

const distanceMeasurements = new DistanceMeasurementsPlugin(viewer, {});
let measureDistanceMode = false;
let measurementsCleared = false;

const distanceMeasurementsContextMenu = new ContextMenu({
  items: [
    [
      {
        title: "Clear",
        doAction: function (context) {
          context.distanceMeasurement.destroy();
        },
      },
      {
        getTitle: (context) => {
          return context.distanceMeasurement.axisVisible
            ? "Hide Axis"
            : "Show Axis";
        },
        doAction: function (context) {
          context.distanceMeasurement.axisVisible = !context.distanceMeasurement
            .axisVisible;
        },
      },
      {
        getTitle: (context) => {
          return context.distanceMeasurement.labelsVisible
            ? "Hide Labels"
            : "Show Labels";
        },
        doAction: function (context) {
          context.distanceMeasurement.labelsVisible = !context.distanceMeasurement
            .labelsVisible;
        },
      },
    ],
    [
      {
        title: "Clear All",
        getEnabled: function (context) {
          return Object.keys(
            context.distanceMeasurementsPlugin.measurements
          ).length > 0;
        },
        doAction: function (context) {
          context.distanceMeasurementsPlugin.clear();
          measurementsCleared = true;
        },
      },
    ],
  ],
});

const canvasContextMenu = new ContextMenu({
  enabled: true,
  context: {
    viewer: viewer,
  },
  items: [
    [
      {
        getTitle: (context) => {
          return distanceMeasurements.control.active
            ? "Deactivate Control"
            : "Activate Control";
        },
        doAction: function (context) {
          distanceMeasurements.control.active
            ? distanceMeasurements.control.deactivate()
            : distanceMeasurements.control.activate();
        },
      },
    ],
  ],
});

const mDistanceButton = document.getElementById("measureDistButton");

mDistanceButton.addEventListener("click", () => {
  measureDistanceMode = !measureDistanceMode;

  if (measureDistanceMode) {
    mDistanceButton.textContent = "Delete Dims";
    mDistanceButton.classList.add("active");
    distanceMeasurements.on("mouseOver", (e) => {
      e.distanceMeasurement.setHighlighted(true);
    });
    distanceMeasurements.on("mouseLeave", (e) => {
      if (
        distanceMeasurementsContextMenu.shown &&
        distanceMeasurementsContextMenu.context.distanceMeasurement.id ===
          e.distanceMeasurement.id
      ) {
        return;
      }
      e.distanceMeasurement.setHighlighted(false);
    });
    distanceMeasurements.on("contextMenu", (e) => {
      distanceMeasurementsContextMenu.context = {
        viewer: viewer,
        distanceMeasurementsPlugin: distanceMeasurements,
        distanceMeasurement: e.distanceMeasurement,
      };
      distanceMeasurementsContextMenu.show(e.event.clientX, e.event.clientY);
      e.event.preventDefault();
    });

    distanceMeasurements.control.activate();
    if (measurementsCleared) {
      distanceMeasurements.clear();
      measurementsCleared = false;
    }
  } else {
    mDistanceButton.textContent = "Measure Dist";
    mDistanceButton.classList.remove("active");
    distanceMeasurements.control.deactivate();
    distanceMeasurements.clear();
    measurementsCleared = false;
  }
});
