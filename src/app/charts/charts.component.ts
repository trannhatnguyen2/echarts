import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  url: string = './assets/data/les-miserables.json';
  graph: any;
  option: any;
  chartOption!: EChartsOption;
  errMessage: string = '';

  constructor(private _http: HttpClient) {
    // _http.get(this.url).subscribe((res) => {
    //   this.graph = res;
    //   console.log('lấy được data');
    // });
    console.log('hello');
    this._http.get<any>(this.url).subscribe({
      next: (data) => {
        this.graph = data;
        console.log('lấy được data');
      },
      error: (err) => {
        this.errMessage = err;
        console.log('chưa lấy được data');
      },
    });
  }

  ngOnInit(): void {}

  chart() {
    this.chartOption = {
      tooltip: {},
      legend: [
        {
          data: this.graph.categories.map(function (a: { name: string }) {
            return a.name;
          }),
        },
      ],
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          layout: 'none',
          data: this.graph.nodes,
          links: this.graph.links,
          categories: this.graph.categories,
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
          },
          labelLayout: {
            hideOverlap: true,
          },
          scaleLimit: {
            min: 0.4,
            max: 2,
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3,
          },
        },
      ],
    };
  }
}
