browser.contextMenus.create({
    id: "routeToSelection",
    title: "Route to ...",
    contexts: ["selection"],
});

browser.contextMenus.onShown.addListener((info, tab) => {
    if (info.selectionText) {
        browser.contextMenus.update("routeToSelection", {
            title: `Route to: ${info.selectionText}`,
        });
        browser.contextMenus.refresh();
    }
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "routeToSelection") {
        const { startAddress } = await browser.storage.local.get("startAddress");

        browser.tabs.create({
            url: `https://www.google.com/maps/dir/${startAddress}/${encodeURIComponent(info.selectionText)}`,
        });
    }
});
