import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
  
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6'
    },
    white: {
      400: '#ececec',
      300: '#f6f6f6',
      100: '#FFFFFF',
    },
    customBlue: {
      500: '#3E78FF',
      400: '#6F9AFF',

    }
    
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56
  }
});
