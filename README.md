# Backend Challenge Delivery Much

Construído com:
* Expressjs
* Sequelize
* PostgreSql
* Jest


## Requisitos
* Node 11.11
* npm 6.7
* Docker
* Docker-compose

## Instalação
```
git clone https://github.com/nicolas-costa/DM.git
```

Na raiz do projeto, rode:

```
npm install
```

Faça um arquivo .env seguindo o modelo do arquivo .env.example e coloque lá os dados pertinentes (conexão com o banco e afins)   

Suba os containers: 
```
docker-compose up -d
```

Rode as migrations:
```
npx sequelize-cli db:migrate
```

Rode os seeders (certifique-se de que o arquivo products.csv está na raiz do projeto, ele será importado no seeder):
```
npx sequelize-cli db:seed:all
```

Rode o script para iniciar o servidor:
```
npm run start 
```

Após isso, o servidor deverá estar rodando no host:porta especificados no .env.

## Endpoints

Lista de produtos
```
[GET]: /api/products
```

Registrar pedido
```
[POST]: /api/orders
{
    "products": [
        {
          "name": "Nome_do_produto",
          "quantity": quantidade
        }
      ]
}
```

Lista de pedidos
```
[GET] /api/orders
```

Pedido por id
```
[GET]: /api/orders/:id
```

## Testes

Configure o arquivo .env.testing para rodar os testes e execute:
```
npm run test
```

