var hiccupAjax = function (obj) {
  this.post = function (){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        obj.onsuccess(xmlhttp.responseText);
      }
    }

    xmlhttp.onprogress = function (evt) {
      var percentComplete = (evt.loaded / evt.total) * 100;
      obj.onprogress(percentComplete);
    }

    xmlhttp.open("POST", obj.URLtarget , true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(obj.getInputElement());
  }

  this.get = function () {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        obj.onsuccess(xmlhttp.responseText);
      }
    }

    xmlhttp.onprogress = function (evt) {
      var percentComplete = (evt.loaded / evt.total) * 100;
      obj.onprogress(percentComplete);
    }

    xmlhttp.open("POST", obj.URLtarget , true);
    xmlhttp.send();
  }
}

var hiccupController = function (form) {
  this.URLtarget = form.getAttribute("in-target") || null
  this.URLsuccess = form.getAttribute("in-success") || null;
  this.Method = form.getAttribute("method") || "POST";

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

  var ElementBuild = function ( element , inner ){
    var elm = document.createElement( element.tag );

    if (element.hasOwnProperty("id")) elm.setAttribute("id", element.id);
    if (element.hasOwnProperty("class")) elm.setAttribute("class", element.class);

    if (inner) elm.innerHTML = inner;

    return elm;
  }

  var createOverlay = function ( text ) {
    var overlay = ElementBuild({ "tag" : "div" , "class" : "overlay" }, text);

    document.body.appendChild(overlay);

    var closeElement = setTimeout( function () {
      overlay.parentNode.removeChild(overlay);
    }, 3000);
  };

  this.onsuccess = function ( response ){
    createOverlay( response );
  }

  this.onprogress = function ( evt ) {
    console.log(evt);
  }

  this.onsubmit = function () {
    var ajax = new hiccupAjax(this);

    if (this.Method === "POST" || this.Method === 'POST') {
      form.addEventListener('submit' , function () {
        ajax.post();

        if(event.preventDefault) event.preventDefault()
        else event.returnValue = false;
      });
    } else if (this.Method === "GET" || this.Method === 'GET') {
      form.addEventListener('submit' , function () {
        ajax.get();

        if(event.preventDefault) event.preventDefault()
        else event.returnValue = false;
      });
    }
  }
  
}

var scanHTML = function () {
  var form = document.querySelectorAll("form[in-controller]")
    , controller = []
    , ajax = [];

  for (var i = 0; i < form.length; i++) {

    controller[i] = new hiccupController(form[i]);

    controller[i].onsubmit();
  }

  console.log(controller[0]);
  console.log(controller[1]);
}

window.onload = function () {
  scanHTML();
}
