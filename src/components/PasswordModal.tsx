import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onSubmit(password);
    
    if (!success) {
      setError('Access Denied');
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setError('');
      }, 1000);
    } else {
      setPassword('');
      setError('');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    setIsShaking(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-theme-card border border-theme-primary rounded-lg p-6 w-96 max-w-md mx-4 ${isShaking ? 'animate-pulse' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Lock className="text-theme-accent" size={20} />
            <h2 className="text-xl font-bold text-theme-primary">Access Required</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-theme-secondary hover:text-theme-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-theme-secondary mb-2">
              Enter the secret code:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-theme-primary border border-theme-primary rounded-md text-theme-primary focus:outline-none focus:border-theme-accent"
              placeholder="••••••"
              autoFocus
            />
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center font-mono">
              {error}
            </div>
          )}
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-theme-primary border border-theme-primary text-theme-secondary rounded-md hover:bg-theme-accent-light transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-theme-accent text-white rounded-md hover:bg-theme-accent/80 transition-colors"
            >
              Unlock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;