<?php
class Hiccup {

  function __construct ( $URLjs = null ) {
    $this->URLjs = $URLjs;
    $this->form = "";
    $this->input = "";
  }

  public function openForm ( $setting = array() ) {
    //example data array('controller' => 'name_controller', 'method' => 'POST' , 'urltarget' => 'http://hiccup.com/news/save', 'urlsuccess' => 'http://hiccup.com')
    $this->form .= "<form ";
    $this->form .= isset( $setting['method'] ) ? "method='" . $setting['method'] ."' " : "method='POST' ";
    $this->form .= "in-controller='" . $setting['controller'] . "' in-target='" . $setting['urltarget'] . "' ";
    $this->form .= isset( $setting['urlsuccess'] ) ? "in-success='" . $setting['urlsuccess'] . "' " : "";
    $this->form .= isset( $setting['class'] ) ? "class='" . $setting['class'] . "' " : "";
    $this->form .= isset( $setting['id'] ) ? " id='" . $setting['id'] . "'" : "";
    $this->form .= ">";

  }

  public function closeForm () {
    $this->form .= $this->input;
    $this->form .= "</form>";

    $this->input = "";
  }

  public function input ( $setting = array() ) {
    $input = "<p> <input type='";
    $input .= isset( $setting['type'] ) ? $setting['type'] . "' " : "text' ";
    $input .= isset ( $setting['name'] ) ? "name='" . $setting['name'] . "' " : "";
    $input .= isset( $setting['id'] ) ? "id='" . $setting['id'] . "' " : "";
    $input .= isset( $setting['class'] ) ? "class='" . $setting['class'] . "' " : "";
    $input .= isset( $setting['value'] ) ? "value='" . $setting['value'] . "' " : "";
    $input .= isset( $setting['placeholder'] ) ? "placeholder='" . $setting['placeholder'] . "' " : "";

    if (isset($setting['required'])) {
      if ($setting['required']) $input .= "required";
    }

    $input .= "> </p>";

    $this->input .= $input;
  }

  public function select ( $setting = array() ) {
    $select = "<p> <select ";
    $select .= isset( $setting['name'] ) ? "name='" . $setting['name'] . "' " : "";
    $select .= isset( $setting['id'] ) ? "id='" . $setting['id'] . "' " : "";
    $select .= isset( $setting['class'] ) ? "class='" . $setting['class'] . "' " : "";

    if ( isset( $setting['option'] ) ) {
      foreach ( $setting['option'] as $option ) {
        $select .= "<option ";
        $select .= isset( $option['value'] ) ? "value='" . $option['value'] . "' " : "";
        $select .= "> ";
        $select .= isset( $option['alias'] ) ? $option['alias'] : "";
        $select .= "</option>";
      }
    }

    $select .= "</select> </p>";

    $this->input .= $select;
  }

  public function render() {
    $ajax = "<script src='" . $this->URLjs . "'></script>";
    $render = $this->form . $ajax;

    return $render;
  }
}
?>
