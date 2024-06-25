browser.contextMenus.create({
    id: "routeToSelection",
    title: "Route to ...",
    contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId !== "routeToSelection") return;
    const { startAddress } = await browser.storage.local.get("startAddress");

    browser.tabs.create({
        url: encodeURI(`https://www.google.com/maps/dir/${startAddress}/${info.selectionText}`),
    });
});
