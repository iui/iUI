<% 
Integer delay = 0
try {
  String delayStr = params?.delay?.trim()
  delay = delayStr ? Integer.parseInt(delayStr) : 0
  if (delay != 0) {
    /* Sleep so users see activity indicator */
    java.lang.Thread.currentThread().sleep(1000  * delay)
  }
}
catch(InterruptedException ie) { }
Boolean fullPage = headers."X-Requested-With" != "XMLHttpRequest"
String selected = ""
/* Make backButton work for fullPage mode by using the Referer HTTP header */
String backURL = headers.Referer ?: 'form-test.html'
if (fullPage) {
    selected = 'selected="true"'
}
%>

<%  if (fullPage) {  %>
<html>
<head>
  <title>Full Page Echo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
  <link rel="stylesheet" href="../iui/iui.css" type="text/css" />
  <link rel="stylesheet" title="Default" href="../iui/t/default/default-theme.css"  type="text/css"/>
</head>

<body>
    <div class="toolbar">
        <h1 id="pageTitle">Full Page Echo</h1>
        <a id="backButton" class="button" style="display: inline" href="${backURL}">Back</a>
    </div>
<% } %>   

<div id="form-echo" class="panel" title="Form Echo" $selected>
  <h2 style="color: black">Request Info</h2>
  <fieldset>
    <div class="row">
        <label>Method</label>
        <span>${request.method}</span>
    </div>
    <div class="row">
        <label>RemoteHost</label>
        <span>${request.remoteHost}</span>
    </div>
  </fieldset>
  <h2 style="color: black">Form Parameters</h2>
  <fieldset>
    <% for (p in params.sort()) { %>
    <div class="row">
        <label>$p.key</label>
        <span>$p.value</span>
    </div>
    <% } %>
  </fieldset>
  <h2 style="color: black">HTTP Headers</h2>
    <% for (h in headers.sort()) { %>
    <h2>$h.key</h2>
    <fieldset>
        <p style="padding: 0 10px 0 10px">$h.value</p>
    </fieldset>
    <% } %>
  </dl>
</div>

<%  if (fullPage) {  %>
</body>
</html>
<% } %>   
