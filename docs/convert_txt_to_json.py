import json
import os

# Path to your .txt files in the docs folder
txt_files = ["docs/epg_ripper_US1.txt", "docs/epg_ripper_US_LOCALS2.txt", "docs/epg_ripper_US_SPORTS1.txt"]

def convert_txt_to_json(txt_files):
    data = {}  # This will hold all your converted data

    for txt_file in txt_files:
        with open(txt_file, 'r') as f:
            content = f.readlines()

        # Here, you should parse the content based on your expected format.
        # This is just an example of how you might convert the file to JSON.
        # You need to adjust it based on your `.txt` format.
        for line in content:
            if line.startswith("#EXTINF"):
                channel_info = {
                    "info": line.strip()
                }
                data[txt_file] = data.get(txt_file, []) + [channel_info]

    # Write the collected data into a .json file
    with open("epg_data.json", 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Call the function
convert_txt_to_json(txt_files)
