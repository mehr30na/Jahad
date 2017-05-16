import {Component, Input} from "@angular/core";
import {User} from "./user";
import {LoginService} from "./loginService";
import {Router} from "@angular/router";

@Component({
  selector:'MainComponent',
  templateUrl:'./login.component.html'
})

export class LoginComponent{

  user=new User();
  res:boolean=false;
  private showLoader: boolean;


  constructor(private loginService:LoginService,
              private router:Router){}

  onChangeUser(user){
    this.user.username=user;
  }

  onChangePass(pass){
    this.user.password=pass;
  }

  login(){

    this.showLoader = true;
    this.router.navigateByUrl('main');
    this.loginService.loginService(this.user).subscribe(res=>{
      this.res=res;
      if(this.res){
        this.router.navigateByUrl('main');
      }
      else {
        alert("نام کاربری یا رمز عبور اشتباه است");
      }
    });
    this.showLoader = false;
    // this.router.navigateByUrl('main');

  }

}
