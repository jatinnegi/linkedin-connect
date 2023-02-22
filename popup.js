import { getActiveTabURL } from "./utils.js";

chrome.runtime.onMessage.addListener(function (obj, sender, response) {
  const { type, payload } = obj;

  switch (type) {
    case "UPDATE_NUMBER":
      document.getElementById("number").innerText = payload;
      break;
    case "FINISHED":
      document.getElementById("connect-btn").innerHTML = "Start Connecting";
      document.getElementById("connect-btn").classList = "btn btn-green";
      break;
    default:
      break;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();

  const main = document.getElementById("main");
  const notFound = document.getElementById("not-found");
  const connectBtn = document.getElementById("connect-btn");

  if (
    activeTab.url &&
    activeTab.url.includes("linkedin.com/search/results/people")
  ) {
    main.classList = "main";
    notFound.classList = "hidden";

    connectBtn.addEventListener("click", () => {
      connectBtn.classList.toggle("btn-green");
      connectBtn.classList.toggle("btn-red");

      if (connectBtn.classList.contains("btn-red")) {
        connectBtn.innerText = "Stop connecting";
      } else {
        connectBtn.innerText = "Start Connecting";
      }

      chrome.tabs.sendMessage(activeTab.id, {
        type: "BUTTON_CLICK",
      });
    });
  } else {
    main.classList = "main hidden";
    notFound.classList = "main";
  }
});
