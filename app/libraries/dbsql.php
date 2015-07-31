<?php
class dbsql {
	private $con;
    public $query;

    function __construct($DB_HOST,$DB_USER,$DB_PASS,$DB_NAME){
        $this->con = mysqli_connect($DB_HOST,$DB_USER,$DB_PASS,$DB_NAME);
        if(mysqli_connect_errno()){
            return false;
        } else {
            return true;
        }
    }

    public function select( $sql = array() ) {
        $q = "SELECT ";

        if (isset($sql['select'])) {
            $q .= $sq['select'];
        } else {
            $q .= "*";
        }

        $q .= " FROM " . $sql['table'];

        if (isset($sql['where'])) {
            $q .= " WHERE " . $sql['where'];
        }

        if (isset($sql['order'])) {
           $q .= " ORDER BY " . $sql['order'];
        }

        if (isset($sql['limit'])) {
            $q .= " LIMIT " . $sql['limit'];
        }

    	$this->query = mysqli_query($this->con,$q);

      if ($this->query) {
        return true;
      } else {
      	return false;
      }
    }

    public function inner_join( $sql = array() ){
        $q = "SELECT ";

				if (isset($sql['select'])) {
            $q .= $sq['select'];
        } else {
            $q .= "*";
        }

        $q .= " FROM " . $sql['table1'] . " INNER JOIN " . $sql['table2'] . " ON " . $sql['on'];

        if (isset($sql['where'])) {
            $q .= " WHERE " . $sql['where'];
        }

        if (isset($sql['order'])) {
           $q .= " ORDER BY " . $sql['order'];
        }

        if (isset($sql['limit'])) {
            $q .= " LIMIT " . $sql['limit'];
        }

				$this->query = mysqli_query($this->con,$q);

	      if ($this->query) {
	      	return true;
	      } else {
	      	return false;
	      }

    }

    public function insert( $sql = array() ) {
    	$q = "INSERT INTO " . $sql['table'];
    	if ( isset( $sql['column'] ) ) {
    		$q .= " (";
				$i = 0;
				foreach ($sql['column'] as $col) {
    			if ($i == 0) $q .= $col;
    			else $q .= ",".$col;

					$i++;
    		}
    		$q .= ")";
    	}

    	$q .=  " VALUES (";
			$i = 0;
    	foreach ($sql['value'] as $val) {
    		if ($i == 0) $q .= "'".$val."'";
    		else $q .=",'".$val."'";
    	}
    	$q .= ")";

    	$insert = mysqli_query($this->con,$q);

    	if ($insert) return true;
    	else return false;
    }

    public function delete( $sql = array() ){
    	$q = "DELETE FROM " . $sql['table'];
    	if ( isset( $sql['where'] ) ) {
    		$q .= " WHERE " . $sql['where'];
    	}
    	$delete = mysqli_query($this->con,$q);

    	if ($delete) return true;
    	else return false;
    }

    public function update ( $sql = array() ){
    	$q = "UPDATE " . $sql['table'] . " SET ";

			for ($i=0; $i < count($sql['value']); $i++) {
    		if ($i === 0) $q .= $sql['column'][$i] . "='" . $sql['value'][$i] . "'";
    		else $q .= "," . $sql['column'][$i] . "='" . $sql['value'][$i] . "'";
    	}
    	if ( isset( $sql['ewher'] ) ) {
    		$q .= " WHERE " . $sql['where'];
    	}

    	$update = mysqli_query($this->con,$q);
    	if ($update) return true;
    	else return false;
    }

    public function num(){
        return mysqli_num_rows($this->query);
    }

    public function result(){
        $result = array();
        $fields = array();
        $i = 0;
        while ($i < mysqli_num_fields($this->query)) {
            $field = mysqli_fetch_field($this->query);
            $fields[$i] = $field->name;
            $i += 1;
        }
        $i = 0;
        while ($data = mysqli_fetch_array($this->query)) {
            for ($a=0; $a < count($fields); $a++) {
                $name = $fields[$a];
                $result[$i][$name] = $data[$name];
            }
            $i++;
        }
        return $result;
    }

    public function update_injoin( $sql = array() ){
        $q = "UPDATE ";
        $q .= " FROM " . $sql['table1'] . " INNER JOIN " . $sql['table2'] . " ON " . $sql['on'];
        if ( isset( $sql['where'] ) ) {
            $q .= " WHERE " . $sql['where'];
        }

        $this->query = mysqli_query($this->con,$q);
        if ($this->query) {
            return true;
        } else {
            return false;
        }
    }

    function __destruct(){
        mysqli_close($this->con);
    }
}
?>
