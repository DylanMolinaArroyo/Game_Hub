import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: '#f9f9f9',
      100: '#ededed',
      200: '#d3d3d3',
      300: '#b3b3b3',
      400: '#a0a0a0',
      500: '#898989',
      600: '#6c6c6c',
      700: '#202020',
      800: '#121212',
      900: '#111',
    },
  },
  components: {
    Switch: {
      variants: {
        sunMode: {
          track: {
            bg: "yellow.300",
          },
          thumb: {
            bg: "yellow.500",
          },
        },
        moonMode: {
          track: {
            bg: "blue.800",
          },
          thumb: {
            bg: "blue.600",
          },
        },
      },
    },
  },
});

export default theme;
