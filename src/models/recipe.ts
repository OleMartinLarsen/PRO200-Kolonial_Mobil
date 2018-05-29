export class Recipe 
{
    constructor(
        public recipeName: string,
        public recipeGrade: string,
        public recipeTimeInMinutes: number,
        public recipePortions: number,
        public recipeIngredients: any,
        public recipeInstructions: string,
        public recipeImg?: string, 
        public id?: string) 
    {
    }
}