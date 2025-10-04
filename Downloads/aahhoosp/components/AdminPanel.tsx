
import React, { useState, useEffect } from 'react';
import { AppState, Product, PricingConfig } from '../types';

interface AdminPanelProps {
  initialState: AppState;
  onSave: (newState: AppState) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ initialState, onSave, onLogout }) => {
  const [config, setConfig] = useState<PricingConfig>(initialState.config);
  const [products, setProducts] = useState<Product[]>(initialState.products);

  useEffect(() => {
    setConfig(initialState.config);
    setProducts(initialState.products);
  }, [initialState]);

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumber = ['adminMargin', 'agentMargin', 'promoterCommission'].includes(name);
    setConfig(prev => ({ ...prev, [name]: isNumber ? parseFloat(value) || 0 : value }));
  };

  const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    const productToUpdate = { ...updatedProducts[index] };
    if (name === 'baseCost') {
        (productToUpdate as any)[name] = parseFloat(value) || 0;
    } else {
        (productToUpdate as any)[name] = value;
    }
    updatedProducts[index] = productToUpdate;
    setProducts(updatedProducts);
  };

  const handleSaveChanges = () => {
    onSave({ config, products });
    alert('¡Cambios guardados con éxito!');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-700">Panel de Administración</h1>
          <div>
            <button onClick={handleSaveChanges} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition mr-2">
              Guardar Cambios
            </button>
            <button onClick={onLogout} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition">
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Brand Config Section */}
        <div className="mb-8 p-4 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Configuración de Marca</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre de la Marca</label>
              <input type="text" name="brandName" value={config.brandName} onChange={handleConfigChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slogan</label>
              <input type="text" name="slogan" value={config.slogan} onChange={handleConfigChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>
        </div>
        
        {/* Pricing Config Section */}
        <div className="mb-8 p-4 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Márgenes de Precios (%)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Margen Administrador (%)</label>
              <input type="number" name="adminMargin" value={config.adminMargin} onChange={handleConfigChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Margen Agente (%)</label>
              <input type="number" name="agentMargin" value={config.agentMargin} onChange={handleConfigChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Comisión Promotor (%)</label>
              <input type="number" name="promoterCommission" value={config.promoterCommission} onChange={handleConfigChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Productos</h2>
          <div className="space-y-6">
            {products.map((product, index) => (
              <div key={product.id} className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Producto #{index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" value={product.name} onChange={(e) => handleProductChange(index, e)} placeholder="Nombre del Producto" className="w-full border border-gray-300 rounded-md py-2 px-3"/>
                    <input type="text" name="itemID" value={product.itemID} onChange={(e) => handleProductChange(index, e)} placeholder="ItemID" className="w-full border border-gray-300 rounded-md py-2 px-3"/>
                    <div className="md:col-span-2">
                        <textarea name="description" value={product.description} onChange={(e) => handleProductChange(index, e)} placeholder="Descripción" rows={2} className="w-full border border-gray-300 rounded-md py-2 px-3"></textarea>
                    </div>
                    <input type="number" name="baseCost" value={product.baseCost} onChange={(e) => handleProductChange(index, e)} placeholder="Costo Base ($)" className="w-full border border-gray-300 rounded-md py-2 px-3"/>
                    <input type="text" name="paypalBusinessId" value={product.paypalBusinessId} onChange={(e) => handleProductChange(index, e)} placeholder="Email o ID de PayPal Business" className="w-full border border-gray-300 rounded-md py-2 px-3"/>
                    <div className="md:col-span-2">
                        <input type="text" name="imageUrl" value={product.imageUrl || ''} onChange={(e) => handleProductChange(index, e)} placeholder="URL de Imagen (opcional)" className="w-full border border-gray-300 rounded-md py-2 px-3"/>
                    </div>
                     <div className="md:col-span-2">
                        <input type="text" name="videoUrl" value={product.videoUrl || ''} onChange={(e) => handleProductChange(index, e)} placeholder="URL de Video (YouTube o .mp4, opcional)" className="w-full border border-gray-300 rounded-md py-2 px-3"/>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;