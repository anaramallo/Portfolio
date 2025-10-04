import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css'],
  standalone: true
})
export class TypewriterComponent implements OnInit, OnDestroy {
  @Input() texts: string[] = [];
  @Input() typingSpeed = 120;        // ms por carácter
  @Input() delayBetweenTexts = 1800; // tiempo visible antes de desaparecer
  @Input() fadeDuration = 500;       // ms del desvanecido
  @Input() pauseBeforeNext = 200;    // pausa en blanco antes de empezar la siguiente

  displayedText = '';
  currentTextIndex = 0;
  isFading = false;

  private timeoutRef: any = null;

  ngOnInit(): void {
    this.typeNextChar();
  }

  ngOnDestroy(): void {
    if (this.timeoutRef) clearTimeout(this.timeoutRef);
  }

  private typeNextChar(): void {
    const full = this.texts[this.currentTextIndex] ?? '';

    if (this.displayedText.length < full.length) {
      this.displayedText += full[this.displayedText.length];
      this.timeoutRef = setTimeout(() => this.typeNextChar(), this.typingSpeed);
      return;
    }

    // Texto completo mostrado: espera y luego desvanece
    this.timeoutRef = setTimeout(() => this.startFadeOut(), this.delayBetweenTexts);
  }

  private startFadeOut(): void {
    this.isFading = true;
    this.timeoutRef = setTimeout(() => {
      this.isFading = false;
      this.displayedText = '';
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      this.timeoutRef = setTimeout(() => this.typeNextChar(), this.pauseBeforeNext);
    }, this.fadeDuration);
  }
}
