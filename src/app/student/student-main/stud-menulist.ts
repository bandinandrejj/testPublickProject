export interface menuList { // Не копия ли это нижнего интерфейса, но только для одного элемента.
  route: string,
  img: string,
  title: string,
  logout?: boolean,
}



export const menuList = [
  {route: 'dashboard', img: 'dash', title: 'Мои книги'},
  {route: 'books', img: 'res', title: 'Библиотека'},
  {route: 'settings', img: 'settings', title: 'Выход', logout: true},
]

