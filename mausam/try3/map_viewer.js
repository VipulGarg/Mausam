// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict'

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.method == "postList") {
      renderMap(request.latitude, request.longitude);
      sendResponse({
        response: "Response Received"
      });
    }
  });

function renderMap(latitude, longitude) {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();

  var hattisar = new google.maps.LatLng(47.606200, -122.332100);
  var boudha = new google.maps.LatLng(37.774889, -122.419389);

  var mapOptions = {
    zoom: 14,
    center: boudha
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);

  var request = {
    origin: hattisar,
    destination: boudha,
    travelMode: 'DRIVING'
  }

  directionsService.route(request, function(result, status) {
      if (status == "OK") {
        directionsDisplay.setDirections(result);
      }
  });
}
