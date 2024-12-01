import json

def convert_txt_to_json(txt_files):
    data = {}
    for txt_file in txt_files:
        with open(txt_file, 'r') as file:
            lines = file.readlines()
            for line in lines:
                # Example logic for converting text data
                if line.startswith("#EXTINF"):
                    channel_info = line.split(",")
                    channel_name = channel_info[-1].strip()
                    data[channel_name] = {
                        "url": lines[lines.index(line) + 1].strip(),
                        "logo": channel_info[1].split('=')[-1].strip('"')
                    }
    return data

txt_files = ["epg_ripper_US1.txt", "epg_ripper_US_LOCALS2.txt", "epg_ripper_US_SPORTS1.txt"]
epg_data = convert_txt_to_json(txt_files)

with open("epg_data.json", "w") as json_file:
    json.dump(epg_data, json_file, indent=4)

print("EPG data converted and saved to epg_data.json")
