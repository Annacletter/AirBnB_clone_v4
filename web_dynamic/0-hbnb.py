#!/usr/bin/python3

"""
AirBnB-inspired Flask App
"""

from flask import Flask, render_template, url_for
from models import storage
from uuid import uuid4

# Flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


# Custom teardown function
@app.teardown_appcontext
def teardown_db(exception):
    """
    Closes the current SQLAlchemy Session after each request
    """
    storage.close()


# Route for custom template with states, cities & amenities
@app.route('/0-hbnb/')
def hbnb_filters(the_id=None):
    """
    Renders a custom template with states, cities, and amenities
    """
    state_objs = storage.all('State').values()
    states = dict([state.name, state] for state in state_objs)
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    cache_id = uuid4()
    return render_template('0-hbnb.html',
                           states=states,
                           amens=amens,
                           places=places,
                           users=users,
                           cache_id=cache_id)

if __name__ == "__main__":
    """
    Main entry point for the Flask App
    """
    app.run(host=host, port=port)

