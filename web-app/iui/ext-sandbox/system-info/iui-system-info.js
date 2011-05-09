/*
   Copyright (c) 2007-9, iUI Project Members
   See LICENSE.txt for licensing terms
   ************
   LAST UDPATE: May 9th, 2011 - remi.grumeau@gmail.com
   ************
*/

iui.sysinfo = {

	ua : navigator.userAgent.toLowerCase(),
	os: new Object,
	device: new Object,
	browser: new Object,
	screen: new Object,
	storage: new Object,
	webkit: new Object,

	osInfo : function()
	{
		if(iui.sysinfo.ua.match('iphone') || iui.sysinfo.ua.match('ipod') || iui.sysinfo.ua.match('ipad')) {
			iui.sysinfo.os.name	= 'ios';
			iui.sysinfo.os.version = (/((\d+_){1,3}(\d+))/.test(iui.sysinfo.ua))?new String(RegExp.$1.replace('_','.')):'unknow';
		}
		else if(iui.sysinfo.ua.match('android')) {
			iui.sysinfo.os.name	= 'android';
			iui.sysinfo.os.version	= (/android ((\d+.){1,3}(\d+))/.test(iui.sysinfo.ua))?new String(RegExp.$1):'unknow';
		}
		else if(iui.sysinfo.ua.match('blackberry') || iui.sysinfo.ua.match('playbook')) {
			iui.sysinfo.os.name	= (iui.sysinfo.ua.match('playbook'))?'playbook':'blackberry';
			
			if(/version\/((\d+.){1,2}(\d+))/.test(iui.sysinfo.ua))
				iui.sysinfo.os.version = new String(RegExp.$1);
			else if(/\/((\d+.){1,2}(\d+))/.test(iui.sysinfo.ua))
				iui.sysinfo.os.version = new String(RegExp.$1);
			else
				iui.sysinfo.os.version = 'unknow';
		}
		else if(iui.sysinfo.ua.match('maemo')) {
			iui.sysinfo.os.name	= 'maemo';
			iui.sysinfo.os.version = (/((\d+.){2,3}(\d+))/.test(iui.sysinfo.ua))?new String(RegExp.$1):'unknow';
		}
		else if(iui.sysinfo.ua.match('webos')) {
			iui.sysinfo.os.name	= 'webos';
			iui.sysinfo.os.version = (/webos\/((\d+.){1,3})/.test(iui.sysinfo.ua))?new String(RegExp.$1):'unknow';
		}
		else if(iui.sysinfo.ua.match('bada')) {
			iui.sysinfo.os.name	= 'bada';
			iui.sysinfo.os.version = (/bada\/((\d+.){1}(\d+))/.test(iui.sysinfo.ua))?new String(RegExp.$1):'unknow';
		}
		else if(iui.sysinfo.ua.match('mac os x')) {
			iui.sysinfo.os.name	= 'macos';
			iui.sysinfo.os.version = (/((\d+_){1,3}(\d+))/.test(iui.sysinfo.ua))?new String(RegExp.$1.replace('_','.')):'unknow';
		}
		else if(iui.sysinfo.ua.match('windows')) {
			iui.sysinfo.os.name	= (iui.sysinfo.ua.match('windows phone'))?'windows_phone':'windows';
	
			if(/iemobile\/((\d+.){1,2}(\d+))/.test(iui.sysinfo.ua))
				iui.sysinfo.os.version = new String(RegExp.$1);
			else if(iui.sysinfo.ua.match('nt 5.1'))
				iui.sysinfo.os.version	= 'xp';
			else if(iui.sysinfo.ua.match('nt 5.2'))
				iui.sysinfo.os.version	= '2003';
			else if(iui.sysinfo.ua.match('nt 6.0'))
				iui.sysinfo.os.version	= 'vista';
			else if(iui.sysinfo.ua.match('nt 6.1'))
				iui.sysinfo.os.version	= 'seven';
		}
		else
		{
			iui.sysinfo.os.name	= 'unknow';
			iui.sysinfo.os.version	= 'unknow';
		}
		iui.sysinfo.os.lang	= (navigator.language)?navigator.language.substr(0,2):navigator.systemLanguage.substr(0,2);
	},

	deviceInfo: function() 
	{
		iui.sysinfo.device.touch = (typeof Touch == "object")?'true':'false';
		
		if(iui.sysinfo.ua.match('iphone')) {
			iui.sysinfo.device.vendor 		= 'apple';
			iui.sysinfo.device.type 		= 'phone';		
		}
		else if(iui.sysinfo.ua.match('ipod')) {
			iui.sysinfo.device.vendor 		= 'apple';
			iui.sysinfo.device.type 		= 'pod';
		}
		else if(iui.sysinfo.ua.match('ipad')) {
			iui.sysinfo.device.vendor 		= 'apple';
			iui.sysinfo.device.type 		= 'tablet';
		}
		else if(iui.sysinfo.ua.match('android')) {
	
			if(iui.sysinfo.ua.match('htc'))
				iui.sysinfo.device.vendor 	= 'htc';
			else if(iui.sysinfo.ua.match('sgh') || iui.sysinfo.ua.match('samsung'))
				iui.sysinfo.device.vendor 	= 'samsung';
			else if(iui.sysinfo.ua.match('google'))
				iui.sysinfo.device.vendor 	= 'google';
			else if(iui.sysinfo.ua.match('motorola'))
				iui.sysinfo.device.vendor 	= 'motorola';
			else if(iui.sysinfo.ua.match('nokia'))
				iui.sysinfo.device.vendor 	= 'nokia';
			else
				iui.sysinfo.device.vendor	= 'unknow';
	
			iui.sysinfo.device.type = (iui.sysinfo.ua.match('tablet'))?'tablet':'phone';
		}
		else if(iui.sysinfo.ua.match('blackberry')) {
			iui.sysinfo.device.vendor 		= 'rim';
			iui.sysinfo.device.type 		= 'phone';		
		}
		else if(iui.sysinfo.ua.match('playbook')) {
			iui.sysinfo.device.vendor 		= 'rim';
			iui.sysinfo.device.type 		= 'tablet';		
		}
		else if(iui.sysinfo.ua.match('bada')) {
			iui.sysinfo.device.vendor 		= 'samsung';
			iui.sysinfo.device.type 		= 'phone';		
		}
		else if(iui.sysinfo.ua.match('macintosh')) {
			iui.sysinfo.device.vendor 		= 'apple';
			iui.sysinfo.device.type 		= 'desktop';	
		}
		else
		{
			iui.sysinfo.device.vendor 	= 'unknow';
			iui.sysinfo.device.type 	= 'desktop';
		}
		iui.sysinfo.device.gps = (typeof navigator.geolocation=='object')?'true':'false';
		iui.sysinfo.device.orientation = (typeof window.onorientationchange == "object")?'true':'false';
	},

	browserInfo : function() 
	{
		iui.sysinfo.browser.webapp = ("standalone" in window.navigator)?'true':'false';

		if(iui.sysinfo.ua.match('chrome')) 
		{
			iui.sysinfo.browser.name = 'chrome';
			iui.sysinfo.browser.engine = 'webkit';
			iui.sysinfo.browser.version	= (/version\/((\d+.){1,3}(\d+))/.test(iui.sysinfo.ua))?new String(RegExp.$1):'unknow';
		}
		else if( iui.sysinfo.ua.match('iphone') || iui.sysinfo.ua.match('ipod') || iui.sysinfo.ua.match('ipad') )
		{
			iui.sysinfo.browser.name = 'safari';
			iui.sysinfo.browser.engine = 'webkit';
			iui.sysinfo.browser.version	= (/version\/((\d+.){1,3}(\d+))/.test(iui.sysinfo.ua))?new String(RegExp.$1):'unknow';
		}
		else if( iui.sysinfo.ua.match('blackberry') || iui.sysinfo.ua.match('playbook') ) {
			iui.sysinfo.browser.name = 'blackberry';
			iui.sysinfo.browser.engine = 'webkit';
			if(/version\/((\d+.){1,2}(\d+))/.test(iui.sysinfo.ua))
				iui.sysinfo.browser.version = new String(RegExp.$1);
			else if(/\/((\d+.){1,2}(\d+))/.test(iui.sysinfo.ua))
				iui.sysinfo.browser.version = new String(RegExp.$1);
			else
				iui.sysinfo.browser.version = 'unknow';
		}
		else if(iui.sysinfo.ua.match('bada')) {
			iui.sysinfo.browser.name = 'dolfin';
			iui.sysinfo.browser.engine = 'webkit';
			iui.sysinfo.browser.version = (/dolfin\/((\d+.){1,3})/.test(iui.sysinfo.ua))?new String(RegExp.$1):'unknow';
		}
		else if(iui.sysinfo.ua.match('firefox') || iui.sysinfo.ua.match('fennec')) {
			iui.sysinfo.browser.name = (iui.sysinfo.ua.match('fennec'))?'fennec':'firefox';
			iui.sysinfo.browser.engine = 'gecko';
			iui.sysinfo.browser.version	= (/firefox\/((\d+.){1,3}(\d+))/.test(iui.sysinfo.ua))?new String(RegExp.$1):'unknow';
		}
		else if(iui.sysinfo.ua.match('opera')) {
			iui.sysinfo.browser.name = (iui.sysinfo.ua.match('mobi'))?'opera_mobile':'opera';
			iui.sysinfo.browser.engine = 'presto';
			iui.sysinfo.browser.version	= (/version\/((\d+.){1,3})/.test(iui.sysinfo.ua))?new String(RegExp.$1):'unknow';
		}
		else if(iui.sysinfo.ua.match('msie')) {
			iui.sysinfo.browser.name = 'ie';
			iui.sysinfo.browser.engine = 'trident';
			iui.sysinfo.browser.version	= (/msie ((\d+.){1,3}(\d+))/.test(iui.sysinfo.ua))?new String(RegExp.$1):'unknow';
		}
		else
		{
			iui.sysinfo.browser.name = window.navigator.appName;
			iui.sysinfo.browser.engine = 'unknow';
			iui.sysinfo.browser.version = window.navigator.appVersion;
		}
	
		iui.sysinfo.browser.standalone = (("standalone" in window.navigator) && !window.navigator.standalone)?'false':'true';
	
	},

	screenInfo: function()
	{
		iui.sysinfo.screen.width = window.innerWidth;
		iui.sysinfo.screen.height = window.innerHeight;
	},

	storageInfo: function()
	{
		iui.sysinfo.storage.cookie = navigator.cookieEnabled;
		iui.sysinfo.storage.session = (typeof window.sessionStorage  == "object");
		iui.sysinfo.storage.local = (typeof window.localStorage == "object");
		iui.sysinfo.storage.database = (typeof window.openDatabase == "function");
	},

	webkitInfo : function()
	{
		iui.sysinfo.webkit.transition = (typeof WebKitTransitionEvent == "object");
		iui.sysinfo.webkit.point = (typeof WebKitPoint == "object");
		iui.sysinfo.webkit.transform = (typeof WebKitCSSTransformValue == "object");
		iui.sysinfo.webkit.matrix = (typeof WebKitCSSMatrix == "object");
	},
	
	init : function() 
	{
		iui.sysinfo.osInfo();
		iui.sysinfo.deviceInfo();
		iui.sysinfo.browserInfo();
		iui.sysinfo.screenInfo();
		iui.sysinfo.storageInfo();
		iui.sysinfo.webkitInfo();
	}
	
}