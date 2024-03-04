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
    const selectedStates = [];
    const selectedCities = [];

    // Listen to changes on each input checkbox tag
    $('input[data-type="state"]').each(function () {
      if ($(this).is(':checked')) {
        selectedStates.push({
          id: $(this).data('id'),
          name: $(this).data('name')
        });
      }
    });

    $('input[data-type="city"]').each(function () {
      if ($(this).is(':checked')) {
        selectedCities.push({
          id: $(this).data('id'),
          name: $(this).data('name')
        });
      }
    });

    // Update the h4 tag inside the div Locations with the list of States or Cities checked
    const locationsH4 = $('.locations h4');
    locationsH4.text('States: ' + JSON.stringify(selectedStates) + ', Cities: ' + JSON.stringify(selectedCities));

    // Make a new POST request to places_search with the list of Amenities, Cities, and States checked
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.values(AmeId),
        states: selectedStates,
        cities: selectedCities
      }),
      success: function (data) {
        const placesSection = $('.places');
        placesSection.empty();

        for (const place of data) {
          placesSection.append('<article>' + place.name + '</article>');
        }
      }
    });
  });

  // New magical function to toggle show/hide reviews
  $('span#toggleReviews').click(function () {
    const reviewsSection = $('.reviews');
    const buttonText = $(this).text().trim();

    if (buttonText === 'show') {
      // Fetch, parse, and display reviews
      $.get('http://0.0.0.0:5001/api/v1/places/' + placeId + '/reviews', function (data) {
        // Process the reviews data and display them
        // ...

        // Change the text to "hide"
        $(this).text('hide');
      });
    } else {
      // Hide reviews by removing all review elements from the DOM
      reviewsSection.empty();

      // Change the text to "show"
      $(this).text('show');
    }
  });
});
