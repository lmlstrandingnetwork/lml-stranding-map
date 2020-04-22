import json, geojson, sys

print "Converting Json to Geojson.. "

in_file = sys.argv[1]

gjson = {
    "type": "FeatureCollection",
    "features": []
}

with open(in_file) as json_file:
	data = json.load(json_file)

	for p in data['MSDBS_Report (21)']:
		f = gjson["features"]
		if (p.has_key("Latitude") and p.has_key("Longitude")):
			lat =  p['Latitude'].encode('ascii', 'ignore')
			lat =  float(lat)
			lon = p['Longitude'].encode('ascii', 'ignore')
			lon =  float(lon)
			properties = []
			#print lat 
			#print lon
			#print properties
			point = geojson.Point((lat, lon))
			feature = {"type": "Feature","geometry": {"type": "Point","coordinates": [lat, lon]},"properties": p}
			#print feature
			f.append(feature)

output = open('geo.json', 'w')
#json.dump(geojson, output)
geojson_string = geojson.dumps(gjson) 
output.write(geojson_string)
output.close()


print geojson_string