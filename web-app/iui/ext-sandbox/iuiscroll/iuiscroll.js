/*
   Copyright (c) 2007-9, iUI Project Members
   See LICENSE.txt for licensing terms
   ************
   LAST UDPATE: May 3rd 2011 - remi.grumeau@gmail.com
   ************
*/

iui.iScroll = {

	myScroll : '',

	setHeight : function(pageId) 
	{
		if(typeof pageId!='string')
		{
			var pageId = iui.getSelectedPage();
			pageId = pageId.id;
		}
		
		console.log('set iscroll height for: '+pageId);
	
		if(document.getElementById(pageId+'_scroller'))
		{
			/* toolbar height can change from theme to theme */
			var toolbarHeight = document.getElementsByClassName('toolbar')[0].clientHeight;
			/* footer height can change */
			var footerHeight = (document.getElementById(pageId+'_footer'))?document.getElementById(pageId+'_footer').clientHeight:0;
			/* set wrapper height */
			var wrapperH = window.innerHeight - (toolbarHeight+footerHeight);
			/* update padding, margin & height to fit in the screen */
			document.getElementById(pageId).style.paddingTop = '0px';
			document.getElementById(pageId).style.height = document.getElementById(pageId).style.height + toolbarHeight;
			document.getElementById(pageId+'_scroller').parentNode.style.height = (wrapperH+toolbarHeight) + 'px';
			document.getElementById(pageId+'_scroller').parentNode.style.minHeight = (wrapperH+toolbarHeight) + 'px';
			document.getElementById(pageId+'_scroller').style.paddingTop = toolbarHeight + 'px';
			console.log('set iscroll height to: '+wrapperH+'px');
		}
	},

	activeScroller : function() 
	{
		var screens = document.getElementsByClassName('iuiscroll');
		for (var i = 0; i <= (screens.length-1); i++) {
			if ((screens[i].id != '') && (screens[i].title != undefined) && (typeof screens[i] === 'object')) 
			{
				if(document.getElementById(screens[i].id+'_scroller'))
				{
					console.log('set iscroll for: '+screens[i].id);
					screens[i].addEventListener('aftertransition', function() 
					{
						iui.iScroll.setHeight(this.id);
						if(iui.iScroll.myScroll) iui.iScroll.myScroll.destroy();
						iui.iScroll.myScroll = new iScroll(this.id+'_scroller', {desktopCompatibility:true});
						iui.iScroll.myScroll.scrollBarY.bar.style.top = document.getElementsByClassName('toolbar')[0].clientHeight+'px';
						console.log('activate iscroll for: '+this.id);
					}, false);
				}
			}
		}
	}
}


window.onload = function() 
{
	iui.iScroll.activeScroller();
	document.body.addEventListener('afterinsert', iui.iScroll.activeScroller, false);
};

window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', iui.iScroll.setHeight, false);
