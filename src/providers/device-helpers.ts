import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Injectable()
export class DeviceHelpers {

    constructor(
        private geolocation: Geolocation,
        private uniqueDeviceID: UniqueDeviceID
    ) {
        console.log('Hello Helpers Provider')
    }

    async getLocation(){
        return new Promise(resolve => {
            this.geolocation.getCurrentPosition().then((res) => {
                console.log(res)
                resolve({lat: res.coords.latitude, long: res.coords.longitude});
            }).catch((error) => {
                console.log('Error getting location', error);
                resolve({lat: 0, long: 0});
            });
        });
    }

    async getDeviceId(){
        return new Promise(resolve => {
            this.uniqueDeviceID.get()
            .then((uuid: any) => resolve(uuid))
            .catch((error: any) => {
                console.log("get device id", error)
                resolve("0000000000");
            });
        });
    }
    
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    //:::  Passed to function:                                                    :::
    //:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
    //:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
    //:::    unit = the unit you desire for results                               :::
    //:::           where: 'M' is statute miles (default)                         :::
    //:::                  'K' is kilometers                                      :::
    //:::                  'N' is nautical miles                                  :::
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == 0) || (lon1 == 0) || (lat2 == 0) || (lon2 == 0)) {
            return 0;
        }
        else if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return Math.round(dist * 1000)/1000;
        }
    }
}