# Bun + Elysia API

Um projeto de estudo construído com **Bun** e **Elysia**, integrando MongoDB para persistência e Redis para cache.
</br>
Você pode comparar performance com o Node.js + fastify, usando o projeto [node-fastify](https://github.com/SouzRod/node-fastify) é o mesmo projeto que esse mas no ecosistema Node.js

## 📋 Sobre o Projeto

Este é um servidor REST API moderno desenvolvido com:
- **Bun**: Runtime JavaScript ultrarrápido
- **Elysia**: Framework web leve e performático
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados
- **Redis**: Cache em memória para otimização de performance
- **TypeScript**: Tipagem estática completa

A arquitetura segue princípios de **Clean Architecture**, separando a aplicação em camadas bem definidas.

## 🏗️ Estrutura do Projeto

```
├── src/
│   ├── application/          # Casos de uso e lógica de negócio
│   │   ├── config/           # Configurações da aplicação
│   │   └── useCase/          # Casos de uso (CRUD de usuários, etc)
│   ├── domain/               # Entidades, interfaces e erros
│   │   ├── enum/             # Enumerações (HTTP status, etc)
│   │   ├── errors/           # Definições de erros customizados
│   │   └── interfaces/       # Contratos e interfaces da aplicação
│   ├── infrastructure/       # Integrações externas
│   │   ├── external/         # Serviços externos (MongoDB, Redis)
│   │   └── repository/       # Repositórios de dados
│   └── presentation/         # Camada de apresentação
│       └── router/           # Definição de rotas HTTP
├── index.ts                  # Entry point da aplicação
├── build.ts                  # Script de compilação
├── Dockerfile                # Configuração Docker para produção
├── docker-compose.yml        # Orquestração de serviços (app, mongo, redis)
├── package.json              # Dependências e scripts
└── tsconfig.json             # Configuração TypeScript
```

## 🚀 Quick Start

### Pré-requisitos

- **Bun** v1.3.5 ou superior ([instalar](https://bun.sh))
- **Docker** e **Docker Compose** (para ambiente containerizado)

### Desenvolvimento Local

1. **Instale as dependências:**
   ```bash
   bun install
   ```

2. **Execute em modo watch:**
   ```bash
   bun start
   ```

A API estará disponível em `http://localhost:3000` </br>
O OpenAPI estará disponível em `http://localhost:3000/openapi`

### Com Docker Compose

Para rodar a aplicação completa com MongoDB e Redis:

```bash
docker compose up --build
```

Isso iniciará:
- **App**: http://localhost:3000
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

## 📦 Dependências

### Produção
- **elysia** ^1.4.21 - Framework web ultrarrápido
- **@elysiajs/cors** ^1.4.1 - Middleware CORS
- **@elysiajs/openapi** ^1.4.13 - Documentação OpenAPI automática
- **mongodb** ^7.0.0 - Driver MongoDB oficial

### Desenvolvimento
- **@types/bun** - Tipos TypeScript para Bun
- **typescript** - Linguagem TypeScript

## 🔧 Variáveis de Ambiente local

Configure as seguintes variáveis:

```bash
# Aplicação
PORT=3000                               # Porta da API

# Redis
REDIS_ENABLED=true                      # Habilitar cache Redis
REDIS_URI=redis://localhost:6379        # URI de conexão Redis
REDIS_DEFAULT_EXPIRE=5                  # Tempo de expiração em segundos

# MongoDB
MONGODB_URI=mongodb://localhost:27017/bun_elysia   # URI de conexão
```


## Rotas Disponíveis

As rotas estão organizadas em `src/presentation/router/` e incluem operações CRUD para usuários:

- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Obter usuário por ID
- `POST /users` - Criar novo usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

## 🏗️ Arquitetura

A aplicação segue a arquitetura em camadas:

1. **Presentation Layer** (`src/presentation/`) - Rotas HTTP e tratamento de requisições
2. **Application Layer** (`src/application/`) - Casos de uso e lógica de negócio
3. **Domain Layer** (`src/domain/`) - Entidades, interfaces e regras de negócio
4. **Infrastructure Layer** (`src/infrastructure/`) - Integrações com MongoDB e Redis

## 🐳 Compilação para Produção

O projeto usa o sistema de compilação `standalone` do Bun:

```bash
bun build.ts
```

Gera um executável binário em `build/server` que pode rodar sem dependências do Node.js ou Bun runtime.

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento (watch mode)
bun start

# Produção (executável compilado)
bun start:prod

# Build do executável
bun build.ts
```

## 📚 Recursos

- [Documentação Bun](https://bun.sh/docs)
- [Documentação Elysia](https://elysiajs.com)
- [Driver MongoDB](https://www.mongodb.com/docs/drivers/node/)

