/*
	iUI Theme Switcher
	Copyright (c) 2007-2012, iUI Project Members
	See LICENSE.txt for licensing terms
 */

iui.ts = {
	basePath: "/iui/",			/* Path to directory containing iui.css */
	// theme map id->{namepath (path is relative to iui.css)
	themes: {	"default":		{name:"Default", path:"t/default/default-theme.css"}, 
				defaultgrad:	{name:"Default w/Gradients", path:"t/defaultgrad/defaultgrad-theme.css"},
				defaulthd:		{name:"Default w/HD support", path:"ext-sandbox/t/defaulthd/defaulthd-theme.css"},
				ipdc:			{name:"iOSDevCamp", path:"t/ipdc/ipdc-theme.css"},
				android:		{name:"Android", path:"ext-sandbox/t/android/android-theme.css"},
				webos:			{name:"WebOS", path:"ext-sandbox/t/webos/webos-theme.css"}
			},

	themeSelect: function(select)
	{
		var newThemeID = select.options[select.selectedIndex].value;
		iui.ts.setTheme(newThemeID);
		return false;
	},
	
	setTheme: function(themeID)
	{
		var linkEl = document.getElementById("iui-theme");
		linkEl.setAttribute('href', this.basePath + iui.ts.themes[themeID].path);
	}
};