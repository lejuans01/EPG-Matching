import os

def load_master_data(master_file_path):
    """Load master data from the .txt file into a dictionary."""
    master_data = {}
    with open(master_file_path, 'r') as f:
        for line in f:
            # Example: 3ABN.Dare.to.Dream.Network.us|tvg-id="3ABN_1"
            if "|" in line:
                channel_name, tvg_id = line.strip().split('|')
                master_data[channel_name.strip()] = tvg_id.strip()
    return master_data

def match_and_update_user_epg(user_epg_file_path, master_data):
    """Read user EPG and replace tvg-id based on the master data."""
    updated_lines = []
    with open(user_epg_file_path, 'r') as f:
        for line in f:
            if line.startswith("#EXTINF:"):
                channel_name = line.split(',')[-1].strip()
                if channel_name in master_data:
                    # Replace tvg-id with correct one from master
                    updated_line = line.replace('tvg-id=""', f'tvg-id="{master_data[channel_name]}"')
                    updated_lines.append(updated_line)
                else:
                    # If no match, keep the line as is (or set to "unknown")
                    updated_lines.append(line.replace('tvg-id=""', 'tvg-id="unknown"'))
            else:
                updated_lines.append(line)
    
    # Save the updated file
    with open('updated_epg.m3u', 'w') as f:
        f.writelines(updated_lines)
    print("EPG updated successfully!")

# Example usage
master_file_paths = [
    'docs/epg_ripper_US1.txt',  # The master .txt file with channels and tvg-id's
    'docs/epg_ripper_US_LOCALS2.txt',
    'docs/epg_ripper_US_SPORTS1.txt'
]
user_epg_file_path = 'user_uploaded_epg.m3u'  # The user's uploaded EPG file

master_data = {}
for path in master_file_paths:
    if os.path.exists(path):
        master_data.update(load_master_data(path))
    else:
        print(f"Warning: File {path} not found.")

if master_data:
    match_and_update_user_epg(user_epg_file_path, master_data)
else:
    print("Error: No master data loaded.")
