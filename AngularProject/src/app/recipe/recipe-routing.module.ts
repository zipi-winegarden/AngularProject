import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddRecipeComponent } from './component/add-recipe/add-recipe.component';
import { AllRecipesComponent } from './component/all-recipes/all-recipes.component';
import { EditRecipeComponent } from './component/edit-recipe/edit-recipe.component';
import { RecipeDetailsComponent } from './component/recipe-details/recipe-details.component';
import { recipeGuard } from './recipe.guard';



const authenticationRoutes: Routes = [
    { path: '', redirectTo: 'all-recipe', pathMatch: 'full' },
    { path: 'all-recipe', component: AllRecipesComponent },
    { path: 'add-recipe', component: AddRecipeComponent },
    { path: 'edit-recipe/:id', component: EditRecipeComponent },
    { path: 'recipe-details/:id', component: RecipeDetailsComponent, canActivate: [recipeGuard] }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(authenticationRoutes)
    ],
    exports: [RouterModule]
})
export class recipeRoutingModule { }
