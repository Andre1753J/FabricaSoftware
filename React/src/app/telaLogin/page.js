"use client"

import image from 'next/image';
import styles from './telaLogin.module.css'
import React, { useState } from "react";


const LoginForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    email: "",
    keepSignedIn: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckBoxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      keepSignedIn: !prevData.keepSignedIn,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className={styles.body}>
    <div className={styles.login_wrap}>
      <div className={styles.login_html}>
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          checked={isSignIn}
          onChange={() => setIsSignIn(true)}
        />
        <label htmlFor="tab-1" className={styles.tab}>
          Sign In
        </label>
        <input
          id="tab-2"
          type="radio"
          name="tab"
          className="sign-up"
          checked={!isSignIn}
          onChange={() => setIsSignIn(false)}
        />
        <label htmlFor="tab-2" className={styles.tab}>
          Sign Up
        </label>

        <div className={styles.login_form}>
          {isSignIn ? (
            <div className={styles.sign_in_htm}>
              <div className={styles.group}>
                <label htmlFor="username" className={styles.label}>
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="input"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.group}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="input"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.group}>
                <input
                  id="check"
                  type="checkbox"
                  className="check"
                  checked={formData.keepSignedIn}
                  onChange={handleCheckBoxChange}
                />
                <label htmlFor="check">
                  <span className={styles.icon}></span> Keep me Signed in
                </label>
              </div>
              <div className={styles.group}>
                <input
                  type="submit"
                  className="button"
                  value="Sign In"
                  onClick={handleFormSubmit}
                />
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </div>
          ) : (
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="username" className="label">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="input"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="input"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="group">
                <label htmlFor="repeatPassword" className="label">
                  Repeat Password
                </label>
                <input
                  id="repeatPassword"
                  type="password"
                  name="repeatPassword"
                  className="input"
                  value={formData.repeatPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="group">
                <input
                  type="submit"
                  className="button"
                  value="Sign Up"
                  onClick={handleFormSubmit}
                />
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <label htmlFor="tab-1">Already Member?</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </section>
  );
};

export default LoginForm;
