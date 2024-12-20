import { Component, Input, OnInit } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css'],
  standalone: true,
  imports: [
    NgIf
  ]
})
export class TypewriterComponent implements OnInit {
  @Input() texts: string[] = []; // Lista de textos que queremos mostrar
  displayedText = ''; // Texto que se está mostrando actualmente
  currentTextIndex = 0; // Índice del texto actual
  isAdding = true; // Indicador de sse está escribiendo
  typingSpeed = 150; // Velocidad de la escritura en milisegundos
  delayBetweenTexts = 2000; // Tiempo que se muestra cada frase antes de cambiar (en milisegundos)

  ngOnInit(): void {
    this.startTypingLoop();
  }

  // Iniciar el bucle de escribir y cambiar de frases
  startTypingLoop(): void {
    this.typewrite(); // Empezar a escribir la primera frase
  }

  // Método que controla la lógica de escribir y eliminar el texto
  typewrite(): void {
    setTimeout(() => {
      const currentText = this.texts[this.currentTextIndex];

      if (this.isAdding) {
        // Modo escribir
        if (this.displayedText.length < currentText.length) {
          this.displayedText += currentText[this.displayedText.length]; // Añade la siguiente letra
          this.typewrite(); // Llama de nuevo para continuar escribiendo
        } else {
          // Cuando termina de escribir la frase
          this.isAdding = false; // Cambia a esperar antes de borrar o cambiar frase
          setTimeout(() => {
            this.isAdding = true; // Prepararse para la siguiente frase
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length; // Cambia al siguiente texto
            this.displayedText = ''; // Vacía el texto mostrado
            this.typewrite(); // Llama de nuevo para empezar a escribir la siguiente frase
          }, this.delayBetweenTexts); // Espera antes de pasar a la siguiente frase
        }
      }
    }, this.typingSpeed);
  }
}
