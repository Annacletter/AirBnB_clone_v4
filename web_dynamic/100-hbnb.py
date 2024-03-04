#!/usr/bin/python3
"""
Welcome to the AirBnB Flask Extravaganza!

Behold the magnificence of this Flask App, seamlessly integrating with
the AirBnB static HTML Template.

Witness the elegance of our code as it orchestrates a symphony of states,
cities, and amenities.

Marvel at the wonders of Flask as it gracefully renders the 4-hbnb.html
template, bringing harmony to the chaos.

Prepare to be enchanted as we traverse the realms of SQLAlchemy, gracefully
closing sessions after each request.

Let your imagination soar as we embark on this journey of creativity
and innovation!

Hold your breath as we unleash the power of Flask upon the world!

"""

from flask import Flask, render_template, url_for
from models import storage
from uuid import uuid4

# Flask Setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


# Begin the magical rendering of Flask pages
@app.teardown_appcontext
def teardown_db(exception):
    """
    After each request, this method calls .close() (i.e. .remove()) on
    the current SQLAlchemy Session
    """
    storage.close()


@app.route('/100-hbnb')
def hbnb_filters(the_id=None):
    """
    Handles requests to a custom template with states, cities, and amenities
    """
    state_objs = storage.all('State').values()
    states = dict([state.name, state] for state in state_objs)
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    cache_id = uuid4()
    return render_template('100-hbnb.html',
                           states=states,
                           amens=amens,
                           places=places,
                           users=users,
                           cache_id=cache_id)


if __name__ == "__main__":
    """
    Behold, the MAIN Flask App! Prepare for the grandeur of our creation!
    """
    app.run(host=host, port=port)
