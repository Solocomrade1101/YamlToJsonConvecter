chrome.runtime.onInstalled.addListener(async () => {
  let url = chrome.runtime.getURL("html/hello.html");
  let tab = await chrome.tabs.create({ url });

  chrome.storage.sync.get(['showClock'], (result) => {
    if (result.showClock) {
      chrome.action.setBadgeText({ text: 'ON' });
    }
  });

  // Установка URL для перенаправления при удалении расширения
  chrome.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSeiMiYzuB9W3kzXrBYhscp3agPnzX5O7W1TRHmmDnjxlFwbVg/viewform?usp=sf_link");
});

chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.update({}, async (tab) => {
    if (command == 'pin-current-tab') {
      chrome.tabs.update({ pinned: !tab.pinned });
    } else if (command == 'move-to-first') {
      chrome.tabs.move(tab.id, { index: 0 });
    } else if (command == 'move-to-last') {
      const allTabs = await chrome.tabs.query({});
      chrome.tabs.move(tab.id, { index: allTabs.length - 1 });
    } else if (command == 'copy-current-tab') {
      chrome.tabs.duplicate(tab.id);
    }
  });
});
