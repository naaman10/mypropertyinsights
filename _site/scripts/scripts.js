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
    $(".invalid-feedback").css('display', 'none');
  } else {
    $(".invalid-feedback").css('display', 'block');
  }
  return false;
}

$("#reportStart").bind("click", validate);


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
  button: "#find-button",
  input: "#postCodeInput",
  dropdown_class: 'form-control',
  onAddressSelected: function() {
    $("#selectedAddress").slideDown('slow', function() {
    });
  }
  // onSearchCompleted: function (data) {
  //   if (data.code === 2000) {
  //     // Success ID1 1QD
  //     $("#successStatus")
  //       .html("Success!"+ JSON.stringify(data,2,2));
  //   } else if (data.code === 4040) {
  //     // Postcode does not exist ID1 KFA
  //     $("#successStatus")
  //       .html("Postcode does not exist!");
  //   } else {
  //     $("#successStatus")
  //       .html("Some error occurred");
  //   }
});

// Form submit
$("#mainLeadFormSubmit").on('click', function(event) {
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
  if (serviceConsent = true) {
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
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }
});
