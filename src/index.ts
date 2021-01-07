import { MinidiscLabeler } from "./minidisc-labeler";
import { Theme, Themes } from "./themes";
import * as WebFont from "webfontloader";
import "./style.scss";
import { getRandomMeta } from "./meta";

let canvas = document.querySelector<HTMLCanvasElement>("#minidisc");

const labeler = new MinidiscLabeler(
  canvas,
  {
    width: 38,
    height: 54,
    fontSize: 1.76,
    lineHeight: 2.12,
    headerHeight: 5,
    metaContainerHeight: 11,
    leftMargin: 2,
    theme: Themes.Dark,
    uppercase: true,
  },
  getRandomMeta()
);

const $artist = document.querySelector<HTMLInputElement>("#artist-name");
const $album = document.querySelector<HTMLInputElement>("#album-name");
const $year = document.querySelector<HTMLInputElement>("#year");
const $themeRadios = document.querySelectorAll<HTMLInputElement>(
  'input[type="radio"][name="theme"]'
);
const $uppercase = document.querySelector<HTMLInputElement>("#uppercase");

function metaFieldsChanged(e: Event & { target: HTMLInputElement }) {
  switch (e.target.id) {
    case "artist-name":
      labeler.setArtist(e.target.value);
      break;
    case "album-name":
      labeler.setAlbum(e.target.value);
      break;
    case "year":
      labeler.setYear(e.target.value);
      break;
  }
}

function updateTheme(e: Event & { target: HTMLInputElement }) {
  let theme: Theme;
  switch (e.target.value) {
    case "light":
      theme = Themes.Light;
      break;
    case "dark":
      theme = Themes.Dark;
      break;
  }

  if (!theme) {
    return;
  }
  labeler.setTheme(theme);
}

function toggleUppercase(e: Event & { target: HTMLInputElement }) {
  labeler.setUppercase(e.target.checked);
}

function updateMetaFields() {
  $artist.value = labeler.meta.artist;
  $album.value = labeler.meta.album;
  $year.value = labeler.meta.year;
}

$artist.addEventListener("input", metaFieldsChanged);
$album.addEventListener("input", metaFieldsChanged);
$year.addEventListener("input", metaFieldsChanged);

updateMetaFields();

$themeRadios.forEach(($radio) =>
  $radio.addEventListener("change", updateTheme)
);
$uppercase.addEventListener("change", toggleUppercase);

const $artPicker = document.querySelector<HTMLInputElement>("#art-picker");
$artPicker.addEventListener("change", loadFile);

function loadFile(event: Event & { target: HTMLInputElement }) {
  var reader = new FileReader();
  reader.onload = function () {
    labeler.setAlbumArt(reader.result as string);
  };
  reader.readAsDataURL(event.target.files[0]);
}

const $downloadButton = document.querySelector<HTMLAnchorElement>(
  "#download-link"
);
$downloadButton.addEventListener(
  "click",
  function download(e: Event & { target: HTMLAnchorElement }) {
    window.sa_event("download_art");
    e.target.download = `${labeler.meta.album}-label.png`;
    e.target.href = labeler.getDataURL();
  }
);

const $redrawButton = document.querySelector<HTMLAnchorElement>("#redraw");
$redrawButton.addEventListener("click", () => {
  window.sa_event("redraw_art");
  labeler.draw();
});

// const $randomButton = document.querySelector<HTMLAnchorElement>("#randomize");
// $randomButton.addEventListener("click", () => {
//   window.sa_event("randomize");
//   labeler.meta = getRandomMeta();
//   updateMetaFields();
//   labeler.draw();
// });

WebFont.load({
  typekit: {
    id: "elb5ydo",
  },
  active: () => labeler.draw(),
});
