import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../recipe.model';
import { Category } from '../../../category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../category.service';
import { RecipeService } from '../../../recipe.service';

@Component({
  selector: 'app-recipe-details',
  standalone: false,
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {


  recipe: Recipe = new Recipe();
  currentUser: any;
  isOwner: boolean = false;
  caregoryList: Category[] =[];
 

  constructor(private route: ActivatedRoute,private _categoryService: CategoryService , private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.getRecipeDetails(id);
    this.currentUser = sessionStorage.getItem('currentUser') ;

    this._categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.caregoryList = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getRecipeDetails(id: number) {
    this.recipeService.getRecipetById(id).subscribe(
      (data: Recipe) => {
        this.recipe = data;
        this.isOwner = (this.currentUser && this.currentUser.id === this.recipe.userCode);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getCategoryName(){
    
    return this.caregoryList.find(category => category.code === this.recipe.categoryCode)?.name ;

  }
  getCategoryIcon(){
    
    return this.caregoryList.find(category => category.code === this.recipe.categoryCode)?.iconRouting ;
 }
 

 edit() {
  this.router.navigate(['recipe/edit-recipe',this.recipe.recipeCode]);
}

 isCurrentUserRecipeCreator(): boolean {
  
  if (!this.currentUser) {
    return false;
  }
  const parsedCurrentUser = JSON.parse(this.currentUser);
  return parsedCurrentUser.code == this.recipe.userCode;
}
deleteRecipe(): void {
  this.recipeService.deleteRecipe(this.recipe.recipeCode).subscribe(
    () => {
      this.router.navigate(['recipe/all-recipe']);
    },
    (error: any) => {
      console.log(error);
    }
  );
}
}


