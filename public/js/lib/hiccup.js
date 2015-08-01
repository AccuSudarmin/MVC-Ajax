var _ = function (id) {
   return document.getElementById(id);
}

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
            _( response.targetDiv ).insertAdjacentHTML( 'afterend', response.message );
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
   this.offsetTop = input.offsetTop;
   this.offsetLeft = input.offsetLeft;
   this.offsetHeight = input.offsetHeight;

   var ElementBuild = function ( element , inner ){
      var elm = document.createElement( element.tag );

      if (element.hasOwnProperty("id")) elm.setAttribute("id", element.id);
      if (element.hasOwnProperty("class")) elm.setAttribute("class", element.class);

      if (inner) elm.innerHTML = inner;

      return elm;
   }

   var createListSuggestBox = function ( option , suggestBox ) {
      var cls = ( option.class ) ? option.class : "suggest-content";
      optionElm = ElementBuild({'tag' : 'li' , 'class' : cls}, option.hint);

      suggestBox.appendChild(optionElm);

      return optionElm;
   }

   this.getValPost = function () {
      var data = input.name + "=" + input.value;

      return data;
   }


   var addEventClickList = function ( option , optionElm , suggestBox , optMultiple ) {
      if ( optMultiple ) {
         optionElm.addEventListener('click' , function () {

            for (var i = 0; i < option.list.length; i++) {
               _( option.list[i].target ).value = option.list[i].val;
            }

            suggestBox.parentNode.removeChild(suggestBox);
         });
      } else {
         optionElm.addEventListener('click' , function () {
            input.value = option.val;
            suggestBox.parentNode.removeChild(suggestBox);
         });
      }
   }

   this.onsuccess = function ( response ){
      var optionElm = [];
      switch (response.type) {
         case 'suggestion':

            if (_('suggest-box')) {
               _('suggest-box').parentNode.removeChild(document.getElementById('suggest-box'));
            }

            var suggestBox = ElementBuild({tag: 'div', id:'suggest-box'});

            for (var i = 0; i < response.option.length; i++) {
               (function (i) {
                  var optionElm = createListSuggestBox( response.option[i] , suggestBox );
                  addEventClickList( response.option[i] , optionElm , suggestBox , response.multiple );
               }(i));
            }

            suggestBox.style.position = "absolute";
            suggestBox.style.textAlign = "left";
            suggestBox.style.left = this.offsetLeft + "px";
            input.parentNode.insertBefore(suggestBox, input.nextSibling);

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
