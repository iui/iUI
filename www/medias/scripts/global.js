function show(elmId) {
	document.getElementById(elmId).style.display='block';
}
function hide(elmId) {
	document.getElementById(elmId).style.display='none';
}
function empty(elmId) {
	document.getElementById(elmId).value='';
}

function checkHeaderSearch() {
	(document.getElementById('search_q').value.length!=0)?show('emptysearch'):hide('emptysearch');
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
 
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
 
    return vars;
}

function getGET( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}


window.onload = function() {
	checkHeaderSearch();
}