const colorSchemes = {
  Vibrant: [
    "#b67a08",
    "#456e09",
    "#6d3797",
    "#b60876",
    "#375e97",
    "#fb6542",
    "#ffbb00",
  ],
};

// const commonWords = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with", "he", "as", "you", "do", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "no", "its", "was", "i", "had", "could", "went", "how", "were", "way", "much", "is", "said", "think", "thought", "then", "down", "very", "again", "now", "quite", "im", "know", "off", "see", "into", "ill", "here", "such", "must", "did", "are", "got", "some", "your", "are", "them", "any", "has", "never", "only", "am", "more", "has", "been", "should", "other", "though", "dont", "didnt", "after", "came", "over", "come", "just", "back", "looked", "going", "before", "new", "us", "him", "something", "around", "turned", "want", "saw", "through", "made", "knew", "let", "shall", "himself", "take", "took", "well", "soon", "where", "last", "thing", "always", "little", "great", "good", "really", "too", "says", "feel", "than", "even", "enough", "under", "even", "long", "does", "why", "makes", "used", "behind", "things", "nothing", "above", "still", "upon", "every", "heard", "opening", "mans", "grew", "increase", "increased", "many", "whole", "put", "right", "each", "open", "large", "felt", "look"]
const commonWords = [
  "keluhan",
  "terkait",
  "suatu",
  "antar",
  "warga",
  "masyarakat",
];

const sample =
  "daerah pariwisata pendidikan kesehatan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan pariwisata pendidikan kesehatan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan pendidikan kesehatan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan kesehatan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan kesejahteraan infrastruktur-it layanan-pribadi perpajakan infrastruktur-it layanan-pribadi perpajakan layanan-pribadi perpajakan perpajakan";

document.getElementById("sambat").onload = function () {
  var text = document.getElementById("input-text").value;
  
  var chartData;
  if (text.length === 0) {
    chartData = sample;
  } else {
    chartData = text;
  }

  const cleanedText = chartData.replace(/[^a-zA-Z ]/g, "").toLowerCase();

  // create a chart
  var chart = anychart.tagCloud();
  chart.data(cleanedText, {
    mode: "byWord",
    maxItems: 10,
    ignoreItems: commonWords,
  });

  // create and configure a color scale.
  var customColorScale = anychart.scales.linearColor();
  customColorScale.colors(colorSchemes["Vibrant"]);

  // configure angles
  // chart.angles([0, 90, 270, 360]);
  chart.angles([0, 360]);

  // set the color scale as the color scale of the chart
  chart.colorScale(customColorScale);

  // set the font Weight on normal
  chart.normal().fontWeight(600);

  // set the color when selected
  chart.selected().fill("#565f6c");

  // display the word cloud chart
  chart.container("cloud-container");
  chart.draw();
};

// create an onclick function to generate a word cloud based on the user's input into the text box
document.getElementById("generate").onclick = function () {
  var mode = "Spiral";
  var colorSelection = "Vibrant";
  var scale = "Linear";
  var wordSpacing = "2";

  // clear the container in case it currently has a word cloud in it
  document.getElementById("cloud-container").innerHTML = "";

  // set text equal to sample in case text box is empty upon submission
  var text = "";
  if (document.getElementById("input-text").value == "") {
    text = sample;
  }
  // else fill it with the text from the text bos
  else {
    var text = document.getElementById("input-text").value;
  }

  // remove non-alphabet characters and convert everything to lower case
  var cleanedText = text.replace(/[^a-zA-Z ]/g, "").toLowerCase();

  // create a chart
  var chart = anychart.tagCloud();
  chart.data(cleanedText, {
    mode: "byWord",
    maxItems: 30,
    ignoreItems: commonWords,
    options: Stacked,
  });

  // create and configure a color scale.
  var customColorScale = anychart.scales.linearColor();
  customColorScale.colors(colorSchemes[colorSelection]);

  // set text spacing
  chart.textSpacing(wordSpacing);

  // set the color scale as the color scale of the chart
  chart.colorScale(customColorScale);
  // display the word cloud chart
  chart.container("cloud-container");
  chart.draw();
};
