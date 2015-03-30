var buttons = require("sdk/ui/button/action"); 
var request = require("sdk/request").Request; 
var tabs = require("sdk/tabs"); 
var URL = require("sdk/url").URL;
var data = require("sdk/self").data;
var popup = require("sdk/panel").Panel({
  width: 640,
  height: 480,
  contentURL: data.url("contribute.html"),
  contentScriptFile: data.url("contribute.js")
});

var icons = {
  "inactive": {
    "16": "./icon-16-bw.png",
    "32": "./icon-32-bw.png",
    "64": "./icon-64-bw.png"
  },
  "active": {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  }
}

var button = buttons.ActionButton({
  id: "contribute",
  label: "Contribute!",
  icon: icons.inactive,
  onClick: function () { popup.isShowing ? 
                         popup.hide() : popup.show();
}});

function toggleIcon(state) {
  button.icon = state ? icons.active : icons.inactive;
}


tabs.on("ready", function (tab) {
  var cjs = new URL("/contribute.json", tab.url) ;
  var req = request({
    url: cjs, 
    onComplete: function (resp) {
      if (resp.status >= 200 && resp.status < 300 && resp.json != null) {
        toggleIcon(true);
        popup.port.emit("data", resp.json);
      } else { 
        toggleIcon(false);
      }}
  }).get();
});
