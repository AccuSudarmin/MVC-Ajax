var def = function ( form , target , action ) {
    var test = new ajax(form);

    test.post( action , function(cb) {
      alert(cb);
      // window.location.href = target;

    });
}
