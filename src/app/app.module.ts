import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { McInputModule, McFormFieldModule, McCardModule, McButtonModule } from '@ptsecurity/mosaic';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    McInputModule,
    McFormFieldModule,
    FormsModule,
    McCardModule,
    McButtonModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
