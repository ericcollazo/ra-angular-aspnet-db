import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HttpClientXsrfModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductService } from './services/product.service';
import { ConfigService } from './services/config.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { Observable } from 'rxjs/Observable';
import { ConfigSettings } from './model/ConfigSettings';
import { InjectionToken } from '@angular/core/src/di/injection_token';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    ProductDetailComponent,
    SidebarComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule
  ],
  providers: [ProductService, ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => function() {return configService.load()},
      deps: [ConfigService],
      multi: true
    }],
  bootstrap: [AppComponent]
})

export class AppModule { 
}
