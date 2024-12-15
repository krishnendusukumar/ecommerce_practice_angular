import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CartComponent } from './components/cart/cart.component';
import { FormComponent } from './components/form/form.component';
import { AuthComponent } from './page/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './page/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard'; // Import the AuthGuard


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CartComponent,
    FormComponent,
    AuthComponent,
    ProfileComponent,
    ProductPageComponent,
    CheckoutComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({ uri: 'https://api.escuelajs.co/graphql' }),
        };
      },
      deps: [HttpLink],
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
