const submitButton = document.getElementById('submit-quote');
const deletedQuoteContainer = document.getElementById('delete-quote');
//const { quotes } = require('../server.js');

submitButton.addEventListener('click', () => {
  const quoteID = document.getElementById('quoteID').value;

/*
// Tentativa de usar GET para aceder á data das quotes com fetch:
  fetch('/api/quotes', {
    method: 'GET',
  })
  .then( response => {
    var getData = response.json();
    console.log(getData)
  })
  .then ( () => {
    // console.log(window.getData);
  })
*/

  async function getQuotes() {
    const response = await fetch('/api/quotes', {
      method: 'GET',
    })
    const data = await response.json();
    return data;
  }

  fetch(`/api/quotes/${quoteID}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then( () => {
    getQuotes().then( response => {
      console.log(response.quotes[quoteID])
      const deletedQuote = document.createElement('div');
      deletedQuote.innerHTML = `
      <h3>Congrats, your quote was deleted!</h3>
      <div class="attribution"> ID: ${quoteID}</div>
      <div class="quote-text">${response.quotes[quoteID].quote}</div>
      <div class="attribution">- ${response.quotes[quoteID].person}</div>
      <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
      `
      deletedQuoteContainer.appendChild(deletedQuote);
    });
  })

});
