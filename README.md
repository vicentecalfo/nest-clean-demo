# Introdução
**Trabalho em desenvolvimento!**

A aplicação desenvolvida usando o *framework* [NestJS](https://docs.nestjs.com/).

# Banco de dados
**O Docker é necessário para configuração do ambiente do banco de dados.**

Comando para iniciar os containers: `npm run start:db`

Comando para parar os containers: `npm run stop:db`

Comando para remover os containers: `npm run remove:db`

Existe um container executando na porta 8080 , é o [adminer](https://hub.docker.com/_/adminer) para serve para auxiliar o gerenciamento de bando de dados via interface gráfica. Endereço de acesso ao *adminer*: http://localhost:8080.

Dados de acesso no *adminer*:
* Sistema: PostgreSQL;
* Servidor: nestjs-clean-demo-pg (é o nome do container);
* Usuário: pguser;
* Senha: pgpassword.

**Todos esses dados estão no arquivo `docker-compose.yml`.**

O nome do banco de dados usado na aplicação é `nestjs-clean-demo` (você pode alterá-lo no arquivo `.dev.env`). Você deverá criar o banco assim que acessar o *adminer*.