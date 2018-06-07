export class User 
{
    constructor(
        public userName: string,
        public userSurname: string,
        public userPhone: number,
        public userEmail: string,
        public userAdress: string,
        public userImg?: string,
        public id?: string) 
    {
    }
}