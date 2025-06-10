# Examensarbete_React_PWA
npm version:10.9.2
## Creation from terminal
npx create-react-app my-app --template cra-template-pwa 

## How to run from terminal
npm run build

have json server installed (npm install json-server"
json-server --watch db.json --port 5000

serve -s build  (serve build on port 3000)

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
The entire db.JSON is put in the storage as a JSON, but only 10 pictures that is fetched, to change the amount of pictues fetched : `maxEntries: 10`
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
Make sure that the service worker is running in devtools application:
![image](https://github.com/user-attachments/assets/1797c7e4-a80e-48b6-b35c-a170bb0d7cd5)

and that cache is used:
![image](https://github.com/user-attachments/assets/1c9be015-65f6-4b0e-9ea8-c637e7707937)

service worker used for the fetch:
![image](https://github.com/user-attachments/assets/7b987076-1312-459d-bf59-c8964e6df44d)

this will make it work online, aswell as offline:
![image](https://github.com/user-attachments/assets/e10025a5-f0ed-418d-b085-643f7c62c17d)

