#### PolicyDb

Como sugerido no desafio, o banco de dados poderia ser flat-file. Por isso, decidi utilizar o _SQLite_ para gerar um único arquivo _.sqlite3_ em uma pasta acima do escopo das APIs, de modo que ambas pudessem acessá-lo.

As tabelas do banco de dados são definidas na migration do config_backend.

É necessário fazer um seed com um arquivo _.json_ pré-configurado no `config_backend`. As instruções estão no início desse README.
