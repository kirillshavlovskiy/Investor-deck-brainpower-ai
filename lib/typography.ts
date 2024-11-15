export const typographyPresets = {
  modern: {
    hero: {
      fontFamily: 'system-ui',
      fontSize: '96px',
      fontWeight: '700',
      letterSpacing: '-0.015em',
      lineHeight: '1.05',
      color: '#1d1d1f'
    },
    title: {
      fontFamily: 'system-ui',
      fontSize: '48px',
      fontWeight: '600',
      letterSpacing: '-0.002em',
      lineHeight: '1.1',
      color: '#1d1d1f'
    },
    price: {
      fontFamily: 'system-ui',
      fontSize: '48px',
      fontWeight: '600',
      letterSpacing: '-0.002em',
      lineHeight: '1.1',
      color: '#f56300'
    },
    save: {
      fontFamily: 'system-ui',
      fontSize: '21px',
      fontWeight: '400',
      letterSpacing: '0',
      lineHeight: '1.47059',
      color: '#86868b'
    },
    feature: {
      fontFamily: 'system-ui',
      fontSize: '17px',
      fontWeight: '400',
      letterSpacing: '0',
      lineHeight: '1.47059',
      color: '#1d1d1f'
    },
    link: {
      fontFamily: 'system-ui',
      fontSize: '17px',
      fontWeight: '400',
      letterSpacing: '0',
      lineHeight: '1.47059',
      color: '#0066CC',
      textDecoration: 'none'
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

export type TypographyPreset = keyof typeof typographyPresets
export type TypographyStyle = keyof typeof typographyPresets.modern