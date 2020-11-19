import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ChatService } from './chatService';
import { createCustomElement } from "@angular/elements";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ChatService],
  bootstrap: [],
  entryComponents:[AppComponent]
})
export class AppModule {

constructor(private injector: Injector) {
  console.log('abc');
}

  ngDoBootstrap() {
    console.log('in do bootstrap');
    const el = createCustomElement(AppComponent, { injector: this.injector });
    if (!customElements.get('chatbot-comp')) {  
    customElements.define('chatbot-comp', el);
    console.log(el);
    }
   }



 }