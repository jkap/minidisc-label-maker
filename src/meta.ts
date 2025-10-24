import { Metadata } from "./minidisc-labeler";

export const defaultMetas: Metadata[] = [
    {
        artist: "glass beach",
        album: "the first glass beach album",
        year: "2019",
        artURL: new URL("../images/glass-beach.jpg", import.meta.url),
    },
    {
        artist: "dogleg",
        album: "melee",
        year: "2020",
        artURL: new URL("../images/dogleg.jpg", import.meta.url),
    },
    {
        artist: "origami angel",
        album: "somewhere city",
        year: "2019",
        artURL: new URL("../images/somewhere-city.jpg", import.meta.url),
    },
    {
        artist: "長谷川白紙",
        album: "草木萌動",
        year: "2018",
        artURL: new URL("../images/somoku-hodo.jpg", import.meta.url),
    },
    {
        artist: "my chemical romance",
        album: "three cheers for sweet revenge",
        year: "2004",
        artURL: new URL("../images/three-cheers.jpg", import.meta.url),
    },
    {
        artist: "DV-i",
        album: "implementation",
        year: "2020",
        artURL: new URL("../images/implementation.jpg", import.meta.url),
    },
    {
        artist: "girls rituals",
        album: "crap shit",
        year: "2020",
        artURL: new URL("../images/crap-shit.jpg", import.meta.url),
    },
    {
        artist: "wowaka",
        album: "unhappy refrain",
        year: "2011",
        artURL: new URL("../images/unhappy-refrain.jpg", import.meta.url),
    },
    {
        artist: "vylet pony",
        album: "cutiemarks",
        year: "2021",
        artURL: new URL("../images/cutiemarks.jpg", import.meta.url),
    },
    {
        artist: "iglooghost",
        album: "Neō Wax Bloom",
        year: "2017",
        artURL: new URL("../images/neo-wax-bloom.jpg", import.meta.url),
    },
    {
        artist: "Tyler, the Creator",
        album: "CALL ME IF YOU GET LOST",
        year: "2021",
        artURL: new URL("../images/cmiygl.jpg", import.meta.url),
    },
    {
        album: "ULTRAPOP",
        artist: "The Armed",
        year: "2021",
        artURL: new URL("../images/ultrapop.jpg", import.meta.url),
    },
    {
        album: "SAVIOR",
        artist: "telebasher",
        year: "2023",
        artURL: new URL("../images/savior.jpg", import.meta.url),
    },
    {
        album: "Wallsocket",
        artist: "underscores",
        year: "2023",
        artURL: new URL("../images/wallsocket.jpg", import.meta.url),
    },
    {
        album: "WACCA Complete Album",
        artist: "Various Artists",
        year: "2022",
        artURL: new URL("../images/wacca.jpg", import.meta.url),
    },
    {
        album: "Constant Companions",
        artist: "Jamie Paige",
        year: "2024",
        artURL: new URL("../images/constant-companions.png", import.meta.url),
    },
];

export function getRandomMeta(): Metadata {
    return defaultMetas[Math.floor(Math.random() * defaultMetas.length)];
}
