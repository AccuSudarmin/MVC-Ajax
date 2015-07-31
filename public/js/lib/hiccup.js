var hiccupAjax = function (obj) {
  this.post = function (){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        try {
          var response = JSON.parse(xmlhttp.responseText);
          obj.onsuccess( response );
        } catch (e) {
          console.log(e);
          console.log(xmlhttp.responseText);
        }
      }
    }

    xmlhttp.onprogress = function (evt) {
      var percentComplete = (evt.loaded / evt.total) * 100;
      obj.onprogress( percentComplete );
    }

    xmlhttp.open("POST", obj.URLtarget , true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(obj.getInputElement());
  }

  this.get = function () {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        try {
          var response = JSON.parse(xmlhttp.responseText);
          obj.onsuccess( response );
        } catch (e) {
          console.log(e);
          console.log(xmlhttp.responseText);
        }
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
    var overlay_child = ElementBuild({ "tag" : "div" , "class" : "hiccup-modal-box-inside" }, text)
      , overlay = ElementBuild({ "tag" : "div" , "class" : "hiccup-modal-box" });

    overlay.appendChild(overlay_child);

    document.body.insertBefore(overlay, document.body.firstChild);

    var closeElement = setTimeout( function () {
      overlay.parentNode.removeChild(overlay);
    }, 3000);
  };

  this.onsuccess = function ( response ){
    switch (response.type) {
      case 'modal-box':
        createOverlay ( response.message );
        break;
      case 'validation':

        break;
      case 'own-div':
        document.getElementById( response.targetDiv ).insertAdjacentHTML( 'afterend', response.message );
        break;
      default:
        createOverlay( response );
    }

    if (this.URLsuccess) {
      var delayTime = response.delayURL || 3000
        , url = this.URLsuccess;
      setTimeout( function () {
        window.location.href = url;
      }, delayTime);
    }
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
}

window.onload = function () {
  scanHTML();
}
