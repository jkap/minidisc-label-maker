import * as React from "react";
import { useState } from "react";
import { Labeler, Font } from "./components/Labeler";
import { getRandomMeta } from "./meta";
import { Themes } from "./themes";

export const App: React.FC = () => {
    const [meta, setMeta] = useState(getRandomMeta());
    const [uppercase, setUppercase] = useState(true);
    const [theme, setTheme] = useState(Themes.Dark);
    const [font, setFont] = useState<Font>("futura-pt-bold");

    function newPreset() {
        let i = 0;
        while (i < 3) {
            const candidate = getRandomMeta();
            if (candidate.album !== meta.album) {
                setMeta(getRandomMeta());
                return;
            }
            i++;
        }
        setMeta(getRandomMeta());
    }

    return (
        <div className="container">
            <Labeler
                width={38}
                height={54}
                theme={theme}
                fontSize={1.76}
                headerHeight={5}
                leftMargin={2}
                lineHeight={2.12}
                metaContainerHeight={11}
                meta={meta}
                uppercase={uppercase}
                font={font}
            />
            <p>
                <label>
                    album{" "}
                    <input
                        type="text"
                        value={meta.album}
                        onChange={({ currentTarget }) =>
                            setMeta({
                                ...meta,
                                album: currentTarget.value,
                            })
                        }
                    />
                </label>
                <br />
                <label>
                    artist{" "}
                    <input
                        type="text"
                        value={meta.artist}
                        onChange={({ currentTarget }) =>
                            setMeta({
                                ...meta,
                                artist: currentTarget.value,
                            })
                        }
                    />
                </label>
                <br />
                <label>
                    year{" "}
                    <input
                        type="text"
                        value={meta.year}
                        onChange={({ currentTarget }) =>
                            setMeta({
                                ...meta,
                                year: currentTarget.value,
                            })
                        }
                    />
                </label>
                <br />
            </p>
            <label>
                album art (preferably square, at least 500px wide)
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={({ currentTarget }) => {
                                const reader = new FileReader();
                                reader.onload = function () {
                                    setMeta({
                                        ...meta,
                                        artURL: reader.result as string,
                                    });
                                };
                                if (currentTarget.files)
                                    reader.readAsDataURL(
                                        currentTarget.files[0]
                                    );
                            }}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
            </label>
            <label>
                theme
                <p>
                    <label>
                        <input
                            className="with-gap"
                            name="theme"
                            value="dark"
                            type="radio"
                            checked={theme === Themes.Dark}
                            onChange={() => setTheme(Themes.Dark)}
                        />
                        <span>Dark</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input
                            className="with-gap"
                            name="theme"
                            value="light"
                            type="radio"
                            checked={theme === Themes.Light}
                            onChange={() => setTheme(Themes.Light)}
                        />
                        <span>Light</span>
                    </label>
                </p>
            </label>
            <label>
                font
                <p>
                    <label>
                        <input
                            className="with-gap"
                            type="radio"
                            checked={font === "futura-pt-bold"}
                            onChange={() => setFont("futura-pt-bold")}
                        />
                        <span>Futura</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input
                            className="with-gap"
                            type="radio"
                            checked={font === "Atkinson Hyperlegible"}
                            onChange={() => setFont("Atkinson Hyperlegible")}
                        />
                        <span>Atkinson Hyperlegible</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input
                            className="with-gap"
                            type="radio"
                            checked={font === "B612"}
                            onChange={() => setFont("B612")}
                        />
                        <span>B612</span>
                    </label>
                </p>
            </label>
            <label>
                <p>
                    <label>
                        <input
                            type="checkbox"
                            className="filled-in"
                            checked={uppercase}
                            onChange={() => setUppercase(!uppercase)}
                        />
                        <span>uppercase</span>
                    </label>
                </p>
            </label>
            <button className="btn-small" onClick={() => newPreset()}>
                new random preset
            </button>
            <p>
                developed by <a href="https://cohost.org/jkap">jae kaplan</a>.
                dm me on <a href="https://reddit.com/u/yrfriendjkap">reddit</a>{" "}
                if you need help or have questions
            </p>
            <p>
                if you found this helpful, please consider throwing me a couple
                bucks <a href="https://ko-fi.com/jkap">on ko-fi!</a>
            </p>
            <p>
                <a href="https://github.com/jkap/minidisc-label-maker">
                    check out the code on github!
                </a>{" "}
                it's not very good but it gets the job done.
            </p>
            <p>
                design inspired by{" "}
                <a href="https://www.reddit.com/r/minidisc/comments/ful65q/recording_session_minidiscs_with_custom_labels/">
                    /u/aaarchvz
                </a>
            </p>
            <p>
                want more customization? check out{" "}
                <a href="https://md-cover-designer.web.app/cover">
                    MD Cover Designer
                </a>{" "}
                by <a href="https://reddit.com/u/RunePML">/u/RunePML</a>
            </p>
        </div>
    );
};
