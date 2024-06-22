import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.scss',
})
export class CurrencyInputComponent {
  @Input() value = signal(0);
  @Input() type = 'number';
  @Input() name = 'Жесть костыли';
  @Output() valueChange = new EventEmitter();
}
