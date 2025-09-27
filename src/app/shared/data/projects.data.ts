import {ProjectStatus} from "../types/project-status";

export interface Project {
  title: string;
  description: string;
  imagePath: string;
  link: string;
  status: ProjectStatus;
  badges?: string[];
  featured?: boolean;
}

export const PROJECTS: Readonly<Project[]> = [

  {
    title: 'ANÁLISIS DE DATOS',
    description: 'Procesamiento de datos usando Machine Learning para predecir tendencias de mercado.',
    imagePath: 'images/p1_mlearning.jpg',
    link: '#',
    status: ProjectStatus.InProgress,
    badges: ['Angular','Python','SQL'],
    featured: true
  },
  {
    title: 'PORTFOLIO INTERACTIVO',
    description: 'SPA en Angular con diseño responsive y pruebas básicas de componentes.',
    imagePath: 'images/p3_portfolio.png',
    link: '#',
    status: ProjectStatus.Live,
    badges: ['Angular','Java','Node','Tailwind'],
    featured: true
  },
  {
    title: 'RESERVAS PARKING AUTOCARAVANAS',
    description: 'App móvil para gestionar reservas en un parking de autocaravanas.',
    imagePath: 'images/p2_parking.jpg',
    link: '#',
    status: ProjectStatus.ComingSoon,
    badges: ['Ionic','Firebase']
  }
];
