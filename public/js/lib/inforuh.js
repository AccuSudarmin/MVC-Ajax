//ajax function
var inforuhAjax = function ( form ) {
  this.getInputElement = function () {
    var elem = form.elements
      , inputElm = "";

    for (var i = 0; i < elem.length; i++) {
      var name = elem[i].name
        , value = elem[i].value;

      if (i === 0) inputElm += name + "=" + value
      else inputElm += "&" + name + "=" + value;
    }

    return inputElm;
  }

  this.post = function ( url , callback ) {
    var xmlhttp = new XMLHttpRequest()
      , input = this.getInputElement();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
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
            callback(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST", url , true);
    xmlhttp.send();
  }
}

var scanHTML = function () {
    var form = document.querySelectorAll("form[in-controller]");

    for (var i = 0; i < form.length; i++) {
      var controller = form[i].getAttribute("in-controller")
        , action = form[i].getAttribute("in-action")
        , urlOnSuccess = form[i].getAttribute("in-success");

      if (controller === "def-post") {
        form[i].addEventListener('submit', function(){
          var ajax = new inforuhAjax (this);

          ajax.post( action , function(cb){
            alert(cb);

            window.location.href = urlOnSuccess;
          });

          if(event.preventDefault) {
            event.preventDefault();
          } else {
            event.returnValue = false;
          }

        });
      }
    }
}

//event listener
window.onload = function (){
  scanHTML();
}
