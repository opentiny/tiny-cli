import { TProLayoutConfig } from './layout.type';

export const DEFAULT_LAYOUT_CONFIG: TProLayoutConfig = {
  id: 'leftRight',
  mode: 'sidebarTop',
  header: {
    fixed: true,
    firHeader: {
      height: 0,
    },
    secHeader: {
      hidden: true,
    },
    hidden: false,
  },
  sidebar: {
    fixed: true,
    firSidebar: {
      width: 250,
    },
    secSidebar: {
      hidden: true,
    },
    hidden: false,
  },
  footer: {
    hidden: false,
  },
  hideLogo: false,
};
