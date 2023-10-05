#### About
I used Python, as recommended in the challenge, with Django + Django REST Framework to facilitate the creation of a simple API. It was my first contact with Python for APIs.

I created the _Policy_ model with the 'id' and 'nodes' fields. As the challenge only cares about one _Policy_, a default id 'default' is used by `config_frontend`.

This model makes up the only table in the database, `policy_db`, under which view actions can take effect.

The `config_frontend` must be able to perform READ to display the _Policy_ and UPDATE to change the _Policy_ (its 'nodes').

#### Endpoints:
- GET: `/api/policy/<id>` <sub>Returns a policy based on id.</sub>
- PATCH: `/api/policy/<id>/update` <sub>Changes a policy based on the id and data passed by the body.</sub>
