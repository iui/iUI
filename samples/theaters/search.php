
<?php

$theaters = array("Los Gatos Cinema","Cinelux Plaza Theatre","Camera 7");
$movies = array("Transformers","Knocked Up","Live Free Die Hard");

$title = "-";
if ($_POST["zip"])
    $title = "Zip " . $_POST['zip'];
else
    $title = $_POST['movie'];
?>

<ul title="<?php echo $title ?>">

<?php
    if ($_POST["zip"])
    {
        foreach ($theaters as $theater)
        {
            echo '<li><a href="#theater">' . $theater . '</a></li>';
        }
    }
    else
        foreach ($movies as $movie)
        {
            echo '<li><a href="#movie">' . $movie . '</a></li>';
        }
?>

</ul>

<div id="theater" title="Theater" class="panel">
    <h2>Theater Information</h2>
</div>

<div id="movie" title="Movie" class="panel">
    <h2>Movie Information</h2>
</div>

