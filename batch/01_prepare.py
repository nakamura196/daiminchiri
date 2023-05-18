from daimin_data.core import convert, copy_files
path = "./batch/data/daimin_data.xlsx"
manifest_path = "./batch/data/manifest.json"
app_dir = "./public/data"
tmp_dir = "/tmp/daimin"
convert(path, manifest_path, tmp_dir)
copy_files(tmp_dir, app_dir)