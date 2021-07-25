const wordnik = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
//replace api key with mine when it comes in
const giphy = '';

function setup () {
  noCanvas();

  fetch(wordnik)
  .then(response => {
    return response.json();
  })
  .then(json => {
    createP(json.word);
    return fetch(giphy + json.word);
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    createImageBitmap(json.data[0].images['fixed_height_small'].url)
  })
  .catch(err => console.log(err))
}
