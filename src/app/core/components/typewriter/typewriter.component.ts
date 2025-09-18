import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class TypewriterComponent implements OnInit, OnDestroy {
  @Input() texts: string[] = []; // Frases que se mostrarán
  @Input() typingSpeed = 150; // Velocidad en ms
  @Input() delayBetweenTexts = 2000; // Tiempo visible antes de borrar
  @Input() deletingSpeed = 75; // Velocidad al borrar (opcional)

  displayedText = '';
  currentTextIndex = 0;
  isAdding = true;
  private timeoutRef: any;

  ngOnInit(): void {
    this.startTypingLoop();
  }

  ngOnDestroy(): void {
    // Evitar que siga corriendo cuando el componente se destruye
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }
  }

  private startTypingLoop(): void {
    this.typewrite();
  }

  private typewrite(): void {
    const currentText = this.texts[this.currentTextIndex];

    if (this.isAdding) {
      // Escribiendo
      if (this.displayedText.length < currentText.length) {
        this.displayedText += currentText[this.displayedText.length];
        this.timeoutRef = setTimeout(() => this.typewrite(), this.typingSpeed);
      } else {
        // Espera antes de borrar
        this.isAdding = false;
        this.timeoutRef = setTimeout(() => this.typewrite(), this.delayBetweenTexts);
      }
    } else {
      // Borrando (letra por letra)
      if (this.displayedText.length > 0) {
        this.displayedText = this.displayedText.substring(0, this.displayedText.length - 1);
        this.timeoutRef = setTimeout(() => this.typewrite(), this.deletingSpeed);
      } else {
        // Pasa a la siguiente frase
        this.isAdding = true;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        this.timeoutRef = setTimeout(() => this.typewrite(), this.typingSpeed);
      }
    }
  }
}
