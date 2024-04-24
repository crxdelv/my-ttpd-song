// Hardcoded by creuserr (on github)

$("#button").click(evt => {
  $("#label").hide();
  const text = $("#input").val().trim();
  if(text.match(/[^a-z0-9\s]/gi) != null) return $("#label").text("letters, numbers, and spaces only!").show();
  if(text.length == "") return $("#label").text("please type your name!").show();
  if(text.length > 25) return $("#label").text("too long! (london)").show();
  $("#button, #input, #card-title").attr("disabled", "").fadeOut(500, x => {
    transition();
    $("#card-title").text("Your song is...").fadeIn(500, async y => {
      if(text.replaceAll(" ", "").includes("kanye") || text.replaceAll(" ", "").includes("kimk")) return reputation();
      const s = seed(text);
      const t = await track(endpoints[s]);
      clearInterval(transint);
      $("#sub").toggle(s > 15);
      $("#track").text(t.title);
      $("#play").attr("href", `https://m.youtube.com/results?sp=mAEA&search_query=${endpoints[s].replaceAll(" ", "+")}+taylor+swift`);
      $("#album").attr("src", t.image).on("load", z => {
        $("#card-title").fadeOut(500, _ => {
          $("#card-intro").hide();
          $("#card-track").css("display", "flex").animate({ opacity: 1 });
        });
      });
    });
  })
});

const endpoints = ["fortnight", "the tortured poets department", "my boy only breaks his favorite toys", "down bad", "so long london", "but daddy i love him", "fresh out the slammer", "florida", "guilty as sin", "whos afraid of little old me", "i can fix him", "loml", "i can do it with a broken heart", "the smallest man who ever lived", "the alchemy", "clara bow", "the black dog", "imgonnagetyouback", "the albatross", "chloe or sam or sophia or marcus", "how did it end", "so high school", "i hate it here", "thank you aimee", "i look in peoples window", "the prophecy", "cassandra", "peter", "the bolter", "robin", "the manuscript"];

function seed(text) {
  let res = 0;
  let count = 0;
  text.split("").forEach(char => {
    count += char.charCodeAt(0);
  });
  for(let i = 0; i < count; i++) {
    res++;
    if(res > endpoints.length) res = 0;
  }
  return res;
}

let transint = null;
function transition() {
  let i = 0;
  transint = setInterval(_ => {
    i++;
    if(i == 3) i = 0;
    $("#card-title").html("Your song is" + ".".repeat(i + 1) + "&nbsp;".repeat(2 - i));
  }, 500);
}

async function track(endpoint) {
  const f = await fetch(`https://lyrist.vercel.app/api/${endpoint.replaceAll(" ", "+")}/taylor+swift`);
  let r = await f.json();
  return {
    image: r.image,
    title: r.title + (endpoint == "florida" ? " (feat. florence + the machine)" : (endpoint == "fortnight" ? " (feat. post malone)" : ""))
  }
}

function placeholder(raw, first) {
  function next() {
    clearInterval(int);
    i = 0;
    int = setInterval(_ => {
      if(i - 1 == raw.length) return clearInterval(int);
      $("#input").attr("placeholder", raw.substr(0, i));
      i++;
    }, 100);
  }
  if(first != true) {
    let last = $("#input").attr("placeholder");
    let i = last.length;
    let int = setInterval(_ => {
      if(i == 0) return next(int);
      $("#input").attr("placeholder", last.substr(0, i));
      i--;
    }, 70);
  } else {
    let i = 0;
    let int = setInterval(_ => {
      if(i - 1 == raw.length) return clearInterval(int);
      $("#input").attr("placeholder", raw.substr(0, i));
      i++;
    }, 100);
  }
}

function reputation() {
  $("#filter").animate({
    opacity: 1
  }, 5000, _ => {
    location.href = "https://my-ttpd-song.vercel.app/reputation.html";
  });
  clearInterval(transint);
}

$(document).ready(_ => {
  setTimeout(function() {
    $("#title").animate({ opacity: 1 }, 500);
    setTimeout(_ => $("#card-title").animate({ opacity: 1 }, 500), 700);
    setTimeout(_ => $("#card-input").animate({ opacity: 1 }, 500, __ => placeholder(names[i], true)), 1200);
    setTimeout(_ => $("#footer").animate({ opacity: 1 }, 500), 1900);
  }, 500);
  const names = ["taylor swift", "clara bow", "that black dog", "charlie puth", "that smallest man", "chloe", "sam", "sophia", "marcus", "aimee", "cassandra", "peter", "robin", "florence", "post malone", "stevie nicks", "dylan thomas", "patti smith", "chelsea hotel", "london", "delv", "travis kelce"];
  let i = Math.floor(Math.random() * names.length);
  let used = [i];
  setInterval(x => {
    if(used.length == names.length) used = [];
    i = Math.floor(Math.random() * names.length);
    while(used.includes(i)) i = Math.floor(Math.random() * names.length);
    placeholder(names[i]);
    used.push(i);
  }, 7000);
});