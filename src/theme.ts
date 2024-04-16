import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`
  },
  colors: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F3F4F4',
      blue: {
        100: '#065EA6',
        200: '#1B425E'
      },
      dark: '#171515',
      light: '#FFFFFF',
      gray: {
        primary: '#C7D8E5',
        secondary: '#8699A6'
      }
    },
    text: {
      primary: '#171515',
      secondary: {
        100: '#939598',
        200: '#8A9EAD'
      },
      blue: '#065EA6',
      light: '#FFFFFF',
      gray: '#AAA9A9'
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
