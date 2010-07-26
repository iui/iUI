/*
   Copyright (c) 2010, iUI Project Members
   See LICENSE.txt for licensing terms
   
   (derived from Apple Sample code)
 */

function addVideoLoggers(vid) 
{
    /* add logVideoEvent for all events for HTML5 media element events */  
    vid.addEventListener('loadstart', function(evt) { logVideoEvent(evt,'#000099'); }, false);  
    vid.addEventListener('canplaythrough',function(evt) {  logVideoEvent(evt,'#66CC33'); }, false);
    vid.addEventListener('canplay', function(evt) { logVideoEvent(evt,'#66CC33'); }, false);
    vid.addEventListener('loadeddata', function(evt) { logVideoEvent(evt,'#00CCCC'); }, false); 
    vid.addEventListener('loadedmetadata', function(evt) { logVideoEvent(evt,'#00CCCC'); }, false);
          
    vid.addEventListener('abort', function(evt) { logVideoEvent(evt,'red'); }, false);
    vid.addEventListener('emptied', function(evt) { logVideoEvent(evt,'red'); }, false);
    vid.addEventListener('error', function(evt) { logVideoEvent(evt,'red'); }, false);
    vid.addEventListener('stalled', function(evt) { logVideoEvent(evt,'red'); }, false);
    vid.addEventListener('suspend', function(evt) { logVideoEvent(evt,'red'); }, false);
    vid.addEventListener('waiting', function(evt) { logVideoEvent(evt,'red'); }, false);

    vid.addEventListener('pause', function(evt) { logVideoEvent(evt,'orange'); }, false);
    vid.addEventListener('play', function(evt) { logVideoEvent(evt,'orange'); }, false);
    vid.addEventListener('volumechange', function(evt) { logVideoEvent(evt,'orange'); }, false);

    vid.addEventListener('playing', function(evt) { logVideoEvent(evt,'purple'); }, false);

    vid.addEventListener('seeked', function(evt) { logVideoEvent(evt,'teal'); }, false);    
    vid.addEventListener('seeking', function(evt) { logVideoEvent(evt,'teal'); }, false);    

    vid.addEventListener('durationchange', function(evt) { logVideoEvent(evt,'#cc0066'); }, false);
    vid.addEventListener('progress', function(evt) { logVideoEvent(evt,'#cc0066'); }, false);   
    vid.addEventListener('ratechange', function(evt) { logVideoEvent(evt,'#cc0066'); }, false);   

    vid.addEventListener('timeupdate', function(evt) { /* logVideoEvent(evt,'gray'); */ }, false);

    vid.addEventListener('ended', function(evt) { logVideoEvent(evt,'#000099'); }, false); 
}


function logVideoEvent(evt, color) 
{
	console.log(evt.type);
	if (evt.type == 'abort' || evt.type == 'error')
	{
		failed(evt);
	}
}

function failed(e) {
   // video playback failed - show a message saying why
   if (e.target.error == null || typeof e.target.error != 'object')
   {
   		console.log("error is not an object");
   }
   else
   {
	   switch (e.target.error.code) {
		 case e.target.error.MEDIA_ERR_ABORTED:
		   console.log('You aborted the video playback.');
		   break;
		 case e.target.error.MEDIA_ERR_NETWORK:
		   console.log('A network error caused the video download to fail part-way.');
		   break;
		 case e.target.error.MEDIA_ERR_DECODE:
		   console.log('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
		   break;
		 case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
		   alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
		   console.log;
		 default:
		   console.log('An unknown error occurred.');
		   break;
   		}
   }
 }