// add scripts

$(document).on('ready', function() {
  $('#success-message').hide();
  $('#failure-message').hide();
  getPuppies();
});

$('form').on('submit', function(event) {
  event.preventDefault();
  var puppyName = $('#puppy-name').val();
  var puppyAge = $('#puppy-age').val();
  var puppyID = $('#puppy-id').val();
  postPuppies(puppyID, puppyName, puppyAge);
});

function postPuppies(puppyID, puppyName, puppyAge) {
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
    $('#results').html('');
    getPuppies();
  });

  results.fail(function(err) {
    $('#failure-message').show().html(err.responseJSON);
    $('#success-message').hide();
  });
};

function getPuppies() {
  var results = $.ajax({
    method: 'GET',
    url: "/api/v1/puppies",
  });
  results.done(function(results){
    results.forEach(function(puppy){
    $('#results').append('<p><a href="/puppy/' + puppy.puppyID + '">' + puppy.puppyName + '</a></p>')
    })
  });
  results.fail(function(err){
    console.log(err)
  });
};
