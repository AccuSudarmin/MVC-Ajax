<?php
	/*example for calling model in controller
		$slider = $this->model('slider');
		$article = $this->model('article');
	*/
	class Home extends Controller
	{
		public function index(){
			$this->library('Hiccup', SITE_PATH . "/public/js/lib/hiccup.js");

			$this->hiccup->input( array(
				"type" => "text" ,
				"name" => "color" ,
				"controller" => "search" ,
				"placeholder" => "Enter favourite color" ,
				"class" => "input-box" ,
				"urltarget" => SITE_PATH . "/home/search"
			));

			$this->hiccup->input( array(
				"type" => "submit" ,
				"name" => "search" ,
				"class" => "input-button" ,
				"value" => "Search"
			));

			$input = $this->hiccup->render();

			$this->hiccup->openForm( array(
				"urlsuccess" => SITE_PATH . "/home" ,
				"urltarget" => SITE_PATH . "/home/save" ,
   			"controller" => "defpost" ,
				"method" => "POST"
      	));

			$this->hiccup->input( array(
				"type" => "text" ,
				"name" => "firstname" ,
				"placeholder" => "Firstname" ,
				"class" => "input-box" ,
				"required" => true ,
				"p" => true
			));

			$this->hiccup->input( array(
				"type" => "text" ,
				"name" => "lastname" ,
				"placeholder" => "Lastname" ,
				"class" => "input-box" ,
				"required" => true ,
				"p" => true
			));

			$this->hiccup->input( array(
				"type" => "submit" ,
				"name" => "save" ,
				"class" => "input-button" ,
				"value" => "Save" ,
				"p" => true
			));

			$this->hiccup->closeForm();
			$form = $this->hiccup->render();

			$this->hiccup->input( array(
				"type" => "text" ,
				"name" => "color" ,
				"id" => "firstname" ,
				"controller" => "searchMultiple" ,
				"class" => "input-box" ,
				"urltarget" => SITE_PATH . "/home/searchMultiple"
			));

			$this->hiccup->input( array(
				"type" => "text" ,
				"id" => "lastname" ,
				"class" => "input-box"
			));

			$inputMultiple = $this->hiccup->render();

			$this->view('home', array( "form" => $form , "input" => $input , "inputMultiple" => $inputMultiple));
		}

		public function save() {
			$data = array (
				"message" => "<b>" . $_POST['firstname'] . " " . $_POST['lastname'] . "</b>" ,
				"type" => "modal-box" ,
				"delayURL" => 5000 ,
				"targetDiv" => "coba"
			);

			echo json_encode($data);
		}

		public function search() {
			$input = preg_quote($_POST['color'], '~'); // don't forget to quote input string!
			$data = array('orange', 'blue', 'green', 'red', 'pink', 'brown', 'black');
			$result = preg_grep('~' . $input . '~', $data);

			$option = array();
			foreach ($result as $col) {
				array_push($option, array("hint" => $col, "val" => $col));
			}
			$data = array (
				"type" => "suggestion" ,
				"option" => $option
			);

			echo json_encode($data);
		}

		public function searchMultiple() {
			$data = array (
				"type" => "suggestion" ,
				"multiple" => true ,
				"option" => array(
					array(
						"hint" => "Johnny Depp" ,
						"list" => array(
							array( "target" => "firstname" , "val" => "Johnny" ) ,
							array( "target" => "lastname" , "val" => "Depp" )
						)
					) ,
					array(
						"hint" => "Ryan Sheckler" ,
						"list" => array(
							array( "target" => "firstname" , "val" => "Ryan" ) ,
							array( "target" => "lastname" , "val" => "Sheckler" )
						)
					)
				)
			);

			echo json_encode($data);
		}

	}

?>
