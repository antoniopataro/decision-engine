<sub>Credits to [David Reis](https://www.linkedin.com/in/davidreisbr/) for the awesome challenge. Had a lot of fun doing it.</sub>

#### Assumptions

1. If the decision tree doesn't match any output node, the execution should return an error.

#### Instructions

To set it up quickly, follow allong:

1. Make sure you have [Node](https://nodejs.org/en) (v16.20.0) and [Python](https://www.python.org/downloads/) (v3.10.12) installed globally on your machine;
2. Run, in a command line, `git clone git@github.com:antoniopataro/decision-engine.git` followed by `cd decision-engine`;
3. Open three terminals. Make sure they are in the project's path. Run:
   1. `sh t_config_backend.sh` on the first one (config_backend);
   1. `sh t_config_frontend.sh` on the second one (config_frontend);
   1. `sh t_execution_engine.sh` on the third one (execution_engine);

<details>
<summary>Something went wrong? Try installing it manually.</summary>

1. Make sure you have [Node](https://nodejs.org/en) (v16.20.0) and [Python](https://www.python.org/downloads/) (v3.10.12) installed globally on your machine; Depending on your installation, you might have the path `python3` instead of `python`. If that's the case, replace, in all occurrences below, `python` with `python3`;
2. Run, in a command line, `git clone git@github.com:antoniopataro/decision-engine.git` followed by `cd decision-engine`;
3. Open three terminals. Make sure they are in the project's path. Run:
4. On the first one, `cd config_backend` to access the ConfigBackend, then:
   1. `python -m pip install -r requirements.txt` to install its dependencies with `pip`;
   2. `python manage.py makemigrations` to generate all database migrations;
   3. `python manage.py migrate` to run all generated database migrations;
   4. `python manage.py seed` to populate the database with a predefined seed;
   5. `python manage.py runserver` to run it locally on port 7001.
5. On the second one, `cd config_frontend` to access the ConfigFrontend, then:
   1. `npm install` to install its dependencies with `npm`;
   2. `npm run build` to compile the project on a stable build; 
   3. `npm run preview` to start a local preview server used by Vite on port 7002.
6. On the second one, `cd execution_engine` to access the ExecutionEngine, then:
   1. `python -m pip install -r requirements.txt` to install its dependencies with `pip`;
   2. `python manage.py runserver` to run it locally on port 7003,
</details>

To use the project's features, start with the `config_frontend`, in the browser, at localhost:7002. Make changes to the default _Policy_ and deploy. Test the deployment with a POST (via cURL or some http client) on the `/api/execute` endpoint of the `execution_engine`, with a body like:

```json
{
  "age": 23,
  "income": 3000
}
```

#### Tech
- axios;
- django;
- djangorestframework;
- lodash;
- lucide-react (icons);
- python;
- react;
- react-beautiful-dnd;
- react-hot-toast;
- sqlite (flat-file db);
- tailwindcss with clsx and tailwind-merge;
- uuid.

#### Tests

All applications have unit tests, to run them:
- `config_backend`: `python manage.py test`;
- `config_frontend`: `npm run test -- --coverage --watchAll`;
- `execution_engine`: `python manage.py test`;
