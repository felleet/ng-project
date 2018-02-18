import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService){}

  storeRecipes(){
    let token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-8.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes());
  }

  getRecipes() {
    let token = this.authService.getToken();
    this.http.get('https://ng-recipe-book-8.firebaseio.com/recipes.json?auth=' + token)
      .subscribe(
        (response: Response) => {
          let recipes: Recipe[] = response.json();
          this.recipeService.setRecipes(recipes)
        }
      );
  }


}

