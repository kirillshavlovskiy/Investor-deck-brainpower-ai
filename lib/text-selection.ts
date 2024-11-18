'use client'

export interface TextSelectionState {
  selectedElement: HTMLElement | null;
  elementInfo: ElementInfo | null;
}

export interface ElementInfo {
  type: string;
  class: string;
  width: string;
  height: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
  whiteSpace: string;
  wordSpacing?: string;
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

export const handleTextSelection = (
  element: HTMLElement,
  setSelectedElement: (el: HTMLElement | null) => void,
  setElementInfo: (info: ElementInfo | null) => void
) => {
  // Only handle initial selection, not cursor movement
  const computedStyle = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  
  setSelectedElement(element);
  
  setElementInfo({
    type: element.tagName.toLowerCase(),
    class: element.className,
    width: `${Math.round(rect.width)}px`,
    height: `${Math.round(rect.height)}px`,
    fontSize: computedStyle.fontSize,
    lineHeight: computedStyle.lineHeight,
    fontWeight: computedStyle.fontWeight,
    letterSpacing: computedStyle.letterSpacing,
    whiteSpace: computedStyle.whiteSpace,
    wordSpacing: computedStyle.wordSpacing,
    rect: rect,
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
    },
    indent: {
      top: computedStyle.marginTop,
      left: computedStyle.textIndent,
    },
  });
}; 