import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import * as io from "socket.io-client";
import "rxjs/add/operator/map";


@Injectable()
export class HomeService {
  socket: SocketIOClient.Socket;


  constructor(private _http:Http) {
    // prepare property socket by instanciating to Socket and then connect to the listenning socket server
    this.socket = io.connect("http://127.0.0.1:3000");
   }


  doHttpCall(stockName:string):any {
    return this._http.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stockName + "&outputsize=compact&apikey=TZZBXM9EWZQP82P3")
          .map((data:Response)=> {
     return data.json();
    })
  }

  on(eventName:string, callback:any) {
    if(this.socket) {
      this.socket.on(eventName, (data:any)=> {
        callback(data);
      });
    }
  }
  emit(eventName:string, data:any) {
    this.socket.emit(eventName, data);
  }
  
}
