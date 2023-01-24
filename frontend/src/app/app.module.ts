import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { CashFlowComponent } from './pages/cash-flow/cash-flow.component';
import { LoginComponent } from './pages/login/login.component';
import { StoresComponent } from './pages/stores/stores.component';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { CampaignFormDialogComponent } from './components/campaign-form-dialog/campaign-form-dialog.component';

import { CpfFormatPipe } from './pipes/cpf-format/cpf-format.pipe';
import { PhoneFormatPipe } from './pipes/phone-format/phone-format.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ClientDialogComponent } from './components/client-dialog/client-dialog.component';
import { ProductFormDialogComponent } from './components/product-form-dialog/product-form-dialog.component';
import { DetailProductDialogComponent } from './components/detail-product-dialog/detail-product-dialog.component';
import { StoreFormDialogComponent } from './components/store-form-dialog/store-form-dialog.component';

import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { AgmCoreModule, AgmMap } from '@agm/core';
import { environment } from 'src/environments/environment';
import { DragndropComponent } from './components/dragndrop/dragndrop.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSelectModule} from '@angular/material/select';


registerLocaleData(ptBr);

const googleMapsParams = {
  libraries: ['places'],
  language: 'pt-br',
  // region: 'DE'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    OrdersComponent,
    ClientsComponent,
    CashFlowComponent,
    CpfFormatPipe,
    PhoneFormatPipe,
    FormDialogComponent,
    UpdateFormComponent,
    ProductDialogComponent,
    ClientDialogComponent,
    ProductFormDialogComponent,
    DetailProductDialogComponent,
    StoresComponent,
    CampaignComponent,
    CampaignFormDialogComponent,
    DragndropComponent,
    StoreFormDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatNativeDateModule,
    NgChartsModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnIfK7BtTm8MBkfrDMfbRuXI1zWGJoA6c',
      libraries: ["places", "geometry"]
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: NgChartsConfiguration, useValue: { generateColors: false } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
