// This magical function is the guardian of our amenities, making sure they're all in check.
$(document).ready(function () {
  // Behold, the mystical AmeId object, where all the magic happens!
  const AmeId = {};

  // Each click unveils a world of possibilities!
  $('input[type=checkbox]').click(function () {
    if ($(this).is(':checked')) {
      AmeId[$(this).data('name')] = $(this).data('id');
    } else {
      delete AmeId[$(this).data('name')];
    }
    const TagH4 = $(this).closest('.amenities').find('h4');
    const lista = Object.keys(AmeId);
    if (lista.length > 0) {
      TagH4.text(lista.join(', '));
    } else {
      TagH4.text('');
    }
  });

  // Request to update the API status dynamically
  function updateApiStatus() {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      const apiStatusDiv = $('#api_status');

      if (data.status === 'OK') {
        apiStatusDiv.addClass('available');
      } else {
        apiStatusDiv.removeClass('available');
      }
    });
  }

  // Initial call to update API status
  updateApiStatus();

  // Schedule periodic updates every 5 seconds (adjust as needed)
  setInterval(updateApiStatus, 5000);
});
