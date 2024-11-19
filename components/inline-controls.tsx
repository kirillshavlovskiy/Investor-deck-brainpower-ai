'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  PanelLeftClose,
  PanelRightClose,
  AlignVerticalJustifyCenter 
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { type InlineToolbarProps } from '@/lib/types/editor'

export const InlineToolbar: React.FC<InlineToolbarProps> = ({
  position,
  onFormatClick,
  onDimensionChange,
  onBlockAlignmentChange,
  selectedDimension,
  blockAlignment
}) => {
  return (
    <div 
      className="fixed bg-zinc-800/90 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1.5 flex items-center gap-2"
      style={{
        top: position.top,
        left: position.left,
        transform: 'translateY(-100%)',
        zIndex: 2000
      }}
    >
      {/* Text Alignment */}
      <div className="flex gap-0.5 bg-zinc-700/50 rounded-md p-0.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onFormatClick('align', 'left')}
          className="h-8 w-8"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onFormatClick('align', 'center')}
          className="h-8 w-8"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onFormatClick('align', 'right')}
          className="h-8 w-8"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="w-px h-4 bg-zinc-600" />

      {/* Block Alignment */}
      <div className="flex gap-0.5 bg-zinc-700/50 rounded-md p-0.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBlockAlignmentChange('left')}
          className={cn("h-8 w-8", blockAlignment === 'left' && "bg-zinc-600")}
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBlockAlignmentChange('center')}
          className={cn("h-8 w-8", blockAlignment === 'center' && "bg-zinc-600")}
        >
          <AlignVerticalJustifyCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBlockAlignmentChange('right')}
          className={cn("h-8 w-8", blockAlignment === 'right' && "bg-zinc-600")}
        >
          <PanelRightClose className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 