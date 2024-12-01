import json

# Helper function to read the text file and return the mapping
def parse_txt_to_dict(txt_file):
    data = {}
    with open(txt_file, 'r') as file:
        for line in file:
            if line.startswith("#EXTINF:"):
                parts = line.split(",", 1)
                channel_name = parts[1].strip()  # Channel name after the comma
                tvg_id = channel_name.replace(" ", "_").lower()  # You can adjust this to generate a suitable tvg-id
                data[channel_name] = tvg_id
    return data

# Paths to your .txt files
txt_files = [
    'docs/epg_ripper_US1.txt',
    'docs/epg_ripper_US_LOCALS2.txt',
    'docs/epg_ripper_US_SPORTS1.txt'
]

# Initialize the final data structure
epg_data = {
    "US": {},
    "UK": {},
    "SPORTS": {}
}

# Process each file and update the data dictionary
for txt_file in txt_files:
    category = txt_file.split("_")[2].upper()  # Assuming filenames have a category part like 'US' or 'SPORTS'
    epg_data[category] = parse_txt_to_dict(txt_file)

# Save the data into a JSON file
with open('epg_data.json', 'w') as json_file:
    json.dump(epg_data, json_file, indent=4)

print("epg_data.json has been updated.")
