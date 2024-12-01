// Sample data for now, replace with actual data loading logic
const channelData = {
    "Channel 1": {
        "url": "http://example.com/channel1",
        "logo": "http://example.com/logo1.png"
    },
    "Channel 2": {
        "url": "http://example.com/channel2",
        "logo": "http://example.com/logo2.png"
    }
};

// Function to load the channels into the HTML
function loadChannels() {
    const channelListDiv = document.getElementById('channel-list');
    for (const channel in channelData) {
        const channelDiv = document.createElement('div');
        channelDiv.classList.add('channel');
        channelDiv.innerHTML = `
            <h2>${channel}</h2>
            <img src="${channelData[channel].logo}" alt="${channel} logo">
            <a href="${channelData[channel].url}" target="_blank">Watch</a>
        `;
        channelListDiv.appendChild(channelDiv);
    }
}

// Call the loadChannels function to populate the list
loadChannels();
