'use client'

import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Type as TypeIcon,
  Bold,
  Italic,
  Underline,
  IndentDecrease,
  IndentIncrease,
  MoveLeft,
  MoveRight,
  PanelLeftClose,
  PanelRightClose,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyEnd
} from 'lucide-react'
import { 
  typographyPresets, 
  type TypographyStyle,
  dimensionPresets,
  type DimensionSize,
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights
} from "@/lib/typography"
import { TextIndentationControls } from './text-indentation-controls'

interface ToolbarLayoutProps {
  selectedElement: HTMLElement | null;
  selectedDimension: DimensionSize;
  blockAlignment: 'left' | 'center' | 'right';
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  lineHeight: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  textAlign: 'left' | 'center' | 'right';
  selectedTypographySystem: 'apple';
  selectedStyle: TypographyStyle;
  margin: string;
  padding: string;
  gap: string;
  onDimensionChange: (value: DimensionSize) => void;
  onBlockAlignmentChange: (value: 'left' | 'center' | 'right') => void;
  onVerticalAlignmentChange: (value: 'top' | 'center' | 'bottom') => void;
  onFontFamilyChange: (value: string) => void;
  onFontSizeChange: (value: string) => void;
  onFontWeightChange: (value: string) => void;
  onLetterSpacingChange: (value: string) => void;
  onLineHeightChange: (value: string) => void;
  onBoldClick: () => void;
  onItalicClick: () => void;
  onUnderlineClick: () => void;
  onTextAlignChange: (value: 'left' | 'center' | 'right') => void;
  onLeftIndentChange: (value: string) => void;
  onRightIndentChange: (value: string) => void;
  onTypographySystemChange: (value: 'apple') => void;
  onStylePresetChange: (value: TypographyStyle) => void;
  onMarginChange: (value: string) => void;
  onPaddingChange: (value: string) => void;
  onGapChange: (value: string) => void;
  firstLineIndent: number;
  blockIndent: number;
  onFirstLineIndentChange: (value: number) => void;
  onBlockIndentChange: (value: number) => void;
  wordSpacing: string;
  onWordSpacingChange: (value: string) => void;
  lineGap: string;
  onLineGapChange: (value: string) => void;
  leftIndent: string;
  rightIndent: string;
  topMargin: string;
  bottomMargin: string;
  onTopMarginChange: (value: string) => void;
  onBottomMarginChange: (value: string) => void;
  verticalAlignment: 'top' | 'center' | 'bottom';
}

export const ToolbarLayout: React.FC<ToolbarLayoutProps> = ({
  selectedElement,
  selectedDimension,
  blockAlignment,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  isBold,
  isItalic,
  isUnderline,
  textAlign,
  selectedTypographySystem,
  selectedStyle,
  margin,
  padding,
  gap,
  onDimensionChange,
  onBlockAlignmentChange,
  onVerticalAlignmentChange,
  onFontFamilyChange,
  onFontSizeChange,
  onFontWeightChange,
  onLetterSpacingChange,
  onLineHeightChange,
  onBoldClick,
  onItalicClick,
  onUnderlineClick,
  onTextAlignChange,
  onLeftIndentChange,
  onRightIndentChange,
  onTypographySystemChange,
  onStylePresetChange,
  onMarginChange,
  onPaddingChange,
  onGapChange,
  firstLineIndent,
  blockIndent,
  onFirstLineIndentChange,
  onBlockIndentChange,
  wordSpacing,
  onWordSpacingChange,
  lineGap,
  onLineGapChange,
  leftIndent,
  rightIndent,
  topMargin,
  bottomMargin,
  onTopMarginChange,
  onBottomMarginChange,
  verticalAlignment,
}) => {
  if (!selectedElement) {
    return (
      <div className="text-zinc-400 text-center p-4">
        Select an element to edit its properties
      </div>
    );
  }

  const currentTypographySystem = typographyPresets[selectedTypographySystem] || typographyPresets.apple;

  return (
    <div className="space-y-6">
      {/* Typography Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-zinc-200 font-semibold border-b border-zinc-700 pb-2">
          <TypeIcon className="h-4 w-4" />
          <span>Typography</span>
        </div>

        {/* Typography System Selection */}
        <div className="p-3 bg-zinc-700/50 rounded-lg mb-2">
          <div className="text-xs text-zinc-400 uppercase mb-2">Typography System</div>
          <Select 
            onValueChange={onTypographySystemChange}
            value={selectedTypographySystem}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple Typography</SelectItem>
              {/* Add other typography systems here when available */}
            </SelectContent>
          </Select>
        </div>

        {/* Style Preset */}
        <div className="p-3 bg-zinc-700/50 rounded-lg mb-2">
          <div className="text-xs text-zinc-400 uppercase mb-2">Style Preset</div>
          <Select 
            onValueChange={onStylePresetChange} 
            value={selectedStyle}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(currentTypographySystem).map(([style, preset]) => (
                <SelectItem key={style} value={style as TypographyStyle}>
                  {style} ({preset.fontSize})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Text Styling */}
        <div className="p-3 bg-zinc-700/50 rounded-lg mb-2">
          <div className="text-xs text-zinc-400 uppercase mb-2">Text Styling</div>
          
          {/* Font Family */}
          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-1">Font Family</div>
            <Select 
              value={fontFamily}
              onValueChange={onFontFamilyChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font.split(',')[0].trim()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Size */}
          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-1">Font Size</div>
            <Select 
              value={fontSize}
              onValueChange={onFontSizeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {fontSizes.map((size) => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Weight */}
          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-1">Font Weight</div>
            <Select 
              value={fontWeight}
              onValueChange={onFontWeightChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent>
                {fontWeights.map((weight) => (
                  <SelectItem key={weight} value={weight}>{weight}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Letter Spacing */}
          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-1">Letter Spacing</div>
            <Select 
              value={letterSpacing}
              onValueChange={onLetterSpacingChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select spacing" />
              </SelectTrigger>
              <SelectContent>
                {letterSpacings.map((spacing) => (
                  <SelectItem key={spacing} value={spacing}>{spacing}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Line Height */}
          <div className="mb-3">
            <div className="text-xs text-zinc-400 mb-1">Line Height</div>
            <Select 
              value={lineHeight}
              onValueChange={onLineHeightChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select height" />
              </SelectTrigger>
              <SelectContent>
                {lineHeights.map((height) => (
                  <SelectItem key={height} value={height}>{height}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Text Style Buttons */}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBoldClick}
              className={cn("flex-1", isBold && "bg-zinc-600")}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onItalicClick}
              className={cn("flex-1", isItalic && "bg-zinc-600")}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onUnderlineClick}
              className={cn("flex-1", isUnderline && "bg-zinc-600")}
            >
              <Underline className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Text Alignment Section */}
      <div className="space-y-4">
        <div className="text-sm text-zinc-200 font-semibold border-b border-zinc-700 pb-2">
          Text Alignment
        </div>

        {/* Text Alignment Controls */}
        <div className="p-3 bg-zinc-700/50 rounded-lg mb-2">
          <div className="text-xs text-zinc-400 uppercase mb-2">Text Alignment</div>
          <div className="flex gap-0.5 bg-zinc-900/50 p-1 rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTextAlignChange('left')}
              className={cn("flex-1", textAlign === 'left' && "bg-zinc-600")}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTextAlignChange('center')}
              className={cn("flex-1", textAlign === 'center' && "bg-zinc-600")}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTextAlignChange('right')}
              className={cn("flex-1", textAlign === 'right' && "bg-zinc-600")}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Text Indentation */}
        <div className="p-3 bg-zinc-700/50 rounded-lg mb-2">
          <div className="text-xs text-zinc-400 uppercase mb-2">Text Indentation</div>
          <TextIndentationControls 
            firstLineIndent={firstLineIndent}
            blockIndent={blockIndent}
            onFirstLineIndentChange={onFirstLineIndentChange}
            onBlockIndentChange={onBlockIndentChange}
          />
        </div>

        {/* Whitespace & Gap Controls */}
        <div className="p-3 bg-zinc-700/50 rounded-lg mb-2">
          <div className="text-xs text-zinc-400 uppercase mb-2">Text Spacing</div>
          <div className="grid grid-cols-2 gap-4">
            {/* Word Spacing */}
            <div>
              <div className="text-xs text-zinc-400 mb-1">Word Spacing</div>
              <Select 
                value={wordSpacing}
                onValueChange={onWordSpacingChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select spacing" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: 'normal', label: 'Normal' },
                    { value: '-0.05em', label: 'Tight' },
                    { value: '0.05em', label: 'Loose' }
                  ].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Line Gap */}
            <div>
              <div className="text-xs text-zinc-400 mb-1">Line Gap</div>
              <Select 
                value={lineGap}
                onValueChange={onLineGapChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gap" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: 'normal', label: 'Normal' },
                    { value: 'tight', label: 'Tight' },
                    { value: 'relaxed', label: 'Relaxed' },
                    { value: 'loose', label: 'Loose' }
                  ].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Block Layout Section */}
      <div className="space-y-4">
        <div className="text-sm text-zinc-200 font-semibold border-b border-zinc-700 pb-2">
          Block Layout
        </div>

        {/* Block Alignment Controls */}
        <div className="p-3 bg-zinc-700/50 rounded-lg mb-2">
          <div className="text-xs text-zinc-400 uppercase mb-2">Block Alignment</div>
          <div className="flex gap-0.5 bg-zinc-900/50 p-1 rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBlockAlignmentChange('left')}
              className={cn("flex-1", blockAlignment === 'left' && "bg-zinc-600")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="6" height="14" x="6" y="5" rx="2"></rect>
                <rect width="6" height="10" x="16" y="7" rx="2"></rect>
                <path d="M2 2v20"></path>
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBlockAlignmentChange('center')}
              className={cn("flex-1", blockAlignment === 'center' && "bg-zinc-600")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="6" height="14" x="2" y="5" rx="2"></rect>
                <rect width="6" height="10" x="16" y="7" rx="2"></rect>
                <path d="M12 2v20"></path>
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBlockAlignmentChange('right')}
              className={cn("flex-1", blockAlignment === 'right' && "bg-zinc-600")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="6" height="14" x="2" y="5" rx="2"></rect>
                <rect width="6" height="10" x="12" y="7" rx="2"></rect>
                <path d="M22 2v20"></path>
              </svg>
            </Button>
          </div>
        </div>

        {/* Width Control */}
        <div className="mb-3">
          <div className="text-xs text-zinc-400 uppercase mb-2">BLOCK WIDTH</div>
          <Select 
            value={selectedDimension}
            onValueChange={onDimensionChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select width" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(dimensionPresets).map(([size, preset]) => (
                <SelectItem key={size} value={size as DimensionSize}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Block Position Controls */}
        <div className="space-y-4">
          {/* Horizontal Position Controls */}
          <div>
            <div className="text-xs text-zinc-400 uppercase mb-2">Horizontal Position</div>
            <div className="grid grid-cols-2 gap-4">
              {/* Left Indent */}
              <div>
                <div className="text-xs text-zinc-400 mb-1">Left Indent</div>
                <Select 
                  value={leftIndent || 'auto'}
                  onValueChange={onLeftIndentChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select indent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">auto</SelectItem>
                    {['0px', '8px', '16px', '24px', '32px', '40px', '48px', '56px', '64px'].map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Right Indent */}
              <div>
                <div className="text-xs text-zinc-400 mb-1">Right Indent</div>
                <Select 
                  value={rightIndent || 'auto'}
                  onValueChange={onRightIndentChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select indent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">auto</SelectItem>
                    {['0px', '8px', '16px', '24px', '32px', '40px', '48px', '56px', '64px'].map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Vertical Position Controls */}
          <div>
            <div className="text-xs text-zinc-400 uppercase mb-2">Vertical Position</div>
            <div className="grid grid-cols-2 gap-4">
              {/* Top Margin */}
              <div>
                <div className="text-xs text-zinc-400 mb-1">Top Margin</div>
                <Select 
                  value={topMargin || 'auto'}
                  onValueChange={onTopMarginChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select margin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">auto</SelectItem>
                    {['0px', '8px', '16px', '24px', '32px', '40px', '48px', '56px', '64px'].map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Bottom Margin */}
              <div>
                <div className="text-xs text-zinc-400 mb-1">Bottom Margin</div>
                <Select 
                  value={bottomMargin || 'auto'}
                  onValueChange={onBottomMarginChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select margin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">auto</SelectItem>
                    {['0px', '8px', '16px', '24px', '32px', '40px', '48px', '56px', '64px'].map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 