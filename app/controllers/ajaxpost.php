<?php

	class Ajaxpost extends Controller
	{

		public function index()
    {
      $this->library('Hiccup', array(
				"urlsuccess" => SITE_PATH . "/ajaxpost" ,
        "urltarget" => SITE_PATH . "/ajaxpost/save" ,
        "controller" => "defpost" ,
				"method" => "POST"
      ));

      $this->hiccup->input( array( "type" => "text" , "name" => "nama" , "required" => true ));
      $this->hiccup->input( array( "type" => "submit" , "name" => "save" , "value" => "Save" ));

      $form = $this->hiccup->render();

			$this->library('Hiccup', array(
				"urlsuccess" => SITE_PATH . "/ajaxpost" ,
        "urltarget" => SITE_PATH . "/ajaxpost/update" ,
        "controller" => "update" ,
				"method" => "POST"
      ));

      $this->hiccup->input( array( "type" => "text" , "name" => "nama" , "required" => true ));
      $this->hiccup->input( array( "type" => "submit" , "name" => "save" , "value" => "Save" ));
			$form1 = $this->hiccup->render();

      echo $form . "<br>" . $form1;
		}

    public function save() {
			echo $_POST['nama'];
    }

		public function update() {
			echo "<b>updateki</b> <input type='text'>";
		}

	}

?>
