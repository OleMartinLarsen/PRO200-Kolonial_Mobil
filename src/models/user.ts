export class User 
{
    constructor(
        public userPhone: number,
        public userAdress: string,
        public userEmail: string,
        public userName?: string,
        public userSurname?: string,
        public id?: string) 
    {
    }
}