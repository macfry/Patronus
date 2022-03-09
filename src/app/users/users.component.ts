import {Component, OnInit, ViewChild} from "@angular/core";
import {IUser} from "./users.interface";
import {UsersService} from "./users.service";
import {Table} from "primeng/table";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  public users: IUser[] = [];
  public selectedUsers: IUser[] = [];
  public loading: boolean = true;

  @ViewChild("dt") table: Table;

  constructor(
    private usersService: UsersService,
    private primengConfig: PrimeNGConfig
  ) {}

  private addLeadingZero(date: number): string {
    if (date < 10) {
      return `0${date}`;
    } else {
      return date.toString();
    }
  }

  public formatDate(date: Date, withTime: boolean = false): string {
    const month = this.addLeadingZero(date.getMonth() + 1);
    const day = this.addLeadingZero(date.getDate());
    const hours = this.addLeadingZero(date.getHours());
    const minutes = this.addLeadingZero(date.getMinutes());
    const seconds = this.addLeadingZero(date.getSeconds());
    return `${day}-${month}-${date.getFullYear()} ${withTime ? `${hours}:${minutes}:${seconds}` : ''}`
  }

  public onDateSelect(value: any): void {
    this.table.filter(this.formatDate(value), 'emergencyTime', 'contains');
  }

  public ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users.map((user) => {
        return {
          id: user.emergency.emergencyId,
          emergencyTime: this.formatDate(new Date(user.emergency.requestTime), true),
          deviceSN: user.device.serialNumber,
          name: `${user.holder.firstName} ${user.holder.lastName}`,
        };
      });
      this.loading = false;
    });

    this.primengConfig.ripple = true;
  }
}
