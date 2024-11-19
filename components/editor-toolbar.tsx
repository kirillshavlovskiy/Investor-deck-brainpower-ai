// 'use client'

// import { useState } from 'react';
// import { typographyPresets, dimensionPresets } from "@/lib/typography";
// import { ElementInfo } from "@/lib/text-selection";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import { 
//   AlignLeft, 
//   AlignCenter, 
//   AlignRight,
//   IndentDecrease,
//   IndentIncrease,
//   PanelLeftClose,
//   PanelLeftOpen,
//   AlignVerticalJustifyCenter,
//   PanelRightClose,
//   MoveLeft,
//   MoveRight
// } from 'lucide-react'
// import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
// import { type TypographyStyle } from "@/lib/utils";

// type DimensionType = keyof typeof import('@/lib/utils').typographyPresets.apple;

// interface EditorToolbarProps {
//   selectedElement: HTMLElement | null;
//   onFormatClick: (type: string, value: string) => void;
//   onDimensionChange: (value: DimensionType) => void;
//   onBlockAlignmentChange: (value: 'left' | 'center' | 'right') => void;
//   onTextAlignmentChange: (value: 'left' | 'center' | 'right' | 'justify') => void;
//   onPositionChange: (value: string) => void;
//   selectedDimension: DimensionType;
//   blockAlignment: 'left' | 'center' | 'right';
//   textAlign: 'left' | 'center' | 'right' | 'justify';
//   position: string;
// }

// export const EditorToolbar = ({ 
//   selectedElement,
//   onFormatClick,
//   onDimensionChange,
//   onBlockAlignmentChange,
//   onTextAlignmentChange,
//   onPositionChange,
//   selectedDimension,
//   blockAlignment,
//   textAlign,
//   position
// }: EditorToolbarProps) => {
//   const [selectedStyle, setSelectedStyle] = useState<TypographyStyle>('body');
//   const [fontFamily, setFontFamily] = useState('');
//   const [fontSize, setFontSize] = useState('');
//   const [color, setColor] = useState('');

//   const onFontFamilyChange = (value: string) => setFontFamily(value);
//   const onFontSizeChange = (value: string) => setFontSize(value);
//   const onColorChange = (value: string) => setColor(value);

//   const fontFamilies = ['Arial', 'Times New Roman', 'Helvetica', 'Georgia'];
//   const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];
//   const colorOptions = {
//     'text-black': '#000000',
//     'text-white': '#ffffff',
//     'text-gray': '#808080',
//     'text-blue': '#0000ff',
//     // Add more colors as needed
//   };

//   // Simplify the click handlers
//   const handleAlignmentClick = (alignment: 'left' | 'center' | 'right') => (e: React.MouseEvent) => {
//     e.stopPropagation(); // Just stop propagation
//     onBlockAlignmentChange(alignment);
//   };

//   const getDimensionPreview = () => {
//     const typography = selectedElement?.dataset.typography;
//     if (!typography) return 'auto';
    
//     const preset = typographyPresets.apple[typography as DimensionType];
//     return `${preset.fontSize} / ${preset.lineHeight}`;
//   };

//   if (!selectedElement) {
//     return (
//       <div className="w-72 bg-zinc-800 p-4 rounded-lg shadow-lg h-full overflow-y-auto ml-4">
//         <div className="text-zinc-400 text-center p-4">
//           Select an element to edit its properties
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="w-72 bg-zinc-800 p-4 rounded-lg shadow-lg h-full overflow-y-auto ml-4 editor-toolbar" 
//       style={{ zIndex: 1100 }}
//     >
//       {/* Typography System Selection - First control */}
//       <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
//         <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Typography System</div>
//         <Select 
//           value={selectedDimension}
//           onValueChange={(value: DimensionType) => onDimensionChange(value)}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Select size" />
//           </SelectTrigger>
//           <SelectContent>
//             {Object.keys(typographyPresets.apple).map((style) => (
//               <SelectItem key={style} value={style as DimensionType}>
//                 {style.charAt(0).toUpperCase() + style.slice(1)}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         {/* Dimension Preview */}
//         {selectedElement?.dataset.typography && (
//           <div className="mt-2 p-2 bg-zinc-800 rounded text-xs">
//             <div className="text-zinc-400">Current dimensions:</div>
//             <div className="text-white mt-1">
//               {getDimensionPreview()}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Typography System */}
//       <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
//         <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Typography System</div>
//         <Select 
//           onValueChange={(value: TypographyStyle) => onDimensionChange(value)}
//           value={selectedStyle}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Select style" />
//           </SelectTrigger>
//           <SelectContent>
//             {(Object.keys(typographyPresets.apple) as TypographyStyle[]).map((style) => (
//               <SelectItem key={style} value={style}>
//                 {style} ({typographyPresets.apple[style].fontSize})
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Font Controls */}
//       {selectedElement.hasAttribute('contenteditable') && (
//         <>
//           {/* Font Family */}
//           <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
//             <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Font Family</div>
//             <Select onValueChange={onFontFamilyChange} value={fontFamily}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select a font" />
//               </SelectTrigger>
//               <SelectContent>
//                 {fontFamilies.map((font) => (
//                   <SelectItem key={font} value={font}>{font.split(',')[0]}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Font Size */}
//           <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600 mb-4">
//             <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Font Size</div>
//             <Select onValueChange={onFontSizeChange} value={fontSize}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select font size" />
//               </SelectTrigger>
//               <SelectContent>
//                 {fontSizes.map((size) => (
//                   <SelectItem key={size} value={size}>{size}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* ... Continue with other controls ... */}
//           {/* Add all the other controls from the original toolbar */}
//         </>
//       )}

//       {/* Color Controls */}
//       <div className="p-3 bg-zinc-700 rounded-lg transition-all hover:bg-zinc-600">
//         <div className="text-xs text-zinc-400 uppercase mb-2 font-semibold">Text Color</div>
//         <div className="grid grid-cols-4 gap-2">
//           {Object.entries(colorOptions).map(([className, hex]) => (
//             <TooltipProvider key={className}>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <button
//                     onClick={() => onColorChange(hex)}
//                     className={cn(
//                       "w-8 h-8 rounded-full border border-zinc-600 hover:scale-110 transition-all duration-200 ease-in-out",
//                       color === hex && "ring-2 ring-white"
//                     )}
//                     style={{ backgroundColor: hex }}
//                   />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>{className.replace('text-', '').replace('-', ' ')}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }; 