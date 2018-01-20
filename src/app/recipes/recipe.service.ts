import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core'

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>()

  private recipes: Recipe[] = [
      new Recipe('A Test Recipe1', 'This is simply a test1', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
      new Recipe('A Test Recipe2', 'This is simply a test2', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
    ];

  constructor() {

  }

  getRecipes() {
    return this.recipes.slice();
  }
}
