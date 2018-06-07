export class User 
{
    constructor(
        public userName: string,
        public userSurname: string,
        public userPhone: number,
        public userAdress: string,
        public userEmail: string,
        public userImg?: string,
        public id?: string) 
    {
    }
}