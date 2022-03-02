import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../../../_global/constant';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.scss']
})
export class BulkImportComponent implements OnInit {
  results: any[];
  public importID: number;
  public _baseURL: string;
  public p: any;
  constructor(private userService: UserService, private route: ActivatedRoute, private titleService: Title) {
    this.getAllBulk();
    this.titleService.setTitle("Lighthouse | Import-History");
    this._baseURL = Constant.baseURL;
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      if (routeParams && routeParams.id) {
        let rid = routeParams.id;
       // console.log("importID++", rid);
        this.importID = rid;
        if (this.importID != 0) this.getImportbyid(this.importID);
      }
    });
  }

  getAllBulk() {
    this.userService.getAllBulk().subscribe((data) => {
      // console.log('1', data);
      this.results = data.result;
    });
  }
  generateErrorFile(ID) {
    this.userService.generateErrorFile(ID).subscribe((data) => {
      let url = this._baseURL + '/' + data.result.filePath;
      window.open(url);
      this.getAllBulk();
     // window.location.reload();
    });

  }
  getImportbyid(importID) {


  }

}
