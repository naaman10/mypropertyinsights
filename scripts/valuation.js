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
  });
});
