import { changeDpiDataUrl } from "changedpi";
import * as MDLogo from "../images/md-logo.svg";
import { Theme } from "./themes";

export interface CanvasSettings {
  width: number;
  height: number;
  ppm: number;
  fontSize: number;
  lineHeight: number;
  headerHeight: number;
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
      this.settings.width * this.settings.ppm,
      this.settings.height * this.settings.ppm
    );
  }

  private setupDrawing() {
    this.canvas.height = this.settings.height * this.settings.ppm;
    this.canvas.width = this.settings.width * this.settings.ppm;
  }

  private calculateCentering(
    containerHeight: number,
    elementHeight: number,
    yOffset = 0
  ) {
    return (containerHeight - elementHeight) / 2 + yOffset;
  }

  private drawArrow() {
    // 1.2593
    let y = this.calculateCentering(
      this.settings.headerHeight * this.settings.ppm,
      1.2593 * this.settings.ppm,
      0
    );
    this.ctx.fillStyle = this.settings.theme.fgColor;

    this.ctx.beginPath();
    this.ctx.moveTo(3.25 * this.settings.ppm, y);
    this.ctx.lineTo(4.5 * this.settings.ppm, y + 1.2593 * this.settings.ppm);
    this.ctx.lineTo(2 * this.settings.ppm, y + 1.2593 * this.settings.ppm);
    this.ctx.fill();
  }

  private drawInsertText() {
    this.ctx.font = `bold ${
      this.settings.fontSize * this.settings.ppm
    }px futura-pt-bold`;
    this.ctx.fillStyle = this.settings.theme.fgColor;

    let y = this.calculateCentering(
      this.settings.headerHeight * this.settings.ppm,
      this.settings.lineHeight * this.settings.ppm,
      0
    );
    this.ctx.fillText(
      "INSERT THIS END",
      5.5 * this.settings.ppm,
      Math.round(y + this.settings.fontSize * this.settings.ppm)
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
          5 * this.settings.ppm,
          this.settings.width * this.settings.ppm,
          this.settings.width * this.settings.ppm
        );

        const imageWidth = image.width;
        const scaleFactor =
          (this.settings.width * this.settings.ppm) / imageWidth;
        const displayHeight = image.height * scaleFactor;
        this.ctx.drawImage(
          image,
          0,
          this.calculateCentering(
            this.settings.width * this.settings.ppm,
            displayHeight,
            this.settings.headerHeight * this.settings.ppm
          ),
          this.settings.width * this.settings.ppm,
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
        const scaleFactor = (logoDisplayWidth * this.settings.ppm) / imageWidth;
        const displayHeight = logo.height * scaleFactor;
        this.ctx.drawImage(
          logo,
          this.settings.width * this.settings.ppm -
            2 * this.settings.ppm -
            logoDisplayWidth * this.settings.ppm,
          this.calculateCentering(
            this.settings.headerHeight * this.settings.ppm,
            displayHeight,
            0
          ),
          logoDisplayWidth * this.settings.ppm,
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
      43 * this.settings.ppm,
      this.settings.width * this.settings.ppm,
      10 * this.settings.ppm
    );

    this.ctx.font = `bold ${
      this.settings.fontSize * this.settings.ppm
    }px futura-pt-bold`;
    this.ctx.fillStyle = this.settings.theme.fgColor;

    const metaHeight =
      (this.settings.lineHeight +
        this.settings.lineHeight +
        this.settings.fontSize) *
      this.settings.ppm;

    let y;

    y = this.calculateCentering(
      10 * this.settings.ppm,
      metaHeight,
      43 * this.settings.ppm
    );

    this.ctx.fillText(
      this.settings.uppercase ? this.meta.album.toUpperCase() : this.meta.album,
      2 * this.settings.ppm,
      Math.round(y + this.settings.fontSize * this.settings.ppm)
    );
    this.ctx.fillText(
      this.settings.uppercase
        ? this.meta.artist.toUpperCase()
        : this.meta.artist,
      2 * this.settings.ppm,
      Math.round(
        y +
          this.settings.lineHeight * this.settings.ppm +
          this.settings.fontSize * this.settings.ppm
      )
    );
    this.ctx.fillText(
      this.settings.uppercase ? this.meta.year.toUpperCase() : this.meta.year,
      2 * this.settings.ppm,
      Math.round(
        y +
          this.settings.lineHeight * this.settings.ppm +
          this.settings.lineHeight * this.settings.ppm +
          this.settings.fontSize * this.settings.ppm
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
