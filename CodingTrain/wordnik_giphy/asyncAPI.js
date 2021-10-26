const wordnik = 'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=10&api_key=xqipwvdp27qbx1yqjw6do7abedf8woqdl8o6as45768ek738w';
const giphy = 'https://api.giphy.com/v1/gifs/search?&api_key=3KLyY1XDvJGvpwn1jisFu7FuOFsZcHFI&q=';

function setup() {
	noCanvas();

	wordAndGif()
		/* Calls function to get random word and gif */
		.then(results => {
			/* If successful, displays value/word at "word" key */
			createP(results.word);
			/* If successful, displays value/gif at "img" key */
			createImg(results.img, "");
		})
		/* If error at any point, prints error */
		.catch(e => console.error(e));
}

async function wordAndGif() {

	/* Fetches random word from Wordnik API */
	const wordnik_response = await fetch(wordnik);
	/* Returns response in JSON format */
	const wordnik_json = await wordnik_response.json();
	/* Fetches gif associated with word returned from wordnik */
	const giphy_response = await fetch(giphy + wordnik_json.word);
	/* Returns response in JSON format */
	const giphy_json = await giphy_response.json();
	/* Saves first gif in array from giphy api */
	const img_url = giphy_json.data[0].images.original.url;

	/* Returns word and gif in object */
	return {
		word: wordnik_json.word,
		img: img_url
	}
}
