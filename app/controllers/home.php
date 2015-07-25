<?php

	class Home extends Controller
	{
		public function index(){
			
			$this->view('header');
			// $this->view('navbar');

			// $slider = $this->model('slider');
			// $article = $this->model('article');

			$this->library('dbsql');

			// echo "<div id='main'>";
			// 	$this->view('home/slider', array($slider->total() , $slider->all()));
			// 	$this->view('home/top-post', array($article->topPost(3)));

			// echo "	<div id='content-home' class='container_24'>
			// 			<div id='content-home' class='container_24'>
			// 	";
			// 		$this->view('home/article', array($article->getLimit(0,5)));
			// 		$this->view('sidebar', array($article->topPost(5,'berita')));
			// echo "		</div>
			// 		</div>
			// 	";
			
			// echo "</div>";

		}
	}

?>