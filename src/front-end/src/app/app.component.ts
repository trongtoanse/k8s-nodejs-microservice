import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { AppService } from "./app.service";
import { Worker } from "../model/worker.model";
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  protected mode = environment.mode;
  protected worker = environment.worker;
  protected workers = new Array<Worker>();
  protected faTrashCan = faTrashCan;
  protected faEdit = faEdit;
  protected customDelay = 3000;
  protected delay = 3000;
  protected loginWithUserId = "";
  protected userId = "";
  private intervalId: any = null;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.updateStrategyToGetData();
  }

  updateStrategyToGetData() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.appService.getData(this.userId).subscribe(
        worker => {
          this.workers.push(worker);
        });
    }, this.delay);
  }

  updateDelay() {
    this.delay = this.customDelay;
    this.updateStrategyToGetData();
  }

  resetDelay() {
    this.delay = 3000
    this.customDelay = 3000;
    this.updateStrategyToGetData();
  }

  updateUser() {
    this.userId = this.loginWithUserId;
    this.updateStrategyToGetData();
  }

  resetUser() {
    this.userId = "";
    this.loginWithUserId = "";
    this.updateStrategyToGetData();
  }
}
