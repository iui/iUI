/*
   Copyright (c) 2010, iUI Project Members
   See LICENSE.txt for licensing terms
 */

// requires querySelectorAll, therefore iPhone OS 2.x or later
// or Safari 3.x or later

(function() {

var vidEventLogging = true;
var waitForPlayThrough = false;

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

	if (false)
	{
		// Code to install listeners for video tags already in the document
		// We dont' want to do this (without other changes)
		// because videos will start playing even
		// when they are not shown
		var vnodes = document.querySelectorAll("video");
		for (var i = 0; i  < vnodes.length  ; i++)
		{
			var vid = vnodes[i];
			if (!vid.listenersInstalled)
			{
				console.log("installing videoListeners");
				addVideoListeners(vid);
				vid.listenersInstalled = true;
			}
		}
	}
	
}, false);

function registerAllEvents(node)
{
	node.addEventListener('aftertransition', afterTrans, false);
	node.addEventListener('blur', onBlur, false);
//	node.addEventListener('beforetransition', beforeTrans, false);
}

function afterInsert(e)
{
	registerAllEvents(e.insertedNode);	// Set event handlers on newly added node
}

function afterTrans(e)
{
	if (!e.out)
	{
		console.log("afterTransition-in: " + e.target);
		var vid = e.target.querySelector("video");
		var aNode = e.target.querySelector("a[rel='iuiposter']");
		if (!vid)
		{
			console.log("no vid found")
			var aNode = e.target.querySelector("a[rel='iuiposter']");
			if (aNode)
			{
				console.log("iuiposter found, creating vid");
				var img = aNode.querySelector("img");
				var vid = document.createElement("video");
				vid.src = aNode.href;
	//			vid.loop = true;
				vid.width = img.width;
				vid.height = img.height;
				vid.poster = img.src;
				iui.addClass(vid, 'video-out');
				aNode.parentNode.insertBefore(vid, aNode); //aNode);
			}
		}
		if (aNode)
		{
			iui.addClass(aNode, 'poster-out');
		}
		if (vid)
		{
			if (!vid.listenersInstalled)
			{
				console.log("installing videoListeners");
				addVideoListeners(vid);
				vid.listenersInstalled = true;
			}
			setTimeout(startLoad, 0, vid);
		}

	}
}

function onBlur(e)
{
	var vid = e.target.querySelector("video");
	if (vid)
	{
		console.log("onBlur of video div");
		vid.pause();			
		iui.addClass(vid, 'video-out');
		var aNode = e.target.querySelector("a[rel='iuiposter']");
		if (aNode)
		{
			//aNode.style.visibility = 'visible';
			//vid.style.visibility = 'hidden';
			iui.removeClass(aNode, 'poster-out');
		}
	}
}

function beforeTrans(e)
{
	if (e.out)
	{
		var vid = e.target.querySelector("video");
		if (vid)
		{
			console.log("beforeTrans of video div");
			vid.pause();			
			iui.addClass(vid, 'video-out');
			var aNode = e.target.querySelector("a[rel='iuiposter']");
			if (aNode)
			{
				//aNode.style.visibility = 'visible';
				//vid.style.visibility = 'hidden';
				iui.removeClass(aNode, 'poster-out');
			}
		}
	}
}

function startLoad(vid)
{
	console.log("readyState  is: " + vid.readyState);
	console.log("networkState  is: " + vid.networkState);
	console.log("startLoad()");
	iui.removeClass(vid, 'video-out');
	vid.load();	
	console.log("readyState  is: " + vid.readyState);
	console.log("networkState  is: " + vid.networkState);
}

function onReadyToPlay(evt)
{
	console.log("onReadyToPlay()");
	evt.target.play();
}

function onPlaying(evt)
{
	console.log("onPlaying()");
	var vid = evt.target;
	var posterElem = vid.parentNode.querySelector("a[rel='iuiposter']");
	posterOut(posterElem);
}

function posterOut(posterElem)
{
  var remove1 = function() {
    // reset classname so that
    // it can be applied again animations are only
    // triggered when classnames are first applied
//    posterElem.className = 'poster-out';
	iui.removeClass(posterElem, 'poster-anim-out');
	iui.addClass(posterElem, 'poster-out');
    // remove this listener because webkitAnimationEnd
    // is triggered every time ANY animation ends on theDiv
    posterElem.removeEventListener('webkitAnimationEnd', remove1);
  };
  // listen for animation end
  posterElem.addEventListener('webkitAnimationEnd', remove1, false);
  /// FINALLY, start the animation animation
//  posterElem.className = 'poster-anim-out';
	iui.addClass(posterElem, 'poster-anim-out');
}

function addVideoListeners(vid) 
{
//    vid.addEventListener('pause', function(evt) { onPause(); }, false);
    vid.addEventListener('playing', function(evt) { onPlaying(evt); }, false);
    if (waitForPlayThrough)
    {
		vid.addEventListener('canplaythrough', function(evt) { onReadyToPlay(evt); }, false);
    }
    else
    {
		vid.addEventListener('canplay', function(evt) { onReadyToPlay(evt); }, false);
    }
    if (vidEventLogging)
    {
    	// Make sure to include iui-video-logger.js if you enable this setting
    	addVideoLoggers(vid);
    }
}


})();
