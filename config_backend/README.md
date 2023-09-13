#### ConfigBackend

Utilizei Python, como recomendado no desafio, com Django + Django REST Framework pra facilitar a criação de uma API simples. Foi o meu primeiro contato com Python para APIs.

Criei dois modelos, _Decision_ e _Policy_. Como o desafio se importa com apenas uma _Policy_, defini um id 'default', um campo 'decisions', onde temos uma lista de decisões que compõem a nossa _Policy_, e um campo 'output' que dita a direção da decisão da _Policy_.

Esses modelos compõem as tabelas do banco de dados, o `policy_db`, sob o qual as ações das views podem fazer efeito.

O `config_frontend` deve ser capaz de realizar READ para exibição da _Policy_ e UPDATE para alterar a _Policy_ (suas 'decisions' e, eventualmente, 'output').

O `execution_engine` deve ser capaz de realizar READ para ler o estado atual da _Policy_ (suas 'decisions' e 'output') para calcular uma 'decision'.

Endpoints:

- GET: `/api/policy/<id>` <sub>Retorna uma policy com base no id.</sub>
- PATCH: `/api/policy/<id>/update` <sub>Altera uma policy com base no id e nos dados passados pelo body.</sub>
