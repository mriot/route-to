chrome.contextMenus.create({
    id: "routeToSelection",
    title: "Route to ...",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId !== "routeToSelection") return;

    chrome.storage.local.get("startAddress", (storageData) => {
        const startAddress = storageData?.startAddress || "";

        const url = new URL("https://www.google.com/maps/dir/?api=1");

        if (startAddress) url.searchParams.set("origin", startAddress);
        url.searchParams.set("destination", info.selectionText);

        chrome.tabs.create({ url: url.href, index: tab.index + 1 });
    });
});
