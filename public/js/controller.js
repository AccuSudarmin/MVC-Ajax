var def = function ( form , target , action ) {
    var test = new ajax(form);

    test.post( action , function(cb) {
      window.location.href = target;
    });
}
