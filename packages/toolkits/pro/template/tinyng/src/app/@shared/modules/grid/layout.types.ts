export type TProBaseJustify = 'start' | 'end' | 'center' | 'around' | 'between';
export type TProBaseAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type TProBaseAlignSelf = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type TProBaseBreakpoint = 'ss' | 'ms' | 'mm' | 'ml' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const TProBaseBreakpoints: TProBaseBreakpoint[] = ['ss', 'ms', 'mm', 'ml', 'xs', 'sm', 'md', 'lg', 'xl'];
export const TProBaseBreakpointsMap = {
  ss: 0,
  ms: 360,
  mm: 768,
  ml: 1024,
  xs: 1280,
  sm: 1440,
  md: 1600,
  lg: 1760,
  xl: 1920,
};

export type TProBaseResponseParameter<T> = T | {
  ss?: T;
  ms?: T;
  mm?: T;
  ml?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};
