import { Component, OnInit } from '@angular/core';
// import { NavController, NavParams, ModalController } from 'ionic-angular';
// import { LoginPage } from '../../../pages/login/login';
// import { AngularFireAuth } from 'angularfire2/auth';
import { TheArchitect } from '../the-architect.service';
// import { ProjectProvider } from '../../../providers/project/project';

@Component({
  selector: 'app-left-menu',
  templateUrl: 'left-menu.html',
  styleUrls: ['./left-menu.scss']
})
export class LeftMenuComponent implements OnInit {

  isActive: boolean;
  objects: object[];

  constructor(
    // public modalCtrl: ModalController,
    // public navCtrl: NavController,
    // public navParams: NavParams,
    // public firebase: AngularFireAuth,
    public theArchitect: TheArchitect,
    // public projectService: ProjectProvider
  ){}

  ngOnInit(){
    this.isActive = true;
  }

  activeButton() {
    this.isActive = !this.isActive;
  }

  // saveObjs(){
  //   this.objects = this.theArchitect.objects
  //   console.log(this.objects)
  // }

  // /* CREATE PROJECT*/
  // createProject(){
  //   this.projectService.create()
  // }

  // getProject(id){
  //   this.projectService.getProject(id);
  // }

  // isLoggedIn() {
  //   return localStorage.getItem('isLoggedIn') ? true : false;
  // }

  // logInOrSignIn() {
  //   if (this.firebase.auth.currentUser) {
  //     this.navCtrl.parent.select(2);
  //   }
  //   else {
  //     this.navCtrl.push(LoginPage);
  //   }
  // }

  // public handleAngleInput(value:number){
  //   this.theArchitect.getAngleInput(value)
  // }

}
