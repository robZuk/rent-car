import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ModalCalendar from "../components/ModalCalendar";
import { listCarDetails, updateCar } from "../actions/carActions";
import { CAR_UPDATE_RESET } from "../constants/carConstants";

function CarEditScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const carId = params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [fuel, setFuel] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [engine, setEngine] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [reservedDays, setReservedDays] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadImageError, setUploadImageError] = useState("");
  const [uploadImagesError, setUploadImagesError] = useState("");

  const carDetails = useSelector((state) => state.carDetails);
  const { loading, error, car } = carDetails;

  const carUpdate = useSelector((state) => state.carUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = carUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CAR_UPDATE_RESET });
      navigate("/admin/carlist");
    } else {
      if (!car.name || car._id !== carId) {
        dispatch(listCarDetails(carId));
      } else {
        setName(car.name);
        setImage(car.image);
        setImages(car.images);
        setFuel(car.fuel);
        setNumOfPeople(car.numOfPeople);
        setEngine(car.engine);
        setAcceleration(car.acceleration);
        setGearbox(car.gearbox);
        setPrice(car.price);
        setCategory(car.category);
        setDescription(car.description);
        setReservedDays(car.reservedDays.map((day) => day.substring(0, 10)));
      }
    }
  }, [dispatch, navigate, carId, car, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true); //spinner

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploadImageError(
        "Invalid file format. The correct file format is .jpg .jpeg .png .webp"
      );
      setUploading(false);
    }
  };

  const uploadFilesHandler = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload/images", formData, config);
      setImages([...data]);

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploadImagesError(
        "Invalid file format. The correct file format is .jpg .jpeg .png .webp"
      );
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCar({
        _id: carId,
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
      })
    );
  };

  return (
    <div className="container">
      <Link to="/admin/carlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <div
        className="container"
        style={{
          height: "40vh",
          marginTop: "5vh",
        }}
      >
        <div className="row justify-content-center">
          <div
            className="col-12 col-md-8 col-lg-6"
            style={{
              border: ".5px solid lightgray",
              borderRadius: "5px",
              padding: "30px",
            }}
          >
            <h4>Edit Car</h4>
            {loadingUpdate && <Loader />}
            {errorUpdate && (
              <Message variant="alert-danger">{errorUpdate}</Message>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {uploadImageError && (
                  <Message variant="alert-danger">{uploadImageError}</Message>
                )}
                <div className="">
                  <label htmlFor="image-file" className="form-label my-0">
                    Main image
                  </label>
                  <ul className="list-group-flush p-0 m-0">
                    <li className="list-group-item">{image}</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="file"
                    id="image-file"
                    onChange={uploadFileHandler}
                  />
                  {uploading && <Loader />}
                </div>
                {uploadImagesError && (
                  <Message variant="alert-danger">{uploadImagesError}</Message>
                )}
                <div className="">
                  <label htmlFor="images" className="form-label my-0">
                    Images:
                  </label>
                  <ul className="list-group-flush p-0 m-0">
                    {images &&
                      images.map((image) => (
                        <li className="list-group-item" key={image}>
                          {image}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="file"
                    id="image-file"
                    multiple
                    aria-label="Upload"
                    onChange={uploadFilesHandler}
                  />
                  {uploading && <Loader />}
                </div>
                <div className="mb-3">
                  <label htmlFor="fuel" className="form-label">
                    Fuel
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fuel"
                    name="fuel"
                    placeholder="Enter fuel"
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numOfPeople" className="form-label">
                    Number Of People
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="numOfPeople"
                    name="numOfPeople"
                    placeholder="Enter numOfPeople"
                    value={numOfPeople}
                    onChange={(e) => setNumOfPeople(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="acceleration" className="form-label">
                    Acceleration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="acceleration"
                    name="acceleration"
                    placeholder="Enter acceleration"
                    value={acceleration}
                    onChange={(e) => setAcceleration(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gearbox" className="form-label">
                    Gearbox
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="gearbox"
                    name="gearbox"
                    placeholder="Enter gearbox"
                    value={gearbox}
                    onChange={(e) => setGearbox(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="">
                  <label className="form-label my-0">Reserved days: </label>
                  <ul className="list-group-flush p-0 m-0">
                    {reservedDays &&
                      reservedDays.map((day) => (
                        <li className="list-group-item" key={day}>
                          {day}
                        </li>
                      ))}
                  </ul>
                  <div className="my-1">
                    <button
                      type="button"
                      className="btn btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#modalCalendar"
                      style={{ width: "110px", backgroundColor: "#e9ecef" }}
                    >
                      Choose dates
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-cardialred mt-3">
                  Update/Create Car
                </button>
              </form>
            )}
            <ModalCalendar
              id={carId}
              setReservedDatesByAdmin={setReservedDays}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarEditScreen;
