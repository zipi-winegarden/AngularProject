import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeconvertPipe } from '../timeconvert.pipe';
import { recipeRoutingModule } from './recipe-routing.module';
import { AddRecipeComponent } from './component/add-recipe/add-recipe.component';
import { AllRecipesComponent } from './component/all-recipes/all-recipes.component';
import { EditRecipeComponent } from './component/edit-recipe/edit-recipe.component';
import { RecipeDetailsComponent } from './component/recipe-details/recipe-details.component';
import { SmallRecipeComponent } from './component/small-recipe/small-recipe.component';



@NgModule({
  declarations: [AddRecipeComponent,AllRecipesComponent,EditRecipeComponent,RecipeDetailsComponent,SmallRecipeComponent],
  imports: [
    CommonModule,ReactiveFormsModule,TimeconvertPipe,recipeRoutingModule, FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipeModule { }
