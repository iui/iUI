var myView = {
	onload: function(e) {
		window.logEvent(e);
	},
	onunload: function(e) {
		window.logEvent(e);
	},
	onfocus: function(e) {
		window.logEvent(e);
	},
	onblur: function(e) {
		window.logEvent(e);
	},
	onbeforetransition: function(e) {
		window.logEvent(e);
	},
	onaftertransition: function(e) {
		window.logEvent(e);
	},
	
}

//
// The following lines allow you to attach myView to either
//   1) All views
//   2) All views having class 'panel'
//   3) The view having the id 'main'
//
// Comment or uncomment the lines to test/demonstrate the different
// behaviors
//
//window.iui.views.global = myView;
window.iui.views.byClass['panel'] = myView;
//window.iui.views.byID['main'] = myView;


function logEvent(e)
{
	console.log("logEvent type: " + e.type + "  target " + e.target.tagName + "#" + e.target.id);
	if (e.type == "beforetransition" || e.type == "aftertransition")
	{
		console.log("  out trans = " + e.out);
	}
	else if (e.type == "beforeinsert") {
		console.log("  fragment = " + e.fragment);
	}
	else if (e.type == "afterinsert") {
		console.log("  node = " + e.insertedNode);
	}
}
