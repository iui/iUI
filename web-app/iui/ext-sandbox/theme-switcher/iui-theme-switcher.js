/*
   Copyright (c) 2007-9, iUI Project Members
   See LICENSE.txt for licensing terms
   ************
   LAST UDPATE: Oct 30th, 2010 - remi.grumeau@gmail.com
   ************
*/

iui.ts = {
	
	defaultTheme: null,
	currentTheme: null,
	themes: new Array(),
	
	init: function() 
	{
		var i, a, main, c;
		for(i=0; (a = document.getElementsByTagName("link")[i]); i++)
		{
			if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title"))
			{
				iui.ts.themes.push(a.getAttribute("title"));
				if (a.getAttribute("rel").indexOf("alternate"))
				{
					iui.ts.defaultTheme = a.getAttribute("title");
					iui.ts.currentTheme = iui.ts.defaultTheme;
				}
			}
		}
		if(c = document.cookie.split("iui-theme=")[1]) iui.ts.setTheme(c.split(';')[0]);
	},

	setTheme: function(title)
	{
		if(title!=iui.ts.currentTheme)
		{
			var i, a, main;
			for(i=0; (a = document.getElementsByTagName("link")[i]); i++)
			{
				if(a.getAttribute("rel").indexOf("style") != -1
				&& a.getAttribute("title"))
				{
					a.disabled = true;
					if(a.getAttribute("title") == title) a.disabled = false;
				}
			}
			iui.ts.currentTheme=title;
		}
	},
	
	setDefaultTheme: function()
	{
		iui.ts.setTheme(iui.ts.defaultTheme);
	},
	
	rememberTheme : function(d)
	{
		// If d is set to false, cookie will be deleted
		var tsDate=new Date();
		(d==false)?tsDate = new Date(1):tsDate.setDate(new Date()+365);
		document.cookie = "iui-theme="+escape(iui.ts.currentTheme)+";expires="+tsDate.toUTCString();
	},
	
	addTheme: function(title,link)
	{
		var theme = document.createElement("link");
		theme.type = "text/css";
		theme.title = title;
		theme.rel = "stylesheet alternate";
		theme.href = link;
		document.getElementsByTagName('head')[0].appendChild(theme);
		theme.onload = iui.ts.themes.push(title);
	},

	removeTheme: function(title)
	{
		var i, a, main;
		for(i=0; (a = document.getElementsByTagName("link")[i]); i++)
		{
			if(a.getAttribute("rel").indexOf("style") != -1
			&& a.getAttribute("title"))
			{
				if(a.getAttribute("title") == title) {
					iui.ts.themes.splice(title);
					document.getElementsByTagName('head')[0].removeChild(a);
				}
			}
		}
	}
};
iui.ts.init();