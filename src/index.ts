import { changeDpiDataUrl } from "changedpi";
const width = 36;
const height = 51;
const ppm = 11.811;

const artURL =
  "https://cdn.glitch.com/aad6bf11-a171-47bc-af12-264912a5c3f3%2Fmbid-352140b4-3fc5-4ea1-8417-29ebe76bc959-24886875219.jpg?v=1586209889426";
const logoURL =
  "https://cdn.glitch.com/aad6bf11-a171-47bc-af12-264912a5c3f3%2FMiniDisc-Logo.svg?v=1586211905118";
let canvas = document.querySelector<HTMLCanvasElement>("#minidisc");
let ctx = canvas.getContext("2d");

canvas.height = height * ppm;
canvas.width = width * ppm;

ctx.fillStyle = "#231F20";
ctx.fillRect(0, 0, width * ppm, height * ppm);

const headerHeight = 5;
const fontSize = 1.76;
const lineHeight = 2.12;

interface Metadata {
  artist: string;
  album: string;
  year: string;
}

declare global {
  interface Window {
    meta: Metadata;
  }
}

const defaultMeta: Metadata = {
  artist: "glass beach",
  album: "the first glass beach album",
  year: "2019",
};

window.meta = window.meta || defaultMeta;

function calculateCentering(
  containerHeight: number,
  elementHeight: number,
  yOffset = 0
) {
  return (containerHeight - elementHeight) / 2 + yOffset;
}

function drawArrow() {
  // 1.2593
  let y = calculateCentering(headerHeight * ppm, 1.2593 * ppm, 0);
  ctx.fillStyle = "white";

  ctx.beginPath();
  ctx.moveTo(3.25 * ppm, y);
  ctx.lineTo(4.5 * ppm, y + 1.2593 * ppm);
  ctx.lineTo(2 * ppm, y + 1.2593 * ppm);
  ctx.fill();
}

function drawInsertText() {
  ctx.font = `bold ${fontSize * ppm}px futura-pt-bold`;
  ctx.fillStyle = "white";

  let y = calculateCentering(headerHeight * ppm, lineHeight * ppm, 0);
  ctx.fillText("INSERT THIS END", 5.5 * ppm, Math.round(y + fontSize * ppm));
}

ctx.font = `bold ${fontSize * ppm}px futura-pt-bold`;
ctx.fillStyle = "white";

let y;

drawArrow();
drawInsertText();

function drawAlbumArt(url: string) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.addEventListener(
    "load",
    function () {
      ctx.fillStyle = "#231F20";
      ctx.fillRect(0, 5 * ppm, width * ppm, width * ppm);

      const imageWidth = image.width;
      const scaleFactor = (width * ppm) / imageWidth;
      const displayHeight = image.height * scaleFactor;
      ctx.drawImage(
        image,
        0,
        calculateCentering(width * ppm, displayHeight, headerHeight * ppm),
        width * ppm,
        displayHeight
      );
      drawOutput();
    },
    false
  );
  image.src = url;
}

drawAlbumArt(artURL);

function drawMDLogo() {
  const logo = new Image();
  const logoDisplayWidth = 3.688;
  logo.crossOrigin = "anonymous";
  logo.addEventListener(
    "load",
    function () {
      const imageWidth = logo.width;
      const scaleFactor = (logoDisplayWidth * ppm) / imageWidth;
      const displayHeight = logo.height * scaleFactor;
      ctx.drawImage(
        logo,
        width * ppm - 2 * ppm - logoDisplayWidth * ppm,
        calculateCentering(headerHeight * ppm, displayHeight, 0),
        logoDisplayWidth * ppm,
        displayHeight
      );
      drawOutput();
    },
    false
  );

  logo.src = logoURL;
}

drawMDLogo();

function drawMeta({ artist, album, year }: Metadata) {
  ctx.fillStyle = "#231F20";
  ctx.fillRect(0, 41 * ppm, width * ppm, 10 * ppm);

  ctx.font = `bold ${fontSize * ppm}px futura-pt-bold`;
  ctx.fillStyle = "white";

  const metaHeight = (lineHeight + lineHeight + fontSize) * ppm;

  let y;

  y = calculateCentering(10 * ppm, metaHeight, 41 * ppm);
  console.log(y);

  ctx.fillText(album, 2 * ppm, Math.round(y + fontSize * ppm));
  ctx.fillText(
    artist,
    2 * ppm,
    Math.round(y + lineHeight * ppm + fontSize * ppm)
  );
  ctx.fillText(
    year,
    2 * ppm,
    Math.round(y + lineHeight * ppm + lineHeight * ppm + fontSize * ppm)
  );
}

const $artist = document.querySelector<HTMLInputElement>("#artist-name");
const $album = document.querySelector<HTMLInputElement>("#album-name");
const $year = document.querySelector<HTMLInputElement>("#year");

window.meta = {
  artist: $artist.value.toUpperCase(),
  album: $album.value.toUpperCase(),
  year: $year.value.toUpperCase(),
};

function updateMeta(e: Event & { target: HTMLInputElement }) {
  switch (e.target.id) {
    case "artist-name":
      window.meta.artist = e.target.value.toUpperCase();
      break;
    case "album-name":
      window.meta.album = e.target.value.toUpperCase();
      break;
    case "year":
      window.meta.year = e.target.value.toUpperCase();
      break;
  }
  drawMeta(window.meta);
}

$artist.addEventListener("input", updateMeta);
$album.addEventListener("input", updateMeta);
$year.addEventListener("input", updateMeta);

drawMeta(window.meta);

function drawOutput() {
  const downloadLink = document.getElementById(
    "download-link"
  ) as HTMLAnchorElement;

  let url = canvas.toDataURL("image/png");
  url = changeDpiDataUrl(url, 300);
  downloadLink.href = url;
  downloadLink.download = "label.png";
}

var loadFile = function (event: Event & { target: HTMLInputElement }) {
  var reader = new FileReader();
  reader.onload = function () {
    drawAlbumArt(reader.result as string);
  };
  reader.readAsDataURL(event.target.files[0]);
};
