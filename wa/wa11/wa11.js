const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');
const image = document.getElementById("image");

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

  const newImage = document.createElement('img');
    newImage.setAttribute('src', imageFilenames);
    newImage.setAttribute('alt', altText);
    thumbBar.appendChild(imgElement);
}


btn.addEventListener('click', function() {
    const currentClassName = btn.getAttribute("class");

    if (currentClassName === "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";

        image.src = 'https://mobileimages.lowes.com/productimages/fc3b6d0a-52ea-45bc-8782-ae27c5e01f33/41418313.jpg';
      } else {
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        image.src = "";
      }
    });
    
    
    
    
    
    