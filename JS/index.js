document.addEventListener("DOMContentLoaded", () => {

  const imagen = document.getElementById("img_carrusel");

  if (!imagen) {
    console.error("ERROR: No se encontró la imagen con id='img_carrusel'");
    return;
  }
  const imagenes = [
    "./IMG/IMG_Bienvenidos/1.jpeg",
    "./IMG/IMG_Bienvenidos/2.jpeg",
    "./IMG/IMG_Bienvenidos/3.jpeg",
    "./IMG/IMG_Bienvenidos/4.jpeg",
    "./IMG/IMG_Bienvenidos/5.jpeg",
    "./IMG/IMG_Bienvenidos/6.jpeg",
    "./IMG/IMG_Bienvenidos/7.jpeg",
    "./IMG/IMG_Bienvenidos/8.jpeg",
    "./IMG/IMG_Bienvenidos/9.jpeg",
    "./IMG/IMG_Bienvenidos/10.jpeg"
  ];

  let indice = 0;

  setInterval(() => {

    imagen.style.opacity = 0.3;
    setTimeout(() => {
      indice = (indice + 1) % imagenes.length;
      imagen.src = imagenes[indice];
      imagen.style.opacity = 1;
    }, 500);

  }, 5000);
});