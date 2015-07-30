<?php

	class Controller
	{
		public function model($model){
			require_once './app/models/' . $model . '.php';
			return new $model;
		}

		public function view($view, $data = array()){

			foreach ($data as $key => $value) {
				${$key} = $value;
			}

			require_once './app/views/' . $view . '.php';
		}

		public function library($lib, $param = null) {
			require_once './app/libraries/' . $lib . '.php';

			if (class_exists($lib)) {
				//chekking if class exist  in new library

				//and set new class based on name of library
				//class can call using lowercase, Example: $this->example_class
				$class_name = strtolower($lib);

				if( $param != null ) $this->$class_name = new $lib ($param);
				else $this->$class_name = new $lib;

			}

		}
	}
?>
