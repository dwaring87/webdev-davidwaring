import { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default <Config> {
  content: [],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        body: {
          background: {
            DEFAULT: colors.white,
            dark: colors.neutral['900']
          },
          text: {
            DEFAULT: colors.gray['900'],
            dark: colors.gray['200']
          }
        },

        primary: {
          light: colors.sky['700'],
          DEFAULT: colors.sky['800'],
          text: colors.white
        },

        secondary: {
          light: colors.yellow['400'],
          DEFAULT: colors.yellow['500'],
          text: colors.gray['800']
        },

        rt: {
          DEFAULT: '#00897B',
          mnr: '#c62828',
          lirr: '#0f47a1'
        }
      }
    },
  },
  plugins: [],
};
