// Update the relevant fields with the new data.
const setDOMInfo = info => {
  // document.getElementById('total').textContent = info.total;
  document.getElementById('inputs').textContent = info.inputs;
  document.getElementById('buttons').textContent = info.buttons;
  onRenderMap();
};

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        setDOMInfo);
  });
});

// Unique ID to differentiate this content script from the rest of the web. 
// or use the extension id from @@__extension_id__, I recall there was a bug, haven't
// checked if it got resolved though. 
var UNIQUE_MAP_VIEWER_ID = 'crx_myextension_iframe'; 
var latitude = 1;
var longitude = 1;

/**
 * Here is where you want to render a latitude and longitude. We create an iframe so we
 * we can inject it. We just want to maintain a single instance of it though.
 */
function onRenderMap() {
  var mapViewerDOM = document.getElementById(UNIQUE_MAP_VIEWER_ID);
  if (mapViewerDOM) {
     mapViewerDOM.parentNode.removeChild(mapViewerDOM);
  }

  mapViewerDOM = document.createElement('iframe');
  mapViewerDOM.setAttribute('id', UNIQUE_MAP_VIEWER_ID);
  mapViewerDOM.setAttribute('src', chrome.extension.getURL('map_viewer.html'));
  mapViewerDOM.setAttribute('frameBorder', '0');
  mapViewerDOM.setAttribute('width', '99.90%');
  mapViewerDOM.setAttribute('height', '100%');
  mapViewerDOM.setAttribute('style', 'position: fixed; top: 0; left: 0; overflow: hidden; z-index: 99999');
  mapViewerDOM.onload = function(e) {
    //Construct & send message
    chrome.runtime.sendMessage({
        method: "postList",
        latitude: latitude,
        longitude: longitude
    }, function(response) {
        //Alert the message
        console.log("The response from the background page: " + response.response);//You have to choose which part of the response you want to display ie. response.response
    });
  }
  document.body.appendChild(mapViewerDOM);
}