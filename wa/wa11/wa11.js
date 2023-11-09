const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const imageFilenames = [
  '/wa/wa11/gallery-start/images/porsche.jpg',
  '/wa/wa11/gallery-start/images/audi.jpg',
  '/wa/wa11/gallery-start/images/pagani.jpg',
  '/wa/wa11/gallery-start/images/BMW.jpg',
  '/wa/wa11/gallery-start/images/stagea.jpg'
];

const altText = {
  '/wa/wa11/gallery-start/images/porsche.jpg': 'Porsche Stinger',
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

  const newImage = document.createElement('img');
    newImage.setAttribute('src', imageFilenames);
    newImage.setAttribute('alt', altText);
    thumbBar.appendChild(imgElement);
}


btn.addEventListener('click', () => {
  if (overlay.style.backgroundColor === 'rgba(0, 0, 0, 0.5)') {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  } else {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  }
});