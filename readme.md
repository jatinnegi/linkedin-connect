# Auto-Connect Linkedin

A simple chrome extension to auto connect with people on linkedin.

- [How to run](#how-to-run)
- [Architecture](#architecture)
  - [Project Structure](#project-structure)
    - [Manifest.json](#manifest-json)
    - [Popup.\*](#popup-ext)
    - [ContentScript.js](#content-script)
    - [Background.js](#background-js)
    - [Utils.js](#utils-js)
  - [Chrome API](#chrome-api)
  - [MutationObserver](#mutation-observer)

## How to run

1. Clone the repo to your local machine.
2. Open your chrome web browser and click on the puzzle icon in the top right side and go to manage extensions.
3. Toggle on the developer mode on the top-right side of the window and then click on Load Unpacked.
4. Select the repo that you cloned on your local machine.
5. To run this extension you must be on a target page with a matching URL of this pattern `https://linkedin.com/search/results/people/*`
