Happy Tails
=========

!["Landing Page"](https://github.com/rachdawn/Happy-Tails/blob/master/project-screenshots/LandingPage.png?raw=true)

!["Listings"](https://github.com/rachdawn/Happy-Tails/blob/master/project-screenshots/Listings.png?raw=true)

## Project Setup

To set up the project locally:

1. Clone the repository.
```
$ git clone git@github.com:rachdawn/Happy-Tails.git
```

2. Navigate to the Project Directory

```
$  cd Happy-Tails
```

3. Install Dependencies

```
$  npm install
```

4. Fix to binaries for sass:
```
$  npm rebuild node-sass
```

5. Create the `.env` by using `.env.example` as a reference:
```
$  cp .env.example .env
```
   
7. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`

7. Reset database:
```
$  npm run db:reset
```

8. Run the server:
```
$  npm run local
```
9. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
