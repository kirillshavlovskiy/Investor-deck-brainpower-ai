import { 
  typographyPresets as utilsTypographyPresets,
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights
} from './utils'

export type TypographyStyle = keyof typeof utilsTypographyPresets.apple;

export type DimensionSize = '25%' | '33%' | '50%' | '66%' | '75%' | '100%';

export interface DimensionPreset {
  maxWidth: string;
  width: string;
}

// Export typography constants
export {
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights
};

// Export typographyPresets with a different name to avoid conflicts
export const typographyPresets = utilsTypographyPresets;

// Helper function for getting typography styles
export const getTypographyStyle = (style: TypographyStyle) => {
  return typographyPresets.apple[style];
};

// Single definition of dimensionPresets
export const dimensionPresets: Record<DimensionSize, DimensionPreset> = {
  '25%': { maxWidth: '25%', width: '100%' },
  '33%': { maxWidth: '33.333333%', width: '100%' },
  '50%': { maxWidth: '50%', width: '100%' },
  '66%': { maxWidth: '66.666667%', width: '100%' },
  '75%': { maxWidth: '75%', width: '100%' },
  '100%': { maxWidth: '100%', width: '100%' }
};

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
};

export interface TypographyPreset {
  fontSize: string;
  lineHeight: string;
  fontWeight: number | string;
  // add other properties as needed
}