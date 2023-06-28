import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ListUsersService} from "../../core/services/listUsers.service";
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from "@angular/common";

export interface PeriodicElement {
  id?: number;
  isChecked?: any;
  name?: string;
  actions?: string;
  login?: string;
  email?:string;
  phone?:string;
  userDateChange?: string;
  userDataCreate?: string;
  status?: string;
  signature?: string;
}


@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.scss']
})

export class AccountSetupComponent implements OnInit {
  displayedColumns: string[] = ['actions','login', 'email', 'phone', 'role', 'userDateChange', 'userDataCreate', 'status', 'signature'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  formGroup: FormGroup | any;
  dataUser: PeriodicElement[] = [];

  startDate: string | any;
  endDate: string | any;
  maxDate: string | any;

  arrCheckbox : any[] = [];
  allCheckbox = false

  filterUser : any[] = [];

  arrBlockUser : any[] = [];

  localStorageUser: any;

  constructor(private userService: ListUsersService,
              datePipe: DatePipe) {
    const dateFormat = 'yyyy-MM-dd';
    this.maxDate = this.endDate = datePipe.transform(new Date(), dateFormat);
  }

  get _userLogin() {
    return this.formGroup.get('userLogin') as FormControl;
  }

  get _userPhone() {
    return this.formGroup.get('userPhone') as FormControl;
  }

  get _userDataCreate() {
    return this.formGroup.get('userDataCreate') as FormControl;
  }

  get _userStatus() {
    return this.formGroup.get('userStatus') as FormControl;
  }

  get _userEmail() {
    return this.formGroup.get('userEmail') as FormControl;
  }

  get _userRole() {
    return this.formGroup.get('userRole') as FormControl;
  }

  get _userDateChange() {
    return this.formGroup.get('userDateChange') as FormControl;
  }



  ngOnInit(){

    this.userService.getUserList().subscribe((data: any) => {
      data.users.forEach((item:any) =>{
        let user= {
          isChecked: false,
          id: item.id,
          login: item.name,
          email: item.email,
          phone: item.phone,
          userDataCreate: new Date(item.create_at).toLocaleDateString('en-GB').replace(/\//g, '.'),
          userDateChange: new Date(item.update_at).toLocaleDateString('en-GB').replace(/\//g, '.')
        }
        this.dataUser.push(user)
      })

      for(let i = 0; i < this.dataUser.length; i++){
        this.dataUser.forEach((item: any) =>{
          item.role = data.data[i].is_admin;
          item.status = (data.data[i].status).toLowerCase();
          item.signature = data.data[i].is_ecp;
        })
      }

      this.localStorageUser = localStorage.getItem('users')

      this.dataUser.forEach(item =>{
        JSON.parse(this.localStorageUser).forEach((itemLocal:any) =>{
          if(item.id === itemLocal.id){
            item.status = itemLocal.status;
          }
        })
      })

      this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataUser);
      this.dataSource.paginator = this.paginator;
    });



    this.formGroup = new FormGroup({
      userLogin: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9_-]{3,16}$/)]),
      userPhone: new FormControl('', [Validators.pattern(/^\+?[0-9]{1,3}[-. ]?\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{2}[-. ]?[0-9]{2}$/)]),
      userDataCreate: new FormControl(''),
      userStatus: new FormControl(''),
      userEmail: new FormControl('', Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)),
      userRole: new FormControl(''),
      userDateChange: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit() {
    const valuesForm = {
      login: this._userLogin?.value,
      phone: this._userPhone?.value,
      userDataCreate: this._userDataCreate?.value,
      status: this._userStatus?.value,
      email: this._userEmail?.value,
      role: this._userRole?.value,
      userDateChange: this._userDateChange?.value
    };

    this.filterUser = []

    if (this.formGroup.valid) {
      for (let key in valuesForm) {

        if (valuesForm[key as keyof typeof valuesForm] === null || valuesForm[key as keyof typeof valuesForm] === undefined || valuesForm[key as keyof typeof valuesForm] === "") {
          delete valuesForm[key as keyof typeof valuesForm];
        }
      }

      this.dataUser.map((i:any) =>{
        let count = 0
        Object.keys({ ...valuesForm, ...i }).map(key => {
          if( valuesForm[key as keyof typeof valuesForm] != undefined){
            if((String(valuesForm[key as keyof typeof valuesForm]) != String(i[key]))){
              count++
            }
          }
        });

        if(count == 0){
          this.filterUser.push(i)
        }
      })
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.filterUser);
      this.dataSource.paginator = this.paginator;
    }
  }


  onDateChange(): void {
    this.startDate = this.formGroup.get('userDataCreate').value;
    this.endDate = this.formGroup.get('userDateChange').value;
  }


  clearingForm(){
    this.formGroup = new FormGroup({
      userLogin: new FormControl(''),
      userPhone: new FormControl(''),
      userDataCreate: new FormControl(''),
      userStatus: new FormControl(''),
      userEmail: new FormControl(''),
      userRole: new FormControl(''),
      userDateChange: new FormControl(''),
    });

    this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataUser);
    this.dataSource.paginator = this.paginator;
  }


  updateAllComplete(id : any, event: any){
    let count = 0
    if(event.checked){
      this.arrCheckbox.push(id)
    }
    else{
      const indexToDelete = this.arrCheckbox.indexOf(id);
      this.arrCheckbox.splice(indexToDelete, 1);
      this.allCheckbox = false;
    }

    this.dataUser.forEach(i =>{
      if(i.isChecked){
        count++
      }
    })

    count == this.dataUser.length ? this.allCheckbox = true : this.allCheckbox = false;
  }


  setAll(event: any){
    this.arrCheckbox = [];
    this.dataUser.map(i => {
      i.isChecked = !i.isChecked;
      this.allCheckbox ? i.isChecked = true :   i.isChecked = false
      i.isChecked ? this.arrCheckbox.push(i.id) : this.arrCheckbox = [];
    })
  }


  cleanFilter(){
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataUser);
    this.dataSource.paginator = this.paginator;
  }

  unblockUser(){
    this.setStatusUser('active')
  }

  blockUser(){
    this.setStatusUser('disable')
  }

  setStatusUser(statusUser: any){
    this.arrBlockUser = []
    this.dataUser.map(item =>{
      this.arrCheckbox.map(checkbox =>{
        let blockUser
        if(checkbox == item.id){
          item.status = statusUser;

          blockUser = {
            id: item.id,
            status: item.status,
          }
          this.arrBlockUser.push(blockUser)
        }
      })
    })

    localStorage.setItem('users', JSON.stringify(this.arrBlockUser));
  }


  inputCleaning(item:string){
    const updatedValues : any = {};
    updatedValues[item] = '';
    this.formGroup.reset(updatedValues);
  }
}
