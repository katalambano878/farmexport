const fs = require('fs');
const path = require('path');

const colors = {
  primary: '#107038',
  secondary: '#AB6400',
  accent: '#FCC419',
  dark: '#0A2918',
  light: '#F8FAFC',
  muted: '#E2E8F0'
};

const images = [
  {
    name: 'hero-bg.svg',
    content: `<svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.dark}" />
      <circle cx="10%" cy="20%" r="300" fill="${colors.primary}" opacity="0.1" />
      <circle cx="90%" cy="80%" r="400" fill="${colors.secondary}" opacity="0.1" />
      <path d="M0 900 L1440 800 L1440 900 Z" fill="${colors.primary}" opacity="0.2" />
    </svg>`
  },
  {
    name: 'hero-product.jpg', // Saving as SVG but keeping extension reference or will update refs
    content: `<svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.light}" />
      <rect x="100" y="100" width="600" height="800" rx="20" fill="${colors.muted}" />
      <circle cx="400" cy="400" r="200" fill="${colors.primary}" opacity="0.2" />
      <text x="50%" y="50%" font-family="Arial" font-size="40" fill="${colors.dark}" text-anchor="middle">Premium Shea Butter</text>
      <rect x="200" y="650" width="400" height="50" rx="10" fill="${colors.secondary}" opacity="0.8" />
    </svg>`
  },
  {
    name: 'shea-butter.jpg',
    content: `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.light}" />
      <circle cx="300" cy="200" r="120" fill="#F8E4B0" />
      <text x="50%" y="50%" font-family="Arial" font-size="30" fill="${colors.dark}" text-anchor="middle">Shea Butter</text>
    </svg>`
  },
  {
    name: 'shea-oil.jpg',
    content: `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.light}" />
      <rect x="250" y="100" width="100" height="200" rx="10" fill="#E8C547" opacity="0.8" />
      <text x="50%" y="90%" font-family="Arial" font-size="30" fill="${colors.dark}" text-anchor="middle">Shea Oil</text>
    </svg>`
  },
  {
    name: 'soybean.jpg',
    content: `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.light}" />
      <circle cx="200" cy="200" r="30" fill="#D4C779" />
      <circle cx="300" cy="200" r="30" fill="#D4C779" />
      <circle cx="400" cy="200" r="30" fill="#D4C779" />
      <circle cx="250" cy="250" r="30" fill="#D4C779" />
      <circle cx="350" cy="250" r="30" fill="#D4C779" />
      <text x="50%" y="90%" font-family="Arial" font-size="30" fill="${colors.dark}" text-anchor="middle">Soybean</text>
    </svg>`
  },
  {
    name: 'baobab.jpg',
    content: `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.light}" />
      <path d="M300 100 L350 200 L450 200 L370 280 L400 380 L300 320 L200 380 L230 280 L150 200 L250 200 Z" fill="${colors.primary}" opacity="0.3" />
      <text x="50%" y="50%" font-family="Arial" font-size="30" fill="${colors.dark}" text-anchor="middle">Baobab</text>
    </svg>`
  },
  {
    name: 'process.svg',
    content: `<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.light}" />
      <path d="M100 300 Q300 100 500 300 T900 300" stroke="${colors.primary}" stroke-width="5" fill="none" />
      <circle cx="100" cy="300" r="20" fill="${colors.secondary}" />
      <circle cx="300" cy="300" r="20" fill="${colors.secondary}" />
      <circle cx="500" cy="300" r="20" fill="${colors.secondary}" />
      <text x="50%" y="90%" font-family="Arial" font-size="30" fill="${colors.dark}" text-anchor="middle">Our Process</text>
    </svg>`
  },
  {
    name: 'export.svg',
    content: `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.light}" />
      <rect x="100" y="150" width="400" height="200" fill="${colors.primary}" opacity="0.2" />
      <path d="M50 350 L550 350 L500 400 L100 400 Z" fill="${colors.dark}" />
      <text x="50%" y="50%" font-family="Arial" font-size="30" fill="${colors.dark}" text-anchor="middle">Global Export</text>
    </svg>`
  },
  {
    name: 'export-logistics.jpg',
    content: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.light}" />
      <rect x="50" y="50" width="700" height="500" rx="20" fill="${colors.muted}" />
      <path d="M100 400 L700 400" stroke="${colors.primary}" stroke-width="10" />
      <circle cx="200" cy="300" r="50" fill="${colors.secondary}" opacity="0.6" />
      <circle cx="600" cy="300" r="50" fill="${colors.secondary}" opacity="0.6" />
      <text x="50%" y="50%" font-family="Arial" font-size="40" fill="${colors.dark}" text-anchor="middle">Logistics Network</text>
    </svg>`
  },
  {
    name: 'about-hero.svg',
    content: `<svg width="1440" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.dark}" />
      <path d="M0 600 C400 500 1000 500 1440 600 L1440 0 L0 0 Z" fill="${colors.primary}" opacity="0.1" />
      <text x="50%" y="50%" font-family="Arial" font-size="60" fill="white" opacity="0.1" text-anchor="middle">Cultivating Excellence</text>
    </svg>`
  },
  {
    name: 'about-farm.jpg',
    content: `<svg width="600" height="800" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${colors.light}" />
      <rect x="0" y="400" width="600" height="400" fill="${colors.primary}" opacity="0.3" />
      <circle cx="300" cy="200" r="100" fill="${colors.secondary}" opacity="0.2" />
      <text x="50%" y="50%" font-family="Arial" font-size="40" fill="${colors.dark}" text-anchor="middle">Our Farms</text>
    </svg>`
  }
];

const dir = path.join(__dirname, 'public/images');

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

images.forEach(img => {
  // If name ends in .jpg, we save as .svg but need to handle the file properly or rename the reference.
  // Ideally, rename references in code. For now, I will save them as .svg and we will bulk replace .jpg with .svg in code.
  const fileName = img.name.replace('.jpg', '.svg');
  fs.writeFileSync(path.join(dir, fileName), img.content);
  console.log(`Generated ${fileName}`);
});





