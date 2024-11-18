'use client'

import { useState } from 'react';
import { typographyPresets, type TypographyStyle, dimensionPresets } from "@/lib/typography";
import { ElementInfo } from "@/lib/text-selection";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface EditorToolbarProps {
  selectedElement: HTMLElement | null;
  elementInfo: ElementInfo | null;
  onStyleChange: (style: TypographyStyle) => void;
  onFontFamilyChange: (value: string) => void;
  onFontSizeChange: (value: string) => void;
  onFontWeightChange: (value: string) => void;
  onLetterSpacingChange: (value: string) => void;
  onLineHeightChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onAlignmentChange: (value: 'left' | 'center' | 'right' | 'justify') => void;
  onPositionChange: (value: string) => void;
  onDimensionChange: (value: DimensionSize) => void;
  onIndentChange: (value: string) => void;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  lineHeight: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  color: string;
  position: string;
  selectedStyle: TypographyStyle;
  colorOptions: Record<string, string>;
  fontFamilies: string[];
  fontSizes: string[];
  fontWeights: string[];
  letterSpacings: string[];
  lineHeights: string[];
  onTypographySystemChange: (value: 'apple' | 'shadcn') => void;
  selectedDimension: DimensionSize;
  typographySystem: 'apple' | 'shadcn';
}

export const EditorToolbar = ({ 
  selectedElement,
  elementInfo,
  onStyleChange,
  onFontFamilyChange,
  onFontSizeChange,
  onFontWeightChange,
  onLetterSpacingChange,
  onLineHeightChange,
  onColorChange,
  onAlignmentChange,
  onPositionChange,
  onDimensionChange,
  onIndentChange,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
  color,
  position,
  selectedStyle,
  colorOptions,
  fontFamilies,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  onTypographySystemChange,
  selectedDimension,
  typographySystem,
}: EditorToolbarProps) => {
  // Prevent event propagation
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (!selectedElement) {
    return (
      <div className="w-72 bg-zinc-800 p-4 rounded-lg shadow-lg h-full overflow-y-auto ml-4">
        <div className="text-zinc-400 text-center p-4">
          Select an element to edit its properties
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-72 bg-zinc-800 p-4 rounded-lg shadow-lg h-full overflow-y-auto ml-4" 
      style={{ zIndex: 1100 }}
      onClick={handleClick}
      onMouseDown={handleClick}
    >
      {/* Typography System Selection - First control */}
      <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
        <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Typography System</div>
        <Select 
          value={typographySystem}
          onValueChange={onTypographySystemChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select system" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple Design</SelectItem>
            <SelectItem value="shadcn">ShadcnUI</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dimension Controls */}
      <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
        <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Dimensions</div>
        <Select 
          value={selectedDimension}
          onValueChange={onDimensionChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xs">Extra Small</SelectItem>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
            <SelectItem value="2xl">2X Large</SelectItem>
            <SelectItem value="full">Full Width</SelectItem>
            <SelectItem value="auto">Auto</SelectItem>
          </SelectContent>
        </Select>

        {/* Dimension Preview */}
        {selectedElement?.dataset.typography && (
          <div className="mt-2 p-2 bg-zinc-800 rounded text-xs">
            <div className="text-zinc-400">Current dimensions:</div>
            <div className="text-white mt-1">
              {dimensionPresets[selectedElement.dataset.typography as keyof typeof dimensionPresets]?.[selectedDimension]?.maxWidth || 'auto'}
            </div>
          </div>
        )}
      </div>

      {/* Typography System */}
      <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
        <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Typography System</div>
        <Select 
          onValueChange={onDimensionChange}
          value={selectedStyle}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(typographyPresets.apple).map(([style, preset]) => (
              <SelectItem key={style} value={style}>
                {style} ({preset.fontSize})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Controls */}
      {selectedElement.hasAttribute('contenteditable') && (
        <>
          {/* Font Family */}
          <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
            <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Font Family</div>
            <Select onValueChange={onFontFamilyChange} value={fontFamily}>
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
            <Select onValueChange={onFontSizeChange} value={fontSize}>
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

          {/* ... Continue with other controls ... */}
          {/* Add all the other controls from the original toolbar */}
        </>
      )}

      {/* Color Controls */}
      <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600">
        <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Text Color</div>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(colorOptions).map(([className, hex]) => (
            <TooltipProvider key={className}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onColorChange(hex)}
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
    </div>
  );
}; 