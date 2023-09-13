#### ConfigFrontend

Como não havia especificação quanto às tecnologias a serem usadas no `config_frontend`, me senti mais confortável utilizando Typescript com `react`.

A aplicação realiza uma requisição ao `config_backend` para buscar a _Policy_ com o id 'default', salvando-a em um estado. Nesse momento, um outro estado é criado, o qual gerencia os 'nodes' vistos pelo usuário na tela principal "/". Isso serve para desacoplar as 'decisions' que vieram da request das alterações do usuário, além de permitir uma tratativa de outros tipos de 'nodes', como o de 'END' e de 'START', e uma deep-comparision de forma simplificada, utilizando `JSON.stringify()`, para verificar se há alterações passíveis de deploy. Tanto a _Policy_ quanto os 'nodes' são expostos via a `ContextAPI` do `react`, favorecendo um fácil acesso a essas informações em qualquer nível da aplicação sob os seus providers.

Escolhi o `tailwindcss` como biblioteca de estilização devido à sua praticidade e somei isso ao `clsx` e ao `tailwind-merge` para ter flexibilidade nos componentes quando necessário.
Ainda quanto à UI, criei componentes-base na pasta `components/`, componentes extras por feature nas pastas `pieces/` e utilizei o `@dnd-kit` para fazer a feature de drag-and-drop de forma simples.

A aplicação é simples e carece de coisas importantes em projetos que se estenderiam, como rotas, um gerenciador de estados globais mais avançado e uma arquitetura bem definida. Entretanto, vai de encontro com o propósito do desafio.
