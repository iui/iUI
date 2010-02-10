function f1(who)
{
	return "Hello " + who + "!";
}

function sub1()
{
	return f1("sub1") + " " + new Date();
}

function sub2()
{
	return f1("sub2") + " " + new Date();
}
