/*
   Copyright (c) 2007-14, iUI Project Members
   See LICENSE.txt for licensing terms
 */

(function() {

var eventNames = ['iui.beforeinsert', 'iui.afterinsert', 'iui.afterinsertend', 'iui.blur', 'iui.focus', 'iui.load', 'iui.unload', 'iui.beforetransition', 'iui.aftertransition'];

// Using DOMContentLoaded so this loads before the onload in iui.js -- need a better method (Issue #204?)
// We need to register before iUI's main onload handler so we can get the 'load' and 'focus' events
// for the default 'page' (view).
//
// The "better method" may be related to http://code.google.com/p/iui/issues/detail?id=204
//  but there may need to be more than one hook for iUI loading...
//
addEventListener("DOMContentLoaded", function(event)
{
	for (var i = 0; i  < eventNames.length  ; i++)
    {
        document.body.addEventListener(eventNames[i], logEvent, false);        
    }
}, false);

function logEvent(e)
{
	console.log("logEvent type: " + e.type + "  target " + e.target.tagName + "#" + e.target.id);
	if (e.type == "iui.beforetransition" || e.type == "iui.aftertransition")
	{
		console.log("  out trans = " + e.out);
	}
	else if (e.type == "iui.beforeinsert") {
		console.log("  fragment = " + e.fragment);
	}
	else if (e.type == "iui.afterinsert") {
		console.log("  node = " + e.insertedNode);
	}
	else if (e.type == "iui.afterinsertend") {
		console.log("  fragment = " + e.fragment);
	}
}

})();
