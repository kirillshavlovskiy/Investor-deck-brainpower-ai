import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add these typography constants
export const fontFamilies = [
  'System UI, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  'Inter, sans-serif',
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Roboto, sans-serif',
  'Open Sans, sans-serif',
  'Montserrat, sans-serif',
  'Poppins, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Playfair Display, serif',
  'Merriweather, serif',
  'Courier New, monospace',
  'SF Mono, monospace',
  'Fira Code, monospace',
  'JetBrains Mono, monospace',
] as const;

export const fontSizes = [
  '11px', '12px', '13px', '14px', '15px', '16px', '17px', 
  '18px', '19px', '20px', '21px', '22px', '23px', '24px',
  '28px', '32px', '36px', '40px', '44px', '48px', '56px', 
  '64px', '72px', '80px', '96px', '128px'
] as const;

export const fontWeights = ['400', '500', '600', '700'] as const;

export const letterSpacings = [
  '-0.015em',    // Apple main heading
  '-0.012em',    // Tight
  '-0.010em',    // Slightly tight
  '-0.008em',
  '-0.005em',
  '-0.003em',    // Apple Display style
  '-0.002em',
  '0',           // Normal
  '0.002em',
  '0.004em',
  '0.007em',     // Apple Headline
  '0.010em',
  '0.012em',     // Apple Caption
  '0.015em',     // Loose
  '0.020em',     // Very loose
  '0.025em'      // Extra loose
] as const;

export const lineHeights = [
  '1', '1.05', '1.1', '1.15', '1.2', '1.25', '1.3', '1.35', 
  '1.4', '1.45', '1.47059', '1.5', '1.6', '1.7', '1.75', '2'
] as const;

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
      className: 'text-[96px] font-bold leading-tight tracking-tight'
    },
    heading: {
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontSize: '80px',
      fontWeight: '700',
      letterSpacing: '-0.015em',
      lineHeight: '1.05',
      color: '#1d1d1f',
      className: 'text-[80px] font-bold leading-tight tracking-tight'
    },
    mainTitle: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '56px',
      fontWeight: '600',
      letterSpacing: '-0.015em',
      lineHeight: '1.1',
      color: '#1d1d1f',
      className: 'text-[56px] font-semibold leading-tight tracking-tight'
    },
    title: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '48px',
      fontWeight: '500',
      letterSpacing: '-0.015em',
      lineHeight: '1.05',
      color: '#1d1d1f',
      className: 'text-5xl font-medium leading-tight tracking-tight'
    },
    subtitle: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '32px',
      fontWeight: '500',
      letterSpacing: '-0.01em',
      lineHeight: '1.05',
      color: '#18181b',
      className: 'text-3xl font-medium leading-tight tracking-tight'
    },
    description: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '21px',
      fontWeight: '400',
      letterSpacing: 'normal',
      lineHeight: '1.4',
      color: '#52525b',
      className: 'text-xl font-normal leading-relaxed'
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
      className: 'text-2xl font-normal leading-snug tracking-tight'
    },
    body: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '17px',
      fontWeight: '400',
      letterSpacing: '0',
      lineHeight: '1.47059',
      color: '#1d1d1f',
      className: 'text-base font-normal leading-relaxed'
    },
    link: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '17px',
      fontWeight: '500',
      letterSpacing: 'normal',
      lineHeight: '1.4',
      color: '#0066CC',
      className: 'text-base font-medium leading-relaxed text-blue-600'
    },
    cta: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '20px',
      fontWeight: '500',
      letterSpacing: '-0.01em',
      lineHeight: '1.2',
      color: '#1d1d1f',
      className: 'text-lg font-medium leading-snug tracking-tight'
    },
    headline: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '21px',
      fontWeight: '600',
      letterSpacing: '0.007em',
      lineHeight: '1.47059',
      color: '#1d1d1f',
      className: 'text-xl font-semibold leading-relaxed tracking-wider'
    },
    callout: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '16px',
      fontWeight: '400',
      letterSpacing: '0',
      lineHeight: '1.47059',
      color: '#1d1d1f',
      className: 'text-base font-normal leading-relaxed'
    },
    subheadline: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '15px',
      fontWeight: '400',
      letterSpacing: '0',
      lineHeight: '1.47059',
      color: '#1d1d1f',
      className: 'text-sm font-normal leading-relaxed'
    },
    footnote: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '13px',
      fontWeight: '400',
      letterSpacing: '0',
      lineHeight: '1.47059',
      color: '#1d1d1f',
      className: 'text-xs font-normal leading-relaxed'
    },
    caption1: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: '400',
      letterSpacing: '0.012em',
      lineHeight: '1.47059',
      color: '#1d1d1f',
      className: 'text-xs font-normal leading-relaxed tracking-wide'
    },
    caption2: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '11px',
      fontWeight: '400',
      letterSpacing: '0.012em',
      lineHeight: '1.47059',
      color: '#1d1d1f',
      className: 'text-[11px] font-normal leading-relaxed tracking-wide'
    }
  }
};

// Update the type definition to only use apple typography
export type TypographyStyle = keyof typeof typographyPresets.apple;

// Add Apple-style spacing presets
export const spacingPresets = {
  margin: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px'
  },
  padding: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px'
  },
  gap: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px'
  },
  whitespace: {
    'none': '0',
    'tight': '0.5',
    'normal': '1',
    'relaxed': '1.5',
    'loose': '2'
  },
  tabulation: {
    'none': '0px',
    'small': '16px',
    'medium': '24px',
    'large': '32px',
    'xl': '48px'
  }
} as const;

// Update SpacingKey type to be more specific
export type SpacingKey = 
  | 'none' 
  | 'xs' 
  | 'sm' 
  | 'md' 
  | 'lg' 
  | 'xl' 
  | '2xl' 
  | '3xl';

// Default spacing values based on Apple's 8px grid
export const defaultSpacing = {
  margin: {
    card: spacingPresets.margin.lg,    // 24px
    section: spacingPresets.margin['3xl'], // 48px
    text: spacingPresets.margin.md     // 16px
  },
  padding: {
    card: spacingPresets.padding.xl,    // 32px
    section: spacingPresets.padding['2xl'], // 40px
    text: spacingPresets.padding.lg     // 24px
  },
  gap: {
    card: spacingPresets.gap.md,       // 16px
    section: spacingPresets.gap.xl,     // 32px
    text: spacingPresets.gap.sm         // 8px
  },
  whitespace: {
    text: spacingPresets.whitespace.normal,
    heading: spacingPresets.whitespace.tight
  },
  tabulation: {
    text: spacingPresets.tabulation.none,
    list: spacingPresets.tabulation.medium
  }
} as const;

// Add pricingBlocks definition
export const pricingBlocks = [
  {
    title: "Individual",
    price: "$19.95/mo.",
    saveAmount: "$9/mo.",
    description: "with your Business Pro Plan",
    priceColor: '#f56300', // Apple orange
    features: [
      { name: "Scalable with your business", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
      { name: "Cloud based", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
      { name: "Pay as you go", icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" },
      { name: "24/7 support", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }
    ]
  },
  {
    title: "Family",
    price: "$25.95/mo.",
    saveAmount: "$11/mo.",
    description: "with your Business Pro Plan",
    priceColor: '#ff375f', // Apple pink
    features: [
      { name: "Scalable with your business", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
      { name: "Cloud based", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
      { name: "Pay as you go", icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" },
      { name: "24/7 support", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }
    ]
  },
  {
    title: "Premier",
    price: "$37.95/mo.",
    saveAmount: "$29/mo.",
    description: "with your Business Pro Plan",
    priceColor: '#bf5af2', // Apple purple
    features: [
      { name: "Scalable with your business", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
      { name: "Cloud based", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
      { name: "Pay as you go", icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" },
      { name: "24/7 support", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }
    ]
  }
];

// Add buttonPresets definition
export const buttonPresets = {
  'Primary': {
    className: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all transform hover:scale-105",
    text: "Get Started",
    typography: typographyPresets.apple.cta
  }
} as const;
