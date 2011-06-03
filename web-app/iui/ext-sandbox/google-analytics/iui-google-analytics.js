/*
   Copyright (c) 2007-10, iUI Project Members
   See LICENSE.txt for licensing terms
 */

//
// For an example see web-app/index.html
//
// requires querySelectorAll, therefore iPhone OS 2.x or later
// or Safari 3.x or later
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
	document.body.addEventListener('afterinsert', afterInsert, false);
// This will register event handlers on all initial nodes
// We'll also need to register handlers on inserted (via ajax) nodes
// To do that we'll need to use the afterInsert event
	var nodes = iui.getAllViews();
	for (var i = 0; i  < nodes.length  ; i++)
	{
		registerEvents(nodes[i]);
	}
}, false);

function registerEvents(node)
{
	node.addEventListener('focus', trackEvent, false);
}

function afterInsert(e)
{
	registerEvents(e.insertedNode);	// Set event handlers on newly added node
}

function trackEvent(e)
{
//	console.log("trackEvent type: " + e.type + "  target " + e.target.tagName + "#" + e.target.id);
	_gaq.push(['_trackEvent', 'iUI', 'focus', e.target.tagName + "#" + e.target.id]);
}


})();
