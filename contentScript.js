(() => {
  let connectButtons = [];
  let requests = 0;
  let intervalId = null;

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type } = obj;

    switch (type) {
      case "TAB_UPDATE":
        connectButtons = [];
        requests = 0;
        main();
        break;
      case "BUTTON_CLICK":
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        } else intervalId = setInterval(timer, 1500);
      default:
        break;
    }
  });

  const main = () => {
    const ul = document.querySelectorAll(
      ".reusable-search__entity-result-list.list-style-none"
    )[0];

    try {
      const obs = new MutationObserver(function (mutations, _) {
        for (let i = 0; i < mutations.length; i++) {
          const mutation = mutations[i];

          for (let j = 0; j < mutation.addedNodes.length; j++) {
            if (
              mutation.addedNodes[j].nodeName === "SPAN" &&
              mutation.addedNodes[j].textContent.trim() === "Connect"
            )
              connectButtons.push({
                id: mutation.addedNodes[j].parentElement.id,
                element: mutation.addedNodes[j].parentElement,
              });
          }
        }
      });

      obs.observe(ul, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    } catch {
      setTimeout(() => {
        main();
      }, 500);
    }
  };

  const timer = () => {
    if (connectButtons.length) {
      const button = connectButtons.shift();
      requests++;

      chrome.runtime.sendMessage({
        type: "UPDATE_NUMBER",
        payload: requests,
      });

      button.element.click();
      setTimeout(() => {
        document
          .querySelectorAll(
            ".artdeco-modal__dismiss.artdeco-button.artdeco-button--circle.artdeco-button--muted.artdeco-button--2.artdeco-button--tertiary.ember-view"
          )[0]
          .click();
      }, 100);

      document.getElementById(button.id).scrollIntoView();
    } else {
      chrome.runtime.sendMessage({ type: "FINISHED" });
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  main();
})();
