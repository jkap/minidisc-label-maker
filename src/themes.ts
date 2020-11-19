export interface Theme {
  bgColor: string;
  fgColor: string;
}

const dark: Theme = {
  fgColor: "white",
  bgColor: "#231F20",
};

const light: Theme = {
  fgColor: "black",
  bgColor: "white",
};

export const Themes = {
  Dark: dark,
  Light: light,
};
