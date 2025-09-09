import { motion } from "framer-motion";
import { Loader2, Calculator } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  variant?: "spinner" | "dots" | "pulse";
  className?: string;
}

export function Loading({ 
  size = "md", 
  text, 
  variant = "spinner",
  className = "" 
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  if (variant === "spinner") {
    return (
      <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className={`${sizeClasses[size]} text-blue-600 dark:text-blue-400`} />
        </motion.div>
        {text && (
          <p className={`text-gray-600 dark:text-gray-300 ${textSizeClasses[size]}`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
        {text && (
          <p className={`text-gray-600 dark:text-gray-300 ${textSizeClasses[size]}`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full"
        >
          <Calculator className={`${sizeClasses[size]} text-blue-600 dark:text-blue-400`} />
        </motion.div>
        {text && (
          <p className={`text-gray-600 dark:text-gray-300 ${textSizeClasses[size]}`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  return null;
}

// Full page loading overlay
interface LoadingOverlayProps {
  isVisible: boolean;
  text?: string;
}

export function LoadingOverlay({ isVisible, text = "Loading..." }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <Loading size="lg" text={text} variant="pulse" />
    </motion.div>
  );
}

// Button loading state
interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function LoadingButton({ 
  isLoading, 
  children, 
  onClick,
  className = "",
  disabled = false
}: LoadingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`relative flex items-center justify-center ${className} ${
        isLoading || disabled ? 'opacity-60 cursor-not-allowed' : ''
      }`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading size="sm" variant="spinner" />
        </div>
      )}
      <div className={isLoading ? 'invisible' : 'visible'}>
        {children}
      </div>
    </button>
  );
}
