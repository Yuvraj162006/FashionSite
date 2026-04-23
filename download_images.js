const fs = require('fs');

const images = [
    "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg", 
    "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", 
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", 
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop", 
    "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg", 
    "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg", 
    "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", 
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2600&auto=format&fit=crop", 
    "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg", 
    "https://images.unsplash.com/photo-1519238397914-b2584fa9e28f?q=80&w=2000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=2000&auto=format&fit=crop", 
    "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", 
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=2000&auto=format&fit=crop", 
    "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg", 
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2000&auto=format&fit=crop" 
];

async function download() {
    for (let i = 0; i < images.length; i++) {
        const url = images[i];
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            fs.writeFileSync(`public/images/product-${i+1}.jpg`, buffer);
            console.log(`Downloaded product-${i+1}.jpg`);
        } catch (e) {
            console.error(`Failed to download ${url}: ${e}`);
        }
    }
    
    // Update products.js
    let content = fs.readFileSync('src/data/products.js', 'utf8');
    let j = 1;
    content = content.replace(/image: ".*?"/g, () => {
        const localUrl = `/images/product-${j}.jpg`;
        j++;
        return `image: "${localUrl}"`;
    });
    fs.writeFileSync('src/data/products.js', content, 'utf8');
    console.log("Updated products.js");
}

download();
