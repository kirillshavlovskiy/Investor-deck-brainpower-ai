import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const typographyPresets = {
  // ... other presets

  apple: {
    mainHeading: {
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontSize: '96px',
      fontWeight: '700',
      letterSpacing: '-0.015em',
      lineHeight: '1.05',
      color: '#1d1d1f',
      marginBottom: '32px'
    },
    title: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '48px',
      fontWeight: '500',
      letterSpacing: '-0.015em',
      lineHeight: '1.05',
      color: '#1d1d1f'
    },
    subtitle: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '32px',
      fontWeight: '500',
      letterSpacing: '-0.01em',
      lineHeight: '1.05',
      color: '#18181b'
    },
    description: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '21px',
      fontWeight: '400',
      letterSpacing: 'normal',
      lineHeight: '1.4',
      color: '#52525b'
    },
    bodyText: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '28px',
      fontWeight: '400',
      letterSpacing: '-0.015em',
      lineHeight: '1.25',
      color: '#1d1d1f',
      marginBottom: '16px',
      maxWidth: '1000px'
    },
    link: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '17px',
      fontWeight: '500',
      letterSpacing: 'normal',
      lineHeight: '1.4',
      color: '#0066CC'
    },
    cta: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '20px',
      fontWeight: '500',
      letterSpacing: '-0.01em',
      lineHeight: '1.2',
      color: '#1d1d1f'
    },
    // Additional specific styles
    hero: {
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontSize: '80px',
      fontWeight: '700',
      letterSpacing: '-0.015em',
      lineHeight: '1.05',
      color: '#1d1d1f'
    },
    productTitle: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '48px',
      fontWeight: '500',
      letterSpacing: '-0.015em',
      lineHeight: '1.05',
      color: '#1d1d1f'
    },
    planName: {
      fontFamily: 'SF Pro Display, system-ui, sans-serif',
      fontSize: '32px',
      fontWeight: '500',
      letterSpacing: '-0.01em',
      lineHeight: '1.05',
      color: '#18181b'
    },
    descriptionText: {
      fontFamily: 'SF Pro Text, system-ui, sans-serif',
      fontSize: '21px',
      fontWeight: '400',
      lineHeight: '1.4',
      color: '#52525b'
    }
  },

  // ... other presets remain unchanged
};

// Update the type definition
export type TypographyStyle = keyof typeof typographyPresets.booking | 
                             keyof typeof typographyPresets.apple | 
                             keyof typeof typographyPresets.blog |
                             keyof typeof typographyPresets.modern |
                             keyof typeof typographyPresets.minimal |
                             keyof typeof typographyPresets.shadcn;
