function sub1()
{
	return f1("sub1") + " " + new Date();
}
function sub2()
{
	return f1("sub2") + " " + new Date();
}

var elsub1 = document.getElementById('sub1');
var elsub2 = document.getElementById('sub2');
var els1 = document.getElementById('s1');
var els2 = document.getElementById('s2');
elsub1.addEventListener("focus", function(){ els1.innerText = sub1() }, false);
elsub2.addEventListener("focus", function(){ els2.innerText = sub2() }, false);