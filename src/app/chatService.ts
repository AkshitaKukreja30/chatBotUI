import { Injectable } from '@angular/core';
import { HttpParams,HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ChatService{

constructor(private http:HttpClient){}

fetchBotReply(inputQuery): Observable<Object>{
	// console.log("in service");
	let params = new HttpParams();
    let reqHeaders = new HttpHeaders();
	reqHeaders = reqHeaders.append('Content-Type','text/HTML');
    params = params.append('input', inputQuery);
    // console.log(inputQuery);

    //  this.http.get('http://127.0.0.1:5000/getChatResponse',
    //  {params: params,headers : reqHeaders,responseType: 'text'}).
    // 	subscribe(res => {console.log(JSON.parse(JSON.stringify(res)))});
    return this.http.get('http://127.0.0.1:5000/getChatResponse',
     {params: params,headers : reqHeaders,responseType: 'text'});
    // .subscribe(res => { res = JSON.parse(JSON.stringify(res))});
}

}