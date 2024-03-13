import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../recipe.model';
import { Category } from '../../../category.model';
import { CategoryService } from '../../../category.service';
import { RecipeService } from '../../../recipe.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-recipes',
  standalone: false,
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent implements OnInit {
    public recipeList: Recipe[] = [];
    public categoryList: Category[] = [];
    public filteredRecipeList: Recipe[] = [];
    public filterForm: FormGroup;
  
    constructor(
      private _recipeService: RecipeService,
      private _categoryService: CategoryService,
      private fb: FormBuilder
    ) {
      this.filterForm = this.fb.group({
        nameFilter: [''],
        categoryFilter: [''],
        preparationTimeFilter: ['']
      });
    }
  
    ngOnInit(): void {
      this._recipeService.getRecipeList().subscribe({
        next: (res) => {
          this.recipeList = res;
          this.filteredRecipeList = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
  
      this._categoryService.getCategoryList().subscribe({
        next: (res: Category[]) => {
          this.categoryList = res;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  
   
      this.filterForm.valueChanges.subscribe(() => {
        this.applyFilters();
      });
    }
  
  
    applyFilters() {
        const nameFilter = this.filterForm?.get('nameFilter')?.value;
        const categoryFilter = this.filterForm?.get('categoryFilter')?.value;
        const preparationTimeFilter = this.filterForm?.get('preparationTimeFilter')?.value;
        if (!nameFilter && !categoryFilter && !preparationTimeFilter) {
        
            this.filteredRecipeList = this.recipeList;
          }else{
            
         
  
      this.filteredRecipeList = this.recipeList.filter(recipe => {
        const nameMatch = recipe.recipeName.toLowerCase().includes(nameFilter.toLowerCase());
        const categoryMatch = categoryFilter === '' || this.categoryList.some(cat => cat.code === recipe.categoryCode);

        const preparationTimeMatch = preparationTimeFilter === '' || recipe.preparationTimeMinutes <= preparationTimeFilter;
  
        return nameMatch && categoryMatch && preparationTimeMatch;
      }); }
    }
  }