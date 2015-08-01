<!DOCTYPE html>
<html>

   <head>
      <title> MVC </title>
      <link href="<?php echo SITE_PATH; ?>/public/css/hiccup.css" rel="stylesheet">
      <link href="<?php echo SITE_PATH; ?>/public/css/style.css" rel="stylesheet">
   </head>
   <body>
      <div class='header'>
         <div class='title'> MVCAJAX FRAMEWORK </div>
         <div class='sub-title'> Lorem ipsum dolor sit amet, consectetur adipisicing elit </div>
      </div>

      <div class="description">
         <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor <br>
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud <br>
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         </p>
      </div>

      <div class="box">
         <div class='searching-box'>
            <?php echo $input; ?>
         </div>
         <div class="desc-box">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <br>
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
         </div>
      </div>

      <div class="box">
         <div class="desc-box">
            This is example for form submit using ajax with detect html attribute </p>
         </div>
         <div class='searching-box'>
            <?php echo $form; ?>
         </div>
      </div>

      <div class="box">
         <div class="desc-box">
            This is example ajax with suggestion box
         </div>
         <div class='searching-box'>
            <?php echo $inputMultiple; ?>
         </div>
      </div>
      <script src="<?php echo SITE_PATH; ?>/public/js/lib/hiccup.js"></script>
   </body>

</html>
