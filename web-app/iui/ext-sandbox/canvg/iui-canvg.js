/*
   Copyright (c) 2010, iUI Project Members
   See LICENSE.txt for licensing terms
 */

// requires querySelectorAll, therefore iPhone OS 2.x or later
// or Safari 3.x or later
// 
// requires HTML <canvas> support, but does *not* require SVG
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
// To do that we'll need to use the beforeInsert event
	var nodes = iui.getAllViews();
	for (var i = 0; i  < nodes.length  ; i++)
	{
		registerAllEvents(nodes[i]);
	}	
}, false);

function registerAllEvents(node)
{
	node.addEventListener('load', onLoad, false);
}

function afterInsert(e)
{
	registerAllEvents(e.insertedNode);	// Set event handlers on newly added node
}

function onLoad(e)
{
	if (e.target)
	{
		console.log("onLoad: " + e.target);
		var aNode = e.target.querySelector("a[rel='iuicanvg']");
		if (aNode && !iui.hasClass(aNode, 'iuiloaded'))	
		{
			var canvasNode = aNode.querySelector("canvas");
			if (canvasNode)
			{
			  	canvg(canvasNode, aNode.href, {ignoreMouse: true, ignoreAnimation: true});
			  	iui.addClass(aNode, 'iuiloaded');
			}
		}
	}
}


})();
