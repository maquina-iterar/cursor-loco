let cursorSize = 60;
let backgroundColor = "#000";
let cursorColor = "#fff";

const lastChangeLog = document.getElementById("lastChangeLog");

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: ["maquinaiterar"],
});
client.connect().catch(console.error);
client.on("message", (channel, tags, message, self) => {
  if (self) return;

  if (message.startsWith("!")) {
    lastChangeLog.textContent = tags["display-name"];
  }

  if (message.startsWith("!bg")) {
    backgroundColor = message.split(" ")[1];
  }
  if (message.startsWith("!cc")) {
    cursorColor = message.split(" ")[1];
  }
  if (message.startsWith("!cs")) {
    cursorSize = +message.split(" ")[1];
  }
});

let mx = [];
let my = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  noStroke();
  fill(255, 153);
  for (let i = 0; i < cursorSize; i++) {
    mx.push(i);
    my.push(i);
  }
}

function draw() {
  background(backgroundColor);

  // Cycle through the array, using a different entry on each frame.
  // Using modulo (%) like this is faster than moving all the values over.
  let which = frameCount % cursorSize;
  mx[which] = mouseX;
  my[which] = mouseY;

  for (let i = 0; i < cursorSize; i++) {
    // which+1 is the smallest (the oldest in the array)
    let index = (which + 1 + i) % cursorSize;

    let c = color(cursorColor);
    fill(c);
    noStroke();
    ellipse(mx[index], my[index], i, i);
  }
}
