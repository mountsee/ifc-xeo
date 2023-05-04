import ifcopenshell
import json
import ifcopenshell.util.pset
from ifcopenshell import util

ifc_file_path = "test.ifc"
ifc_file = ifcopenshell.open(ifc_file_path)

elements = ifc_file.by_type("IfcElement")

output = []
for element in elements:
    eldic = element.__dict__
    keys_list = ['id','ObjectPlacement','OwnerHistory','Representation', 'Tag']
    for key in keys_list:
            del eldic[key]
    if 'CompositionType' in eldic:
         del eldic['CompositionType']
    output.append(eldic)
    # print(element.__dict__)
print(output)


with open('output.json', 'w') as f:
    json.dump(output, f)
