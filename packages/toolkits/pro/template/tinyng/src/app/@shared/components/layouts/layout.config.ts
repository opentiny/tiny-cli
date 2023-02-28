import { TProLayoutConfig } from './layout.type';

export const WATERFALL_LAYOUT_CONFIG: TProLayoutConfig = {
  id: 'waterfall',
  header: {
    hidden: true,
  },
  sidebar: {
    fixed: true,
    firSidebar: {
      width: 60,
    },
    secSidebar: {
      width: 232,
    },
  },
  footer: {
    hidden: false,
  },
};

export const WIDE_LAYOUT_CONFIG: TProLayoutConfig = {
  id: 'wide',
  header: {
    fixed: true,
    firHeader: {
      height: 40,
    },
    secHeader: {
      height: 40,
    },
  },
  sidebar: {
    hidden: true,
  },
  footer: {
    hidden: false,
  },
};

export const COMMON_LAYOUT_CONFIG: TProLayoutConfig = {
  id: 'common',
  header: {
    fixed: true,
    firHeader: {
      hidden: true,
    },
    secHeader: {
      height: 40,
    },
  },
  sidebar: {
    fixed: true,
    firSidebar: {
      width: 60,
    },
    secSidebar: {
      hidden: true,
    },
  },
  footer: {
    hidden: false,
  },
};

export const TOP_NAV_LAYOUT_CONFIG: TProLayoutConfig = {
  id: 'topNav',
  mode: 'headerTop',
  header: {
    fixed: true,
    firHeader: {
      height: 60,
    },
    secHeader: {
      hidden: true,
    },
  },
  sidebar: {
    hidden: true,
  },
  footer: {
    hidden: false,
  },
};

export const SIDEBAR_LAYOUT_CONFIG: TProLayoutConfig = {
  id: 'sidebar',
  mode: 'headerTop',
  header: {
    fixed: true,
    firHeader: {
      height: 60,
    },
    secHeader: {
      hidden: true,
    },
  },
  sidebar: {
    fixed: true,
    firSidebar: {
      width: 250,
    },
    secSidebar: {
      hidden: true,
    },
  },
  footer: {
    hidden: false,
  },
};

export const LEFT_RIGHT_LAYOUT_CONFIG: TProLayoutConfig = {
  id: 'leftRight',
  mode: 'sidebarTop',
  header: {
    fixed: true,
    firHeader: {
      height: 60,
    },
    secHeader: {
      hidden: true,
    },
  },
  sidebar: {
    fixed: true,
    firSidebar: {
      width: 250,
    },
    secSidebar: {
      hidden: true,
    },
  },
  footer: {
    hidden: false,
  },
};
