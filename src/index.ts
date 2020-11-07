import * as GlassBeachArt from "../images/glass-beach.jpg";
import { MinidiscLabeler, Metadata } from "./minidisc-labeler";
import * as WebFont from "webfontloader";
import "./style.scss";

let canvas = document.querySelector<HTMLCanvasElement>("#minidisc");

const defaultMeta: Metadata = {
  artist: "glass beach",
  album: "the first glass beach album",
  year: "2019",
  artURL: GlassBeachArt,
};

const labeler = new MinidiscLabeler(
  canvas,
  {
    width: 36,
    height: 51,
    ppm: 11.811,
    fontSize: 1.76,
    lineHeight: 2.12,
    headerHeight: 5,
  },
  defaultMeta
);

// labeler.draw();

const $artist = document.querySelector<HTMLInputElement>("#artist-name");
const $album = document.querySelector<HTMLInputElement>("#album-name");
const $year = document.querySelector<HTMLInputElement>("#year");

function updateMeta(e: Event & { target: HTMLInputElement }) {
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

$artist.addEventListener("input", updateMeta);
$album.addEventListener("input", updateMeta);
$year.addEventListener("input", updateMeta);

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
$downloadButton.addEventListener("click", function download(
  e: Event & { target: HTMLAnchorElement }
) {
  window.sa_event("download_art");
  e.target.download = `${labeler.meta.album}-label.png`;
  e.target.href = labeler.getDataURL();
});

const $redrawButton = document.querySelector<HTMLAnchorElement>("#redraw");
$redrawButton.addEventListener("click", () => {
  window.sa_event("redraw_art");
  labeler.draw();
});

WebFont.load({
  typekit: {
    id: "elb5ydo",
  },
  active: () => labeler.draw(),
});
