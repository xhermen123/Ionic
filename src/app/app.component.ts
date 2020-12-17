import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { Events, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserData } from 'src/providers/user-data';
import { AttendanceData } from 'src/providers/attendance-data';
import { ScheduleData } from 'src/providers/schedule-data';
import { WebApiProvider } from 'src/providers/web-api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appNursePages = [
    {
      title: 'Home',
      url: '/nurse/home',
      icon: 'home'
    },
    {
      title: 'My Attendance',
      url: '/nurse/attendance',
      icon: 'contacts'
    },
    {
      title: 'My Schedule',
      url: '/nurse/schedule',
      icon: 'calendar'
    },
    {
      title: 'My Profile',
      url: '/nurse/profile',
      icon: 'person'
    },
    {
      title: 'Activity Report',
      url: '/nurse/activity',
      icon: 'journal'
    },
    {
      title: 'Logout',
      url: '',
      icon: 'log-out'
    }
  ];

  public appFamilyPages = [
    {
      title: 'Home',
      url: '/family/home',
      icon: 'home'
    },
    {
      title: 'Attendance',
      url: '/family/attendance',
      icon: 'contacts'
    },
    {
      title: 'Schedule',
      url: '/family/schedule',
      icon: 'calendar'
    },
    {
      title: 'My Profile',
      url: '/family/profile',
      icon: 'person'
    },
    {
      title: 'Activity Report',
      url: '/family/activity',
      icon: 'journal'
    },
    {
      title: 'Logout',
      url: '',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
    private storage: Storage,
    public events: Events,
    public userData: UserData,
    public attendanceData: AttendanceData,
    public scheduleData: ScheduleData,
    public router: Router, 
    public api: WebApiProvider
  ) {
    this.initializeApp();
  }

  ionViewDidEnter() {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.listenToLoginEvents();

    console.log(111);
    const user = this.userData.user;
    if(user) {
      this.handleMenu(user.role);
    } else {
      this.handleMenu('public');
    }
  }

  handleMenu(menuName) {
    console.log(menuName)
    switch(menuName) {
      case 'public':
        this.menuController.enable(false, 'nurse');
        this.menuController.enable(false, 'family');
        break;
      case 'nurse':
        this.menuController.enable(true, 'nurse');
        this.menuController.enable(false, 'family');
        break;
      case 'family':
        this.menuController.enable(true, 'family');
        this.menuController.enable(false, 'nurse');
        break;
      default:
        this.menuController.enable(false, 'nurse');
        this.menuController.enable(false, 'family');
    }
  }

  listenToLoginEvents() {
    console.log(222);
    this.events.subscribe('user:login', () => {
      console.log(333, this.userData);
      const user = this.userData.user;
      if(user) {
        this.handleMenu(user.role);
        // if (test_connection) {
        //   this.getAllData();
        // } else {
        //   this.loadAllData();
        // }
      } else {
        this.handleMenu('public');
      }
    });

    this.events.subscribe('user:logout', () => {
      this.handleMenu('public');
    });
  }

  async logout() {
    let res = await this.api.httpPost("auth/logout", {}, true);

    if (res['success'] == true) {
      await this.api.removeToken();
      this.userData.logout();
      this.router.navigateByUrl('/public/login');
    }
  }

  // api call
  async getAllData() {
    const data = {
      id: this.userData.user.id
    };
    let res = await this.api.httpPost(this.userData.user.role === 'nurse' ? 'app-nurse/getAll' : 'app-family/getAll', data, true);

    if (res['success'] == true) {
      this.userData.setProfile(res['profile']);
      this.scheduleData.setList(res['scheduleList']);
      this.attendanceData.setList(res['attendanceList']);
    }
  }
}
