import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  fonts: {
    heading: `'Syne', sans-serif`,
    body: `'DM Sans', sans-serif`,
  },
  colors: {
    brand: {
      50: '#fff0f6',
      100: '#ffd6e8',
      200: '#ffadd0',
      300: '#ff85b8',
      400: '#ff5ca0',
      500: '#ff2d87',
      600: '#e0006e',
      700: '#b30057',
      800: '#860040',
      900: '#59002a',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#0a0a0f',
        color: 'whiteAlpha.900',
      },
      '*': {
        fontFamily: `'DM Sans', sans-serif`,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode="dark" />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);