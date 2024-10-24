const MENU_ITEMS = [
  {
    key: 'dashboard',
    path: '/dashboard',
    name: 'Dashboard'
  },
  {
    key: 'register-group',
    name: 'Cadastro (API)',
    children: [
      {
        key: 'rural-producers',
        path: '/rural-producers',
        name: 'Produtores Rurais'
      },
      {
        key: 'crops',
        path: '/crops',
        name: 'Culturas'
      }
    ]
  }
]

export default MENU_ITEMS
