import React, { useState } from 'react';

export const Tabs = ({ defaultValue, value, onValueChange, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const handleChange = (val) => {
    setActiveTab(val);
    if (onValueChange) onValueChange(val);
  };

  return (
    <div>
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab: value || activeTab, onChange: handleChange })
      )}
    </div>
  );
};

export const TabsList = ({ children, activeTab, onChange }) => (
  <div className="flex space-x-1">
    {React.Children.map(children, child =>
      React.cloneElement(child, { activeTab, onChange })
    )}
  </div>
);

export const TabsTrigger = ({ value, activeTab, onChange, children }) => (
  <button
    onClick={() => onChange(value)}
    className={`px-4 py-2 rounded-t-md ${activeTab === value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, activeTab, children }) => (
  <div className={activeTab === value ? 'block' : 'hidden'}>
    {children}
  </div>
);