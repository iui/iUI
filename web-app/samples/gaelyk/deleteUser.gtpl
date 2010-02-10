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
// Must be logged in to delete a "person"
// If you're admin you can delete any user
// otherwise the e-mail must match either user.email or user.nickname
//
    if (users.isUserLoggedIn() && 
                  (users.isUserAdmin() ||
                   user.email == peop.email ||
                   user.nickname == peop.email ))
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
    <p>You must be logged in to delete a user</p>
    <p>Non-admin users can only delete their own user</p>
    <fieldset>
        <div class="row">
            <label>id parameter</label>
            <span>$params.id</span>
        </div>
    </fieldset>
</div>


<% } %>