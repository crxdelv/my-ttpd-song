const tracklist = ["fortnight<br><span>(feat. post malone)</span>", "the tortured poets department", "my boy only breaks his favorite toys", "down bad", "so long, london", "but daddy i love him", "fresh out the slammer", "florida!!!<br><span>(feat. florence + the machine)</span>", "guilty as sin?", "who's afraid of little old me?", "i can fix him (no really i can)", "loml", "i can do it with a broken heart", "the smallest man who ever lived", "the alchemy", "clara bow", "the black dog", "imgonnagetyouback", "the albatross", "chloe or sam or sophia or marcus", "how did it end?", "so high school", "i hate it here", "thank you aimee", "i look in peoples window", "the prophecy", "cassandra", "peter", "the bolter", "robin", "the manuscript"];
const keywords = ["fortnight", "the tortured poets department", "my boy only breaks his favorite toys", "down bad", "so long london", "but daddy i love him", "fresh out the slammer", "florida", "guilty as sin", "whos afraid of little old me", "i can fix him (no really i can)", "loml", "i can do it with a broken heart", "the smallest man who ever lived", "the alchemy", "clara bow", "the black dog", "imgonnagetyouback", "the albatross", "chloe or sam or sophia or marcus", "how did it end", "so high school", "i hate it here", "thank you aimee", "i look in peoples window", "the prophecy", "cassandra", "peter", "the bolter", "robin", "the manuscript"];
const names = ["taylor swift", "clara bow", "that black dog", "charlie puth", "that smallest man", "chloe", "sam", "sophia", "marcus", "aimee", "cassandra", "peter", "robin", "florence", "post malone", "stevie nicks", "dylan thomas", "patti smith", "chelsea hotel", "london", "delve", "travis kelce", "emma stone", "the chairman", "nils sjoberg", "meredith grey", "olivia benson", "benjamin button"];
const positions = ["chairman", "president", "vice president", "secretary", "poet", "artist", "mastermind", "speaker", "prophecy", "albatross", "alchemist", "doctor", "wise man", "good samaritan", "fearless leader", "real tough kid", "good neighbor"];
const covers = [
  "fortnight.png",
  new Array(11).fill("standard.png"),
  "icdiwabh.jpeg",
  new Array(3).fill("standard.png"),
  new Array(2).fill("anthology.jpg"),
  "albatross.jpg",
  new Array(9).fill("anthology.jpg"),
  "bolter.jpg",
  new Array(2).fill("anthology.jpg")
].flat();
const stages = [
  new Array(16).fill("stage 1: denial"),
  new Array(2).fill("stage 4: depression"),
  "stage 3: bargaining",
  new Array(9).fill("stage 4: depression"),
  "stage 2: anger",
  new Array(2).fill("stage 4: depression")
].flat();

async function delay(time) {
  return new Promise(res => {
    setTimeout(res, time);
  });
}

var inprogress = false;
async function next() {
  if(inprogress) return;
  inprogress = true;
  $("#label").css("opacity", 0);
  const raw = $("#form-input").val().trim().toLowerCase();
  if(raw.length < 2) {
    inprogress = false;
    $("#label-text").text("Too short");
    return $("#label").css("opacity", 1);
  }
  if(raw.length > 30) {
    inprogress = false;
    $("#label-text").text("Too long");
    return $("#label").css("opacity", 1);
  }
  if(!/^[\x00-\x7F]*$/.test(raw)) {
    inprogress = false;
    $("#label-text").text("Contains invalid character");
    return $("#label").css("opacity", 1);
  }
  const id = raw.replaceAll(" ", "");
  if(
    id.includes("kimk") ||
    id.includes("kanye") ||
    id.includes("mayer") ||
    id.includes("scooter") ||
    id.includes("healy")
  ) {
    inprogress = false;
    $("#label-text").text("Error 321: rep tv is coming!");
    return $("#label").css("opacity", 1);
  }
  $("#card, #label, #subtitle, #tip, #title").css("opacity", 0);
  $("#spinner").css("opacity", 1);
  clearInterval(animation);
  const num = seed(raw);
  const track = tracklist[num];
  const cover = covers[num];
  const stage = stages[num]
  const position = positions[num % positions.length];
  window.keyword = keywords[num];
  
  // Audio has been removed
  // due to copyright.
  // Static loading makes the spinner
  // still take its role.
  setTimeout(function() {
    end(num > 15, track, cover, stage, position, raw);
  }, 1e3);
}

async function end(reissue, track, cover, stage, position, input) {
  $("#end-cover").attr("src", `img/${cover}`);
  $("#title").text(`the ${position} of department: ${input}`);
  $("#end-title").html(track);
  $("#end-stage").html(stage);
  $("#end-reissue").toggle(reissue);
  $("#spinner").css("opacity", 0);
  await delay(500);
  $("#card, #card-outer, #spinner").hide();
  $("#end").show();
  $("#end *:not(#end-reissue, #end-title > span), #title").css("opacity", 1);
  $("#end-reissue, #end-title > span").css("opacity", 0.5);
}

function seed(raw) {
  let res = 0;
  raw.toUpperCase().split("").forEach(char => {
    res += Math.round(char.charCodeAt(0) / 5);
    if(res > 30) res -= 31;
  });
  if(res > 30) res -= 31;
  return res;
}

var keyword = null;
function stream() {
  location.href = "https://open.spotify.com/search/results/" + encodeURI(keyword);
}

async function typewrite(last, raw) {
  let i = 0;
  if(last != null) {
    for(i = 0; i < last.length + 1; i++) {
      $("#form-input").attr("placeholder", last.substr(0, last.length - i));
      await delay(100);
    }
  }
  for(i = 0; i < raw.length + 1; i++) {
    $("#form-input").attr("placeholder", raw.substr(0, i));
    await delay(200);
  }
}

var animation = null;
$(document).ready(async _ => {
  await delay(500);
  $("#title").css("opacity", 1);
  await delay(500);
  $("#subtitle").css("opacity", 0.7);
  await delay(500);
  $("#card").css("opacity", 1);
  await delay(500);
  $("#tip").css("opacity", 0.7);
  await delay(500);
  $("#footer").css("opacity", 1);
  let used = [];
  let last = null;
  let animate = async _ => {
    let i = Math.floor(Math.random() * names.length);
    if(used.length == names.length) used = [];
    if(used.includes(i)) i = Math.floor(Math.random() * names.length);
    used.push(i);
    await typewrite(last, names[i]);
    last = names[i];
  }
  animation = setInterval(animate, 5e3);
  animate();
});
