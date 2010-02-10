/*
   Copyright (c) 2007-10, iUI Project Members
   See LICENSE.txt for licensing terms
 */

// iUI Just In Time (JavaScript) Loader
//
// Based on work submitted by C.W. Zachary for Issue #128
// and Wayne Pan for Issue #102
//
// This is a work-in-progress and that's why it's in the "sandbox"
// This version should load external scripts that referenced in the @src attribute
// of <script> tags that are loaded via Ajax.
//
// Caveats:
//   1) Hardly any testing
//   2) Assumes type="text/javascript"
//   3) Loads same JS file multiple times 'afterInsert'
//
// Todo:
//   1) eval code inside <script> tags as in #102
//   2) Support for loading CSS stylesheets
///

(function() {

var loadedScripts = [];

addEventListener("load", function(event)
{
	document.body.addEventListener('beforeinsert', beforeInsert, false);
	document.body.addEventListener('afterinsert', afterInsert, false);
}, false);

var loadingScripts = [];

function beforeInsert(e)
{
	console.log("beforeInsert: " + loadingScripts.length + " in loadingScripts");
	var node = e.fragment;
	if (node.tagName == 'SCRIPT')
	{
		loadingScripts.push[node];
//		loadScript(node.getAttribute('src'));
	}
	else
	{
		var scriptEls = node.getElementsByTagName('SCRIPT');
		for (var i = 0, l = scriptEls.length; i < l ; i++)
		{
			var script = scriptEls[i];
//			loadScript(script.getAttribute('src'));
			console.log("pushing: " + script.src);
			loadingScripts.push(script);
		}
	}
}

function afterInsert(e)
{
	console.log("afterInsert: " + loadingScripts.length + " in loadingScripts");
	loadScriptArray();
}

function loadScriptArray()
{
	console.log("loadScriptArray: " + loadingScripts.length + " left");
	var scriptEl = loadingScripts.shift();
	if (scriptEl)
	{
		console.log("loading: " + scriptEl.getAttribute('src'));
		loadScript(scriptEl.getAttribute('src'), loadScriptArray);
	}
}


// use callback if you need to do something after script loads because script is loaded asynchronously
function loadScript(filename, callback)
{
	var script = document.createElement("script");
	
	script.setAttribute("type","text/javascript");
	script.setAttribute("src", filename);

	if (callback)
	{	
		var done = false;
		script.onload = script.onreadystatechange = function()
		{
			if( !done && ( !this.readyState 
			                        || this.readyState == "loaded" 
			                        || this.readyState == "complete") )
			{
				done = true;
		
				callback();
			}
		};
	}
	
	document.getElementsByTagName("head")[0].appendChild(script);
}



})();
