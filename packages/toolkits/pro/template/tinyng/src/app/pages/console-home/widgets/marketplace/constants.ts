import { ImgAddrPrefix } from '@shared/tiny-pro';
export const MarketplaceUrl = 'https://marketplace.huaweicloud.com/';
const MarketI18nPrefix = 'consoleHome.marketplace.';

export enum CateMenu {
  BASIC_SOFTWARE = 'basicSoftware',
  WEBSITE = 'networkConstruction',
  BUSINESS_SOFTWARE = 'enterpriseApplication',
  SECURITY = 'security',
  INTERNET = 'internetThings',
  AI = 'artificialIntelligence',
  PROFESSIONAL_SERVICES = 'services',
  SOLUTION = 'industrySolutions',
}

export const MarketplaceMenus = [
  {
    name: `${MarketI18nPrefix}purchasedItems`,
  },
  {
    name: `${MarketI18nPrefix}orderList`,
  },
  {
    name: `${MarketI18nPrefix}billableAmount`,
  },
  {
    name: `${MarketI18nPrefix}discountToBeUsed`,
  },
];

export const CateContent = [
  {
    id: CateMenu.BASIC_SOFTWARE,
    title: MarketI18nPrefix + CateMenu.BASIC_SOFTWARE,
    content: `${MarketI18nPrefix}basicSoftwareContent`,
    url: `${MarketplaceUrl}search/basicSoftware/`,
  },
  {
    id: CateMenu.WEBSITE,
    title: MarketI18nPrefix + CateMenu.WEBSITE,
    content: `${MarketI18nPrefix}networkConstructionContent`,
    url: `${MarketplaceUrl}search/website/`,
  },
  {
    id: CateMenu.BUSINESS_SOFTWARE,
    title: MarketI18nPrefix + CateMenu.BUSINESS_SOFTWARE,
    content: `${MarketI18nPrefix}enterpriseApplicationContent`,
    url: `${MarketplaceUrl}search/businessSoftware/`,
  },
  {
    id: CateMenu.SECURITY,
    title: MarketI18nPrefix + CateMenu.SECURITY,
    content: `${MarketI18nPrefix}securityContent`,
    url: `${MarketplaceUrl}search/security/`,
  },
  {
    id: CateMenu.INTERNET,
    title: MarketI18nPrefix + CateMenu.INTERNET,
    content: `${MarketI18nPrefix}internetThingsContent`,
    url: `${MarketplaceUrl}search/internet/`,
  },
  {
    id: CateMenu.AI,
    title: MarketI18nPrefix + CateMenu.AI,
    content: `${MarketI18nPrefix}artificialIntelligenceContent`,
    url: `${MarketplaceUrl}search/ai/`,
  },
  {
    id: CateMenu.PROFESSIONAL_SERVICES,
    title: MarketI18nPrefix + CateMenu.PROFESSIONAL_SERVICES,
    content: `${MarketI18nPrefix}servicesContent`,
    url: `${MarketplaceUrl}search/professionalServices/`,
  },
  {
    id: CateMenu.SOLUTION,
    title: MarketI18nPrefix + CateMenu.SOLUTION,
    content: `${MarketI18nPrefix}industrySolutionsContent`,
    url: `${MarketplaceUrl}search/solution/`,
  },
];

export const MarketContent = [
  {
    title: `${MarketI18nPrefix}cloudMail`,
    content: `${MarketI18nPrefix}cloudMailContent`,
    url: `${MarketplaceUrl}activity/mail`,
    imgWidth: 41,
    imgHeight: 43,
    imgX: -3,
    imgY: 0,
    imgUrl: `${ImgAddrPrefix}/speed-mail.png`,
  },
  {
    title: `${MarketI18nPrefix}cloudDisk`,
    content: `${MarketI18nPrefix}cloudDiskContent`,
    url: `${MarketplaceUrl}activity/cloudbox/`,
    imgWidth: 53,
    imgHeight: 54,
    imgX: -13,
    imgY: -7,
    imgUrl: `${ImgAddrPrefix}/speed-disk.png`,
  },
  {
    title: `${MarketI18nPrefix}cloudDeployment`,
    content: `${MarketI18nPrefix}cloudDeploymentContent`,
    url: `${MarketplaceUrl}activity/customedsite/index.html`,
    imgWidth: 35,
    imgHeight: 43,
    imgX: 0,
    imgY: -6,
    imgUrl: `${ImgAddrPrefix}/speed-station.png`,
  },
  {
    title: `${MarketI18nPrefix}trademarkRegistration`,
    content: `${MarketI18nPrefix}trademarkRegistrationContent`,
    url: `https://www.huaweicloud.com/product/trademark.html`,
    imgWidth: 40,
    imgHeight: 45,
    imgX: -2,
    imgY: -6,
    imgUrl: `${ImgAddrPrefix}/trademark-registration.png`,
  },
];
