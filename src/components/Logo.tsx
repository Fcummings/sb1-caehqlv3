import { Zap } from "lucide-react"

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export default function Logo({ className = "", onClick }: LogoProps) {
  return (
    <div 
      className={`inline-flex items-center gap-2 ${className}`}
      onClick={onClick}
    >
      <Zap 
        className="w-12 h-12 text-blue-500 transform transition-transform group-hover:scale-110" 
        strokeWidth={2}
      />
      <span className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        CLKK
      </span>
    </div>
  )
}