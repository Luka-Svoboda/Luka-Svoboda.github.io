const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');
const overlayImage = document.getElementById("overlay-image");

const imageFilenames = [
  '/wa/wa11/gallery-start/images/porsche.jpg',
  '/wa/wa11/gallery-start/images/audi.jpg',
  '/wa/wa11/gallery-start/images/pagani.jpg',
  '/wa/wa11/gallery-start/images/BMW.jpg',
  '/wa/wa11/gallery-start/images/stagea.jpg'
];

const altText = {
  '/wa/wa11/gallery-start/images/porsche.jpg': 'Porsche 911 GT',
  '/wa/wa11/gallery-start/images/audi.jpg': 'Audi RS4',
  '/wa/wa11/gallery-start/images/pagani.jpg': 'Pagani Huyra',
  '/wa/wa11/gallery-start/images/BMW.jpg': 'E30 BMW M3',
  '/wa/wa11/gallery-start/images/stagea.jpg': 'Nissan Stagea'
};

for (let i = 0; i < imageFilenames.length; i++) {
  const filename = imageFilenames[i];
  const imgElement = document.createElement('img');
  imgElement.src = filename;
  imgElement.alt = altText[filename];

  imgElement.addEventListener('click', () => {
    displayedImage.src = filename;
    displayedImage.alt = altText[filename];
  });

  thumbBar.appendChild(imgElement);
}

btn.addEventListener('click', function () {
  const currentClassName = btn.getAttribute("class");

  if (currentClassName === "open") {
    btn.setAttribute("class", "closed");
    btn.textContent = "Closed";
    overlayImage.src = 'gallery-start/images/garage.jpg';
    overlay.style.display = 'block';

  } else {
    btn.setAttribute("class", "open");
    btn.textContent = "Open";
    overlayImage.src = 'gallery-start/images/transparent.png';
    overlay.style.display = 'none';
  }
});