/*
   Copyright (c) 2007-9, iUI Project Members
   See LICENSE.txt for licensing terms
 */

// requires querySelectorAll, therefore iPhone OS 2.x or later
// or Safari 3.x or later


(function() {
		  

var eventNames = ['blur', 'focus'/*, 'load', 'unload', 'beforetransition', 'aftertransition' */];

// Using DOMContentLoaded so this loads before the onload in iui.js -- need a better method
// We need to register before iui's main onload handler so we can get the 'load' and 'focus' events
// for the default 'page' (view).
//

addEventListener("DOMContentLoaded", function(event)
{
	document.body.addEventListener('beforeinsert', registerTbBModEvents, false);
	document.body.addEventListener('afterinsert', afterInsert, false);
// This will register event handlers on all initial nodes
// We'll also need to register handlers on inserted (via ajax) nodes
// To do that we'll need to use the beforeInsert event
	nodes = document.querySelectorAll("ul, div, form");		// select all of the usual page containers	
	for (var i = 0; i  < nodes.length  ; i++){				// loop through them
		registerTbBModEvents(nodes[i]);						// adding event listener
		
	}
}, false);

function registerTbBModEvents(node){						// add TbBMod event listener to page containers
	for (var i = 0; i  < eventNames.length  ; i++){
		node.addEventListener(eventNames[i], TbBModHandler, false);
	}
}

function afterInsert(e){
	//TbBModHandler(e);
	registerTbBModEvents(e.insertedNode);					// Set event handlers on newly added node
}

////////////////////////////////////////////////////////////// Variables used for mustiple functions
var TbBModForm;												// The form with TbBMods in it
var theMods = [];											// array(stack)to save TbBMods in so we can restore later
var labels = [];											// array(stack)to save the original button labels so we can restore later
var urls = [];												// array(stack)to save the origanl button links so we can restore later

////////////////////////////////////////////////////////////// TbBModHandler(e)
function TbBModHandler(e){									// function called on page focus and blur to mod buttons
	if (e.type == "focus"){ 								// focus event - look in page for TbBMods
		var page = e.target;								// assign event target page to variable
		if (page.tagName == "FORM" && hasTbBMod(page)){		// page is a form and has TbBMods
			doTbBMods();									// take care of TbBMods in form
		} else if (hasForm(page) && checkForms(page))		// page has a form and has TbBMods
			doTbBMods();									// take care of TbBMods in form
	} else if (e.type == "blur"){							// blur event -  reset TbBMods before leaving 
		undoTbBMods();										// undo buttons modded before leaving page
	}
}
////////////////////////////////////////////////////////////// doTbBMods()
function doTbBMods(){										// take care of TbBMods in form
	inputs = T(TbBModForm,"input")				;			// get form inputs
	for (var k = 0; k < inputs.length; k++){				// loop through inputs
		if (inputs[k].name.substr(0,6) == "TbBMod"){		// check id for TbBMod and save in array if found
			theMods.push(inputs[k].name);					// save mods so we can undo them on page blur
			buttonId = inputs[k].name.substr(11);			// the id of the button to mod
			mod = inputs[k].name.substr(6,4);				// the mod  operation to perform	
			button = $(buttonId);							// the actual button we're going to mod
			if (button){									// make sure the button exists before we operate on it
				if (mod == "HIDE")							// need to hide the button
					hideButton(button);						// hide the button
				else if (mod == "TEXT"){					// need to change the label on button
					label = inputs[k].value					// get the new label from form input
					labels.push(button.innerHTML);			// save original button label to restore later
					changeLabel(button , label);			// change the button label
				} else if (mod == "HREF"){					// need to change the link address for button
					newLink = inputs[k].value;				// get the new link from form input
					urls.push(button.href);					// save original button link to restore later
					changeLink(button , newLink);			// change the button link
				}
			}
		}
	}
}
////////////////////////////////////////////////////////////// undoTbBMods()
function undoTbBMods(){										// function to reset buttons on page blur
	for (var k = theMods.length - 1; k >= 0; k--){			// loop through mods that were done
		theMod = theMods.pop();								// get mods one at a time and undo them
		buttonId = theMod.substr(11);						// the id of the button to unMod
		mod = theMod.substr(6,4);							// the mod operation to undo
		button = $(buttonId);								// the actual button we're going to unMod
		if (button){										// make sure the button exists before we operate on it
			if (mod == "HIDE")								// button was hidden and needs to be shown
				showButton(button);							// show the button
			else if (mod == "TEXT"){						// button label was modded and needs replaced
				label = labels.pop()						// get the original label
				changeLabel(button , label);				// change the button label
			} else if (mod == "HREF"){						// button link location was changed and needs replaced
				oldLink = urls.pop()						// get the original link
				changeLink(button , oldLink);				// change the button link
			}
		}
	}
}
////////////////////////////////////////////////////////////// checkForms(page)
function checkForms(page){									// if page any forms have TbBMods returns true
	theForms = T(page,"form")								// get all forms that may be on page
	for ( var i = 0; i < theForms.length; i++){				// loop through forms
		if (hasTbBMod(theForms[i]))							// check each form for TbBMod 
			return true;									// return true if found
	}
	return false;											// no TbBMod found return false
}
////////////////////////////////////////////////////////////// hasForm(page)
function hasForm(page){										// Checks a page for forms returns true or false
	if (T(page,"form"))										// page has form
		return true;										// return true
	return false;											// no form return false
}
////////////////////////////////////////////////////////////// hasTbBMod(theForm)
function hasTbBMod(theForm){ 								// takes a form and checks for inputs with id starting TbBMod
	inputs = T(theForm,"input");					 		// get all inputs of form
	for (var k = 0; k < inputs.length; k++){				// loop through inputs
		if (inputs[k].name.substr(0,6) == "TbBMod"){		// check input name for TbBMod
			TbBModForm = theForm;							// Save the form which has TbBMods in it for reference in other functions
			return true;									// return true if found
		}
	}
	return false;											// No TbBMod input return false
}
////////////////////////////////////////////////////////////// hideButton(button)
function hideButton(button){								// function to hide button
	button.style.display = "none";							// hide the button
}
////////////////////////////////////////////////////////////// showButton(button)
function showButton(button){								// function to show button
	button.style.display = "inline";						// show the button
}
////////////////////////////////////////////////////////////// changeLabel(button, label)
function changeLabel(button, label){						// function to change a button label
	button.innerHTML = label;								// change the button label
}
////////////////////////////////////////////////////////////// changeLink(button, newLink)
function changeLink(button, newLink){						// function to change the buttons link
	button.href = newLink;									// change the button link
}
////////////////////////////////////////////////////////////// simple functions for shorthand
function $(i) { return document.getElementById(i); }		// document.getElementById
function T(node,tag){return node.getElementsByTagName(tag);}// getElementsByTagName - (parent, tag your looking for)

})();