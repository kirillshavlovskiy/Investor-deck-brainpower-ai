export const typographyPresets = {
  apple: {
    mainHeading: {
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontSize: '96px',
      fontWeight: '700',
      letterSpacing: '-0.015em',
      lineHeight: '1.05',
      color: '#1d1d1f',
      marginBottom: '32px',
      className: 'text-[96px] font-bold tracking-tight leading-tight'
    },
    heading: {
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontSize: '80px',
      fontWeight: '700',
      letterSpacing: '-0.015em',
      lineHeight: '1.05',
      color: '#1d1d1f',
      className: 'text-[80px] font-bold tracking-tight leading-tight'
    },
    mainTitle: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '56px',
      fontWeight: '600',
      letterSpacing: '-0.015em',
      lineHeight: '1.1',
      color: '#1d1d1f',
      className: 'text-[56px] font-semibold tracking-tight leading-tight'
    },
    title: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '48px',
      fontWeight: '500',
      letterSpacing: '-0.015em',
      lineHeight: '1.05',
      color: '#1d1d1f',
      className: 'text-[48px] font-medium tracking-tight leading-tight'
    },
    subtitle: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '32px',
      fontWeight: '500',
      letterSpacing: '-0.01em',
      lineHeight: '1.05',
      color: '#18181b',
      className: 'text-[32px] font-medium tracking-tight leading-tight'
    },
    bodyText: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '28px',
      fontWeight: '400',
      letterSpacing: '-0.015em',
      lineHeight: '1.25',
      color: '#1d1d1f',
      marginBottom: '16px',
      maxWidth: '1000px',
      className: 'text-[28px] font-normal tracking-tight leading-snug'
    },
    description: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '21px',
      fontWeight: '400',
      letterSpacing: 'normal',
      lineHeight: '1.4',
      color: '#52525b',
      className: 'text-[21px] font-normal leading-relaxed'
    },
    body: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '17px',
      fontWeight: '400',
      letterSpacing: '0',
      lineHeight: '1.47059',
      color: '#1d1d1f',
      className: 'text-[17px] font-normal leading-normal'
    },
    link: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '17px',
      fontWeight: '500',
      letterSpacing: 'normal',
      lineHeight: '1.4',
      color: '#0066CC',
      className: 'text-[17px] font-medium leading-normal text-blue-600'
    },
    cta: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '20px',
      fontWeight: '500',
      letterSpacing: '-0.01em',
      lineHeight: '1.2',
      color: '#1d1d1f',
      className: 'text-[20px] font-medium tracking-tight leading-snug'
    }
  }
}

export const exampleContent = {
  pricing: {
    title: "Individual",
    price: "$19.95/mo.",
    save: "Save $9/mo.** on your favorite content and iCloud+ storage.",
    features: [
      "iCloud+ 50GB",
      "tv+",
      "Music",
      "Arcade"
    ]
  }
}

export type TypographyPreset = keyof typeof typographyPresets;
export type TypographyStyle = keyof typeof typographyPresets.apple;

// Add dimension presets
export const dimensionPresets = {
  mainHeading: {
    narrow: {
      maxWidth: '60%', // 60% of container
      width: 'auto',
      ratio: '3/1', // wide and short
      className: 'max-w-[60%] aspect-[3/1]'
    },
    medium: {
      maxWidth: '75%',
      width: 'auto',
      ratio: '2/1',
      className: 'max-w-[75%] aspect-[2/1]'
    },
    wide: {
      maxWidth: '90%',
      width: 'auto',
      ratio: '3/2',
      className: 'max-w-[90%] aspect-[3/2]'
    }
  },
  bodyText: {
    narrow: {
      maxWidth: '45ch', // character-based width
      className: 'max-w-[45ch]'
    },
    medium: {
      maxWidth: '65ch',
      className: 'max-w-[65ch]'
    },
    wide: {
      maxWidth: '85ch',
      className: 'max-w-[85ch]'
    }
  },
  contentBlock: {
    compact: {
      width: '320px',
      className: 'w-[320px]'
    },
    standard: {
      width: '480px',
      className: 'w-[480px]'
    },
    wide: {
      width: '640px',
      className: 'w-[640px]'
    }
  }
}