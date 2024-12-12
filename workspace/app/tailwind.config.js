/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  prefix: "tw-", // Damit wir keine Konflikte mit Mantine bekommen
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
    colors: {
      border: "#B5B5B5",
      input: "#B5B5B5",
      ring: "#B5B5B5",
      background: '#FFF',
      foreground: '#000',
      primary: {
        DEFAULT: '#A90000',
        0: '#FBDFDD',
        1: '#EBAEA9',
        2: '#D26D65',
        3: '#BA3333',
        4: '#A90000',
        5: '#760000',
        foreground: '#FFFFFF'
      },
      secondary: {
        DEFAULT: '#FF9150',
        0: '#FCEEDD',
        1: '#FFD3B9',
        2: '#FFBD96',
        3: '#FFA773',
        4: '#FF9150',
        5: '#D86420',
        foreground: '#FFFFFF'
      },
      destructive: {
        DEFAULT: '#CC0300',
        0: '#FFDFDF',
        1: '#F0B3B2', 
        2: '#E58180',
        3: '#CC0300',
        4: '#8A1F17',
        5: '#4C0000',
        foreground: '#FFFFFF'
      },
      success: {
        DEFAULT: '#0AA949',
        0: '#EEF8F2',
        1: '#DAF2E4',
        2: '#6CCB92',
        3: '#0AA949',
        4: '#008D39',
        5: '#005A06',
        foreground: '#FFFFFF'
      },
      warning: {
        DEFAULT: '#EBE361',
        0: '#FEFDF1',
        1: '#FDFADC',
        2: '#FBF4B9',
        3: '#EBE361',
        4: '#D3C750',
        5: '#999146',
        foreground: '#FFFFFF'
      },
      notice: {
        DEFAULT: '#96A8E4',
        0: '#F4F6FE',
        1: '#E9EDFD',
        2: '#C7D3FB',
        3: '#96A8E4',
        4: '#5B74C7',
        5: '#3A4C88',
        foreground: '#FFFFFF'
      },
      muted: {
        DEFAULT: '#F6F6F5',
        0: '#FFFFFF',
        1: '#F9F9F9', 
        2: '#F6F6F5',
        3: '#F0F0F0',
        4: '#ECECEC',
        5: '#D6D6D6',
        6: '#B5B5B5',
        7: '#949494',
        8: '#767676',
        9: '#4C4C4C',
        10: '#3D3D3D',
        11: '#303030',
        foreground: '#4C4C4C'
      },
      accent: {
        DEFAULT: '#F6F6F5',
        foreground: '#4C4C4C'
      },
      popover: {
        DEFAULT: '#FFF',
        foreground: '#000'
      },
      card: {
        DEFAULT: '#FFF',
        foreground: '#000'
      },
      chart: {
        0: '#EEF8F2',
        1: '#DAF2E4',
        2: '#6CCB92',
        3: '#0AA949',
        4: '#008D39'
      },
      transparency: {
        0: 'rgba(0, 0, 0, 0.1)',
        1: 'rgba(0, 0, 0, 0.2)',
        2: 'rgba(0, 0, 0, 0.3)',
        3: 'rgba(0, 0, 0, 0.4)',
        4: 'rgba(0, 0, 0, 0.5)',
        5: 'rgba(0, 0, 0, 0.6)',
        6: 'rgba(0, 0, 0, 0.7)',
        7: 'rgba(0, 0, 0, 0.8)',
        8: 'rgba(0, 0, 0, 0.9)',
        9: 'rgba(0, 0, 0, 0.97)'
      },
      "transparency-2": {
        0: 'rgba(246, 246, 245, 0.1)',
        1: 'rgba(246, 246, 245, 0.2)',
        2: 'rgba(246, 246, 245, 0.3)',
        3: 'rgba(246, 246, 245, 0.4)',
        4: 'rgba(246, 246, 245, 0.5)',
        5: 'rgba(246, 246, 245, 0.6)',
        6: 'rgba(246, 246, 245, 0.7)',
        7: 'rgba(246, 246, 245, 0.8)',
        8: 'rgba(246, 246, 245, 0.9)',
        9: 'rgba(246, 246, 245, 0.97)'
      },
      "transparency-3": {
        0: 'rgba(255, 255, 255, 0.1)',
        1: 'rgba(255, 255, 255, 0.2)',
        2: 'rgba(255, 255, 255, 0.3)',
        3: 'rgba(255, 255, 255, 0.4)',
        4: 'rgba(255, 255, 255, 0.5)',
        5: 'rgba(255, 255, 255, 0.6)',
        6: 'rgba(255, 255, 255, 0.7)',
        7: 'rgba(255, 255, 255, 0.8)',
        8: 'rgba(255, 255, 255, 0.9)',
        9: 'rgba(255, 255, 255, 0.97)'
      }
    },
    borderRadius: {
      lg: '.5rem',
      md: 'calc(.5rem - 2px)',
      sm: 'calc(.5rem - 4px)'
    },
  },
}