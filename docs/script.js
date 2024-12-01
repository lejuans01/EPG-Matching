// Load the EPG data (JSON format)
let epgData = {};
fetch('epg_data.json')
    .then(response => response.json())
    .then(data => {
        epgData = data;
        console.log('EPG Data Loaded:', epgData);
    });

// Process the uploaded file and match with EPG data
document.getElementById('process-button').addEventListener('click', function () {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please upload a file!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const content = event.target.result;
        const channels = parseM3U(content);
        const matches = matchChannels(channels, epgData);

        displayResults(matches);
    };
    reader.readAsText(file);
});

function parseM3U(content) {
    const lines = content.split('\n');
    const channels = [];
    let currentChannel = {};

    lines.forEach(line => {
        if (line.startsWith('#EXTINF')) {
            const nameMatch = line.match(/,(.*)$/);
            if (nameMatch) {
                currentChannel.name = nameMatch[1].trim();
            }
        } else if (line.startsWith('http')) {
            currentChannel.url = line.trim();
            channels.push(currentChannel);
            currentChannel = {}; // reset for the next channel
        }
    });

    return channels;
}

function matchChannels(channels, epgData) {
    const matchedChannels = [];
    channels.forEach(channel => {
        Object.keys(epgData).forEach(region => {
            if (epgData[region][channel.name]) {
                matchedChannels.push({
                    name: channel.name,
                    url: channel.url,
                    tvgId: epgData[region][channel.name]
                });
            }
        });
    });
    return matchedChannels;
}

function displayResults(matches) {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Clear previous results

    if (matches.length > 0) {
        matches.forEach(match => {
            const div = document.createElement('div');
            div.innerHTML = `${match.name} - ${match.tvgId} - <a href="${match.url}" target="_blank">Link</a>`;
            output.appendChild(div);
        });
    } else {
        output.innerHTML = 'No matches found.';
    }
}
