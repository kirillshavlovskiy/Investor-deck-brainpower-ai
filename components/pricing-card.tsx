import React from 'react'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"
import { typographyPresets } from "@/lib/typography"

interface PricingCardProps {
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
  renderEditableText: (content: string, className: string, elementId: string, typographyStyle: string, styleOverrides?: React.CSSProperties) => React.ReactNode;
  renderCardOutline: (index: number) => React.ReactNode;
  margin: string;
  padding: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  block,
  index,
  isSelected,
  onClick,
  renderEditableText,
  renderCardOutline,
  margin,
  padding
}) => {
  return (
    <div 
      className="relative bg-white rounded-2xl shadow-lg cursor-pointer flex-1 min-w-[320px] max-w-[380px] pricing-card flex flex-col"
      style={{
        margin,
        padding,
      }}
      onClick={(e) => onClick(index, e)}
    >
      {renderCardOutline(index)}
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-4">
          {renderEditableText(
            `This is your ${block.title} Offer`,
            typographyPresets.apple.subtitle.className,
            `title-card-${index}-offer`,
            'subtitle'
          )}
          
          {renderEditableText(
            block.price,
            typographyPresets.apple.title.className,
            `price-card-${index}-amount`,
            'title',
            { color: block.priceColor }
          )}
        </div>

        <div className="flex flex-col gap-4">
          {renderEditableText(
            `Save ${block.saveAmount} ${block.description}`,
            typographyPresets.apple.description.className,
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
                  className={typographyPresets.apple.body.className}
                  data-typography="body"
                >
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 