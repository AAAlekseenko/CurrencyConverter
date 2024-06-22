export interface ResponseCurrency {
  data: Record<string, Currency>;
}

export interface Currency {
  code: string;
  decimal_digits: number;
  name: string;
  name_plural: string;
  rounding: number;
  symbol: string;
  symbol_native: string;
  type: string;
}

export interface CurrencyRate {
  data: Record<string, number>;
}
