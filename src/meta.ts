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
];

export function getRandomMeta(): Metadata {
  return defaultMetas[Math.floor(Math.random() * defaultMetas.length)];
}
