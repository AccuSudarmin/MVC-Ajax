<?php
	/*example for calling model in controller
		$slider = $this->model('slider');
		$article = $this->model('article');
	*/
	class Home extends Controller
	{
		public function index(){
			$this->library('Hiccup');

			//first form
			$this->hiccup->openForm( array(
				"urlsuccess" => SITE_PATH . "/home" ,
        "urltarget" => SITE_PATH . "/home/save" ,
        "controller" => "defpost" ,
				"method" => "POST"
      ));
			$this->hiccup->input( array( "type" => "text" , "name" => "nama" , "required" => true ));
			$this->hiccup->input( array( "type" => "submit" , "name" => "save" , "value" => "Save" ));
			$this->hiccup->closeForm();

			//second form
			$this->hiccup->openForm( array(
				"urlsuccess" => SITE_PATH . "/home" ,
				"urltarget" => SITE_PATH . "/home/update" ,
				"controller" => "udpatepost" ,
				"method" => "POST"
			));

			$this->hiccup->input( array( "type" => "text" , "name" => "nama" , "required" => true ));
			$this->hiccup->input( array( "type" => "submit" , "name" => "save" , "value" => "Save" ));
			$this->hiccup->closeForm();

			$form = $this->hiccup->render();

			$this->view('home', array( "form" => $form ));
		}

		public function save() {
			$data = array ( "message" => $_POST['nama'] );
			echo json_encode($data);
		}

		public function update() {
			$news = array( "message" => "<b>Bold</b> <i>Italic</i>" );
			echo json_encode($news);
		}
	}

?>
