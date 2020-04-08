import sys
import json

print "Converting Json to Geojson.. "

geojson = {
    "type": "FeatureCollection",
    "features": []
}

#print geojson
input = sys.argv[1]

with open('data.txt') as json_file:
	data = json.load(json_file)

	for p in data['MSDBS_Report (21)']:
		f = geojson["features"]
		if (p.has_key("Latitude") and p.has_key("Longitude")):
			feature ={"type": "Feature","geometry": {"type": "Point","coordinates": [p['Latitude'], p['Longitude']]},"properties": p}
			print feature
			f.append(feature)

output = open('geo.json', 'w')
json.dump(geojson, output)

print geojson