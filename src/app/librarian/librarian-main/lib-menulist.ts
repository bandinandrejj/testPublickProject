export interface menuList { // Не копия ли это нижнего интерфейса, но только для одного элемента.
  route: string,
  img: string,
  title: string,
  logout?: boolean,
}



export const menuList = [
  {route: 'dashboard', img: 'dash', title: 'Важная информация'},
  {route: 'borrowbook', img: 'borrowbook', title: 'Книги в обороте'},
  {route: 'books', img: 'res', title: 'Архив книг'},
  {route: 'students', img: 'friends', title: 'Читатели'},
  {route: 'settings', img: 'settings', title: 'Выход', logout: true},
]

