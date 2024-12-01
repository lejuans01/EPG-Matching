let epg_data = {};  // Initialize an empty object to store EPG data

// Function to fetch the master EPG data from the server (you need to provide the correct file path)
function fetchMasterData() {
  fetch('epg_data.json')  // This should point to your master record data in JSON format
    .then(response => response.json())  // Assuming the file is in JSON format
    .then(data => {
      epg_data = data; // Store the scraped data
      console.log('Master EPG Data Loaded:', epg_data);  // Logs the data to the console
    })
    .catch(error => {
      console.error('Error fetching EPG data:', error);  // Error handling
    });
}

// Function to match and update the M3U file
function matchChannels(m3uContent) {
  const lines = m3uContent.split("\n");
  const matchedChannels = [];
  const unmatchedChannels = [];

  // Loop through the M3U lines and find matches
  lines.forEach(line => {
    if (line.startsWith("#EXTINF:")) {
      const channelName = line.split(",")[1].trim();  // Extract the channel name
      console.log("Processing channel:", channelName);  // Debugging statement

      let matchFound = false;

      // Check if the channel name exists in the master data
      for (let category in epg_data) {
        if (epg_data[category].hasOwnProperty(channelName)) {
          // If found, add the tvg-id to the matched channels
          matchedChannels.push({ name: channelName, tvgId: epg_data[category][channelName] });
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        // If no match found, add to unmatched channels
        unmatchedChannels.push(channelName);
      }
    }
  });

  // Display the matched and unmatched channels
  displayMatches(matchedChannels, unmatchedChannels);
}

// Function to display matched and unmatched channels
function displayMatches(matched, unmatched) {
  let matchedOutput = matched.map(channel => `${channel.name} - tvg-id: ${channel.tvgId}`).join("\n");
  let unmatchedOutput = unmatched.join("\n");

  // Update the result section in the HTML
  document.getElementById('channelOutput').innerHTML = `
    <h2>Matched Channels:</h2>
    <pre>${matchedOutput}</pre>
    <h2>Unmatched Channels:</h2>
    <pre>${unmatchedOutput}</pre>
  `;
}

// Handle the file upload process
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file && (file.type === "application/x-mpegurl" || file.name.endsWith(".m3u") || file.name.endsWith(".m3u8"))) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const m3uContent = e.target.result;
      matchChannels(m3uContent);  // Start matching process with the uploaded file
    };
    reader.readAsText(file);
  } else {
    alert("Please upload a valid M3U file.");
  }
}

// Load the master EPG data when the page loads
window.onload = function() {
  fetchMasterData();  // Load the master EPG data into memory
};
