import React from 'react';
import { AppState } from '../types';

interface AdminPanelProps {
  appState: AppState;
  onStateChange: (newState: AppState) => void;
  onSave: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ appState, onStateChange, onSave }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');
    
    if (nameParts.length === 2) {
      const [section, key] = nameParts;
      if (section === 'businessDetails' || section === 'appearance') {
          onStateChange({
            ...appState,
            [section]: {
              ...appState[section],
              [key]: value,
            },
          });
      }
    } else {
        onStateChange({ ...appState, [name]: value });
    }
  };

  const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newProducts = [...appState.products];
    const productToUpdate = { ...newProducts[index] };

    if (name === 'price') {
        productToUpdate[name] = parseFloat(value) || 0;
    } else {
        (productToUpdate as any)[name] = value;
    }
    
    newProducts[index] = productToUpdate;
    onStateChange({ ...appState, products: newProducts });
  };
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      
      <div className="mb-4 p-4 border rounded bg-white">
        <h3 className="text-xl font-semibold mb-2">Store Info</h3>
        <label className="block mb-2">Title:
          <input type="text" name="title" value={appState.title} onChange={handleInputChange} className="w-full p-2 border rounded" />
        </label>
        <label className="block mb-2">Subtitle:
          <input type="text" name="subtitle" value={appState.subtitle} onChange={handleInputChange} className="w-full p-2 border rounded" />
        </label>
      </div>

      <div className="mb-4 p-4 border rounded bg-white">
        <h3 className="text-xl font-semibold mb-2">Business Details</h3>
        <label className="block mb-2">Store Name:
          <input type="text" name="businessDetails.name" value={appState.businessDetails.name} onChange={handleInputChange} className="w-full p-2 border rounded" />
        </label>
        <label className="block mb-2">WhatsApp Number:
          <input type="text" name="businessDetails.whatsapp" value={appState.businessDetails.whatsapp} onChange={handleInputChange} className="w-full p-2 border rounded" />
        </label>
        <label className="block mb-2">PayPal Username/Email:
          <input type="text" name="businessDetails.paypal" value={appState.businessDetails.paypal} onChange={handleInputChange} className="w-full p-2 border rounded" />
        </label>
      </div>

      <div className="mb-4 p-4 border rounded bg-white">
        <h3 className="text-xl font-semibold mb-2">Products</h3>
        {appState.products.map((product, index) => (
          <div key={product.id} className="p-2 border rounded mb-2 bg-gray-50">
            <h4 className="font-bold">Product #{index + 1}</h4>
            <label className="block mt-1">Name: <input type="text" name="name" value={product.name} onChange={(e) => handleProductChange(index, e)} className="w-full p-1 border rounded" /></label>
            <label className="block mt-1">Description: <textarea name="description" value={product.description} onChange={(e) => handleProductChange(index, e)} className="w-full p-1 border rounded" /></label>
            <label className="block mt-1">Price: <input type="number" name="price" value={product.price} onChange={(e) => handleProductChange(index, e)} className="w-full p-1 border rounded" /></label>
            <label className="block mt-1">Image URL: <input type="text" name="image" value={product.image} onChange={(e) => handleProductChange(index, e)} className="w-full p-1 border rounded" /></label>
          </div>
        ))}
        {/* Functionality to add/remove products could be added here */}
      </div>
      
      <button onClick={onSave} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Save Changes</button>
    </div>
  );
};

export default AdminPanel;
