# Glints Backend Task

A template of Node.js Web Server.

## Pre requisites

- Node 16.0

## Steps for Running the app for first time
To run the application locally, environment variables must be modified in `environments/development.json`.

```
npm install or npm i
npm run db:migrate
```

## Start Server

```
npm start
```

Or

```
node server | bunyan #install bunyan globally for good formatting of logs
```

Or

```
npm run server (hot reloading)
```


## Stop app

```
npm run stop
```

## Lint

```
> npm run lint
> npm run prettier
```

## Config

- For development, define required variables in environments/development.json
- For production, define required variables as environment variable in remote setup.

## Create Migration

```
npm run db:migrate:create migration-name
```

## Run Migration

```
npm run db:migrate
```

## Undo Migration

```
npm run db:migrate:undo
```

## API Interface

### Get All Open Restaurants
To get all the current open restaurant, hit `GET: api/restaurants/open`

### Get top Restaurants for a price range
To get top y Restaurants having dishes in a price range, hit `GET: api/restaurants/top?count=3&maxNumOfDishes=4&priceFrom=5&priceTo=40` where
`count: Number of Restaurants`<br />
`maxNumOfDishes: Max number of dishes in a single restaurant`<br />
`priceFrom: lower limit of price range`<br />
`priceTo: higher limit of the price range`<br />

### Search Restaurants or Dishes
To search restaurants or dishes, hit `GET: api/restaurants/search?searchTerm=Olive`

### Route of User for ordering dish from a restaurant
To order a dish from a restaurant on behalf of a user, hit `POST: api/users/:userId/restaurants/:restaurantId/dishes/:dishId`

## Contributing

- Every Database Table should have a corresponding Model file in `models` folder
- We use `Sequelize` as our ORM
- Use `npx sequelize` to cli for migrations
- The `controllers` and `routes` folder should exactly mimic each other. All routers in `routes` should have their corresponding `controllers` file/folder
- All logging should be done using `req.log`. It's a bunyan logger. For model level logging, `req.log` should be passed to underlying layers
