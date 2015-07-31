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
      xmlhttp.send(obj.getValPost());
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

var hiccupFormController = function (form) {
   this.URLtarget = form.getAttribute("fm-target") || null
   this.URLsuccess = form.getAttribute("fm-success") || null;
   this.Method = form.getAttribute("method") || "POST";

   this.getValPost = function () {
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
   }

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

var hiccupInputController = function (input) {
   this.URLtarget = input.getAttribute("in-target") || null;

   var ElementBuild = function ( element , inner ){
      var elm = document.createElement( element.tag );

      if (element.hasOwnProperty("id")) elm.setAttribute("id", element.id);
      if (element.hasOwnProperty("class")) elm.setAttribute("class", element.class);

      if (inner) elm.innerHTML = inner;

      return elm;
   }

   this.getValPost = function () {
      var data = input.name + "=" + input.value;

      return data;
   }

   this.onsuccess = function ( response ){
      var optionElm = [];
      switch (response.type) {
         case 'suggestion':

            if (document.getElementById('suggest-box')) {
               document.getElementById('suggest-box').parentNode.removeChild(document.getElementById('suggest-box'));
            }
            var suggestBox = ElementBuild({tag: 'div', id:'suggest-box'});

            for (var i = 0; i < response.option.length; i++) {

               optionElm[i] = ElementBuild({'tag' : 'li'}, response.option[i].message);
               optionElm[i].addEventListener('click' , function () {
                  input.value = response.option[i].val;
                  suggestBox.parentNode.removeChild(suggestBox);
               });

               suggestBox.appendChild(optionElm[i]);

            }

            document.body.insertBefore(suggestBox, document.body.firstChild);

            break;
      }

   }

   this.onprogress = function ( evt ) {
      console.log(evt);
   }

   this.on = function ( eventPress ) {

      var ajax = new hiccupAjax(this);

      switch ( eventPress ) {
         case 'keydown':
            input.addEventListener('keydown', function() {
               ajax.post();
            });
            break;
         case 'keyup':
            input.addEventListener('keyup', function() {
               ajax.post();
            });
            break;
         default:
      }

      var ajax = new hiccupAjax(this);
   }
}

var scanHTML = function () {
   var form = document.querySelectorAll("form[fm-controller]")
      , input = document.querySelectorAll("input[in-controller]")
      , controllerForm = []
      , controllerInput = []
      , ajax = [];

   for (var i = 0; i < form.length; i++) {
      controllerForm[i] = new hiccupFormController(form[i]);
      controllerForm[i].onsubmit();
   }

   for (var i = 0; i < input.length; i++) {
      controllerInput[i] = new hiccupInputController(input[i]);
      controllerInput[i].on('keyup');
   }
}

window.onload = function () {
   scanHTML();
}
