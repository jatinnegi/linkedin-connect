# Auto-Connect Linkedin

A simple chrome extension to auto connect with people on linkedin.

- [How to run](#how-to-run)
- [Architecture](#architecture)
  - [Project Structure](#project-structure)
    - [Manifest.json](#manifest.json)
    - [Popup.\*](#popup.*)
    - [ContentScript.js](#content-script)
    - [Background.js](#background-js)
    - [Utils.js](#utils-js)
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

    This contains popup.html, popup.css and popup.js file. This is the UI part the user will interact with.

  - ### ContentScript.js

    This is there where the core logic of our extension is written. It will interact with our background.js and popup.js files using chrome's Tab API. This is where we fetch all the connect buttons when we are on the target page and send connect requests.

  - ### Background.js

    This a service worker file which runs seperatly from the main web browser thread. This keeps track of what tab user is currently active on.

  - ### Utils.js
    Export some helper functions for our popup.js file.
