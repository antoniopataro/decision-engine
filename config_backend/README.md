#### ConfigBackend

Utilizei Python, como recomendado no desafio, com Django + Django REST Framework pra facilitar a criação de uma API simples. Foi o meu primeiro contato com Python para APIs.

Criei o modelo _Policy_ com os campos 'id' e 'nodes'. Como o desafio se importa com apenas uma _Policy_, é utilizado um id default, 'default' pelo `config_frontend`.

Esse modelo compõe a única tabela do banco de dados, o `policy_db`, sob o qual as ações das views podem fazer efeito.

O `config_frontend` deve ser capaz de realizar READ para exibição da _Policy_ e UPDATE para alterar a _Policy_ (seus 'nodes').

O `execution_engine` deve ser capaz de realizar READ para ler o estado atual da _Policy_ (seus 'nodes') para calcular uma 'decision'.

Endpoints:

- GET: `/api/policy/<id>` <sub>Retorna uma policy com base no id.</sub>
- PATCH: `/api/policy/<id>/update` <sub>Altera uma policy com base no id e nos dados passados pelo body.</sub>
