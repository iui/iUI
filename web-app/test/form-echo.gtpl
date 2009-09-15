<div id="form-echo" class="panel" title="Form Echo">
  <h2>Req Info</h2>
  <dl>
    <dt>Method</dt>
    <dd>${request.method}</dd>
    <dt>Remote Host</dt>
    <dd>${request.remoteHost}</dd>
  </dl>
  <h2>Parameters</h2>
  <dl>
    <% for (p in params) { %>
    <dt>$p.key</dt>
    <dd>$p.value</dd>
    <% } %>
  </dl>
  <h2>Headers</h2>
  <dl>
    <% for (h in headers) { %>
    <dt>$h.key</dt>
    <dd>$h.value</dd>
    <% } %>
  </dl>
</div>