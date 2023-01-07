
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"],
  });

  console.log('@@@@@@@@@@@2chrome.runtime.onInstalled');
});

// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(() => {
  // do something
  console.log('@@@@@@@@@@@2chrome.bookmarks.onCreated');
});
const filter = {
  url: [
    {
      urlMatches: 'https://www.google.com/',
    },
  ],
};

chrome.webNavigation.onCompleted.addListener(() => {
  console.info("The user has loaded my favorite website!");
}, filter);
