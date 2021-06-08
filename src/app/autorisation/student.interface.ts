export class student {
  constructor(
    public userLogin: string,
    public userPass: string,
  ) {}
}

export interface authStudent { // Не копия ли это нижнего интерфейса, но только для одного элемента.
  key: string | null,
  userLogin: string,
  userPass: string,
  userName: string,
  userLastName: string,
  userPhone: string;
  userAdress: string,
  userFlag: string,
}



export interface students {
  students: student[]
}


