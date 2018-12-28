// start email validation
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validate() {
  var $result = $("#result");
  var email = $("#startEmail").val();
  $result.text("");
  if (validateEmail(email)) {
    $('#staticEmail').val( email );
    $("#reportModal").modal('show');
    $(".invalid-tooltip").css('display', 'none');
  } else {
    $(".invalid-tooltip").css('display', 'block');
  }
  return false;
}
$("#mainLeadFormSubmit").bind("click", validate);

// popovers Initialization
$(function () {
    $('[data-toggle="popover"]').popover()
});
$(document).ready(function() {
  $("#marketConsent").on('click', function() {
    var marketTest = $("#marketConsent").val();
    if (marketTest == "checked") {
      $("#marketConsent").val("unchecked");
    } else if (marketTest == "unchecked") {
      $("#marketConsent").val("checked");
    }
  });
  $("#serviceConsent").on('click', function() {
    var serviceTest = $("#serviceConsent").val();
    if (serviceTest == "checked") {
      $("#serviceConsent").val("unchecked");
    } else if (serviceTest == "unchecked") {
      $("#serviceConsent").val("checked");
    }
  });
});
$(document).ready(function() {
  $('#lookup_field').setupPostcodeLookup({
    api_key: 'ak_jnk3962aUM3A5dVoZcgSAAO90yegm',
    output_fields: {
      line_1: '#first_line',
      line_2: '#second_line',
      line_3: '#third_line',
      post_town: '#post_town',
      postcode: '#postcode',
      longitude: '#longitude',
      latitude: '#latitude'
    },
    button: "#find-button",
    input: "#postCodeInput",
    dropdown_class: 'form-control',
    onSearchCompleted: function (data) {
      if (data.code === 2000) {
        // success ID1 1QD
        var postCode = $("#postCodeInput").val();
        var pcTrim = $.trim(postCode);
        window.location.href = '/valuation-form?postcode=' + pcTrim.replace(/\s/g, '');
        console.log("Success!"+ JSON.stringify(data,2,2));
      } else if (data.code === 4040) {
        // Postcode does not exist ID1 KFA
        $("#successStatus")
          .prepend('<div class="invalid-tooltip"><i class="fas fa-exclamation-triangle"></i>Postcode can not be found, please try again."</div>');
      } else {
        $("#successStatus")
          .html("Some error occurred");
      }
    }
  });
});
// postcode search

$('#lookup_field').setupPostcodeLookup({
  api_key: 'ak_jnk3962aUM3A5dVoZcgSAAO90yegm',
  output_fields: {
    line_1: '#first_line',
    line_2: '#second_line',
    line_3: '#third_line',
    post_town: '#post_town',
    postcode: '#postcode',
    longitude: '#longitude',
    latitude: '#latitude'
  },
  button: "#find-button2",
  input: "#postCodeInput",
  dropdown_class: 'form-control',
  onAddressSelected: function() {
    $("#selectedAddress").slideDown('slow', function() {
    });
    $('#selectedAddress label').addClass('active');
    $("#leadSecTwo").css('display', 'block');
  },
  onSearchCompleted: function (data) {
    if (data.code === 2000) {
      // success ID1 1QD
      var postCode = $("#postCodeInput").val();
      var pcTrim = $.trim(postCode);
      console.log("Success!"+ JSON.stringify(data,2,2));
    } else if (data.code === 4040) {
      // Postcode does not exist ID1 KFA
      $("#successStatus")
        .prepend('<div class="invalid-tooltip"><i class="fas fa-exclamation-triangle"></i>Postcode can not be found, please try again."</div>');
    } else {
      $("#successStatus")
        .html("Some error occurred");
    }
  }
});
//  Contact Form submit
$("#contactSubmit").on('click', function(event) {
  event.preventDefault();
  var contactFirstName = $("#contactFirstName").val();
  var contactSurname = $("#contactSurname").val();
  var contactEmail = $("#contactEmail").val();
  var contactMessage = $("#contactMessage").val();
  var contactConsent = $("#contactConsent").length;
  if (contactConsent == "1") {
    var contactForm = {
      "fields": [
        {
          "name": "firstname",
          "value": contactFirstName
        },
        {
          "name": "lastname",
          "value": contactSurname
        },
        {
          "name": "email",
          "value": contactEmail
        },
        {
          "name": "message",
          "value": contactMessage
        },
        {
          "name": "contact_consent",
          "value": contactConsent
        }
      ]
    }
    $.ajax({
      url: 'https://api.hsforms.com/submissions/v3/integration/submit/5049561/e22448a3-0cac-424a-8415-27db1651d596',
      type: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(contactForm)
  })
  .done(function() {
    toastr["success"]("The team at mypropertyinsights will get back to you as soon as possible.", "Message sent")
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-full-width",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    console.log("DONE");
  });
}
else {
  console.log("consent not given");
}
});


// Main Form submit validation
var config = {
  form : '#mainLeadForm'
};
$.validate({
 modules : 'jsconf, security, toggleDisabled',
 onModulesLoaded : function() {
  $.setupValidation(config);
 }
});
// Main Form submit
$("#mainLeadFormSubmit").on('click', function(event) {
  var serviceConsentCheck = $("#serviceConsent").val();
  if (serviceConsentCheck = "unchecked") {
    $("#mainLeadFormSubmit").append('Please check before continuing.');
  } else {
    $("#mainLeadFormSubmit").attr('disabled', 'disabled');
  event.preventDefault();
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var email = $("#staticEmail").val();
  var addLine1 = $("#first_line").val();
  var addLine2 = $("#second_line").val();
  var addLine3 = $("#third_line").val();
  var town = $("#post_town").val();
  var postCode = $("#postcode").val();
  var marketConsent = $("#marketConsent").val();
  var serviceConsent = $("#serviceConsent").val();
  var longitude = $("#longitude").val();
  var latitude = $("#latitude").val();
    var theForm = {
      "fields": [
        {
          "name": "firstname",
          "value": firstName
        },
        {
          "name": "lastname",
          "value": lastName
        },
        {
          "name": "email",
          "value": email
        },
        {
          "name": "address_line_1",
          "value": addLine1
        },
        {
          "name": "address_line_2",
          "value": addLine2
        },
        {
          "name": "address_line_3",
          "value": addLine3
        },
        {
          "name": "town",
          "value": town
        },
        {
          "name": "post_code",
          "value": postCode
        },
        {
          "name": "marketing_consent",
          "value": marketConsent
        },
        {
          "name": "service_consent",
          "value": serviceConsent
        }
      ]
    }
    console.log(theForm);
    $.ajax({
      url: 'https://api.hsforms.com/submissions/v3/integration/submit/5049561/fa5be908-1bd4-48a2-9f03-56c749213bb3',
      type: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(theForm)
  })
    .done(function() {
      console.log("success");
      var database = firebase.database();
      var valuationPath = firebase.database().ref('valuation');
      var newValuation = valuationPath.push();

      newValuation.set({
          firstname: firstName,
          surname: lastName,
          email: email,
          add1 : addLine1,
          add2 : addLine2,
          add3 : addLine3,
          town : town,
          postcode : postCode,
          market : marketConsent,
          service : serviceConsent,
          long : longitude,
          lat : latitude,
          date: Date()
        })
        newValuation.on("child_added", function(data) {
          const valuationID = newValuation.key;
          console.log(valuationID);
          Cookies.set("valuation", valuationID);
          $("#reportModal").modal('hide');
          $("#reportReady").modal('show');
          setTimeout(reportAnimate, 15000);
        })
      })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }
});

function reportAnimate() {
  $('.flipper').addClass('flipped');
  $(".front").css('display', 'none');
  $(".back").css('display', 'inline-block');
};
// send to dashboard
$("#viewReportBtn").on('click', function() {
  event.preventDefault();
  var pageId = Cookies.get("valuation");
  window.location.href = '/dashboard?id=' + pageId;
});
// existing report
$(document).ready(function() {
  var existingReport = Cookies.get("valuation");
  console.log(existingReport);
  if (existingReport > "") {
    $("#basicExampleNav").append('<a class="nav-link btn btn-primary btn-sm waves-effect reportInNav" href="/dashboard?id=' + existingReport + '">Your Report</a>')
  }
   else {
    $("#basicExampleNav").append('<a class="nav-link btn btn-primary btn-sm waves-effect reportInNav" href="/valuation-form">Start Your Report</a>')
  }
});
// carry postcode to valuation form
$(document).ready(function() {
  var urlString = window.location.href;
  var url = new URL(urlString);
  var postCode = url.searchParams.get("postcode");
  if (postCode > "") {
    $("#postCodeInput").val(postCode).siblings('label').addClass('active');
    $("#find-button2").click();
    $("#selectedAddress label").addClass('active');
  }
});
$(document).ready(function() {
  var pageId = Cookies.get("valuation");
  if (pageId !== "") {
    $(".navbar-nav").append('<li class="nav-item"><a class="nav-link reportLink" href="/valuation?id=' + pageId + '">your report</a></li>')
  }
});
