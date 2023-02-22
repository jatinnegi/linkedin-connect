# Auto-Connect Linkedin

A simple chrome extension to auto connect with people on linkedin.

- [How to run](#how-to-run)
- [Architecture](#architecture)
  - [Project Structure](#project-structure)
  - [Chrome API](#chrome-api)
  - [MutationObserver](#mutation-observer)

## How to run

1. Clone the repo to your local machine.
2. Open your chrome web browser and click on the puzzle icon on the top right side and go to manage extensions.
3. Toggle on the developer mode on the top-right side of the window and then click on the Load Unpacked button.
4. Select the repo that you cloned on your local machine. Click on the puzzle icon from step 2 again. Find the extension and pin it to your chrome taskbar.
5. To run this extension you must be on a target page with a matching URL of this pattern `https://linkedin.com/search/results/people/*`

## Architecture

- ### Project Structure

  - ### Manifest.json

    This specifies the name, description, version along with other important information for our extension.

  - ### Popup.\*

    This contains popup.html, popup.css and popup.js file. This is the UI part, the user will interact with.

  - ### ContentScript.js

    This is where the core logic of our extension is written. It will interact with our background.js and popup.js files using chrome's API. Here we fetch all the connect buttons when we are on a target page and send our connect requests.

  - ### Background.js

    This a service worker file which runs seperatly from the main web browser thread. This keeps track of what tab the user is currently on.

  - ### Utils.js
    Export some helper functions for our popup.js file.

- ### Chrome API

  Chrome's API is what we will be using to interact with our service worker file and content script file. For our extension we will be using chrome's tab and runtime API. Tab API helps us to keep track of the URL of the active tab and runtime API helps us to trigger and respond to events in our app or extension lifecycle.

- ### Mutation Observer

  Following is the code snippet we are using to fetch all the connect buttons from a target page

  ```javascript
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
  ```

  First we grab the unordered list element where all the user rows are filled in. We instantiate a new Mutation Observer to observe any changes in our unordered list element. This is because, the data is fetched dynamically by Linkedin, so we will need to updated our "connectedButtons" global state every time we detect change in the unordered list element.

  We are querying all the span elements with the text "connect" and adding the parent element which is the button element in this case to our global state.

  Then we create a timer function which will run every 1.5 seconds. This function remove's one button at time from our global state "connectedButtons" and trigger's a click event on that button element.

  We are also keeping track of other state like "requests" which keeps track of how many requests have been sent. We then render that number in our UI.
