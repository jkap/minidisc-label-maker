import React, { useState, useRef, useEffect } from "react";
import type Konva from "konva";
import {
    Stage,
    Layer,
    Rect,
    Line,
    Text,
    Group,
    Image as CanvasImage,
} from "react-konva";
import { Theme, Themes } from "../themes";
import * as MDLogoImage from "../../images/md-logo.png";
import { Metadata } from "../minidisc-labeler";
import { changeDpiDataUrl } from "changedpi";
import WebFont from "webfontloader";

const PPM_FACTOR = 11.811;

function calculateCentering(
    containerHeight: number,
    elementHeight: number,
    yOffset = 0
): number {
    return (containerHeight - elementHeight) / 2 + yOffset;
}

const AlbumArt: React.FC<{
    src: string;
    width: number;
    height: number;
    x: number;
    y: number;
}> = ({ src, width, height, x, y }) => {
    const [displayWidth, setDisplayWidth] = useState(width);
    const [displayHeight, setDisplayHeight] = useState(height);
    const [scaleFactor, setScaleFactor] = useState(1);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.addEventListener("load", () => {
        if (image.width >= image.height) {
            setDisplayWidth(width);
            setScaleFactor(width / image.width);
            setDisplayHeight(image.height * scaleFactor);
        } else {
            setDisplayHeight(height);
            setScaleFactor(height / image.height);
            setDisplayWidth(image.width * scaleFactor);
        }
    });
    image.src = src;
    return (
        <CanvasImage
            image={image}
            x={calculateCentering(width, displayWidth, x)}
            y={calculateCentering(height, displayHeight, y)}
            width={displayWidth}
            height={displayHeight}
        />
    );
};

const MDLogo: React.FC<{
    x: number;
    y: number;
    headerHeight: number;
}> = ({ x, y, headerHeight }) => {
    const [displayWidth, setDisplayWidth] = useState(0);
    const [displayHeight, setDisplayHeight] = useState(0);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.addEventListener("load", () => {
        setDisplayHeight(image.height / PPM_FACTOR);
        setDisplayWidth(image.width / PPM_FACTOR);
    });
    image.src = MDLogoImage;
    return (
        <CanvasImage
            image={image}
            x={x - displayWidth}
            y={calculateCentering(headerHeight, displayHeight, y)}
            width={displayWidth}
            height={displayHeight}
        />
    );
};

const Meta: React.FC<{
    artist: string;
    album: string;
    year: string;
    color: string;
    fontSize: number;
    lineHeight: number;
    containerHeight: number;
    yOffset: number;
    margin: number;
}> = ({
    artist,
    album,
    year,
    color,
    fontSize,
    lineHeight,
    containerHeight,
    yOffset,
    margin,
}) => {
    const metaContentHeight = lineHeight + lineHeight + fontSize;
    const y = calculateCentering(containerHeight, metaContentHeight, yOffset);
    return (
        <Group y={y}>
            <Text
                fontSize={fontSize}
                text={album}
                fontFamily="futura-pt-bold"
                fontVariant="bold"
                fill={color}
                x={margin}
                y={0}
            />
            <Text
                fontSize={fontSize}
                text={artist}
                fontFamily="futura-pt-bold"
                fontVariant="bold"
                fill={color}
                x={margin}
                y={lineHeight}
            />
            <Text
                fontSize={fontSize}
                text={year}
                fontFamily="futura-pt-bold"
                fontVariant="bold"
                fill={color}
                x={margin}
                y={lineHeight * 2}
            />
        </Group>
    );
};

export type LabelerProps = {
    width: number;
    height: number;
    theme: Theme;
    leftMargin: number;
    headerHeight: number;
    lineHeight: number;
    fontSize: number;
    metaContainerHeight: number;
    meta: Metadata;
    uppercase: boolean;
};

export const Labeler: React.FC<LabelerProps> = ({
    width,
    height,
    theme = Themes.Dark,
    leftMargin,
    headerHeight,
    fontSize,
    lineHeight,
    metaContainerHeight,
    meta,
    uppercase,
}) => {
    const ARROW_HEIGHT = 1.25;
    const ARROW_Y = calculateCentering(headerHeight, ARROW_HEIGHT, 0);
    const stage = useRef<Konva.Stage>(null);
    const [fontLoaded, setFontLoaded] = useState(false);

    const getDataUrl: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        if (!stage.current) return;

        let url = stage.current.toDataURL();
        url = changeDpiDataUrl(url, 300);
        e.currentTarget.download = `${meta.album}-label.png`;
        e.currentTarget.href = url;
    };

    const redraw = () => {
        if (!stage.current) return;

        stage.current.draw();
    };

    useEffect(() => {
        WebFont.load({
            typekit: {
                id: "elb5ydo",
            },
            active: () => setFontLoaded(true),
        });
    });

    return (
        <>
            <Stage
                ref={stage}
                width={width * PPM_FACTOR}
                height={height * PPM_FACTOR}
                scaleX={PPM_FACTOR}
                scaleY={PPM_FACTOR}
            >
                <Layer>
                    <Rect height={54} width={38} fill={theme.bgColor} />
                </Layer>
                <Layer>
                    <Line
                        fill={theme.fgColor}
                        closed={true}
                        points={[
                            leftMargin + ARROW_HEIGHT,
                            ARROW_Y,
                            leftMargin + ARROW_HEIGHT * 2,
                            ARROW_Y + ARROW_HEIGHT,
                            leftMargin,
                            ARROW_Y + ARROW_HEIGHT,
                        ]}
                    />
                    {fontLoaded ? (
                        <Text
                            x={5.5}
                            y={
                                calculateCentering(headerHeight, lineHeight) +
                                fontSize / 2
                            }
                            fontSize={fontSize}
                            fontFamily="futura-pt-bold"
                            fontVariant="bold"
                            text="INSERT THIS END"
                            fill={theme.fgColor}
                            lineHeight={1}
                        />
                    ) : null}
                    <MDLogo
                        y={0}
                        x={width - leftMargin}
                        headerHeight={headerHeight}
                    />
                    <AlbumArt
                        src={meta.artURL}
                        height={width}
                        width={width}
                        x={0}
                        y={headerHeight}
                    />
                    {fontLoaded ? (
                        <Meta
                            album={
                                uppercase
                                    ? meta.album.toUpperCase()
                                    : meta.album
                            }
                            artist={
                                uppercase
                                    ? meta.artist.toUpperCase()
                                    : meta.artist
                            }
                            year={
                                uppercase ? meta.year.toUpperCase() : meta.year
                            }
                            color={theme.fgColor}
                            containerHeight={metaContainerHeight}
                            fontSize={fontSize}
                            lineHeight={lineHeight}
                            yOffset={width + headerHeight}
                            margin={leftMargin}
                        />
                    ) : null}
                </Layer>
            </Stage>
            <p>
                <a className="btn" onClick={getDataUrl}>
                    download label
                </a>
                <a className="btn" onClick={redraw}>
                    redraw (fixes broken fonts and artifacts)
                </a>
            </p>
        </>
    );
};
