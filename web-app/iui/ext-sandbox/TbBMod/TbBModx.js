
(function(){var eventNames=['blur','focus'];addEventListener("DOMContentLoaded",function(event)
{document.body.addEventListener('beforeinsert',registerTbBModEvents,false);document.body.addEventListener('afterinsert',afterInsert,false);nodes=document.querySelectorAll("ul, div, form");for(var i=0;i<nodes.length;i++){registerTbBModEvents(nodes[i]);}},false);function registerTbBModEvents(node){for(var i=0;i<eventNames.length;i++){node.addEventListener(eventNames[i],TbBModHandler,false);}}
function afterInsert(e){registerTbBModEvents(e.insertedNode);}
var TbBModForm;var theMods=[];var labels=[];var urls=[];function TbBModHandler(e){if(e.type=="focus"){var page=e.target;if(page.tagName=="FORM"&&hasTbBMod(page)){doTbBMods();}else if(hasForm(page)&&checkForms(page))
doTbBMods();}else if(e.type=="blur"){undoTbBMods();}}
function doTbBMods(){inputs=T(TbBModForm,"input");for(var k=0;k<inputs.length;k++){if(inputs[k].name.substr(0,6)=="TbBMod"){theMods.push(inputs[k].name);buttonId=inputs[k].name.substr(11);mod=inputs[k].name.substr(6,4);button=$(buttonId);if(button){if(mod=="HIDE")
hideButton(button);else if(mod=="TEXT"){label=inputs[k].value
labels.push(button.innerHTML);changeLabel(button,label);}else if(mod=="HREF"){newLink=inputs[k].value;urls.push(button.href);changeLink(button,newLink);}}}}}
function undoTbBMods(){for(var k=theMods.length-1;k>=0;k--){theMod=theMods.pop();buttonId=theMod.substr(11);mod=theMod.substr(6,4);button=$(buttonId);if(button){if(mod=="HIDE")
showButton(button);else if(mod=="TEXT"){label=labels.pop()
changeLabel(button,label);}else if(mod=="HREF"){oldLink=urls.pop()
changeLink(button,oldLink);}}}}
function checkForms(page){theForms=T(page,"form")
for(var i=0;i<theForms.length;i++){if(hasTbBMod(theForms[i]))
return true;}
return false;}
function hasForm(page){if(T(page,"form"))
return true;return false;}
function hasTbBMod(theForm){inputs=T(theForm,"input");for(var k=0;k<inputs.length;k++){if(inputs[k].name.substr(0,6)=="TbBMod"){TbBModForm=theForm;return true;}}
return false;}
function hideButton(button){button.style.display="none";}
function showButton(button){button.style.display="inline";}
function changeLabel(button,label){button.innerHTML=label;}
function changeLink(button,newLink){button.href=newLink;}
function $(i){return document.getElementById(i);}
function T(node,tag){return node.getElementsByTagName(tag);}})();