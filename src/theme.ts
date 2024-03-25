import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`
  },
  colors: {
    background: {
      red: '#FF0000',
      primary: '#FFFFFF',
      secondary: '#F4F6F8',
      blue: {
        100: '#005A9B',
        200: '#1B425E'
      },
      dark: '#000000',
      light: '#FFFFFF',
      gray: {
        primary: '#C7D8E5',
        secondary: '#8699A6'
      }
    },
    text: {
      primary: '#000000',
      secondary: {
        100: '#7893A7',
        200: '#8A9EAD'
      },
      blue: {
        100: '#005A9B',
        200: '#0C66E4'
      },
      light: '#FFFFFF',
      gray: {
        100: '#AAA9A9',
        200: '#4C4C4C',
        300: '#3A3A3A'
      }
    },
    border: {
      primary: '#E3E3E3',
      secondary: '#BDCAD3'
    }
  },
  styles: {
    global: {
      h1: {
        fontSize: '4xl',
        fontWeight: 'bold'
      },
      h2: {
        fontSize: '3xl',
        fontWeight: 'bold'
      },
      h3: {
        fontSize: '2xl',
        fontWeight: 'bold'
      },
      h4: {
        fontSize: 'xl',
        fontWeight: 'bold'
      },
      h5: {
        fontSize: 'lg',
        fontWeight: 'bold'
      },
      h6: {
        fontSize: 'md',
        fontWeight: 'bold'
      }
    }
  }
});
