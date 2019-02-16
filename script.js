document.getElementById("submitButton").addEventListener("click", function(event) {
  event.preventDefault();

  var form = document.querySelector("form");
  var data = new FormData(form)
  var checkBox = document.getElementById("magikarp");
  //console.log("form = " + form);
  //console.log("data = " + data);
  var cansubmit = true;
  var f = form.elements;
  console.log (f.length);
  for (var i = 0; i < f.length; i++) {
    if (f[i].value.length == 0)
      cansubmit = false;
  }

  if (cansubmit) {
    //Automatically set to Magikarp
    var pokemonID = 129;
    if (checkBox.checked == false) {
      var pokemonID = findCollectiveValue(data);
    }

    const url = "https://pokeapi.co/api/v2/pokemon-species/" + pokemonID + "/"
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let results = "";
        let rawName = json.name;
        let prettyName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

        results += '<h1>Your spirit Pokemon is: ' + prettyName + "</h1>";

        //Add the picture
        var idString = String(pokemonID);
        //Add up to 3 leading 0s
        while (idString.length < (3)) {
          idString = "0" + idString;
        }
        var imagePath = '"images/pokemon_' + idString + '.png"';
        results += '<img src=' + imagePath + '>';

        var descriptionString;
        for (let i = 0; i < json.flavor_text_entries.length; ++i) {
          if (json.flavor_text_entries[i].language.name === "en") {
            descriptionString = json.flavor_text_entries[i].flavor_text;
            break;
          }
        }
        modString = personalizeFlavorText(descriptionString, prettyName);
        results += '<p>' + modString + '</p>';
        /*for (let i = 0; i < json.weather.length; i++) {
          results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h1>' + json.main.temp + " &deg;F</h1>"
        results += "<p>"
        for (let i = 0; i < json.weather.length; i++) {
          results += json.weather[i].description
          if (i !== json.weather.length - 1)
            results += ", "
        }*/
        document.getElementById("pokemonResults").innerHTML = results;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
  }
});

function findCollectiveValue(data) {
  var sum = 1;
  for (const entry of data) {
    sum += parseInt(entry[1]);
  };
  return sum;
}
function personalizeFlavorText(str, pokeName) {
  console.log(str);
  var re = new RegExp(pokeName,"g");
  var re2 = new RegExp(pokeName + "'s","g");
  str = str.replace(/é/g, 'e')
  .replace(/This Pokemon\'s/g, 'your')
  .replace(/this Pokemon\'s/g, 'your')
  .replace(/This Pokemon/g, 'You')
  .replace(/this Pokemon/g, 'you')
  .replace(/Its/g, 'Your')
  .replace(/\sits/g, ' your')
  .replace(/It\'s/g, 'You\'re')
  .replace(/\sit\'s/g, ' you\'re')
  .replace(/It/g, 'You')
  .replace(/\sit/g, ' you')
  .replace(re2, 'your')
  .replace(re, 'you')
  .replace(/They/g, 'You')
  .replace(/\sthey/g, ' you')
  .replace(/Their/g, 'Your')
  .replace(/\stheir/g, ' your')
  .replace(/You is/g, 'You are')
  .replace(/You was/g, 'You were')
  .replace(/You has/g, 'You have')
  .replace(/you is/g, 'you are')
  .replace(/you was/g, 'you were')
  .replace(/you has/g, 'you have')
  /*.replace(/(you \w{3,})es\s/g, '$1 ')
  .replace(/(You \w{3,})es\s/g, '$1 ')
  .replace(/(you \w{3,})s\s/g, '$1 ')
  .replace(/(You \w{3,})s\s/g, '$1 ');*/
  str = str.charAt(0).toUpperCase() + str.slice(1);
  console.log(str);
  return str;
}
