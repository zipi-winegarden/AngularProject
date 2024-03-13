import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Recipe } from '../../../recipe.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../category.model';
import { RecipeService } from '../../../recipe.service';
import { CategoryService } from '../../../category.service';
import { Router } from '@angular/router';
import { lettersOnlyValidator } from '../../../lettersOnly';
import { difficultyLevelRangeValidator } from '../../../difficultyLevel';

@Component({
  selector: 'app-add-recipe',
  standalone: false,
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
  public recipeForm!: FormGroup;
  public categoryList: Category[] = [];

 
  constructor(private _recipeService:RecipeService ,private _categoryService: CategoryService,private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
   
    this._categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.categoryList = res
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.recipeForm = new FormGroup({
      "recipeCode": new FormControl("", [Validators.required]),
      "recipeName": new FormControl("", [Validators.required, lettersOnlyValidator]), // תיקון כאן
      "categoryCode": new FormControl("", [Validators.required]),
      "preparationTimeMinutes": new FormControl("", [Validators.required]),
      "difficultyLevel": new FormControl("1", [Validators.required,difficultyLevelRangeValidator]),
      "dateAdded": new FormControl(new Date().getDate(), [Validators.required]),
      ingredients: this.fb.array([this.fb.control('')]),
      preparationMethod: this.fb.array([this.fb.control('')]),
      "userCode": new FormControl("", [Validators.required]),
      "imageRouting": new FormControl( '..//../../../assets/images/macarons-2548818_1280.jpg', [Validators.required]),
  })
  }

  get ingredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get preparationMethodArray() {
    return this.recipeForm.get('preparationMethod') as FormArray;
  }

  
addIngredient() {
  const lastControl = this.ingredientsArray.at(this.ingredientsArray.length - 1);
  if (lastControl.value.trim() !== '') {
    this.ingredientsArray.push(this.fb.control(''));
  }
}

addPreparationStep() {
  const lastControl = this.preparationMethodArray.at(this.preparationMethodArray.length - 1);
  if (lastControl.value.trim() !== '') {
    this.preparationMethodArray.push(this.fb.control(''));
  }
}

removeEmptyIngredients() {
  for (let i = this.ingredientsArray.length - 1; i >= 0; i--) {
    if (this.ingredientsArray.at(i).value.trim() === '') {
      this.ingredientsArray.removeAt(i);
    }
  }
}

removeEmptyPreparationSteps() {
  for (let i = this.preparationMethodArray.length - 1; i >= 0; i--) {
    if (this.preparationMethodArray.at(i).value.trim() === '') {
      this.preparationMethodArray.removeAt(i);
    }
  }
}

saveRecipe() {
  
  let recipe: Recipe = this.recipeForm.value;
  this._recipeService.addRecipe(recipe).subscribe({
    next: (response) => {
      Swal.fire({
        title: "Thank you!",
        text: "The recipe was successfully added!",
        icon: "success"
      });
      this.router.navigate(["recipe/all-recipe"])
    },
    error: (error: any) => {
      console.error("Error adding user:", error);
    }
  });

  
}

}


