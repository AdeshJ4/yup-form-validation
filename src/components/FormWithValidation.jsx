import React, { useState } from "react";
import * as Yup from "yup";

const FormWithValidation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one upper case letter")
      .matches(/[a-z]/, "Password must contain at least one lower case letter")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Confirm password is required"),
    age: Yup.number()
      .typeError("Age must be at least 18 years old")
      .min(18, "You must be at least 18 years old")
      .max(100, "You can not be older than 100 years old")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array()
      .min(1, "Select at least on interest")
      .required("Select at least on interest"),
    birthDate: Yup.date().required("Date of Birth is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const parsedData = validationSchema.cast(formData);

      console.log("Form Submitted - formData", formData);
      console.log("Form Submitted - parsedData", parsedData);
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      console.log("newErrors: ", newErrors);

      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }

    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* firstName */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter FirstName"
            className="form-control"
          />
          {errors.firstName && (
            <div className="text-danger">{errors.firstName}</div>
          )}
        </div>

        {/* lastName */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter LastName"
            className="form-control"
          />
          {errors.lastName && (
            <div className="text-danger">{errors.lastName}</div>
          )}
        </div>

        {/* email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        {/* phoneNumber */}
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="form-control"
          />
          {errors.phoneNumber && (
            <div className="text-danger">{errors.phoneNumber}</div>
          )}
        </div>

        {/* password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            className="form-control"
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>

        {/* confirmPassword */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            confirmPassword:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="confirmPassword"
            className="form-control"
          />
          {errors.confirmPassword && (
            <div className="text-danger">{errors.confirmPassword}</div>
          )}
        </div>

        {/* age */}
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="age"
            className="form-control"
          />
          {errors.age && <div className="text-danger">{errors.age}</div>}
        </div>

        {/* gender */}
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
          >
            <option>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        {errors.gender && <div className="text-danger">{errors.gender}</div>}

        {/* interests */}
        <div className="mb-3">
          <label htmlFor="interests" className="form-label">
            Interests:
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="coding"
              id="coding"
              checked={formData.interests.includes("coding")}
              onChange={handleCheckBoxChange}
            />
            <label className="form-check-label" htmlFor="coding">
              Coding
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="sports"
              id="sports"
              checked={formData.interests.includes("sports")}
              onChange={handleCheckBoxChange}
            />
            <label className="form-check-label" htmlFor="sports">
              Sports
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="reading"
              id="reading"
              checked={formData.interests.includes("reading")}
              onChange={handleCheckBoxChange}
            />
            <label className="form-check-label" htmlFor="reading">
              Reading
            </label>
          </div>
          {errors.interests && (
            <div className="text-danger">{errors.interests}</div>
          )}
        </div>

        {/* dateOfBirth */}
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Date Of birth
          </label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            className="form-control"
            value={formData.birthDate}
            onChange={handleChange}
            placeholder="Enter birth date"
          />
          {errors.birthDate && (
            <div className="text-danger">{errors.birthDate}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default FormWithValidation;
