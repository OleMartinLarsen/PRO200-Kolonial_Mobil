export class Ware 
{
    constructor(
        public wareName: string,
        public warePrice: number,
        public wareType: string,
        public wareImg?: string, 
        public id?: string) 
    {
    }
}