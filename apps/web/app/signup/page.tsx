"use client";

import { UserPlus, Mail, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

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

        <form className="form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="input-container">
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="johndoe"
              />
              <UserPlus className="input-icon" size={20} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-container">
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="john@example.com"
              />
              <Mail className="input-icon" size={20} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-container">
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
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