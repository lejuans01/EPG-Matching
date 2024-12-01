import json

def convert_txt_to_json(txt_file_paths, output_json_path):
    master_data = {}

    for txt_file in txt_file_paths:
        with open(txt_file, 'r') as f:
            for line in f:
                # Split the line by "|" to get the channel name and tvg-id
                parts = line.strip().split('|')
                if len(parts) == 2:
                    channel_name = parts[0].strip()
                    tvg_id = parts[1].strip()
                    master_data[channel_name] = tvg_id
    
    # Save the master data to a JSON file
    with open(output_json_path, 'w') as json_file:
        json.dump(master_data, json_file, indent=4)

# Example usage
convert_txt_to_json(['docs/epg_ripper_US1.txt', 'docs/epg_ripper_US_LOCALS2.txt', 'docs/epg_ripper_US_SPORTS1.txt'], 'epg_data.json')
