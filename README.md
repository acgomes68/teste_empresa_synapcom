# synapcom
Teste de PHP RestFull

Listagem paginada com informações de veículos e as operações CRUD disponíveis.
Foram utilizadas as seguintes tecnologias:
- Apache 2.4.25;
- PHP 7.2.5
- MariaDB 10.1.26
- JQuery 3.3.1;
- Bootstrap 3.3.7
- Bootbox 4.4.0
- AJAX;
- REST;
- JSON;

Para configurar o ambiente para realização do teste seguir os seguintes passos:
- executar o arquivo script.sql em uma base de dados MySQL ou MariaDB;
- criar o virtual host apontando para a raiz onde está o arquivo index.html;
- confirmar as informações de conexão a base de dados no arquivo api/config/database.php
- verificar se o resultado da variável $home_url está retornando corretamente no arquivo api/config/core.php
- para acessar no navegador basta apontar para o virtual host criado;

OBS.: AS BIBLIOTECAS SÃO UTILIZADAS VIA CDN, PORTANTO, É NECESSÁRIO ACESSO A INTERNET.

