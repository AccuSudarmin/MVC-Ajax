<?php

	class Ajaxpost extends Controller
	{

		public function index()
    {
      $this->library('Ajax', array(
				"target" => SITE_PATH . "/ajaxpost" ,
        "action" => SITE_PATH . "/ajaxpost/save" ,
        "controller" => "def"
      ));

      $this->ajax->input( array( "type" => "text" , "name" => "nama"));
      $this->ajax->input( array( "type" => "submit" , "name" => "save" , "value" => "Save" ));

      $form = $this->ajax->render();

      echo $form;
		}

    public function save(){
			echo $_POST['nama'];
    }

	}

?>
