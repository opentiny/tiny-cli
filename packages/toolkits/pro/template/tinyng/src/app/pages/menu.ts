export default function (values: any) {
  return [
    {
      title: values['consoleHome'],
      router: ['./console-home'],
      menuIcon: 'home-outline',
    },
    {
      title: values['serviceOverview'],
      router: ['./service-overview'],
      menuIcon: 'laptop-outline',
    },
    {
      title: values['servicePurchase'],
      router: ['./service-purchase'],
      menuIcon: 'gift-outline',
    },
    {
      title: values['result']['title'],
      children: [
        {
          title: values['result']['success'],
          router: ['./result/success'],
        },
        {
          title: values['result']['failure'],
          router: ['./result/failure'],
        },
      ],
      menuIcon: 'bag-check-outline',
    },
    {
      title: values['nonSupportRegion'],
      router: ['./non-support-region'],
      menuIcon: 'information-circle-outline',
    },
    {
      title: values['serviceList']['title'],
      children: [
        {
          title: values['serviceList']['buckets'],
          router: ['./service-list/buckets'],
        },
        {
          title: values['serviceList']['contracts'],
          router: ['./service-list/contracts'],
        },
      ],
      menuIcon: 'cloud-outline',
    },
  ];
}
