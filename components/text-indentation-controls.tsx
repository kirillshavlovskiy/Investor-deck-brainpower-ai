import React from 'react'
import { Button } from "@/components/ui/button"
import { IndentDecrease, IndentIncrease } from 'lucide-react'

interface TextIndentationControlsProps {
  onFirstLineIndentChange: (value: number) => void;
  onBlockIndentChange: (value: number) => void;
  firstLineIndent: number;
  blockIndent: number;
}

export const TextIndentationControls: React.FC<TextIndentationControlsProps> = ({
  onFirstLineIndentChange,
  onBlockIndentChange,
  firstLineIndent,
  blockIndent
}) => {
  return (
    <div className="space-y-4">
      {/* First Line Indent */}
      <div className="flex items-center gap-1 bg-zinc-700/50 rounded-md p-1">
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => onFirstLineIndentChange(Math.max(0, firstLineIndent - 16))}
          className="flex-1"
        >
          <IndentDecrease className="h-4 w-4" />
        </Button>
        <span className="text-xs text-zinc-300 w-16 text-center">First Line</span>
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => onFirstLineIndentChange(firstLineIndent + 16)}
          className="flex-1"
        >
          <IndentIncrease className="h-4 w-4" />
        </Button>
      </div>

      {/* Block Indent */}
      <div className="flex items-center gap-1 bg-zinc-700/50 rounded-md p-1">
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => onBlockIndentChange(Math.max(0, blockIndent - 16))}
          className="flex-1"
        >
          <IndentDecrease className="h-4 w-4" />
        </Button>
        <span className="text-xs text-zinc-300 w-16 text-center">Block</span>
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => onBlockIndentChange(blockIndent + 16)}
          className="flex-1"
        >
          <IndentIncrease className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 