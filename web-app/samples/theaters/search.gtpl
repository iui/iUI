<%
  def theaters = ["Los Gatos Cinema","Cinelux Plaza Theatre","Camera 7"]
  def movies = ["Transformers","Knocked Up","Live Free Die Hard"]
  
  def title = "-";
  if (params.zip)
  {
    title = "Zip " + params.zip
  }
  else
  {
    title = params.movie
  }
%>

<ul id="result" title="$title">

<%
    if (params.zip)
    {
        theaters.each{ %>
            <li><a href="#theater"> $it </a></li>
       <% }
    }
    else
        movies.each{ %>
            <li><a href="#movie"> $it </a></li>
      <%  }
%>

</ul>

<div id="theater" title="Theater" class="panel">
    <h2>Theater Information</h2>
    <ul>
      <li><a href="http://maps.google.com/maps?q=Los Gatos, CA">Location</a></li>
      <li><a href="tel:18005555555">Call</a></li>
      <li><a href="mailto:test@lostgatoscinema.com">Email</a></li>
    </ul>
</div>

<div id="movie" title="Movie" class="panel">
    <h2>Movie Information</h2>
    <ul>
      <li><a href="http://www.youtube.com/watch?v=wFvUdt9BQhU">Transformers Trailer</a></li>
    </ul>
</div>

