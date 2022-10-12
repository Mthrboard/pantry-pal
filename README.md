# Pantry Pal

Pantry Pal is still a work in progress, but eventually it will be an app where
you can store info on all the groceries you have in your pantry, cupboards,
fridge, anywhere you store food. You can split food storage into multiple areas,
and track food expiration dates and lot codes so you know when your food is
about to expire to minimize food waste or danger from potential product recalls.
Set minimum stock levels so you know when to buy more essential staples before
you run out. You can also set storage requirements for items that need to be
refrigerated or frozen, or for items that should be stored in a dark place.

**Link to project:** Coming Soon

## How It's Made

**Tech used:** HTML, CSS, JavaScript, Express, Node, MongoDB

I'm using the basic MERN stack to develop Pantry Pal. For now images are stored
with Cloudinary, the database is hosted on a free MongoDB Atlas cluster, and the
app itself is hosted on NameCheap shared web hosting.

## Optimizations

Right now you can add or remove only a whole item. Eventually I would like to
be able to use a partial quantity of an item. Like if you have a 10 pound bag of
flour, you can remove it by the ounce or pound, or even cups or tablespoons.
Ideally, you can enter in almost any measurement and it will convert it.
Similarly, I would like to be able to split items into different storage areas
by partial quantities. Like if you bought a 50 pound bag of flour, you might
keep 45 pounds in a large tote in the pantry, but have a smaller 5 pound
container in the kitchen.

## Installation

If you want to run your own copy, clone the repo locally, then run `npm install`

## Configuration

* Open the `.env.example` file in the config folder, and fill in the missing variables
  * PORT = 3000 (use any open port on your system)
  * EXPRESS_SESSION_SECRET = Generate a random value to encrypt session storage
  * MONGOOSE_DB_STRING = Your MongoDB URI
  * CLOUDINARY_CLOUD_NAME = Your cloudinary cloud name
  * CLOUDINARY_API_KEY = Your cloudinary API key
  * CLOUDINARY_API_SECRET = Your cloudinary API secret
  * MULTER_ALLOWED_EXTENSIONS = Allowed image extensions (adjust if necessary)
  * FRIENDLY_APP_NAME = The name of the app, used in templates
  * BCRYPT_SALT_ROUNDS = How much time bcrypt will take to calculate salt
  * JWT_SECRET = Generate a random 32-character alphanumeric key
  * CLIENT_URL = The final URL where this app will be hosted (ex. http://localhost for development)
  * EMAIL_FROM = The email address messages sent from this application will come from
  * EMAIL_HOST = SMTP server used for sending emails to users
  * EMAIL_PORT = Port of the SMTP server above
  * EMAIL_USERNAME = Username for the email account from which you send messages
  * EMAIL_PASSWORD = Password for the email account from which you send messages

## Run

`npm start`
