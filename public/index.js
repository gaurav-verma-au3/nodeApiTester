$(document).ready(() => {
  let homeUrl = `${window.location.origin}/findFrequentState`;
  let apiUrl = `${window.location.origin}/api`;
  $("#homeUrl").attr("href", homeUrl);
  $("#apiUrl").attr("href", apiUrl);
});

let state = "";
let city = "";
let jsonstring;
let obj;

let addCity = () => {
  state = $("#stateForAddition").val();
  city = $("#cityForAddition").val();
  let url = `${origin}/state/${state}/add/${city}`;
  $.ajax({
    url: url,
    type: "PUT",
    dataType: "JSON",
    success: function(data) {
      let textedJson = JSON.stringify(data, undefined, 4);
      $("#code").text(textedJson);
    }
  });
};

let removeCity = () => {
  state = $("#stateForRemoval").val();
  city = $("#cityForRemoval").val();
  let url = `${origin}/state/${state}/remove/${city}`;
  $.ajax({
    url: url,
    type: "DELETE",
    dataType: "JSON",
    success: function(data) {
      let textedJson = JSON.stringify(data, undefined, 4);
      $("#code").text(textedJson);
    }
  });
};

let getState = () => {
  city = $("#cityName").val();
  let url = `${origin}/state/${city}`;
  $.ajax({
    url: url,
    type: "GET",
    dataType: "text",
    success: function(data) {
      let textedJson = JSON.stringify(data, undefined, 4);
      $("#code").text(textedJson);
    }
  });
};

function getFrequent() {
  let city1 = $("#city1").val();
  let city2 = $("#city2").val();
  let city3 = $("#city3").val();
  let city4 = $("#city4").val();
  let city5 = $("#city5").val();
  let cities = [city1, city2, city3, city4, city5];
  let results = [];

  cities.map(city => {
    let url = `${origin}/state/${city}`;
    $.ajax({
      url: url,
      type: "GET",
      async: false,
      dataType: "text",
      success: function(data) {
        results.push(data);
      }
    });
  });
  console.log(results);
  let sorted = results.sort();
  var max = 0,
    result,
    freq = 0;
  for (var i = 0; i < sorted.length; i++) {
    if (sorted[i] === sorted[i + 1]) {
      freq++;
    } else {
      freq = 0;
    }
    if (freq > max) {
      result = sorted[i];
      max = freq;
    }
    console.log(max);
  }
  if (max == 0) {
    console.log("hreee");
    result = results[4];
  }
  $("#frequent-box").text(`State : ${result} Frequency  : ${max + 1}`);
}

let getMatchingCities = () => {
  let initial = $("#initialLetter").val();
  let url = `${origin}/showAllCities/${initial}`;
  $.ajax({
    url: url,
    type: "GET",
    dataType: "JSON",
    success: function(data) {
      let textedJson = JSON.stringify(data, undefined, 4);
      $("#code").text(textedJson);
    }
  });
};
