let epg_data = {}; 

function fetchData() {
  fetch('epg_data.json')
    .then(response => response.json())
    .then(data => {
      epg_data = data;
      console.log('EPG Data Loaded:', epg_data);
    })
    .catch(error => {
      console.error('Error fetching EPG data:', error);
    });
}

function matchChannels(m3uContent) {
  const lines = m3uContent.split("\n");
  const matchedChannels = [];
  const unmatchedChannels = [];

  lines.forEach(line => {
    if (line.startsWith("#EXTINF:")) {
      const channelName = line.split(",")[1].trim();

      let matchFound = false;

      for (let category in epg_data) {
        if (epg_data[category].includes(channelName)) {
          matchedChannels.push({ name: channelName, tvgId: epg_data[category][channelName] });
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        unmatchedChannels.push(channelName);
      }
    }
  });

  displayMatches(matchedChannels, unmatchedChannels);
}

function displayMatches(matched, unmatched) {
  let matchedOutput = matched.map(channel => `${channel.name} - tvg-id: ${channel.tvgId}`).join("\n");
  let unmatchedOutput = unmatched.join("\n");

  document.getElementById('channelOutput').innerHTML = `
    <h2>Matched Channels:</h2>
    <pre>${matchedOutput}</pre>
    <h2>Unmatched Channels:</h2>
    <pre>${unmatchedOutput}</pre>
  `;
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file && (file.type === "application/x-mpegurl" || file.name.endsWith(".m3u") || file.name.endsWith(".m3u8"))) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const m3uContent = e.target.result;
      matchChannels(m3uContent);
    };
    reader.readAsText(file);
  } else {
    alert("Please upload a valid M3U file.");
  }
}

window.onload = function() {
  fetchData(); 
};
