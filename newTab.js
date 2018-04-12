function renderStatus(key, value) {
	/*Sets word and definition in the divs*/
	document.getElementById('word').textContent = key;
  	document.getElementById('definition').textContent = value;
}

function setBackground() {
	/*Sets background according to the time of day*/
	var date = new Date();
  	if (date.getHours() >= 5 && date.getHours() < 17) {
    	document.getElementById('b').style.background = "url('images/day.png') no-repeat center fixed";
  	}
  	else if (date.getHours() >= 17 && date.getHours() < 20) {
    	document.getElementById('b').style.background = "url('images/dusk.png') no-repeat center fixed";
  	}
  	else {
    	document.getElementById('b').style.background = "url('images/night.png') no-repeat center fixed";
  	}
}

document.addEventListener('DOMContentLoaded', function() {
	setBackground();
  	var key = 0;
  	var word = '';
  	var definition = '';

  	var wordFile = new XMLHttpRequest();

  	wordFile.open("GET", "files/words.txt", false);
  	wordFile.onreadystatechange = function ()
  	{
  		if(wordFile.readyState === 4)
    	{
    		if(wordFile.status === 200 || wordFile.status == 0)
        	{
        		/*Gets all the words from words.txt. 
        	  	Splits all words and stores them in an array	
        	  	Generates a random number between 0 and 499
        	  	Uses the number as the index for the wordArray
        		*/
        		var words = wordFile.responseText;
        		var wordArray = words.split('\n');
          		key = Math.floor(Math.random() * wordArray.length);
          		word = wordArray[key];
        	}
    	}
  	}
  	wordFile.send(null);

  	var defFile = new XMLHttpRequest();
  	defFile.open("GET", "files/definitions.txt", false);
  	defFile.onreadystatechange = function ()
  	{
  		if(defFile.readyState === 4)
    	{
    		if(defFile.status === 200 || defFile.status == 0)
        	{
        		var definitions = defFile.responseText;
          		var defArray = definitions.split('\n');
          		definition = defArray[key];
        	}
    	}
  	}
  	defFile.send(null);
  	renderStatus(word, definition);
});
