import { type TypographyStyle, type DimensionSize } from '@/lib/typography'

export type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export interface InlineToolbarProps {
  position: { top: number; left: number; right: number; bottom: number };
  onFormatClick: (type: string, value?: string) => void;
  onDimensionChange: (value: DimensionSize) => void;
  onBlockAlignmentChange: (value: 'left' | 'center' | 'right') => void;
  selectedDimension: DimensionSize;
  blockAlignment: 'left' | 'center' | 'right';
}

export interface QuickControlsProps {
  selectedElement: HTMLElement | null;
  onTextAlignChange: (value: 'left' | 'center' | 'right') => void;
  onPositionChange: (value: PositionType) => void;
  onDimensionChange: (value: DimensionSize) => void;
}

export interface PricingCardProps {
  block: {
    title: string;
    price: string;
    saveAmount: string;
    description: string;
    priceColor: string;
    features: Array<{
      name: string;
      icon: string;
    }>;
  };
  index: number;
  isSelected: boolean;
  onClick: (index: number, e: React.MouseEvent) => void;
  renderEditableText: (content: string, className: string, elementId: string, typographyStyle: TypographyStyle, styleOverrides?: React.CSSProperties) => React.ReactNode;
  renderCardOutline: (index: number) => React.ReactNode;
  margin: string;
  padding: string;
} 