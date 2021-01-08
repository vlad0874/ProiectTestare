import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService, private dataStorageService: DataStorageService,
              private recipesService: RecipeService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy(): void {
   this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(
      recipes => {
        this.recipesService.setRecipes(recipes);
        console.log(recipes);
      }
    );
  }

  useLanguage(language: string){
         this.translate.use(language);
  }

}
