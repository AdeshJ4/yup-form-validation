import React, { isValidElement, useState } from "react";

const FormWithoutValidation = () => {
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

  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const isValidPassword = (password) => {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCase = /[a-z]/;

    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCase.test(password)
    );
  };

  const isValidAge = (age) => {
    return parseInt(age) >= 18 && parseInt(age) <= 100;
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be 10 digits";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one symbol, one number";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Password must match";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (!isValidAge(formData.age)) {
      newErrors.age = "You must 18 years old and not older than 100 years";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (formData.interests.length === 0) {
      newErrors.interests = "Select at least one interest";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Date of birth is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  console.log("Error: ", errors);
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      console.log("Form Submitted", formData);
    } else {
      console.log("Form Validation failed");
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

export default FormWithoutValidation;
