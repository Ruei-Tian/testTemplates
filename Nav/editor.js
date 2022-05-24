const editor = [
  {
    name: 'kad-nav',
    editors: [
      {
        component: 'kad-text-editor',
        data: {
          validateType: 'string',
          title: 'h1',
          syncPath: 'props.h1'
        }
      }, {
        component: 'kad-file-editor',
        data: {
          validateType: 'string',
          title: 'logo',
          syncPath: 'props.logo'
        }
      },
      {
        component: 'kad-color-editor',
        data: {
          validateType: 'string',
          title: '背景顏色',
          syncPath: 'props.bgColor'
        }
      },
      {
        component: 'kad-color-editor',
        data: {
          validateType: 'string',
          title: '文字顏色',
          syncPath: 'props.textColor'
        }
      },
      {
        component: 'kad-nested-editor',
        data: {
          validateType: 'array',
          title: '導覽選單',
          syncPath: 'props.menu',
          innerEditor: 'kad-nav-menu',
          innerEditorTitle: '選單'
        }
      }
    ]
  },
  {
    name: 'kad-nav-menu',
    editors: [
      {
        component: 'kad-text-editor',
        data: {
          validateType: 'string',
          title: '大標題',
          syncPath: 'title'
        }
      },
      {
        component: 'kad-text-editor',
        data: {
          validateType: 'string',
          title: '小標題',
          syncPath: 'caption'
        }
      },
      {
        component: 'kad-text-editor',
        data: {
          validateType: 'string',
          title: '連結/滾動位置',
          syncPath: 'to',
          placeholder: '#id or https://...'
        }
      }
    ]
  }
]

export default editor
