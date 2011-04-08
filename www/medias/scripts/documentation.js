window.onload = function() 
{
	var codesample = document.getElementsByTagName('code');
	for(var a=0;a<codesample.length;a++)
	{
		var cl = codesample[a].innerHTML.split('\n');
		// removing empty first & last lines
		if(cl[0]=='') { cl.shift(); }
		if(cl[(cl.length-1)]=='') { cl.pop(); }
		var codeline='';
		for(var i=0;i<cl.length;i++) 
		{
	        // replace common HTML entities
	        cl[i] = cl[i].replace(/	/g,'&nbsp;&nbsp;&nbsp;');
	        cl[i] = cl[i].replace('</','&lt;&#47;');
	        cl[i] = cl[i].replace(/"/g, '&#34;');
	        cl[i] = cl[i].replace(/>/g,'&gt;');
	        cl[i] = cl[i].replace(/</g,'&lt;');
	        cl[i] = cl[i].replace(/\=/g,'&#61;');
	        cl[i] = cl[i].replace(/\"/g,'&#34;');
	
	        // colorize
	        cl[i] = cl[i].replace(/&lt;&#47;/g,'<em class=elmt>&lt;&#47;');
	        cl[i] = cl[i].replace(/&lt;/g,'<em class=elmt>&lt;');
	        cl[i] = cl[i].replace(/&gt;/g,'&gt;</em>');
	        cl[i] = cl[i].replace(/&#61;&#34;/g,'&#61;<em class=quote>\"');
	        cl[i] = cl[i].replace(/&#34;/g,'\"</em>');

			codeline += '<li><span>'+cl[i]+'</span></li>';
		}
		codesample[a].innerHTML = '';
		codesample[a].style.display = 'none';
		codesample[a].parentNode.innerHTML = '<ul class="codesample">'+codeline+'</ul>'+codesample[a].parentNode.innerHTML;
	}

}