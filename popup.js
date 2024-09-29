document.addEventListener('DOMContentLoaded', () => {
    const intervalInput = document.getElementById('intervalInput');
    const refreshToggle = document.getElementById('refreshToggle');
    const saveButton = document.getElementById('saveButton');
  
    // Load saved settings when the popup opens
    chrome.storage.sync.get(['refreshInterval', 'autoRefreshEnabled'], (data) => {
      if (data.refreshInterval) {
        intervalInput.value = data.refreshInterval;
      }
      if (typeof data.autoRefreshEnabled !== 'undefined') {
        refreshToggle.value = data.autoRefreshEnabled ? 1 : 0;
      }
    });
  
    // Save settings when the user clicks the save button
    saveButton.addEventListener('click', () => {
      const interval = parseInt(intervalInput.value);
      const autoRefreshEnabled = refreshToggle.value === '1';  // Slider value is "1" for enabled, "0" for disabled
  
      if (interval && interval > 0) {
        chrome.storage.sync.set({
          refreshInterval: interval,
          autoRefreshEnabled: autoRefreshEnabled
        }, () => {
          alert('Settings saved!');
        });
      }
    });
  });
  