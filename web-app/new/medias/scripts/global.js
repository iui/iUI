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

window.onload = function() {
	checkHeaderSearch();
}