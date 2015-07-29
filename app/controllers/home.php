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
				"urlsuccess" => SITE_PATH . "/ajaxpost" ,
        "urltarget" => SITE_PATH . "/ajaxpost/save" ,
        "controller" => "defpost" ,
				"method" => "POST"
      ));
			$this->hiccup->input( array( "type" => "text" , "name" => "nama" , "required" => true ));
			$this->hiccup->input( array( "type" => "submit" , "name" => "save" , "value" => "Save" ));
			$this->hiccup->closeForm();

			//second form
			$this->hiccup->openForm( array(
				"urlsuccess" => SITE_PATH . "/ajaxpost" ,
				"urltarget" => SITE_PATH . "/ajaxpost/update" ,
				"controller" => "udpatepost" ,
				"method" => "POST"
			));

			$this->hiccup->input( array( "type" => "text" , "name" => "nama" , "required" => true ));
			$this->hiccup->input( array( "type" => "submit" , "name" => "save" , "value" => "Save" ));
			$this->hiccup->closeForm();

			$form = $this->hiccup->render();

			$this->view('home', array( "form" => $form ));
		}
	}

?>
