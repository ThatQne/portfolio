import React from 'react';
import { Linkedin, Mail, MapPin, Calendar, Award } from 'lucide-react';
import { BsTwitterX, BsDiscord, BsGithub } from 'react-icons/bs';

// Centralized icon mapping - edit this to add/change icons
const iconMap: Record<string, React.ComponentType<any>> = {
  github: BsGithub,
  linkedin: Linkedin,
  x: BsTwitterX,
  mail: Mail,
  discord: BsDiscord,
  // About section icons
  MapPin: MapPin,
  Calendar: Calendar,
  Award: Award,
};

export const getIcon = (iconName: string): React.ComponentType<any> => {
  return iconMap[iconName] || Mail; // fallback to Mail icon
};

export default getIcon;