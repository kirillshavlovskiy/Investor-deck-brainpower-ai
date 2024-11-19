'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { 
  cn,
  defaultSpacing,
  spacingPresets,
  type SpacingKey,
  typographyPresets,
  type TypographyStyle,
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  pricingBlocks,
  buttonPresets
} from "@/lib/utils"
import { ToolbarLayout } from "./toolbar-layout"
import { motion } from 'framer-motion'
import Head from 'next/head'
import { X, ChevronRight } from 'lucide-react'
import { 
  dimensionPresets,
  type DimensionSize,
} from "@/lib/typography"
import { InlineToolbar } from './inline-toolbar'
import { ObjectToolbarLayout } from './object-toolbar-layout'

// Add type for position
type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

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

// Add this type for clickable elements
type ClickableElement = 'button' | 'image' | 'container' | 'card' | 'nav';

// Add this interface for clickable element styles
interface ClickableElementStyles {
  type: ClickableElement;
  className: string;
  styles?: React.CSSProperties;
}

// Add this near the top of the file with other constants
const features = [
  { 
    icon: "🤖",
    title: "AI-Powered Asset Creation",
    description: "Generate digital assets effortlessly with cutting-edge AI technology."
  },
  {
    icon: "👥",
    title: "Simplified Legal Setup",
    description: "Launch your digital venture with our streamlined sub-account and agency model."
  },
  {
    icon: "🌐",
    title: "Instant Payment Solutions",
    description: "Accept payments and manage vendors with immediate sub-account activation."
  },
  {
    icon: "🚀",
    title: "AI-Driven Sales Funnels",
    description: "Create high-converting sales funnels powered by artificial intelligence."
  }
];

// Add the interface for feature type
interface Feature {
  icon: string;
  title: string;
  description: string;
}

// Update the type definition for dimensionPresets
type DimensionType = 'heading' | 'body' | 'title' | 'subtitle' | 'description' | 'cta' | 'mainTitle' | 'mainHeading' | 'bodyText';
// ... existing imports ...

// Add this function near the top of the file, before the component
const getTypographyStyle = (style: TypographyStyle) => {
  return typographyPresets.apple[style];
};

export default function TextEditorShowcase({ isOpen, onClose }: TextEditorShowcaseProps) {
  // 1. All state declarations
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [lastSelectedElement, setLastSelectedElement] = useState<HTMLElement | null>(null);
  const [blockAlignment, setBlockAlignment] = useState<'left' | 'center' | 'right'>('center');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [position, setPosition] = useState<PositionType>('relative');
  const [selectedDimension, setSelectedDimension] = useState<DimensionSize>('100%');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<TypographyStyle>('bodyText');
  const [selectedButtonStyle, setSelectedButtonStyle] = useState<keyof typeof buttonPresets>('Primary');
  const [margin, setMargin] = useState<SpacingKey>('md');
  const [padding, setPadding] = useState<SpacingKey>('lg');
  const [gap, setGap] = useState<SpacingKey>('sm');
  const [whitespace, setWhitespace] = useState('normal');
  const [tabulation, setTabulation] = useState('none');
  const [elementInfo, setElementInfo] = useState<ElementInfo | null>(null);
  const [selectedTypographySystem, setSelectedTypographySystem] = useState<'apple'>('apple');
  const [showInlineControls, setShowInlineControls] = useState(false);
  const [inlineControlsPosition, setInlineControlsPosition] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
  const [textIndent, setTextIndent] = useState({ top: '0px', left: '0px' });
  const [verticalAlignment, setVerticalAlignment] = useState<'top' | 'center' | 'bottom'>('top');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [color, setColor] = useState('#18181B');
  const [buttonText, setButtonText] = useState("Check Out");
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);

  // Add these state declarations with the other states
  const [fontFamily, setFontFamily] = useState<string>(fontFamilies[0]);
  const [fontSize, setFontSize] = useState('16px');
  const [fontWeight, setFontWeight] = useState('400');
  const [letterSpacing, setLetterSpacing] = useState('normal');
  const [lineHeight, setLineHeight] = useState('1.5');

  // Add these states for indentation
  const [firstLineIndent, setFirstLineIndent] = useState(0);
  const [blockIndent, setBlockIndent] = useState(0);

  // Add these states
  const [wordSpacing, setWordSpacing] = useState('normal');
  const [lineGap, setLineGap] = useState('normal');

  // Add these states for nav menu
  const [navItemSpacing, setNavItemSpacing] = useState('24px'); // Default normal spacing
  const [navItemMargin, setNavItemMargin] = useState('16px'); // Default medium margin
  const [navItemPadding, setNavItemPadding] = useState('8px'); // Default small padding
  const [navLayout, setNavLayout] = useState('horizontal');
  const [navAlignment, setNavAlignment] = useState('center');

  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const [elementStyles, setElementStyles] = useState<Map<string, React.CSSProperties>>(new Map());
  const [elementOriginalStyles, setElementOriginalStyles] = useState<Map<string, React.CSSProperties>>(new Map());

  // Add these states
  const [leftIndent, setLeftIndent] = useState<string>('0px');
  const [rightIndent, setRightIndent] = useState<string>('0px');
  const [topMargin, setTopMargin] = useState<string>('0px');
  const [bottomMargin, setBottomMargin] = useState<string>('0px');

  // 2. All handlers and functions
  const handleBlockAlignment = (value: 'left' | 'center' | 'right') => {
    if (!selectedElement) return;
    
    setBlockAlignment(value);

    switch (value) {
      case 'left':
        selectedElement.style.marginLeft = leftIndent;
        selectedElement.style.marginRight = 'auto';
        break;
      case 'center':
        selectedElement.style.marginLeft = 'auto';
        selectedElement.style.marginRight = 'auto';
        break;
      case 'right':
        selectedElement.style.marginLeft = 'auto';
        selectedElement.style.marginRight = rightIndent;
        break;
    }
  };

  const handleTextAlign = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    // Prevent default and stop propagation
    event?.preventDefault();
    event?.stopPropagation();
    
    setTextAlign(alignment);
    if (selectedElement) {
      selectedElement.style.textAlign = alignment;
      // Keep focus on the element
      selectedElement.focus();
    }
  };

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

  const handleTypographySystemChange = (system: 'apple') => {
    setSelectedTypographySystem(system);
    if (selectedElement && selectedElement.dataset.role) {
      const newStyle = getTypographyStyle(selectedElement.dataset.role as TypographyStyle);
      applyStylesToElement(selectedElement, newStyle);
    }
  }

  // Update applyStyleToSelection function
  const applyStyleToSelection = useCallback(() => {
    console.log('=== Applying Text Styles ===');
    console.log('Current style states:', {
      fontWeight,
      lineHeight,
      letterSpacing,
      selectedElement: selectedElement?.tagName
    });

    if (selectedElement) {
      try {
        // Apply styles directly to element
        selectedElement.style.fontWeight = fontWeight;
        selectedElement.style.lineHeight = lineHeight;
        selectedElement.style.letterSpacing = letterSpacing;

        // Force style application
        selectedElement.style.cssText += `
          font-weight: ${fontWeight} !important;
          line-height: ${lineHeight} !important;
          letter-spacing: ${letterSpacing} !important;
        `;

        console.log('Styles applied to element:', {
          appliedStyles: {
            fontWeight: selectedElement.style.fontWeight,
            lineHeight: selectedElement.style.lineHeight,
            letterSpacing: selectedElement.style.letterSpacing
          },
          computedStyles: window.getComputedStyle(selectedElement)
        });
      } catch (error) {
        console.error('Error applying styles:', error);
      }
    }
  }, [selectedElement, fontWeight, lineHeight, letterSpacing]);

  const handleFontFamilyChange = (value: string) => {
    if (!selectedElement) return;
    selectedElement.style.fontFamily = value;
    setFontFamily(value);
  };

  const handleFontSizeChange = (value: string) => {
    if (!selectedElement) return;
    selectedElement.style.fontSize = value;
    setFontSize(value);
  };

  const handleFontWeightChange = (value: string) => {
    if (!selectedElement) return;
    selectedElement.style.fontWeight = value;
    setFontWeight(value);
  };

  const handleLetterSpacingChange = (value: string) => {
    if (!selectedElement) return;
    selectedElement.style.letterSpacing = value;
    setLetterSpacing(value);
  };

  const handleLineHeightChange = (value: string) => {
    if (!selectedElement) return;
    selectedElement.style.lineHeight = value;
    setLineHeight(value);
  };

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

  const renderBlockOutlines = (element: HTMLElement | null) => {
    if (!element) return null;

    const computedStyle = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    return (
      <>
        {/* Guidelines */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 900 }}>
          {/* Horizontal and vertical guidelines */}
          <div className="absolute left-[-9999px] right-[-9999px] top-0 border-t border-red-500/30" />
          <div className="absolute left-[-9999px] right-[-9999px] bottom-0 border-t border-red-500/30" />
          <div className="absolute top-[-9999px] bottom-[-9999px] left-0 border-l border-red-500/30" />
          <div className="absolute top-[-9999px] bottom-[-9999px] right-0 border-l border-red-500/30" />
        </div>

        {/* Block dimensions */}
        <div className="absolute -top-6 left-0 bg-red-500/10 text-red-500 text-xs px-1 rounded">
          {Math.round(rect.width)}px × {Math.round(rect.height)}px
        </div>

        {/* Margin values - positioned outside the outline */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-red-500 bg-red-500/10 px-1 rounded">
          {computedStyle.marginTop}
        </div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-red-500 bg-red-500/10 px-1 rounded">
          {computedStyle.marginBottom}
        </div>
        <div className="absolute -left-5 top-1/2 -translate-y-1/2 text-xs text-red-500 bg-red-500/10 px-1 rounded">
          {computedStyle.marginLeft}
        </div>
        <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-xs text-red-500 bg-red-500/10 px-1 rounded">
          {computedStyle.marginRight}
        </div>

        {/* Selection outline */}
        <div className="absolute inset-0 border-2 border-red-500 border-dashed pointer-events-none" />

        {/* Corner dots */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-500 rounded-full translate-x-1/2 translate-y-1/2" />

        {/* Resize handles */}
        <div 
          className="absolute right-0 top-1/2 w-2 h-8 bg-red-500/50 cursor-ew-resize -translate-y-1/2 translate-x-1/2"
          onMouseDown={(e) => handleResizeStart(e, 'right')}
        />
        <div 
          className="absolute bottom-0 left-1/2 h-2 w-8 bg-red-500/50 cursor-ns-resize translate-y-1/2 -translate-x-1/2"
          onMouseDown={(e) => handleResizeStart(e, 'bottom')}
        />
        <div 
          className="absolute right-0 bottom-0 w-4 h-4 bg-red-500/50 cursor-nwse-resize translate-x-1/2 translate-y-1/2"
          onMouseDown={(e) => handleResizeStart(e, 'right-bottom')}
        />
      </>
    );
  };

  const debugElementStyles = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    const parent = element.parentElement;
    const parentStyle = parent ? window.getComputedStyle(parent) : null;
    
    console.log('Element styles:', {
      element: element.tagName,
      className: element.className,
      width: computedStyle.width,
      marginLeft: computedStyle.marginLeft,
      marginRight: computedStyle.marginRight,
      textIndent: computedStyle.textIndent,
      paddingLeft: computedStyle.paddingLeft,
      parent: parent?.tagName,
      parentClassName: parent?.className,
      parentPadding: parentStyle?.padding,
      parentMargin: parentStyle?.margin
    });
  };

  const getDefaultBlockAlignment = (elementId: string, typographyStyle: TypographyStyle): 'left' | 'center' | 'right' => {
    // Center align main section blocks
    if (elementId.includes('welcome-text') || elementId.includes('main-section')) {
      return 'center';
    }
    // Left align all other blocks
    return 'left';
  };

  const renderEditableText = (
    text: string,
    className: string,
    elementId: string,
    typographyStyle: TypographyStyle,
    additionalStyles?: React.CSSProperties
  ) => {
    const baseStyles = typographyPresets.apple[typographyStyle];
    const isHeaderText = elementId === 'header-text-logo';

    return (
      <div className="relative w-full">
        <span
          ref={(el) => {
            if (el) elementRefs.current.set(elementId, el);
          }}
          contentEditable
          suppressContentEditableWarning
          className={cn(
            className, 
            'outline-none focus:outline-none block w-full'
          )}
          style={{
            ...baseStyles,
            ...additionalStyles,
            width: '100%',
            display: 'block',
            color: isHeaderText ? '#FFFFFF' : baseStyles.color
          }}
          data-typography={typographyStyle}
          onClick={(e) => handleElementSelection(e.currentTarget)}
        >
          {text}
        </span>
        {selectedElement === elementRefs.current.get(elementId) && (
          <div className="absolute inset-0 pointer-events-none">
            {renderBlockOutlines(elementRefs.current.get(elementId)?.parentElement || null)}
          </div>
        )}
      </div>
    );
  };

  const updateToolbarState = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    
    // Update indentation states with actual computed values
    setLeftIndent(computedStyle.marginLeft || '0px');
    setRightIndent(computedStyle.marginRight || '0px');
    setTopMargin(computedStyle.marginTop || '0px');
    setBottomMargin(computedStyle.marginBottom || '0px');
    
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

  useEffect(() => {
    applyStyleToSelection();
  }, [applyStyleToSelection]);

  const handleTextSelection = (event: Event) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      // Only show toolbar if there's an actual selection
      if (!selection.isCollapsed) {
        const rect = range.getBoundingClientRect();
        
        if (rect) {
          // Position the toolbar above the selection
          setInlineControlsPosition({
            top: rect.top - 10, // Position slightly above selection
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom
          });
          setShowInlineControls(true);
          console.log('Showing inline controls at:', {
            top: rect.top - 10,
            left: rect.left,
            selection: selection.toString()
          });
        }
      } else {
        setShowInlineControls(false);
      }
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      handleTextSelection(new Event('selectionchange'));
    };

    // Add listeners for both selection change and mouseup
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionChange);
    
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mouseup', handleSelectionChange);
    };
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

  const handleContainerClick = (e: React.MouseEvent) => {
    // Only handle clicks on the container itself, not its children
    if (e.target === e.currentTarget) {
      if (selectedElement) {
        selectedElement.classList.remove('outline-blue-500');
        setSelectedElement(null);
      }
    }
  };

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

  const applyStylePreset = (style: TypographyStyle) => {
    if (!selectedElement) return;
    
    // Get the preset from typography system
    const preset = typographyPresets.apple[style];
    if (!preset) return;

    // Apply styles only to selected element
    selectedElement.style.fontFamily = preset.fontFamily;
    selectedElement.style.fontSize = preset.fontSize;
    selectedElement.style.fontWeight = preset.fontWeight;
    selectedElement.style.letterSpacing = preset.letterSpacing;
    selectedElement.style.lineHeight = preset.lineHeight;
    selectedElement.style.color = preset.color;
    
    // Update data attribute
    selectedElement.setAttribute('data-typography', style);
    
    // Update className only for this element
    selectedElement.className = cn(
      preset.className,
      'outline-none focus:outline-none'
    );
    
    // Update states to reflect current element's style
    setSelectedStyle(style);
    setFontFamily(preset.fontFamily);
    setFontSize(preset.fontSize);
    setFontWeight(preset.fontWeight);
    setLetterSpacing(preset.letterSpacing);
    setLineHeight(preset.lineHeight);
    setColor(preset.color);
  };

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
    const preventUnselection = (e: MouseEvent) => {
      // Only prevent unselection if clicking outside editor area
      const editorArea = document.querySelector('.editor-container');
      if (!editorArea) return;

      // If click is outside editor area, allow it
      if (!editorArea.contains(e.target as Node)) {
        return;
      }

      // If clicking on a different editable element, allow the selection change
      const clickedElement = (e.target as HTMLElement).closest('[contenteditable="true"]');
      if (clickedElement && clickedElement !== selectedElement) {
        return;
      }

      // If we have a selected element and clicked outside any editable area, maintain selection
      if (selectedElement && !clickedElement) {
        console.log('Preventing unselection within editor:', {
          currentElement: selectedElement,
          clickTarget: e.target
        });

        e.preventDefault();
        e.stopPropagation();
        
        // Force focus back to element
        selectedElement.focus();

        // Force selection to stay
        setSelectedElement(selectedElement);

        console.log('Selection maintained:', {
          element: selectedElement.tagName,
          focused: document.activeElement === selectedElement,
          styles: selectedElement.style.cssText
        });
      }
    };

    // Add event listeners only for mousedown to prevent unselection
    document.addEventListener('mousedown', preventUnselection, true);
    
    return () => {
      document.removeEventListener('mousedown', preventUnselection, true);
    };
  }, [selectedElement]);

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

  // Add this debug function
  const debugTextStyles = () => {
    if (selectedElement) {
      const computed = window.getComputedStyle(selectedElement);
      console.log('=== Text Styles Debug ===', {
        element: selectedElement.tagName,
        inline: {
          fontWeight: selectedElement.style.fontWeight,
          lineHeight: selectedElement.style.lineHeight,
          letterSpacing: selectedElement.style.letterSpacing
        },
        computed: {
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing
        },
        states: {
          fontWeight,
          lineHeight,
          letterSpacing
        }
      });
    }
  };

  // Add debug call to handleElementSelection
  const handleElementSelection = (element: HTMLElement) => {
    // If clicking the same element, don't do anything
    if (element === selectedElement) return;

    console.log('Element selected:', element);
    
    // Clear previous selection
    if (selectedElement) {
      selectedElement.blur();
    }

    // Set new selection
    setSelectedElement(element);
    setLastSelectedElement(element);
    element.focus();
    
    // Update toolbar state
    updateToolbarState(element);
    
    // Debug text styles after selection
    debugTextStyles();
  };

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

  // Keep these declarations with other handlers (near the top of the component)
  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    if (!selectedElement) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeHandle(handle);
    setResizeStartPos({ x: e.clientX, y: e.clientY });
    
    const rect = selectedElement.getBoundingClientRect();
    setInitialSize({ width: rect.width, height: rect.height });
  };

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !selectedElement || !resizeHandle) return;

    const deltaX = e.clientX - resizeStartPos.x;
    const deltaY = e.clientY - resizeStartPos.y;

    if (resizeHandle.includes('right')) {
      selectedElement.style.width = `${initialSize.width + deltaX}px`;
    }
    if (resizeHandle.includes('bottom')) {
      selectedElement.style.height = `${initialSize.height + deltaY}px`;
    }
  }, [isResizing, selectedElement, resizeHandle, resizeStartPos, initialSize]);

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeHandle(null);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, handleResizeMove]);

  const handleDimensionPresetChange = (value: DimensionSize) => {
    console.log('Changing dimension to:', value);
    setSelectedDimension(value);
    
    if (selectedElement) {
      // Find the closest container
      const container = selectedElement.closest('.pricing-card') || selectedElement.parentElement;
      if (container instanceof HTMLElement) {
        // Apply width to container
        container.style.width = value;
        container.style.maxWidth = value;
        
        // Ensure text element takes full width of container
        selectedElement.style.width = '100%';
        selectedElement.style.display = 'block';
      }
    }
  };

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

  // 3. useEffect hooks
  useEffect(() => {
    const preventUnselection = (e: MouseEvent) => {
      if (lastSelectedElement) {
        console.log('Click intercepted:', {
          target: e.target,
          currentSelected: selectedElement,
          lastSelected: lastSelectedElement
        });

        // Keep the last selected element selected
        setSelectedElement(lastSelectedElement);
        
        // Force focus back to element
        lastSelectedElement.focus();

        // Log the state after prevention
        console.log('Selection maintained:', {
          element: lastSelectedElement.tagName,
          focused: document.activeElement === lastSelectedElement,
          styles: lastSelectedElement.style.cssText
        });
      }
    };

    // Add the event listener
    document.addEventListener('mousedown', preventUnselection, true);
    
    return () => {
      document.removeEventListener('mousedown', preventUnselection, true);
    };
  }, [lastSelectedElement]);

  const handleWhitespaceChange = (value: string) => {
    if (!selectedElement) return;
    selectedElement.style.whiteSpace = value;
    selectedElement.style.wordSpacing = spacingPresets.whitespace[value as keyof typeof spacingPresets.whitespace] + 'em';
    setWhitespace(value);
  };

  const handleTabulationChange = (value: string) => {
    if (!selectedElement) return;
    selectedElement.style.textIndent = spacingPresets.tabulation[value as keyof typeof spacingPresets.tabulation];
    setTabulation(value);
  };

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

  // Add this function to validate total width
  const validateBlockLayout = (width: number, leftIndent: number, rightIndent: number) => {
    const total = width + leftIndent + rightIndent;
    console.log('Validating layout:', { width, leftIndent, rightIndent, total });
    return total <= 100;
  };

  // Early return
  if (!isOpen) return null;

  // Add these width and indent presets
  const widthPresets = {
    '25%': '25%',
    '33%': '33%',
    '50%': '50%',
    '66%': '66%',
    '75%': '75%',
    '100%': '100%'
  };

  // Update the indent presets with more granular values
  const indentPresets = {
    '0%': '0%',
    '5%': '5%',
    '10%': '10%',
    '15%': '15%',
    '20%': '20%',
    '25%': '25%',
    '30%': '30%',
    '35%': '35%',
    '40%': '40%',
    '45%': '45%',
    '50%': '50%'
  };

  // Update indent handlers
  const handleLeftIndentChange = (value: string) => {
    if (!selectedElement) return;
    
    setLeftIndent(value);
    
    // If left-aligned, apply the indent directly
    if (blockAlignment === 'left') {
      selectedElement.style.marginLeft = value;
    }
    
    console.log('Left indent updated:', {
      value,
      alignment: blockAlignment,
      marginLeft: selectedElement.style.marginLeft,
      computed: window.getComputedStyle(selectedElement).marginLeft
    });
  };

  const handleRightIndentChange = (value: string) => {
    if (!selectedElement) return;
    
    setRightIndent(value);
    
    // If right-aligned, apply the indent directly
    if (blockAlignment === 'right') {
      selectedElement.style.marginRight = value;
    }
    
    console.log('Right indent updated:', {
      value,
      alignment: blockAlignment,
      marginRight: selectedElement.style.marginRight,
      computed: window.getComputedStyle(selectedElement).marginRight
    });
  };

  // Add vertical position handlers
  const handleTopMarginChange = (value: string) => {
    if (!selectedElement) return;
    
    setTopMargin(value);
    // Apply margin to the element itself, not its parent
    selectedElement.style.marginTop = value;
    console.log('Applied top margin:', {
      value,
      element: selectedElement.tagName,
      marginTop: selectedElement.style.marginTop,
      computed: window.getComputedStyle(selectedElement).marginTop
    });
  };

  const handleBottomMarginChange = (value: string) => {
    if (!selectedElement) return;
    
    setBottomMargin(value);
    // Apply margin to the element itself, not its parent
    selectedElement.style.marginBottom = value;
    console.log('Applied bottom margin:', {
      value,
      element: selectedElement.tagName,
      marginBottom: selectedElement.style.marginBottom,
      computed: window.getComputedStyle(selectedElement).marginBottom
    });
  };

  const handleVerticalAlignmentChange = (value: 'top' | 'center' | 'bottom') => {
    if (!selectedElement?.parentElement) return;
    
    const container = selectedElement.parentElement;
    setVerticalAlignment(value);

    // Set container to flex for vertical alignment
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    
    // Apply alignment independently of parent
    switch (value) {
      case 'top':
        selectedElement.style.marginTop = '0';
        selectedElement.style.marginBottom = 'auto';
        break;
      case 'center':
        selectedElement.style.marginTop = 'auto';
        selectedElement.style.marginBottom = 'auto';
        break;
      case 'bottom':
        selectedElement.style.marginTop = 'auto';
        selectedElement.style.marginBottom = '0';
        break;
    }
    
    // Log the changes
    console.log('Applied vertical alignment:', {
      value,
      element: selectedElement.tagName,
      marginTop: selectedElement.style.marginTop,
      marginBottom: selectedElement.style.marginBottom,
      container: container.tagName,
      display: container.style.display,
      flexDirection: container.style.flexDirection
    });
  };

  const handleMarginChange = (value: string) => {
    setMargin(value as SpacingKey);
    if (selectedElement) {
      selectedElement.style.margin = spacingPresets.margin[value as SpacingKey];
    }
  };

  const handlePaddingChange = (value: string) => {
    setPadding(value as SpacingKey);
    if (selectedElement) {
      selectedElement.style.padding = spacingPresets.padding[value as SpacingKey];
    }
  };

  const handleGapChange = (value: string) => {
    setGap(value as SpacingKey);
    if (selectedElement) {
      selectedElement.style.gap = spacingPresets.gap[value as SpacingKey];
    }
  };

  // Add these handlers for indentation
  const handleBlockIndentChange = (value: number) => {
    if (!selectedElement) return;
    
    // Find the closest container
    const container = selectedElement.closest('.pricing-card') || selectedElement.parentElement;
    if (!container || !(container instanceof HTMLElement)) return;
    
    // Get container width
    const containerWidth = container.offsetWidth;
    
    // Calculate available space (total - text min-width)
    const textMinWidth = 200; // Minimum width for readable text
    const availableSpace = containerWidth - textMinWidth;
    
    // Limit indent to available space
    const maxIndent = Math.floor(availableSpace * 0.5); // Max 50% of available space
    const safeValue = Math.min(value, maxIndent);
    
    // Don't allow negative indents
    const finalValue = Math.max(0, safeValue);
    
    // Apply indent to the container's padding
    if (container instanceof HTMLElement) {
      container.style.paddingLeft = `${finalValue}px`;
      setBlockIndent(finalValue);
      
      console.log('Applied block indent:', {
        requestedValue: value,
        maxAllowed: maxIndent,
        appliedValue: finalValue,
        containerWidth,
        availableSpace,
        paddingLeft: container.style.paddingLeft,
        computed: window.getComputedStyle(container).paddingLeft
      });
    }
  };

  const handleFirstLineIndentChange = (value: number) => {
    if (!selectedElement) return;
    
    // Get parent width
    const parentWidth = selectedElement.parentElement?.offsetWidth || 0;
    
    // Limit indent to 50% of parent width
    const maxIndent = Math.floor(parentWidth * 0.5);
    const safeValue = Math.min(value, maxIndent);
    
    // Don't allow negative indents
    const finalValue = Math.max(0, safeValue);
    
    selectedElement.style.textIndent = `${finalValue}px`;
    setFirstLineIndent(finalValue);
    
    console.log('Applied first line indent:', {
      requestedValue: value,
      maxAllowed: maxIndent,
      appliedValue: finalValue,
      parentWidth,
      textIndent: selectedElement.style.textIndent,
      computed: window.getComputedStyle(selectedElement).textIndent
    });
  };

  // Add these handlers
  const handleWordSpacingChange = (value: string) => {
    if (!selectedElement) return;
    selectedElement.style.wordSpacing = value;
    setWordSpacing(value);
  };

  const handleLineGapChange = (value: string) => {
    if (!selectedElement) return;
    const lineGapValues = {
      'normal': '1.5',
      'tight': '1.25',
      'relaxed': '1.75',
      'loose': '2'
    };
    selectedElement.style.lineHeight = lineGapValues[value as keyof typeof lineGapValues];
    setLineGap(value);
  };

  // Update the handleClickableElementClick function
  const handleClickableElementClick = (e: React.MouseEvent<HTMLElement>, elementId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const element = e.currentTarget;
    
    // Clear any existing selection
    if (selectedElement) {
      selectedElement.classList.remove('outline-blue-500');
    }
    
    // Set new selection
    setSelectedElement(element);
    element.classList.add('outline-blue-500');
    
    // Update toolbar state
    updateToolbarState(element);
    
    console.log('Clickable element selected:', {
      id: elementId,
      type: element.dataset.elementType,
      element: element.tagName,
      styles: window.getComputedStyle(element)
    });
  };

  // Add these handlers for nav menu controls
const handleNavLayoutChange = (value: string) => {
  if (!selectedElement?.closest('nav')) return;
  
  const navElement = selectedElement.closest('nav');
  if (!navElement) return;

  setNavLayout(value);
  navElement.className = cn(
    "hidden md:flex items-center flex-1",
    value === 'horizontal' ? 'flex-row' : 'flex-col',
    {
      'justify-start': navAlignment === 'start',
      'justify-center': navAlignment === 'center',
      'justify-end': navAlignment === 'end',
      'justify-between': navAlignment === 'space-between',
      'justify-around': navAlignment === 'space-around'
    }
  );
};

const handleNavAlignmentChange = (value: string) => {
  if (!selectedElement?.closest('nav')) return;
  
  const navElement = selectedElement.closest('nav');
  if (!navElement) return;

  setNavAlignment(value);
  navElement.className = cn(
    "hidden md:flex items-center flex-1",
    navLayout === 'horizontal' ? 'flex-row' : 'flex-col',
    {
      'justify-start': value === 'start',
      'justify-center': value === 'center',
      'justify-end': value === 'end',
      'justify-between': value === 'space-between',
      'justify-around': value === 'space-around'
    }
  );
};

const handleNavItemSpacingChange = (value: string) => {
  if (!selectedElement?.closest('nav')) return;
  
  const navElement = selectedElement.closest('nav');
  if (!navElement) return;

  setNavItemSpacing(value);
  navElement.style.gap = value;
  
  // Apply to all nav items
  const navItems = navElement.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item instanceof HTMLElement) {
      item.style.margin = '0';
      item.style.padding = '0';
    }
  });
};

const handleNavItemMarginChange = (value: string) => {
  if (!selectedElement?.closest('nav')) return;
  
  const navElement = selectedElement.closest('nav');
  if (!navElement) return;

  setNavItemMargin(value);
  const navItems = navElement.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item instanceof HTMLElement) {
      item.style.margin = value;
    }
  });
};

  const handleNavItemPaddingChange = (value: string) => {
    if (!selectedElement?.closest('nav')) return;
    
    const navElement = selectedElement.closest('nav');
    if (!navElement) return;

    setNavItemPadding(value);
    const navItems = navElement.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item instanceof HTMLElement) {
        item.style.padding = value;
      }
    });
  };

  // Update the renderClickableElement function
  const renderClickableElement = (
    children: React.ReactNode,
    elementId: string,
    type: ClickableElement,
    className?: string,
    styles?: React.CSSProperties
  ) => {
    const isSelected = selectedElement?.id === elementId;
    
    return (
      <div 
        className={cn(
          "relative",
          className,
          isSelected && "outline outline-2 outline-blue-500"
        )}
        style={styles}
        onClick={(e) => {
          // Only handle click if it's directly on this element, not its children
          if (e.target === e.currentTarget) {
            handleClickableElementClick(e, elementId);
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        data-element-type={type}
        id={elementId}
      >
        {children}
        {isSelected && renderBlockOutlines(selectedElement)}
      </div>
    );
  };

  // Update the header section to make it clickable
  {renderClickableElement(
    <div className="sticky top-0 z-[1000] bg-slate-800/40 backdrop-blur-md border-b border-slate-700/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {renderEditableText(
            "Brainpower AI",
            "text-slate-200",
            "header-text-logo",
            'title',
            {
              fontSize: '48px',
              fontWeight: '600',
              letterSpacing: '-0.015em',
              color: 'hsl(210 40% 98%)',
              marginBottom: '0',
              position: 'relative',
              zIndex: 1
            }
          )}

          {/* Navigation Menu */}
          {renderClickableElement(
            <nav 
              className={cn(
                "hidden md:flex items-center flex-1",
                navLayout === 'horizontal' ? 'flex-row' : 'flex-col',
                {
                  'justify-start': navAlignment === 'start',
                  'justify-center': navAlignment === 'center',
                  'justify-end': navAlignment === 'end',
                  'justify-between': navAlignment === 'space-between',
                  'justify-around': navAlignment === 'space-around'
                }
              )}
              style={{
                gap: navItemSpacing
              }}
              data-element-type="nav" // Add this explicitly
              onClick={(e) => {
                e.stopPropagation();
                handleClickableElementClick(e, 'header-nav');
              }}
            >
              {[
                { text: "Features", href: "#features" },
                { text: "Pricing", href: "#pricing" },
                { text: "About", href: "#about" },
                { text: "Contact", href: "#contact" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="relative"
                  style={{
                    margin: navItemMargin,
                    padding: navItemPadding
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {renderEditableText(
                    item.text,
                    cn(
                      typographyPresets.apple.body.className,
                      "text-slate-200 hover:text-white transition-colors"
                    ),
                    `nav-item-${index}`,
                    'body'
                  )}
                </div>
              ))}
            </nav>,
            'header-nav',
            'nav', // Make sure this matches the ElementType
            'flex-1 nav-menu'
          )}

          {/* CTA Button */}
          {renderClickableElement(
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                typographyPresets.apple.cta.className,
                "px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 whitespace-nowrap"
              )}
              onClick={(e) => e.stopPropagation()} // Stop propagation to allow text selection
            >
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                {renderEditableText(
                  "Get Started",
                  "text-white",
                  "header-cta-text",
                  'cta'
                )}
              </div>
            </motion.button>,
            'header-cta-button',
            'button'
          )}
        </div>
      </div>
    </div>,
    'header-container',
    'container'
  )}

  // Main return
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
              {renderClickableElement(
                <div className="sticky top-0 z-[1000] bg-slate-800/40 backdrop-blur-md border-b border-slate-700/30">
                  <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                      {/* Logo */}
                      {renderEditableText(
                        "Brainpower AI",
                        "text-slate-200",
                        "header-text-logo",
                        'title',
                        {
                          fontSize: '48px',
                          fontWeight: '600',
                          letterSpacing: '-0.015em',
                          color: 'hsl(210 40% 98%)',
                          marginBottom: '0',
                          position: 'relative',
                          zIndex: 1
                        }
                      )}

                      {/* Navigation Menu */}
                      {renderClickableElement(
                        <nav 
                          className={cn(
                            "hidden md:flex items-center flex-1",
                            navLayout === 'horizontal' ? 'flex-row' : 'flex-col',
                            {
                              'justify-start': navAlignment === 'start',
                              'justify-center': navAlignment === 'center',
                              'justify-end': navAlignment === 'end',
                              'justify-between': navAlignment === 'space-between',
                              'justify-around': navAlignment === 'space-around'
                            }
                          )}
                          style={{
                            gap: navItemSpacing
                          }}
                          data-element-type="nav" // Add this explicitly
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClickableElementClick(e, 'header-nav');
                          }}
                        >
                          {[
                            { text: "Features", href: "#features" },
                            { text: "Pricing", href: "#pricing" },
                            { text: "About", href: "#about" },
                            { text: "Contact", href: "#contact" }
                          ].map((item, index) => (
                            <div 
                              key={index}
                              className="relative"
                              style={{
                                margin: navItemMargin,
                                padding: navItemPadding
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {renderEditableText(
                                item.text,
                                cn(
                                  typographyPresets.apple.body.className,
                                  "text-slate-200 hover:text-white transition-colors"
                                ),
                                `nav-item-${index}`,
                                'body'
                              )}
                            </div>
                          ))}
                        </nav>,
                        'header-nav',
                        'nav', // Make sure this matches the ElementType
                        'flex-1 nav-menu'
                      )}

                      {/* CTA Button */}
                      {renderClickableElement(
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            typographyPresets.apple.cta.className,
                            "px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 whitespace-nowrap"
                          )}
                          onClick={(e) => e.stopPropagation()} // Stop propagation to allow text selection
                        >
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            {renderEditableText(
                              "Get Started",
                              "text-white",
                              "header-cta-text",
                              'cta'
                            )}
                          </div>
                        </motion.button>,
                        'header-cta-button',
                        'button'
                      )}
                    </div>
                  </div>
                </div>,
                'header-container',
                'container'
              )}

              {/* Hero Section */}
              <section id="intro" className="min-h-[70vh] flex flex-col items-center justify-center text-center mb-32">
                {renderEditableText(
                  "Empower Your Digital Presence",
                  typographyPresets.apple.heading.className,
                  "intro-heading",
                  'heading'
                )}
                
                {renderEditableText(
                  "Create stunning websites and sales funnels with ease, powered by AI and designed for entrepreneurs.",
                  typographyPresets.apple.bodyText.className,
                  "intro-description",
                  'bodyText'
                )}

                {renderClickableElement(
                  <div className="mt-8">
                    {renderClickableElement(
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          typographyPresets.apple.cta.className,
                          "px-8 py-4 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
                        )}
                      >
                        {renderEditableText(
                          "Get Started",
                          "text-white",
                          "hero-cta-text",
                          'cta'
                        )}
                        <ChevronRight className="ml-2 inline-block" />
                      </motion.button>,
                      'hero-cta-button',
                      'button'
                    )}
                  </div>,
                  'hero-cta-container',
                  'container'
                )}
              </section>

              {/* Features Section */}
              <section id="features" className="py-24">
                {renderEditableText(
                  "Innovative Features",
                  typographyPresets.apple.mainTitle.className,
                  "features-heading",
                  'mainTitle'
                )}

                {renderClickableElement(
                  <div className="grid md:grid-cols-2 gap-8 mt-12">
                    {features.map((feature: Feature, index: number) => (
                      renderClickableElement(
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="feature-card p-8 bg-white rounded-xl shadow-lg"
                        >
                          {renderClickableElement(
                            <div className="text-4xl mb-4">{feature.icon}</div>,
                            `feature-icon-${index}`,
                            'image'
                          )}
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
                        </motion.div>,
                        `feature-card-${index}`,
                        'card'
                      )
                    ))}
                  </div>,
                  'features-grid',
                  'container'
                )}
              </section>

              {/* Process Section */}
              <section id="process" className="py-24">
                {renderEditableText(
                  "Simplified Process",
                  typographyPresets.apple.mainTitle.className,
                  "process-heading",
                  'mainTitle'
                )}

                {renderClickableElement(
                  <div className="max-w-2xl mx-auto mt-12">
                    <ol className="relative border-l border-gray-200">
                      {[
                        {
                          step: "1",
                          title: "Choose a Template",
                          description: "Select from our curated collection of modern, responsive templates."
                        },
                        {
                          step: "2",
                          title: "Customize with AI",
                          description: "Leverage our AI to generate content, images, and optimize your design."
                        },
                        {
                          step: "3",
                          title: "Launch and Grow",
                          description: "Publish your site, set up payments, and start selling immediately."
                        }
                      ].map((step, index) => (
                        renderClickableElement(
                          <li key={index} className="mb-10 ml-6">
                            {renderClickableElement(
                              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full -left-4 ring-4 ring-white">
                                {step.step}
                              </span>,
                              `process-step-number-${index}`,
                              'container'
                            )}
                            {renderEditableText(
                              step.title,
                              typographyPresets.apple.subtitle.className,
                              `process-step-${index}-title`,
                              'subtitle'
                            )}
                            {renderEditableText(
                              step.description,
                              typographyPresets.apple.body.className,
                              `process-step-${index}-desc`,
                              'body'
                            )}
                          </li>,
                          `process-step-${index}`,
                          'container'
                        )
                      ))}
                    </ol>
                  </div>,
                  'process-container',
                  'container'
                )}
              </section>

              {/* MVP Section */}
              <section id="mvp" className="py-24">
                {renderEditableText(
                  "Our MVP: Simplicity Meets Power",
                  typographyPresets.apple.mainTitle.className,
                  "mvp-heading",
                  'mainTitle'
                )}

                {renderClickableElement(
                  <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
                    {renderClickableElement(
                      <div>
                        {renderEditableText(
                          "Build Like a Pro, No Coding Required",
                          typographyPresets.apple.subtitle.className,
                          "mvp-subtitle",
                          'subtitle'
                        )}
                        {renderEditableText(
                          "Our MVP empowers entrepreneurs to create sophisticated landing pages and sales funnels with the ease of editing a presentation.",
                          typographyPresets.apple.body.className,
                          "mvp-description",
                          'body'
                        )}
                      </div>,
                      'mvp-text-container',
                      'container'
                    )}
                    {renderClickableElement(
                      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                        [Placeholder for MVP Screenshot]
                      </div>,
                      'mvp-screenshot',
                      'image'
                    )}
                  </div>,
                  'mvp-grid',
                  'container'
                )}
              </section>

              {/* Pricing Section */}
              <section id="pricing" className="py-24">
                {/* ... existing pricing cards code ... */}
              </section>
            </div>
          </div>

          {/* Replace the toolbar section with: */}
          <div 
            className="w-72 bg-zinc-800 p-4 rounded-lg shadow-lg h-full overflow-y-auto ml-4" 
            style={{ zIndex: 1100 }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {selectedElement?.hasAttribute('contenteditable') ? (
              <ToolbarLayout
                selectedElement={selectedElement}
                selectedDimension={selectedDimension}
                blockAlignment={blockAlignment}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                letterSpacing={letterSpacing}
                lineHeight={lineHeight}
                isBold={isBold}
                isItalic={isItalic}
                isUnderline={isUnderline}
                textAlign={textAlign === 'justify' ? 'left' : textAlign}
                selectedTypographySystem={selectedTypographySystem}
                selectedStyle={selectedStyle}
                margin={margin}
                padding={padding}
                gap={gap}
                onDimensionChange={handleDimensionPresetChange}
                onBlockAlignmentChange={handleBlockAlignment}
                onVerticalAlignmentChange={handleVerticalAlignmentChange}
                onFontFamilyChange={handleFontFamilyChange}
                onFontSizeChange={handleFontSizeChange}
                onFontWeightChange={handleFontWeightChange}
                onLetterSpacingChange={handleLetterSpacingChange}
                onLineHeightChange={handleLineHeightChange}
                onBoldClick={() => setIsBold(!isBold)}
                onItalicClick={() => setIsItalic(!isItalic)}
                onUnderlineClick={() => setIsUnderline(!isUnderline)}
                onTextAlignChange={handleTextAlign}
                onLeftIndentChange={handleLeftIndentChange}
                onRightIndentChange={handleRightIndentChange}
                onTypographySystemChange={handleTypographySystemChange}
                onStylePresetChange={applyStylePreset}
                onMarginChange={handleMarginChange}
                onPaddingChange={handlePaddingChange}
                onGapChange={handleGapChange}
                firstLineIndent={firstLineIndent}
                blockIndent={blockIndent}
                onFirstLineIndentChange={handleFirstLineIndentChange}
                onBlockIndentChange={handleBlockIndentChange}
                wordSpacing={wordSpacing}
                lineGap={lineGap}
                onWordSpacingChange={handleWordSpacingChange}
                onLineGapChange={handleLineGapChange}
                leftIndent={leftIndent}
                rightIndent={rightIndent}
                topMargin={topMargin}
                bottomMargin={bottomMargin}
                verticalAlignment={verticalAlignment}
                onTopMarginChange={handleTopMarginChange}
                onBottomMarginChange={handleBottomMarginChange}
              />
            ) : (
              <ObjectToolbarLayout
                navLayout={navLayout}
                navAlignment={navAlignment}
                navItemSpacing={navItemSpacing}
                navItemMargin={navItemMargin}
                navItemPadding={navItemPadding}
                onNavLayoutChange={handleNavLayoutChange}
                onNavAlignmentChange={handleNavAlignmentChange}
                onNavItemSpacingChange={handleNavItemSpacingChange}
                onNavItemMarginChange={handleNavItemMarginChange}
                onNavItemPaddingChange={handleNavItemPaddingChange}
                selectedElement={selectedElement!}
                elementType={selectedElement?.dataset.elementType as 'button' | 'image' | 'container' | 'card' | 'nav'}
                width={selectedElement?.style.width || 'auto'}
                height={selectedElement?.style.height || 'auto'}
                position={selectedElement?.style.position || 'static'}
                margin={selectedElement?.style.margin || '0px'}
                padding={selectedElement?.style.padding || '0px'}
                onWidthChange={(value) => {
                  if (selectedElement) selectedElement.style.width = value;
                }}
                onHeightChange={(value) => {
                  if (selectedElement) selectedElement.style.height = value;
                }}
                onPositionChange={(value) => {
                  if (selectedElement) selectedElement.style.position = value;
                }}
                onMarginChange={(value) => {
                  if (selectedElement) selectedElement.style.margin = value;
                }}
                onPaddingChange={(value) => {
                  if (selectedElement) selectedElement.style.padding = value;
                }}
                // Add nav-specific props
                
              />
            )}
          </div>
        </div>
      </div>
      {showInlineControls && (
        <InlineToolbar 
          position={inlineControlsPosition}
          onFormatClick={handleFormatClick}
          onDimensionChange={handleDimensionPresetChange}
          onBlockAlignmentChange={handleBlockAlignment}
          selectedDimension={selectedDimension}
          blockAlignment={blockAlignment}
        />
      )}
    </div>
  )
} // Only one closing brace for the component

