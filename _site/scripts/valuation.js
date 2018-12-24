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
  });
  $("main").load('/dashboard/valuation.html');
  $(".navbar").addClass('fixed-top');
  $(".navbar").css('backgroundColor', 'white');
  $("body").css('paddingTop', '55px');
  $(".nav-link").on('click', function(event) {
    event.preventDefault();
    var clickTab = $(this).data('name');
    $("main").load('/dashboard/' + clickTab + '.html');
    $(".nav-link.active").toggleClass('active');
    $(this).toggleClass('active');
  });
  $(".menuFab").on('click', function(event) {
    event.preventDefault();
    $(".mobileMenuVal").toggleClass('active');
  });
  $(".menuBody").on('click', function(event) {
    event.preventDefault();
    $(".mobileMenuVal").toggleClass('active');
  });
  $(".btn-link").attr('href', 'mailto:?subject=mypropertyinsisghts%20Dashboard&body=' + urlString);
});
