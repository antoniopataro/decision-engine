<sub>OBS: Não entendi muito bem se o(s) README(s) deveria(am) estar em inglês. Por isso, deixei toda essa parte em português mesmo.</sub>

#### Pressupostos

Uma única coisa não soou clara para mim: como o 'node' de END, pelo `config_frontend` tem um valor alterável, o que acontece com a tomada de decisão do `execution_engine` quando o 'output' deve ser `{ decision: false }`, por exemplo?

Assumi que toda a ordem de verificação também deveria ser invertida.

Tomei esse caminho, pois acredito não fazer sentido uma _Policy_ que sempre retorna `false`. Assim, quando o output dado pelo 'node' de saída for o de retornar `false`, quaisquer 'nodes' de decisão cujas verificações retornem `true` farão com que o execute interrompa a sua execução, retornando `true`.

#### Instruções

Para rodar o projeto de forma rápida, siga os passos abaixo:

1. Certifique-se de ter o [Node](https://nodejs.org/en) (v16.20.0) e o [Python](https://www.python.org/downloads/) (v3.10.12) instalados globalmente no seu computador;
2. Execute, em uma linha de comando, `git clone git@github.com:antoniopataro/execution-engine.git` seguido de `cd execution-engine`;
3. Abra três terminais. Certifique-se de que eles estão no path do projeto. Rode:
   1. `sh t_config_backend.sh` no primeiro terminal (config_backend);
   1. `sh t_config_frontend.sh` no segundo terminal (config_frontend);
   1. `sh t_execution_engine.sh` no terceiro terminal (execution_engine);

<details>
  <summary>Algo deu errado? Tente a instalação manual.</summary>

1. Certifique-se de ter o [Node](https://nodejs.org/en) (v16.20.0) e o [Python](https://www.python.org/downloads/) (v3.10.12) instalados globalmente no seu computador. Dependendo da sua instalação, pode haver o path `python3` ao invés de `python`. Caso seja o caso, troque, em todas as ocorrências das instruções abaixo, `python` por `python3`;
2.  Execute em uma linha de comando `git clone git@github.com:antoniopataro/execution-engine.git` seguido de `cd execution-engine`;
3.  Execute três instâncias de terminais, um para cada peça chave do projeto;
4.  No primeiro, execute `cd config_backend` para acessar o conteúdo do ConfigBackend e rode:
    1. `python -m pip install -r requirements.txt` para instalar as dependências com o `pip`;
    2. `python manage.py makemigrations` para gerar as migrations do banco de dados;
    3. `python manage.py migrate` para executar as migrations;
    4. `python manage.py seed` para popular o banco com um seed pré-configurado;
    5. `python manage.py runserver` para iniciar o servidor da API na porta 7001.
5.  No segundo, execute `cd config_frontend` para acessar o conteúdo do ConfigFrontend e rode: 2. `npm install` para instalar as dependências necessárias; 3. `npm run build` para compilar o projeto em um build estável; 4. `npm run preview` para instanciar o servidor de visualização da build utilizado pelo Vite, disponível na porta 7002.
6.  No terceiro, execute `cd execution_engine` para acessar o conteúdo do ExecutionEngine e rode:
    1. `python -m pip install -r requirements.txt` para instalar as dependências com o `pip`;
    2. `python manage.py runserver` para iniciar o servidor da API na porta 7003,

Para utilizar as features do projeto, comece pelo `config_frontend`, pelo navegador, em localhost:7002. Alterações a _Policy_ default e faça deploy. Teste o deploy com um POST (via cURL ou algum client http) no endpoint `/api/execute` do `execution_engine`, com um body conforme a descrição do desafio.

</details>

#### Testes

Todas as aplicações tem testes unitários, para rodar:

- `config_backend`: `python manage.py test`;
- `config_frontend`: `npm run test -- --coverage --watchAll`;
- `execution_engine`: `python manage.py test`;
