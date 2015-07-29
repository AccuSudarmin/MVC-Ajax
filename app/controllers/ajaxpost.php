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
			$data = array ( "message" => $_POST['nama'] );
			echo json_encode($news);
    }

		public function update() {
			$news = array( "message" => "<b>Bold</b> <i>Italic</i>" );
			echo json_encode($news);
		}

	}

?>
