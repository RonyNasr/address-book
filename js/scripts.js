//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(street,city, state,type) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.type = type;
}

Address.prototype.fullAddress = function() {
  return this.type + " : " + this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
  $(".new-address").not(".main-address").hide();
}

var newAddress = function(){
  return ('<div class="new-address">' +
                              '<div class="form-group">' +
                                '<label for="new-type">Type</label>' +
                                '<select class="form-control new-type">'+
                                  '<option value="home">Home</option>' +
                                  '<option value="office">Office</option>' +
                                  '<option value="other">Other</option>' +
                                '</select>' +
                              '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-street">Street</label>' +
                                 '<input type="text" class="form-control new-street">' +
                               '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-city">City</label>' +
                                 '<input type="text" class="form-control new-city">' +
                               '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-state">State</label>' +
                                 '<input type="text" class="form-control new-state">' +
                               '</div>' +
                             '</div>');
}



// user interface logic
$(document).ready(function() {
  // add address
  $("#add-address").click(function() {
    $("#new-addresses").append(newAddress());
    $("#add-address").keypress();
  });

  $("#new-first-name").keypress(function() {
    console.log( "Handler for .keypress() called." );
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    if (inputtedFirstName && inputtedLastName) {
      var newContact = new Contact(inputtedFirstName, inputtedLastName);
    }else {
      alert("please enter a name.")
    }
    $(".new-address").each(function() {
      var inputtedType = $(this).find("select.new-type :selected").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState,inputtedType)
      if (inputtedType && inputtedStreet && inputtedCity && inputtedState) {
        newContact.addresses.push(newAddress);
      }
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
    // $("#contact").("li").hover()

    $(".contact").last().click(function() {
      $("#show-contact").show().hover(function() {
        $( this ).fadeOut( 100 );
        $( this ).fadeIn( 500 );
      });
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    resetFields();
  });
});
