/*

  ##    ##   ## ######  
        ##   ##   ##    
####    ##   ##   ##    
  ##    ##   ##   ##    
  ##    ##   ##   ##    
  ##    ##   ##   ##    
######   #####  ######  

Based on Joe Hewitt's iPhone Menu Nav code.
<http://www.joehewitt.com/files/iphone/navigation.html>

Copyright (c) Kristopher Tate & Joe Hewitt.
Permission is granted to copy, distribute and/or modify this document
under the terms of the GNU Free Documentation License, Version 1.2
or any later version published by the Free Software Foundation;
with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
A copy of the license is included in the section entitled "GNU
Free Documentation License". 

Project hosted on Google Code: http://code.google.com/p/iui/

Enjoy.

*/

var animateX = -20;
var animateInterval = 24;

var currentPage = null;
var currentDialog = null;
var currentWidth = 0;
var currentHash = location.hash;
var hashPrefix = "#_";
var pageHistory = [];

addEventListener("load", function(event) {
  var content = $('content');
  for (var child = content.firstChild; child; child = child.nextSibling) {
    if (child.nodeType == 1 && child.getAttribute("selected") == "true") {
      iUI.showPage(child);
      break;
    }
  }

  setInterval(iUI.checkOrientAndLocation, 300);
  setTimeout(scrollTo, 0, 0, 1);

  var gradientElement = $("headerGradient");
  var ctx = gradientElement.getContext("2d");

  var gradient = ctx.createLinearGradient(0, 0, 0, 25);
  gradient.addColorStop(0.0, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1, 44);
    
}, false);
    
addEventListener("click", function(event) {
  event.preventDefault();

  var link = event.target;
  while (link && link.localName.toLowerCase() != "a") {
    link = link.parentNode;
  }

  if (link && link.hash) {
    var page = $(link.hash.substr(1));
    iUI.showPage(page);
  }
}, true);


iUI = {
  checkOrientAndLocation : function() {
    if (window.outerWidth != currentWidth) {
      currentWidth = window.outerWidth;
  
      var orient = currentWidth == 320 ? "profile" : "landscape";
      document.body.setAttribute("orient", orient);
    }
  
      if (location.hash != currentHash) {
        currentHash = location.hash;

        var pageId = currentHash.substr(hashPrefix.length);
        var page = $(pageId);
        if (page) {
          var index = pageHistory.indexOf(pageId);
          var backwards = index != -1;
          if (backwards) {
            pageHistory.splice(index, pageHistory.length);
          }
  
          iUI.showPage(page, backwards);
        }
      }
  },
      
  showPage : function(page, backwards) {
    if (currentDialog) {
      currentDialog.removeAttribute("selected");
      currentDialog = null;
    }

    location.href = currentHash = hashPrefix + page.id;
    pageHistory.push(page.id);

    var fromPage = currentPage;
    currentPage = page;
    
    if (page.id != "root") {
      try {
        $('backLink').innerHTML = fromPage.title || "";
      } catch ( e ) {
        //
      }
    }

    var pageTitle = $("main-title");
    pageTitle.innerHTML = page.title || "";

    var homeButton = $("back");
    if (homeButton) {
      homeButton.style.display = page.id == "root" ? "none" : "inline";
    }

    if (fromPage) {
      setTimeout(iUI.swipePage, 0, fromPage, page, backwards);
    }
  },
  
  swipePage : function(fromPage, toPage, backwards) {
    toPage.style.left = "100%";
    toPage.setAttribute("selected", "true");
    scrollTo(0, 1);
    
    var percent = 100;
    var timer = setInterval(function() {
      percent += animateX;
      if (percent <= 0) {
        percent = 0;
        fromPage.removeAttribute("selected");
        clearInterval(timer);
      }

      fromPage.style.left = (backwards ? (100-percent) : (percent-100)) + "%"; 
      toPage.style.left = (backwards ? -percent : percent) + "%"; 
    }, animateInterval);
  },
  
  showDialog : function(form) {
    currentDialog = form;
    form.setAttribute("selected", "true");
    
    form.onsubmit = function(event) {
      event.preventDefault();
      form.removeAttribute("selected");

      var index = form.action.lastIndexOf("#");
      if (index != -1) {
        iUI.showPage($(form.action.substr(index+1)));
      }
    }

    form.onclick = function(event) {
      if (event.target == form) {
        form.removeAttribute("selected");
      }
    }
  }
}	//END iUI