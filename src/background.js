browser.contextMenus.create({
    id: "routeToSelection",
    title: "Route to ...",
    contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId !== "routeToSelection") return;

    const { startAddress } = await browser.storage.local.get("startAddress");

    const url = new URL("https://www.google.com/maps/dir/?api=1");
    if (startAddress) url.searchParams.set("origin", startAddress);
    url.searchParams.set("destination", info.selectionText);

    browser.tabs.create({ url: url.href, index: tab.index + 1 });
});
