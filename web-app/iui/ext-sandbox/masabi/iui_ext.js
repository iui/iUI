/*
   Copyright (c) 2007-10, iUI Project Members
   See LICENSE.txt for licensing terms
 */

// requires iui.js
// requires querySelectorAll, therefore iPhone OS 2.x or later
// or Safari 3.x or later
// requires DOMContentLoaded event

/*
   Portions Copyright (c) 2009, Masabi Ltd
   http://www.masabi.com/
 */


(function() {

var TODAY="Today";
var DAYS=new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
var MONTHS=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

var nameLabelLookup = new Array();
var sesh = new Array();

// *************************************************************************************************

window.iui_ext =
{
	// replacements for HTML5 sessionStorage object, not implemented for iPhone Safari (<v4)
	setItem: function(key,value) { sesh[key] = value; },
	getItem: function(key) { return sesh[key]; },
	removeItem: function(key) { sesh[key] = null; },
	clear: function() { sesh=new Array(); },
};

addEventListener("DOMContentLoaded", function(event)
{
// Use afterinsert to injectEventMethods on inserted (via ajax) nodes
	document.body.addEventListener('afterinsert', afterInsert, false);
// This will register event handlers on all initial form nodes
	nodes = document.querySelectorAll("body > form");
	for (var i = 0; i  < nodes.length  ; i++)
	{
		injectEventMethods(nodes[i]);
	}
}, false);

function injectEventMethods(page)
{
	// avoid recursion!
	if (page.done)	return;
	page.done = true;

	// overriding methods in the prototype just didn't want to work...
	if (page.tagName=="FORM")
	{
		// preserve any explicitly defined events in markup
		page._onfocus = page.onfocus;
		page._onblur = page.onblur;
		page.onfocus = function(event)
		{
			setFormTags(page,"var");
			// swap out any special funky screen types (inputs first, because selects > inputs)
			var fields = page.getElementsByTagName("input");
			for (var i=fields.length-1; i>=0; i--)
			{
				applyFormTagValue(fields[i]);
				// if unsupported, html5 types are replaced with 'text'
				if (hasClass(fields[i],"date") && fields[i].type!="date")
					convertInputToDatePicker(fields[i]);
			}
			fields = page.getElementsByTagName("select");
			for (var i=fields.length-1; i>=0; i--)
			{
				applyFormTagValue(fields[i]);
				if (hasClass(fields[i],"panel"))
					convertSelectToPanel(fields[i]);
				else if (hasClass(fields[i],"az"))
					convertSelectToSortedList(fields[i]);
			}
			if (page._onfocus)	page._onfocus(event);
		};
		page.onblur = function(event)
		{
			storeFormTags(page,"input");
			storeFormTags(page,"select");
			if (page._onblur)	page._onblur(event);
		};
	}
}

function afterInsert(e)
{
	injectEventMethods(e.insertedNode);	// injectEventMethods on newly added node
}

function back()
{
	history.back();
}

function storeFormTags(form,tagName)
{
	var fields = form.getElementsByTagName(tagName);
	for (i=0; i<fields.length; i++)
		storeFormTagValue(fields[i]);
}

function storeFormTagValue(tag)
{
	try
	{
		if (tag.tagName=="SELECT")
			window.iui_ext.setItem(tag.name, tag.options[tag.selectedIndex].value);
		else if (tag.type=="radio")
		{
			if (tag.checked)	window.iui_ext.setItem(tag.name, tag.value);
		}
		else if (tag.type=="checkbox")
		{
			if (tag.checked)	window.iui_ext.setItem(tag.name, tag.value);
			else				window.iui_ext.removeItem(tag.name);
		}
		else
			window.iui_ext.setItem(tag.name, tag.value);
	}
	catch (e) { }
}

function setFormTags(form, tagName)
{
	var fields = form.getElementsByTagName(tagName);
	for (i=0; i<fields.length; i++)
		applyFormTagValue(fields[i]);
}

function applyFormTagValue(tag)
{
	try
	{
		var value = window.iui_ext.getItem(tag.name?tag.name:tag.title);
		if (value)
		{
			if (tag.tagName=="SELECT")
			{
				// TODO
			}
			else if (tag.tagName=="VAR")
			{
				if (hasClass(tag,"_lookup"))
				{
					// preserve class names before _lookup, but not after (and put the current value's class after)
					tag.className = tag.className.substring(0,tag.className.indexOf("_lookup")+7)+" "+value;
					var path = tag.id.split("-");
					tag.textContent = nameLabelLookup[path[0]][value];
				}
				else tag.textContent = value;
			}
			else if (tag.type=="radio")
				tag.checked = (tag.value==value);
			else if (tag.type=="checkbox")
				tag.checked = true;
			else 
				tag.value = value;
		}
		else if (tag.type=="checkbox")
			tag.checked = false;
	}
	catch (e) { alert(e); }
}


function convertSelectToSortedList(select)
{
	// note: assumes select is pre-sorted
	var caption=findLabelForTag(select);
	var name="az__"+select.id;
	var generated=addChild(document.body,"ul","az",name),n,c,o;
	generated.title=caption;
	generated.name=select.name;
	generated.addEventListener('focus',azFocus,true);
	generated.addEventListener('blur',azBlur,true);
	var nav=addChild(generated,"nav");
	
	// build name/value map of children, adding radios to the new form
	nameLabelLookup[select.name] = new Array();
	for (var i=0; i<select.options.length; i++)
	{
		o=select.options[i];
		nameLabelLookup[select.name][o.value] = o.textContent;
		n=o.textContent.charAt(0).toUpperCase();
		if (n!=c)
		{
			c=n;
			addChild(addChild(generated,"li","group"),"a",null,null,c).id=name+"_"+c;
			n=addChild(nav,"div",null,null,c);
			n.jump=name+"_"+c;
			n.addEventListener("click",azNavClick,true);
		}
		n=addChild(generated,"li",null,null,o.textContent);
		n._value=o.value;
		n.onclick=azClick;
	}
	
	// replace select with link + hidden tag
	n = select.options[select.selectedIndex].value;
	replaceField(select.parentNode,caption,select.name,n,"#"+name,select.name+"-"+select.id,nameLabelLookup[select.name][n]);
}

var azNav;

function azFocus(e)
{
	var a=this?this:e.target;
	azSelectLi(window.iui_ext.getItem(a.name),a);
	azNav=f(a,"nav");
	azNav.style.position="absolute";
	azScroll();
	document.addEventListener("scroll",azScroll,true);
}

function azBlur()
{
	document.removeEventListener("scroll",azScroll,true);
	azNav=null;
}

function azScroll()
{
    azNav.style.top=(window.pageYOffset)+"px";
}

function azNavClick(e)
{
	// we can't just use a relative # link, because that would add itself to the history
	var top=0, obj=$(e.target.jump);
	do {top += obj.offsetTop; }
	while (obj = obj.offsetParent);
	document.body.scrollTop=top;
	azScroll();
}

function azClick(e)
{
	azSelectLi(e.target._value,e.target.parentNode);
	window.iui_ext.setItem(e.target.parentNode.name, e.target._value);
	back();
}

function azSelectLi(sel,ul)
{
	if (!sel)	return;
	var lis=ul.getElementsByTagName("li");
	for (var i=0; i<lis.length; i++)
	{
		if (lis[i]._value==sel)	lis[i].className = "selected";
		else if (lis[i]._value)	lis[i].className = null;
	}
}


function convertSelectToPanel(select)
{
	// add new panel to the DOM
	var caption=findLabelForTag(select);
	var generated=addChild(document.body,"form","panel","select__"+select.id), n;
	generated.title = caption;
	// add fieldset child
	generated = addChild(generated,"fieldset","radiogroup");
	
	// build name/value map of children, adding radios to the new form
	nameLabelLookup[select.name] = new Array();
	for (var i=0; i<select.options.length; i++)
	{
		var o = select.options[i];
		nameLabelLookup[select.name][o.value] = o.textContent;
		var m = addChild(addChild(generated,"div","row"),"label",o.value,null,o.textContent)
		m.htmlFor = select.id+"_option_"+o.value;
		n = addChild(m,"input",null,select.id+"_option_"+o.value);
		n.type = "radio";
		n.value = o.value;
		n.checked = (i==select.selectedIndex);
		n.name = select.name;
		// Call to storeFormTags() added by Victor Hudson as discussed in Issue #216 
		// Is the call to storeFormTags necessary if onBlur is working properly?
		m.onclick = n.onclick = function() { (this.lastChild ? this.lastChild : this).checked=true; storeFormTags(generated,"input"); back(); return false; }; // VH  storeFormTags(generated,"input"); 
	}
	
	// replace select with link + hidden tag
	n = select.options[select.selectedIndex].value;
	replaceField(select.parentNode,caption,select.name,n,"#select__"+select.id,select.name+"-"+select.id,nameLabelLookup[select.name][n]);
}



function convertInputToDatePicker(input)
{
	// replace current field
	var cal=replaceField(input.parentNode,findLabelForTag(input),input.name,input.value,"#_datepicker",
					input.name,input.value,"date");
	cal.addEventListener('click',dpLaunch,true);
	f(cal,"input").className=input.className.replace("date","");
	
	if ($("_datepicker"))	return;
	// add date picker once
	cal = addChild(document.body,"form","panel","_datepicker");
//	cal.onfocus = function(e){ dpLaunch(e); }
	var t = addChild(cal,"p");
	addChild(t,"span","back","_dpback"," ").onclick=dpBack;
	addChild(t,"span","month","_dpmonth").onclick=dpToday;
	addChild(t,"input",null,"_dphidden").type="hidden";	// name set in dpLaunch
	addChild(t,"span","fwd","_dpfwd"," ").onclick=dpFwd;
	
	// build empty contents
	t = addChild(cal,"table",null,"_dptable");
	t.cellSpacing=0;
	t.cellPadding=0;
	t.border=0;
	t=addChild(t,"colgroup");
	addChild(t,"col","sun"); addChild(t,"col","mon");
	addChild(t,"col","tue"); addChild(t,"col","wed");
	addChild(t,"col","thu"); addChild(t,"col","fri");
	addChild(t,"col","sat");
	t=addChild(t.parentNode,"thead");
	var i;
	var tr = addChild(t,"tr","days");
	for (i=0; i<DAYS.length; i++)
		addChild(tr,"th",null,null,DAYS[i]);
	t=addChild(t.parentNode,"tbody");
	for (i=1; i<7; i++)
	{
		tr = addChild(t,"tr","wk"+i);
		for (var day=0; day<7; day++)
			addChild(tr,"td",null,null," ");
	}
}

function dpLaunch(e)
{
	var a = this?this:e.target;
	while (a && a.tagName!="A")	a=a.parentNode;
	// set up calendar before we move to it
	$("_datepicker").title = findLabelForTag(a);
	// apply some end points?
	var dp=$("_dptable"), v=f(a,"input");
	// clear selected date, so it is parsed from the hidden field in update
	dp.minDate = hasClass(v,"future") ? new Date():null;
	dp.maxDate = hasClass(v,"past") ? new Date():null;
	a=$("_dphidden");
	a.className=v.className;
	a.name=v.name;
	a.value=v.value;
	dp.date=s2d(a);
	dp.marker=new Date(dp.date);
	// now refresh
	dpUpdate();
}

function dpBack()
{
	dpUpdate(-1);
}

function dpFwd()
{
	dpUpdate(1);
}

function dpToday()
{
	$("_dptable").marker = new Date();
	dpUpdate();
}

function dpUpdate(adjust)
{
	var t = $("_dptable");
	var d = t.marker;
	// optional arg can be used to move back/forward a month
	if (adjust)
		d.setMonth(d.getMonth()+adjust);
	t.marker = d;
	// date comparisons include the time, so make sure we push min/max out to extreme ends of the day
	if (t.maxDate)	{ t.maxDate.setHours(23); t.maxDate.setMinutes(59); }
	if (t.minDate)	{ t.minDate.setHours(0); t.minDate.setMinutes(1); }
	$("_dpmonth").textContent = MONTHS[d.getMonth()]+" "+(1900+d.getYear());
	// populate days from date
	var cursor = new Date(d);
	cursor.setDate(1);
	$("_dpback").style.display = (t.minDate && t.minDate>cursor)?"none":"block";
	cursor.setDate(1-cursor.getDay());
	
	var month = d.getMonth();
	var today = new Date();
	var trs = t.getElementsByTagName("tr");
	for (var wk=1; wk<trs.length; wk++)
	{
		for (var i=0; i<7; i++)
		{
			var td = trs[wk].childNodes[i];
			if ((t.minDate && cursor<t.minDate) || (t.maxDate && cursor>t.maxDate))
			{
				td.className="outofrange";
				td.onclick=null;
				td.date=null;
				td.textContent=" ";
			}
			else
			{
				td.className = cursor.getMonth()==month?"current":"other";
				if (dpEquals(cursor,t.date))
					td.className=td.className+" selected";
				td.onclick=dpSelect;
				td.date=new Date(cursor);
				td.textContent = cursor.getDate();
			}
			if (dpEquals(cursor,today))
				td.className=td.className+" today";
			cursor.setDate(cursor.getDate()+1);
		}
	}
	$("_dpfwd").style.display = (t.maxDate && t.maxDate<cursor)?"none":"block";
}

function dpSelect()
{
	// make initial selection
	var tds = this.parentNode.parentNode.getElementsByTagName("td");
	for (var i=0; i<tds.length; i++)
	{
		if (hasClass(tds[i],"selected"))
		{
			tds[i].className = tds[i].className.replace("selected","");
			break;
		}
	}
	this.className = "selected "+this.className;
	$("_dptable").date = this.date;
	tds=$("_dphidden");
	tds.value = d2s(this.date,tds.className);
	iui_ext.setItem(tds.name,tds.value);
	back();
}

function dpEquals(a,b)
{
	return (a.getDate()==b.getDate() && a.getMonth()==b.getMonth() && a.getFullYear()==b.getFullYear());
}




function replaceField(row,caption,name,value,link,varId,varValue,varClass)
{
	while (row.hasChildNodes())
		row.removeChild(row.firstChild);
	var n = document.createElement("a");
	n.href = link;
	n.textContent = caption;
	row.appendChild(n);
	row = n;
	n = document.createElement("input");
	n.type = "hidden";
	n.name = name;
	n.value = value;
	row.appendChild(n);
	addChild(row,"var",varClass?varClass:"_lookup "+value,varId,varValue).name=name; // note: name not part of standard DOM, we're adding for convenience
	return row;
}

function addChild(parent,tagName,className,id,contents)
{
	var c = document.createElement(tagName);
	if (className)	c.className = className;
	if (id)			c.id = id;
	if (contents)	c.textContent = contents;
	parent.appendChild(c);
	return c;
}

function findLabelForTag(tag)
{
	// if parent has a label, go with it, else try any text in the parent
	var l = tag.parentNode.getElementsByTagName("label");
	if (l && l.length>0)	return l[0].textContent;
	// probably we only want the *immediate* first bit of text, rather than all text in all child tags merged together
	for (var i=0; i<tag.childNodes.length; i++)
		if (tag.childNodes[i].nodeType==3)
			return tag.childNodes[i].textContent;
	return tag.parentNode.textContent;
}


function s2d(s,format)
{
	// may just have passed in an input tag
	if (!format && s.value)
	{
		format=s.className;
		s=s.value;
	}
	var d=new Date();
	if (eqic(s,TODAY))	return d;
	format=dfGetFormat(format);
	s=s.replace(/[_\/\-]/g," ").split(" ");
	var j=0;
	for (var i=0; i<format.length&&j<s.length; i++)
	{
		if (s.length>0 && s[j].charAt(s.length-1)==',')
			s[j]=s[j].substring(0,s[j].length-1);
		switch (format.charAt(i))
		{
		case 'd':
			d.setDate(pInt(s[j++]));
			break;
		case 'D':
			j++;
			break;
		case 'm':
			d.setMonth(pInt(s[j++])-1);
			break;
		case 'M':
			{
				var n=0;
				for (var m=0;m<MONTHS.length;m++)
				{
					if (eqic(s[j],MONTHS[m].substring(0,3)))
					{
						n=m;
						break;
					}
				}
				d.setMonth(n);
				j++;
			}
			break;
		case 'y':
		case 'Y':
			d.setYear((pInt(s[j++])%100)+2000);	// safe for a few years :)
			break;
		}
	}
	return d;
}


function d2s(d,format)
{
	if (hasClass(format,"today") && dpEquals(d,new Date()))	return TODAY;
	format=dfGetFormat(format);
	var s="";
	for (var i=0; i<format.length; i++)
	{
		switch (format.charAt(i))
		{
		case 'd':
			s+=d.getDate();
			break;
		case 'D':
			s+=DAYS[d.getDay()];
			break;
		case 'm':
			s+=(d.getMonth()+1);
			break;
		case 'M':
			s+=MONTHS[d.getMonth()].substring(0,3);
			break;
		case 'y':
			s+=(""+d.getFullYear()).substring(2);
			break;
		case 'Y':
			s+=d.getFullYear();
			break;
		case 'c': s+=','; break;
		case '-': s+='-'; break;
		case '_': s+=' '; break;
		case '/': s+='/'; break;
		}
	}
	return s;
}

function dfGetFormat(classList)
{
	var c=classList.split(" ");
	for (var i=0; i<c.length; i++)
		if (c[i].indexOf("/")>-1 || c[i].indexOf("_")>-1 || c[i].indexOf("-")>-1)
			return c[i];
	return "D_d_Mc_y";
}



function pInt(s)
{
	// on Safari, parseInt("09") returns 0.  right.
	while (s.charAt(0)=='0' || s.charAt(0)==' ')	s=s.substring(1);
	return parseInt(s);
}

function eqic(a,b)
{
	return (new String(a.toLowerCase())==(new String(b)).toLowerCase());
}

function $(i) { return document.getElementById(i); }
function f(e,t) { return e.getElementsByTagName(t)[0]; }
function hasClass(t,c) { return (" "+(t.className?t.className:t)+" ").indexOf(" "+c+" ")>-1; }
})();
