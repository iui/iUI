/*
   Copyright (c) 2010, iUI Project Members
   See LICENSE.txt for licensing terms
 */

// requires querySelectorAll, therefore iPhone OS 2.x or later
// or Safari 3.x or later

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
	var nodes = document.querySelectorAll("body > *:not(.toolbar)");
	for (var i = 0; i  < nodes.length  ; i++)
	{
		registerAllEvents(nodes[i]);
	}
}, false);

function registerAllEvents(node)
{
	node.addEventListener('aftertransition', afterTrans, false);
	node.addEventListener('beforetransition', beforeTrans, false);
}

function afterInsert(e)
{
	registerAllEvents(e.insertedNode);	// Set event handlers on newly added node
}

function afterTrans(e)
{
	if (!e.out)
	{
		var aNode = e.target.querySelector("a[rel='iuiposter']");
		if (aNode)
		{
			var img = aNode.querySelector("img");
			var vid = document.createElement("video");
			vid.src = aNode.href;
//			vid.loop = true;
			vid.width = img.width;
			vid.height = img.height;
			vid.poster = img.src;
			vid.style.opacity = 0;
			aNode.parentNode.insertBefore(vid, aNode); //aNode);
			setTimeout(hideANode, 0);
		}
		function hideANode() {  vid.style.opacity = 1;  aNode.style.opacity = 0; vid.load(); vid.play(); }
	}
}

function beforeTrans(e)
{
	if (e.out)
	{
		var vid = e.target.querySelector("video");
		if (vid)
		{
			vid.pause();
			if (false)
			{
			var aNode = document.createElement("a");
			aNode.href = vid.src;
			aNode.rel="iuiposter";
			var imgNode = document.createElement("img");
			imgNode.width = 720;
			imgNode.height = 405;
			imgNode.src = vid.poster;
			aNode.appendChild(imgNode);
			vid.parentNode.replaceChild(aNode, vid);
			}
			var aNode = e.target.querySelector("a[rel='iuiposter']");
			if (aNode)
			{
				//aNode.style.visibility = 'visible';
				//vid.style.visibility = 'hidden';
				aNode.style.opacity = 1;
				vid.style.opacity = 0;
			}
			setTimeout(hideVid, 0);
			function hideVid() { vid.parentNode.removeChild(vid);  }
			
		}
	}
}


})();
