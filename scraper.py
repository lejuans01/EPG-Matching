import requests
from bs4 import BeautifulSoup
import sqlite3

BASE_URL = "https://epgshare01.online/epgshare01/"

# Step 1: Fetch all .txt files from the directory
def fetch_txt_files():
    response = requests.get(BASE_URL)
    soup = BeautifulSoup(response.text, "html.parser")
    txt_files = []
    for link in soup.find_all("a"):
        href = link.get("href")
        if href and href.endswith(".txt"):
            txt_files.append(href)
    return txt_files

# Step 2: Process each .txt file and store in database
def process_txt_file(file_name, cursor):
    url = BASE_URL + file_name
    response = requests.get(url)
    lines = response.text.splitlines()
    category = file_name.replace("epg_ripper_", "").replace(".txt", "").upper()
    
    for line in lines:
        line = line.strip()
        if line and not line.startswith("--"):  # Ignore comments or empty lines
            cursor.execute("INSERT INTO tvg_ids (tvg_id, category) VALUES (?, ?)", (line, category))

# Step 3: Setup database and process all files
def setup_database():
    conn = sqlite3.connect("epg_data.db")
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS tvg_ids (
                        id INTEGER PRIMARY KEY,
                        tvg_id TEXT,
                        category TEXT
                     )''')
    conn.commit()
    
    # Fetch and process files
    txt_files = fetch_txt_files()
    for txt_file in txt_files:
        process_txt_file(txt_file, cursor)
    
    conn.commit()
    conn.close()

# Run the scraper
setup_database()
