/*
   Copyright (c) 2007-9, iUI Project Members
   See LICENSE.txt for licensing terms
 */

// requires iui.js
// requires querySelectorAll, therefore iPhone OS 2.x or later
// or Safari 3.x or later
// requires DOMContentLoaded event

(function() {

// global, byClass, and byID need to be setup at page load time and be ready
// when DOMContentLoaded is called.
window.iui.views =
{
	global: null,
	byClass: [],
	byID: []
}

var eventNames = ['load', 'unload', 'focus', 'blur', 'beforetransition', 'aftertransition' ];

// Using DOMContentLoaded so this loads before the onload in iui.js -- need a better method
// We need to register before iui's main onload handler so we can get the 'load' and 'focus' events
// for the default 'page' (view).
//
addEventListener("DOMContentLoaded", function(event)
{
	document.body.addEventListener('afterinsert', afterInsert, false);
// This will register event handlers on all initial nodes
// We'll also need to register handlers on inserted (via ajax) nodes
// To do that we'll need to use the beforeInsert event
	nodes = document.querySelectorAll("body > *:not(.toolbar)");
	for (var i = 0; i  < nodes.length  ; i++)
	{
		registerNode(nodes[i]);
	}
}, false);

function registerNode(node)
{
	console.log("registerNode: " + node.id + " = " + node);

	// One view per node, first one found is used.
	// If id match, use that, else first class match, else global (if any)
	var view =	window.iui.views.byID[node.id] ||
				viewByClass(node) ||
				window.iui.views.global;
	
	if (view)
	{
		for (var i = 0; i < eventNames.length  ; i++)
		{
			var name = eventNames[i];
			var onName = "on" + name;
			if (view[onName])
			{
				console.log("addlistener: " + name + " func: " + onName + "() on #" + node.id + " = " + node);
				node.addEventListener(name, view[onName], false);
			}
		}
	}
}

function viewByClass(node)
{
	var view = null;
	var classString = node.getAttribute("class");
	if (classString)
	{
		var classes = classString.split(' ');
		for (var i=0; i < classes.length ; i++)
		{
			view = window.iui.views.byClass[classes[i]];
			if (view) break;
		}
	}
	return view;
}

function afterInsert(e)
{
	logEvent(e);
	registerNode(e.insertedNode);	// Set event handlers on newly added node
}

function logEvent(e)
{
	console.log("logEvent type: " + e.type + "  target " + e.target.tagName + "#" + e.target.id);
	if (e.type == "beforetransition" || e.type == "aftertransition")
	{
		console.log("  out trans = " + e.out);
	}
	else if (e.type == "beforeinsert") {
		console.log("  fragment = " + e.fragment);
	}
	else if (e.type == "afterinsert") {
		console.log("  node = " + e.insertedNode);
	}
}


})();

