/*
   Copyright (c) 2009, Masabi Ltd
   http://www.masabi.com/
 */


(function() {


// *************************************************************************************************

window.ticketsales =
{
	destination: function()
	{
		var s=document.getElementById("az__buy_fromStation");
		s.name=document.getElementById("from-whatever").name="destination";
		var lis=s.getElementsByTagName("li"),sel=window.iui_ext.getItem("destination");
		for (var i=0; i<lis.length; i++)
		{
			if (lis[i]._value==sel)	lis[i].className = "selected";
			else if (lis[i]._value)	lis[i].className = null;
		}
		s.addEventListener("blur",function() { s.name="from"; },true);
	}
};

})();
