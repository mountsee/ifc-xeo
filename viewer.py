from xeokit import Viewer, LocalFileSource

# Initialize viewer and data source
viewer = Viewer()
source = LocalFileSource()

# Load IFC model
modelId = source.loadModel(filepath='test.ifc')

# Show model in viewer
viewer.scene.addDataSource(source)
viewer.setCamera(x=0, y=20, z=20, target=[0, 0, 0])
viewer.run()