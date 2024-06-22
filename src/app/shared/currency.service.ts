import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyRate, ResponseCurrency } from './currency.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private DEFAULT_URL = 'https://api.freecurrencyapi.com/v1';
  private API_KEY = 'fca_live_xDmBiyRlknDOsD5HZBA89js9fV8KxA9Bt5O191E3';
  constructor(private http: HttpClient) {}

  getAllPossiblesCurrency() {
    return this.http.get<ResponseCurrency>(`${this.DEFAULT_URL}/currencies`, {params: {apikey: this.API_KEY}});
  }

  getCurrencyRateByCurrencyCode(
    fromCurrencyCode: string,
    toCurrencyCode: string
  ) {
    return this.http.get<CurrencyRate>(
      `${this.DEFAULT_URL}/latest?apikey=${this.API_KEY}&currencies=${toCurrencyCode}&base_currency=${fromCurrencyCode}`
    );
  }
}
