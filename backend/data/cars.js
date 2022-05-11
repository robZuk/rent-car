const imagesBentley = [
  "/images/bentley/img1.webp",
  "/images/bentley/img2.webp",
  "/images/bentley/img3.webp",
  "/images/bentley/img5.webp",
  "/images/bentley/img6.webp",
  "/images/bentley/img7.webp",
  "/images/bentley/img8.webp",
];


const imagesLamborghini = [
  "/images/lamborghini/img1.webp",
  "/images/lamborghini/img2.webp",
  "/images/lamborghini/img3.webp",
  "/images/lamborghini/img4.webp",
  "/images/lamborghini/img5.webp",
  "/images/lamborghini/img6.webp",
];

const imagesPorshe = [
  "/images/porshe/img1.webp",
  "/images/porshe/img2.webp",
  "/images/porshe/img3.webp",
  "/images/porshe/img4.webp",
  "/images/porshe/img5.webp",
];
const imagesBMW = [
  "/images/bmw/img1.webp",
  "/images/bmw/img2.webp",
  "/images/bmw/img3.webp",
  "/images/bmw/img4.webp",
  "/images/bmw/img5.webp",
];

const imagesAudi = [
  "/images/audi/img1.webp",
  "/images/audi/img2.webp",
  "/images/audi/img3.webp",
  "/images/audi/img4.webp",
  "/images/audi/img5.webp",
  "/images/audi/img6.webp",
  "/images/audi/img7.webp",
];
const imagesMercedes = [
  "/images/mercedes/img1.webp",
  "/images/mercedes/img2.webp",
  "/images/mercedes/img3.webp",
  "/images/mercedes/img4.webp",
];

const imagesMustang = [
  "/images/mustang/img1.jpg",
  "/images/mustang/img2.jpg",
  "/images/mustang/img3.jpg",
  "/images/mustang/img4.jpg",
  "/images/mustang/img5.jpg",
];

const imagesLexus = [
  "/images/lexus/img1.jpg",
  "/images/lexus/img2.jpg",
  "/images/lexus/img3.webp",
  "/images/lexus/img4.webp",
  "/images/lexus/img5.webp",
];

const imagesMaserati = [
  "/images/maserati/img1.jpg",
  "/images/maserati/img2.jpg",
  "/images/maserati/img3.jpg",
  "/images/maserati/img4.jpg",
  "/images/maserati/img5.jpg",

];

const cars = [
  {
    name: "Bentley Continental GT",
    image: "/images/bentley/img6.webp",
    images: [...imagesBentley],
    description: "Exclusive and very comfortable car ",
    fuel: "gasoline",
    category: "GT",
    numOfPeople: "5",
    engine: "V12 635KM",
    acceleration: "3,8",
    gearbox: "manual",
    price: 700,
    reservedDays: ["2021-04-24", "2021-04-25"],
  },

  {
    name: "Lamborghini Ursus",
    image: "/images/lamborghini/img6.webp",
    images: [...imagesLamborghini],
    description: "Exclusive and very comfortable car ",
    fuel: "gasoline",
    category: "SUV Coupe",
    numOfPeople: "4",
    engine: "	4,0 l twin-turbo 641KM",
    acceleration: "3,6",
    gearbox: "manual",
    price: 500,
    reservedDays: ["2021-04-29", "2021-04-30"],
  },
  {
    name: "Porshe 911 ",
    image: "/images/porshe/img3.webp",
    images: [...imagesPorshe],
    description: "Exclusive and very comfortable car ",
    fuel: "gasoline",
    category: "sport D",
    numOfPeople: "4",
    engine: "	3,0 l 385KM",
    acceleration: "4,2",
    gearbox: "manual",
    price: 300,
    reservedDays: ["2021-04-29", "2021-04-30"],
  },
  {
    name: "BMW X3 Competition",
    image: "/images/bmw/img5.webp",
    images: [...imagesBMW],
    description: "Exclusive and very comfortable car ",
    fuel: "gasoline",
    category: "SUV",
    numOfPeople: "5",
    engine: "	3,0l 510KM",
    acceleration: "4,1",
    gearbox: "automat",
    price: 140,
    reservedDays: [],
  },
  {
    name: "Audi Q8",
    image: "/images/audi/img7.webp",
    images: [...imagesAudi],
    description: "Exclusive and very comfortable car ",
    fuel: "diesel",
    category: "SUV",
    numOfPeople: "5",
    engine: "	3,0l 286KM",
    acceleration: "6,3",
    gearbox: "automat",
    price: 280,
    reservedDays: [],
  },
  {
    name: "Mercedes S560",
    image: "/images/mercedes/img4.webp",
    images: [...imagesMercedes],
    description: "Exclusive and very comfortable car ",
    fuel: "diesel",
    category: "Coupe",
    numOfPeople: "5",
    engine: "4,0 l 469KM",
    acceleration: "4,6",
    gearbox: "automat",
    price: 300,
    reservedDays: [],
  },
  {
    name: "Ford Mustang Mach 1",
    image: "/images/mustang/img1.jpg",
    images: [...imagesMustang],
    description: "Exclusive and very comfortable car ",
    fuel: "gasoline",
    category: "GT",
    numOfPeople: "5",
    engine: "5,0 l 460KM",
    acceleration: "5,2",
    gearbox: "automat",
    price: 200,
    reservedDays: [],
  },
    {
    name: "Lexus IS",
    image: "/images/lexus/img5.webp",
    images: [...imagesLexus],
    description: "Exclusive and very comfortable car ",
    fuel: "gasoline",
    category: "D",
    numOfPeople: "5",
    engine: "3,0 l 214KM",
    acceleration: "5,2",
    gearbox: "manual",
    price: 200,
    reservedDays: [],
  },

      {
    name: "Maserati Gran Tourismo",
    image: "/images/maserati/img1.jpg",
    images: [...imagesMaserati],
    description: "Exclusive and very comfortable car ",
    fuel: "gasoline",
    category: "Sport",
    numOfPeople: "5",
    engine: "4,7 V8 440KM",
    acceleration: "3,8",
    gearbox: "manual",
    price: 180,
    reservedDays: [],
  },
];

export default cars;
