"use client";

import { UserPlus, Mail, Lock, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function signup() {
  const router = useRouter(); 
  const [isHovered, setIsHovered] = useState(false);
  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:""
  })
  const [formSuccess, setFormSuccess] = useState(false)


  const submitForm = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formURL = form.action;
    try {
    await fetch(formURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setFormData({
        username: "",
        email: "",
        password: ""
      })

      setFormSuccess(true);
      router.push('/signin');
    })
    } catch (error) {
    console.log("Error While Submitting Form",error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]:fieldValue
    }));
  }

  return (
    <div className="container">
      <div className="floating-shape" />
      <div className="floating-shape" />
      <div className="floating-shape" />
      
      <div className="signup-card">
        <div className="corner-accent" />
        
        <div className="header">
          <div 
            className="icon-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Sparkles 
              size={32}
              style={{
                transform: isHovered ? 'scale(1.1) rotate(12deg)' : 'scale(1)',
                transition: 'transform 0.3s ease'
              }}
            />
          </div>
          <h1 className="title">Create Your Account</h1>
          <p className="subtitle">Join our creative community today</p>
        </div>

        <form className="form" method="POST" onSubmit={submitForm} action= "http://localhost:3003/signup">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="input-container">
              <input
                id="username"
                name="username"
                type="text"
                className="form-input"
                placeholder="johndoe"
                onChange={handleChange}
                value = {formData.username}
              />
              <UserPlus className="input-icon" size={20} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-container">
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="john@example.com"
                onChange={handleChange}
                value = {formData.email}
              />
              <Mail className="input-icon" size={20} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-container">
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value = {formData.password}
                onChange={handleChange}
              />
              <Lock className="input-icon" size={20} />
            </div>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <div className="login-link">
            Already have an account?{" "}
            <Link href="/signin">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}