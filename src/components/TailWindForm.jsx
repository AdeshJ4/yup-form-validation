import React, { useState } from 'react'

const TailWindForm = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        age: "",
        category: "",
        gender: "",
        interests: [],
        birthDate: "",
      });
    
      const [errors, setErrors] = useState({});
    
    
      const isValidEmail = (email) => { 
         const emailRegex = /^\S+@\S+\.\S+$/;
         return emailRegex.test(email);
      }
    
      const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex(phoneNumber);
      }
    
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
    
      const validateForm = () => {
        const newErrors = {};
        if(!formData?.firstName){
          newErrors.firstName = "FirstName is required"
        }
        if(!formData?.lastName){
          newErrors.lastName = "LastName is required"
        }
        if(!formData.age){
          newErrors.age = "Age is required"
        }
        if(!formData?.email){
          newErrors.email = "Email is required"
        }
        else if(!isValidEmail(email)){
          newErrors.email = "Invalid Email format"
        }
        if(!formData.phoneNumber) {
          newErrors.phoneNumber = "Phone number is required"
        }else if(!isValidPhoneNumber(formData.phoneNumber)){
          newErrors.phoneNumber = "Phone number must be 10 digits"
        }
        if(!formData.password){
          newErrors.password = "Password is required";
        }else if(!isValidPassword(formData.password)){
          newErrors.password = "Password must be at least 8 characters long and contain at least one symbol, one number"
        }
        if(!formData.confirmPassword){
          newErrors.confirmPassword = "Confirm Password is required";
        }else if(formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Password must match"
        }
        if(!formData.gender){
          newErrors.gender = "Gender is required";
        }
        if(!formData.category){
          newErrors.category = "Please select category"
        }
        if(formData.interests.length  === 0){
          newErrors.interests = "Select at least one interest";
        }
        if(!formData.birthDate) {
          newErrors.birthDate = "Date of birth is required";
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    
      }
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const isValid = validateForm();
    
        if(isValid) {
          console.log('Form Submitted');
        }else{
          console.log('Please resolve errors');
        }    
      };
    
      const getFormData = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      };
    
      const handleCheckBoxChange = (e) => {
        const { value, checked } = e.target;
    
        setFormData((prevState) => ({
          ...prevState,
          interests: checked ? [...prevState.interests, value] : prevState.interests.filter((ele) => ele !== value)
        }));
      };

  
      
  return (
    <div className="bg-gray-700 h-[100%] p-5">
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 py-8"
      >
        {/* firstName */}
        <div className="mb-6">
          <label htmlFor="firstName" className="label-title">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData?.firstName}
            onChange={getFormData}
            placeholder="First Name"
            className="input-title"
          />
          {errors.firstName && (
            <p className="error-title">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-6">
          <label htmlFor="lastName" className="label-title">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={getFormData}
            placeholder="Last Name"
            className="input-title"
          />
          {errors.lastName && (
            <p className="error-title">{errors.lastName}</p>
          )}
        </div>

        {/* Age */}
        <div className="mb-6">
          <label
            htmlFor="age"
            className="label-title"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={getFormData}
            placeholder="Enter Age"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2"
          />
          {errors.age && (
            <p className="error-title">{errors.age}</p>
          )}
        </div>

        {/* email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="label-title"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={getFormData}
            placeholder="Email"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>

        {/* phone Number */}
        <div className="mb-6">
          <label
            htmlFor="phoneNumber"
            className="label-title"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={getFormData}
            placeholder="phone number"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2"
          />
          {errors.phoneNumber && (
            <p className="error-title">
              {errors.phoneNumber}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="label-title"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={getFormData}
            placeholder="password"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2"
          />
          {errors.password && (
            <p className="error-title">{errors.password}</p>
          )}
        </div>

        {/* confirmPassword */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="label-title"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={getFormData}
            placeholder="Confirm Password"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2"
          />
          {errors.confirmPassword && (
            <p className="error-title">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="mb-6">
          <label
            htmlFor="category"
            className="label-title"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={getFormData}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 "
          >
            <option value="">Please Choose</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="others">Others</option>
          </select>
          {errors.category && (
            <p className="error-title">{errors.category}</p>
          )}
        </div>


        {/* Gender */}
        <div className="mb-6">
          <label htmlFor="gender" className="label-title">Gender</label>
          <div className="flex justify-start items-center gap-6">

            <div className="flex items-center">
              <input type="radio" id="male" name="gender" checked={formData.gender === 'male'} value="male" onChange={getFormData} className="mr-2" />
              <label htmlFor="male" className="text-gray-700">Male</label>
            </div>

            <div className="flex items-center">
              <input type="radio" id="female" name="gender" checked={formData.gender === 'female'} value="female" onChange={getFormData} className="mr-2" />
              <label htmlFor="female" className="text-gray-700">Female</label>
            </div>

            <div className="flex items-center">
              <input type="radio" id="others" name="gender" checked={formData.gender === 'others'} value="others" onChange={getFormData} className="mr-2" />
              <label htmlFor="others" className="text-gray-700">Others</label>
            </div>

          </div>
          {errors.gender && (
            <p className="error-title">{errors.gender}</p>
          )} 
        </div>

        {/* interests */}
        <div className="mb-6">
          <label htmlFor="interests" className="label-title">Interests</label>
          <div className="flex justify-start gap-5">
            <div className="flex items-center gap-1">
              <input type="checkbox" id="coding" name="interests" checked={formData.interests?.includes("coding")} value='coding' onChange={handleCheckBoxChange} />
              <label htmlFor="coding" className="text-gray-700 text-sm">Coding</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" id="sports" name="interests" checked={formData.interests?.includes('sports')} value='sports' onChange={handleCheckBoxChange} />
              <label htmlFor="sports" className="text-gray-700 text-sm">Sports</label>
            </div>
            <div className="flex items-center gap-1">
              <input type="checkbox" id="reading" name="interests" checked={formData.interests?.includes("reading")} value='reading' onChange={handleCheckBoxChange} />
              <label htmlFor="reading" className="text-gray-700 text-sm">Reading</label>
            </div>
          </div>
          {errors.interests && (
            <p className="error-title">{errors.interests}</p>
          )}
        </div>


        {/* dateOfBirth */}
        <div className="mb-8">
          <label htmlFor="birthDate" className="label-title">Birth Date</label>
          <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={getFormData}  />
          {errors?.birthDate && (
            <p className="error-title">{errors.birthDate}</p>
          )}
        </div>


        {/* Submit */}
        <button type="submit" className="btn" >Submit</button>


      </form>
    </div>
  </div>
  )
}

export default TailWindForm