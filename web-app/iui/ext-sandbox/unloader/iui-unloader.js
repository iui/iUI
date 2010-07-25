/*
   Copyright (c) 2007-10, iUI Project Members
   See LICENSE.txt for licensing terms
 */

//
// iui-unloader.js
//
// An iUI extension that will remove any iUI fragment or view (aka "page") when it receives
// an 'unload' event from iUI core.
//
// This will prevent your DOM from getting overloaded.  It can also be used as a template
// for a more advanced unloading scheme.
//
// requires querySelectorAll, therefore iPhone OS 2.x or later
// or Safari 3.x or later
//
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
	nodes = document.querySelectorAll("body > *:not(.toolbar)");
	for (var i = 0; i  < nodes.length  ; i++)
	{
		registerEvents(nodes[i]);
	}
}, false);

function registerEvents(node)
{
	node.addEventListener('unload', unloader, false);
}

function afterInsert(e)
{
	registerEvents(e.insertedNode);	// Set event handlers on newly added node
	console.log("Marking " + e.insertedNode + " for removal from DOM on unload");
	e.insertedNode.unloadMe = true;	// Mark everything inserted by Ajax for removal
}

function unloader(e)
{
	if (e.target.unloadMe)	// If marked for removal
	{
		console.log("About to remove " + e.target + " from " + e.target.parentNode);
		e.target.parentNode.removeChild(e.target);	// remove the node after unloaded
	}
}


})();
