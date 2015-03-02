var require("sdk/tabs");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var domain, reqest, response ;

var icons = {
  "inactive": {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  }
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
      onClick: dealWithIt;
});

functon dealWithIt() {
    console.log(""); 

};

function toggleIcon(state) {
    if(state == true){
      button.icon = icons.active;
    }
}


tab.on('ready', function(tab){
  req = require("sdk/request").Request({
      url: new URL("/contribute.json", window.location),
      onComplete: function(resp){
      if(resp.status >= 200 && resp.status < 300 && resp.json != null){
        toggleIcon(true);
        console.log(url + " - Contribute.json available!");
      } else {
        toggleIcon(false);
        console.log(url + " - Contribute.json unavailable, humbug.");
   });
});


