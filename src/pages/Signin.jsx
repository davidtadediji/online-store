import React, { useState } from "react";
import { HiStar, HiUserCircle, HiEye, HiEyeOff } from "react-icons/hi";
import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import Joi from "joi";
import apiUrl from "./../utils/config";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const buttonData = [
    {
      title: isValid ? "Login" : "Continue",
      bgColor: "bg-red-400",
      icon: null,
    },

    {
      title: "Log in with Google",
      bgColor: "bg-black",
      icon: <HiUserCircle className="absolute top-[35%] left-3" />,
      classes: "mt-16",
    },
    {
      title: "Login",
      bgColor: "bg-red-400",
      icon: null,
    },
  ];

  const emailSchema = Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: false }, // To disallow the use of top-level domains (e.g., .com, .net)
  });

  const handleContinueClick = () => {
    const validationResult = emailSchema.validate(email);
    if (validationResult.error) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
      setIsValid(true);
    }
  };
  const passwordSchema = Joi.string().min(5).required(); // Define the password schema

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    const passwordValidationResult = passwordSchema.validate(password);
    if (passwordValidationResult.error) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);

      // Perform login action here using the email and password
      axios
        .post(apiUrl + "auth", { email, password })
        .then((response) => {
          // If login is successful, response.data should contain the token
          const token = response.data;

          // Store the token in local storage or any appropriate storage
          localStorage.setItem("x-auth-token", token);

          // Show success toast notification
          toast.success("Login successful!");

        })
        .catch((error) => {
          // If login fails, handle the error here
          console.error("Login failed:", error);

          // Show error toast notification
          toast.error("Login failed. Please try again.");
        });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="px-5 flex flex-col  flex-grow bg-white items-center">
      <div className="sm:max-w-md flex-grow gap-4 flex flex-col">
        <div>
          <div className="pt-5 flex justify-center text-6xl">
            <HiStar />
          </div>
          <h1 className="text-center font-semibold text-xl">
            Welcome to Jumia
          </h1>
        </div>
        <p className="text-center px-1 mb-2 text-gray-600 sm:text-md">
          Type your e-mail or phone number to log in or create a Jumia account.
        </p>
        <div>
          {isValid ? (
            <div className="flex items-center p-3 rounded-[4px] bg-gray-500 justify-between text-white">
              <p className="font-semibold">{email}</p>
              <button onClick={() => setIsValid(false)}>Edit</button>
            </div>
          ) : (
            <>
              <input
                type="email"
                className={`w-full text-md p-3 border-[1px] rounded-[4px] ${
                  !isValidEmail
                    ? "border-red-700 placeholder-red-700"
                    : "border-gray-500 "
                }`}
                placeholder="Email or Mobile Number"
                value={email}
                onChange={handleEmailChange}
              />
              {!isValidEmail && (
                <small className="text-red-700 block font-medium p-2 leading-tight">
                  Either the email or the phone number entered is not valid
                </small>
              )}
            </>
          )}
        </div>
        {isValid && (
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full text-md p-3 border-[1px] rounded-[4px] ${
                  !isValidPassword ? "border-red-700" : "border-gray-500 "
                }`}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="absolute top-[35%] right-2 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <HiEyeOff className="text-gray-500" />
                ) : (
                  <HiEye className="text-gray-500" />
                )}
              </span>
            </div>
            {!isValidPassword && (
              <small className="text-red-600 block font-medium p-2 leading-tight">
                The password is incorrect!
              </small>
            )}
          </div>
        )}

        {isValid ? (
          <>
            <Button onClick={handleLoginClick} {...buttonData[2]} />
            <div className="text-center">
              <a
                href="/forgot-password"
                className=" block text-red-300 underline"
              >
                Forgot Password?
              </a>
            </div>
          </>
        ) : (
          <>
            <Button onClick={handleContinueClick} {...buttonData[0]} />
            <Button {...buttonData[1]} />
          </>
        )}
        <div className="mb-4 m-auto">
          <p className="text-center text-sm font-semibold text-gray-600 mb-2 sm:text-md">
            For further support, you may visit the Help Center or contact our
            customer service team.
          </p>
          <img src={Logo} alt="jumia" className="uppercase h-5 mx-auto my-3" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;

const Button = ({ title, icon, bgColor, classes, onClick }) => {
  return (
    <button
      className={`${bgColor} ${classes} relative w-full py-3 text-[17px] text-white font-semibold rounded-[4px] shadow-md`}
      onClick={onClick}
    >
      {icon}
      {title}
    </button>
  );
};
