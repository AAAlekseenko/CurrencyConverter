import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency-select.component.html',
  styleUrl: './currency-select.component.scss',
})
export class CurrencySelectComponent {
  @Input() currency: WritableSignal<string> = signal('USD');
  @Input() currencyList: string[] = [];
  @Output() valueChange = new EventEmitter();
}
