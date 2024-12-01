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

## Setup

### 1. Clone the Repository

First, clone this repository to your local machine using the following command:

```bash
git clone https://github.com/lejuans01/EPG-Matching.git
