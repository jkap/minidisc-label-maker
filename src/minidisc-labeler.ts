import { changeDpiDataUrl } from "changedpi";
import * as MDLogo from "../images/md-logo.svg";
import { Theme } from "./themes";

function ppm(mm: number): number {
  return 11.811 * mm;
}

export interface CanvasSettings {
  width: number;
  height: number;
  fontSize: number;
  lineHeight: number;
  headerHeight: number;
  metaContainerHeight: number;
  leftMargin: number;
  theme: Theme;
  uppercase: boolean;
}

export interface Metadata {
  artist: string;
  album: string;
  year: string;
  artURL: string;
}

export class MinidiscLabeler {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  settings: CanvasSettings;

  meta: Metadata;

  constructor(
    canvas: HTMLCanvasElement,
    settings: CanvasSettings,
    intialMeta: Metadata
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.settings = settings;
    this.meta = intialMeta;
    this.setupDrawing();
  }

  draw() {
    this.initCanvas();
    this.drawArrow();
    this.drawInsertText();
    this.drawAlbumArt();
    this.drawMDLogo();
    this.drawMeta();
  }

  private initCanvas() {
    this.ctx.fillStyle = this.settings.theme.bgColor;
    this.ctx.fillRect(
      0,
      0,
      ppm(this.settings.width),
      ppm(this.settings.height)
    );
  }

  private setupDrawing() {
    this.canvas.height = ppm(this.settings.height);
    this.canvas.width = ppm(this.settings.width);
  }

  private calculateCentering(
    containerHeight: number,
    elementHeight: number,
    yOffset = 0
  ) {
    return (containerHeight - elementHeight) / 2 + yOffset;
  }

  private drawArrow() {
    const ARROW_HEIGHT = 1.25;
    let y = this.calculateCentering(
      ppm(this.settings.headerHeight),
      ppm(ARROW_HEIGHT),
      0
    );
    this.ctx.fillStyle = this.settings.theme.fgColor;

    this.ctx.beginPath();
    this.ctx.moveTo(ppm(this.settings.leftMargin + ARROW_HEIGHT), y);
    this.ctx.lineTo(
      ppm(this.settings.leftMargin + ARROW_HEIGHT * 2),
      y + ppm(ARROW_HEIGHT)
    );
    this.ctx.lineTo(ppm(this.settings.leftMargin), y + ppm(ARROW_HEIGHT));
    this.ctx.fill();
  }

  private drawInsertText() {
    this.ctx.font = `bold ${ppm(this.settings.fontSize)}px futura-pt-bold`;
    this.ctx.fillStyle = this.settings.theme.fgColor;

    let y = this.calculateCentering(
      ppm(this.settings.headerHeight),
      ppm(this.settings.lineHeight),
      0
    );
    this.ctx.fillText(
      "INSERT THIS END",
      ppm(5.5),
      Math.round(y + ppm(this.settings.fontSize))
    );
  }

  private drawAlbumArt() {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.addEventListener(
      "load",
      () => {
        this.ctx.fillStyle = this.settings.theme.bgColor;
        this.ctx.fillRect(
          0,
          ppm(5),
          ppm(this.settings.width),
          ppm(this.settings.width)
        );

        let displayWidth: number;
        let displayHeight: number;
        let scaleFactor: number;

        if (image.width >= image.height) {
          displayWidth = ppm(this.settings.width);
          scaleFactor = ppm(this.settings.width) / image.width;
          displayHeight = image.height * scaleFactor;
        } else {
          displayHeight = ppm(this.settings.width);
          scaleFactor = ppm(this.settings.width) / image.height;
          displayWidth = image.width * scaleFactor;
        }

        this.ctx.drawImage(
          image,
          this.calculateCentering(ppm(this.settings.width), displayWidth),
          this.calculateCentering(
            ppm(this.settings.width),
            displayHeight,
            ppm(this.settings.headerHeight)
          ),
          displayWidth,
          displayHeight
        );
      },
      false
    );
    image.src = this.meta.artURL;
  }

  private drawMDLogo() {
    const logo = new Image();
    const logoDisplayWidth = 3.688;
    logo.crossOrigin = "anonymous";
    logo.addEventListener(
      "load",
      () => {
        const imageWidth = logo.width;
        const scaleFactor = ppm(logoDisplayWidth) / imageWidth;
        const displayHeight = logo.height * scaleFactor;
        this.ctx.drawImage(
          logo,
          ppm(
            this.settings.width - this.settings.leftMargin - logoDisplayWidth
          ),
          this.calculateCentering(
            ppm(this.settings.headerHeight),
            displayHeight,
            0
          ),
          ppm(logoDisplayWidth),
          displayHeight
        );
      },
      false
    );

    logo.src = MDLogo;
  }

  private drawMeta() {
    this.ctx.fillStyle = this.settings.theme.bgColor;
    this.ctx.fillRect(
      0,
      ppm(this.settings.width + this.settings.headerHeight),
      ppm(this.settings.width),
      ppm(this.settings.metaContainerHeight)
    );

    this.ctx.font = `bold ${ppm(this.settings.fontSize)}px futura-pt-bold`;
    this.ctx.fillStyle = this.settings.theme.fgColor;

    const metaContentHeight = ppm(
      this.settings.lineHeight +
        this.settings.lineHeight +
        this.settings.fontSize
    );

    let y;

    y = this.calculateCentering(
      ppm(this.settings.metaContainerHeight),
      metaContentHeight,
      ppm(this.settings.width + this.settings.headerHeight)
    );

    this.ctx.fillText(
      this.settings.uppercase ? this.meta.album.toUpperCase() : this.meta.album,
      ppm(this.settings.leftMargin),
      Math.round(y + ppm(this.settings.fontSize))
    );
    this.ctx.fillText(
      this.settings.uppercase
        ? this.meta.artist.toUpperCase()
        : this.meta.artist,
      ppm(this.settings.leftMargin),
      Math.round(
        y + ppm(this.settings.lineHeight) + ppm(this.settings.fontSize)
      )
    );
    this.ctx.fillText(
      this.settings.uppercase ? this.meta.year.toUpperCase() : this.meta.year,
      ppm(this.settings.leftMargin),
      Math.round(
        y +
          ppm(this.settings.lineHeight) +
          ppm(this.settings.lineHeight) +
          ppm(this.settings.fontSize)
      )
    );
  }

  setArtist(artist: string) {
    this.meta.artist = artist;
    this.drawMeta();
  }

  setAlbum(album: string) {
    this.meta.album = album;
    this.drawMeta();
  }

  setYear(year: string) {
    this.meta.year = year;
    this.drawMeta();
  }

  setAlbumArt(artURL: string) {
    this.meta.artURL = artURL;
    this.drawAlbumArt();
  }

  setTheme(theme: Theme) {
    this.settings.theme = theme;
    this.draw();
  }

  setUppercase(uppercase: boolean) {
    this.settings.uppercase = uppercase;
    this.drawMeta();
  }

  getDataURL(): string {
    let url = this.canvas.toDataURL("image/png");
    url = changeDpiDataUrl(url, 300);
    return url;
  }
}
