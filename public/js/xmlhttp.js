var ajax = function ( form ) {
  this.getInputElement = function () {
    var elem = form.elements
      , inputElm = "";

    for (var i = 0; i < elem.length; i++) {
      var name = elem[i].name
        , value = elem[i].value;

      inputElm += name + "=" + value;
    }

    return inputElm;
  }

  this.post = function ( url , callback ) {
    var xmlhttp = new XMLHttpRequest()
      , input = this.getInputElement();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return callback(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST", url , true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(input);
  }

  this.get = function ( url , callback ) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return callback(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST", url , true);
    xmlhttp.send();
  }

}
