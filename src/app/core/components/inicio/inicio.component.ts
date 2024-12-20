import { Component, OnInit } from '@angular/core';
import {TypewriterComponent} from "../typewriter/typewriter.component";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true,
  imports: [
    TypewriterComponent,
    NgStyle
  ]
})
export class InicioComponent implements OnInit {
  heroImageUrl: string = 'http://localhost:5000/images/header.jpg';

  ngOnInit(): void {
  }
}
