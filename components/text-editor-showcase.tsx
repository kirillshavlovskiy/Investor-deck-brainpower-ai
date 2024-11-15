'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from "@/lib/utils"
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

const colorOptions = {
  'text-orange-500': '#f56300',
  'text-pink-500': '#ff375f',
  'text-purple-500': '#bf5af2',
  'text-blue-500': '#0066CC',
  'text-white': '#FFFFFF',
  'text-gray-300': '#D1D5DB',
  'text-gray-500': '#6B7280',
  'text-zinc-900': '#18181B'
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
const letterSpacings = ['-0.05em', '-0.025em', 'normal', '0.025em', '0.05em']
const lineHeights = [
  '1', '1.05', '1.1', '1.15', '1.2', '1.25', '1.3', '1.35', 
  '1.4', '1.45', '1.47059', '1.5', '1.6', '1.7', '1.75', '2'
]

// Shadcn Typography Presets
const shadcnTypography = {
  'h1': {
    className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    fontFamily: 'System UI, sans-serif',
    fontSize: '48px',
    fontWeight: '800',
    letterSpacing: '-0.025em',
    lineHeight: '1.1',
  },
  'h2': {
    className: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    fontFamily: 'System UI, sans-serif',
    fontSize: '36px',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    lineHeight: '1.2',
  },
  'h3': {
    className: "scroll-m-20 text-2xl font-semibold tracking-tight",
    fontFamily: 'System UI, sans-serif',
    fontSize: '30px',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    lineHeight: '1.3',
  },
  'h4': {
    className: "scroll-m-20 text-xl font-semibold tracking-tight",
    fontFamily: 'System UI, sans-serif',
    fontSize: '24px',
    fontWeight: '600',
    letterSpacing: '-0.015em',
    lineHeight: '1.4',
  },
  'p': {
    className: "leading-7 [&:not(:first-child)]:mt-6",
    fontFamily: 'System UI, sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    letterSpacing: 'normal',
    lineHeight: '1.7',
  },
  'blockquote': {
    className: "mt-6 border-l-2 pl-6 italic",
    fontFamily: 'System UI, sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    letterSpacing: 'normal',
    lineHeight: '1.7',
  },
  'list': {
    className: "my-6 ml-6 list-disc [&>li]:mt-2",
    fontFamily: 'System UI, sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    letterSpacing: 'normal',
    lineHeight: '1.7',
  },
  'inline-code': {
    className: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    fontFamily: 'Courier New, monospace',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: 'normal',
    lineHeight: '1.4',
  },
  'lead': {
    className: "text-xl text-muted-foreground",
    fontFamily: 'System UI, sans-serif',
    fontSize: '20px',
    fontWeight: '400',
    letterSpacing: '-0.015em',
    lineHeight: '1.6',
  },
  'large': {
    className: "text-lg font-semibold",
    fontFamily: 'System UI, sans-serif',
    fontSize: '18px',
    fontWeight: '600',
    letterSpacing: 'normal',
    lineHeight: '1.6',
  },
  'small': {
    className: "text-sm font-medium leading-none",
    fontFamily: 'System UI, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: 'normal',
    lineHeight: '1',
  },
  'muted': {
    className: "text-sm text-muted-foreground",
    fontFamily: 'System UI, sans-serif',
    fontSize: '14px',
    fontWeight: '400',
    letterSpacing: 'normal',
    lineHeight: '1.4',
  },
}

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
  ...shadcnTypography,
  ...appleTypography,
}

const pricingBlocks = [
  {
    title: "Individual",
    price: "$19.95/mo.",
    saveAmount: "$9/mo.",
    description: "with your Business Pro Plan",
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

// Add button presets
const buttonPresets = {
  'Primary': {
    className: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all transform hover:scale-105",
    text: "Get Started"
  },
  'Secondary': {
    className: "bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-full transition-all transform hover:scale-105",
    text: "Learn More"
  },
  'Outline': {
    className: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold rounded-full transition-all transform hover:scale-105",
    text: "Contact Us"
  },
  'Ghost': {
    className: "text-blue-500 hover:bg-blue-500/10 font-semibold rounded-full transition-all",
    text: "View Demo"
  },
  'Gradient Orange': {
    className: "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-full transition-all transform hover:scale-105",
    text: "Buy Now"
  }
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

// Add typographySystems constant
const typographySystems = {
  'Shadcn': shadcnTypography,
  'Apple': appleTypography,
  'Material Design': {
    'Display Large': {
      fontSize: '57px',
      fontWeight: '400',
      letterSpacing: '-0.25px',
      lineHeight: '64px',
      fontFamily: 'Roboto, sans-serif',
    },
    // ... other Material styles
  },
  'Tailwind': {
    '8xl': {
      fontSize: '96px',
      fontWeight: '800',
      letterSpacing: '-0.025em',
      lineHeight: '1',
      fontFamily: 'Inter, sans-serif',
    },
    // ... other Tailwind styles
  }
}

// Add proper types for spacing presets
type WhitespaceKey = 'none' | 'tight' | 'normal' | 'relaxed' | 'loose';
type TabulationKey = 'none' | 'small' | 'medium' | 'large' | 'xl';

const spacingPresets: {
  whitespace: Record<WhitespaceKey, string>;
  tabulation: Record<TabulationKey, string>;
} = {
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

// Add default fonts for typography systems
const systemFonts = {
  apple: {
    display: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    text: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
  },
  shadcn: {
    heading: 'Cal Sans, sans-serif',
    body: 'Inter, sans-serif'
  },
  // ... other system fonts
}

// Add default font settings
const defaultStyles = {
  fontFamily: systemFonts.apple.display,
  color: '#1d1d1f'
}

interface TextEditorShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

// Add ElementInfo type
interface ElementInfo {
  type: string;
  class: string;
  width: string;
  height: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
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
}

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
  const [selectedStyle, setSelectedStyle] = useState<keyof typeof stylePresets>('Body');
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

  // Add typography system state
  const [selectedTypographySystem, setSelectedTypographySystem] = useState<keyof typeof typographySystems>('Shadcn');

  // Add state for whitespace and tabulation
  const [whitespace, setWhitespace] = useState('normal');
  const [tabulation, setTabulation] = useState('none');

  // Add elementInfo state
  const [elementInfo, setElementInfo] = useState<ElementInfo | null>(null);

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

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    if (selectedElement) {
      selectedElement.style.fontSize = value;
      selectedElement.focus();
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
    }
  }

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
    applyStyleToSelection();
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

  // Update the renderEditableText function
  const renderEditableText = (content: string, className: string, elementId: string, style?: React.CSSProperties) => {
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
            className, 
            "outline-none focus:outline-none relative transition-opacity duration-200",
            selectedElement && selectedElement !== elementRefs.current.get(elementId) && "opacity-30"
          )}
          style={{
            ...style,
            ...elementStyles.get(elementId),
          }}
          onClick={(e) => {
            e.stopPropagation();
            const target = e.target as HTMLElement;
            setSelectedElement(target);
            updateToolbarState(target);
          }}
        >
          {content}
        </span>

        {selectedElement === elementRefs.current.get(elementId) && (
          <>
            {/* Element info */}
            <div className="absolute -top-20 left-0 bg-blue-500/10 text-blue-500 text-xs px-2 py-1 rounded-md flex flex-col gap-1 z-50">
              <div>
                {elementId} - {elementInfo?.width} × {elementInfo?.height}
              </div>
              <div className="text-xs text-blue-400">
                Font: {elementInfo?.fontSize} / {elementInfo?.fontWeight} / {elementInfo?.lineHeight}
              </div>
              <div className="text-xs text-blue-400">
                Classes: {className}
              </div>
            </div>

            {/* Blue nodes at midpoints */}
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 translate-y-1/2" />
            <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full translate-x-1/2 -translate-y-1/2" />

            {/* Extended red alignment lines */}
            <div className="absolute border-t border-red-500/20 pointer-events-none"
              style={{
                top: 0,
                left: '-100vw',
                right: '-100vw',
              }}
            />
            <div className="absolute border-b border-red-500/20 pointer-events-none"
              style={{
                bottom: 0,
                left: '-100vw',
                right: '-100vw',
              }}
            />
            <div className="absolute border-l border-red-500/20 pointer-events-none h-screen"
              style={{
                left: 0,
                top: '-50vh',
                bottom: '-50vh',
              }}
            />
            <div className="absolute border-r border-red-500/20 pointer-events-none h-screen"
              style={{
                right: 0,
                top: '-50vh',
                bottom: '-50vh',
              }}
            />

            {/* Spacing values */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-red-500">
              {elementInfo?.margin.top}
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-red-500">
              {elementInfo?.margin.bottom}
            </div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-xs text-red-500">
              {elementInfo?.margin.left}
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-xs text-red-500">
              {elementInfo?.margin.right}
            </div>
          </>
        )}
      </div>
    );
  };

  const updateToolbarState = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    setFontFamily(computedStyle.fontFamily);
    setFontSize(computedStyle.fontSize);
    setFontWeight(computedStyle.fontWeight);
    setLetterSpacing(computedStyle.letterSpacing);
    setLineHeight(computedStyle.lineHeight);
    setTextAlign(computedStyle.textAlign as 'left' | 'center' | 'right' | 'justify');
    setColor(computedStyle.color);
    setIsBold(computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight) >= 700);
    setIsItalic(computedStyle.fontStyle === 'italic');
    setIsUnderline(computedStyle.textDecoration.includes('underline'));

    // Determine the selected style based on the computed style
    const matchingStyle = Object.entries(stylePresets).find(([_, preset]) => 
      preset.fontSize === computedStyle.fontSize &&
      preset.fontWeight === computedStyle.fontWeight &&
      preset.letterSpacing === computedStyle.letterSpacing &&
      preset.lineHeight === computedStyle.lineHeight &&
      preset.fontFamily === computedStyle.fontFamily
    );
    if (matchingStyle) {
      setSelectedStyle(matchingStyle[0] as keyof typeof stylePresets);
    } else {
      setSelectedStyle('Body'); // Default to Body if no match found
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

  const handleTextSelection = (event: React.MouseEvent, elementId: string) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    
    // Clear all other selections first
    setSelectedCard(null);
    setSelectedButton(null);
    
    // If clicking on already selected element, unselect it
    if (selectedElement === target) {
      setSelectedElement(null);
      return;
    }

    // Set new selection
    const element = elementRefs.current.get(elementId);
    if (element === target) {
      // Clear any previous selection
      if (selectedElement && selectedElement !== target) {
        setSelectedElement(null);
      }
      setSelectedElement(target);
      updateToolbarState(target);
    }
  }

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
    
    // Clear all other selections first
    setSelectedElement(null);
    setSelectedButton(null);
    
    // If clicking on already selected card, unselect it
    if (selectedCard === index) {
      setSelectedCard(null);
      return;
    }
    
    // Only select card if clicking on the container itself
    if (target.classList.contains('pricing-card')) {
      setSelectedCard(index);
    }
  }

  // Add click handler for the main container to clear selections when clicking outside
  const handleContainerClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
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

  const applyStylePreset = (preset: keyof typeof stylePresets) => {
    setSelectedStyle(preset);
    const style = stylePresets[preset];
    
    // Update all toolbar states to match the preset
    setFontSize(style.fontSize);
    setFontWeight(style.fontWeight);
    setLetterSpacing(style.letterSpacing);
    setLineHeight(style.lineHeight);
    setFontFamily(style.fontFamily);
    setIsBold(parseInt(style.fontWeight) >= 700);
    
    // Apply styles to selected element
    if (selectedElement) {
      selectedElement.style.fontFamily = style.fontFamily;
      selectedElement.style.fontSize = style.fontSize;
      selectedElement.style.fontWeight = style.fontWeight;
      selectedElement.style.letterSpacing = style.letterSpacing;
      selectedElement.style.lineHeight = style.lineHeight;
      
      // Update toolbar state with the new styles
      updateToolbarState(selectedElement);
    }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50">
      <div className="h-screen w-screen flex items-center justify-center">
        <div 
          className="bg-slate-200 w-full h-full p-4 relative editor-container"
          onClick={handleContainerClick}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-zinc-800/80 rounded-full transition-colors text-gray-400 hover:text-white z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="h-full w-full flex flex-row gap-4">
            {/* Pricing Cards */}
            <div className="flex-1 flex flex-col">
              {/* Welcome text at top with margin */}
              <div className="mb-8 text-center space-y-4">
                {renderEditableText(
                  "Welcome to Brainpower AI Playground",
                  "text-[96px] font-bold leading-tight",
                  "welcome-text-hero",
                  { 
                    fontFamily: systemFonts.apple.display,
                    marginBottom: '1.5rem', // 24px
                    letterSpacing: '-0.003em',
                    color: '#1d1d1f',
                    padding: '0.5rem' // Add padding to show outline
                  }
                )}
                {renderEditableText(
                  "Your creative journey starts here: design, build, and prototype with ease",
                  "text-[28px] font-normal leading-[1.25]",
                  "welcome-text-subtitle",
                  { 
                    fontFamily: systemFonts.apple.display,
                    letterSpacing: '-0.015em',
                    marginBottom: '1rem', // 16px
                    color: '#1d1d1f',
                    padding: '0.5rem' // Add padding to show outline
                  }
                )}
              </div>

              {/* Cards container moved up */}
              <div 
                className="flex flex-row gap-4" 
                ref={cardsRef}
                style={{
                  height: '420px',
                  gap: spacingControls.gap[gap],
                  marginTop: '2rem' // Add some space after text blocks
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
                            "text-[36px] font-semibold text-zinc-900 leading-tight",
                            `title-card-${index}-offer`
                          )}
                          
                          {renderEditableText(
                            block.price,
                            "text-[36px] font-semibold leading-tight",
                            `price-card-${index}-amount`,
                            { color: block.priceColor }
                          )}
                        </div>

                        <div className="flex flex-col gap-4">
                          {renderEditableText(
                            `Save ${block.saveAmount} ${block.description} and receive:`,
                            "text-[21px] text-zinc-900",
                            `description-card-${index}-save`
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
                                  className="text-[17px] text-zinc-900"
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
                            className="text-[17px] text-zinc-900"
                          >
                            Have a question? Call a Specialist or chat online.
                          </span>
                          
                          <a
                            href="#"
                            contentEditable
                            suppressContentEditableWarning
                            className="text-[17px] text-blue-500 hover:underline"
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
                                "w-full py-3 px-4",
                                buttonPresets[selectedButtonStyle].className
                              )}
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
                              "w-full py-3 px-4",
                              buttonPresets[selectedButtonStyle].className
                            )}
                          >
                            {buttonPresets[selectedButtonStyle].text}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Control Bar - Fixed to right side */}
            <div 
              className="w-72 bg-zinc-800 p-4 rounded-lg shadow-lg overflow-y-auto h-full"
              onClick={handleToolbarClick}
              onMouseDown={(e) => {
                // Prevent mousedown from stealing focus and clearing selection
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseUp={(e) => {
                // Prevent mouseup from clearing selection
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {/* Style Preset */}
              <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Typography System</div>
                <Select 
                  onValueChange={(value: keyof typeof typographySystems) => setSelectedTypographySystem(value)} 
                  value={selectedTypographySystem}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select typography system" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(typographySystems).map((system) => (
                      <SelectItem key={system} value={system}>{system}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Style Preset</div>
                <Select 
                  onValueChange={(value: keyof typeof stylePresets) => applyStylePreset(value)} 
                  value={selectedStyle}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(typographySystems[selectedTypographySystem]).map(([style, preset]) => (
                      <SelectItem key={style} value={style}>
                        {style} ({preset.fontSize})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Font Family */}
              <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Font Family</div>
                <Select onValueChange={handleFontFamilyChange} value={fontFamily}>
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
                <Select onValueChange={handleFontSizeChange} value={fontSize}>
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
                <Select onValueChange={handleFontWeightChange} value={fontWeight}>
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

              {/* Letter Spacing */}
              <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Letter Spacing</div>
                <Select onValueChange={handleLetterSpacingChange} value={letterSpacing}>
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
                <Select onValueChange={handleLineHeightChange} value={lineHeight}>
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

              {/* Text Style */}
              <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Text Style</div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsBold(!isBold)}
                    className={cn("text-zinc-300 hover:text-white transition-colors", isBold && "bg-zinc-600 text-white")}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsItalic(!isItalic)}
                    className={cn("text-zinc-300 hover:text-white transition-colors", isItalic && "bg-zinc-600 text-white")}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsUnderline(!isUnderline)}
                    className={cn("text-zinc-300 hover:text-white transition-colors", isUnderline && "bg-zinc-600 text-white")}
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Alignment Controls */}
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

              {/* Button Text Editor */}
              <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Button Text</div>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-600 text-white rounded"
                />
              </div>

              {/* Color Selector */}
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

              {/* Button Style Selector */}
              <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Button Style</div>
                <Select 
                  onValueChange={(value) => setSelectedButtonStyle(value as keyof typeof buttonPresets)} 
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
                  >
                    {buttonPresets[selectedButtonStyle].text}
                  </button>
                </div>
              </div>

              {/* Add Spacing Controls to toolbar */}
              <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Spacing</div>
                
                {/* Margin Control */}
                <div className="mb-2">
                  <label className="text-xs text-zinc-400">Margin</label>
                  <Select onValueChange={(value: SpacingKey) => setMargin(value)} value={margin}>
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
                  <Select onValueChange={(value: SpacingKey) => setPadding(value)} value={padding}>
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
                  <Select onValueChange={(value: SpacingKey) => setGap(value)} value={gap}>
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

              {/* Text Spacing Controls */}
              <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
                <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Text Spacing</div>
                
                {/* Whitespace Control */}
                <div className="mb-2">
                  <label className="text-xs text-zinc-400">Word Spacing</label>
                  <Select onValueChange={handleWhitespaceChange} value={whitespace}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select word spacing" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(spacingPresets.whitespace).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {key} ({value}em)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tabulation Control */}
                <div>
                  <label className="text-xs text-zinc-400">Text Indent</label>
                  <Select onValueChange={handleTabulationChange} value={tabulation}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select text indent" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(spacingPresets.tabulation).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {key} ({value})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}