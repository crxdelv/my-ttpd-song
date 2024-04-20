$("#button").click(evt => {
  $("#label").hide();
  const text = $("#input").val().trim();
  if(text.match(/[^a-z0-9\s]/gi) != null) return $("#label").text("letters, numbers, and spaces only!").show();
  if(text.length == "") return $("#label").text("please type your name!").show();
  if(text.length > 25) return $("#label").text("too long! (london)").show();
  $("#button, #input, #card-title").attr("disabled", "").fadeOut(500, x => {
    $("#card-title").text("Your song is...").fadeIn(500, async y => {
      const s = seed(text);
      const t = await track(endpoints[s]);
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

async function track(endpoint) {
  const f = await fetch(`https://lyrist.vercel.app/api/${endpoint.replaceAll(" ", "+")}/taylor+swift`);
  let r = await f.json();
  return {
    image: r.image,
    title: r.title + (endpoint == "florida" ? " (feat. florence + the machine)" : (endpoint == "fortnight" ? " (feat. post malone)" : ""))
  }
}

$(document).ready(_ => {
  const names = ["taylor swift", "clara bow", "that black dog", "charlie puth", "that smallest man", "chloe", "sam", "sophia", "marcus", "aimee", "cassandra", "peter", "robin", "florence", "post malone", "stevie nicks", "dylan thomas", "patti smith", "chelsea hotel", "london", "delv", "travis kelce", "kim xxx"];
  let i = Math.floor(Math.random() * names.length);
  let used = [i];
  $("#input").attr("placeholder", names[i]);
  setInterval(x => {
    if(used.length == names.length) used = [];
    i = Math.floor(Math.random() * names.length);
    while(used.includes(i)) i = Math.floor(Math.random() * names.length);
    $("#input").attr("placeholder", names[i]);
    used.push(i);
  }, 3000);
})