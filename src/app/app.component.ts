import { Component ,OnInit, Renderer2, ElementRef,ViewChild} from '@angular/core';
import { FormGroup,FormsModule,FormBuilder } from '@angular/forms';
import {Chatbox} from './chatbox';

//import { HttpParams, HttpClientModule } from '@angular/common/http';
import { HttpParams,HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ChatService } from './chatService';

// import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
declare var jquery:any;
declare var $:any;

console.log('in file');





@Component({
  selector: 'chatbot-comp',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
              "../../node_modules/font-awesome/css/font-awesome.css"
            ]
})
export class AppComponent implements OnInit {
  TextMsg:FormGroup;
  chatModal=new Chatbox("Say hi");
  sendButton:boolean;
  bottext:string;
  randomStuff:Array<string>=["Hello Nice to here you","Hey Whatsupp","How can I help you","I am your assitant","I am unable to get"];
  @ViewChild('chatlogs',{ read: ElementRef, static: false }) divMsgs: ElementRef;
  @ViewChild('chatlogs',{ read: ElementRef, static: false }) botMsgs: ElementRef;

  constructor(private chatService: ChatService, private formBuilder:FormBuilder,private renderer:Renderer2){
    this.sendButton=true
    console.log('in constructor');
    console.log(document.getElementById('chatbot'));
    console.log(document.getElementById('ChatBot'));
  }
  ngOnInit(){
    console.log('in init');
   
    document.getElementById("chatbot").addEventListener ("click", this.onChatIconClick, false);
    console.log(document.getElementById('chatbot'));
    console.log(document.getElementById('ChatBot'));
    // $("#close").hover(
    //   function () {
    //     $("#chatdone").show();
    //   }, 
    //   function () {
    //     $("#chatdone").hide();
    //   }
    // );
  }
  title = 'ChatBotApp';
  Empty(){
    if(this.chatModal.inputQuery!=null){
      this.sendButton=true  
    }
    if(this.chatModal.inputQuery==null){
      this.sendButton=false
    }
  }

  chatReply$;


 onChatIconClick(){
    console.log('chal gaya');
    $('#ChatBot').modal("show");
    }
  
  onSubmit(){
    console.log("inside js");
    this.sendButton=false
    if(this.chatModal.inputQuery==""){
      return false
    }else{
      console.log(this.chatModal.inputQuery)
      //User Msgs
      const divMain= this.renderer.createElement('div');
      const divSub= this.renderer.createElement('div');
      const text=this.renderer.createText(this.chatModal.inputQuery);
      this.renderer.appendChild(divSub,text);
      this.renderer.addClass(divSub,"UserMsg");  
      this.renderer.appendChild(divMain,divSub);
      this.renderer.addClass(divMain,"d-flex");
      this.renderer.addClass(divMain,"flex-row-reverse");
      this.renderer.appendChild(this.divMsgs.nativeElement,divMain);

      console.log('api call');
     
      this.chatService.fetchBotReply(this.chatModal.inputQuery).subscribe(res => {
        this.chatReply$ = JSON.parse(JSON.stringify(res));
        console.log(this.chatReply$);
        this.bottext = this.renderer.createText(this.chatReply$);
        const botMain= this.renderer.createElement('div');
        const botimg= this.renderer.createElement('div');
        // this.renderer.addClass(botimg,"botimg"); 
        const botSub= this.renderer.createElement('div');
        this.renderer.appendChild(botSub,botimg);
        this.renderer.appendChild(botSub,this.bottext);
        this.renderer.addClass(botSub,"botMsg");  
        this.renderer.appendChild(botMain,botSub);
        this.renderer.addClass(botMain,"d-flex");
        this.renderer.appendChild(this.divMsgs.nativeElement,botMain);

      var out = document.getElementById("chatlogs");
      var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
      console.log(isScrolledToBottom)
      if(!isScrolledToBottom)
          out.scrollTop = out.scrollHeight - out.clientHeight;
          this.chatModal.inputQuery=""
      });
      console.log('end of api call');
      // this.bottext = this.renderer.createText(this.chatReply$);
      // myData$ ;
      // this.myData$ = this.http.get('http://127.0.0.1:5000/getChatResponse', 
      //   {params: params,
      //   headers : reqHeaders
      //   }
      //   );
       // .subscribe(data => responseFromBackend = this.data);
        // console.log(this.myData$);
      // this.bottext = responseFromBackend;
      // this.bottext = this.renderer.createText(responseFromBackend);
      //Bot Msgs
      // let random=Math.floor(Math.random() * 5) + 0 
      // const botMain= this.renderer.createElement('div');
      // const botimg= this.renderer.createElement('div');
      // this.renderer.addClass(botimg,"botimg"); 
      // const botSub= this.renderer.createElement('div');
      // if(this.chatModal.inputQuery.toLowerCase().includes("your name")){
      //   this.bottext=this.renderer.createText("Call Me Edith");
      // }else if(this.chatModal.inputQuery.toLowerCase().includes("what you can do")){
      //   this.bottext=this.renderer.createText("I have access to all tony stark devices");
      // }else if(this.chatModal.inputQuery.toLowerCase().includes("great")){
      //   this.bottext=this.renderer.createText("I know I was made by tony stark:)");
      // }else{
      //   this.bottext=this.renderer.createText(this.randomStuff[random]);
      // }
       //Our input chat
      //   this.renderer.appendChild(botSub,botimg);
      //   this.renderer.appendChild(botSub,this.bottext);
      //   this.renderer.addClass(botSub,"botMsg");  
      //   this.renderer.appendChild(botMain,botSub);
      //   this.renderer.addClass(botMain,"d-flex");
      //   this.renderer.appendChild(this.divMsgs.nativeElement,botMain);

      // var out = document.getElementById("chatlogs");
      // var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
      // console.log(isScrolledToBottom)
      // if(!isScrolledToBottom)
      //     out.scrollTop = out.scrollHeight - out.clientHeight;

      // //Audio click
      // // let audio = new Audio();
      // // audio.src = "../../../assets/audio/tick.mp3";
      // // audio.load();
      // // audio.play();
      // this.chatModal.inputQuery="" //Reseting to empty for next query

    }
  }


}


