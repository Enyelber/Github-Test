const breakpoints = ['40em', '64em', '80em']
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const space = [0, 4, 8, 16, 32, 48]
space.small = space[1]
space.medium = space[2]
space.large = space[3]

export default {
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  initialColorMode: 'light',
  colors: {
    text: '#000000',
    muted: '#aaaaaa',
    background: '#f8f8f8',
    foreground: '#ffffff',
    primary: '#92b955',
    secondary: '#9f8a6d',
    third: '#061191',
    fourth: '#c70707',
    modes: {
      dark: {
        text: '#ffffff',
        background: '#111111',
        foreground: '#333333',
        primary: '#1da1f2',
      },
    },
  },
  space,
  breakpoints,
  styles: {
    Layout: {
      color: 'text',
      backgroundColor: 'background',
      fontFamily: 'body',
      lineHeight: 'body',
    },
    Container: {
      maxWidth: 1160,
      padding: 3,
    },
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: 'bold',
    },
    input: {
      borderColor: 'gray',
      '&:focus': {
        borderColor: 'primary',
        boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none',
      },
    },
    select: {
      borderColor: 'gray',
      '&:focus': {
        borderColor: 'primary',
        boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none',
      },
    },
    textarea: {
      borderColor: 'gray',
      '&:focus': {
        borderColor: 'primary',
        boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none',
      },
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'muted',
    },
  },
}
