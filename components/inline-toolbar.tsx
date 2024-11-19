'use client'

import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  IndentDecrease,
  IndentIncrease
} from 'lucide-react'
import type { DimensionSize } from '@/lib/typography'

interface InlineToolbarProps {
  position: { top: number; left: number; right: number; bottom: number };
  onFormatClick: (type: string, value: string) => void;
  onDimensionChange: (value: DimensionSize) => void;
  onBlockAlignmentChange: (value: 'left' | 'center' | 'right') => void;
  selectedDimension: DimensionSize;
  blockAlignment: 'left' | 'center' | 'right';
}

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
          <IndentDecrease className="h-3 w-3" />
        </button>
        <span className="text-xs text-zinc-300 w-16 text-center">First Line</span>
        <button 
          className="p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200 w-6 h-6 flex items-center justify-center"
          onClick={() => onFormatClick('firstLineIndent', 'increase')}
        >
          <IndentIncrease className="h-3 w-3" />
        </button>
      </div>

      {/* Block Indent Controls */}
      <div className="flex items-center gap-1 bg-zinc-700/50 rounded-md p-1">
        <button 
          className="p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200 w-6 h-6 flex items-center justify-center"
          onClick={() => onFormatClick('blockIndent', 'decrease')}
        >
          <IndentDecrease className="h-3 w-3" />
        </button>
        <span className="text-xs text-zinc-300 w-16 text-center">Block</span>
        <button 
          className="p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200 w-6 h-6 flex items-center justify-center"
          onClick={() => onFormatClick('blockIndent', 'increase')}
        >
          <IndentIncrease className="h-3 w-3" />
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-zinc-600" />

      {/* Block Alignment */}
      <div className="flex items-center gap-1 bg-zinc-700/50 rounded-md p-1">
        <button 
          className={cn(
            "p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200",
            blockAlignment === 'left' && "bg-zinc-600"
          )}
          onClick={() => onBlockAlignmentChange('left')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="6" height="14" x="6" y="5" rx="2"></rect>
            <rect width="6" height="10" x="16" y="7" rx="2"></rect>
            <path d="M2 2v20"></path>
          </svg>
        </button>
        <button 
          className={cn(
            "p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200",
            blockAlignment === 'center' && "bg-zinc-600"
          )}
          onClick={() => onBlockAlignmentChange('center')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="6" height="14" x="2" y="5" rx="2"></rect>
            <rect width="6" height="10" x="16" y="7" rx="2"></rect>
            <path d="M12 2v20"></path>
          </svg>
        </button>
        <button 
          className={cn(
            "p-1 hover:bg-zinc-600/50 rounded text-xs text-zinc-200",
            blockAlignment === 'right' && "bg-zinc-600"
          )}
          onClick={() => onBlockAlignmentChange('right')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="6" height="14" x="2" y="5" rx="2"></rect>
            <rect width="6" height="10" x="12" y="7" rx="2"></rect>
            <path d="M22 2v20"></path>
          </svg>
        </button>
      </div>
    </div>
  )
} 