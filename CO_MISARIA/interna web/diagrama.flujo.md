````mermaid
sequenceDiagram
A[Inicio]--->B[Navegacion principal]
 B --> C[Muestra]
 C --> D[Sección Redes Sociales]
 D --> E[Footer]
 E --> F[Fin]

B --> B1[Navegación Principal]
    B1 --> B2[Inicio]
    B1 --> B3[Trámites]
    B1 --> B4[Denuncias]
    B1 --> B5[Tu Policía]
    B1 --> B6[Emergencias]

    E --> E1[Footer]
    E1 --> E2[Inicio]
    E1 --> E3[Denuncias]
    E1 --> E4[Tu Policía]
    E1 --> E5[Emergencias]
    