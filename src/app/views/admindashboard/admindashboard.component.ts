import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { Constant } from '../../_global/constant';
import { Title } from '@angular/platform-browser';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  results: any[];
  nrSelect = 1;

  public _baseURL: string;
  public sortbyBD: string;
  public getallimpactlevelhigh: any;
  public getallimpactlevelmedium: any;
  public getallimpactlevellow: any;
  public barChartLegend = false;
  public projectsAsType: any;
  public mappingProjectAndMilestone: any;
  public mappingProjectAndPhase: any;
  public MappingProjectTypeAndPhase: any;
  showLoader: boolean = true;
  showLoaderfordepartment: boolean = true;
  showLoaderforpyramid: boolean = true;
  showLoaderforproject: boolean = true;
  showLoaderforprocessandproject: boolean = true;
  showLoaderforphase: boolean = true;
  showLoaderforimplemented: boolean = true;
  showLoaderforimpactcategory: boolean = true;
  showLoaderformilestone: boolean = true;
  showLoaderforfunction: boolean = true;



  //barchart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
          barPercentage: 0.4,


        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    }

  };
  // public barChartLabels: string[];
  public barChartTypeforphase = 'bar';
  public barChartTypefordepartment = 'bar';
  public barChartTypeforcategory = 'bar';
  barChartLabels: string[];
  barChartLabelsfordepartment: string[];

  public barChartData: any[] = [
    // { data: [65, 59, 80, 81, 56, 55, 46], label: '' },
    // { data: [65, 59, 80, 81, 56, 55, 46], label: '123' },

  ];


  public barChartDatafordepartment: any[] = [
    // { data: [65, 59, 80, 81, 56, 55, 46], label: '' },
    // { data: [65, 59, 80, 81, 56, 55, 46], label: '123' },

  ];


  // barChart
  //  public barChartOptions: any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels: string[];
  // public barChartType = 'bar';


  // public barChartData: any[] = [
  //   {data: [], label: 'Lessons'}
  // ];

  // Pie user
  public userpieChartLabels: string[];
  public userpieChartData: number[];
  public userpieChartType = 'pie';

  // Pie Department
  public deptpieChartLabels: string[];
  public deptpieChartData: number[];
  public deptpieChartType = 'doughnut';

  // Pie milestones
  public milespieChartLabels: string[];
  public milespieChartData: number[];
  public milespieChartType = 'bar';

  // Pie function
  public funpieChartLabels: string[];
  public funpieChartData: number[];
  public funpieChartType = 'bar';

  // bar function
  public phasebarChartLabels: string[];
  public phasebarChartData: number[];
  public phasepieChartType = 'bar';

  // Pie Project
  public projpieChartLabels: string[];
  public projpieChartData: number[];
  public projpieChartType = 'pie';

  // Pie Category
  public catpieChartLabels: string[];
  public catpieChartData: number[];
  public catpieChartType = 'doughnut';

  // Pie Level
  public levelpieChartLabels: string[];
  public levelpieChartData: number[];
  public levelpieChartType = 'pie';

  public PhasepieChartLabels: string[];
  public PhasepieChartData: number[];
  public PhasepieChartType = 'doughnut';

  public piedata: Object[];
  public legendSettings: Object;
  public trianglechartlabel: Object;
  public trianglelegent: Object;
  public Triangulartooltipsettings: Object;

  public currentValue: number;

  // Pie projects
  public projectpieChartLabels: string[];
  public projectpieChartData: number[];
  public projectpieChartType = 'pie';

  public mappingProjectTypeAndProject: any;
  public getallimplemented: any;
  public getallnotimplemented: any;

  public getalllessonbyprocess: any;
  public getalllessonbyproject: any;
  public palette: string[];
  public background: string[];

  public lineChartColours: Array<any> = [
    { // css for bar chart colors
      // backgroundColor: '#80c1ed',
      backgroundColor: ['#80c1ed', '#f64846', 'rgb(255, 99, 132)', '#f69114', 'rgb(0, 255, 255)', 'rgb(255, 255, 0)', 'rgb(255, 255, 128)','#4dbd74', '#20c997' , '#17a2b8', '#fff' , '#73818f' , '#2f353a' ,'#63c2de' , '#20a8d8', '#c8ced3', '#4dbd74', '#63c2de', '#ffc107' ,'#f86c6b','#f0f3f5'],
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  public chartColors1: Array<any> = [
    {
      backgroundColor: ['#f86c6b','#20a8d8', '#63c2de','#A8B3C5'],
      hoverBackgroundColor: ['#f86c6b','#20a8d8', '#63c2de','#A8B3C5'],
      borderWidth: 1,
    }
  ];
  currentValue1: number;
  currentValue2: number;
  currentValue3: number;
  getalllessonbyissue: any;
  getalllessonbypractice: any;
  currentValue4: number;
  currentValue5: number;
  getalllessonbymonth: any;
  barChartLabelsforcategory: any;
  barChartDataforcategory: any;

  constructor(private router: Router, private userService: UserService, private titleService: Title) {

    this._baseURL = Constant.baseURL;
    // this.getBarchart();
    this.getUserPiechart();

    // this.getmilestonePiechart();
    this.getfunctionPiechart();
    // this.getphasebarchart();
    this.getProjPiechart();
    this.getCatPiechart();
    this.getPhasePiechart();
    this.getLevelPiechart();
    this.getCountimpactlevelhigh();
    this.getCountimpactlevellow();
    this.getCountimpactlevelmedium();
    this.getProjecttype();
    this.getdepartmentbarchart();
    this.getcategorybarchart();
    this.getimplemented();
    // this.getnotimplemented();
    this.getlessonbyproject();
    // this.getlessonbyprocess();
    this.getlessonbyissue();
    // this.getlessonbypractice();
    this.getlessonbymonth();
    this.getdefaultproject();
    this.getdefaultmilestones();
    this.getdefaultprojectphase();
    this.titleService.setTitle("Lighthouse | Dashboard");

  }

  ngOnInit() {
    

    // this.currentValue = 70;

    // this.piedata = [
    //   { x: 'Jan', y: 3, text: 'Jan: 3' }, { x: 'Feb', y: 3.5, text: 'Feb: 3.5' },
    //   { x: 'Mar', y: 7, text: 'Mar: 7' }, { x: 'Apr', y: 13.5, text: 'Apr: 13.5' },
    //   { x: 'May', y: 19, text: 'May: 19' }, { x: 'Jun', y: 23.5, text: 'Jun: 23.5' },
    //   { x: 'Jul', y: 26, text: 'Jul: 26' }, { x: 'Aug', y: 25, text: 'Aug: 25' },
    //   { x: 'Sep', y: 21, text: 'Sep: 21' }, { x: 'Oct', y: 15, text: 'Oct: 15' },
    //   { x: 'Nov', y: 9, text: 'Nov: 9' }, { x: 'Dec', y: 3.5, text: 'Dec: 3.5' }];

    this.legendSettings = {
      visible: true
    };
    this.Triangulartooltipsettings = {
      enable: true,
      format: '${point.x} : <b>${point.y}</b>'
    };
    this.trianglechartlabel = {
      visible: true,
      position: 'Inside',
      name: 'text'
    };
    this.trianglelegent = {
      visible: true,
      //  position:'Bottom',
      //  height:'8%',
      //  width:'35'
    };
    this.background = [
      "#f1f1f1"
    ];
    // css for pyramid
    // this.palette = ['#1c5881', '#268001', '#f64846', '#f69114', 'rgb(0, 255, 255)'];
    this.palette = ['#F7464A', '#46BFBD', '#949FB1', '#0f69c4'];
    
    // this.sortbyBD = "1";
    this.masterlistproject();

  }

  //default tab for masterlist- project
  masterlistproject() {
    localStorage.removeItem("tabforprocess");
    localStorage.removeItem("tabID");
    var projectradiobuttn = "project";
    var projecttabselection = "tab1"
    localStorage.setItem("tabforprocess", projectradiobuttn);
    localStorage.setItem("tabID", projecttabselection);


  }
  // getBarchart() {
  //   this.userService.getlessonsBarChart().subscribe((data) => {
  //     if (data) {
  //       data.data.push(0);
  //       this.barChartLabels = data.label;
  //       this.barChartData = [
  //         { data: data.data, label: 'Lessons' }
  //       ];
  //       console.log();
  //     }
  //   });
  // }
  // project pie chart
  public onselectProjecttype3(e) {

    this.mappingProjectTypeAndProject = [];
    //console.log(e.target.value)
    const ID = e.target.value;
    console.log(ID)
    this.userService.getprojectPiechart(ID).subscribe((data) => {
      if (data) {
        this.projectpieChartLabels = data.label;
        this.projectpieChartData = data.data;
      }
    });

  }
  // milestones bar chart
  getMappingProjectTypeAndProject(ProjecttypeID) {
    this.userService.getMappingProjectTypeAndProject(ProjecttypeID).subscribe((data) => {
      if (data.status) {
        this.mappingProjectTypeAndProject = data.result;

      }
    });
  }
  public onselectProjecttype1(e) {

    this.mappingProjectAndMilestone = [];
    //console.log(e.target.value)
    const ID = e.target.value;
    console.log(ID)
    this.userService.getmilestonePiechart(ID).subscribe((data) => {
      if (data) {
        data.data.push(0);

        this.milespieChartLabels = data.label;
        this.milespieChartData = data.data;
      }
    });

  }
  // selected ivd as a project type  
  getdefaultproject(){
    this.userService.getdefaultproject().subscribe((data) => {
      if (data) {
        this.projectpieChartLabels = data.label;
        this.projectpieChartData = data.data;
        this.showLoaderforproject=false;
      }
    });
  }
  // selected ivd as a project type  
getdefaultmilestones(){
    this.userService.getdefaultmilestones().subscribe((data) => {
      if (data) {
        data.data.push(0);

        this.milespieChartLabels = data.label;
        this.milespieChartData = data.data;
        this.showLoaderformilestone=false; 
      }
    });
  }
  // selected ivd as a project type  
getdefaultprojectphase(){
    this.userService.getdefaultprojectphase().subscribe((data) => {
      if (data) {
        data.data.push(0);
        this.barChartLabels = data.label;
        this.barChartData = data.data;
        this.showLoaderforphase=false;
      }

    });
  }

  public onselectProjecttype2(e) {

    this.mappingProjectAndPhase = [];
    //console.log(e.target.value)
    const ID = e.target.value;
    this.userService.getphasebarchart(ID).subscribe((data) => {
      if (data) {
        data.data.push(0);
        this.barChartLabels = data.label;
        this.barChartData = data.data;
      }

    });

  }

  getMappingProjectTypeAndPhase(ProjecttypeID) {
    this.userService.getMappingProjectTypeAndPhase(ProjecttypeID).subscribe((data) => {
      if (data.status) {
        this.MappingProjectTypeAndPhase = data.result;
        console.log(data);
      }
    });
  }
  getMappingProjectAndMilestone(ProjecttypeID) {
    this.userService.getMappingProjectAndMilestone(ProjecttypeID).subscribe((data) => {
      if (data.status) {
        this.mappingProjectAndMilestone = data.result;
        // console.log(data);
      }
    });

  }

  getUserPiechart() {
    //   this.userService.getlessonsUserPieChart().subscribe((data) => {
    //    if(data) {   
    //     this.userpieChartLabels = data.label;
    //     this.userpieChartData= data.data;                      
    //    }
    // });
  }

  // getmilestonePiechart() {
  //   this.userService.getmilestonePiechart().subscribe((data) => {
  //    if(data) {   
  //     this.milespieChartLabels = data.label;
  //     this.milespieChartData= data.data;                      
  //    }
  // });
  // }
  getfunctionPiechart() {
    this.userService.getfunctionPiechart().subscribe((data) => {
      if (data) {
        data.data.push(0);
        this.funpieChartLabels = data.label;
        this.funpieChartData = data.data;
        this.showLoaderforfunction=false;
      }
    });
  }
  getProjecttype() {
    this.userService.getProjecttype().subscribe((data) => {
      if (data.status) {
        console.log(data)
        this.projectsAsType = data.result;

      }
    });
  }
  // getphasebarchart() {
  //   this.userService.getphasebarchart().subscribe((data) => {
  //     if (data) {
  //       data.data.push(0);
  //       this.barChartLabels = data.label;
  //       this.barChartData = data.data;


  //     }

  //   });
  // }

  getdepartmentbarchart() {
    this.userService.getdepartbarchart().subscribe((data) => {
      // this.userService.getdepartbarchart1().subscribe((data) => {
      //   //data.label;
      //   // let deprt1 = data.label;
      //  // console.log(data.label)
      //   this.barChartLabelsfordepartment = data.label;
      // });
      if (data) {
        data.data.push(0);
        this.barChartLabelsfordepartment = data.label;
        this.barChartDatafordepartment = data.data;
        this.showLoaderfordepartment=false;
        console.log(data);
      }

    });
    
  }
  getcategorybarchart() {
    this.userService.getcategorybarchart().subscribe((data) => {
      if (data) {
        data.data.push(0);
        this.barChartLabelsforcategory = data.label;
        this.barChartDataforcategory = data.data;
        this.showLoaderforimpactcategory=false;

        console.log(data);
      }

    });
  }


  getProjPiechart() {
    //   this.userService.getlessonsProjPieChart().subscribe((data) => {
    //    if(data) {   
    //     this.projpieChartLabels = data.label;
    //     this.projpieChartData= data.data;                      
    //    }
    // });
    this.projpieChartLabels = ['Feasibility', 'Implementation', 'Development', 'Analysis'];
    this.projpieChartData = [1, 7, 5, 8];
  }

  getPhasePiechart() {
    //   this.userService.getlessonsPhasePieChart().subscribe((data) => {
    //    if(data) {   
    //     this.PhasepieChartLabels = data.label;
    //     this.PhasepieChartData= data.data;                      
    //    }
    // });
    this.PhasepieChartData = [1, 1, 1];
    this.PhasepieChartLabels = ['MS Design Goal', 'MS Design Input', 'MS Design Output'];
  }

  getCatPiechart() {
    //   this.userService.getlessonsCatPieChart().subscribe((data) => {
    //    if(data) {   
    //     this.catpieChartLabels = data.label;
    //     this.catpieChartData= data.data;                      
    //    }
    // });
    this.catpieChartLabels = ['TimeLine', 'Risk Taking', 'Collaboration', 'Transfer process'];
    this.catpieChartData = [2, 4, 7, 3];
  }

  getLevelPiechart() {
    //   this.userService.getlessonsLevelPieChart().subscribe((data) => {
    //    if(data) {   
    //     this.levelpieChartLabels = data.label;
    //     this.levelpieChartData= data.data;                      
    //    }
    // });
    this.levelpieChartLabels = ['Medium', 'Low', 'High', 'Critical'];
    this.levelpieChartData = [8, 2, 8, 3];

  }

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }
  getCountimpactlevelhigh() {
    this.userService.getCountimpactlevelhigh().subscribe((data) => {
      // console.log(data);
      this.getallimpactlevelhigh = data.result;
      console.log(data);
    });


  }
  getCountimpactlevelmedium() {
    this.userService.getCountimpactlevelmedium().subscribe((data) => {
      this.getallimpactlevelmedium = data.result;
    });


  }
  getCountimpactlevellow() {
    this.userService.getCountimpactlevellow().subscribe((data) => {
      this.getallimpactlevellow = data.result;
    });


  }
  //flag=0 ->non implemented(id=0) flag=1 -> Implemented(id=1)
  getimplemented() {
    this.userService.getimplemented().subscribe((data) => {
      this.getallimplemented = data.result;
      const totalimplement = data.result[0].total;
      const totallesson = data.result[0].totallesson;
      const percent = totalimplement / totallesson * 100;
      this.currentValue = percent;
      this.showLoaderforimplemented=false;
      console.log('=======>>>>>>>2222222222222222222222222', data, totalimplement, totallesson, percent);

    });
  }
  //flag=0 ->non implemented(id=0) flag=1 -> Implemented(id=1)
  // getnotimplemented() {
  //   this.userService.getnotimplemented().subscribe((data) => {
  //     this.getallnotimplemented = data.result;
  //     const totalimplement = data.result[0].total;
  //     const totallesson = data.result[0].totallesson;
  //     const percent = totalimplement / totallesson * 100;
  //     this.currentValue1 = percent;

  //   });
  // }
  // id =1 ->project and id =2 ->process
  getlessonbyproject() {
    this.userService.getlessonbyproject().subscribe((data) => {
      this.getalllessonbyproject = data.result;
      const totalproject = data.result[0].total;
      const totallesson = data.result[0].totallesson;
      const percent = totalproject / totallesson * 100;
      this.currentValue2 = percent;
      this.showLoaderforprocessandproject=false;
    });
  }
  // getlessonbyprocess() {
  //   this.userService.getlessonbyprocess().subscribe((data) => {
  //     this.getalllessonbyprocess = data.result;
  //     const totalprocess = data.result[0].total;
  //     const totallesson = data.result[0].totallesson;
  //     const percent = totalprocess / totallesson * 100;
  //     this.currentValue3 = percent;

  //   });
  // }


  getlessonbyissue() {
    this.userService.getlessonbyissue().subscribe((data) => {
      this.getalllessonbyissue = data.result;
      const totalissue = data.result[0].total;
      const totallesson = data.result[0].totallesson;
      const percent = totalissue / totallesson * 100;
      this.currentValue4 = percent;
      this.showLoader = false;
    });
  }
  // getlessonbypractice() {
  //   this.userService.getlessonbypractice().subscribe((data) => {
  //     this.getalllessonbypractice = data.result;
  //     const totalpractice = data.result[0].total;
  //     const totallesson = data.result[0].totallesson;
  //     const percent = totalpractice / totallesson * 100;
  //     this.currentValue5 = percent;
  //   });
  // }
  getlessonbymonth() {
    this.userService.getlessonbymonth().subscribe((data) => {
      this.getalllessonbymonth = data.result;
      const currentmonth = data.result[0].currentmonth;
      const lastthreemonth = data.result[0].lastthreemonth;
      const lastfivemonth = data.result[0].lastfivemonth;
      const lasttenmonth = data.result[0].lasttenmonth;
      console.log('databymonth', currentmonth, lastthreemonth, lastfivemonth)
      this.piedata = [
        { x: 'Current-Month', y: currentmonth, text: 'Current-Month' },
        { x: '1-3 Months', y: lastthreemonth, text: '1-3 Months' },
        { x: '3-5 Months', y: lastfivemonth, text: '3-5 Months' },
        { x: '10 Months', y: lasttenmonth, text: '10 Months' }
      ];
      this.showLoaderforpyramid=false;
    });
    // setTimeout(function () {
    //   var pyramidcss = document.getElementById("chart-container_border");
    //   if (pyramidcss) {
    //     pyramidcss.style.fill = "#f1f1f1";
    //   }
    // }, 500);
  }
}