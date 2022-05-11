import asyncHandler from "express-async-handler";
import Car from "../models/carModel.js";

// @desc    Fetch all cars
// @route   GET /api/cars
// @access  Publicc
const getCars = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const cars = await Car.find({ ...keyword });
  res.json({ cars });
});

// @desc    Fetch single car
// @route   GET /api/cars/:id
// @access  Public
const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    res.json(car);
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (car) {
    await car.remove();
    res.json({ message: "Car removed" });
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = asyncHandler(async (req, res) => {
  const car = new Car({
    name: "Sample name",
    user: req.user._id,
    image: "/images/sample.jpg",
    images: [],
    fuel: "Sample fuel",
    numOfPeople: "Sample num of people",
    engine: "Sample engine",
    acceleration: "Sample acceleration",
    gearbox: "Sample gearbox",
    price: 0,
    category: "Sample category",
    description: "Sample description",
    reservedDays: [],
  });

  const createdCar = await car.save();
  res.status(201).json(createdCar);
});

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    images,
    fuel,
    numOfPeople,
    engine,
    acceleration,
    gearbox,
    price,
    category,
    description,
    reservedDays,
  } = req.body;

  const car = await Car.findById(req.params.id);

  if (car) {
    car.name = name;
    car.name = name;
    car.image = image;
    car.images = images;
    car.fuel = fuel;
    car.numOfPeople = numOfPeople;
    car.engine = engine;
    car.acceleration = acceleration;
    car.gearbox = gearbox;
    car.price = price;
    car.category = category;
    car.description = description;
    car.reservedDays = reservedDays;

    const updatedCar = await car.save();
    res.json(updatedCar);
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

// @desc    reserveDays
// @route   POST /api/cars/:id/reservation
// @access  Private
const reserveDays = asyncHandler(async (req, res) => {
  const { dates } = req.body;

  const car = await Car.findById(req.params.id);

  if (car) {
    const reservedDays = car.reservedDays.map((item) =>
      item.toLocaleDateString()
    );

    dates.forEach((date) => {
      if (reservedDays.includes(new Date(date).toLocaleDateString())) {
        res.status(400);
        throw new Error("Date already reserved");
      }
    });
    dates.forEach((date) => {
      car.reservedDays.push(date);
    });
    await car.save();

    res.status(201).json({ message: "Reservation added", dates });
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

export { getCars, getCarById, deleteCar, createCar, updateCar, reserveDays };
