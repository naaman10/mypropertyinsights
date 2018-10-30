$(document).ready(function() {
  var urlString = window.location.href;
  var url = new URL(urlString);
  var valuationId = url.searchParams.get("id");
  var reportRef = firebase.database().ref('valuation/' + valuationId);
  reportRef.on('value', function(snapshot) {
    $("#addLine1").text(snapshot.val().add1);
    $("#addLine2").text(snapshot.val().add2);
    $("#addLine3").text(snapshot.val().add3);
    $("#town").text(snapshot.val().town);
    $("#postcode").text(snapshot.val().postcode);
    var postcode = snapshot.val().postcode;
    console.log(postcode);
    var dataProp = $.ajax({
      url: 'https://api.propertydata.co.uk/prices?key=ZWEMVOCUO2&postcode=' + postcode + 'bedrooms=3',
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      async : true,
      headers : {
        'Access-Control-Allow-Origin' : '*',
        "cache-control": "no-cache"
      },
      processData: false
    })
    .done(function() {
      console.log("success");
      console.log(dataProp);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });



  });
});
