import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
 private apiEndpoit = 'https://recipes-book-9e7c5.firebaseio.com/recipes.json';

 constructor(private http: HttpClient, private recipeServices: RecipeService) {}

 storeRecipes() {
  const recipes = this.recipeServices.getRecipes();
  this.http.put(this.apiEndpoit, recipes).subscribe(response => {
    console.log(response);
  });
 }

//  fetchRecipes() {
//    return this.authService.user.pipe(take(1), exhaustMap(user => {
//     return this.http.get<Recipe[]>(this.apiEndpoit,
//       {
//         params: new HttpParams().set('auth', user.token)
//       });
//    }),
//    map(recipes => {
//     return recipes.map(recipe => {
//       return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
//     });
//   }),
//    tap(recipes => {
//      this.recipeServices.setRecipes(recipes);
//    }));
//  }

fetchRecipes() {
  return this.http.get<Recipe[]>(this.apiEndpoit);
 }
}