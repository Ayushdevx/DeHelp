"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, Bell, BellOff, Globe, CreditCard, LogOut, Settings, 
  Palette, Languages, Zap, Check, X 
} from 'lucide-react';

// Tailwind CSS for styling
const SettingsPage = () => {
  const router = useRouter();
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [activeSection, setActiveSection] = useState('general');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Simulated user preferences (would typically come from backend)
  const [userPreferences, setUserPreferences] = useState({
    profilePicture: 'https://media.licdn.com/dms/image/v2/D5603AQFgVZrPnKX2yg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714299394862?e=1740009600&v=beta&t=tz0m7ei6HzSwcRFVDGQY86Yp_plC4ZnjzQo8EgjcB_Q',
    username: 'Ayush Upadhyay',
    email: 'Ayushdevxai@gmail.com'
  });

  useEffect(() => {
    // Load settings from local storage or API
    const savedSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    if (Object.keys(savedSettings).length) {
      setTheme(savedSettings.theme || 'light');
      setNotifications(savedSettings.notifications ?? true);
      setDarkMode(savedSettings.darkMode ?? false);
      setLanguage(savedSettings.language || 'en');
      setCurrency(savedSettings.currency || 'USD');
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      theme, notifications, darkMode, language, currency
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setUnsavedChanges(false);
    // In a real app, this would also send to backend
  };

  const handleSettingChange = (setter) => {
    return (value) => {
      setter(value);
      setUnsavedChanges(true);
    };
  };

  const handleLogout = () => {
    // Simulate logout
    localStorage.removeItem('userToken');
    router.push('/login');
  };

  const sidebarSections = [
    { 
      id: 'general', 
      icon: <Settings className="w-5 h-5" />, 
      label: 'General' 
    },
    { 
      id: 'account', 
      icon: <Zap className="w-5 h-5" />, 
      label: 'Account' 
    },
    { 
      id: 'notifications', 
      icon: notifications ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />, 
      label: 'Notifications' 
    },
    { 
      id: 'preferences', 
      icon: <Palette className="w-5 h-5" />, 
      label: 'Preferences' 
    }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Theme</h2>
              <div className="flex space-x-4">
                {['light', 'dark'].map(option => (
                  <motion.div 
                    key={option}
                    className={`
                      flex items-center space-x-2 p-3 rounded-lg cursor-pointer
                      ${theme === option 
                        ? 'bg-blue-100 dark:bg-blue-900' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                    onClick={() => handleSettingChange(setTheme)(option)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span className="capitalize">{option} Mode</span>
                    {theme === option && <Check className="w-5 h-5 text-blue-600" />}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img 
                src={userPreferences.profilePicture} 
                alt="Profile" 
                className="w-16 h-16 rounded-full border-4 border-blue-500"
              />
              <div>
                <h3 className="text-xl font-semibold">{userPreferences.username}</h3>
                <p className="text-gray-500">{userPreferences.email}</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Account Details</h2>
              {/* Additional account management options */}
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6" />
                <span>Enable Notifications</span>
              </div>
              <motion.button
                className={`
                  w-14 h-8 rounded-full p-1 flex items-center 
                  ${notifications 
                    ? 'bg-green-500 justify-end' 
                    : 'bg-gray-300 justify-start'}
                `}
                onClick={() => handleSettingChange(setNotifications)(!notifications)}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-6 h-6 bg-white rounded-full shadow-md"
                  layout 
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Language</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { code: 'en', name: 'English', icon: '🇺🇸' },
                  { code: 'es', name: 'Español', icon: '🇪🇸' },
                  { code: 'fr', name: 'Français', icon: '🇫🇷' }
                ].map(lang => (
                  <motion.div 
                    key={lang.code}
                    className={`
                      flex items-center space-x-3 p-3 rounded-lg cursor-pointer
                      ${language === lang.code 
                        ? 'bg-blue-100 dark:bg-blue-900' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                    onClick={() => handleSettingChange(setLanguage)(lang.code)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{lang.icon}</span>
                    <span>{lang.name}</span>
                    {language === lang.code && <Check className="w-5 h-5 text-blue-600" />}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <div className="mb-8 flex items-center space-x-4">
          <img 
            src={userPreferences.profilePicture} 
            alt="Profile" 
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{userPreferences.username}</h2>
            <p className="text-sm text-gray-500">Settings</p>
          </div>
        </div>
        <div className="space-y-2">
          {sidebarSections.map(section => (
            <motion.div 
              key={section.id}
              className={`
                flex items-center space-x-3 p-3 rounded-lg cursor-pointer
                ${activeSection === section.id 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {section.icon}
              <span>{section.label}</span>
            </motion.div>
          ))}
        </div>
        <motion.button 
          className="mt-8 w-full flex items-center justify-center space-x-2 p-3 bg-red-500 text-white rounded-lg"
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>

        {/* Save Changes Button */}
        {unsavedChanges && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex space-x-4">
              <motion.button 
                className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
                onClick={saveSettings}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check className="w-5 h-5" />
                <span>Save Changes</span>
              </motion.button>
              <motion.button 
                className="bg-red-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
                onClick={() => setUnsavedChanges(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
                <span>Discard</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;