import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`
  },
  colors: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F4F6F8',
      blue: '#005A9B',
      dark: '#092232',
      light: '#FFFFFF'
    },
    text: {
      primary: '#002946',
      secondary: {
        100: '#7893A7',
        200: '#8A9EAD'
      },
      blue: '#005A9B',
      light: '#FFFFFF',
      gray: '#AAA9A9'
    },
    border: {
      primary: '#E3E3E3'
    }
  }
});
