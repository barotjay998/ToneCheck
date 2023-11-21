import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo : '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    component : HomeComponent, 
    data: { 
      metaDescription: "",
      title: "Home"
    }
  },
  { 
    path: '**', 
    component: PageNotFoundComponent,
    data: {
      metaDescription: "The page you are looking for could not be found. Please try searching for it or returning to the homepage.",
      title: "Page Not Found"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent
];