import pandas as pd
import json
import os

def convert_excel_to_json(file_path, output_json):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    try:
        # Load the Excel file
        df = pd.read_excel(file_path)
        
        # Convert to JSON
        data = df.to_dict(orient='records')
        
        with open(output_json, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"Successfully converted {file_path} to {output_json}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    convert_excel_to_json('staff list.xlsx', 'staff_data.json')
