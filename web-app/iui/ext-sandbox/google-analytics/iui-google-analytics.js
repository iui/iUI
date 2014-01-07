/*
   Copyright (c) 2007-14, iUI Project Members
   See LICENSE.txt for licensing terms
 */

//
// For an example see web-app/mobile/demos.html
//
// Assumes that Google Analytics has been installed in the page in asynchronous mode
// Typically this is done by inserting the recommended script tag and contents at the bottom
// of the head section of the page
//

(function() {

// Using DOMContentLoaded so this loads before the onload in iui.js -- need a better method (Issue #204?)
// We need to register before iui's main onload handler so we can get the 'load' and 'focus' events
// for the default 'page' (view).
//
// The "better method" may be related to http://code.google.com/p/iui/issues/detail?id=204
//  but there may need to be more than one hook for iUI loading...
//
addEventListener("DOMContentLoaded", function(event)
{
	document.body.addEventListener('iui.focus', trackEvent, false);
}, false);

function trackEvent(e)
{
//	console.log("trackEvent type: " + e.type + "  target " + e.target.tagName + "#" + e.target.id);
	_gaq.push(['_trackEvent', 'iUI', 'focus', e.target.tagName + "#" + e.target.id]);
}

})();
