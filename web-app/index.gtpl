<html>
<head>
	<title>iUI on Google App Engine</title>
  <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>
  <link rel="apple-touch-icon" href="iui/iui-logo-touch-icon.png" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <link rel="stylesheet" href="iui/iui.css" type="text/css" />
  <link rel="stylesheet" href="iui/iui-moz.css" type="text/css" />
  <link rel="stylesheet" title="Default" href="iui/t/default/default-theme.css"  type="text/css"/>
  <link rel="stylesheet" href="css/iui-panel-list.css" type="text/css" />
  <script type="application/x-javascript" src="iui/iui.js"></script>
</head>
<body>
    <div class="toolbar">
        <h1 id="pageTitle"></h1>
        <a id="backButton" class="button" href="#"></a>
    <%  if (user) {  %>
      <a class="button" target="_self" href="<%= userService.createLogoutURL(request.requestURI) %>">Logout</a>
    <%  } else {  %>
      <a class="button" target="_self" href="<%= userService.createLoginURL(request.requestURI) %>">Login</a>
    <%  }  %>
    </div>
<ul id="home" title="iUI.GAE" selected="true">
	<li><a href="#about">About</a></li>
	<li><a href="#samples">Samples</a></li>
	<li><a href="#3rd-party">3rd Party Samples</a></li>
	<li><a href="#tests">Tests</a></li>
	<li>
    <%  if (user) {  %>
      User: <%= user.nickname %>
    <%  } else {  %>
      Not logged in.
    <%  }  %>
   </li>
</ul>

<ul id="samples" title="Samples">
	<li><a target="_blank" href="samples/music/music.html">Music</a></li>
	<li><a target="_blank" href="samples/prefs.html">Prefs</a></li>
	<li><a target="_blank" href="samples/digg/index.html">Digg</a></li>
	<li><a target="_blank" href="samples/theaters/index.html">Theaters</a></li>
	<li><a target="_blank" href="samples/graphicnav/index.html">Graphic NavBar</a></li>
</ul>

<ul id="3rd-party" title="3rd Party Samples">
	<li><a target="_blank" href="3rd-party-apps/rail-tickets/index.html">Rail Tickets</a></li>
</ul>

<ul id="tests" title="Tests">
	<li><a target="_blank" href="test/complete.html">iUI (not) Complete</a></li>
	<li><a target="_blank" href="test/features.html">Features</a></li>
	<li><a target="_blank" href="test/inputs.html">Inputs</a></li>
	<li><a target="_blank" href="test/link-types.html">Link Types</a></li>
	<li><a target="_blank" href="test/form-test.html">Forms</a></li>
</ul>


<div id="about" class="panel">
  <h2>iUI Samples/Tests on Google App Engine & Gaelyk</h2>
  <ul>
	<li><a target="_blank" href="http://code.google.com/p/iui/">iUI Project</a></li>
	<li><a target="_blank" href="http://code.google.com/appengine/">Google App Engine</a></li>
	<li><a target="_blank" href="http://gaelyk.appspot.com/">Gaelyk</a></li>
	<li><a target="_blank" href="http://code.google.com/p/iui/wiki/iUIOnGoogleAppEngine">iUI on GAE wiki page</a></li>
  </ul>

</div>

</body>
</html>
