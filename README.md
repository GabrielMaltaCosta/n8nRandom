# n8n + Custom Node (Random Number API)

Este projeto configura um ambiente **n8n** em contêiner Docker com PostgreSQL e inclui um **Custom Node** que consome a API do [random.org](https://www.random.org/).  
O Node recebe dois números (`min` e `max`) definidos pelo usuário e retorna um número aleatório.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado  
- [Docker Compose](https://docs.docker.com/compose/install/) instalado  
- Porta **5678** livre na máquina  

## Configuração

No arquivo `docker-compose.yml`, altere as variáveis do ambiente para corresponderem às suas configurações do banco de dados, por exemplo:

- `DB_POSTGRESDB_USER`: Seu usuário do Postgres
- `DB_POSTGRESDB_PASSWORD`: Sua senha do Postgres

Depois disso, vá para o diretório `n8nRandom` e instale as dependências:

```sh
npm install
npm run build
```

## Iniciar o Projeto

Após configurar o projeto, utilize o comando:

```sh
docker compose up -d
```

Isso criará as imagens e volumes necessários para o Docker.  
Quando o processo finalizar, acesse [http://localhost:5678](http://localhost:5678) no navegador para acessar o n8n com o módulo Random.
