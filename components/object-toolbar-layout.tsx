'use client'

import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  LayoutTemplate,
  Move,
  ArrowUpDown,
  ArrowLeftRight,
  Box,
  Image as ImageIcon,
  Type,
  Square as ButtonIcon
} from 'lucide-react'

type ElementType = 'button' | 'image' | 'container' | 'card' | 'nav';

interface ObjectToolbarLayoutProps {
  selectedElement: HTMLElement;
  elementType?: ElementType;
  width: string;
  height: string;
  position: string;
  margin: string;
  padding: string;
  onWidthChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  onPositionChange: (value: string) => void;
  onMarginChange: (value: string) => void;
  onPaddingChange: (value: string) => void;
  navLayout?: string;
  navAlignment?: string;
  navItemSpacing?: string;
  navItemMargin?: string;
  navItemPadding?: string;
  onNavLayoutChange?: (value: string) => void;
  onNavAlignmentChange?: (value: string) => void;
  onNavItemSpacingChange?: (value: string) => void;
  onNavItemMarginChange?: (value: string) => void;
  onNavItemPaddingChange?: (value: string) => void;
}

// Add these specific controls for each element type
const buttonControls = (
  <div className="space-y-4">
    <div className="text-sm text-zinc-200 font-semibold">Button Style</div>
    {/* Background Color */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Background</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="solid">Solid</SelectItem>
          <SelectItem value="gradient">Gradient</SelectItem>
          <SelectItem value="outline">Outline</SelectItem>
          <SelectItem value="ghost">Ghost</SelectItem>
        </SelectContent>
      </Select>
    </div>
    {/* Border Radius */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Border Radius</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select radius" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="sm">Small</SelectItem>
          <SelectItem value="md">Medium</SelectItem>
          <SelectItem value="lg">Large</SelectItem>
          <SelectItem value="full">Full</SelectItem>
        </SelectContent>
      </Select>
    </div>
    {/* Hover Effect */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Hover Effect</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select effect" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="scale">Scale</SelectItem>
          <SelectItem value="lift">Lift</SelectItem>
          <SelectItem value="glow">Glow</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

const navMenuControls = (
  <div className="space-y-4">
    <div className="text-sm text-zinc-200 font-semibold">Nav Menu Settings</div>
    
    {/* Item Spacing */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Item Spacing</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select spacing" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tight">Tight (16px)</SelectItem>
          <SelectItem value="normal">Normal (24px)</SelectItem>
          <SelectItem value="relaxed">Relaxed (32px)</SelectItem>
          <SelectItem value="loose">Loose (40px)</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Menu Layout */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Menu Layout</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select layout" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="horizontal">Horizontal</SelectItem>
          <SelectItem value="vertical">Vertical</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Menu Item Alignment */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Item Alignment</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select alignment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="start">Start</SelectItem>
          <SelectItem value="center">Center</SelectItem>
          <SelectItem value="end">End</SelectItem>
          <SelectItem value="space-between">Space Between</SelectItem>
          <SelectItem value="space-around">Space Around</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Menu Item Margin */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Item Margin</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select margin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0px">None</SelectItem>
          <SelectItem value="8px">Small (8px)</SelectItem>
          <SelectItem value="16px">Medium (16px)</SelectItem>
          <SelectItem value="24px">Large (24px)</SelectItem>
          <SelectItem value="32px">Extra Large (32px)</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Menu Item Padding */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Item Padding</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select padding" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0px">None</SelectItem>
          <SelectItem value="8px">Small (8px)</SelectItem>
          <SelectItem value="16px">Medium (16px)</SelectItem>
          <SelectItem value="24px">Large (24px)</SelectItem>
          <SelectItem value="32px">Extra Large (32px)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

const containerControls = (
  <div className="space-y-4">
    <div className="text-sm text-zinc-200 font-semibold">Container Style</div>
    {/* Background */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Background</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="solid">Solid</SelectItem>
          <SelectItem value="gradient">Gradient</SelectItem>
          <SelectItem value="blur">Blur</SelectItem>
        </SelectContent>
      </Select>
    </div>
    {/* Border */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Border</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="solid">Solid</SelectItem>
          <SelectItem value="dashed">Dashed</SelectItem>
          <SelectItem value="dotted">Dotted</SelectItem>
        </SelectContent>
      </Select>
    </div>
    {/* Shadow */}
    <div>
      <div className="text-xs text-zinc-400 mb-1">Shadow</div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select shadow" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="sm">Small</SelectItem>
          <SelectItem value="md">Medium</SelectItem>
          <SelectItem value="lg">Large</SelectItem>
          <SelectItem value="xl">Extra Large</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

export const ObjectToolbarLayout: React.FC<ObjectToolbarLayoutProps> = ({
  selectedElement,
  elementType = 'container',
  width,
  height,
  position,
  margin,
  padding,
  onWidthChange,
  onHeightChange,
  onPositionChange,
  onMarginChange,
  onPaddingChange,
  navLayout,
  navAlignment,
  navItemSpacing,
  navItemMargin,
  navItemPadding,
  onNavLayoutChange,
  onNavAlignmentChange,
  onNavItemSpacingChange,
  onNavItemMarginChange,
  onNavItemPaddingChange
}) => {
  const getElementIcon = () => {
    switch (elementType) {
      case 'button':
        return <ButtonIcon className="h-4 w-4" />;
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'container':
        return <Box className="h-4 w-4" />;
      case 'card':
        return <LayoutTemplate className="h-4 w-4" />;
      default:
        return <Type className="h-4 w-4" />;
    }
  };

  const getElementTitle = () => {
    return elementType.charAt(0).toUpperCase() + elementType.slice(1) + ' Settings';
  };

  return (
    <div className="space-y-6">
      {/* Object Type Header */}
      <div className="flex items-center gap-2 text-sm text-zinc-200 font-semibold border-b border-zinc-700 pb-2">
        {getElementIcon()}
        <span>{getElementTitle()}</span>
      </div>

      {/* Dimensions Section */}
      <div className="space-y-4">
        <div className="text-sm text-zinc-200 font-semibold">Dimensions</div>
        <div className="grid grid-cols-2 gap-4">
          {/* Width */}
          <div>
            <div className="text-xs text-zinc-400 mb-1">Width</div>
            <Select value={width} onValueChange={onWidthChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="100%">Full Width</SelectItem>
                {['25%', '50%', '75%', '320px', '480px', '640px'].map((value) => (
                  <SelectItem key={value} value={value}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Height */}
          <div>
            <div className="text-xs text-zinc-400 mb-1">Height</div>
            <Select value={height} onValueChange={onHeightChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select height" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="100%">Full Height</SelectItem>
                {['200px', '300px', '400px', '500px'].map((value) => (
                  <SelectItem key={value} value={value}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Position Section */}
      <div className="space-y-4">
        <div className="text-sm text-zinc-200 font-semibold">Position</div>
        <Select value={position} onValueChange={onPositionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            {['static', 'relative', 'absolute', 'fixed'].map((value) => (
              <SelectItem key={value} value={value}>{value}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Spacing Section */}
      <div className="space-y-4">
        <div className="text-sm text-zinc-200 font-semibold">Spacing</div>
        <div className="grid grid-cols-2 gap-4">
          {/* Margin */}
          <div>
            <div className="text-xs text-zinc-400 mb-1">Margin</div>
            <Select value={margin} onValueChange={onMarginChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select margin" />
              </SelectTrigger>
              <SelectContent>
                {['0px', '8px', '16px', '24px', '32px', '40px'].map((value) => (
                  <SelectItem key={value} value={value}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Padding */}
          <div>
            <div className="text-xs text-zinc-400 mb-1">Padding</div>
            <Select value={padding} onValueChange={onPaddingChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select padding" />
              </SelectTrigger>
              <SelectContent>
                {['0px', '8px', '16px', '24px', '32px', '40px'].map((value) => (
                  <SelectItem key={value} value={value}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Element-specific controls */}
      {elementType === 'button' && buttonControls}
      {elementType === 'nav' && navMenuControls}
      {elementType === 'container' && containerControls}

      {elementType === 'card' && (
        <div className="space-y-4">
          <div className="text-sm text-zinc-200 font-semibold">Card Settings</div>
          {/* Add card-specific controls */}
        </div>
      )}
    </div>
  );
}; 