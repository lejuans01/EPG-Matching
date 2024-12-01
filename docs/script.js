// Global variable to store EPG data
let epg_data = {}; 

// Function to fetch EPG data from a JSON file
function fetchEPGData() {
  fetch('epg_data.json')  // Make sure this points to the correct path for your JSON file
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
      epg_data = data;  // Store the loaded data in the epg_data variable
      console.log('Loaded EPG Data:', epg_data);  // Debugging log
      populateCategoryDropdown();  // Populate dropdown after loading data
    })
    .catch(error => console.error('Error loading EPG data:', error));  // Error handling
}

// Function to populate the category dropdown with available categories from epg_data
function populateCategoryDropdown() {
  const categories = Object.keys(epg_data);  // Get all category names (keys) from epg_data
  const categoryDropdown = document.getElementById('categoryDropdown');
  categoryDropdown.innerHTML = '';  // Clear existing options

  // Add each category to the dropdown
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;  // Set the category name as option text
    categoryDropdown.appendChild(option);  // Add the option to the dropdown
  });
}

// Function to match channels from M3U content
function matchChannels(m3uContent) {
  const lines = m3uContent.split("\n");  // Split M3U content by line
  const matchedChannels = [];  // Array to store matched channels
  const unmatchedChannels = [];  // Array to store unmatched channels

  // Loop through the M3U content to find matching channels
  lines.forEach(line => {
    if (line.startsWith("#EXTINF:")) {  // Identify channel lines in M3U
      const channelName = line.split(",")[1].trim();  // Extract the channel name

      let matchFound = false;

      // Loop through categories and check for matches
      for (let category in epg_data) {
        if (epg_data[category].hasOwnProperty(channelName)) {  // Check if the channel is in the category
          matchedChannels.push({ name: channelName, tvgId: epg_data[category][channelName] });
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        unmatchedChannels.push(channelName);  // If no match found, add to unmatched
      }
    }
  });

  // Display matched and unmatched channels
  displayMatches(matchedChannels, unmatchedChannels);
}

// Function to display matched and unmatched channels
function displayMatches(matched, unmatched) {
  let matchedOutput = matched.map(channel => `${channel.name} - tvg-id: ${channel.tvgId}`).join("\n");
  let unmatchedOutput = unmatched.join("\n");

  // Update HTML to display the matched/unmatched channels
  document.getElementById('channelOutput').innerHTML = `
    <h2>Matched Channels:</h2>
    <pre>${matchedOutput}</pre>
    <h2>Unmatched Channels:</h2>
    <pre>${unmatchedOutput}</pre>
  `;
}

// Handle the M3U file upload process
function handleFileUpload(event) {
  const file = event.target.files[0];  // Get the uploaded file
  if (file && (file.type === "application/x-mpegurl" || file.name.endsWith(".m3u") || file.name.endsWith(".m3u8"))) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const m3uContent = e.target.result;  // Read file content as text
      console.log("File content:", m3uContent);  // Debugging log to check file content
      matchChannels(m3uContent);  // Start matching channels with the uploaded file
    };
    reader.readAsText(file);  // Read the file as text
  } else {
    alert("Please upload a valid M3U file.");
  }
}

// Call fetchEPGData when the page loads
window.onload = function() {
  fetchEPGData();  // Load EPG data
};
