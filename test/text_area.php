<ul title="test_results">
<?php
if ($_POST["text_area_test"]) {
  echo '<li>Success</li>';
  echo '<li>YOU TYPED: ' . $_POST["text_area_test"] . '</li>';
} else {
  echo '<li>Failure</li>';
  echo '<li>Failed to receive any text from text area</li>';
}
?>
</ul>