
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "full" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  linkClassName?: string;
}

const Logo = ({ variant = "default", size = "md", className = "", linkClassName = "" }: LogoProps) => {
  // Define sizes for different variants
  const sizeClasses = {
    sm: {
      container: "h-8",
      logo: "h-8",
    },
    md: {
      container: "h-10",
      logo: "h-10",
    },
    lg: {
      container: "h-12",
      logo: "h-12",
    },
    xl: {
      container: "h-16",
      logo: "h-16",
    },
  };

  // Only render the icon
  if (variant === "icon") {
    return (
      <Link 
        to="/" 
        className={cn("flex items-center group", linkClassName)}
      >
        <img 
          src="/lovable-uploads/fbe48ba3-319f-4b17-b3b5-61d51d87c80d.png" 
          alt="GÉNESIS DIGYTAMV" 
          className={cn("object-contain transition-all hover:scale-105", sizeClasses[size].logo, className)} 
        />
      </Link>
    );
  }

  // Full logo mode (logo + text)
  if (variant === "full") {
    return (
      <Link 
        to="/" 
        className={cn("flex items-center group", linkClassName)}
      >
        <div className={cn("relative", sizeClasses[size].container)}>
          <img 
            src="/lovable-uploads/fbe48ba3-319f-4b17-b3b5-61d51d87c80d.png" 
            alt="GÉNESIS DIGYTAMV" 
            className={cn("object-contain transition-all hover:scale-105", sizeClasses[size].logo, className)} 
          />
        </div>
      </Link>
    );
  }

  // Default mode - just logo, no extra text needed since it's in the image
  return (
    <Link 
      to="/" 
      className={cn("flex items-center space-x-2 group", linkClassName)}
    >
      <div className={cn("relative", sizeClasses[size].container)}>
        <img 
          src="/lovable-uploads/fbe48ba3-319f-4b17-b3b5-61d51d87c80d.png" 
          alt="GÉNESIS DIGYTAMV" 
          className={cn("object-contain transition-all hover:scale-105", sizeClasses[size].logo, className)} 
        />
      </div>
    </Link>
  );
};

export default Logo;
