import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F4F6F8',
      blue: '#005A9B',
      dark: '#092232'
    },
    text: {
      primary: '#002946',
      secondary: '#7893A7',
      blue: '#005A9B',
      light: '#FFFFFF'
    }
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`
  }
});
