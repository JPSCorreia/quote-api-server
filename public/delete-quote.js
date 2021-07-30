const submitButton = document.getElementById('submit-quote');
const deletedQuoteContainer = document.getElementById('delete-quote');
//const { quotes } = require('../server.js');

submitButton.addEventListener('click', () => {
  const quoteID = document.getElementById('quoteID').value;
  const quoteID2 = document.getElementById('quoteID').value;

  fetch(`/api/quotes/${quoteID}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(() => {
    const deletedQuote = document.createElement('div');
    deletedQuote.innerHTML = `
    <h3>Congrats, your quote was deleted!</h3>
    <div class="attribution"> ID: ${quoteID}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    deletedQuoteContainer.appendChild(deletedQuote);
  });
});
