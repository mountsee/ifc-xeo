import {
  Viewer, 
  WebIFCLoaderPlugin, 
  XKTLoaderPlugin, 
  NavCubePlugin, 
  SectionPlanesPlugin, 
  math, 
  DistanceMeasurementsPlugin, 
  ContextMenu,
  TreeViewPlugin,
  AnnotationsPlugin} from
"https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";
// import {AnnotationsPlugin} from '@xeokit/xeokit-sdk/src/plugins/AnnotationsPlugin/AnnotationsPlugin.js'

const viewer = new Viewer({
    canvasId: "myCanvas",
    transparent: true
});

viewer.camera.eye = [-3.933, 2.855, 27.018];
viewer.camera.look = [4.400, 3.724, 8.899];
viewer.camera.up = [-0.018, 0.999, 0.039];
viewer.camera.zoom(5);

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
    loadMetadata: true, // Default
    backfaces: true // Sometimes it's best to show backfaces, so that sliced objects look less odd
});

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    viewer.camera.eye = [-3.933, 2.855, 27.018];
    viewer.camera.look = [4.400, 3.724, 8.899];
    viewer.camera.up = [-0.018, 0.999, 0.039];
});

const fittedButton = document.getElementById("fittedButton");
fittedButton.addEventListener("click", () => {
    viewer.cameraFlight.flyTo(model);
});

const transparentButton = document.getElementById("transparentButton");
transparentButton.addEventListener("click", () => {
    model.setOpacity(model.opacity === 1 ? 0.5 : 1);
});

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
    // createSectionPlaneButton.textContent = "Remove Section Planes";
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
        }
});

const camera = viewer.scene.camera;
const cameraViewType = document.getElementById("isoButton");
let createCameraViewMode = false;

cameraViewType.addEventListener("click", () => {
    createCameraViewMode = !createCameraViewMode; // Toggle the value of createSectionPlaneMode
    if (createCameraViewMode) {
        camera.projection = "ortho"; // Switch to ortho
        cameraViewType.textContent = "Isometric";
    }
    else {
        camera.projection = "perspective"; // Switch to perspective
        cameraViewType.textContent = "Ortho";
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
// const buttonImage = mDistanceButton.querySelector("img")
// var img = document.getElementById("icon");

mDistanceButton.addEventListener("click", () => {
  measureDistanceMode = !measureDistanceMode;

  if (measureDistanceMode) {
    // buttonImage.src = "C:\\Users\\Digitale Planung 1\\Documents\\GitHub\\ifc-xeo\\icons8-length-96.png"
    // img.setAttribute("src", "icons8-length-96.png");
    // img.setAttribute("src", "lengthx.png");
    // console.log(img.getAttribute("src"))
    // mDistanceButton.textContent = "Delete Dims";
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
    // mDistanceButton.textContent = "Measure Dist";
    // buttonImage.src = "C:\\Users\\Digitale Planung 1\\Documents\\GitHub\\ifc-xeo\\lengthx.png"
    // img.setAttribute("src", "lengthx.png");
    // console.log(buttonImage)
    // img.setAttribute("src", "icons8-length-96.png");
    // console.log(img.getAttribute("src"))
    mDistanceButton.classList.remove("active");
    distanceMeasurements.control.deactivate();
    distanceMeasurements.clear();
    measurementsCleared = false;
  }
});

new TreeViewPlugin(viewer, {
    containerElement: document.getElementById("treeViewContainer"),
    autoExpandDepth: 3 // Initially expand the root tree node
});

const showTreeButton = document.getElementById("showTreeButton");
const treeViewContainer = document.getElementById("treeViewContainer");
let treeViewVisible = false;
treeViewContainer.style.display = "none"

showTreeButton.addEventListener("click", () => {
  if (treeViewVisible) {
    treeViewContainer.style.display = "none";
  } else {
    treeViewContainer.style.display = "block";
  }
  treeViewVisible = !treeViewVisible;
});

var listItems = document.querySelectorAll('#treeViewContainer ul li');

for (var i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('mouseover', function () {
        this.classList.add('hover');
    });
    listItems[i].addEventListener('mouseout', function () {
        this.classList.remove('hover');
    });
}

// Initialize the annotations plugin
const annotations = new AnnotationsPlugin(viewer, {
  markerHTML: "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",
  labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'>\
    <div class='annotation-title'>{{title}}</div>\
    <div class='annotation-desc'>{{description}}</div>\
    </div>",
  values: {
    markerBGColor: "red",
    labelBGColor: "white",
    glyph: "X",
    title: "Untitled",
    description: "No description"
  }
});

let numAnnotations = 0;
let annotationsEnabled = false;

// Add event listener to PropertiesBtn button
const propertiesBtn = document.getElementById("PropertiesBtn");
propertiesBtn.addEventListener("click", () => {
  annotationsEnabled = !annotationsEnabled; // Toggle the boolean variable
  if (!annotationsEnabled) { annotations.clear()
  }
});


viewer.scene.input.on("mouseclicked", (coords) => {
  const pickResult = viewer.scene.pick({
    canvasPos: coords,
    pickSurface: true
  });

  if (pickResult) {
    const entity = pickResult.entity;
    const aabb = entity.aabb;
    const entityCenter = math.getAABB3Center(aabb);
    console.log(entity.id)

    const metaObject = viewer.metaScene.metaObjects[entity.id];
    const myArray = metaObject['type'].split(":");
    let name = myArray[0];
    
    function fixIfcString(text) {
      const fixedText = text.replace(/\\X\\FC/g, 'ü');
      return fixedText;
    }
    
    const type = fixIfcString(myArray[1]);
    const output = "Type: " + type + "<br> IFC Type:" + metaObject['name'];
    
    if (annotationsEnabled) {
      annotations.createAnnotation({
        id: "myAnnotation" + numAnnotations++,
        entity: entity,
        worldPos: entityCenter,
        occludable: false,
        markerShown: true,
        labelShown: true,
        values: {
          glyph: "" + numAnnotations,
          title: fixIfcString(name),
          description: output,
          markerBGColor: "green"
        }
      });
    }
  }
});

const distm = new DistanceMeasurementsPlugin(viewer, {
  defaultAxisVisible: false // <<------------ Hide axis wires
});

model.on("loaded", () => {

  //------------------------------------------------------------------------------------------------------------------
  // Create some DistanceMeasurements
  //------------------------------------------------------------------------------------------------------------------

  // Check if component with ID 'distm1' already exists in the scene
  let componentExists = false;
  for (const componentId in viewer.scene.components) {
    const component = viewer.scene.components[componentId];
    console.log(component)
    if (component.id === "distm1") {
      componentExists = true;
      break;
    }
  }

  // Create the component if it doesn't exist
  if (!componentExists) {
    const myMeasurement1 = distm.createMeasurement({
        id: "distm1",
        origin: {
            entity: viewer.scene.objects["1OyRCOdfXBQQETdHuzbyt2"],
            worldPos: [-3.515, 5.34, 0.0]
        },
        target: {
            entity: viewer.scene.objects["0GsyhFZ7LE7Bs0gbJNdfxZ"],
            worldPos: [2.91, 5.34, 0.0]
        },
        visible: true,
        wireVisible: true
    });
  }
});