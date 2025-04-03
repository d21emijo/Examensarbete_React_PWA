# Examensarbete_React_PWA
npm version:10.9.2
## Creation from terminal
npx create-react-app my-app --template cra-template-pwa 

## How to run from terminal
npm run build

json-server --watch db.json --port 5000

serve -s build  

## Usage
o add/remove categories add a `const` and update the `set` state. the set state need to filtered based on "terms" that's included in the [db.JSON](/react-pwa/src/db.json)
To change how many products thats displayed change `maxSections` as it displayes the maximum nr of products based on the index

```
const CategoryList = () => {
  const [jackets, setJackets] = useState([]); // State för att lagra jackor
  const [shoes, setShoes] = useState([]); // State för att lagra skor
  const [pants, setPants] = useState([]); // State för att lagra Byxor
  const [puffers, setPuffers] = useState([]); // State för att lagra puffs

  const itemsPerSection = 3; // Antal produkter per sektion
  const maxSections = 5;      // Hur många sektioner som ska visas per kategori
```

```
    setJackets(fixedData.filter((p) => p.terms.toLowerCase().includes("jackets")));
    setShoes(fixedData.filter((p) => p.terms.toLowerCase().includes("shoes")));
    setPants(fixedData.filter((p) => p.terms.toLowerCase().includes("pants")));
    setPuffers(fixedData.filter((p) => p.terms.toLowerCase().includes("puffers")));
```

This is located in the [CategoriesList.js file](/react-pwa/src/components/Categories/CategoriesList.js)

## service worker

The fetch puts products in storage and the service worker intercepts this and puts images in storage aswell.
This is set to `CacheFirst` and is put in cache storage under `images`-
The entire db.JSON is put in the storage as a JSON, but only 10 pictures, to change: `maxEntries: 10`
```
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // 0 krävs för CORS
      }),
      new ExpirationPlugin({
        maxEntries: 10, // Max antal bilder i cache
        maxAgeSeconds: 7 * 24 * 60 * 60, // Sparas i en vecka
      }),
    ],
  })
);
```
This is located in the [Service-worker.js file](/react-pwa/src/service-worker.js)

## Testing