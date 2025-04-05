"use client";

import { UserPlus, Mail, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { error } from "console";

export default function Signin() {
  const [isHovered, setIsHovered] = useState(false);
  const [formData , setFormData] = useState({
    email:"",
    password:"",
  })
  const router = useRouter();

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const fieldname = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevData)=>({
      ...prevData,
      [fieldname]:fieldValue
    }));
  }

  const submitForm = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formUrl = form.action;
    try {
      const response = await fetch(formUrl,{
        method:"POST",
        body:JSON.stringify(formData),
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data =await response.json();
      if(!response.ok){
        throw new Error(data.message || 'something wrong in signin form submit')
      }
      const token = data.token;
      localStorage.setItem('token',token);
      setFormData({
        email:"",
        password:"",
      })     
      router.push('/dashboard'); 
    } catch (error) {
      console.log(`Error while submitting the Form `,error);
    }
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
          <h1 className="title">Sign in Your Account</h1>
          <p className="subtitle">Join our creative community today</p>
        </div>

        <form className="form" method="POST" action="http://localhost:3003/signin" onSubmit={submitForm} >
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-container">
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="john@example.com"
                onChange={onChange}
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
                onChange={onChange}
              />
              <Lock className="input-icon" size={20} />
            </div>
          </div>

          <button type="submit" className="signup-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}