import requests

# Example URL of the EPG database or your .txt source
epg_url = "https://epgshare01.online/epgshare01/epg_ripper_US1.txt"

def fetch_and_process_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        # Print the raw data to check if it's being fetched properly
        print("Raw data fetched:\n", response.text[:500])  # Display first 500 chars of raw data
        
        # Process the data to extract channel names
        channels = process_channels(response.text)
        print("Channels processed:", channels)
    else:
        print("Failed to fetch data from", url)

def process_channels(data):
    lines = data.split("\n")
    channel_names = []
    
    for line in lines:
        if line.startswith("#EXTINF:"):
            # Extract channel name from the line (you might need to adjust this depending on the format)
            channel_name = line.split(",")[-1].strip()  
            channel_names.append(channel_name)
    
    return channel_names

# Fetch and process data
fetch_and_process_data(epg_url)
