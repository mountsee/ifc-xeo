# Python program to read
# json file
  
  
import json
  
# Opening JSON file
f = open('output.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list
for i in data:
    if i['GlobalId'] == '36FIA2T5930healfXBqFv9':
        print(i)
  
# Closing file
f.close()