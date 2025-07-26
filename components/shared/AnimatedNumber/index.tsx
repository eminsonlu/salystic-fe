'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatter?: (value: number) => string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedNumber = ({ 
  value, 
  duration = 1000, 
  formatter, 
  className, 
  style 
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const startValueRef = useRef(0);

  useEffect(() => {
    if (value === displayValue) return;

    startValueRef.current = displayValue;
    startTimeRef.current = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || 0);
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValueRef.current + (value - startValueRef.current) * easeOutQuart;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, displayValue]);

  const formattedValue = formatter ? formatter(displayValue) : Math.round(displayValue).toLocaleString();

  return (
    <span className={className} style={style}>
      {formattedValue}
    </span>
  );
};

export default AnimatedNumber;