type ThemeShared = {
  textActive: string;
  checkBackgroundPrimary: string;
  checkBackgroundSecondary: string;
};

type Theme = {
  body: string;
  mainBackground: string;
  text: string;
  textDisabled: string;
  textHover: string;
} & ThemeShared;

const shared: ThemeShared = {
  textActive: 'hsl(220, 98%, 61%)',
  checkBackgroundPrimary: 'hsl(192, 100%, 67%)',
  checkBackgroundSecondary: 'hsl(280, 87%, 65%)'
};

export const lightTheme: Theme = {
  ...shared,
  body: 'hsl(236, 33%, 92%)',
  mainBackground: 'hsl(0, 0%, 98%)',
  text: 'hsl(236, 9%, 61%)',
  textDisabled: 'hsl(233, 11%, 84%)',
  textHover: 'hsl(235, 19%, 35%)'
};

export const darkTheme: Theme = {
  ...shared,
  body: 'hsl(235, 21%, 11%)',
  mainBackground: 'hsl(235, 24%, 19%)',
  text: 'hsl(234, 39%, 85%)',
  textDisabled: 'hsl(234, 11%, 52%)',
  textHover: 'hsl(236, 33%, 92%)'
};
