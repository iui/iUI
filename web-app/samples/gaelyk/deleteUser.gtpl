<%
import com.google.appengine.api.datastore.Entity
import com.google.appengine.api.datastore.KeyFactory

import com.google.appengine.api.datastore.Query
import com.google.appengine.api.datastore.PreparedQuery
import static com.google.appengine.api.datastore.FetchOptions.Builder.*

def deleted = false
Integer id = Integer.parseInt(params.id)
def key = KeyFactory.createKey("person", id);
def peop = null
try { 
    peop = datastore.get(key)
//
// Must be logged in to add a "person"
// If your admin you can add any user
// otherwise the e-mail must match either user.email or user.nickname
//
    if (users.isUserLoggedIn() && 
                  (users.isUserAdmin() ||
                   user.email == person.email ||
                   user.nickname == person.email ))
    {
        peop.delete()
        deleted = true
    }

} catch(Exception e){}
%>

<% if (deleted == true) { %>

<div id="user-deleted" class="panel" title="User Deleted">
    <h2>User Deleted</h2>
</div>

<% } else { %>

<div id="user-error" class="panel" title="User Delete Error">
    <h2>User Not Found or Permission Denied</h2>
    <fieldset>
        <div class="row">
            <label>id parameter</label>
            <span>$params.id</span>
        </div>
    </fieldset>
</div>


<% } %>