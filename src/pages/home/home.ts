import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Chart} from 'chart.js';
import {HttpDataProvider} from '../../providers/http-data/http-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('lineCanvasTemperature') lineCanvasTemperature;
  @ViewChild('lineCanvasHumidity') lineCanvasHumidity;
  lineChartTemperature: any;
  lineChartHumidity: any;
  labelsDate: Array<String>;
  dataTemperature: Array<number>;
  dataHumidity: Array<number>;
  currentTemperature:number;
  currentHumidity:number;

  constructor(public navCtrl: NavController, public dataProvider: HttpDataProvider) {
    this.getData();
  }

  ionViewDidLoad() {
    this.drawChart();


  }

  getData() {

    let dataObserver = this.dataProvider.getData();

    dataObserver
      .subscribe(dataFromProvider => {
        console.log("Data received:" + dataFromProvider);

        this.labelsDate = dataFromProvider
          .map(x => x["time"]);

        this.dataTemperature = dataFromProvider
          .map(x => x["temperature"]);

        this.dataHumidity = dataFromProvider
          .map(x => x["humidity"]);

          this.drawChart();
        this.currentTemperature=this.dataTemperature[this.dataTemperature.length-1];
        this.currentHumidity=this.dataHumidity[this.dataHumidity.length-1];
      });
  }

  drawChart() {
    this.lineChartTemperature = new Chart(this.lineCanvasTemperature.nativeElement, {

      type: 'line',
      data: {
        labels: this.labelsDate,
        datasets: [
          {
            label: "temperature",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.dataTemperature,
            spanGaps: false,
          }
        ]
      }

    });



  this.lineChartHumidity = new Chart(this.lineCanvasHumidity.nativeElement, {

    type: 'line',
    data: {
      labels: this.labelsDate,
      datasets: [
        {
          label: "humidity",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.dataHumidity,
          spanGaps: false,
        }
      ]
    }

  });

}
}


