const tracklist = ["fortnight<br><span>(feat. post malone)</span>", "the tortured poets department", "my boy only breaks his favorite toys", "down bad", "so long, london", "but daddy i love him", "fresh out the slammer", "florida!!!<br><span>(feat. florence + the machine)</span>", "guilty as sin?", "who's afraid of little old me?", "i can fix him (no really i can)", "loml", "i can do it with a broken heart", "the smallest man who ever lived", "the alchemy", "clara bow", "the black dog", "imgonnagetyouback", "the albatross", "chloe or sam or sophia or marcus", "how did it end?", "so high school", "i hate it here", "thank you aimee", "i look in peoples window", "the prophecy", "cassandra", "peter", "the bolter", "robin", "the manuscript"];
const keywords = ["fortnight", "the tortured poets department", "my boy only breaks his favorite toys", "down bad", "so long london", "but daddy i love him", "fresh out the slammer", "florida", "guilty as sin", "whos afraid of little old me", "i can fix him (no really i can)", "loml", "i can do it with a broken heart", "the smallest man who ever lived", "the alchemy", "clara bow", "the black dog", "imgonnagetyouback", "the albatross", "chloe or sam or sophia or marcus", "how did it end", "so high school", "i hate it here", "thank you aimee", "i look in peoples window", "the prophecy", "cassandra", "peter", "the bolter", "robin", "the manuscript"];
const names = ["taylor swift", "clara bow", "that black dog", "charlie puth", "that smallest man", "chloe", "sam", "sophia", "marcus", "aimee", "cassandra", "peter", "robin", "florence", "post malone", "stevie nicks", "dylan thomas", "patti smith", "chelsea hotel", "london", "delve", "travis kelce", "emma stone", "the chairman", "nils sjoberg", "meredith grey", "olivia benson", "benjamin button"];
const covers = ["fortnight.png", new Array(15).fill("standard.png"), new Array(2).fill("anthology.jpg"), "albatross.jpg", new Array(10).fill("anthology.jpg"), "bolter.jpg", new Array(2).fill("anthology.jpg")].flat();
const yt = [
  "https://creytm.vercel.app/F4sRtMoIgUs/fortnight.mp3",
  "https://creytm.vercel.app/L92Ui4LzP2U/the-tortured-poets-department.mp3",
  "https://creytm.vercel.app/jwtXVmFTYVY/my-boy-only-breaks-his-favorite-toys.mp3",
  "https://creytm.vercel.app/N61UALi1MuI/down-bad.mp3",
  "https://creytm.vercel.app/WDVCPCKPLwg/so-long-london.mp3",
  "https://creytm.vercel.app/Q3wtBSk1YS4/but-daddy-i-love-him.mp3",
  "https://creytm.vercel.app/_XGbyjwGiCA/fresh-out-the-slammer.mp3",
  "https://creytm.vercel.app/m6hi8iuajzE/florida.mp3",
  "https://creytm.vercel.app/ESFAIxZb8K4/guilty-as-sin.mp3",
  "https://creytm.vercel.app/in1YgJkraEE/whos-afraid-of-little-old-me.mp3",
  "https://creytm.vercel.app/Ck5L06dQ060/i-can-fix-him-(no-really-i-can).mp3",
  "https://creytm.vercel.app/o0NlmZg9ahI/loml.mp3",
  "https://creytm.vercel.app/_x8kI-aM56M/i-can-do-it-with-a-broken-heart.mp3",
  "https://creytm.vercel.app/lSCbseKwNFI/the-smallest-man-who-ever-lived.mp3",
  "https://creytm.vercel.app/FK-ETNt7M7E/the-alchemy.mp3",
  "https://creytm.vercel.app/iJJDUmk8XNA/clara-bow.mp3",
  "https://creytm.vercel.app/5-wL58HMsXo/the-black-dog.mp3",
  "https://creytm.vercel.app/B8z8FRyT_lU/imgonnagetyouback.mp3",
  "https://creytm.vercel.app/TZaa2cJFBg0/the-albatross.mp3",
  "https://creytm.vercel.app/CK4QBAOgJ6c/chloe-or-sam-or-sophia-or-marcus.mp3",
  "https://creytm.vercel.app/T0ltPgydMhg/how-did-it-end.mp3",
  "https://creytm.vercel.app/raBlDihTtbU/so-high-school.mp3",
  "https://creytm.vercel.app/-3r6lwB5VBI/i-hate-it-here.mp3",
  "https://creytm.vercel.app/grbVHCV4yYc/thank-you-aimee.mp3",
  "https://creytm.vercel.app/n_Exoqe2xdE/i-look-in-peoples-window.mp3",
  "https://creytm.vercel.app/gKLNmXPTXMc/the-prophecy.mp3",
  "https://creytm.vercel.app/rxXPPSwwhfo/cassandra.mp3",
  "https://creytm.vercel.app/lEpMyK2_DU0/peter.mp3",
  "https://creytm.vercel.app/WiadPYfdSL0/the-bolter.mp3",
  "https://creytm.vercel.app/XWTuqWcOJEM/robin.mp3",
  "https://creytm.vercel.app/6hvDW1mt_nE/the-manuscript.mp3"
];

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
  const ytsrc = yt[num];
  window.keyword = keywords[num];
  const aud = document.createElement("audio");
  aud.src = ytsrc;
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
