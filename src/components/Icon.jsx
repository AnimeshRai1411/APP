import React from 'react';
import { 
  Shield, 
  Zap, 
  Target, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Building,
  Scale,
  Database,
  Cpu,
  Lock,
  Eye,
  BarChart3
} from 'lucide-react';

const iconMap = {
  shield: Shield,
  zap: Zap,
  target: Target,
  trending: TrendingUp,
  dollar: DollarSign,
  clock: Clock,
  check: CheckCircle,
  alert: AlertTriangle,
  users: Users,
  building: Building,
  scale: Scale,
  database: Database,
  cpu: Cpu,
  lock: Lock,
  eye: Eye,
  chart: BarChart3,
};

const Icon = ({ name, size = 24, className = '', animated = false }) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const baseClasses = `text-cyber-cyan ${className}`;
  
  if (animated) {
    return (
      <div className="relative">
        <IconComponent 
          size={size} 
          className={`${baseClasses} animate-pulse-slow`} 
        />
        <div className="absolute inset-0 bg-cyber-cyan/20 rounded-full blur-md animate-glow" />
      </div>
    );
  }

  return <IconComponent size={size} className={baseClasses} />;
};

export default Icon;
