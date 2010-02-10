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
// beforeInsert finds <script> elements and adds them to loadingScripts[];
// afterInsertEnd asynchronously loads scripts one at a time - the onload callback for
//     script n starts the load of script n+1
//
// Caveats:
//   1) Hardly any testing
//   2) Assumes type="text/javascript"
//   3) Code in script.innerText is run each time that fragment is inserted/replaced
//
// Todo:
//   1) Support for loading CSS stylesheets (or should that be a separate extension
///

(function() {

var loadedScripts = {};

addEventListener("load", function(event)
{
	document.body.addEventListener('beforeinsert', beforeInsert, false);
	document.body.addEventListener('afterinsertend', afterInsertEnd, false);
}, false);

var loading = false;
var loadingScripts = [];

function beforeInsert(e)
{
//	console.log("beforeInsert: " + loadingScripts.length + " in loadingScripts");
	var node = e.fragment;
	if (node.tagName == 'SCRIPT')
	{
		addScript(node);
	}
	else
	{
		var scriptEls = node.getElementsByTagName('SCRIPT');
		for (var i = 0, l = scriptEls.length; i < l ; i++)
		{
			var script = scriptEls[i];
			addScript(script);
		}
	}
	loading = false;
}

function afterInsertEnd(e)
{
//	console.log("afterInsert: " + loadingScripts.length + " in loadingScripts");
	if (!loading && (loadingScripts.length > 0))
	{
		loading = true;
		loadScriptArray();
	}
}

function addScript(el)
{
	var filename = el.getAttribute('src');
	if (filename && !loadedScripts[filename])
	{
		console.log("pushing: " + el.getAttribute('src'));
		loadingScripts.push(el);
	}
	else if (filename)
	{
		console.log(el.getAttribute('src') + " already loaded");
	}
	else
	{
		// for now, script innerText can be run multiple times
		loadingScripts.push(el);
	}
}

function loadScriptArray()
{
//	console.log("loadScriptArray: " + loadingScripts.length + " left");
	var scriptEl = loadingScripts.shift();
	if (scriptEl)
	{
		var filename = scriptEl.getAttribute('src');
		if (filename)
		{
			console.log("loading: " + scriptEl.getAttribute('src'));
			loadScript(filename, loadScriptArray);
		}
		else
		{
			console.log("evaluating: " + scriptEl);
			window.eval(scriptEl.innerText);	
			loadScriptArray();
		}
	}
}


// use callback if you need to do something after script loads because script is loaded asynchronously
function loadScript(filename, callback)
{
	var script = document.createElement("script");
	
	script.setAttribute("type","text/javascript");
	script.setAttribute("src", filename);

	if (true)  // previously was if (callback)
	{	
		var done = false;
		script.onload = script.onreadystatechange = function()
		{
			console.log("readyState is " + this.readyState);
			if( !done && ( !this.readyState 
			                        || this.readyState == "loaded" 
			                        || this.readyState == "complete") )
			{
				done = true;
				loadedScripts[filename] = true;
		
				if (callback)
				{
					callback();
				}
			}
		};
	}
	
	document.getElementsByTagName("head")[0].appendChild(script);
}



})();
