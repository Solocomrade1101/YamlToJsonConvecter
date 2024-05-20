
chrome.runtime.onInstalled.addListener(async () => {
  let url = chrome.runtime.getURL("html/hello.html");

  chrome.storage.sync.get(['showClock'], (result) => {
    if (result.showClock) {
      chrome.action.setBadgeText({ text: 'ON' });
    }
  });
});

chrome.commands.onCommand.addListener( (command) => {

  chrome.tabs.update({}, async (tab) => {
    debugger
    if (command == 'pin-current-tab') {
      chrome.tabs.update({ pinned: !tab.pinned });
    } else if (command == 'move-to-first') {
      chrome.tabs.move(tab.id, { index: 0 });
    }
    else if (command == 'move-to-last') {
      const allTabs = await chrome.tabs.query({})
      chrome.tabs.move(tab.id, { index: allTabs.length - 1 });
    }
    else if (command == 'copy-current-tab') {
      chrome.tabs.duplicate(tab.id);
    }
  });
});

