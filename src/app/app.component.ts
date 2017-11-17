import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { HomeService } from "./shared/home.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import "rxjs/add/operator/toPromise";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})


export class AppComponent implements AfterViewInit{

  constructor(
    private _homeService: HomeService,
    private _formBuilder: FormBuilder
  ) {
    this._formGroup = this._formBuilder.group({
      // check form is not empty and min char 1
      choice: [
        null,
        Validators.required
      ]
    });
  }
  
  @ViewChild("myInput") _myInput: ElementRef;

  
  options: any;
  dateArray: any[] = [];
  _formGroup: FormGroup;
  // use message to communicate all sorts of error or status to the template
  infoMessage: string = "";
  // array of name and color of current stock for template display
  stockList: any[] = [];
  stockName: any;
  
  interval: any = setInterval(() => {
    this._homeService.emit("get-data", {});
  }, 3000);
  
  ngOnInit() {
 

    let seriesToDisplayArr: any = [];

    this._homeService.emit("get-data", {});
    this._homeService.on("get-data", data => {
      // update template view of stock list
      if (this.stockList.length === 0) {
        data.forEach(item => {
          this.stockList.push({ name: item.name, color: item.color });
        });
      } else if (this.stockList.length < data.length) {
        this.stockList = [];
        let elementToAdd = data.filter(item => {
          this.stockList.push({ name: item.name, color: item.color });
          return item.name;
        });
      } else {
        // za vsak true return filter vzame uni element ki je v iteraciji in ga baci v nov array
        let removeOne: string[] = this.stockList.filter((o1): any => {
          // pogoj da je uni element true, je da dobimo true ce so imena enaka v obeh arrajih
          return data.some((o2): any => {
            return o1.name === o2.name;
          });
        });
        this.stockList = removeOne;
      }

      // update charts itself
      if (seriesToDisplayArr.length !== data.length) {
        this.drawChart(data);
        seriesToDisplayArr = data;
      }
    });
  }
  ngAfterViewInit() {
    this._myInput.nativeElement.focus();
  }
  addNew(getStockName: any): void {
    console.log(this._formGroup);
    let colors = [
      "#058DC7",
      "#50B432",
      "#ED561B",
      "#24CBE5",
      "#64E572",
      "#FF9655",
      "#FFF263",
      "#6AF9C4"
    ];
    // convert search to uppercase
    getStockName.choice = getStockName.choice.toUpperCase();
    // clear user input from spaces 
    if(/\s/g.test(getStockName.choice)) {
      getStockName.choice = getStockName.choice.replace(/\s/g, "")
    }
    this.stockName = getStockName;
    let seriesObj: any = {
      name: "",
      color: ""
    };
    console.log(this._formGroup);


    let finalArray: any[] = [];

    // perform max quantity check
    if (this.stockList.length > 7) {
      this.infoMessage =
        "only 8 stocks allowed at a given time, please delete some";
    
      // check if client user input string is valid, rules checking is performed by form Validators module
    } 
    else if (this._formGroup.status === "INVALID") {
      this.infoMessage = "Cannot submit empty search"
    }
    else if (this._formGroup.status === "VALID") {
      // check if this stock is already displayed
      let ifStockAlrdyDisplayed = this.stockList.some((item): boolean => {
        return item.name === this.stockName.choice;
      });
      if (ifStockAlrdyDisplayed) {
        this.infoMessage = "Stock already displayed";
      } else {
        this._homeService.doHttpCall(getStockName.choice).subscribe(data => {
          console.log(data);
          // check if stock exists in the api call
          if (data["Error Message"]) {
            this.infoMessage = "Stock not found";
          } else {
            this.stockName = data["Meta Data"]["2. Symbol"];

            for (let key in data["Time Series (Daily)"]) {
              // convert recieved time data to UTC format millinseconds (since 1970), highcharts works best in this format
              this.dateArray.unshift([
                new Date(key).getTime(),
                parseFloat(data["Time Series (Daily)"][key]["1. open"])
              ]);
            }
            // push the array stock values into a final array
            finalArray.push(this.dateArray);
            // construct the object with name and stock values. It should pick from a static list and choose a color not yet assigned
            let assignColor = colors.filter((color): any => {
              return this.stockList.every((stockListColor): any => {
                return stockListColor.color !== color;
              });
            });
            seriesObj = {
              name: this.stockName,
              data: this.dateArray,
              color: assignColor[0]
            };
            this._homeService.emit("add-new", seriesObj);
            this.stockList.push(this.stockName);
            this.dateArray = [];
            this.infoMessage = "";
            this._homeService.emit("get-data", {});
            this._formGroup.reset("");
            this._myInput.nativeElement.focus();
          }
        });
      }
    }
  }
  deleteOne(innerHTML: string): void {
    this._homeService.emit("delete-one", innerHTML);
    this.stockList.splice(this.stockList.indexOf(innerHTML), 1);
    this._homeService.emit("get-data", {});
  }

  drawChart(series: any): any {
    this.options = {
      rangeSelector: {
        selected: 1,
        inputBoxStyle: {
          right: "80px"
        }
      },
      // here all magic happens
      series: series,
      credits: { enabled: false },
      lang: {
        noData: "No data, add a stock to display"
      }
    };
  }
}
