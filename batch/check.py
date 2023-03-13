from tqdm import tqdm
def check_fields(df, fields):

    columns = df.columns.tolist()

    for field in tqdm(fields):
        field_label = field["label"]

        if field_label not in columns:
            print("Missing column: " + field_label, columns)
            return False
    
    return True