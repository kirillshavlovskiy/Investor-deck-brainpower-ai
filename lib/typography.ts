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

// Add type for dimension sizes
export type DimensionSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'auto';

// Update the dimension preset type
export interface DimensionPreset {
  maxWidth?: string;
  width?: string;
  className: string;
}

export type DimensionPresets = {
  [key in keyof typeof typographyPresets.apple]: {
    [size in DimensionSize]: DimensionPreset;
  };
};

// Add text positioning presets
export const textPositioningPresets = {
  indent: {
    none: '0',
    xs: '0.5em',
    sm: '1em',
    md: '1.5em',
    lg: '2em',
    xl: '3em',
    '2xl': '4em'
  },
  verticalAlign: {
    top: {
      alignItems: 'flex-start',
      alignSelf: 'flex-start'
    },
    center: {
      alignItems: 'center',
      alignSelf: 'center'
    },
    bottom: {
      alignItems: 'flex-end',
      alignSelf: 'flex-end'
    },
    baseline: {
      alignItems: 'baseline',
      alignSelf: 'baseline'
    },
    stretch: {
      alignItems: 'stretch',
      alignSelf: 'stretch'
    }
  }
}