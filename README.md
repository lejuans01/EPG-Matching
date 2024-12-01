# EPG M3U Matching Processor

## Overview

This repository hosts an **EPG M3U Matching Processor** that allows users to upload their M3U files, match them against a master EPG database, and download the processed M3U file with correct `tvg-id` values.

The project uses GitHub Pages for a web-based interface, and the database is populated using data from multiple `.txt` files available on the **[EPGShare01](https://epgshare01.online/)** website.

## Features

- Upload and process M3U files.
- Match channels in the uploaded M3U file with the **master EPG database**.
- Categorize channels based on the available source data.
- Download the final processed M3U file with matched `tvg-id` values.
- The tool supports refining matches based on categories.
- Web-based interface with **dark mode** and **responsive design**.

## Demo

You can try the live demo of the web application here:

[https://lejuans01.github.io/EPG-Matching/](https://lejuans01.github.io/EPG-Matching/)

## How to Use

1. **Upload or Paste M3U File**: 
   - Use the **"Upload M3U File"** button to select a local `.m3u` file, or paste M3U content into the text area provided.

2. **Process the File**: 
   - Click **"Process File"** to start matching channels from your M3U file with the `tvg-id` values from the master database.

3. **Refine Matches**:
   - After processing, select a category from the dropdown (e.g., `US`, `UK`, etc.) to refine the matching process further.

4. **Download Processed M3U**: 
   - Once you're satisfied with the matches, click **"Download M3U"** to download the final M3U file with the correct `tvg-id` values.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
