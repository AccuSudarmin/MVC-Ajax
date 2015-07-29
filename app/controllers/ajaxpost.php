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

      echo $form;
		}

    public function save(){
			echo $_POST['nama'];
    }

	}

?>
