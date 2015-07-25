<?php

	class Article
	{
		public $db;

		function __construct()
		{
			$this->db = new Database();
			$this->query = ( array(
				'table' => 'article'
				));
		}

		public function total($sCategory = null){
			if ($sCategory != null) {
				array_push($this->query, 
					['order' => 'date_article DESC'] ,
					['category' => $sCategory]
					);
			} else {
				array_push($this->query, ['order' => 'id_article DESC']);
			}

			$this->db->select( $this->query );

			return $this->db->num();
		}

		public function getAll(){
			array_push($this->query, ['order' => 'id_article DESC']);

			$this->db->select( $this->query );

			return $this->db->result();
		}

		public function getLimit($start = 0 , $offset = 10){
			array_push($this->query, 
				['order' => 'id_article DESC'] ,
				['limit' => $start . ' , ' . $offset]
				);
			
			$this->db->select( $this->query );

			return $this->db->result();
		}

		public function getByCategory($sCategory, $start = 0, $offset = null){
			
			if ($offset == null) {
				$this->db->select( array(
					'table' => 'article' ,
					'order' => 'id_article DESC' ,
					'where' => "category = '" . $sCategory . "'"
					));
			} else {
				$this->db->select( array(
					'table' => 'article' ,
					'order' => 'id_article DESC' ,
					'limit' => $start . ' , ' . $offset
					));
			}

			return $this->db->result();
		}

		public function topPost($iLimit = 10, $sCategory = null){
			if ($sCategory != null) {
				$this->query['where'] = "category = '" . $sCategory . "'";
				$this->query['order'] = 'hit_article DESC' ;
				$this->query['limit'] = $iLimit;
			} else {
				$this->query['order'] = 'hit_article DESC' ;
				$this->query['limit'] = $iLimit;
			}
			
			$this->db->select( $this->query );

			return $this->db->result();
		}

	}

?>