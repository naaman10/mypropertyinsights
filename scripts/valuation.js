$(document).ready(function() {
  var urlString = window.location.href;
  var url = new URL(urlString);
  var valuationId = url.searchParams.get("id");
  var reportRef = firebase.database().ref('valuation/' + valuationId);
  var externalDataRef = firebase.database().ref('valuation/' + valuationId + '/externalData');
  console.log(externalDataRef);
  reportRef.on('value', function(snapshot) {
    $("#addLine1").text(snapshot.val().add1);
    $("#addLine2").text(snapshot.val().add2);
    $("#addLine3").text(snapshot.val().add3);
    $("#town").text(snapshot.val().town);
    $("#postcode").text(snapshot.val().postcode);
  });
  externalDataRef.on('value', function(snapshot) {
    $("#valPriceLow").text("£" + snapshot.val().flat.average);
    $("#valPriceMed").text("£" + snapshot.val().terraced.average);
    $("#valPriceHigh").text("£" + snapshot.val().detached.average);
  });
  reportRef.on('value', function(snapshot) {


    var googleLink = 'https://www.google.com/maps/embed/v1/search?q=estate%20agents%20' + snapshot.val().town + '&key=AIzaSyBOfpuijnbCIdnygUY5hUlB4VbN1YHyuQQ';
    $("#estateAgentsMap").html('<iframe height="450" frameborder="0" style="border:0" src="' + googleLink + '" allowfullscreen></iframe>');
  })
});
