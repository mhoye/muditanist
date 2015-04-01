var buttons = require("sdk/ui/button/action");
var request = require("sdk/request").Request;
var tabs = require("sdk/tabs");
var URL = require("sdk/url").URL;
var data = require("sdk/self").data;
var hascontrib;
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
  onClick: function () {
    if (popup.isShowing) {
      popup.hide();
    } else if (hascontrib) {
      popup.show()
    }
  }
});

function toggleIcon(state) {
  button.icon = state ? icons.active : icons.inactive;
  hascontrib = state;
}

popup.port.on("click", (url) => {
  var newtab = null;
  for each (var tab in tabs) {
    if (tab.url === url) {
      newtab = tab;
      break;
    }
  }
  if (newtab) {
    newtab.activate();
  } else {
    tabs.open(url);
  }
  popup.hide();
});

function handleTab(tab) {
  let cjs = new URL("/contribute.json", tab.url);
  let req = request({
    url: cjs,
    onComplete: function (resp) {
      // If we switched tabs, this data is out of date.
      if (tab !== tabs.activeTab) {
        return;
      }
      let hasContribute = resp.status >= 200 && resp.status < 300 && resp.json != null;
      toggleIcon(hasContribute);
      if (hasContribute) {
        popup.port.emit("data", resp.json);
      }
    }
  }).get();
}

tabs.on("ready", handleTab);
tabs.on("activate", handleTab);
