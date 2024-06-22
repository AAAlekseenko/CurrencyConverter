import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyService } from '../shared/currency.service';
import { CurrencySelectComponent } from '../currency-select/currency-select.component';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';
import { CurrencyRate, ResponseCurrency } from '../shared/currency.interface';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CurrencySelectComponent,
    CurrencyInputComponent,
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent implements OnInit {
  currency: string[] = [];
  currentCurrency: Record<string, number> = {};

  // Сигналы просто так использовал для интереса, ибо красивое
  fromCurrencyCode = signal('USD');
  toCurrencyCode = signal('RUB');
  fromCurrencyInput = signal(1);
  toCurrencyInput = signal(0);

  currentRate = signal(0);

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService
      .getAllPossiblesCurrency()
      .subscribe((res: ResponseCurrency) => {
        this.currency = Object.keys(res.data);

        this.currencyService
          .getCurrencyRateByCurrencyCode(
            this.fromCurrencyCode(),
            this.toCurrencyCode()
          )
          .subscribe((res: CurrencyRate) => {
            this.currentCurrency = res.data;
            this.currentRate.set(res.data[this.toCurrencyCode()]);
            this.toCurrencyInput.set(Number(this.currentRate().toFixed(3)));
          });
      });
  }

  // Выглядит как костыль, но ничего дельного за короткое время не придумал
  changeFromCurrency(value: number, code: string) {
    if (this.currentCurrency[code] !== undefined) {
      this.fromCurrencyInput.set(value);
      this.toCurrencyInput.set(Number((value / this.currentRate()).toFixed(3)));
    } else {
      this.fromCurrencyInput.set(value);
      this.toCurrencyInput.set(Number((value * this.currentRate()).toFixed(3)));
    }
  }

  changeToCurrency(value: number, code: string) {
    if (this.currentCurrency[code] !== undefined) {
      this.toCurrencyInput.set(value);
      this.fromCurrencyInput.set(Number((value / this.currentRate()).toFixed(3)));
    } else {
      this.toCurrencyInput.set(value);
      this.fromCurrencyInput.set(Number((value * this.currentRate()).toFixed(3)));
    }
  }

  changeCurrencyType() {
    this.currencyService
      .getCurrencyRateByCurrencyCode(
        this.fromCurrencyCode(),
        this.toCurrencyCode()
      )
      .subscribe((res: CurrencyRate) => {
        this.currentCurrency = res.data;
        this.currentRate.set(res.data[this.toCurrencyCode()]);
        this.toCurrencyInput.set(Number((this.fromCurrencyInput() * this.currentRate()).toFixed(3)));
      });
  }

  changePosition() {
    this.changeCodePosition();
    this.changeInputPosition();
  }

  // Первая проблема с сигналами, с ними нельзя сделать так [a, b] = [b, a]
  private changeCodePosition() {
    const prevFromCurrencyCode = this.fromCurrencyCode();

    this.fromCurrencyCode.set(this.toCurrencyCode());
    this.toCurrencyCode.set(prevFromCurrencyCode);
  }

  private changeInputPosition() {
    const prevFromCurrencyInput = this.fromCurrencyInput();

    this.fromCurrencyInput.set(this.toCurrencyInput());
    this.toCurrencyInput.set(prevFromCurrencyInput);
  }
}
