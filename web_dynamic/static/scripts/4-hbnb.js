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
      TagH4.text(lista);
    } else {
      TagH4.text('');
    }
  });

  // New magical function to make a POST request when the button is clicked
  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.values(AmeId) }),
      success: function (data) {
        const placesSection = $('.places');
        placesSection.empty();

        for (const place of data) {
          placesSection.append('<article>' + place.name + '</article>');
        }
      }
    });
  });
});

