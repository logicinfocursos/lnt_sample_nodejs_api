
# Guia Completo: Criando uma API Node.js

## 1. Instalação do Node.js

- Acesse o site oficial: https://nodejs.org/
- Baixe e instale a versão LTS recomendada para seu sistema operacional.
- Verifique a instalação no terminal:
	```bash
	node -v
	npm -v
	```

## 2. Inicialização do Projeto

- Crie uma pasta para o projeto e acesse-a pelo terminal.
- Execute o comando para iniciar o projeto:
	```bash
	npm init -y
	```
	Isso criará o arquivo `package.json`.

## 3. Instalação de Plugins (Dependências)

- Instale o Express (framework para APIs):
	```bash
	npm install express
	```
- Instale o Nodemon (para reiniciar o servidor automaticamente durante o desenvolvimento):
	```bash
	npm install --save-dev nodemon
	```

## 4. Estrutura Básica do Projeto

- Crie o arquivo principal `index.js`.
- Exemplo de código para iniciar o servidor:
	```js
	const express = require('express');
	const app = express();
	const PORT = 3000;

	app.get('/', (req, res) => {
		res.send('API Node.js funcionando!');
	});

	app.listen(PORT, () => {
		console.log(`Servidor rodando na porta ${PORT}`);
	});
	```

## 5. Configuração do Script de Inicialização

- No `package.json`, adicione o script para rodar com Nodemon:
	```json
	"scripts": {
		"start": "node index.js",
		"dev": "nodemon index.js"
	}
	```

## 6. Executando a API

- Para rodar em modo desenvolvimento (com reinício automático):
	```bash
	npm run dev
	```
- Para rodar normalmente:
	```bash
	npm start
	```

## 7. Testando a API

- Abra o navegador ou use ferramentas como Postman/Insomnia.
- Acesse: `http://localhost:3000/`
- Você deve ver a mensagem: "API Node.js funcionando!"


## 8. Instalação do Prisma com MySQL

- Instale o Prisma Client e CLI:
	```bash
	npm install @prisma/client
	npm install prisma --save-dev
	```

- Instale o driver do MySQL:
	```bash
	npm install mysql2
	```

- Inicialize o Prisma no projeto:
	```bash
	npx prisma init
	```
	Isso criará a pasta `prisma` e o arquivo `schema.prisma`.

- Configure a conexão com o MySQL no arquivo `.env`:
	```env
	DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
	```

- Edite o arquivo `prisma/schema.prisma` para definir seus modelos.

## 9. Realizando Migrations com Prisma

- Para criar uma migration inicial:
	```bash
	npx prisma migrate dev --name init
	```
	Isso irá criar as tabelas no banco de dados e gerar o Prisma Client.

- Para atualizar o banco após mudanças no schema:
	```bash
	npx prisma migrate dev --name nome_da_migration
	```

- Para visualizar o banco de dados:
	```bash
	npx prisma studio
	```


## 10. Executando Seed com Prisma

- Crie o arquivo `prisma/seed.js` com os dados a serem inseridos (exemplo já criado para 20 filmes).
- Configure o comando de seed no `package.json`:
	```json
	"prisma": {
		"seed": "node prisma/seed.js"
	}
	```
- Execute o seed:
	```bash
	npx prisma db seed
	```
	Isso irá inserir os registros definidos no script.

---

- Adicione novas rotas e funcionalidades conforme necessário.
- Consulte a documentação do Express: https://expressjs.com/pt-br/

---

npx prisma db seed
npx prisma migrate status
npx prisma studio