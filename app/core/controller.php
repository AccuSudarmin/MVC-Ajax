<?php

	class Controller
	{
		public function model($model){
			require_once './app/models/' . $model . '.php';
			return new $model;
		}

		public function view($view, $data = []){

			foreach ($data as $key => $value) {
				${$key} = $value;
			}

			require_once './app/views/' . $view . '.php';
		}

		public function library($lib) {
			require_once './app/libraries/' . $lib . '.php';

			if (class_exists('$lib')) {
				//chekking if class exist  in new library

				//and set new class based on name of library
				//class can call using lowercase, Example: $this->example_class
				$class_name = strtolower($lib);
				$this->$class_name = new $lib;

			}

		}
	}
?>
