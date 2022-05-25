import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Tooltip } from "bootstrap";

const ContactScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const tooltipEmailRef = useRef();
  const tooltipNameRef = useRef();

  useEffect(() => {
    const refs = [tooltipEmailRef, tooltipNameRef];
    success && navigate("/contact/confirm-message");

    refs.forEach((ref) => new Tooltip(ref.current));
  }, [success, navigate]);

  async function submitHandler() {
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/robert.aleks.zuk@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
            name: name,
            message: message,
          }),
        }
      );
      let data = await response.json();
      data && setSuccess(data.success);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container my-4">
      <Link className="h4 text-cardialred text-decoration-none fw-bold" to="/">
        CAR RENTAL
      </Link>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 pe-md-5">
            <h4>Contact Form</h4>
            <form onSubmit={handleSubmit(submitHandler)}>
              <label htmlFor="email" className="form-label">
                Email address:
              </label>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-envelope-fill text-secondary"></i>
                </span>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                  type="text"
                  id="email"
                  className={`form-control ${
                    errors.email ? `is-invalid` : !isSubmitted ? "" : `is-valid`
                  }`}
                  placeholder="e.g. robert@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* <!-- tooltip --> */}
                <span className="input-group-text">
                  <span
                    ref={tooltipEmailRef}
                    data-bs-placement="bottom"
                    title="Enter an email address."
                  >
                    <i className="bi bi-question-circle text-secondary"></i>
                  </span>
                </span>
                <div className="valid-feedback">Looks good!</div>
                {/* errors */}
                {errors.email?.type === "required" && (
                  <div className="invalid-feedback">Please enter an email.</div>
                )}
                {errors.email?.type === "pattern" && (
                  <div className="invalid-feedback">Invalid email address.</div>
                )}
              </div>

              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill text-secondary"></i>
                </span>
                <input
                  {...register("name", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                  })}
                  type="text"
                  id="name"
                  className={`form-control ${
                    errors.name ? `is-invalid` : !isSubmitted ? "" : `is-valid`
                  }`}
                  placeholder="e.g. Robert"
                  onChange={(e) => setName(e.target.value)}
                />
                {/* <!-- tooltip --> */}
                <span className="input-group-text">
                  <span
                    ref={tooltipNameRef}
                    data-bs-placement="bottom"
                    title="Enter name"
                  >
                    <i className="bi bi-question-circle text-secondary"></i>
                  </span>
                </span>
                <div className="valid-feedback">Looks good!</div>
                {errors.name?.type === "required" && (
                  <div className="invalid-feedback">Please enter a name.</div>
                )}
                {(errors.name?.type === "maxLength" ||
                  errors.name?.type === "minLength") && (
                  <div className="invalid-feedback">
                    Your name must be 8-20 characters long
                  </div>
                )}
              </div>

              <label htmlFor="message" className="form-label">
                Message:
              </label>
              <div className="mb-4 form-floating">
                <textarea
                  {...register("query", {
                    required: true,
                  })}
                  className={`form-control ${
                    errors.query ? `is-invalid` : !isSubmitted ? "" : `is-valid`
                  }`}
                  id="query"
                  style={{ height: "140px" }}
                  placeholder="query"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <label htmlFor="query">Your message...</label>
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please enter a message.</div>
              </div>
              <div className="mb-2 ">
                <button type="submit" className="btn btn-cardialred">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 my-5 bg-light rounded-3 d-flex flex-column justify-content-center ">
            <h6 className="mb-3 mx-5 mt-4 fs-4">Car Rental</h6>
            <p className="mx-5">
              <i className="bi bi-signpost-split text-secondary"></i> 49 Andrea
              Papandreou Str., Amoudara, Heraklion, 71414
            </p>
            <p className="mx-5">
              <i className="bi bi-envelope text-secondary"></i> E-mail:
              info@cr.com
            </p>
            <p className="mx-5">
              <i className="bi bi-telephone text-seconadry"></i> Phone: +30 2810
              288051, +30 6974710863
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
