document.addEventListener('DOMContentLoaded', () => {
    const intervalInput = document.getElementById('intervalInput');
    const saveButton = document.getElementById('saveButton');
  
    // Load saved interval
    chrome.storage.sync.get(['refreshInterval'], (data) => {
      if (data.refreshInterval) {
        intervalInput.value = data.refreshInterval;
      }
    });
  
    // Save new interval when user clicks the save button
    saveButton.addEventListener('click', () => {
      const interval = parseInt(intervalInput.value);
      if (interval && interval > 0) {
        chrome.storage.sync.set({ refreshInterval: interval }, () => {
          alert('Refresh interval saved!');
        });
      }
    });
  });
  