import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import OAuth from '../../components/OAuth';

// Logo component using your existing logo


// Password strength indicator
const PasswordStrength = ({ password }) => {
  const getStrength = (pass) => {
    if (!pass) return { level: 0, text: '', color: '' };
    
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    const levels = [
      { level: 0, text: '', color: '' },
      { level: 1, text: 'Very Weak', color: 'bg-red-500' },
      { level: 2, text: 'Weak', color: 'bg-orange-500' },
      { level: 3, text: 'Fair', color: 'bg-yellow-500' },
      { level: 4, text: 'Good', color: 'bg-blue-500' },
      { level: 5, text: 'Strong', color: 'bg-green-500' }
    ];

    return levels[score];
  };

  const strength = getStrength(password);
  
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full ${
              level <= strength.level ? strength.color : 'bg-white/20'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-white/70">{strength.text}</p>
    </div>
  );
};

function ProfessionalSignUp() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.username || formData.username.length < 3) {
      toast.error('Username must be at least 3 characters long');
      return false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!formData.password || formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }

    if (!acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const res = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      setLoading(false);
      
      if (res.ok) {
        toast.success('Account created successfully!', {
          icon: '👏',
        });
        navigate('/sign-in');
      } else {
        toast.error(data.message || 'Sign-up failed.');
      }
    } catch (error) {
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Auth Container */}
      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
           
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dream
              </span>
              <span className="text-white">Line</span>
            </h1>
            <p className="text-white/70">
              Create your account to get started.
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-white/50" />
              </div>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={formData.username || ''}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white/50" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/50" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password || ''}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <PasswordStrength password={formData.password} />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setAcceptTerms(!acceptTerms)}
                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  acceptTerms 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-white/30 hover:border-white/50'
                }`}
              >
                {acceptTerms && <CheckCircle className="w-3 h-3" />}
              </button>
              <p className="text-sm text-white/70 leading-relaxed">
                I agree to the{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </button>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/50 text-sm">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

         

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              Already have an account?
              <Link to="/sign-in" className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-xs text-white/70">Protected</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Lock className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-xs text-white/70">Encrypted</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-xs text-white/70">Verified</p>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default ProfessionalSignUp;