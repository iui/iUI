<%
import com.google.appengine.api.datastore.Entity

def saved = false
def person = new Entity("person");
person.name = params.name
person.email = params.email
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
    person.save()
    saved = true
}
%>

<% if (saved) { %>

<div class="panel" id="added" title="User Added">
    <h2>User Add Completed</h2>
</div>

<% } else { %>

<div class="panel" id="not-added" title="User Not Added">
    <h2>Error or Permission Denied</h2>
    <p>You must be logged in to add a user</a>
    <p>Non-admins can only add a user whose e-mail matches their Google account<p>
</div>

<% } %>
