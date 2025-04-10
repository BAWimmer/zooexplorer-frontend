// // data/animals.js
// export const animals = [
//   {
//     id: '1',
//     name: 'Lion',
//     description:
//       'The king of the jungle, known for its majestic mane. Lions are social animals that live in prides and are apex predators in their habitat.',
//     imageUrl: '/images/lion.jpg',
//     habitat:
//       'Savannah, grasslands, and woodlands. Lions are primarily found in sub-Saharan Africa, with a small population in India.',
//     habitatTypes: ['Savannah', 'Grassland', 'Woodland'],
//     diet: 'Carnivorous – primarily preys on zebras, antelopes, and wildebeests.',
//     conservationStatus: 'Vulnerable',
//     lifespan: '10-14 years in the wild',
//     interestingFact: 'Lions are the only cats that live in groups, known as prides.'
//   },
//   {
//     id: '2',
//     name: 'Elephant',
//     description:
//       'The largest land animal with impressive tusks. Elephants are known for their intelligence, complex social structures, and strong family bonds.',
//     imageUrl: '/images/elephant.jpg',
//     habitat:
//       'Savannahs, forests, and grasslands. They roam wide areas in search of food and water.',
//     habitatTypes: ['Savannah', 'Forest', 'Grassland'],
//     diet: 'Herbivorous – grasses, fruits, bark, and leaves.',
//     conservationStatus: 'Endangered',
//     lifespan: '60-70 years',
//     interestingFact: 'Elephants have remarkable memory and can recognize themselves in a mirror.'
//   },
//   {
//     id: '3',
//     name: 'Giraffe',
//     description:
//       'The tallest land animal, recognized by its long neck and legs. Giraffes browse on treetops, which allows them to access food sources unavailable to other herbivores.',
//     imageUrl: '/images/giraffe.jpg',
//     habitat: 'Savannahs and woodlands, often in areas with scattered trees.',
//     habitatTypes: ['Savannah', 'Woodland'],
//     diet: 'Herbivorous – leaves, twigs, and fruits, particularly acacia trees.',
//     conservationStatus: 'Vulnerable',
//     lifespan: '25 years in the wild',
//     interestingFact:
//       'Despite their long necks, giraffes have the same number of neck vertebrae as humans—only seven.'
//   },
//   {
//     id: '4',
//     name: 'Zebra',
//     description:
//       'Famous for its unique black and white stripes. Zebras live in large herds and are known for their agility and strong herd instincts.',
//     imageUrl: '/images/zebra.jpg',
//     habitat:
//       'Grasslands and savannahs in Africa, where their stripes help confuse predators.',
//     habitatTypes: ['Grassland', 'Savannah'],
//     diet: 'Herbivorous – primarily grasses and shrubs.',
//     conservationStatus: 'Least Concern',
//     lifespan: '20-25 years in the wild',
//     interestingFact: 'Every zebra has a unique stripe pattern, much like a fingerprint.'
//   },
//   {
//     id: '5',
//     name: 'Penguin',
//     description:
//       'A flightless bird that thrives in cold climates. Penguins are excellent swimmers and are adapted to life in water rather than air.',
//     imageUrl: '/images/penguin.jpg',
//     habitat:
//       'Antarctic regions and cold coastal areas, with some species in temperate zones.',
//     habitatTypes: ['Coastal', 'Cold Climate'],
//     diet: 'Carnivorous – feeds on fish, squid, and krill.',
//     conservationStatus: 'Near Threatened',
//     lifespan: '15-20 years',
//     interestingFact: 'Penguins often mate for life and are known for their distinctive waddle.'
//   },
//   {
//     id: '6',
//     name: 'Kangaroo',
//     description:
//       'A marsupial native to Australia known for its powerful legs and pouch. Kangaroos are well adapted to the harsh Australian environment.',
//     imageUrl: '/images/kangaroo.jpg',
//     habitat:
//       'Australian bushlands and grasslands, thriving in various climates.',
//     habitatTypes: ['Grassland', 'Bushland'],
//     diet: 'Herbivorous – primarily grasses and shrubs.',
//     conservationStatus: 'Least Concern',
//     lifespan: '6-8 years in the wild',
//     interestingFact:
//       'Kangaroos can cover up to 25 feet in a single leap and can reach speeds of over 35 miles per hour.'
//   },
//   {
//     id: '7',
//     name: 'Panda',
//     description:
//       'A bear native to China, adored for its distinct black and white coat. Pandas are symbols of wildlife conservation and are known for their gentle nature.',
//     imageUrl: '/images/panda.jpg',
//     habitat:
//       'Temperate broadleaf and mixed forests in mountainous regions of China.',
//     habitatTypes: ['Forest', 'Jungle'],
//     diet: 'Herbivorous – primarily bamboo, supplemented with other vegetation.',
//     conservationStatus: 'Vulnerable',
//     lifespan: '20 years in the wild',
//     interestingFact:
//       'Pandas spend most of their day eating bamboo—up to 12 hours a day.'
//   },
//   // Additional entries start here
//   {
//     id: '8',
//     name: 'Tiger',
//     description:
//       'The largest of the cat species, renowned for its strength and distinctive striped coat.',
//     imageUrl: '/images/tiger.jpeg',
//     habitat: 'Forests, grasslands, and wetlands across Asia.',
//     habitatTypes: ['Forest', 'Grassland', 'Jungle'],
//     diet: 'Carnivorous – preys on deer, wild boar, and other mammals.',
//     conservationStatus: 'Endangered',
//     lifespan: '10-15 years in the wild',
//     interestingFact: 'Tigers are excellent swimmers and often cool off by swimming in water.'
//   },
//   {
//     id: '9',
//     name: 'Eagle',
//     description:
//       'A majestic bird of prey known for its sharp vision and soaring flight.',
//     imageUrl: '/images/eagle.jpeg',
//     habitat: 'Mountains, cliffs, and open landscapes.',
//     habitatTypes: ['Mountain', 'Grassland'],
//     diet: 'Carnivorous – typically feeds on fish, small mammals, and other birds.',
//     conservationStatus: 'Least Concern',
//     lifespan: '20-30 years in the wild',
//     interestingFact: 'Eagles can spot prey from up to several miles away thanks to their incredible eyesight.'
//   },
//   {
//     id: '10',
//     name: 'Parrot',
//     description:
//       'A vibrant bird famous for its ability to mimic sounds and its colorful plumage.',
//     imageUrl: '/images/parrot.jpeg',
//     habitat: 'Tropical and subtropical forests, jungles, and savannahs.',
//     habitatTypes: ['Forest', 'Jungle', 'Savannah'],
//     diet: 'Omnivorous – enjoys fruits, seeds, and occasionally small insects.',
//     conservationStatus: 'Varies by species',
//     lifespan: '20-50 years depending on the species',
//     interestingFact: 'Many parrot species can learn to mimic human speech remarkably well.'
//   },
//   {
//     id: '11',
//     name: 'Peacock',
//     description:
//       'A striking bird celebrated for its extravagant tail display during courtship.',
//     imageUrl: '/images/pecock.jpeg',
//     habitat: 'Forests, grasslands, and areas near water bodies in South Asia.',
//     habitatTypes: ['Forest', 'Grassland'],
//     diet: 'Omnivorous – typically consumes grains, insects, and small reptiles.',
//     conservationStatus: 'Least Concern',
//     lifespan: '15-20 years in captivity; shorter in the wild',
//     interestingFact: 'Peacocks fan out their remarkable tail feathers to attract mates and intimidate rivals.'
//   },
//   {
//     id: '12',
//     name: 'Crocodile',
//     description:
//       'A large aquatic reptile with powerful jaws and a prehistoric appearance.',
//     imageUrl: '/images/crocodile.jpeg',
//     habitat: 'Rivers, lakes, and wetlands in tropical and subtropical regions.',
//     habitatTypes: ['Wetland', 'Freshwater'],
//     diet: 'Carnivorous – feeds on fish, birds, and mammals.',
//     conservationStatus: 'Varies by species',
//     lifespan: '70-100 years in the wild',
//     interestingFact: 'Crocodiles are considered living fossils, having changed little since the time of the dinosaurs.'
//   },
//   {
//     id: '13',
//     name: 'Dolphin',
//     description:
//       'A highly intelligent aquatic mammal known for its playful behavior and acrobatic abilities.',
//     imageUrl: '/images/dolphin.jpeg',
//     habitat: 'Oceans and coastal areas around the world.',
//     habitatTypes: ['Ocean', 'Coastal'],
//     diet: 'Carnivorous – primarily consumes fish and squid.',
//     conservationStatus: 'Varies by species',
//     lifespan: '20-60 years depending on the species',
//     interestingFact: 'Dolphins use echolocation to navigate and hunt in murky waters.'
//   },
//   {
//     id: '14',
//     name: 'Frog',
//     description:
//       'A small amphibian known for its croaking calls, impressive leaping skills, and moist skin.',
//     imageUrl: '/images/frog.jpeg',
//     habitat: 'Freshwater environments such as ponds, streams, and wetlands.',
//     habitatTypes: ['Wetland', 'Freshwater'],
//     diet: 'Carnivorous – feeds on insects, worms, and other small invertebrates.',
//     conservationStatus: 'Varies by species',
//     lifespan: 'Approximately 10 years in the wild',
//     interestingFact: 'Some frog species can breathe through their skin in addition to using their lungs.'
//   }
// ];
