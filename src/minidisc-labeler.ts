import { changeDpiDataUrl } from "changedpi";
import * as MDLogo from "../images/md-logo.png";
import { Theme } from "./themes";

const PPM_FACTOR = 11.811;

function ppm(mm: number): number {
  return PPM_FACTOR * mm;
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
    this.ctx.fillRect(0, 0, this.settings.width, this.settings.height);
  }

  private setupDrawing() {
    this.canvas.height = ppm(this.settings.height);
    this.canvas.width = ppm(this.settings.width);
    this.ctx.scale(PPM_FACTOR, PPM_FACTOR);
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
      this.settings.headerHeight,
      ARROW_HEIGHT,
      0
    );
    this.ctx.fillStyle = this.settings.theme.fgColor;

    this.ctx.beginPath();
    this.ctx.moveTo(this.settings.leftMargin + ARROW_HEIGHT, y);
    this.ctx.lineTo(
      this.settings.leftMargin + ARROW_HEIGHT * 2,
      y + ARROW_HEIGHT
    );
    this.ctx.lineTo(this.settings.leftMargin, y + ARROW_HEIGHT);
    this.ctx.fill();
  }

  private drawInsertText() {
    this.ctx.font = `bold ${this.settings.fontSize}px futura-pt-bold`;
    this.ctx.fillStyle = this.settings.theme.fgColor;

    let y = this.calculateCentering(
      this.settings.headerHeight,
      this.settings.lineHeight,
      0
    );
    this.ctx.fillText(
      "INSERT THIS END",
      5.5,
      Math.round(y + this.settings.fontSize)
    );
  }

  private drawAlbumArt() {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.addEventListener(
      "load",
      () => {
        this.ctx.fillStyle = this.settings.theme.bgColor;
        this.ctx.fillRect(0, 5, this.settings.width, this.settings.width);

        let displayWidth: number;
        let displayHeight: number;
        let scaleFactor: number;

        if (image.width >= image.height) {
          displayWidth = this.settings.width;
          scaleFactor = this.settings.width / image.width;
          displayHeight = image.height * scaleFactor;
        } else {
          displayHeight = this.settings.width;
          scaleFactor = this.settings.width / image.height;
          displayWidth = image.width * scaleFactor;
        }

        this.ctx.drawImage(
          image,
          this.calculateCentering(this.settings.width, displayWidth),
          this.calculateCentering(
            this.settings.width,
            displayHeight,
            this.settings.headerHeight
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
    logo.crossOrigin = "anonymous";
    logo.addEventListener(
      "load",
      () => {
        const displayWidth = logo.width / PPM_FACTOR;
        const displayHeight = logo.height / PPM_FACTOR;
        this.ctx.drawImage(
          logo,
          this.settings.width - this.settings.leftMargin - displayWidth,
          this.calculateCentering(this.settings.headerHeight, displayHeight, 0),
          displayWidth,
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
      this.settings.width + this.settings.headerHeight,
      this.settings.width,
      this.settings.metaContainerHeight
    );

    this.ctx.font = `bold ${this.settings.fontSize}px futura-pt-bold`;
    this.ctx.fillStyle = this.settings.theme.fgColor;

    const metaContentHeight =
      this.settings.lineHeight +
      this.settings.lineHeight +
      this.settings.fontSize;
    let y;

    y = this.calculateCentering(
      this.settings.metaContainerHeight,
      metaContentHeight,
      this.settings.width + this.settings.headerHeight
    );

    // album
    this.ctx.fillText(
      this.settings.uppercase ? this.meta.album.toUpperCase() : this.meta.album,
      this.settings.leftMargin,
      Math.round(y + this.settings.fontSize)
    );

    // artist
    this.ctx.fillText(
      this.settings.uppercase
        ? this.meta.artist.toUpperCase()
        : this.meta.artist,
      this.settings.leftMargin,
      Math.round(y + this.settings.lineHeight + this.settings.fontSize)
    );

    // year
    this.ctx.fillText(
      this.settings.uppercase ? this.meta.year.toUpperCase() : this.meta.year,
      this.settings.leftMargin,
      Math.round(
        y +
          this.settings.lineHeight +
          this.settings.lineHeight +
          this.settings.fontSize
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
