// add scripts

$(document).on('ready', function() {
  $('#success-message').hide();
  $('#failure-message').hide();
});

$('form').on('submit', function(event) {
  event.preventDefault();
  var puppyName = $('#puppy-name').val();
  var puppyAge = $('#puppy-age').val();
  var puppyID = $('#puppy-id').val();
  getDogs(puppyID, puppyName, puppyAge);
});

function getDogs(puppyID, puppyName, puppyAge) {
  var results = $.ajax({
    method: 'POST',
    url: "/api/v1/puppies",
    data: {
      puppyID: puppyID,
      puppyName: puppyName,
      puppyAge: puppyAge
    }
  });

  results.done(function(results) {
    //render something to the dom
    $('#puppy-name').val('');
    $('#puppy-age').val('');
    $('#puppy-id').val('');
    $('#success-message').show().html(results.message);
  });

  results.fail(function(err) {
    $('#failure-message').show().html(err.responseJSON);
    $('#success-message').hide();
  });
};
