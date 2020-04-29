import json, geojson, sys

print ("Converting Json to Geojson.. ")

in_file = sys.argv[1]

gjson = {
    "type": "FeatureCollection",
    "features": []
}

with open(in_file) as json_file:
	data = json.load(json_file)

	for p in data['reports']:
		f = gjson["features"]
		p.update( {"cluster" : False} )
		if (("Latitude") in p and ("Longitude") in p):
			lat =  p['Latitude'].encode('ascii', 'ignore')
			lat =  float(lat)
			lon = p['Longitude'].encode('ascii', 'ignore')
			lon =  float(lon)
			properties = []
			#print lat 
			#print lon
			#print properties
			#point = geojson.Point((lat, lon))
			feature = {"type": "Feature","geometry": {"type": "Point","coordinates": [lat, lon]},"properties": p}
			#print feature
			f.append(feature)

output = open('geo.json', 'w')
#json.dump(geojson, output)
geojson_string = geojson.dumps(gjson) 
output.write(geojson_string)
output.close()


#print(geojson_string)