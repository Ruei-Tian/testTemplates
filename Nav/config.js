const config = {
  id: 'kad-nav',
  info: {
    name: '導覽列',
    type: 'section'
  },
  template: {
    component: 'kad-nav',
    props: {
      h1: '',
      bgColor: '#ffffff',
      textColor: '#000000',
      logo: '',
      menu: [
        {
          title: '單元一',
          caption: '小標題',
          to: '#id1'
        }
      ]
    }
  }
}

export default config
