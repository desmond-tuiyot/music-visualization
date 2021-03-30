let audioEl;
let currentLyric = "";
let lyricsDiv;
let lrcStrings;
let fontSize;
let amp;
let vol;

function preload() {
  lrcStrings = loadStrings("./assets/freeze.lrc");
}

function setup() {
  noCanvas();

  audioEl = createAudio("./assets/freeze.mp3");
  audioEl.showControls();

  lrcStrings = lrcStrings.join("\n");

  let lrcJSON = new Lrc(lrcStrings);

  for (let i = 0; i < lrcJSON.lines.length; i++) {
    let time = lrcJSON.lines[i].time;
    let lyric = lrcJSON.lines[i].txt.valueOf();
    10 < i && console.log(time, lyric);
    audioEl.addCue(time, showLyric, lyric);
  }

  lyricsDiv = createDiv("");
  lyricsDiv.style("padding", "10px");
  lyricsDiv.style("margin", "auto");

  amp = new p5.Amplitude();
}

function draw() {
  fontSize = map(amp.getLevel(), 0, 1, 48, 72);
}

function showLyric(value) {
  let lyric = value;
  lyricsDiv.html("");
  if (lyric === "") {
    lyricsDiv.html("");
    return;
  }

  currentLyric = lyric + " ";
  let newLyric = createSpan(currentLyric);
  console.log(newLyric);
  newLyric.style(
    "color",
    "rgba(" +
      int(random(0, 255)) +
      ", " +
      int(random(0, 255)) +
      ", " +
      int(random(0, 255)) +
      ", 255)"
  );
  console.log(fontSize);
  lyricsDiv.style("font-size", `${fontSize}px`);

  lyricsDiv.child(newLyric);
}
