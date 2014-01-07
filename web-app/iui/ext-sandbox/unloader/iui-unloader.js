/*
   Copyright (c) 2007-14, iUI Project Members
   See LICENSE.txt for licensing terms
 */

//
// iui-unloader.js
//
// An iUI extension that will remove any iUI fragment or view (aka "page") when it receives
// an 'unload' event from iUI core.
//
// This will prevent your DOM from getting overloaded and using up memory.
// It could also be used as a template for a more advanced caching/unloading scheme.
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
	document.body.addEventListener('iui.afterinsert', afterInsert, false);
	document.body.addEventListener('iui.unload', unloader, false);
}, false);

function afterInsert(e)
{
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
