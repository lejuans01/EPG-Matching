name: EPG Matching Workflow

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Set Git Config
        run: |
          git config --global user.name "GitHub Actions"
          git config --global user.email "github-actions@github.com"

      - name: Check epg_data.json before script
        run: |
          echo "Before running script:"
          cat epg_data.json || echo "No epg_data.json file found"
        
      - name: Run the Python script to update epg_data.json
        run: |
          python convert_txt_to_json.py

      - name: Check epg_data.json after script
        run: |
          echo "After running script:"
          cat epg_data.json || echo "No epg_data.json file found"
        
      - name: Check if epg_data.json has changes
        run: |
          git diff --exit-code || echo "Changes detected in epg_data.json"

      - name: Commit and Push Changes (if any)
        run: |
          git status
          if ! git diff --exit-code; then
            git add epg_data.json
            git commit -m "Update epg_data.json from TXT files"
            git push https://x-access-token:${{ secrets.GH_TOKEN }}@github.com/${{ github.repository }} HEAD:main
          else
            echo "No changes detected, skipping commit."
