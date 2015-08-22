var _ = function (id) {
   return document.getElementById(id);
}

var hiccupAjax = function (obj) {
   this.post = function (){
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
         switch (xmlhttp.readyState) {
            case 0:
               console.log('request not initialized ');
               break;
            case 1:
               console.log('server connection established');
               break;
            case 2:
               console.log('request recieved');
               break;
            case 3:
               console.log('processing request');
               break;
            case 4:
               if (xmlhttp.status === 200) {
                  try {
                     var response = JSON.parse(xmlhttp.responseText);
                     obj.onsuccess( response );
                  } catch (e) {
                     console.log(e);
                     console.log(xmlhttp.responseText);
                  }
               } else if (xmlhttp.status === 404) {
                  console.log('server not found');
               }
               break;
         }
      }

      xmlhttp.onloadstart = function() {
        obj.onstart();
      }

      xmlhttp.onloadend = function(){
         obj.onfinish();
      }

      xmlhttp.ontimeout = function () {
        console.log('Request Timeout');
      }

      xmlhttp.onabort = function () {
        console.log('Request Abort');
      }

      xmlhttp.onerror = function(e){
        console.log('Request Error');
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
         , group = ""
         , inputElm = ""
         , groupList = {};

      for (var i = 0; i < elem.length; i++) {
         var name = elem[i].name
            , value = elem[i].value
            , group = elem[i].getAttribute("in-group") || false;;

         if (group) {
            var obj = {};

            if (groupList.hasOwnProperty(group)) {
               groupList[group][name] = value;
            } else {
               obj[name] = value;
               groupList[group] = obj;
            }

            if (i === 0) inputElm += "group=" + JSON.stringify(groupList)
            else inputElm += "&group=" + JSON.stringify(groupList);

         } else {

            if (i === 0) inputElm += name + "=" + value
            else inputElm += "&" + name + "=" + value;

         }
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

   var createOverlay = function ( text , delayTime ) {
      var overlay_child = ElementBuild({ "tag" : "div" , "class" : "hiccup-modal-box-inside" }, text)
         , overlay = ElementBuild({ "tag" : "div" , "class" : "hiccup-modal-box" });

      overlay.appendChild(overlay_child);

      document.body.insertBefore(overlay, document.body.firstChild);

      var closeElement = setTimeout( function () {
         overlay.parentNode.removeChild(overlay);
      }, delayTime);
   }


   this.onstart = function () {

   }

   this.onfinish = function () {

   }

   this.onsuccess = function ( response ){
      var success = ( "success" in response) ? response.success : true
         , delayTime = response.delayURL || 3000;

      if ( this.URLsuccess && success) {
         var url = this.URLsuccess;

         setTimeout( function () {
            window.location.href = url;
         }, delayTime);
      }

      switch (response.type) {
         case 'modal-box':
            createOverlay ( response.message , delayTime );
            break;
         case 'validation':
            break;
         case 'own-div':
            _( response.targetDiv ).insertAdjacentHTML( 'afterend', response.message );
            break;
         default:
            createOverlay( response );
      }
   }

   this.onprogress = function ( evt ) {
      console.log(evt);
   }

   this.onsubmit = function () {
      var ajax = new hiccupAjax(this);
      if (this.Method === "POST" || this.Method === 'post') {
         form.addEventListener('submit' , function () {
            ajax.post();

            if(event.preventDefault) event.preventDefault()
            else event.returnValue = false;
         });
      } else if (this.Method === "GET" || this.Method === 'get') {
         form.addEventListener('submit' , function () {
            ajax.get();

            if(event.preventDefault) event.preventDefault()
            else event.returnValue = false;
         });
      }
   }

}

var hiccupInputController = function (input) {
   var h = {};

   h.URLtarget = input.getAttribute("in-target") || null;
   h.offsetTop = input.offsetTop;
   h.offsetLeft = input.offsetLeft;
   h.offsetHeight = input.offsetHeight;
   h.offsetWidth = input.offsetWidth;
   h.group = input.getAttribute("in-group") || null;

   input.autocomplete = "off";

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

   h.getValPost = function () {
      var data = input.name + "=" + input.value;

      if (h.group) data += "&ingroup=" + h.group;

      return data;
   }


   var addEventClickList = function ( option , optionElm , suggestBox , optMultiple ) {
      if ( optMultiple ) {
         optionElm.addEventListener('click' , function () {
            for (var i = 0; i < option.list.length; i++) {
               if ( _(option.list[i].target).tagName === 'INPUT' ){
                   _(option.list[i].target).value = option.list[i].val;
               }
               else { _( option.list[i].target ).innerHTML = option.list[i].val; }

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

   h.onstart = function () {
      input.classList.toggle("process-loading");
      if (_('suggest-box')) _('suggest-box').parentNode.removeChild(_('suggest-box'));
   }

   h.onfinish = function () {
      input.classList.toggle("process-loading");
   }

   h.onsuccess = function ( response ){
      var optionElm = [];
      switch (response.type) {
         case 'suggestion':

            if (response.option.length > 0) {
               var suggestBox = ElementBuild({tag: 'div', id:'suggest-box' });

               for (var i = 0; i < response.option.length; i++) {
                  (function (i) {
                     var optionElm = createListSuggestBox(response.option[i] , suggestBox);
                     addEventClickList( response.option[i] , optionElm , suggestBox , response.multiple );
                  }(i));
               }

               suggestBox.style.position = "absolute";
               suggestBox.style.textAlign = "left";
               suggestBox.style.left = h.offsetLeft + "px";
               suggestBox.style.minWidth = h.offsetWidth + "px";
               suggestBox.style.width = "-webkit-max-content";
               suggestBox.style.width = "-moz-max-content";
               input.parentNode.insertBefore(suggestBox, input.nextSibling);
            }
            break;
      }

   }

   h.onprogress = function ( evt ) {
      console.log(evt);
   }

   h.on = function ( eventPress ) {
      var myVar = null;

      var ajax = new hiccupAjax(h);

      switch ( eventPress ) {
         case 'keydown':
            input.addEventListener('keydown', function() {
               if (_('suggest-box')) _('suggest-box').parentNode.removeChild(_('suggest-box'));
               if (input.value.length > 0){
                  clearTimeout(myVar);
                  myVar = setTimeout(function(){
                     ajax.post();
                  }, 500);
               }
            });
            break;
         case 'keyup':
            input.addEventListener('keyup', function() {
               if (_('suggest-box')) _('suggest-box').parentNode.removeChild(_('suggest-box'));
               if (input.value.length > 0){
                  clearTimeout(myVar);
                  myVar = setTimeout(function(){
                     ajax.post();
                  }, 500);
               }
            });
            break;
         case 'change':
            input.addEventListener('change', function() {
               if (_('suggest-box')) _('suggest-box').parentNode.removeChild(_('suggest-box'));
               if (input.value.length > 0){
                  clearTimeout(myVar);
                  myVar = setTimeout(function(){
                     ajax.post();
                  }, 500);
               }
            });
            break;
         default:
      }

   }

   return h;
}

var hiccupOderController = function (elm) {
   var h = {}
      , dragSrcEl = null
      , method = elm.getAttribute('method');
   var divElm = elm.querySelectorAll("div[od-iddata]");

   h.URLsuccess = elm.getAttribute('od-success');
   h.URLtarget = elm.getAttribute('od-target');

   var ElementBuild = function ( element , inner ){
      var elm = document.createElement( element.tag );

      if (element.hasOwnProperty("id")) elm.setAttribute("id", element.id);
      if (element.hasOwnProperty("class")) elm.setAttribute("class", element.class);

      if (inner) elm.innerHTML = inner;

      return elm;
   }

   var createOverlay = function ( text , delayTime ) {
      var overlay_child = ElementBuild({ "tag" : "div" , "class" : "hiccup-modal-box-inside" }, text)
         , overlay = ElementBuild({ "tag" : "div" , "class" : "hiccup-modal-box" });

      overlay.appendChild(overlay_child);

      document.body.insertBefore(overlay, document.body.firstChild);

      var closeElement = setTimeout( function () {
         overlay.parentNode.removeChild(overlay);
      }, delayTime);
   }

   h.getValPost = function () {
      var inputElm = ""
         , obj = [];

      for (var i = 0; i < divElm.length; i++) {
         var id = divElm[i].getAttribute("od-iddata");
         var newOrderNum = i + 1;
         obj.push({ 'id': id, 'orderNum': newOrderNum});
      }

      inputElm = "orderingValue=" + JSON.stringify(obj);

      return inputElm;
   }

   h.scan = function () {
      [].forEach.call(divElm, function(col) {
         col.setAttribute('draggable', true);
         col.addEventListener('dragstart', h.handleDragStart , false);
         col.addEventListener('dragstart', h.handleDragStart, false);
         col.addEventListener('dragenter', h.handleDragEnter, false);
         col.addEventListener('dragover', h.handleDragOver, false);
         col.addEventListener('dragleave', h.handleDragLeave, false);
         col.addEventListener('drop', h.handleDrop, false);
         col.addEventListener('dragend', h.handleDragEnd, false);
      });
   }

   h.handleDragStart = function (e){
      this.style.opacity = '0.4';

      dragSrcEl = this;

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
      e.dataTransfer.setData('od-iddata', this.getAttribute('od-iddata'));
   }

   h.handleDragOver = function (e) {
      if (e.preventDefault) {
         e.preventDefault();
      }

      e.dataTransfer.dropEffect = 'move';

      return false;
   }

   h.handleDragEnter = function (e) {
      this.classList.add('over');
   }

   h.handleDragLeave = function (e) {
      this.classList.remove('over');
   }

   h.handleDrop = function (e) {
      var caList = [];

      if (e.stopPropagation) {
         e.stopPropagation();
      }

      if (dragSrcEl != this) {
         for (var i = 0; i < divElm.length; i++) {
            var id = divElm[i].getAttribute('od-iddata')
               , content = divElm[i].innerHTML;
            caList.push({'id': id , 'content': content , 'elm': divElm[i]});
         }

         var sourceChange = false
            , targetChange = false;

         for (var i = 0; i < caList.length; i++) {
            if (caList[i].id === this.getAttribute('od-iddata') && !sourceChange) {

               caList[i].elm.setAttribute('od-iddata', e.dataTransfer.getData('od-iddata'));
               caList[i].elm.innerHTML = e.dataTransfer.getData('text/html');
               sourceChange = true;

            } else if (caList[i].id === e.dataTransfer.getData('od-iddata') && (i-1) >= 0 && !targetChange && sourceChange) {

               caList[i].elm.setAttribute('od-iddata', caList[i-1].id);
               caList[i].elm.innerHTML = caList[i-1].content;
               targetChange = true;

            } else if (caList[i].id === e.dataTransfer.getData('od-iddata') && (i+1) <= caList.length && !targetChange ) {

               caList[i].elm.setAttribute('od-iddata', caList[i+1].id);
               caList[i].elm.innerHTML = caList[i+1].content;
               targetChange = true;

            } else if (sourceChange && !targetChange) {

               caList[i].elm.setAttribute('od-iddata', caList[i-1].id);
               caList[i].elm.innerHTML = caList[i-1].content;

            } else if (!sourceChange && targetChange) {

               caList[i].elm.setAttribute('od-iddata', caList[i+1].id);
               caList[i].elm.innerHTML = caList[i+1].content;

            }
         }

         // dragSrcEl.innerHTML = this.innerHTML;
         // this.innerHTML = e.dataTransfer.getData('text/html');
         //
         // dragSrcEl.setAttribute('od-iddata', this.getAttribute('od-iddata'));
         // this.setAttribute('od-iddata', e.dataTransfer.getData('od-iddata'));
      }
      return false;
   }

   h.handleDragEnd = function (e) {
      [].forEach.call(divElm, function (col) {
         col.classList.remove('over');
         col.style.opacity = '1';
      });
   }

   h.onstart = function () {

   }

   h.onfinish = function () {

   }

   h.onsuccess = function ( response ){
      var success = ( "success" in response) ? response.success : true
         , delayTime = response.delayURL || 3000;

      if ( h.URLsuccess && success) {
         var url = h.URLsuccess;

         setTimeout( function () {
            window.location.href = url;
         }, delayTime);
      }

      switch (response.type) {
         case 'modal-box':
            createOverlay ( response.message , delayTime );
            break;
         case 'validation':
            break;
         case 'own-div':
            _( response.targetDiv ).insertAdjacentHTML( 'afterend', response.message );
            break;
         default:
            createOverlay( response );
      }
   }

   h.onprogress = function ( evt ) {
      console.log(evt);
   }

   h.onsubmit = function () {
      var ajax = new hiccupAjax(h);
      if (method === "POST" || method === 'post') {
         elm.addEventListener('submit' , function () {
            ajax.post();

            if(event.preventDefault) event.preventDefault()
            else event.returnValue = false;
         });
      } else if (method === "GET" || method === 'get') {
         elm.addEventListener('submit' , function () {
            ajax.get();

            if(event.preventDefault) event.preventDefault()
            else event.returnValue = false;
         });
      }
   }

   return h;
}

var scanHTML = function () {
   var form = document.querySelectorAll("form[fm-controller]")
      , input = document.querySelectorAll("input[in-controller]")
      , orderingDiv = document.querySelectorAll("form[od-controller]")
      , controllerForm = []
      , controllerInput = []
      , controllerOrder = []
      , ajax = [];

   for (var i = 0; i < form.length; i++) {
      controllerForm[i] = new hiccupFormController(form[i]);
      controllerForm[i].onsubmit();
   }

   for (var i = 0; i < input.length; i++) {
      controllerInput[i] = new hiccupInputController(input[i]);
      controllerInput[i].on('keyup');
   }

   for (var i = 0; i < orderingDiv.length; i++) {
      controllerOrder[i] = new hiccupOderController(orderingDiv[i]);
      controllerOrder[i].scan();
      controllerOrder[i].onsubmit();
   }
}

window.onload = function () {
   scanHTML();
}
