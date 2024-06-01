const tracklist = ["fortnight<br><span>(feat. post malone)</span>", "the tortured poets department", "my boy only breaks his favorite toys", "down bad", "so long, london", "but daddy i love him", "fresh out the slammer", "florida!!!<br><span>(feat. florence + the machine)</span>", "guilty as sin?", "who's afraid of little old me?", "i can fix him (no really i can)", "loml", "i can do it with a broken heart", "the smallest man who ever lived", "the alchemy", "clara bow", "the black dog", "imgonnagetyouback", "the albatross", "chloe or sam or sophia or marcus", "how did it end?", "so high school", "i hate it here", "thank you aimee", "i look in peoples window", "the prophecy", "cassandra", "peter", "the bolter", "robin", "the manuscript"];
const keywords = ["fortnight", "the tortured poets department", "my boy only breaks his favorite toys", "down bad", "so long london", "but daddy i love him", "fresh out the slammer", "florida", "guilty as sin", "whos afraid of little old me", "i can fix him (no really i can)", "loml", "i can do it with a broken heart", "the smallest man who ever lived", "the alchemy", "clara bow", "the black dog", "imgonnagetyouback", "the albatross", "chloe or sam or sophia or marcus", "how did it end", "so high school", "i hate it here", "thank you aimee", "i look in peoples window", "the prophecy", "cassandra", "peter", "the bolter", "robin", "the manuscript"];
const names = ["taylor swift", "clara bow", "that black dog", "charlie puth", "that smallest man", "chloe", "sam", "sophia", "marcus", "aimee", "cassandra", "peter", "robin", "florence", "post malone", "stevie nicks", "dylan thomas", "patti smith", "chelsea hotel", "london", "delve", "travis kelce", "emma stone", "the chairman", "nils sjoberg", "meredith grey", "olivia benson", "benjamin button"];
const covers = ["fortnight.png", new Array(14).fill("standard.png"), new Array(2).fill("anthology.jpg"), "albatross.jpg", new Array(10).fill("anthology.jpg"), "bolter.jpg", new Array(2).fill("anthology.jpg")].flat();
const yt = ["https://creytm.vercel.app/345102.17851.17093.6670.7555.19585.18798/fortnight.mp3","https://creytm.vercel.app/532041.19823.3655.12455.9265.8565.8968/the-tortured-poets-department.mp3","https://creytm.vercel.app/134052.12019.25544.4005.20998.19219.15486/my-boy-only-breaks-his-favorite-toys.mp3","https://creytm.vercel.app/013452.8832.9130.2701.10087.11984.19032/down-bad.mp3","https://creytm.vercel.app/013524.12158.11848.19229.10945.5356.12170/so-long-london.mp3","https://creytm.vercel.app/345201.14961.1378.12295.8829.27846.11258/but-daddy-i-love-him.mp3","https://creytm.vercel.app/015423.16924.14463.14945.2145.18216.25984/fresh-out-the-slammer.mp3","https://creytm.vercel.app/013452.13420.22050.2415.13146.23102.26228/florida.mp3","https://creytm.vercel.app/045213.11711.8721.17864.1378.9245.18841/guilty-as-sin.mp3","https://creytm.vercel.app/034512.23330.13930.2415.9680.15827.24645/whos-afraid-of-little-old-me.mp3","https://creytm.vercel.app/513420.1176.8461.5307.5307.16552.15332/i-can-fix-him-(no-really-i-can).mp3","https://creytm.vercel.app/315204.20405.17499.12937.12768.2701.19990/loml.mp3","https://creytm.vercel.app/432051.15302.3003.7066.13473.23340.5832/i-can-do-it-with-a-broken-heart.mp3","https://creytm.vercel.app/024135.18419.19034.13793.11096.23537.2701/the-smallest-man-who-ever-lived.mp3","https://creytm.vercel.app/401352.6624.13281.2415.14761.10660.8833/the-alchemy.mp3","https://creytm.vercel.app/541023.13422.19024.13939.2145.10221.16184/clara-bow.mp3","https://creytm.vercel.app/431052.11252.6051.6216.19186.4896.20794/the-black-dog.mp3","https://creytm.vercel.app/234150.3655.21199.7559.15987.11710.20814/imgonnagetyouback.mp3","https://creytm.vercel.app/540123.11274.10510.14468.1176.19012.15315/the-albatross.mp3","https://creytm.vercel.app/320145.8711.16756.8992.10228.8310.4950/chloe-or-sam-or-sophia-or-marcus.mp3","https://creytm.vercel.app/235014.24631.16575.8826.25316.5356.16939/how-did-it-end.mp3","https://creytm.vercel.app/531042.17850.15156.3655.15333.23103.22463/so-high-school.mp3","https://creytm.vercel.app/013452.4707.14250.2701.25997.7193.11694/i-hate-it-here.mp3","https://creytm.vercel.app/520431.9797.4950.17106.22244.9643.23767/thank-you-aimee.mp3","https://creytm.vercel.app/541302.24410.25313.2415.11526.18075.21210/i-look-in-peoples-window.mp3","https://creytm.vercel.app/531042.13614.19591.4950.12013.13772.16006/the-prophecy.mp3","https://creytm.vercel.app/530241.13449.6216.28560.14276.21423.27615/cassandra.mp3","https://creytm.vercel.app/541023.10680.19381.11866.1176.18032.15822/peter.mp3","https://creytm.vercel.app/150342.14454.18633.1176.20603.12796.19603/the-bolter.mp3","https://creytm.vercel.app/014523.15487.20418.10365.3003.20187.16010/robin.mp3","https://creytm.vercel.app/543210.2415.21225.25541.9365.17459.12665/the-manuscript.mp3"];

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
