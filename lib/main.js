var require("sdk/tabs");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var domain, reqest, response ;

var icons = 



var button = buttons.ActionButton({
  id: "contribute",
  label: "How to contribute!",
    icon: {
      "16": "./icon-16.png",
      "32": "./icon-32.png",
      "64": "./icon-64.png"
      },
      onClick: dealWithIt;
});

functon dealWithIt() {
    console.log(""); 

};

function toggleIcon(state) {
    if(state == true){
        button.icon.16 = "./


tab.on('ready', function(tab){
  req = require("sdk/request").Request({
      url: window.location.protocol + window.location.host + "/contribute.json",  
      onComplete: function(resp){
      if(req.status == 200){
        toggleIcon(true);
        console.log(url + " - Contribute.json available!");
      } else {
        toggleIcon(false);
        console.log(url + " - Contribute.json unavailable, humbug.");
   });
});


