import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Menu, X, Home, Search, User, Phone, Info, Plus, ChevronDown, Settings, Heart, LogOut } from 'lucide-react';

const NavigationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get current user from Redux state
  const { currentUser } = useSelector((state) => state.user);
  const isLoggedIn = !!currentUser; // Check if user exists

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

 

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const authItems = [
    { name: 'Sign In', path: '/sign-in', icon: User },
    { name: 'Sign Up', path: '/sign-up', icon: Plus },
  ];

  const profileMenuItems = [
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'My Properties', path: '/', icon: Home },
    { name: 'Favorites', path: '/', icon: Heart },
    { name: 'Settings', path: '/', icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center gap-2 text-black font-bold text-xl hover:text-blue-300 transition-colors"
            >
             DreamLine
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className="group flex items-center gap-2 text-black hover:text-blue-300 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Auth/Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavigation('/create-listing')}
                  className="border border-white/30 text-white hover:text-blue-300 hover:border-blue-300/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
                >
                  List Property
                </button>
                
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    <img 
                      src={currentUser.avatar} 
                      alt="profile" 
                      className="h-8 w-8 rounded-full object-cover border-2 border-white/30" 
                    />
                    <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 py-2 z-50">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-200/50">
                        <div className="flex items-center gap-3">
                          <img 
                            src={currentUser.avatar} 
                            alt="profile" 
                            className="h-10 w-10 rounded-full object-cover" 
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{currentUser.username}</p>
                            <p className="text-gray-600 text-sm">{currentUser.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {profileMenuItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <button
                              key={item.name}
                              onClick={() => handleNavigation(item.path)}
                              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 w-full text-left"
                            >
                              <IconComponent className="w-4 h-4" />
                              {item.name}
                            </button>
                          );
                        })}
                      </div>

                    
                      
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('/sign-in')}
                  className="text-black hover:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavigation('/sign-up')}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => handleNavigation('/create-listing')}
                  className="border border-white/30 text-white hover:text-blue-300 hover:border-blue-300/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
                >
                  List Property
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-300 inline-flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/50 backdrop-blur-lg border-t border-white/20">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className="group flex items-center gap-3 text-white hover:text-blue-300 px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 hover:bg-white/10"
                >
                  <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {item.name}
                </button>
              );
            })}
            
            {/* Mobile Auth/Profile Section */}
            <div className="border-t border-white/20 pt-3 mt-3 space-y-2">
              {isLoggedIn ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center gap-3 px-3 py-2 text-white">
                    <img 
                      src={currentUser.avatar} 
                      alt="profile" 
                      className="h-8 w-8 rounded-full object-cover border-2 border-white/30" 
                    />
                    <div>
                      <p className="font-medium text-sm">{currentUser.username}</p>
                      <p className="text-xs text-gray-300">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  {/* Profile Menu Items */}
                  {profileMenuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavigation(item.path)}
                        className="group flex items-center gap-3 text-white hover:text-blue-300 px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 hover:bg-white/10"
                      >
                        <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        {item.name}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handleNavigation('/create-listing')}
                    className="group flex items-center gap-3 text-white hover:text-blue-300 px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 hover:bg-white/10 border border-white/30 mt-2"
                  >
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    List Property
                  </button>
                  
                  <button
                    onClick={handleSignOut}
                    className="group flex items-center gap-3 text-red-300 hover:text-red-200 px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 hover:bg-white/10"
                  >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  {authItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavigation(item.path)}
                        className="group flex items-center gap-3 text-white hover:text-blue-300 px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 hover:bg-white/10"
                      >
                        <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        {item.name}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handleNavigation('/create-listing')}
                    className="group flex items-center gap-3 text-white hover:text-blue-300 px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-all duration-200 hover:bg-white/10 border border-white/30 mt-2"
                  >
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    List Property
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationHeader;