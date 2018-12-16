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
});
