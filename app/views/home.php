<!DOCTYPE html>
<html>

   <head>
      <title> MVC </title>
      <link href="<?php echo SITE_PATH; ?>/public/css/hiccup.css" rel="stylesheet">
      <link href="<?php echo SITE_PATH; ?>/public/css/style.css" rel="stylesheet">
   </head>
   <body>
      <center> <h2> <p> Welcome to MVCAjax Framework </p> </h2> </center>

      <div class="box">
         <center> <?php echo $input; ?> </center>
      </div>
      <p> This is example for form submit using ajax with detect html attribute </p>
      <?php echo $form; ?>

      <p> This is example ajax with suggestion box </p>

      <div id="coba"> </div>

      <script src="<?php echo SITE_PATH; ?>/public/js/lib/hiccup.js"></script>
   </body>

</html>
