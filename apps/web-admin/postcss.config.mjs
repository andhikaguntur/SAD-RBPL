const config = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '52em',
        'mantine-breakpoint-md': '64em',
        'mantine-breakpoint-lg': '80em',
        'mantine-breakpoint-xl': '96em',
      },
    },
    "@tailwindcss/postcss": {} 
  },
};

export default config;
