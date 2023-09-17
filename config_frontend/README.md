#### ConfigFrontend

Como não havia especificação quanto às tecnologias a serem usadas no `config_frontend`, me senti mais confortável utilizando Typescript com `react`.

A aplicação realiza uma requisição ao `config_backend` para buscar a _Policy_ com o id 'default', salvando-a em um estado. Nesse momento, um outro estado é criado, o qual gerencia os 'nodes' vistos pelo usuário na tela principal "/". Isso serve para desacoplar os 'nodes' que vieram da request das alterações do usuário, além de permitir uma tratativa de outros tipos de 'nodes', como o de 'output' e de 'start', e uma deep-comparision de forma simplificada, utilizando `JSON.stringify()`, para verificar se há alterações passíveis de deploy. Tanto a _Policy_ quanto os 'nodes' são expostos via a `ContextAPI` do `react`, favorecendo um fácil acesso a essas informações em qualquer nível da aplicação sob os seus providers.

Escolhi o `tailwindcss` como biblioteca de estilização devido à sua praticidade e somei isso ao `clsx` e ao `tailwind-merge` para ter flexibilidade nos componentes quando necessário.
Ainda quanto à UI, criei componentes-base na pasta `components/`, componentes extras por feature nas pastas `pieces/` e utilizei o `react-beautiful-dnd` para fazer a feature de drag-and-drop de forma simples.

OBS: Às vezes, o comportanento do componente de 'select' para 'criteria' nos 'decision-nodes' é inesperado devido ao z-index. Pode-se usar ['portals'](https://legacy.reactjs.org/docs/portals.html) para solucionar isso.
