<%
import com.google.appengine.api.datastore.Entity
import com.google.appengine.api.datastore.Query
import com.google.appengine.api.datastore.PreparedQuery
import com.google.appengine.api.datastore.QueryResultList
import com.google.appengine.api.datastore.Cursor
import static com.google.appengine.api.datastore.FetchOptions.Builder.*

Cursor cursor = null
def encodedCursor = params.next
if (encodedCursor)
{
    cursor = Cursor.fromWebSafeString(encodedCursor)
}
def query = new Query("person")
query.addSort("name", Query.SortDirection.ASCENDING)
PreparedQuery preparedQuery = datastore.prepare(query)
QueryResultList<Entity> peopsList = null
if (cursor)
{
//    peopsList = preparedQuery.asList( withLimit(10).cursor(cursor) )
    peopsList = preparedQuery.asQueryResultList( withLimit(10).cursor(cursor) )
}
else
{
//    peopsList = preparedQuery.asList( withLimit(10) )
    peopsList = preparedQuery.asQueryResultList( withLimit(10) )
}
%>

<% if (cursor == null) { %>
<ul id="users" title="User List">
<% } %>

    <% for (peop in peopsList) {  %>
    <li><a href="userInfo.gtpl?id=${peop.key.id}">$peop.name</a></li>
    <% } %>
    
    
    <% if ((peopsList.size() > 0) && (peopsList.getCursor() != null)) { %>
    <li><a href="listUsers.gtpl?next=${peopsList.getCursor().toWebSafeString()}" target="_replace">Get 10 More</a></li>
    <% } %>

<% if (cursor == null) { %>
</ul>
<% } %>
