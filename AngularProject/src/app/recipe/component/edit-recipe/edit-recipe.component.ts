import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Recipe } from '../../../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../recipe.service';

@Component({
  selector: 'app-edit-recipe',
  standalone: false,

  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {


  recipeForm: FormGroup;
  recipe: Recipe = new Recipe();
  categoryList: any[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder
  ) {
    this.recipeForm = this.formBuilder.group({
      recipeCode: [''],
      recipeName: [''],
      categoryCode: [''],
      preparationTimeMinutes: [''],
      difficultyLevel: [''],
      dateAdded: [''],
      ingredients: this.formBuilder.array([this.formBuilder.control('')]),
      preparationMethod: this.formBuilder.array([this.formBuilder.control('')]),
      userCode: [''],
      imageRouting: ['']
    });
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.getRecipeDetails(id);
  }

  getRecipeDetails(id: number) {
    this.recipeService.getRecipetById(id).subscribe(
      (data: Recipe) => {
        this.recipe = data;
        this.populateForm();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  populateForm() {
    this.recipeForm.patchValue({
      recipeCode: this.recipe.recipeCode,
      recipeName: this.recipe.recipeName,
      categoryCode: this.recipe.categoryCode,
      preparationTimeMinutes: this.recipe.preparationTimeMinutes,
      difficultyLevel: this.recipe.difficultyLevel,
      dateAdded: this.recipe.dateAdded,
      userCode: this.recipe.userCode,
      imageRouting: this.recipe.imageRouting
    });

    this.setIngredients();
    this.setPreparationMethod();
  }
  
  get ingredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get preparationMethodArray() {
    return this.recipeForm.get('preparationMethod') as FormArray;
  }


  setIngredients() {
    const control = this.recipeForm.get('ingredients') as FormArray;
    control.clear();
    this.recipe.ingredients.forEach(ingredient => {
      control.push(this.formBuilder.control(ingredient));
    });
  }

  setPreparationMethod() {
    const control = this.recipeForm.get('preparationMethod') as FormArray;
    control.clear();
    this.recipe.preparationMethod.forEach(step => {
      control.push(this.formBuilder.control(step));
    });
  }

  addIngredient() {
    const control = this.recipeForm.get('ingredients') as FormArray;
    control.push(this.formBuilder.control(''));
  }

  removeEmptyIngredients() {
    const control = this.recipeForm.get('ingredients') as FormArray;
    for (let i = control.length - 1; i >= 0; i--) {
      if (control.at(i).value === '') {
        control.removeAt(i);
      }
    }
  }

  addPreparationStep() {
    const control = this.recipeForm.get('preparationMethod') as FormArray;
    control.push(this.formBuilder.control(''));
  }

  removeEmptyPreparationSteps() {
    const control = this.recipeForm.get('preparationMethod') as FormArray;
    for (let i = control.length - 1; i >= 0; i--) {
      if (control.at(i).value === '') {
        control.removeAt(i);
      }
    }
  }

  saveRecipe() {
    if (this.recipeForm.valid) {
      const updatedRecipe: Recipe = this.recipeForm.value;
      this.recipeService.updateRecipe(updatedRecipe.recipeCode, updatedRecipe).subscribe(
        () => {
          this.router.navigate(['recipe/recipe-details', updatedRecipe.recipeCode]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  cancelEdit() {
    this.router.navigate(['recipe/recipe-details', this.recipe.recipeCode]);
  }

}