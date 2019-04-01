// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devour-burger").on("click", function(event) {
    var id = $(this).data("id");
    var newdevour = true;

    var newDevouredState = {
      devoured: newdevour
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("Changed devoured to", newdevour);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $(".customerTitle").removeClass("blink_me");
    if ($("#burg").val().trim() === "") return;

    $.ajax("/api/customers", {
      type: "GET",
    }).then(
      function (customers) {
        if (customers.length > 0) {
          $.ajax("/api/lastCustomer", {
            type: "GET"
          }).then(function (customer) {
            console.log(customer);
            var newBurger = {
              name: $("#burg").val().trim(),
              CustomerId: customer.id
            };
            // Send the POST request.
            $.ajax("/api/burgers", {
              type: "POST",
              data: newBurger
            })
              .then(
                function () {
                  console.log("Created new burger");
                  // Reload the page to get the updated list
                  location.reload();
                }
              );
          })

        }
        else {
          $("#customer").attr("placeholder", "You need a customer...");
          $(".customerTitle").addClass("blink_me");
        }
      }
    );

  });

  $(".create-customer").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
     $(".customerTitle").removeClass("blink_me");
    if ($("#customer").val().trim() === "") return;

    var newCustomer = {
      name: $("#customer").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/customers", {
      type: "POST",
      data: newCustomer
    })
    .then(
      function() {
        console.log("Created new customer");
        $(".customerName").text($("#customer").val().trim());
        $("#customer").val("");
        $("#customer").attr("placeholder", "Customer changed");
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("Deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
