# App React e Nodejs

## Instruções para configuração

clonar o projeto

cd app_react_node

## Rodar o npm install no diretorio do server

cd server

npm install

## Copiar as variaveis de ambiente do server

cp .env.example .env

## Subindo os containers

entrar no diretorio raiz do projeto app_react_node

executar: docker-compose build

aguardar enquanto baixa as imagens

após terminar executar: docker-compose up -d

Quando os containers estiverem todos ativos testar a aplicação em:

http://localhost:3000/

## PhpMyAdmin

http://localhost:8080/index.php

usuario: sampleuser

senha: samplepassword

## API

Exemplo de um get para listar usuarios: http://localhost:8000/users
