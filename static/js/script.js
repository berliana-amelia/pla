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
  "komentar",
  "terkait",
  "dan", "yang",
  "bahasa", "Jawa",
  "(Timur)",
  "transportasi",
  "terhadap",
  "pemimpin",
  "masyarakat",

];

const sample =
  "daerah pariwisata pendidikan kesehatan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan pariwisata pendidikan kesehatan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan pendidikan kesehatan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan kesehatan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan pemerintahan kehidupan-sosial layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan layanan-umum kesejahteraan infrastruktur-it layanan-pribadi perpajakan kesejahteraan infrastruktur-it layanan-pribadi perpajakan infrastruktur-it layanan-pribadi perpajakan layanan-pribadi perpajakan perpajakan";

const sample17 =
  "layanan-komunikasi-daring politik pegawai lalulintas apresiasi-harapan menggunakan-bahasa-lokal doa-harapan sepak-bola hiburan-pariwisata pendidikan parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat politik pegawai lalulintas apresiasi-harapan menggunakan-bahasa-lokal doa-harapan sepak-bola hiburan-pariwisata pendidikan parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat pegawai lalulintas apresiasi-harapan menggunakan-bahasa-lokal doa-harapan sepak-bola hiburan-pariwisata pendidikan parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat lalulintas apresiasi-harapan menggunakan-bahasa-lokal doa-harapan sepak-bola hiburan-pariwisata pendidikan parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat apresiasi-harapan menggunakan-bahasa-lokal doa-harapan sepak-bola hiburan-pariwisata pendidikan parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat menggunakan-bahasa-lokal doa-harapan sepak-bola hiburan-pariwisata pendidikan parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat doa-harapan sepak-bola hiburan-pariwisata pendidikan parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat sepak-bola hiburan-pariwisata pendidikan parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat hiburan-pariwisata pendidikan parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat pendidikan parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat parkir-liar infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat infrastruktur kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat kesejahteraan-pribadi tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat tempat-tinggal penuntutan-hak usaha-ekonomi layanan-masyarakat penuntutan-hak usaha-ekonomi layanan-masyarakat usaha-ekonomi layanan-masyarakat layanan-masyarakat";

document.getElementById("sambat").onload = function () {
  var text = document.getElementById("input-text").value;
  var title = document.getElementById("input-title").value;

  var chartData;
  if (text.length === 0) {
    chartData = sample17;
  } else {
    chartData = text;
  }

  const cleanedText = chartData.replace(/[^a-zA-Z ]/g, "").toLowerCase();

  // create a chart
  var chart = anychart.tagCloud();
  chart.data(cleanedText, {
    mode: "byWord",
    maxItems: 17,
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
  
  // set the chart title
  chart.title(title);

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
