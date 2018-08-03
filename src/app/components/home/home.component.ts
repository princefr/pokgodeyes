import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import {ParkopolyService} from '../../services/parkopoly.service';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {AppComponent} from '../../app.component';
import {map, startWith} from 'rxjs/operators';
import {} from '@types/googlemaps';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/internal/operators';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {MatMenu} from '@angular/material';
declare var GeoFire: any;




export interface Drivers {
    InMoveStatus: string;
    LastAdress: string;
    firstname: string;
    id: string;
    lastTimeSeen: string;
    lastname: string;
    phoneNumber: string;
}



export interface City {
    ville: string;
    viewValue: string;
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    providers: [ParkopolyService]
})
export class HomeComponent implements OnInit, AfterViewInit {

    driversInQuery = new Map();
    concessionRef: AngularFireObject<any>;
    driverPosition: Observable<any[]>;
    concessions: any;
    myControl: FormControl;
    filteredDrivers: Observable<any[]>;
    geoFire: any;
    geoQuery: any;
    driver = new Map();
    DriversObject = {};
    step = 'step1';
    Tabs =  new BehaviorSubject('step1');
    selected = 'Paris';
    ActiveUserIndex = new BehaviorSubject(0);
    DriverInputControl: FormControl;
    MissionInputControl: FormControl;
    PlaceInputControl: FormControl;
    drivers: Observable<any[]>;


    @ViewChild('gmap') gmapElement: ElementRef;
    @ViewChild('placesRef') placesRef: GooglePlaceDirective;
    map: google.maps.Map;
    radiusInKm: 100;

    cities: City[] = [
        {ville: 'Paris', viewValue: 'Steak'},
        {ville: 'Bordeaux', viewValue: 'Pizza'},
        {ville: 'Rouen', viewValue: 'Tacos'},
        {ville: 'Cannes', viewValue: 'Tacos'},
        {ville: 'Rome', viewValue: 'Tacos'},
        {ville: 'Torri del Benaco', viewValue: 'Tacos'}
    ];




  constructor(private pkservice: ParkopolyService, private firebaseservice: FirebaseService, private router: Router, private db: AngularFireDatabase) {

  }

  ngOnInit() {
      this.driverPosition = this.db.list('drivers').valueChanges();
      this.drivers = this.db.list('users').valueChanges();
      this.myControl = new FormControl();
      this.geoFire = new GeoFire(this.db.list('geofire').query.ref);
      this.PlaceInputControl  = new FormControl();



      if (navigator.geolocation) {
        //  navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
          console.log('Geolocation is not supported by this browser.');
      }





      this.geoQuery = this.geoFire.query({
          center: [48.856614, 2.3522219000000177],
          radius: 100
      });

     // this.filteredDrivers = this.DriverInputControl.valueChanges.pipe(startWith<string>(''), map(val => this._filter(val)));



  }

    showPosition(position) {
      console.log(position.coords.latitude + ' ' + position.coords.longitude);
    }







    public handleAddressChange(address: Address) {
      this.firebaseservice.Geocoding(address.formatted_address).then(function(results) {
          console.log(JSON.stringify(results['results']));


          // get the user near this place

          // this.geoQuery.updateCriteria({
          //     center: [-50.83, 100.19],
          //     radius: 15
          // });

      }, function(err) {

      });
    }


    deconecte() {
      this.firebaseservice.Logout().then((res) => {
          this.router.navigate(['/login']);
      }).catch((err) => {

      })
    }




    /* Returns true if the two inputted coordinates are approximately equivalent */
    coordinatesAreEquivalent(coord1, coord2): boolean {
        return (Math.abs(coord1 - coord2) < 0.000001);
    }






  ChangeTabs (tabs: string) {
    this.Tabs.next(tabs);
  }


    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        console.log(filterValue);
        return [];
    }



    ChangeCriteria(lat: number, long: number) {
        const centerInMap = new google.maps.LatLng(lat, long);
        // using global variable:
        this.map.panTo(centerInMap);
        this.geoQuery.updateCriteria({
            center: [lat, long],
            radius: 1000
        });
    }




    updateGeolocation(city: string) {
        if(city === 'Paris') {
            this.ChangeCriteria(48.856614, 2.3522219000000177);
        } else if (city === 'Bordeaux') {
            this.ChangeCriteria(44.837789, -0.5791799999999512);
        } else if(city === 'Rouen') {
            this.ChangeCriteria(49.44323199999999, 1.0999709999999823);
        } else if (city === 'Cannes') {
            this.ChangeCriteria(43.552847, 7.017369000000031);
        } else if (city === 'Rome') {
            this.ChangeCriteria(41.9027835, 12.496365500000024);
        } else if (city === 'Torri del Benaco') {
            this.ChangeCriteria(45.6585981, 10.72607979999998);
        }
    }






    ngAfterViewInit(): void {


        this.map = new google.maps.Map(this.gmapElement.nativeElement, {
            center: {lat: 48.841169, lng: 2.296801},
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });




        const circle = new google.maps.Circle({
            strokeColor: '#6D3099',
            strokeOpacity: 0.7,
            strokeWeight: 1,
            fillColor: '#B650FF',
            fillOpacity: 0.35,
            map: this.map,
            center: {lat: 48.841169, lng: 2.296801},
            radius: ((this.radiusInKm) * 1000),
            draggable: true
        });

        // Update the query's criteria every time the circle is dragged
        const updateCriteria = _.debounce(() => {
            const latLng = circle.getCenter();
            this.geoQuery.updateCriteria({
                center: [latLng.lat(), latLng.lng()],
                radius: this.radiusInKm
            });
        }, 10);


        google.maps.event.addListener(circle, 'drag', updateCriteria);


        this.geoQuery.on('ready', () => {
            console.log('GeoQuery has loaded and fired all other events for initial data');
        });

        this.geoQuery.on('key_entered', (key, location, distance) => {
                    this.db.list('users', ref => ref.orderByKey().equalTo(key)).valueChanges().subscribe((res: Drivers []) =>  {
                        if (this.driversInQuery.get(key) === true) {

                        } else {


                            if (res[0] != null) {
                                this.DriversObject[key] = res[0];
                                const currentMarker  = this.addDriverMarker(new google.maps.LatLng(location[0], location[1]), res[0].firstname.charAt(0).toUpperCase() + '' + res[0].lastname.charAt(0).toUpperCase())
                                this.driver.set(key, currentMarker);
                                this.addMarkerClickListner(currentMarker, key);
                                this.driversInQuery.set(key, true);
                            }
                        }
                    });










        });

        this.geoQuery.on('key_exited', (key, location, distance) => {
            console.log(key + ' exited query to ' + location + ' (' + distance + ' km from center)');
        });

        this.geoQuery.on('key_moved', (key, location, distance) => {
            console.log(JSON.stringify('j\'aibouge'));
            const marker = this.driver.get(key);
            this.animatedMoveTo(marker, location);
        });
    }



    getDriver(key) {
        console.log(JSON.stringify(this.DriversObject[key]));
    }




    public addMarkerClickListner(marker, key) {
        google.maps.event.addListener(marker, 'click', () => {
            const driver: Drivers = this.DriversObject[key];
            console.log(JSON.stringify(this.DriversObject[key]));
        });
    }




    public animatedMoveTo(marker: google.maps.Marker, newLocation: any): void {
        const toLat = newLocation[0];
        const toLng = newLocation[1];

        const fromLat = marker.getPosition().lat();
        const fromLng = marker.getPosition().lng();

        if (!this.coordinatesAreEquivalent(fromLat, toLat) || !this.coordinatesAreEquivalent(fromLng, toLng)) {
            let percent = 0;
            const latDistance = toLat - fromLat;
            const lngDistance = toLng - fromLng;
            const interval = window.setInterval(() => {
                percent += 0.01;
                const curLat = fromLat + (percent * latDistance);
                const curLng = fromLng + (percent * lngDistance);
                const pos = new google.maps.LatLng(curLat, curLng);
                marker.setPosition(pos);
                if (percent >= 1) {
                    window.clearInterval(interval);
                }
            }, 50);
        }
    }

    addMarker(location, name): google.maps.Marker {
        return new google.maps.Marker({
            position: location,
            map: this.map,
            title: name,
            optimized: true,
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/bus.png',
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0)
            },
            label: {
                text: name,
                color: '#fff',
                fontSize: '15px',
                fontWeight: 'bold'
            }
        });
    }



    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }




    FollowOneUser(Driver: Drivers, index) {
        //console.log(Driver)
        //const key = _.findKey(this.DriversObject, Driver);
       //console.log('yataaaa' + '   ' + key);
      // this.ActiveUserIndex.next(index);
    }





    addDriverMarker(location, name) {
        return new google.maps.Marker({
            position: location,
            map: this.map,
            title: name,
            optimized: true,
            icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 25,
                    fillColor: '#008B8B',
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: '#fff',
                },
            label: {
                text: name,
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold',
            }
        });
    }



}


