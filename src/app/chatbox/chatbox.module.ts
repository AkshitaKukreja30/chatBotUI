import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Chatbox {
    constructor(
        public inputQuery:string
    ){

    }
        
}
