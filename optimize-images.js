const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
const outputDir = path.join(__dirname, 'public', 'images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(imagesDir);
  
  console.log('🖼️  Starting image optimization...\n');

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const ext = path.extname(file).toLowerCase();

    // Skip if not an image file or if it's SVG (already optimized)
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      console.log(`⏭️  Skipping ${file} (not a raster image)`);
      continue;
    }

    try {
      const outputPath = path.join(outputDir, file);
      const stats = fs.statSync(filePath);
      const originalSize = stats.size;

      // Optimize based on file type
      await sharp(filePath)
        .resize(1920, 1920, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .png({ 
          quality: 80, 
          compressionLevel: 9,
          effort: 10
        })
        .jpeg({ 
          quality: 82, 
          progressive: true,
          mozjpeg: true 
        })
        .webp({ 
          quality: 85 
        })
        .toFile(outputPath);

      const optimizedStats = fs.statSync(outputPath);
      const optimizedSize = optimizedStats.size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB`);
      console.log(`   Optimized: ${(optimizedSize / 1024).toFixed(1)} KB`);
      console.log(`   Saved: ${savings}%\n`);
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!');
  console.log('📁 Optimized images saved to:', outputDir);
  console.log('\n⚠️  Review the optimized images, then:');
  console.log('   1. Backup your original images folder');
  console.log('   2. Replace images with optimized versions');
  console.log('   3. Delete the images-optimized folder');
}

optimizeImages().catch(console.error);


