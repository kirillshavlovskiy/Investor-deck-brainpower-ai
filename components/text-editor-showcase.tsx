'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { 
  typographyPresets, 
  type TypographyStyle, 
  dimensionPresets  // Add this import
} from "@/lib/typography"
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Type,
  X,
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from 'framer-motion';
import Head from 'next/head';
import { handleTextSelection } from '@/lib/text-selection';
import { EditorToolbar } from '@/components/editor-toolbar';

interface TextEditorShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ElementInfo {
  type: string;
  class: string;
  width: string;
  height: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
  whiteSpace: string;
  wordSpacing?: string;  // Add this
  rect?: DOMRect;
  margin: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  padding: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  indent?: {
    top: string;
    left: string;
  };
}

type WhitespaceKey = 'none' | 'tight' | 'normal' | 'relaxed' | 'loose';
type TabulationKey = 'none' | 'small' | 'medium' | 'large' | 'xl';

// Add color schemes
const colorSchemes = {
  apple: {
    primary: '#1d1d1f',      // Apple dark gray
    secondary: '#86868b',    // Apple light gray
    accent: '#0066CC',       // Apple blue
    warning: '#ff9f0a',      // Apple orange
    error: '#ff3b30',        // Apple red
    success: '#34c759',      // Apple green
    purple: '#bf5af2',       // Apple purple
    pink: '#ff375f',         // Apple pink
    orange: '#f56300',       // Apple orange
    white: '#ffffff',
    gray: {
      100: '#f5f5f7',
      200: '#e8e8ed',
      300: '#d2d2d7',
      400: '#86868b',
      500: '#6e6e73',
      600: '#52525b',
      700: '#3a3a3c',
      800: '#2c2c2e',
      900: '#1d1d1f'
    }
  }
}

// Update colorOptions with Apple's color scheme
const colorOptions = {
  'text-primary': colorSchemes.apple.primary,
  'text-secondary': colorSchemes.apple.secondary,
  'text-accent': colorSchemes.apple.accent,
  'text-warning': colorSchemes.apple.warning,
  'text-error': colorSchemes.apple.error,
  'text-success': colorSchemes.apple.success,
  'text-purple': colorSchemes.apple.purple,
  'text-pink': colorSchemes.apple.pink,
  'text-orange': colorSchemes.apple.orange,
  'text-white': colorSchemes.apple.white,
  'text-gray-400': colorSchemes.apple.gray[400],
  'text-gray-500': colorSchemes.apple.gray[500],
  'text-gray-600': colorSchemes.apple.gray[600],
  'text-gray-900': colorSchemes.apple.gray[900]
}

const fontFamilies = [
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
]

const fontSizes = [
  '11px', '12px', '13px', '14px', '15px', '16px', '17px', 
  '18px', '19px', '20px', '21px', '22px', '23px', '24px',
  '28px', '32px', '36px', '40px', '44px', '48px', '56px', 
  '64px', '72px', '80px', '96px', '128px'
]
const fontWeights = ['400', '500', '600', '700']
const letterSpacings = [
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
]
const lineHeights = [
  '1', '1.05', '1.1', '1.15', '1.2', '1.25', '1.3', '1.35', 
  '1.4', '1.45', '1.47059', '1.5', '1.6', '1.7', '1.75', '2'
]

// Apple Typography Presets
const appleTypography = {
  'Display': {
    fontSize: '96px',
    fontWeight: '700',
    letterSpacing: '-0.003em',
    lineHeight: '1.05',
    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Large Title': {
    fontSize: '80px',
    fontWeight: '700',
    letterSpacing: '-0.003em',
    lineHeight: '1.05',
    fontFamily: 'SF Pro Display, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Title 1': {
    fontSize: '56px',
    fontWeight: '600',
    letterSpacing: '-0.003em',
    lineHeight: '1.1',
    fontFamily: 'SF Pro Display, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Title 2': {
    fontSize: '32px',
    fontWeight: '600',
    letterSpacing: '-0.003em',
    lineHeight: '1.2',
    fontFamily: 'SF Pro Display, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Title 3': {
    fontSize: '24px',
    fontWeight: '600',
    letterSpacing: '0',
    lineHeight: '1.2',
    fontFamily: 'SF Pro Display, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Headline': {
    fontSize: '21px',
    fontWeight: '600',
    letterSpacing: '0.007em',
    lineHeight: '1.47059',
    fontFamily: 'SF Pro Text, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Body': {
    fontSize: '17px',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.47059',
    fontFamily: 'SF Pro Text, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Callout': {
    fontSize: '16px',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.47059',
    fontFamily: 'SF Pro Text, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Subheadline': {
    fontSize: '15px',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.47059',
    fontFamily: 'SF Pro Text, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Footnote': {
    fontSize: '13px',
    fontWeight: '400',
    letterSpacing: '0',
    lineHeight: '1.47059',
    fontFamily: 'SF Pro Text, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Caption 1': {
    fontSize: '12px',
    fontWeight: '400',
    letterSpacing: '0.012em',
    lineHeight: '1.47059',
    fontFamily: 'SF Pro Text, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Caption 2': {
    fontSize: '11px',
    fontWeight: '400',
    letterSpacing: '0.012em',
    lineHeight: '1.47059',
    fontFamily: 'SF Pro Text, system-ui, sans-serif',
    color: '#1d1d1f'
  },
  'Body Text': {
    fontSize: '28px',
    fontWeight: '400',
    letterSpacing: '-0.015em',
    lineHeight: '1.25',
    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    color: '#1d1d1f'
  }
}

// Combine both for the style presets
const stylePresets = {
  ...appleTypography,
}

const pricingBlocks = [
  {
    title: "Individual",
    price: "$19.95/mo.",
    saveAmount: "$9/mo.",
    description: "with your Business Pro Plan",
    priceColor: colorSchemes.apple.orange,
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
    priceColor: colorSchemes.apple.pink,
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
    priceColor: colorSchemes.apple.purple,
    features: [
      { name: "Scalable with your business", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
      { name: "Cloud based", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
      { name: "Pay as you go", icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" },
      { name: "24/7 support", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }
    ]
  }
].map((block, index) => ({
  ...block,
  priceColor: index === 0 ? '#f56300' : index === 1 ? '#ff375f' : '#bf5af2'
}))

// Helper function for getting typography styles
const getTypographyStyle = (style: TypographyStyle) => {
  return typographyPresets.apple[style.toLowerCase() as TypographyStyle];
}

// Then define button presets using the helper
const buttonPresets = {
  'Primary': {
    className: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all transform hover:scale-105",
    text: "Get Started",
    typography: getTypographyStyle('cta')
  },
  // ... other button presets
}

// Add proper types for spacing controls
type SpacingKey = 'none' | 'small' | 'medium' | 'large' | 'xl';

const spacingControls: Record<'margin' | 'padding' | 'gap', Record<SpacingKey, string>> = {
  margin: {
    'none': '0px',
    'small': '8px',
    'medium': '16px',
    'large': '24px',
    'xl': '32px',
  },
  padding: {
    'none': '0px',
    'small': '8px',
    'medium': '16px',
    'large': '24px',
    'xl': '32px',
  },
  gap: {
    'none': '0px',
    'small': '8px',
    'medium': '16px',
    'large': '24px',
    'xl': '32px',
  }
}

// Add this with other constants at the top
const spacingPresets = {
  whitespace: {
    'none': '0',
    'tight': '0.5',
    'normal': '1',
    'relaxed': '1.5',
    'loose': '2',
  },
  tabulation: {
    'none': '0px',
    'small': '16px',
    'medium': '24px',
    'large': '32px',
    'xl': '48px'
  }
}

// Add position type
type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

// Add interface for InlineControls props
interface InlineControlsProps {
  position: { top: number; left: number; right: number; bottom: number };
  onFormatClick: (type: string, value?: string) => void;
}

// Update InlineControls component
const InlineControls: React.FC<InlineControlsProps> = ({ position, onFormatClick }) => {
  return (
    <div 
      className="fixed bg-zinc-800/90 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1.5 flex items-center gap-2"
      style={{
        top: position.bottom + 12,
        left: position.left,
        transform: 'translateY(0)',
        zIndex: 1000
      }}
    >
      {/* Text Alignment */}
      <div className="flex gap-0.5 bg-zinc-700/50 rounded-md p-0.5">
        <button className="p-1 hover:bg-zinc-600/50 rounded" onClick={() => onFormatClick('align', 'left')}>
          <AlignLeft className="h-3 w-3 text-zinc-200" />
        </button>
        <button className="p-1 hover:bg-zinc-600/50 rounded" onClick={() => onFormatClick('align', 'center')}>
          <AlignCenter className="h-3 w-3 text-zinc-200" />
        </button>
        <button className="p-1 hover:bg-zinc-600/50 rounded" onClick={() => onFormatClick('align', 'right')}>
          <AlignRight className="h-3 w-3 text-zinc-200" />
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-zinc-600" />

      {/* First Line Indent Controls */}
      <div className="flex items-center gap-1 bg-zinc-700/50 rounded-md p-1">
        <button 
          className="p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200 w-6 h-6 flex items-center justify-center"
          onClick={() => onFormatClick('firstLineIndent', 'decrease')}
        >
          -
        </button>
        <span className="text-xs text-zinc-300 w-16 text-center">First Line</span>
        <button 
          className="p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200 w-6 h-6 flex items-center justify-center"
          onClick={() => onFormatClick('firstLineIndent', 'increase')}
        >
          +
        </button>
      </div>

      {/* Block Indent Controls */}
      <div className="flex items-center gap-1 bg-zinc-700/50 rounded-md p-1">
        <button 
          className="p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200 w-6 h-6 flex items-center justify-center"
          onClick={() => onFormatClick('blockIndent', 'decrease')}
        >
          -
        </button>
        <span className="text-xs text-zinc-300 w-16 text-center">Block</span>
        <button 
          className="p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200 w-6 h-6 flex items-center justify-center"
          onClick={() => onFormatClick('blockIndent', 'increase')}
        >
          +
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-zinc-600" />

      {/* Vertical Alignment */}
      <div className="flex items-center gap-1 bg-zinc-700/50 rounded-md p-1">
        <button 
          className="p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200"
          onClick={() => onFormatClick('verticalAlign', 'top')}
        >
          Top
        </button>
        <button 
          className="p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200"
          onClick={() => onFormatClick('verticalAlign', 'center')}
        >
          Center
        </button>
        <button 
          className="p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200"
          onClick={() => onFormatClick('verticalAlign', 'bottom')}
        >
          Bottom
        </button>
      </div>
    </div>
  )
}

// Add debounce utility
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Update QuickControls component
const QuickControls = ({ selectedElement }: { selectedElement: HTMLElement | null }) => {
  if (!selectedElement) return null;

  const rect = selectedElement.getBoundingClientRect();

  return (
    <div 
      className="fixed flex items-center gap-2 bg-zinc-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg z-[1001]"
      style={{
        top: rect.top - 48, // Position 48px above the element
        right: window.innerWidth - rect.right, // Align with right edge of element
        transform: 'translateY(0)',
      }}
    >
      {/* Alignment Controls */}
      <div className="flex gap-0.5 bg-zinc-700/50 rounded-md p-0.5">
        <button 
          className="p-1.5 hover:bg-zinc-600/50 rounded text-zinc-200 hover:text-white transition-colors"
          onClick={() => {
            if (selectedElement) {
              selectedElement.style.textAlign = 'left';
            }
          }}
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <button 
          className="p-1.5 hover:bg-zinc-600/50 rounded text-zinc-200 hover:text-white transition-colors"
          onClick={() => {
            if (selectedElement) {
              selectedElement.style.textAlign = 'center';
            }
          }}
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button 
          className="p-1.5 hover:bg-zinc-600/50 rounded text-zinc-200 hover:text-white transition-colors"
          onClick={() => {
            if (selectedElement) {
              selectedElement.style.textAlign = 'right';
            }
          }}
        >
          <AlignRight className="h-4 w-4" />
        </button>
      </div>

      {/* Position Controls */}
      <Select
        defaultValue="relative"
        onValueChange={(value) => {
          if (selectedElement) {
            selectedElement.style.position = value;
          }
        }}
      >
        <SelectTrigger className="h-8 w-24 text-xs bg-zinc-700/50">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="static">Static</SelectItem>
          <SelectItem value="relative">Relative</SelectItem>
          <SelectItem value="absolute">Absolute</SelectItem>
        </SelectContent>
      </Select>

      {/* Dimension Preset */}
      <Select
        defaultValue="medium"
        onValueChange={(value) => {
          if (selectedElement) {
            const typographyStyle = selectedElement.getAttribute('data-typography') as keyof typeof dimensionPresets;
            if (typographyStyle && dimensionPresets[typographyStyle]) {
              const preset = dimensionPresets[typographyStyle][value as 'narrow' | 'medium' | 'wide'];
              if (preset) {
                selectedElement.style.maxWidth = preset.maxWidth;
                if (preset.ratio) {
                  selectedElement.style.aspectRatio = preset.ratio;
                }
                selectedElement.className = cn(
                  selectedElement.className.split(' ').filter(cls => 
                    !cls.includes('max-w-') && !cls.includes('aspect-')
                  ).join(' '),
                  preset.className
                );
              }
            }
          }
        }}
      >
        <SelectTrigger className="h-8 w-24 text-xs bg-zinc-700/50">
          <SelectValue placeholder="Width" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="narrow">Narrow</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="wide">Wide</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default function TextEditorShowcase({ isOpen, onClose }: TextEditorShowcaseProps) {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left')
  const [fontFamily, setFontFamily] = useState(fontFamilies[0])
  const [fontSize, setFontSize] = useState('16px')
  const [fontWeight, setFontWeight] = useState('400')
  const [letterSpacing, setLetterSpacing] = useState('normal')
  const [lineHeight, setLineHeight] = useState('1.5')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [color, setColor] = useState('#18181B')
  const [buttonText, setButtonText] = useState("Check Out");
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<TypographyStyle>('bodyText');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectedButtonStyle, setSelectedButtonStyle] = useState<keyof typeof buttonPresets>('Primary');

  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Create refs map outside of render function
  const elementRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());

  // Add a state to store styles for each element
  const [elementStyles, setElementStyles] = useState<Map<string, React.CSSProperties>>(new Map());

  // Add a state to store original styles
  const [elementOriginalStyles, setElementOriginalStyles] = useState<Map<string, React.CSSProperties>>(new Map());

  // Add spacing state
  const [margin, setMargin] = useState<SpacingKey>('medium');
  const [padding, setPadding] = useState<SpacingKey>('medium');
  const [gap, setGap] = useState<SpacingKey>('medium');

  // Add state for whitespace and tabulation
  const [whitespace, setWhitespace] = useState('normal');
  const [tabulation, setTabulation] = useState('none');

  // Add elementInfo state
  const [elementInfo, setElementInfo] = useState<ElementInfo | null>(null);

  // Initialize with Apple typography system
  const [selectedTypographySystem, setSelectedTypographySystem] = useState<'apple'>('apple'); // We're only using Apple system for now
  
  // Add dimension state
  const [selectedDimension, setSelectedDimension] = useState<string>('medium');

  // Add state for inline controls in the main component
  const [showInlineControls, setShowInlineControls] = useState(false);
  const [inlineControlsPosition, setInlineControlsPosition] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  // Add indent state
  const [textIndent, setTextIndent] = useState({ top: '0px', left: '0px' });

  // Add indent handler
  const handleIndentChange = (direction: 'top' | 'left', value: string) => {
    setTextIndent(prev => ({ ...prev, [direction]: value }));
    if (selectedElement) {
      if (direction === 'top') {
        selectedElement.style.marginTop = value;
      } else {
        selectedElement.style.textIndent = value;
      }
    }
  }

  // Add to the toolbar controls
  <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
    <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Text Indent</div>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="text-xs text-zinc-400">Top</label>
        <input
          type="text"
          value={textIndent.top}
          onChange={(e) => handleIndentChange('top', e.target.value)}
          className="w-full px-3 py-2 bg-zinc-600 text-white rounded"
          placeholder="0px"
        />
      </div>
      <div>
        <label className="text-xs text-zinc-400">Left</label>
        <input
          type="text"
          value={textIndent.left}
          onChange={(e) => handleIndentChange('left', e.target.value)}
          className="w-full px-3 py-2 bg-zinc-600 text-white rounded"
          placeholder="0px"
        />
      </div>
    </div>
  </div>

  // Add function to apply typography styles
  const applyStylesToElement = (element: HTMLElement, styles: any) => {
    Object.assign(element.style, {
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      letterSpacing: styles.letterSpacing,
      lineHeight: styles.lineHeight,
      fontFamily: styles.fontFamily,
      color: styles.color || color // Use current color if not specified in styles
    });
  }

  // Update typography system handler
  const handleTypographySystemChange = (system: 'apple') => {
    setSelectedTypographySystem(system);
    if (selectedElement && selectedElement.dataset.role) {
      const newStyle = getTypographyStyle(selectedElement.dataset.role as TypographyStyle);
      applyStylesToElement(selectedElement, newStyle);
    }
  }

  // Update the style application function
  const applyStyleToSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && selectedText) {
      const range = selection.getRangeAt(0);
      
      // Create a span with the new styles
      const span = document.createElement('span');
      span.style.fontFamily = fontFamily;
      span.style.fontSize = fontSize;
      span.style.fontWeight = isBold ? 'bold' : fontWeight;
      span.style.fontStyle = isItalic ? 'italic' : 'normal';
      span.style.textDecoration = isUnderline ? 'underline' : 'none';
      span.style.letterSpacing = letterSpacing;
      span.style.lineHeight = lineHeight;
      span.style.textAlign = textAlign;
      span.style.color = color;
      
      // Apply styles to selected text
      const selectedContent = range.extractContents();
      span.appendChild(selectedContent);
      range.insertNode(span);
      
      // Maintain selection
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [selectedText, fontFamily, fontSize, fontWeight, isBold, isItalic, isUnderline, letterSpacing, lineHeight, textAlign, color]);

  // Update toolbar handlers to maintain selection
  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
    if (selectedElement) {
      selectedElement.style.fontFamily = value;
      selectedElement.focus();
      // Store the updated style
      const elementId = Array.from(elementRefs.current.entries())
        .find(([_, el]) => el === selectedElement)?.[0];
      if (elementId) {
        setElementStyles(prev => {
          const updated = new Map(prev);
          updated.set(elementId, {
            ...prev.get(elementId),
            fontFamily: value,
          });
          return updated;
        });
      }
    }
  }

  // Update handlers to use debounce and requestAnimationFrame
  const handleFontSizeChange = debounce((value: string) => {
    setFontSize(value);
    if (selectedElement) {
      selectedElement.style.fontSize = value;
      requestAnimationFrame(() => {
        const elementId = Array.from(elementRefs.current.entries())
          .find(([_, el]) => el === selectedElement)?.[0];
        if (elementId) {
          setElementStyles(prev => {
            const updated = new Map(prev);
            updated.set(elementId, {
              ...prev.get(elementId),
              fontSize: value,
            });
            return updated;
          });
        }
      });
    }
  }, 16); // One frame at 60fps

  const handleFontWeightChange = (value: string) => {
    setFontWeight(value);
    applyStyleToSelection();
  }

  const handleLetterSpacingChange = (value: string) => {
    setLetterSpacing(value);
    applyStyleToSelection();
  }

  const handleLineHeightChange = (value: string) => {
    setLineHeight(value);
    applyStyleToSelection();
  }

  const handleColorChange = (hex: string) => {
    setColor(hex);
    if (selectedElement) {
      selectedElement.style.color = hex;
      // Store the updated style
      const elementId = Array.from(elementRefs.current.entries())
        .find(([_, el]) => el === selectedElement)?.[0];
      if (elementId) {
        setElementStyles(prev => {
          const updated = new Map(prev);
          updated.set(elementId, {
            ...prev.get(elementId),
            color: hex,
          });
          return updated;
        });
      }
    }
  }

  // Add this function to render the element info and spacing indicators
  const renderSelectionInfo = (element: HTMLElement) => {
    if (selectedElement === element) {
      const computedStyle = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      // Get computed spacing values
      const spacing = {
        margin: {
          top: computedStyle.marginTop,
          right: computedStyle.marginRight,
          bottom: computedStyle.marginBottom,
          left: computedStyle.marginLeft,
        },
        padding: {
          top: computedStyle.paddingTop,
          right: computedStyle.paddingRight,
          bottom: computedStyle.paddingBottom,
          left: computedStyle.paddingLeft,
        }
      };

      return (
        <>
          {/* Element info and parameters */}
          <div className="absolute -top-20 left-0 bg-blue-500/10 text-blue-500 text-xs px-2 py-1 rounded-md flex flex-col gap-1 z-50">
            <div>
              {element.tagName.toLowerCase()}.{element.className.split(' ')[0]} {Math.round(rect.width)}px × {Math.round(rect.height)}px
            </div>
            <div className="text-xs text-blue-400">
              Font: {computedStyle.fontSize} / {computedStyle.fontWeight} / {computedStyle.lineHeight}
            </div>
            <div className="text-xs text-blue-400">
              Spacing: {computedStyle.margin} / {computedStyle.padding}
            </div>
          </div>

          {/* Margin indicators (outer red box) */}
          <div className="absolute border border-red-500/20 pointer-events-none"
            style={{
              top: `-${spacing.margin.top}`,
              right: `-${spacing.margin.right}`,
              bottom: `-${spacing.margin.bottom}`,
              left: `-${spacing.margin.left}`,
            }}
          >
            {/* Margin values */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-red-500">{spacing.margin.top}</div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-red-500">{spacing.margin.bottom}</div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-xs text-red-500">{spacing.margin.left}</div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-xs text-red-500">{spacing.margin.right}</div>
          </div>

          {/* Padding indicators (inner red box) */}
          <div className="absolute inset-0 border border-red-500/50 pointer-events-none">
            {/* Padding values */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-red-500">{spacing.padding.top}</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-red-500">{spacing.padding.bottom}</div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-red-500">{spacing.padding.left}</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-red-500">{spacing.padding.right}</div>
          </div>

          {/* Selection outline with blue dots */}
          <div className="absolute -inset-[2px] border-2 border-blue-500 border-dashed rounded pointer-events-none" />
          <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2" />
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2" />
        </>
      );
    }
    return null;
  };

  // Update renderEditableText function
  const renderEditableText = (content: string, className: string, elementId: string, typographyStyle: keyof typeof typographyPresets.apple, styleOverrides?: React.CSSProperties) => {
    const baseStyles = typographyPresets.apple[typographyStyle];
    
    return (
      <div className="relative group">
        <span
          ref={(el) => {
            if (el) {
              elementRefs.current.set(elementId, el);
            }
          }}
          contentEditable
          suppressContentEditableWarning
          className={cn(
            baseStyles.className,
            className, 
            "outline-none focus:outline-none"
          )}
          style={{
            ...baseStyles,
            ...styleOverrides,
            position: position,
            color: elementStyles.get(elementId)?.color || baseStyles.color,
            fontFamily: baseStyles.fontFamily
          }}
          data-typography={typographyStyle}
          onClick={(e) => {
            e.stopPropagation();
            const target = e.currentTarget;
            
            // Set selection
            setSelectedElement(target);
            
            // Update element info
            const computedStyle = window.getComputedStyle(target);
            const rect = target.getBoundingClientRect();
            
            setElementInfo({
              type: target.tagName.toLowerCase(),
              class: target.className,
              width: `${Math.round(rect.width)}px`,
              height: `${Math.round(rect.height)}px`,
              fontSize: computedStyle.fontSize,
              lineHeight: computedStyle.lineHeight,
              fontWeight: computedStyle.fontWeight,
              letterSpacing: computedStyle.letterSpacing,
              whiteSpace: computedStyle.whiteSpace,
              wordSpacing: computedStyle.wordSpacing,
              rect: rect,
              margin: {
                top: computedStyle.marginTop,
                right: computedStyle.marginRight,
                bottom: computedStyle.marginBottom,
                left: computedStyle.marginLeft,
              },
              padding: {
                top: computedStyle.paddingTop,
                right: computedStyle.paddingRight,
                bottom: computedStyle.paddingBottom,
                left: computedStyle.paddingLeft,
              },
              indent: {
                top: computedStyle.marginTop,
                left: computedStyle.textIndent,
              },
            });
            
            // Update toolbar state
            updateToolbarState(target);
          }}
        >
          {content}
        </span>

        {/* Selection outline and info */}
        {selectedElement === elementRefs.current.get(elementId) && elementInfo && (
          <>
            {/* Extended alignment guidelines */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 900 }}>
              {/* Horizontal guidelines */}
              <div className="absolute left-[-9999px] right-[-9999px] top-0 border-t border-red-500/30" />
              <div className="absolute left-[-9999px] right-[-9999px] bottom-0 border-t border-red-500/30" />
              
              {/* Vertical guidelines */}
              <div className="absolute top-[-9999px] bottom-[-9999px] left-0 border-l border-red-500/30" />
              <div className="absolute top-[-9999px] bottom-[-9999px] right-0 border-l border-red-500/30" />

              {/* Center guidelines */}
              <div className="absolute left-1/2 top-[-9999px] bottom-[-9999px] border-l border-red-500/30" />
              <div className="absolute top-1/2 left-[-9999px] right-[-9999px] border-t border-red-500/30" />
            </div>

            {/* Blue corner dots */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 901 }} />
            <div className="absolute top-0 right-0 w-1 h-1 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2" style={{ zIndex: 901 }} />
            <div className="absolute bottom-0 left-0 w-1 h-1 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2" style={{ zIndex: 901 }} />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2" style={{ zIndex: 901 }} />
          </>
        )}
      </div>
    );
  };

  const updateToolbarState = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    
    // Get the typography style from data attribute first
    const typographyStyle = element.getAttribute('data-typography');
    
    if (typographyStyle && typographyStyle in typographyPresets.apple) {
      // If we have a data-typography attribute, use it directly
      const preset = typographyPresets.apple[typographyStyle as TypographyStyle];
      
      // Update all toolbar states to match the preset
      setFontFamily(preset.fontFamily);
      setFontSize(preset.fontSize);
      setFontWeight(preset.fontWeight);
      setLetterSpacing(preset.letterSpacing);
      setLineHeight(preset.lineHeight);
      setColor(preset.color);
      setSelectedStyle(typographyStyle as TypographyStyle);
      
      // Get current position
      setPosition(computedStyle.position as PositionType);
      
      // Update text formatting states
      setIsBold(parseInt(preset.fontWeight) >= 700);
      setIsItalic(computedStyle.fontStyle === 'italic');
      setIsUnderline(computedStyle.textDecoration.includes('underline'));
      setTextAlign(computedStyle.textAlign as 'left' | 'center' | 'right' | 'justify');
      
    } else {
      // Fallback to matching computed styles
      const matchingStyle = Object.entries(typographyPresets.apple).find(([_, preset]) => {
        return (
          preset.fontSize === computedStyle.fontSize &&
          preset.fontWeight === computedStyle.fontWeight &&
          preset.letterSpacing === computedStyle.letterSpacing &&
          preset.lineHeight === computedStyle.lineHeight &&
          preset.fontFamily.split(',')[0].trim() === computedStyle.fontFamily.split(',')[0].trim()
        );
      });

      if (matchingStyle) {
        const [styleName, preset] = matchingStyle;
        setSelectedStyle(styleName as TypographyStyle);
        setFontFamily(preset.fontFamily);
        setFontSize(preset.fontSize);
        setFontWeight(preset.fontWeight);
        setLetterSpacing(preset.letterSpacing);
        setLineHeight(preset.lineHeight);
      } else {
        // If no match found, use computed values
        setFontFamily(computedStyle.fontFamily);
        setFontSize(computedStyle.fontSize);
        setFontWeight(computedStyle.fontWeight);
        setLetterSpacing(computedStyle.letterSpacing);
        setLineHeight(computedStyle.lineHeight);
        setSelectedStyle('body'); // Default to body if no match
      }
      
      // Get current position
      setPosition(computedStyle.position as PositionType);
      
      // Always update these from computed style
      setColor(computedStyle.color);
      setIsBold(computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight) >= 700);
      setIsItalic(computedStyle.fontStyle === 'italic');
      setIsUnderline(computedStyle.textDecoration.includes('underline'));
      setTextAlign(computedStyle.textAlign as 'left' | 'center' | 'right' | 'justify');
    }
  }

  const handleToolbarAction = (e: React.MouseEvent) => {
    // Prevent losing selection when clicking toolbar
    e.stopPropagation();
  }

  // Add immediate style application when toolbar controls change
  useEffect(() => {
    applyStyleToSelection();
  }, [applyStyleToSelection]);

  // Update handleTextSelection to handle the event correctly
  const handleTextSelection = (event: Event) => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      if (rect) {
        setInlineControlsPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          right: rect.right + window.scrollX,
          bottom: rect.bottom + window.scrollY
        });
        setShowInlineControls(true);
      }
    } else {
      setShowInlineControls(false);
    }
  }

  // Update the event listener setup
  useEffect(() => {
    document.addEventListener('selectionchange', handleTextSelection);
    return () => {
      document.removeEventListener('selectionchange', handleTextSelection);
    }
  }, []);

  const handleButtonClick = (event: React.MouseEvent, buttonId: string) => {
    event.stopPropagation();
    
    // Clear all other selections first
    setSelectedCard(null);
    setSelectedElement(null);
    
    // If clicking on already selected button, unselect it
    if (selectedButton === buttonId) {
      setSelectedButton(null);
      return;
    }
    
    setSelectedButton(buttonId);
  }

  const handleCardClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    
    // If clicking on text inside card, don't select the card
    if (target.hasAttribute('contenteditable')) {
      return;
    }
    
    // If clicking on already selected card, unselect it
    if (selectedCard === index) {
      setSelectedCard(null);
      return;
    }
    
    // Clear text selection when selecting card
    setSelectedElement(null);
    setSelectedButton(null);
    setSelectedCard(index);
  }

  // Update handleContainerClick to handle global clicks
  const handleContainerClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    
    // Only clear selections if clicking on the container itself
    if (target.classList.contains('editor-container')) {
      setSelectedCard(null);
      setSelectedElement(null);
      setSelectedButton(null);
    }
  }

  const renderCardOutline = (index: number) => {
    if (selectedCard === index) {
      const element = cardsRef.current?.children[index] as HTMLElement;
      if (!element) return null;

      const computedStyle = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      // Get computed spacing values
      const spacing = {
        margin: {
          top: computedStyle.marginTop,
          right: computedStyle.marginRight,
          bottom: computedStyle.marginBottom,
          left: computedStyle.marginLeft,
        },
        padding: {
          top: computedStyle.paddingTop,
          right: computedStyle.paddingRight,
          bottom: computedStyle.paddingBottom,
          left: computedStyle.paddingLeft,
        }
      };

      return (
        <>
          {/* Element info */}
          <div className="absolute -top-8 left-0 bg-blue-500/10 text-blue-500 text-xs px-2 py-1 rounded-md z-50">
            div.pricing-card {Math.round(rect.width)}px × {Math.round(rect.height)}px
          </div>

          {/* Selection dots and outline */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>

          {/* Margin indicators (outer) */}
          <div className="absolute border border-red-500/20 pointer-events-none"
            style={{
              top: `-${spacing.margin.top}`,
              right: `-${spacing.margin.right}`,
              bottom: `-${spacing.margin.bottom}`,
              left: `-${spacing.margin.left}`,
            }}
          >
            {/* Margin values */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-red-500">{spacing.margin.top}</div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-red-500">{spacing.margin.bottom}</div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-xs text-red-500">{spacing.margin.left}</div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-xs text-red-500">{spacing.margin.right}</div>
          </div>

          {/* Padding indicators (inner) */}
          <div className="absolute inset-0 border border-red-500/50 pointer-events-none">
            {/* Padding values */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-red-500">{spacing.padding.top}</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-red-500">{spacing.padding.bottom}</div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-red-500">{spacing.padding.left}</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-red-500">{spacing.padding.right}</div>
          </div>

          {/* Selection outline */}
          <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-2xl pointer-events-none"></div>
        </>
      );
    }
    return null;
  };

  const renderOutline = (elementId: string) => {
    if (selectedButton === elementId) {
      return (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-3xl pointer-events-none"></div>
        </>
      )
    }
    return null;
  }

  // Update the applyStylePreset function
  const applyStylePreset = (style: TypographyStyle) => {
    if (!selectedElement) return;
    
    // Get the preset from typography system
    const preset = typographyPresets.apple[style];
    if (!preset) return;

    // Apply styles directly to element
    selectedElement.style.fontFamily = preset.fontFamily;
    selectedElement.style.fontSize = preset.fontSize;
    selectedElement.style.fontWeight = preset.fontWeight;
    selectedElement.style.letterSpacing = preset.letterSpacing;
    selectedElement.style.lineHeight = preset.lineHeight;
    selectedElement.style.color = preset.color;
    
    // Update data attribute
    selectedElement.setAttribute('data-typography', style);
    
    // Update className
    selectedElement.className = cn(
      preset.className,
      'outline-none focus:outline-none'
    );
    
    // Update all states
    setSelectedStyle(style);
    setFontFamily(preset.fontFamily);
    setFontSize(preset.fontSize);
    setFontWeight(preset.fontWeight);
    setLetterSpacing(preset.letterSpacing);
    setLineHeight(preset.lineHeight);
    setColor(preset.color);
    
    // Force a rerender to update UI
    requestAnimationFrame(() => {
      setElementStyles(prev => {
        const updated = new Map(prev);
        const elementId = Array.from(elementRefs.current.entries())
          .find(([_, el]) => el === selectedElement)?.[0];
        if (elementId) {
          updated.set(elementId, {
            ...preset,
            className: preset.className
          });
        }
        return updated;
      });
    });
  }

  const renderTextOutline = (element: HTMLElement) => {
    if (selectedElement === element) {
      return (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-sm pointer-events-none"></div>
        </>
      )
    }
    return null;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardsRef.current && !cardsRef.current.contains(event.target as Node)) {
        setSelectedElement(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update the toolbar click handler to maintain selection
  const handleToolbarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // Keep the current selection and outline
    if (selectedElement) {
      selectedElement.focus();
      // Prevent selection from being cleared
      e.persist();
    }
  }

  // Update the text alignment handler
  const handleTextAlign = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    setTextAlign(alignment);
    if (selectedElement) {
      selectedElement.style.textAlign = alignment;
      // Store the updated style
      const elementId = Array.from(elementRefs.current.entries())
        .find(([_, el]) => el === selectedElement)?.[0];
      if (elementId) {
        setElementStyles(prev => {
          const updated = new Map(prev);
          updated.set(elementId, {
            ...prev.get(elementId),
            textAlign: alignment,
          });
          return updated;
        });
      }
    }
  }

  // Add handlers
  const handleWhitespaceChange = (value: WhitespaceKey) => {
    setWhitespace(value);
    if (selectedElement) {
      selectedElement.style.whiteSpace = value;
      selectedElement.style.wordSpacing = `${spacingPresets.whitespace[value]}em`;
    }
  }

  const handleTabulationChange = (value: TabulationKey) => {
    setTabulation(value);
    if (selectedElement) {
      selectedElement.style.textIndent = spacingPresets.tabulation[value];
    }
  }

  // Initialize typography styles on component mount
  useEffect(() => {
    // Apply Apple typography system styles to all text elements
    const applyInitialStyles = () => {
      // Apply to hero text
      const heroText = elementRefs.current.get('welcome-text-hero');
      if (heroText) {
        applyStylesToElement(heroText, getTypographyStyle('mainHeading'));
      }

      // Apply to subtitle
      const subtitleText = elementRefs.current.get('welcome-text-subtitle');
      if (subtitleText) {
        applyStylesToElement(subtitleText, getTypographyStyle('bodyText'));
      }

      // Apply to pricing cards
      pricingBlocks.forEach((_, index) => {
        const titleEl = elementRefs.current.get(`title-card-${index}-offer`);
        if (titleEl) {
          applyStylesToElement(titleEl, getTypographyStyle('subtitle'));
        }

        const priceEl = elementRefs.current.get(`price-card-${index}-amount`);
        if (priceEl) {
          applyStylesToElement(priceEl, getTypographyStyle('title'));
        }

        const descEl = elementRefs.current.get(`description-card-${index}-save`);
        if (descEl) {
          applyStylesToElement(descEl, getTypographyStyle('description'));
        }
      });
    };

    applyInitialStyles();
  }, []);

  // Move position state inside component
  const [position, setPosition] = useState<PositionType>('relative');
  
  // Update position handler
  const handlePositionChange = (value: PositionType) => {
    setPosition(value);
    if (selectedElement) {
      selectedElement.style.position = value;
      // Reset coordinates when changing position type
      if (value === 'static' || value === 'relative') {
        selectedElement.style.top = 'auto';
        selectedElement.style.left = 'auto';
      }
    }
  }

  // Add resize state
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartPosition, setResizeStartPosition] = useState({ x: 0, y: 0 });
  const [elementStartSize, setElementStartSize] = useState({ width: 0, height: 0 });

  // Add resize handlers
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStartPosition({ x: e.clientX, y: e.clientY });
    
    if (selectedElement) {
      const rect = selectedElement.getBoundingClientRect();
      setElementStartSize({ width: rect.width, height: rect.height });
    }
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing || !selectedElement) return;

    const deltaX = e.clientX - resizeStartPosition.x;
    const deltaY = e.clientY - resizeStartPosition.y;

    selectedElement.style.width = `${elementStartSize.width + deltaX}px`;
    selectedElement.style.height = `${elementStartSize.height + deltaY}px`;
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  // Add event listeners for resize
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing]);

  // Update dimension preset handler
  const handleDimensionPresetChange = (value: DimensionSize) => {
    setSelectedDimension(value);
    
    if (selectedElement) {
      const typographyStyle = selectedElement.getAttribute('data-typography') as keyof typeof typographyPresets.apple;
      
      if (typographyStyle) {
        const preset = dimensionPresets[typographyStyle]?.[value];
        if (preset) {
          // Apply maxWidth if defined
          if (preset.maxWidth) {
            selectedElement.style.maxWidth = preset.maxWidth;
          }
          
          // Apply width if defined
          if (preset.width) {
            selectedElement.style.width = preset.width;
          }
          
          // Update className
          selectedElement.className = cn(
            selectedElement.className.split(' ')
              .filter(cls => !cls.includes('max-w-') && !cls.includes('w-')),
            preset.className
          );
        }
      }
    }
  };

  const handleElementSelection = (element: HTMLElement) => {
    // Prevent default behavior
    event?.preventDefault();
    event?.stopPropagation();
    
    // Update selection
    setSelectedElement(element);
    updateToolbarState(element);
    
    // Update element info
    const computedStyle = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    
    // ... rest of the selection logic ...
  }

  // Add this function inside the component
  const handleControlChange = (handler: Function) => (value: any) => {
    // Prevent event propagation
    event?.preventDefault();
    event?.stopPropagation();
    
    // Call the actual handler
    handler(value);
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      setElementStyles(prev => new Map(prev));
    });
  }

  // Update the onFormatClick handler in the main component
  const handleFormatClick = (type: string, value: string) => {
    if (!selectedElement) return;

    switch(type) {
      case 'firstLineIndent':
        const currentFirstIndent = parseInt(selectedElement.style.textIndent) || 0;
        const newFirstIndent = value === 'increase' ? currentFirstIndent + 16 : Math.max(0, currentFirstIndent - 16);
        selectedElement.style.textIndent = `${newFirstIndent}px`;
        break;
      
      case 'blockIndent':
        const currentBlockIndent = parseInt(selectedElement.style.paddingLeft) || 0;
        const newBlockIndent = value === 'increase' ? currentBlockIndent + 16 : Math.max(0, currentBlockIndent - 16);
        selectedElement.style.paddingLeft = `${newBlockIndent}px`;
        break;
      
      case 'align':
        selectedElement.style.textAlign = value;
        break;
      
      case 'verticalAlign':
        const parent = selectedElement.parentElement;
        if (parent) {
          parent.style.display = 'flex';
          parent.style.flexDirection = 'column';
          parent.style.minHeight = '100%';
          parent.style.justifyContent = value === 'top' ? 'flex-start' : 
                                      value === 'center' ? 'center' : 
                                      'flex-end';
        }
        selectedElement.style.alignSelf = value === 'top' ? 'flex-start' : 
                                        value === 'center' ? 'center' : 
                                        'flex-end';
        break;
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50">
      <Head>
        <title>Brainpower AI Playground</title>
        <meta name="description" content="Explore Brainpower AI Playground" />
        <meta name="keywords" content="Brainpower AI, AI, Playground" />
        <meta name="author" content="Brainpower AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="h-screen w-screen flex items-center justify-center">
        <div 
          className="bg-slate-200 w-full h-full p-4 relative editor-container flex"
          onClick={handleContainerClick}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-zinc-800/80 rounded-full transition-colors text-gray-400 hover:text-white z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content - Make this section scrollable */}
          <div className="flex-1 overflow-y-auto pr-4">
            <div className="flex flex-col">
              {/* Header with sticky positioning */}
              <div className="sticky top-0 z-[1000] bg-slate-800/40 backdrop-blur-md border-b border-slate-700/30">
                <div className="container mx-auto px-6 py-4">
                  <div className="flex items-center justify-between">
                    {/* Logo */}
                    {renderEditableText(
                      "Brainpower AI",
                      "text-slate-200",
                      "header-text-logo",
                      'mainHeading',
                      {
                        fontSize: '24px',
                        fontWeight: '600',
                        letterSpacing: '-0.015em',
                        color: 'hsl(210 40% 98%)',
                        marginBottom: '0',
                        position: 'relative',
                        zIndex: 1
                      }
                    )}

                    {/* Navigation Menu */}
                    <nav className="hidden md:flex items-center gap-8">
                      {[
                        { text: "Features", href: "#features" },
                        { text: "Pricing", href: "#pricing" },
                        { text: "About", href: "#about" },
                        { text: "Contact", href: "#contact" }
                      ].map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className={cn(
                            typographyPresets.apple.body.className,
                            "text-slate-200 hover:text-white transition-colors"
                          )}
                          data-typography="body"
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        typographyPresets.apple.cta.className,
                        "px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
                      )}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Hero Section with Motion */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="min-h-[70vh] flex flex-col items-center justify-center mb-24"
              >
                {/* Hero Content */}
                <div className="text-center space-y-6 max-w-4xl mx-auto">
                  {renderEditableText(
                    "Welcome to Brainpower AI Playground",
                    typographyPresets.apple.mainHeading.className,
                    "welcome-text-hero",
                    'mainHeading'
                  )}
                  
                  {renderEditableText(
                    "Your creative journey starts here",
                    typographyPresets.apple.bodyText.className,
                    "welcome-text-subtitle",
                    'bodyText'
                  )}

                  {renderEditableText(
                    "Design, build, and prototype with ease...",
                    typographyPresets.apple.description.className,
                    "welcome-text-description",
                    'description'
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      typographyPresets.apple.cta.className,
                      "px-8 py-4 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 mt-8"
                    )}
                  >
                    Get Started Now
                  </motion.button>
                </div>
              </motion.section>

              {/* Features Section */}
              <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-24"
              >
                <div className="text-center mb-16">
                  {renderEditableText(
                    "Why Choose Brainpower AI",
                    typographyPresets.apple.heading.className,
                    "features-heading",
                    'heading'
                  )}
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-10 mb-24">
                  {[
                    {
                      icon: "🚀",
                      title: "Lightning Fast",
                      description: "Experience blazing fast performance with our optimized platform"
                    },
                    {
                      icon: "🎯",
                      title: "Precision Control",
                      description: "Fine-tune every aspect of your design with pixel-perfect precision"
                    },
                    {
                      icon: "🔄",
                      title: "Real-time Updates",
                      description: "See changes instantly as you edit and customize your design"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="feature-card p-6 bg-white rounded-xl shadow-lg"
                    >
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      {renderEditableText(
                        feature.title,
                        typographyPresets.apple.subtitle.className,
                        `feature-title-${index}`,
                        'subtitle'
                      )}
                      {renderEditableText(
                        feature.description,
                        typographyPresets.apple.body.className,
                        `feature-desc-${index}`,
                        'body'
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Pricing Cards Section */}
              <motion.div 
                className="flex flex-row gap-4" 
                ref={cardsRef}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  gap: spacingControls.gap[gap],
                  marginTop: '2rem'
                }}
              >
                {pricingBlocks.map((block, index) => (
                  <div 
                    key={index}
                    className="relative bg-white rounded-2xl shadow-lg cursor-pointer flex-1 min-w-[320px] max-w-[380px] pricing-card flex flex-col"
                    style={{
                      margin: spacingControls.margin[margin],
                      padding: spacingControls.padding[padding],
                    }}
                    onClick={(e) => handleCardClick(index, e)}
                  >
                    {renderCardOutline(index)}
                    <div className="flex flex-col h-full">
                      {/* Card content with optimized spacing */}
                      <div className="flex-1 space-y-4"> {/* Changed gap-4 to space-y-4 for better control */}
                        <div className="flex flex-col gap-4">
                          {renderEditableText(
                            `This is your ${block.title} Offer`,
                            typographyPresets.apple.subtitle.className,  // Using predefined Tailwind classes
                            `title-card-${index}-offer`,
                            'subtitle'
                          )}
                          
                          {renderEditableText(
                            block.price,
                            typographyPresets.apple.title.className,  // Using predefined Tailwind classes
                            `price-card-${index}-amount`,
                            'title',
                            { color: block.priceColor }
                          )}
                        </div>

                        <div className="flex flex-col gap-4">
                          {renderEditableText(
                            `Save ${block.saveAmount} ${block.description}`,
                            typographyPresets.apple.description.className,  // Using predefined Tailwind classes
                            `description-card-${index}-save`,
                            'description'
                          )}

                          <div className="flex flex-col gap-3">
                            {block.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d={feature.icon} />
                                </svg>
                                <span
                                  contentEditable
                                  suppressContentEditableWarning
                                  className={typographyPresets.apple.body.className}  // Using predefined Tailwind classes
                                  data-typography="body"
                                >
                                  {feature.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            className={typographyPresets.apple.body.className}  // Using predefined Tailwind classes
                            data-typography="body"
                          >
                            Have a question? Call a Specialist or chat online.
                          </span>
                          
                          <a
                            href="#"
                            className={cn(
                              typographyPresets.apple.link.className,  // Using predefined Tailwind classes
                              "hover:underline"
                            )}
                            data-typography="link"
                          >
                            Contact us &gt;
                          </a>
                          <div 
                            className="relative mt-4"
                            onClick={(e) => handleButtonClick(e, `button-${index}`)}
                          >
                            {renderOutline(`button-${index}`)}
                            <button 
                              className={cn(
                                typographyPresets.apple.cta.className,  // Using predefined Tailwind classes
                                "w-full py-3 px-4",
                                buttonPresets[selectedButtonStyle].className
                              )}
                              data-typography="cta"
                            >
                              {buttonPresets[selectedButtonStyle].text}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Button section with reduced top spacing */}
                      <div className="mt-4"> {/* Reduced from mt-auto pt-6 to just mt-4 */}
                        <div 
                          className="relative"
                          onClick={(e) => handleButtonClick(e, `button-${index}`)}
                        >
                          {renderOutline(`button-${index}`)}
                          <button 
                            className={cn(
                              typographyPresets.apple.cta.className,  // Using predefined Tailwind classes
                              "w-full py-3 px-4",
                              buttonPresets[selectedButtonStyle].className
                            )}
                            data-typography="cta"
                          >
                            {buttonPresets[selectedButtonStyle].text}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Control Bar */}
          <div 
            className="w-72 bg-zinc-800 p-4 rounded-lg shadow-lg h-full overflow-y-auto ml-4" 
            style={{ zIndex: 1100 }}
            onClick={(e) => {
              // Prevent event propagation and default behavior
              e.preventDefault();
              e.stopPropagation();
            }}
            onMouseDown={(e) => {
              // Also prevent mousedown to maintain selection
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {selectedElement && (
              <>
                {/* Always show Typography System and Style Preset */}
                <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                  <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Typography System</div>
                  <Select 
                    onValueChange={handleControlChange(handleDimensionPresetChange)}
                    value={selectedDimension}
                    onOpenChange={(open) => {
                      // Prevent event propagation
                      event?.preventDefault();
                      event?.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select dimension" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="narrow">Narrow</SelectItem>
                      <SelectItem value="medium">Medium (Recommended)</SelectItem>
                      <SelectItem value="wide">Wide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Add this after Typography System selector in the Control Bar */}
                <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                  <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Style Preset</div>
                  <Select 
                    onValueChange={handleControlChange(applyStylePreset)} 
                    value={selectedStyle}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(typographyPresets.apple).map(([style, preset]) => (
                        <SelectItem key={style} value={style as TypographyStyle}>
                          {style} ({preset.fontSize})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Text Controls - Only show for text elements */}
                {selectedElement.hasAttribute('contenteditable') && (
                  <>
                    {/* Font Family */}
                    <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                      <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Font Family</div>
                      <Select onValueChange={handleControlChange(handleFontFamilyChange)} value={fontFamily}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontFamilies.map((font) => (
                            <SelectItem key={font} value={font}>{font.split(',')[0]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Font Size */}
                    <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                      <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Font Size</div>
                      <Select onValueChange={handleControlChange(handleFontSizeChange)} value={fontSize}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontSizes.map((size) => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Font Weight */}
                    <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                      <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Font Weight</div>
                      <Select onValueChange={handleControlChange(handleFontWeightChange)} value={fontWeight}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select font weight" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontWeights.map((weight) => (
                            <SelectItem key={weight} value={weight}>{weight}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Text Alignment */}
                    <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                      <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Alignment</div>
                      <div className="flex gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleTextAlign('left')}
                                className={cn("text-zinc-300 hover:text-white transition-colors", textAlign === 'left' && "bg-zinc-600 text-white")}
                              >
                                <AlignLeft className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Align Left</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleTextAlign('center')}
                                className={cn("text-zinc-300 hover:text-white transition-colors", textAlign === 'center' && "bg-zinc-600 text-white")}
                              >
                                <AlignCenter className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Align Center</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleTextAlign('right')}
                                className={cn("text-zinc-300 hover:text-white transition-colors", textAlign === 'right' && "bg-zinc-600 text-white")}
                              >
                                <AlignRight className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Align Right</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleTextAlign('justify')}
                                className={cn("text-zinc-300 hover:text-white transition-colors", textAlign === 'justify' && "bg-zinc-600 text-white")}
                              >
                                <AlignJustify className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Justify</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    {/* Letter Spacing */}
                    <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                      <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Letter Spacing</div>
                      <Select onValueChange={handleControlChange(handleLetterSpacingChange)} value={letterSpacing}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select letter spacing" />
                        </SelectTrigger>
                        <SelectContent>
                          {letterSpacings.map((spacing) => (
                            <SelectItem key={spacing} value={spacing}>{spacing}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Line Height */}
                    <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                      <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Line Height</div>
                      <Select onValueChange={handleControlChange(handleLineHeightChange)} value={lineHeight}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select line height" />
                        </SelectTrigger>
                        <SelectContent>
                          {lineHeights.map((height) => (
                            <SelectItem key={height} value={height}>{height}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Button Controls - Only show for buttons */}
                {selectedElement.tagName.toLowerCase() === 'button' && (
                  <>
                    {/* Button Text */}
                    <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                      <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Button Text</div>
                      <input
                        type="text"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="w-full px-3 py-2 bg-zinc-600 text-white rounded"
                      />
                    </div>

                    {/* Button Style */}
                    <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                      <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Button Style</div>
                      <Select 
                        onValueChange={handleControlChange((value) => setSelectedButtonStyle(value as keyof typeof buttonPresets))} 
                        value={selectedButtonStyle}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select button style" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(buttonPresets).map((style) => (
                            <SelectItem key={style} value={style}>{style}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {/* Button Preview */}
                      <div className="mt-3 p-3 bg-zinc-800 rounded-lg">
                        <button 
                          className={cn(
                            "w-full py-2 px-4",
                            buttonPresets[selectedButtonStyle].className
                          )}
                          style={getTypographyStyle('cta')}
                          data-typography="cta"
                        >
                          {buttonPresets[selectedButtonStyle].text}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Spacing Controls - Show for all elements */}
                <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                  <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Spacing</div>
                  
                  {/* Margin Control */}
                  <div className="mb-2">
                    <label className="text-xs text-zinc-400">Margin</label>
                    <Select onValueChange={handleControlChange((value) => setMargin(value))} value={margin}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select margin" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(spacingControls.margin).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{key} ({value})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Padding Control */}
                  <div className="mb-2">
                    <label className="text-xs text-zinc-400">Padding</label>
                    <Select onValueChange={handleControlChange((value) => setPadding(value))} value={padding}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select padding" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(spacingControls.padding).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{key} ({value})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Gap Control */}
                  <div>
                    <label className="text-xs text-zinc-400">Gap</label>
                    <Select onValueChange={handleControlChange((value) => setGap(value))} value={gap}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gap" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(spacingControls.gap).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{key} ({value})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Color Controls - Show for all elements */}
                <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600">
                  <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Text Color</div>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(colorOptions).map(([className, hex]) => (
                      <TooltipProvider key={className}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleColorChange(hex)}
                              className={cn(
                                "w-8 h-8 rounded-full border border-zinc-600 hover:scale-110 transition-all duration-200 ease-in-out",
                                color === hex && "ring-2 ring-white"
                              )}
                              style={{ backgroundColor: hex }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{className.replace('text-', '').replace('-', ' ')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>

                {/* Add Sizing Controls to toolbar */}
                <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                  <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Size & Position</div>
                  
                  {/* Width */}
                  <div className="mb-2">
                    <label className="text-xs text-zinc-400">Width</label>
                    <input
                      type="text"
                      value={selectedElement?.style.width || 'auto'}
                      onChange={(e) => {
                        if (selectedElement) {
                          selectedElement.style.width = e.target.value;
                        }
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="w-full px-3 py-2 bg-zinc-600 text-white rounded"
                    />
                  </div>

                  {/* Height */}
                  <div className="mb-2">
                    <label className="text-xs text-zinc-400">Height</label>
                    <input
                      type="text"
                      value={selectedElement?.style.height || 'auto'}
                      onChange={(e) => {
                        if (selectedElement) {
                          selectedElement.style.height = e.target.value;
                        }
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="w-full px-3 py-2 bg-zinc-600 text-white rounded"
                    />
                  </div>

                  {/* Position */}
                  <div className="mb-2">
                    <label className="text-xs text-zinc-400">Position</label>
                    <Select 
                      onValueChange={handleControlChange(handlePositionChange)} 
                      value={position}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="static">Static</SelectItem>
                        <SelectItem value="relative">Relative</SelectItem>
                        <SelectItem value="absolute">Absolute</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Coordinates for absolute/fixed positioning */}
                  {(position === 'absolute' || position === 'fixed') && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-zinc-400">Top</label>
                        <input
                          type="text"
                          value={selectedElement?.style.top || '0px'}
                          onChange={(e) => {
                            if (selectedElement) {
                              selectedElement.style.top = e.target.value;
                            }
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="w-full px-3 py-2 bg-zinc-600 text-white rounded"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-400">Left</label>
                        <input
                          type="text"
                          value={selectedElement?.style.left || '0px'}
                          onChange={(e) => {
                            if (selectedElement) {
                              selectedElement.style.left = e.target.value;
                            }
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="w-full px-3 py-2 bg-zinc-600 text-white rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Add these controls to the toolbar, after the text alignment controls */}
                <div className="mb-8">
                  <h3 className="text-sm text-zinc-300 font-semibold mb-4 border-b border-zinc-700 pb-2">
                    Text Position
                  </h3>
                  
                  {/* Horizontal Alignment */}
                  <div className="p-3 bg-zinc-700 rounded-lg mb-4">
                    <div className="text-xs text-zinc-400 uppercase mb-2">Horizontal Align</div>
                    <div className="flex justify-between gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTextAlign('left')}
                        className={cn("flex-1", textAlign === 'left' && "bg-zinc-600")}
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTextAlign('center')}
                        className={cn("flex-1", textAlign === 'center' && "bg-zinc-600")}
                      >
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTextAlign('right')}
                        className={cn("flex-1", textAlign === 'right' && "bg-zinc-600")}
                      >
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Tabulation (only when left-aligned) */}
                  {textAlign === 'left' && (
                    <div className="p-3 bg-zinc-700 rounded-lg mb-4">
                      <div className="text-xs text-zinc-400 uppercase mb-2">Tabulation</div>
                      <Select 
                        onValueChange={handleControlChange((value) => {
                          if (selectedElement) {
                            selectedElement.style.textIndent = value;
                          }
                        })} 
                        value={selectedElement?.style.textIndent || '0px'}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select tabulation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">None</SelectItem>
                          <SelectItem value="2em">Small (2em)</SelectItem>
                          <SelectItem value="4em">Medium (4em)</SelectItem>
                          <SelectItem value="6em">Large (6em)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Vertical Alignment */}
                  <div className="p-3 bg-zinc-700 rounded-lg mb-4">
                    <div className="text-xs text-zinc-400 uppercase mb-2">Vertical Align</div>
                    <Select 
                      onValueChange={handleControlChange((value) => {
                        if (selectedElement) {
                          // Update parent container
                          const parent = selectedElement.parentElement;
                          if (parent) {
                            parent.style.display = 'flex';
                            parent.style.flexDirection = 'column';
                            parent.style.minHeight = '100%';
                            
                            switch(value) {
                              case 'top':
                                parent.style.justifyContent = 'flex-start';
                                break;
                              case 'center':
                                parent.style.justifyContent = 'center';
                                break;
                              case 'bottom':
                                parent.style.justifyContent = 'flex-end';
                                break;
                            }
                          }
                          
                          // Update element itself
                          selectedElement.style.alignSelf = value === 'top' ? 'flex-start' : 
                                                          value === 'center' ? 'center' : 
                                                          'flex-end';
                        }
                      })}
                      value={selectedElement?.style.alignSelf || 'flex-start'}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select vertical alignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Margins */}
                  <div className="p-3 bg-zinc-700 rounded-lg mb-4">
                    <div className="text-xs text-zinc-400 uppercase mb-2">Margins</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-zinc-400">Top</label>
                        <input
                          type="text"
                          value={selectedElement?.style.marginTop || '0px'}
                          onChange={(e) => {
                            if (selectedElement) {
                              selectedElement.style.marginTop = e.target.value;
                            }
                          }}
                          className="w-full px-2 py-1 bg-zinc-600 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-400">Bottom</label>
                        <input
                          type="text"
                          value={selectedElement?.style.marginBottom || '0px'}
                          onChange={(e) => {
                            if (selectedElement) {
                              selectedElement.style.marginBottom = e.target.value;
                            }
                          }}
                          className="w-full px-2 py-1 bg-zinc-600 rounded text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Update the indent control in the toolbar */}
                <div className="mb-3">
                  <label className="text-xs text-zinc-400 mb-1 block">Text Indent</label>
                  <div className="space-y-2">
                    {/* First Line Indent */}
                    <div>
                      <label className="text-xs text-zinc-400">First Line</label>
                      <Select 
                        onValueChange={handleControlChange((value) => {
                          if (selectedElement) {
                            selectedElement.style.textIndent = value;
                          }
                        })} 
                        value={selectedElement?.style.textIndent || '0px'}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="First line indent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0px">None</SelectItem>
                          <SelectItem value="1em">Small (1em)</SelectItem>
                          <SelectItem value="2em">Medium (2em)</SelectItem>
                          <SelectItem value="4em">Large (4em)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Block Indent (using padding-left) */}
                    <div>
                      <label className="text-xs text-zinc-400">Block Indent</label>
                      <Select 
                        onValueChange={handleControlChange((value) => {
                          if (selectedElement) {
                            selectedElement.style.paddingLeft = value;
                          }
                        })} 
                        value={selectedElement?.style.paddingLeft || '0px'}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Block indent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0px">None</SelectItem>
                          <SelectItem value="16px">Small (16px)</SelectItem>
                          <SelectItem value="32px">Medium (32px)</SelectItem>
                          <SelectItem value="48px">Large (48px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Show message when no element is selected */}
            {!selectedElement && (
              <div className="text-zinc-400 text-center p-4">
                Select an element to edit its properties
              </div>
            )}
          </div>
        </div>
      </div>
      {showInlineControls && (
        <InlineControls 
          position={inlineControlsPosition}
          onFormatClick={(type, value) => {
            switch(type) {
              case 'bold':
                document.execCommand('bold', false);
                break;
              case 'italic':
                document.execCommand('italic', false);
                break;
              case 'underline':
                document.execCommand('underline', false);
                break;
              case 'style':
                // Apply typography style to selection
                const selection = window.getSelection();
                if (selection && !selection.isCollapsed) {
                  const range = selection.getRangeAt(0);
                  const span = document.createElement('span');
                  const style = typographyPresets.apple[value];
                  Object.assign(span.style, style);
                  span.dataset.typography = value;
                  range.surroundContents(span);
                }
                break;
            }
          }}
        />
      )}
      {/* Add QuickControls to the main return */}
      <QuickControls selectedElement={selectedElement} />
    </div>
  )
}