"use client";

import { Pencil, Share2, Sparkles, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = document.querySelector('.canvas');
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="home-page">
      <div className="hero">
        <nav className="nav">
          <a href="/" className="logo">
            <Zap className="logo-icon" size={32} />
            CreativeFlow
          </a>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#templates" className="nav-link">Templates</a>
            <a href="/signin" className="nav-link">Signin</a>
            <button className="cta-button"onClick= {()=>{token?router.push('/dashboard'):router.push('/signup')}} >Start Creating</button>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Where Imagination Meets Innovation
            </h1>
            <p className="hero-subtitle">
              Transform your ideas into reality with our powerful creative platform. 
              Design, animate, and collaborate in a seamless digital workspace.
            </p>
            <div className="hero-buttons">
              <button className="cta-button">Start Free Trial</button>
              <button className="secondary-button">Explore Features</button>
            </div>
          </div>

          <div className="canvas-preview">
            <div 
              className="preview-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                transform: isHovered 
                  ? `perspective(1000px) rotateY(${(mousePosition.x - 50) / -20}deg) rotateX(${(mousePosition.y - 50) / 20}deg)`
                  : 'perspective(1000px) rotateY(-5deg) rotateX(5deg)'
              }}
            >
              <div className="canvas">
                <div 
                  className="shape shape-1"
                  style={{
                    transform: `translate(${(mousePosition.x - 50) / 5}px, ${(mousePosition.y - 50) / 5}px)`
                  }}
                />
                <div 
                  className="shape shape-2"
                  style={{
                    transform: `translate(${(mousePosition.x - 50) / -5}px, ${(mousePosition.y - 50) / -5}px)`
                  }}
                />
                
                <div className="floating-element element-1">
                  <Sparkles size={24} />
                  <span>AI-Powered Design</span>
                </div>
                
                <div className="floating-element element-2">
                  <Share2 size={24} />
                  <span>Real-time Collaboration</span>
                </div>
                
                <div className="floating-element element-3">
                  <Pencil size={24} />
                  <span>Infinite Canvas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}