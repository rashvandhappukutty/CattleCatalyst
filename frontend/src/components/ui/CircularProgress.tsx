import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  delay?: number;
}

const CircularProgress = ({ 
  percentage, 
  size = 120, 
  strokeWidth = 8, 
  delay = 0 
}: CircularProgressProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  const getColorByPercentage = (percent: number) => {
    if (percent >= 85) return 'hsl(var(--success-glow))';
    if (percent >= 70) return 'hsl(var(--premium-glow))';
    return 'hsl(45 100% 60%)'; // Yellow for lower confidence
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted) / 0.3)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColorByPercentage(percentage)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ 
            duration: 2,
            ease: "easeInOut",
            delay: delay / 1000
          }}
          style={{
            filter: `drop-shadow(0 0 8px ${getColorByPercentage(percentage)}40)`,
          }}
        />
      </svg>
      
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay / 1000 + 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div 
            className="text-2xl font-bold"
            style={{ color: getColorByPercentage(percentage) }}
          >
            {animatedPercentage}%
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            Confidence
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CircularProgress;