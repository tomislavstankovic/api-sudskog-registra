import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from './api.service';

import * as toastr from 'toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  
  angularForma: FormGroup;

  constructor(
      private _fb: FormBuilder,
      private _apiService: ApiService)
  {}

  ngOnInit(){
    this.angularForma = this._fb.group({
      oib: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[-+]?[0-9]*[.,]?[0-9]+')]],
      mbs: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[-+]?[0-9]*[.,]?[0-9]+')]],
      nazivtvrtke: ['', Validators.required],
      ulica: ['', Validators.required],
      grad: ['', Validators.required],
      email: ['', Validators.email]
      });
  }

  spremi(){
    console.log(this.angularForma);
  }

  provjera(angularForma){
      //OIB
      if(angularForma.value.oib && angularForma.value.oib.length == 11){
        if(angularForma.value.oib.match(/^[0-9]+$/)){
          this._apiService.sudskiRegistarOIB(angularForma.value.oib).subscribe(res => {
            console.log(res);
            if(res){
                this.angularForma = this._fb.group({
                  oib: res.oib,
                  mbs: res.mbs,
                  nazivtvrtke: res.skracene_tvrtke[0].ime,
                  ulica: res.sjedista[0].ulica + ' ' + res.sjedista[0].kucni_broj + (res.sjedista[0].kucni_podbroj ? (res.sjedista[0].kucni_podbroj) : ''),
                  grad: res.sjedista[0].naziv_naselja,
                  email: ''
                });
            } else {
              toastr.error("Neuspješno dohvaćanje podataka prema OIB!");
              this.angularForma.controls['oib'].setValue(null);
            }
          });
        } else {
          toastr.error("OIB mora biti u obliku broja!");
        }
      //MBS
      } else if(angularForma.value.mbs && angularForma.value.mbs.length == 9){
        if(angularForma.value.mbs.match(/^[0-9]+$/)){
          this._apiService.sudskiRegistarMBS(angularForma.value.mbs).subscribe(res => {
            console.log(res);
            if(res){
                this.angularForma = this._fb.group({
                  oib: res.oib,
                  mbs: res.mbs,
                  nazivtvrtke: res.skracene_tvrtke[0].ime,
                  ulica: res.sjedista[0].ulica + ' ' + res.sjedista[0].kucni_broj + (res.sjedista[0].kucni_podbroj ? (res.sjedista[0].kucni_podbroj) : ''),
                  grad: res.sjedista[0].naziv_naselja,
                  email: ''
                });
            } else {
              toastr.error("Neuspješno dohvaćanje podataka prema MBS!");
              this.angularForma.controls['mbs'].setValue(null);
            }
          });
        } else {
          toastr.error("MBS mora biti u obliku broja!");
        }
      } else {
        //
      } 
  }

}