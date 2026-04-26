import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111",
    },
  },
  semanticTokens: {
    colors: {
      "bg.page": {
        default: "gray.100",
        _dark: "gray.800",
      },
      "text.heading": {
        default: "gray.700",
        _dark: "whiteAlpha.900",
      },
      "text.muted": {
        default: "blackAlpha.600",
        _dark: "whiteAlpha.600",
      },
      "text.error": {
        default: "red.800",
        _dark: "red.300",
      },
      surface: {
        default: "white",
        _dark: "gray.700",
      },
      "surface.modal": {
        default: "white",
        _dark: "gray.800",
      },
      "surface.hover": {
        default: "gray.100",
        _dark: "whiteAlpha.100",
      },
      "border.subtle": {
        default: "gray.200",
        _dark: "whiteAlpha.200",
      },
      "link.default": {
        default: "blue.500",
        _dark: "blue.300",
      },
      "link.hover": {
        default: "blue.600",
        _dark: "blue.400",
      },
      "link.active": {
        default: "blue.700",
        _dark: "blue.500",
      },
    },
  },
  components: {
    Tabs: {
      variants: {
        brand: {
          tablist: {
            bg: "white",
            borderBottom: "1px solid",
            borderColor: "gray.200",
            px: { base: 3, md: 6 },
            py: 2,
            gap: 1,
            _dark: {
              bg: "gray.700",
              borderColor: "whiteAlpha.200",
            },
          },
          tab: {
            fontWeight: "semibold",
            fontSize: { base: "sm", md: "md" },
            borderRadius: "full",
            px: { base: 3, md: 4 },
            py: 2,
            gap: 2,
            color: "blackAlpha.600",
            _dark: {
              color: "whiteAlpha.600",
            },
            _hover: {
              bg: "gray.100",
              color: "gray.700",
              _dark: {
                bg: "whiteAlpha.100",
                color: "whiteAlpha.900",
              },
            },
            _selected: {
              bg: "blue.500",
              color: "white",
              _hover: {
                bg: "blue.600",
              },
            },
          },
          tabpanel: {
            px: 0,
            pt: 4,
            pb: 0,
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "bg.page",
      },
    },
  },
});

export default theme;
