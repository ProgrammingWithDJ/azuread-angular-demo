import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureAdDemoService } from '../azure-ad-demo.service';
import { Card } from '../models/cardmodel';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllCards();
  }
    title = 'cards';
    cards: Card[] =[];
    card: Card = {
  id:'',
  cardholderName:'',
  cardNumber: '',
  cvc: '',
  expiryMonth: '',
  expiryYear: ''
    }


    /**
     *
     */
    constructor(private cardService: AzureAdDemoService) {

    }
    populateForm(card: Card)
    {
      this.card=card;
    }
    deleteCard(id: string){
     // console.log('Deleted Id ' +id);
     this.cardService.deleteCard(id)
     .subscribe(
       response =>{
         this.getAllCards();
       }
     )
    }
    getAllCards()
    {
  this.cardService.getAllCards()
  .subscribe(
  response =>{
    this.cards =response;

  console.log(response);
  }
  );
    }
    onUpdate(){
      console.log("udpated");
      this.cardService.updateCard(this.card)
     .subscribe(
       response => {

        this.getAllCards();
        this.card ={
          id:'',
  cardholderName:'',
  cardNumber: '',
  cvc: '',
  expiryMonth: '',
  expiryYear: ''

        }
       }
     );


    }
    onSubmit(){
     this.cardService.addCard(this.card)
     .subscribe(
       response => {

        this.getAllCards();
        this.card ={
          id:'',
  cardholderName:'',
  cardNumber: '',
  cvc: '',
  expiryMonth: '',
  expiryYear: ''

        }
       }
     );
    }
  }
