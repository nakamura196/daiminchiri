import json
import re
from tqdm import tqdm

def convert(path, output_path):
    with open(path) as f:
        df = json.loads(f.read())

    keys = []
    for item in df:
        for key in item:
            if key not in keys:
                keys.append(key)

    items_keys_fixed = []

    values = {}

    for item in df:
        item2 = {}
        items_keys_fixed.append(item2)
        for key in item:
            key_index = keys.index(key)

            value = item[key]

            if isinstance(value, list) and len(value) == 1:
                value = value[0]

            item2[str(key_index)] = value



    df2 = {
        "keys": keys,
        "items":items_keys_fixed
    }

    '''
    with open(f'output/index2.json', 'w') as f:
        json.dump(df2, f, ensure_ascii=False, indent = 2)
    '''

    #####

    values = {}
    for item in df:
        for key in item:
            value = item[key]
            if isinstance(value, list):
                for v in value:
                    if v not in values:
                        values[v] = 0
                    values[v] += 1

            else:
                if value not in values:
                    values[value] = 0
                values[value] += 1

    dic2 = sorted(values.items(), key=lambda x:x[1], reverse=True)

    values_100 = []

    for item in dic2:
        key, freq = item

        if freq > 1:
            values_100.append(key)

    #####

    items_value_fixed = []

    for item in items_keys_fixed:
        item2 = {}
        items_value_fixed.append(item2)
        for key in item:

            value = item[key]

            if isinstance(value, list):
                pass
            else:
                if value in values_100:
                    value = f"${values_100.index(value)}"

            item2[key] = value

    df3 = {
        "keys": keys,
        "values": values_100,
        "items":items_value_fixed
    }

    '''
    with open(f'output/index3.json', 'w') as f:
        json.dump(df3, f, ensure_ascii=False) # , indent = 2
    '''

    ####

    mappings = {}

    id_index = str(keys.index('_id'))

    for item in items_value_fixed:
        mappings[item[id_index]] = item

    df4 = {
        "keys": keys,
        "values": values_100,
        "mappings": mappings
    }

    with open(output_path, 'w') as f:
        json.dump(df4, f, ensure_ascii=False) # , indent = 2

def extract_related_words(value):
    value = value.replace("］", "]").replace("［", "[").replace("、", ",")

    values = re.findall(r'\[(.+?)\]', value)

    aa = []

    for i in range(len(values)):
        index = len(values) -1 -i

        r = values[index]

        if value.endswith("[" + r + "]"):
            value = value[:-len(r)-2].strip()
            data = r.split(",")
            for item in data:
                terms = ["Also", "See", "also", "see"]
                for term in terms:
                    item = item.replace(term, "")

                if "cf." in item.lower():
                    continue

                aa.append(item.strip())

    return aa

def compress(df, opath):

    keys = {}

    freqs = {}

    for item in df:

        for key in item:

            if key == "_id":
                continue
            
            values = item[key]

            type = "string"

            if isinstance(values, list):
                type = "list"
                
                # for value in values:
            else:
                values = [values]

            for v in values:
                if v not in freqs:
                    freqs[v] = 0
                freqs[v] += 1

            keys[key] = type

    freqs_index = []
    for key in freqs:
        freqs_index.append(key)

    

    key_list = []

    for key in keys:
        key_list.append(key)

    items2 = []

    for item in tqdm(df):
        item2 = {}
        for key in item:
            if key in key_list:
                key_index = key_list.index(key)
                
                # item2[key] = item[key]

                if keys[key] == "list":
                    values2 = []
                    for value in item[key]:
                        value_index = freqs_index.index(value)
                        values2.append(value_index)
                        # item2[key_index] = value
                    item2[key_index] = values2

                else:
                    value_index = freqs_index.index(item[key])
                    item2[key_index] = value_index

            else:
                item2[key] = item[key]

        items2.append(item2)

    # items2

    res = {
        "keys": key_list,
        "freqs": freqs_index,
        "items": items2
    }

    with open(opath, 'w') as f:
        json.dump(res, f, ensure_ascii=False)
