const wordnik = 'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=10&api_key=xqipwvdp27qbx1yqjw6do7abedf8woqdl8o6as45768ek738w';
const giphy = 'https://api.giphy.com/v1/gifs/search?&api_key=3KLyY1XDvJGvpwn1jisFu7FuOFsZcHFI&q=';

function setup() {
  noCanvas();
  
  // Fetches random word from Wordnik API
  fetch(wordnik)
    // Returns response in JSON format
    .then(response => response.json())
    // .json() also returns promise! so need to chain that response
    .then(json => {
      // Displays word on screen
      createP(json.word);
      // Fetches gif associated with word returned from wordnik
      // Need to explicitly return because no arrow syntax when doing 2 things
      return fetch(giphy + json.word);
    })
    // Again .json() returns promise so get response from that
    .then(response => response.json())
    // Create image from first gif
    // json file is long and complicated but want url of first in array
    // Second argument is alt text that doesn't display
    .then(json => {
      createImg(json.data[0].images.original.url, "");
    })
    // If there are errors at any point in chain, print error message
    // logs TypeError{} if no images found
    .catch(e => console.error(e));
}
