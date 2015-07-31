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

			$this->hiccup->input( array(
				"type" => "text" ,
				"name" => "nama" ,
				"required" => true
			));

			$this->hiccup->input( array(
				"type" => "submit" ,
				"name" => "save" ,
				"value" => "Save"
			));

			$this->hiccup->closeForm();
			$form = $this->hiccup->render();

			$this->hiccup->input( array(
				"type" => "text" ,
				"name" => "search" ,
				"controller" => "search" ,
				"urltarget" => SITE_PATH . "/home/search"
			));

			$input = $this->hiccup->render();
			$this->view('home', array( "form" => $form , "input" => $input ));
		}

		public function save() {
			$data = array (
				"message" => "<b>" . $_POST['nama'] . "</b>" ,
				"type" => "modal-box" ,
				"delayURL" => 5000 ,
				"targetDiv" => "coba"
			);

			echo json_encode($data);
		}

		public function search() {
			$data = array (
				"type" => "suggestion" ,
				"option" => array(
					array("key" => "First Value" , "val" => "First Value") ,
					array("key" => "Second Value" , "val" => "Second Value") ,
					array("key" => "Thir Value" , "val" => "Third Value")
				)
			);

			echo json_encode($data);
		}

	}

?>
