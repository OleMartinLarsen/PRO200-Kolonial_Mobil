export class Recipe 
{
    constructor(
        public recipeName :string,
        public recipeTime :string,
        public recipePortions :number,
        public recipeIngredients :string,
        public recipeInstructions :string,
        public id? :string) 
    {
    }
}