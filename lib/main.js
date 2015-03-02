var buttons = require("sdk/ui/button/action");
var Request = require("sdk/request").Request;
var tabs = require("sdk/tabs");
var URL = require("sdk/url").URL;

var icons = {
  "inactive": {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  "active": {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  }
}


var button = buttons.ActionButton({
  id: "contribute",
  label: "How to contribute!",
  icon: icons.inactive,
  onClick: dealWithIt
});

function dealWithIt() {
  console.log("");
};

function toggleIcon(state) {
  if(state == true){
    button.icon = icons.active;
  }
}


tabs.on("ready", function (tab) {
  debugger;
  var req = Request({
    url: new URL("/contribute.json", tab.url),
    onComplete: function (resp) {
      if (resp.status >= 200 && resp.status < 300 && resp.json != null) {
        toggleIcon(true);
        console.log(req.url + " - Contribute.json available!");
      } else {
        toggleIcon(false);
        console.log(req.url + " - Contribute.json unavailable, humbug.");
      }
      return;
    }
  }).get();
});
