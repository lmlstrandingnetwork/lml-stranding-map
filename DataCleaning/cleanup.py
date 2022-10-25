import json # https://docs.python.org/3/library/json.html
import csv
import pprint

def main():
  csv_data = read_csv_data('DA_LMLStrand_Site.csv')
  csv_data = [x for x in csv_data if x['FIELD #'].strip()]
  #print_data('CSV Data', csv_data)
  
  json_data = read_json_data('lml-stranding-map-export.json')
  #print_data('JSON Data', json_data)

  join_data(csv_data, json_data)
  #print_data('Joined JSON Data', json_data)

  write_json_data(json_data, 'result.json')

def read_csv_data(filename):
  with open(filename, 'r', encoding = 'utf-8-sig') as csvfile:
    csv_reader = csv.DictReader(csvfile)
    return list(csv_reader)

def read_json_data(filename):
  with open(filename, 'r',encoding = 'utf-8') as jsonfile:
    return json.load(jsonfile)

def join_data(csv_data, json_data):
  for json_item in json_data['features'].values():
    for csv_item in csv_data:
      if csv_item['FIELD #'] == json_item['properties']['Field Number']:
        #print(csv_item['FIELD #'])
        json_item['properties']['DA PRESENT IN AT LEAST ONE SAMPLE?'] = csv_item['DA PRESENT IN AT LEAST ONE SAMPLE?']
        json_item['properties']['FECES (ng PER g)'] = csv_item['FECES (ng/g)']
        json_item['properties']['URINE (ng PER g)'] = csv_item['URINE (ng/g)']
        json_item['properties']['STOMACH CONTENTS (ng PER g)'] = csv_item['STOMACH CONTENTS (ng/g)']

def write_json_data(json_data, filename):
  with open(filename, 'w',encoding='utf-8') as f:
    json.dump(json_data, f, indent=2)

def print_data(title, data):
  print(title + ' ' + '=' * 20)
  pprint.pprint(data)
  print()
        
if __name__ == '__main__':
  main()