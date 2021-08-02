const express = require('express');
const app = express();
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');


// Sets the server to serve static files:
app.use(express.static('public'));


// Quotes router importing and mounting:
const quoteRouter = express.Router();
app.use('/api/quotes', quoteRouter);


// Request Handler Middleware (mostly for testing next()):
const requestHandler = (req, res, next) =>{
  console.log('Receiving Request:')
  next()
}
quoteRouter.use(requestHandler)


// HTTP GET Request handler for RANDOM quotes:
quoteRouter.get('/random', (req, res, next) => {
  console.log('Retrieving random quote...')
  res.status(200).send(
    {
    quote: getRandomElement(quotes)
    }
  )
});


// HTTP GET Request handler for ALL quotes or a SPECIFIC quote by an author:
quoteRouter.get('/', (req, res, next) => {
  const author = req.query.person;
 
  if(quotes.find(authorExists => authorExists.person == author)) {
    console.log('Retrieving all quotes by ' + author + '...')
    res.status(200).send(
      {
      quotes: quotes.filter(element => element.person == author)
      }
    )
  } else {
    console.log('Retrieving quotes...')
    res.status(200).send(
      {
      quotes: quotes
      }
    )
  };

});


// HTTP POST Request handler for adding new quotes to the data:
quoteRouter.post('/', (req, res, next) => {
  const author = req.query.person;
  const quote = req.query.quote;

  if (author && quote) {
    console.log('Quote received...')
    quotes.push(
      {
        'quote': quote,
        'person': author
      }
    )
    res.status(200).send(
      {
        quote: {
          'quote': quote,
          'person': author
        }
      }
    )
  } else {
    console.log('Problem receiving quote...')
    res.status(400).send()
  };

});



// HTTP PUT Request handler for updating quotes:
for (let i=0; i < quotes.length; i++) {
  quotes.forEach(() => quotes[i] = {
    id: i,
    ...quotes[i]
  })
}
//console.log(quotes);

quoteRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;
  if (id && req.query.person && req.query.quote) {
    console.log('Quote updated...')
    quotes[id] = {
      id: id,
      quote: req.query.quote,
      person: req.query.person
    }
    res.status(200).send(quotes[id])
  } else {
    console.log('Problem updating quote...')
    res.status(400).send()
  }
})


// HTTP DELETE Request handler for deleting quotes:
quoteRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  if (id < quotes.length) {
    console.log('Quote deleted...')
    quotes.splice(id, 1)
    res.status(200).send(quotes[id])
  } else {
    console.log('Problem deleting quote...')
    res.status(400).send()
  }
})








// Start the server on port 4001:
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log('listening on port: ' + PORT)
});


module.exports = {
  quotes
};