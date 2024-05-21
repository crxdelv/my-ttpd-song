const tracklist = ["fortnight<br><span>(feat. post malone)</span>", "the tortured poets department", "my boy only breaks his favorite toys", "down bad", "so long, london", "but daddy i love him", "fresh out the slammer", "florida!!!<br><span>(feat. florence + the machine)</span>", "guilty as sin?", "who's afraid of little old me?", "i can fix him (no really i can)", "loml", "i can do it with a broken heart", "the smallest man who ever lived", "the alchemy", "clara bow", "the black dog", "imgonnagetyouback", "the albatross", "chloe or sam or sophia or marcus", "how did it end?", "so high school", "i hate it here", "thank you aimee", "i look in peoples window", "the prophecy", "cassandra", "peter", "the bolter", "robin", "the manuscript"];
const keywords = ["fortnight", "the tortured poets department", "my boy only breaks his favorite toys", "down bad", "so long london", "but daddy i love him", "fresh out the slammer", "florida", "guilty as sin", "whos afraid of little old me", "i can fix him (no really i can)", "loml", "i can do it with a broken heart", "the smallest man who ever lived", "the alchemy", "clara bow", "the black dog", "imgonnagetyouback", "the albatross", "chloe or sam or sophia or marcus", "how did it end", "so high school", "i hate it here", "thank you aimee", "i look in peoples window", "the prophecy", "cassandra", "peter", "the bolter", "robin", "the manuscript"];
const names = ["taylor swift", "clara bow", "that black dog", "charlie puth", "that smallest man", "chloe", "sam", "sophia", "marcus", "aimee", "cassandra", "peter", "robin", "florence", "post malone", "stevie nicks", "dylan thomas", "patti smith", "chelsea hotel", "london", "delve", "travis kelce", "emma stone", "the chairman", "nils sjoberg", "meredith grey", "olivia benson", "benjamin button"];
const covers = ["fortnight.png", new Array(14).fill("standard.png"), new Array(2).fill("anthology.jpg"), "albatross.jpg", new Array(10).fill("anthology.jpg"), "bolter.jpg", new Array(2).fill("anthology.jpg")].flat();
const yt = ["F4sRtMoIgUs", "L92Ui4LzP2U", "jwtXVmFTYVY", "N61UALi1MuI", "WDVCPCKPLwg", "Q3wtBSk1YS4", "_XGbyjwGiCA", "m6hi8iuajzE", "ESFAIxZb8K4", "in1YgJkraEE", "Ck5L06dQ060", "o0NlmZg9ahI", "_x8kI-aM56M", "lSCbseKwNFI", "FK-ETNt7M7E", "iJJDUmk8XNA", "5-wL58HMsXo", "B8z8FRyT_lU", "TZaa2cJFBg0", "CK4QBAOgJ6c", "T0ltPgydMhg", "raBlDihTtbU", "-3r6lwB5VBI", "grbVHCV4yYc", "n_Exoqe2xdE", "gKLNmXPTXMc", "rxXPPSwwhfo", "lEpMyK2_DU0", "WiadPYfdSL0", "XWTuqWcOJEM", "6hvDW1mt_nE"];

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
  const id = raw.replaceAll(" ", "");
  if(id.includes("kimk") || id.includes("kanye")) {
    inprogress = false;
    $("#label-text").text("Error 321");
    return $("#label").css("opacity", 1);
  }
  $("#card, #label, #subtitle").css("opacity", 0);
  $("#spinner").css("opacity", 1);
  clearInterval(animation);
  const num = seed(raw);
  const track = tracklist[num];
  const cover = covers[num];
  const ytid = yt[num];
  window.keyword = keywords[num];
  const aud = document.createElement("audio");
  aud.src = "https://creytm.vercel.app/" + ytid;
  aud.volume = 0.3;
  aud.style.display = "none";
  document.body.append(aud);
  $(aud).attr("controls", "").on("canplaythrough", _ => {
    end(num > 15, track, cover);
    aud.play();
  });
}

async function end(reissue, track, cover) {
  $("#end-cover").attr("src", `img/${cover}`);
  $("#end-title").html(track);
  $("#end-reissue").toggle(reissue);
  $("#spinner").css("opacity", 0);
  await delay(500);
  $("#card, #card-outer, #spinner").hide();
  $("#end").show();
  $("#end *:not(#end-reissue, #end-title > span)").css("opacity", 1);
  $("#end-reissue, #end-title > span").css("opacity", 0.5);
}

function seed(raw) {
  let res = 0;
  raw.split("").forEach(char => {
    res += Math.round(char.charCodeAt(0) / 31);
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
