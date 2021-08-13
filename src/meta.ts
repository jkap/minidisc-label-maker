import { Metadata } from "./minidisc-labeler";

export const defaultMetas: Metadata[] = [
  {
    artist: "glass beach",
    album: "the first glass beach album",
    year: "2019",
    artURL: require("../images/glass-beach.jpg"),
  },
  {
    artist: "dogleg",
    album: "melee",
    year: "2020",
    artURL: require("../images/dogleg.jpg"),
  },
  {
    artist: "origami angel",
    album: "somewhere city",
    year: "2019",
    artURL: require("../images/somewhere-city.jpg"),
  },
  {
    artist: "長谷川白紙",
    album: "草木萌動",
    year: "2018",
    artURL: require("../images/somoku-hodo.jpg"),
  },
  {
    artist: "my chemical romance",
    album: "three cheers for sweet revenge",
    year: "2004",
    artURL: require("../images/three-cheers.jpg"),
  },
  {
    artist: "DV-i",
    album: "implementation",
    year: "2020",
    artURL: require("../images/implementation.jpg"),
  },
  {
    artist: "girls rituals",
    album: "crap shit",
    year: "2020",
    artURL: require("../images/crap-shit.jpg"),
  },
  {
    artist: "wowaka",
    album: "unhappy refrain",
    year: "2011",
    artURL: require("../images/unhappy-refrain.jpg"),
  },
  {
    artist: "vylet pony",
    album: "cutiemarks",
    year: "2021",
    artURL: require("../images/cutiemarks.jpg"),
  },
  {
    artist: "iglooghost",
    album: "Neō Wax Bloom",
    year: "2017",
    artURL: require("../images/neo-wax-bloom.jpg"),
  },
];

export function getRandomMeta(): Metadata {
  return defaultMetas[Math.floor(Math.random() * defaultMetas.length)];
}
