from daimin_data.core import convert, copy_files
import os
import json
path = "./batch/data/daimin_data.xlsx"
manifest_path = "./batch/data/manifest.json"
app_dir = "./public/data"
tmp_dir = "/tmp/daimin"
convert(path, manifest_path, tmp_dir)
copy_files(tmp_dir, app_dir)
os.makedirs("./public/api/items", exist_ok=True)
# copy_files(tmp_dir, "./public/api/index.json")
os.system(f"cp {tmp_dir}/index.json ./public/api/items/index.json")

with open("./content/data/dict.json", "r") as f:
    dict_ = json.load(f)

with open("./public/api/items/index.json", "r") as f:
    index = json.load(f)

dict = dict_["data"]

dict["size"] = len(index)

x_min = 10000
y_min = 10000

x_max = 0
y_max = 0


for item in index:
    '''
    xywh = item["xywh"].split(",")
    x = float(xywh[0])
    y = float(xywh[1])
    w = float(xywh[2])
    h = float(xywh[3])

    x2 = x + w
    y2 = y + h

    if x < x_min:
        x_min = x

    if y < y_min:
        y_min = y
    
    if x2 > x_max:
        x_max = x2
    
    if y2 > y_max:
        y_max = y2
    '''

    if "latitude" not in item or "longitude" not in item:
        continue

    lat = float(item["latitude"])
    lon = float(item["longitude"])

    if lat < x_min:
        x_min = lat

    if lon < y_min:
        y_min = lon
    
    if lat > x_max:
        x_max = lat

    if lon > y_max:
        y_max = lon

dict["spatialCoverage"]["geo"]["box"] = f"{x_min} {y_min} {x_max} {y_max}"

with open("./content/data/dict.json", "w") as f:
    json.dump(dict_, f, indent=2, ensure_ascii=False)