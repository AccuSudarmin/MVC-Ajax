<?php
	/*example for calling model in controller
		$slider = $this->model('slider');
		$article = $this->model('article');
	*/
	class Home extends Controller
	{
		public function index(){
			$this->library('Hiccup', SITE_PATH . "/public/js/lib/hiccup.js");

			$this->hiccup->openForm( array(
				"urlsuccess" => SITE_PATH . "/home" ,
        "urltarget" => SITE_PATH . "/home/save" ,
        "controller" => "defpost" ,
				"method" => "POST"
      ));
			$this->hiccup->input( array( "type" => "text" , "name" => "nama" , "required" => true ));
			$this->hiccup->input( array( "type" => "submit" , "name" => "save" , "value" => "Save" ));
			$this->hiccup->closeForm();

			$form = $this->hiccup->render();

			$this->view('home', array( "form" => $form ));
		}

		public function save() {
			$data = array (
				"message" => "<b>" . $_POST['nama'] . "</b>" ,
				"type" => "modal-box" ,
				"delayURL" => 5000 ,
				"targetDiv" => "coba"
			);

			echo json_encode($data);
			echo "coba";
		}

	}

?>
