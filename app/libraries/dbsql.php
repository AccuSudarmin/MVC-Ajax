<?php
class dbsql {
	private $con;
    public $query;

    function __construct(){
        $this->con = mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME);
        if(mysqli_connect_errno()){
            return false;
        } else {
            return true; 
        }
    }

    public function select($sql = []) {
        $q = "SELECT ";

        if (isset($sql['select'])) {
            $q .= $sq['select'];  
        } else {
            $q .= "*";
        }

        $q .= " FROM " . $sql['table'];
    	$i = 0;

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

    public function inner_join($table1,$table2,$on,$where,$select,$order){
        $q = "SELECT ";
        if ($select != null) {
            $q .= $select;
        } else {
            $q .= "*";
        }
        $q .= " FROM ".$table1." INNER JOIN ".$table2." ON ".$on;
        $i = 0;
        if ($where != null) {
            $q .= " WHERE ".$where;
        }
         if ($order != null) {
           $q .= " ORDER BY ".$order;
        }
        $this->query = mysqli_query($this->con,$q);
        if ($this->query) {
            return true;
        } else {
            return false;
        }
    }

    public function insert($table,$val,$col) {
    	$q = "INSERT INTO $table";
    	if ($col != null) {
    		$q .= " (";

    		for ($i=0; $i < count($col); $i++) {
    			if ($i == 0) $q .= $col[$i];
    			else $q .= ",".$col[$i]; 
    		}
    		$q .= ")";
			
    	}

    	$q .=  " VALUES (";
    	for ($i=0; $i < count($val); $i++) { 
    		if ($i == 0) $q .= "'".$val[$i]."'";	
    		else $q .=",'".$val[$i]."'";
    	}
    	$q .= ")";

    	$insert = mysqli_query($this->con,$q);
    	
    	if ($insert) return true;
    	else return false;
    }
    
    public function delete($table,$where){
    	$q = "DELETE FROM $table";
    	if ($where != null) {
    		$q .= " WHERE $where";
    	}
    	$delete = mysqli_query($this->con,$q);
    	
    	if ($delete) return true;
    	else return false;
    }
    
    public function update($table,$val,$col,$where){
    	$q = "UPDATE $table SET ";
    	for ($i=0; $i < count($val); $i++) { 
    		if ($i == 0) $q .= $col[$i]."='".$val[$i]."'";
    		else $q .= ",".$col[$i]."='".$val[$i]."'";
    	}
    	if ($where != null) {
    		$q .= " WHERE $where";
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

    public function update_injoin($table1,$table2,$on,$where){
        $q = "UPDATE ";
        $q .= " FROM ".$table1." INNER JOIN ".$table2." ON ".$on;
        if ($where != null) {
            $q .= " WHERE ".$where;
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