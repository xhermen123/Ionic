import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserData } from 'src/providers/user-data';
import { AttendanceData } from 'src/providers/attendance-data';
import { ScheduleData } from 'src/providers/schedule-data';
import { ConferenceData } from 'src/providers/conference-data';
import { ActivityData } from 'src/providers/activity-data';
import { WebApiProvider } from 'src/providers/web-api';
import { DeviceHelpers } from 'src/providers/device-helpers';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    ConferenceData,
    UserData,
    AttendanceData,
    ScheduleData,
    ActivityData,
    WebApiProvider,
    DeviceHelpers,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
