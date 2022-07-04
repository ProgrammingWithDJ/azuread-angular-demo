import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Profile } from './profile.model';
import { Observable } from 'rxjs';
import { Card } from '../app/models/cardmodel';


const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_PIC = 'https://graph.microsoft.com/v1.0/me/photo/$value';
const REPORTS_API_BASE_URI='https://localhost:44320/api/'

@Injectable({
  providedIn: 'root'
})
export class AzureAdDemoService {
  baseUrl ='https://localhost:7045/api/cards'
isUserLoggedIn:Subject<boolean> = new Subject<boolean>();
  constructor(private httpClient:HttpClient) { }

  getAllCards() :Observable<Card[]>
  {
 return this.httpClient.get<Card[]>(this.baseUrl);
  }

  addCard(card: Card): Observable<Card>
  {
    card.id='00000000-0000-0000-0000-000000000000';
    return this.httpClient.post<Card>(this.baseUrl,card);

  }

  updateCard(card: Card): Observable<Card>
  {

    return this.httpClient.put<Card>(this.baseUrl + '/' + card.id,card);

  }

  deleteCard(id: string):Observable<Card>
  {
  return this.httpClient.delete<Card>(this.baseUrl + '/' + id)
  }

  getCard(id: string):Observable<Card>
  {
    return this.httpClient.get<Card>(this.baseUrl + '/' + id);
  }
  getUserProfile()
  {
    return this.httpClient.get<Profile>(GRAPH_ENDPOINT);
  }
  getProfilePic()
  {
    return this.httpClient.get(GRAPH_ENDPOINT_PIC,
      {responseType:'blob'});
  }
  getReport()
  {
    return this.httpClient.get(REPORTS_API_BASE_URI+'Report/GetReport',
      {responseType:'blob'});
  }
  getReportStatus()
  {
    return this.httpClient.get<any>(REPORTS_API_BASE_URI+'Report/GetReportStatus');
  }
}
