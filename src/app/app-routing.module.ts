import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConsentAndDemographicComponent } from './consent-and-demographic/consent-and-demographic.component';
import { PostSurveyComponent } from './post-survey/post-survey.component';
import { NicheAndPrivacyPoliciesComponent } from './niche-and-privacy-policies/niche-and-privacy-policies.component';

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
    path: 'consent-and-demographic', 
    component : ConsentAndDemographicComponent, 
    data: { 
      metaDescription: "",
      title: "Step 1"
    }
  },
  { 
    path: 'niche-and-privacy-policies', 
    component : NicheAndPrivacyPoliciesComponent, 
    data: { 
      metaDescription: "",
      title: "Step 2"
    }
  },
  { 
    path: 'post-survey', 
    component : PostSurveyComponent, 
    data: { 
      metaDescription: "",
      title: "Step 3"
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
  HomeComponent,
  ConsentAndDemographicComponent,
  PostSurveyComponent,
  NicheAndPrivacyPoliciesComponent,
];