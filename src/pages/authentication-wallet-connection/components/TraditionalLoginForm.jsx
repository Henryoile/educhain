import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TraditionalLoginForm = ({ onLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = {
    student: { email: 'student@educhain.com', password: 'student123' },
    institution: { email: 'admin@university.edu', password: 'institution123' },
    employer: { email: 'hr@company.com', password: 'employer123' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    // Check against mock credentials
    const matchedRole = Object.entries(mockCredentials)?.find(([role, creds]) => 
      creds?.email === formData?.email && creds?.password === formData?.password
    );
    
    if (matchedRole) {
      onLogin({
        email: formData?.email,
        role: matchedRole?.[0],
        method: 'traditional'
      });
    } else {
      setErrors({
        general: 'Invalid email or password. Please use the provided demo credentials.'
      });
    }
  };

  const handleDemoLogin = (role) => {
    const creds = mockCredentials?.[role];
    setFormData({
      email: creds?.email,
      password: creds?.password
    });
    setErrors({});
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Traditional Login</h3>
          <p className="text-muted-foreground">Access your account with email and password</p>
        </div>
        
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <span className="text-sm text-error">{errors?.general}</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            error={errors?.email}
            required
          />
          
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
          
          <Button
            type="submit"
            loading={isLoading}
            iconName="LogIn"
            className="w-full"
          >
            Sign In
          </Button>
        </form>
        
        <div className="space-y-3">
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Demo Credentials</span>
          </div>
          
          <div className="grid gap-2">
            {Object.entries(mockCredentials)?.map(([role, creds]) => (
              <button
                key={role}
                onClick={() => handleDemoLogin(role)}
                className="text-left p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground capitalize">{role}</div>
                    <div className="text-sm text-muted-foreground">{creds?.email}</div>
                  </div>
                  <Icon name="Copy" size={16} className="text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-border text-center">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraditionalLoginForm;