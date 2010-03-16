// iUI Reachability Extension
//
// Requires DOMContentLoaded event
// Requires document.querySelector()
//
//
//
(function() {

var endPoints = [];
var errFunc = null;

addEventListener("DOMContentLoaded", function(event)
{
	if (errFunc == null) 
	{
		errFunc = defErrFunc;
	}

	iui.ajaxErrHandler = errFunc;
	
//	console.log("DOMContentLoaded in iui-reachability.js");
	if (navigator.onLine == false)
	{
		console.log("Browser is offline.  Try again later");
	}
	for (var i = 0; i < endPoints.length  ; i++)
	{
//		console.log("Checking: " + endPoints[i].url);
		endPoints[i].checking = true;
		ajaxCall(endPoints[i]);
	}
	
}, false);


window.iui.reach =
{
	addURL: function(url, displayName)
	{
//		console.log("Adding: " + url);
		endPoints.push({ lastCheck: 0, checking: false, url: url, hostName: displayName });
	},
	
	setErrorHandler: function(func)
	{
		errFunc = func;
	}
};


function ajaxCall(endpoint)
{
	function reachCB(xhr)
	{
		console.log("reachCB() readyState = " + xhr.readyState);
		if (xhr.readyState == 4 || xhr.aborted)
		{
			if (xhr.status != 200)
			{
				errFunc("Host " + endpoint.hostName + " not available");
			}
		}
	}

	iui.ajax(endpoint.url, null, "GET", reachCB);
}

function defErrFunc(message)
{
	console.log("defErrFunc : " + message);
	alert(message);
}	

})();
