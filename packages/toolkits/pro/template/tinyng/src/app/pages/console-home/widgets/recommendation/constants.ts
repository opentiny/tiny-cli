import { ImgAddrPrefix } from '@shared/tiny-pro';
export const RecommendUrl = 'https://marketplace.huaweicloud.com/';
const RecommendI18nPrefix = 'consoleHome.recommendation.';

export const recommendObj = [
  {
    title: `${RecommendI18nPrefix}cloudMail`,
    content: `${RecommendI18nPrefix}cloudMailContent`,
    url: `${RecommendUrl}activity/mail`,
    imgWidth: 41,
    imgHeight: 43,
    imgX: -3,
    imgY: 0,
    imgUrl: `${ImgAddrPrefix}/speed-mail.png`,
  },
  {
    title: `${RecommendI18nPrefix}cloudDisk`,
    content: `${RecommendI18nPrefix}cloudDiskContent`,
    url: `${RecommendUrl}activity/cloudbox/`,
    imgWidth: 53,
    imgHeight: 54,
    imgX: -13,
    imgY: -7,
    imgUrl: `${ImgAddrPrefix}/speed-disk.png`,
  },
  {
    title: `${RecommendI18nPrefix}cloudDeployment`,
    content: `${RecommendI18nPrefix}cloudDeploymentContent`,
    url: `${RecommendUrl}activity/customedsite/index.html`,
    imgWidth: 35,
    imgHeight: 43,
    imgX: 0,
    imgY: -6,
    imgUrl: `${ImgAddrPrefix}/speed-station.png`,
  },
  {
    title: `${RecommendI18nPrefix}trademarkRegistration`,
    content: `${RecommendI18nPrefix}trademarkRegistrationContent`,
    url: `https://www.huaweicloud.com/product/trademark.html`,
    imgWidth: 40,
    imgHeight: 45,
    imgX: -2,
    imgY: -6,
    imgUrl: `${ImgAddrPrefix}/trademark-registration.png`,
  },
];
