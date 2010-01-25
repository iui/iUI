<%
import com.google.appengine.api.datastore.Entity
import com.google.appengine.api.datastore.KeyFactory

import com.google.appengine.api.datastore.Query
import com.google.appengine.api.datastore.PreparedQuery
import static com.google.appengine.api.datastore.FetchOptions.Builder.*

Integer id = Integer.parseInt(params.id)
def key = KeyFactory.createKey("person", id);
def peop = null
try { 
    peop = datastore.get(key)
} catch(Exception e){}
%>

<% if (peop != null) { %>

<div id="user${peop.key.id}" class="panel" title="$peop.name">
    <h2>$peop.name</h2>
    <fieldset>
        <div class="row">
            <label>id</label>
            <span>$peop.key.id</span>
        </div>
        <div class="row">
            <label>Name</label>
            <span>$peop.name</span>
        </div>
        <div class="row">
            <label>Email</label>
            <span>$peop.email</span>
        </div>
        <div class="row">
            <label>Key</label>
            <span>$peop.key</span>
        </div>
        <div class="row">
            <label>Key.kind</label>
            <span>$peop.key.kind</span>
        </div>
    </fieldset>
    <a class="whiteButton" type="button" href="editUser.gtpl?id=${peop.key.id}">Update (T.B.D.)</a>
    <a class="redButton" type="button" href="deleteUser.gtpl?id=${peop.key.id}">Delete</a>
</div>

<% } else { %>

<div id="user-error" class="panel" title="User Not Found">
    <h2>User Not Found</h2>
    <fieldset>
        <div class="row">
            <label>id parameter</label>
            <span>$params.id</span>
        </div>
    </fieldset>
</div>


<% } %>