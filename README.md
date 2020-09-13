# API-REST-SIMPLES
Criação de API simples com o Node.js e o Express. O projeto utiliza autenticação JWT e o frontend utiliza o framework Bulma.
Exitem duas pastas no projeto:
 - **Producer:** contém a API REST que fornece informações sobre games;
 - **Consumer:** aplicação que consome os dados da API REST.
# Instalação
```sh
$ cd Producer
$ npm install
$ cd ../Consumer
$ npm install
```
# Execução
```sh
$ cd Producer
$ node index.js
$ cd ../Consumer
$ node index.js
```
A API REST funciona em http://localhost:8000 e o consumidor funciona no endereço http://localhost:8050. O usuário padrão é **admin** com senha **123456**.
