const $ = document.querySelector.bind(document);

chrome.storage.local.get("startAddress", ({ startAddress }) => {
    if (!startAddress) return;
    $("#addr").value = startAddress;
});

$("#save").addEventListener("click", async () => {
    await chrome.storage.local.set({ startAddress: $("#addr").value });

    $("#addr").style.outline = "2px solid lime";

    setTimeout(() => {
        $("#addr").style.outline = "";
    }, 1000);
});

$("#addr").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    $("#save").click();
});
