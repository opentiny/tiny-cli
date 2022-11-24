export default function(values: any) {
  return [
    {
      title: values['consoleHome'],
      router: ['./console-home'],
      menuIcon: 'calendar'
    },
    {
      title: 'Hello World',
      router: ['./hello-world'],
      menuIcon: 'discount-sup'
    },
    {
      title: values['contracts'],
      router: ['./contracts'],
      menuIcon: 'document'
    }
  ];
}
