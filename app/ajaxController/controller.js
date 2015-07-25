var default = function ( form , target , action ) {
    var ajax = new ajax(form);

    ajax.post( target , function(cb) {
      window.location(action);
    })
}
