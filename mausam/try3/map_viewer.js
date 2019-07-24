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
  // var map = new GMap2(document.getElementById('map_canvas'));
  // map.setCenter(new GLatLng(latitude, longitude), 13);
  // var marker = new GMarker(new GPoint(lng, lat));
  // map.addOverlay(marker);

  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();

  var hattisar = new google.maps.LatLng(27.72,85.36);
  var boudha = new google.maps.LatLng(27.71,85.31);

  var mapOptions = {
    zoom: 14,
    center: boudha
  }
  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
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
