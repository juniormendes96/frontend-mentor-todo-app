type ThemeShared = {
  title: string;
  textActive: string;
  checkBackgroundPrimary: string;
  checkBackgroundSecondary: string;
};

type Theme = {
  body: string;
  border: string;
  mainBackground: string;
  text: string;
  textDisabled: string;
  textHover: string;
  scrollbarThumb: string;
} & ThemeShared;

const shared: ThemeShared = {
  title: '#e4e5f1',
  textActive: '	#3a7bfd',
  checkBackgroundPrimary: '#57ddff',
  checkBackgroundSecondary: '#c058f3'
};

export const lightTheme: Theme = {
  ...shared,
  body: '#e4e5f1',
  border: '#d2d3db',
  mainBackground: '#fafafa',
  text: '#484b6a',
  textDisabled: '#9394a5',
  textHover: '#161722',
  scrollbarThumb: 'rgba(22, 23, 34, 0.2)'
};

export const darkTheme: Theme = {
  ...shared,
  body: '#161722',
  border: '#4d5066',
  mainBackground: '#25273c',
  text: '#cacde8',
  textDisabled: '#777a92',
  textHover: '#e4e5f1',
  scrollbarThumb: 'rgba(22, 23, 34, 0.5)'
};
