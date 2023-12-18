const fs = require('fs');

// Список ідентифікаторів товарів (припустимо, що вони зберігаються у масиві)
const products = [
    2125156,
    
  // Додайте інші ідентифікатори товарів тут...
];

// Функція для генерації sitemap.xml зі списку товарів
function generateSitemap(products) {
  const baseUrl = 'https://www.beautyblossom.com.ua/product/';

  const urls = products.map(productId => {
    return `${baseUrl}${productId}`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(url => `<url><loc>${url}</loc></url>`).join('\n')}
    </urlset>`;

  fs.writeFileSync('sitemap.xml', xml, 'utf8');
}

generateSitemap(products);