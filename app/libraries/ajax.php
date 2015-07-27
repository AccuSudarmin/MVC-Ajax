<?php
class Ajax {

  function __construct ( $setting = array() ) {
    /*
      {action: http://contoh.com/savedata.php , controller: default, target: http://contoh.com , id: idnya}
    */
    $this->openForm = "<form method='POST' in-controller='" . $setting['controller'] . "' in-action='" . $setting['action'] . "' , in-success='" . $setting['target'] . "' ";
    $this->openForm .= isset( $setting['id'] ) ? " id='" . $setting['id'] . "'" : "";
    $this->openForm .= ">";

    $this->input = "";

    $this->endForm = "</form>";
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
    $ajax = "<script src='" . SITE_PATH . "/public/js/lib/inforuh.js'></script>";
    $render = $this->openForm . $this->input . $this->endForm . $ajax;

    return $render;
  }
}
?>
