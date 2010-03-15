// iUI Cache Manager Extension
//
// Requires DOMContentLoaded event
// Requires document.querySelector()
//

(function() {

var cache = window.applicationCache;

var cacheStatusStrings = { 0: 'UNCACHED', 1:'IDLE', 2:'CHECKING', 3:'DOWNLOADING', 4:'UPDATEREADY', 5:'OBSOLETE' };

var updateButton;
var swapButton;

addEventListener("DOMContentLoaded", function(event)
{
	if (cache)
	{
		cache.addEventListener('checking', cacheEventListener, false);
		cache.addEventListener('downloading', cacheEventListener, false);
		cache.addEventListener('noupdate', cacheEventListener, false);
		cache.addEventListener('updateready', cacheEventListener, false);
		cache.addEventListener('progress', cacheEventListener, false);
		cache.addEventListener('cached', cacheEventListener, false);
		cache.addEventListener('error', cacheEventListener, false);
		cache.addEventListener('obsolete', cacheEventListener, false);
	}
	var cacheView = document.getElementById('iui-cache-panel');
	cacheView.addEventListener('focus', infoPanelFocus, false);

	updateButton = document.querySelector('.iui-cache-update-button');
	updateButton.addEventListener('click', updateClicked, false);

	swapButton = document.querySelector('.iui-cache-swap-button');
	swapButton.addEventListener('click', swapClicked, false);

}, false);


function infoPanelFocus(e)
{
//	console.log("infoPanelFocus type: " + e.type + "  target " + e.target.tagName + "#" + e.target.id);
	var node = e.target;
	updateInfoPanel();
}

function updateClicked()
{
	console.log("Update button clicked.");
	if (window.applicationCache.status != 0)
	{
		window.applicationCache.update();
	}
	else
	{
		console.log("App is not cached.");
	}
	return false;
}

function swapClicked()
{
	console.log("Swap button clicked.");
	if (window.applicationCache)
	{
		if (window.applicationCache.status == 4)
		{
			window.applicationCache.swapCache();
			updateInfoPanel();
		}
		else
		{
			console.log("No update is ready.");
		}
	}
	return false;
}

function cacheEventListener()
{
	console.log("applicationCache event, status is: " + cacheStatusStrings[window.applicationCache.status]);
	updateInfoPanel();
	return true;
}

function updateInfoPanel()
{
	var onlineStatusNode = document.querySelector('.iui-online-status');
	if (onlineStatusNode)
	{
		onlineStatusNode.innerText = navigator.onLine;
	}
	var cacheStatusNode = document.querySelector('.iui-cache-status');
	if (cacheStatusNode && window.applicationCache)
	{
		cacheStatusNode.innerText = cacheStatusStrings[window.applicationCache.status];
	}
}

})();
