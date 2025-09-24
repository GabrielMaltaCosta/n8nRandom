# n8n + Custom Node (Random Number API)

Este projeto configura um ambiente **n8n** em contêiner Docker com PostgreSQL e inclui um **Custom Node** que consome a API do [random.org](https://www.random.org/).  
O Node recebe dois números (`min` e `max`) definidos pelo usuário e retorna um número aleatório.
## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado  
- [Docker Compose](https://docs.docker.com/compose/install/) instalado  
- Porta **5678** livre na máquina  

## Configuração

Ao entrar no arquivo docker-compose.yml - mude as variaveis do enviroment para as que estão na sua base exemplo :

- DB_POSTGRESDB_USER= Seu usuario do Postgres
- DB_POSTGRESDB_PASSWORD= Sua senha

Logo após de realizar isso vá para o diretorio n8nRandom e instale as dependências para sua maquina utilizando

- npm install
- npm run bundle

## Iniciar o Projeto

Depos de configurar o projeto utilze o comando 
- docker compose up -d

Para que crie as imagens e volumes para o docker quando finalizar esse processo abra http://localhost:5678 no navegador que terá acesso ao n8n com o modulo Random.