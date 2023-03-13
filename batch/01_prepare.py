import sys
import check
import utils
import random
import codecs
import argparse
import os
import glob
import pandas as pd
import json
import datetime
from tqdm import tqdm
import copy
from dotenv import load_dotenv
load_dotenv(verbose=True)

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('--client', "-c", action='store_true')

args = parser.parse_args()
ssr = not args.client

HOME_DIR = "."
PROJECT_DIR = "./batch"

pd.options.display.precision = 0


def main(path):
    # , lang

    df = pd.read_excel(path)

    items = []

    fields = [
        {
            "label": "ID",
            "id": "_id",
            "type": "key"
        },
        {
            "label": "公開区分",
            "id": "公開区分",
        },
        {
            "label": "見出し",
            "id": "label",
            "type": "label"
        },
        {
            "label": "見出し読み"
        },
        {
            "label": "ローマ字1"
        },
        {
            "label": "ローマ字2"
        },
        {
            "label": "対訳語"
        },
        {
            "label": "説明文"
        },
        {
            "label": "出典",
            "id": "出典"
        },
        {
            "label": "ページ",
            "id": "ページ"
        },
        {
            "label": "出版社"
        },
        {
            "label": "出版年1",
            "id": "出版年",
            "type": "int"
        },
        {
            "label": "出版年2",
            "id": "year"
        },
        {
            "label": "著者",
            "id": "著者"
        },
        {
            "label": "言語"
        },
        {
            "label": "時代"
        },
        {
            "label": "関連項目",
            "id": "related"
        }
    ]

    if not check.check_fields(df, fields):
        print(path)
        sys.exit(1)

    def fix(value, field):

        if "replace" in field:
            if value in field["replace"]:
                value = value.replace(value, field["replace"][value])

        return str(value).strip()

    rows = []

    for index, row in df.iterrows():
        if str(row["公開区分"]) == "20":
            # print(row)
            continue

        item = {

        }

        '''
        # lang = row["言語"]

        if pd.isnull(lang):
            continue

        # lang = lang.lower()
        '''

        for field in fields:

            field_label = field["label"]

            if field_label not in row:
                continue

            value = row[field_label]

            if field["label"] == "見出し" and pd.isnull(value):
                print("見出しが空", index)
                value = "[NONE]"

            if pd.isnull(value):
                continue

            if "id" in field and field["id"] == "related":
                value = value.split("|")

            elif "type" not in field:
                value = fix(value, field)
                value = [value]

            elif field["type"] == "int":
                value = [int(value)]

            else:
                value = fix(value, field)

            # 要検討。小数点以下は無視する。
            if "id" in field and field["id"] == "ページ":
                pages = []
                for page in value:
                    page = page.replace(".0", "")
                    pages.append(page)
                value = pages

            id = field["id"] if "id" in field else field["label"]
            item[id] = value

        del item["公開区分"]

        lang = row["言語"]

        weight = 1

        if lang == "英語":
            weight = 1.2
        elif lang == "ドイツ語":
            weight = 1.1

        item["_weight"] = weight

        items.append(item)

    opath = f"{PROJECT_DIR}/tmp/index/{lang}.json"

    os.makedirs(os.path.dirname(opath), exist_ok=True)

    with open(opath, 'wb') as f:
        json.dump(items, codecs.getwriter('utf-8')
                  (f), ensure_ascii=False, indent=4)


files = glob.glob(f"{PROJECT_DIR}/data/*.xlsx")

for file in tqdm(files):
    try:
        main(file)
    except Exception as e:
        print(e)

files = glob.glob(f"{PROJECT_DIR}/tmp/index/*.json")

index = []

for file in files:

    # langs = ["en", "fr"]

    # f"output/index_{lang}.json"
    # for lang in langs:
    with open(file, "r") as f:
        data = json.load(f)
        index.extend(data)

print("サイズ", len(index))

# path1 = f"{PROJECT_DIR}/tmp/index.json"
path1 = f"{HOME_DIR}/server/data/index.json"
path2 = f"{HOME_DIR}/server/data/index_map.json"


# 圧縮
utils.compress(index, f'{HOME_DIR}/public/data/index2.json')

# server

if not ssr:
    index = []

# 配列をpublicに
with open(path1, 'wb') as f:

    json.dump(index, codecs.getwriter('utf-8')(f), ensure_ascii=False)

# 配列をpublicに
with open(path2, 'wb') as f:
    mappings = {}
    for item in index:
        mappings[item["_id"]] = item
    json.dump(mappings, codecs.getwriter('utf-8')(f), ensure_ascii=False)

# idのみのリスト
with open(f'{HOME_DIR}/public/data/ids.json', 'wb') as f:
    ids = []
    for item in index:
        ids.append(item["_id"])
    json.dump(ids, codecs.getwriter('utf-8')(f), ensure_ascii=False)
