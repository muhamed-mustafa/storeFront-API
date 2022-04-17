# Project Setup

# Description

<h3> Store Front API using : </h3>

      - Node.Js
      - Express
      - Postgres
      - Jasmine
      - prettier
      - eslint

# Running

<h2> Install dependencies </h2>

     npm install

<h2> Run development server </h2>

     npm run start

<h2> Testing  </h2>

     npm run test

<h2> Compile typescript to javascript </h2>

     npm run build

<h2> Linting </h2>

     npm run lint
     npm run lint:fix

<h2> Formatting code with Prettier </h2>

     npm run format

# Database

<h2> Migration Up </h2>

      DATABASE_URL=postgres://postgres:Mohamed14@localhost:5432/store  npm run migrate up

<h2> Migration Down </h2>

      DATABASE_URL=postgres://postgres:Mohamed14@localhost:5432/store  npm run migrate down

# API endpoint For User Service

- POST /api/user/create

  {"email" : "muuhamed14mustafa@gmail.com" , "password" : "Mohamed14" , "first_name" : "Muhammed" , "last_name" : "Mustafa"}

  `Create new User`

- POST /api/user/login

  {"email" : "muuhamed14mustafa@gmail.com" , "password" : "Mohamed14"}

  `login by email and password`

- GET /api/user/show/:id

  `Show user by id`

- GET /api/user/index

  `Show all users`

# API endpoint For Product Service

- POST /api/product/create

  { "name" : "iphone13" , "price" : 1000 , "category" : "phones"}

  `Create new product`

- GET /api/product

  `Show all products to specific category by category query`

- GET /api/product/show/:id

  `Show product by id`

- GET /api/product/index

  `Show all products`

- GET /api/product/best

  `Show Top 5 most popular products`

# API endpoint For Order Service

- POST /api/order/create

  {"user_id" : 1 , "product_id" : 1 , "quantity" : 5}

  `Create new order`

- GET /api/order

  `Show all completed orders`

- GET /api/order/show/:id

  `Show order by id`

- GET /api/order/index

  `Show all orders`

- GET /api/order/:id/status

  `Update order status from active to completed`

# Environment Variables

- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=store
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=Mohamed14
- JWT_KEY=STORE_PLATFORM
- POSTGRES_DB_TEST=store-test
