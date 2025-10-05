import React, { useState, useEffect } from 'react';
import { AppState, Product, PricingConfig, TieredSeller } from '../types';

interface AdminPanelProps {
  initialState: AppState;
  onSave: (newState: AppState) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ initialState, onSave, onLogout }) => {
  const [config, setConfig] = useState<PricingConfig>(initialState.config);
  const [products, setProducts] = useState<Product[]>(initialState.products);
  const [sellers, setSellers] = useState<TieredSeller[]>(initialState.sellers || []);
  
  const [newSellerName, setNewSellerName] = useState('');
  const [newSellerTier, setNewSellerTier] = useState<'agent' | 'promoter'>('promoter');
  const [copiedSellerId, setCopiedSellerId] = useState<string | null>(null);


  useEffect(() => {
    setConfig(initialState.config);
    setProducts(initialState.products);
    setSellers(initialState.sellers || []);
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
  
  const generateSellerId = (name: string, tier: string) => {
    const sanitizedName = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `${tier.slice(0, 5)}-${sanitizedName}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const handleAddSeller = () => {
    if (!newSellerName.trim()) {
      alert('El nombre del vendedor no puede estar vacío.');
      return;
    }
    const newSeller: TieredSeller = {
      id: generateSellerId(newSellerName, newSellerTier),
      name: newSellerName.trim(),
      tier: newSellerTier,
    };
    setSellers(prev => [...prev, newSeller]);
    setNewSellerName('');
  };
  
  const handleDeleteSeller = (id: string) => {
    if(window.confirm('¿Estás seguro de que quieres eliminar este vendedor?')) {
        setSellers(prev => prev.filter(seller => seller.id !== id));
    }
  };

  const getShareableLink = (seller: TieredSeller) => {
      const baseUrl = window.location.origin;
      const param = seller.tier === 'agent' ? 'ref' : 'promoter';
      return `${baseUrl}/?${param}=${seller.id}`;
  };

  const handleCopyLink = (link: string, sellerId: string) => {
    navigator.clipboard.writeText(link).then(() => {
        setCopiedSellerId(sellerId);
        setTimeout(() => setCopiedSellerId(null), 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('No se pudo copiar el enlace.');
    });
  };

  const handleSaveChanges = () => {
    onSave({ config, products, sellers });
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

        {/* Seller Management Section */}
        <div className="mb-8 p-4 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-600">Gestión de Vendedores</h2>
            <div className="bg-gray-50 p-3 rounded-md mb-4 flex items-center gap-4">
                <input
                    type="text"
                    value={newSellerName}
                    onChange={(e) => setNewSellerName(e.target.value)}
                    placeholder="Nombre del nuevo vendedor"
                    className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
                <select value={newSellerTier} onChange={(e) => setNewSellerTier(e.target.value as any)} className="border border-gray-300 rounded-md shadow-sm py-2 px-3">
                    <option value="promoter">Promotor</option>
                    <option value="agent">Agente</option>
                </select>
                <button onClick={handleAddSeller} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition">
                    Añadir
                </button>
            </div>
            <div className="space-y-3">
                {sellers.map((seller) => (
                    <div key={seller.id} className="p-3 border rounded-md bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                            <p className="font-bold">{seller.name} <span className="text-xs font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{seller.tier === 'agent' ? 'Agente' : 'Promotor'}</span></p>
                            <div className="flex items-center gap-2 mt-1 w-full max-w-sm">
                                <input
                                    type="text"
                                    readOnly
                                    value={getShareableLink(seller)}
                                    className="text-sm text-gray-600 bg-gray-100 p-1 rounded w-full flex-grow"
                                    onFocus={(e) => e.target.select()}
                                />
                                <button 
                                    onClick={() => handleCopyLink(getShareableLink(seller), seller.id)}
                                    className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-2 rounded transition-colors flex-shrink-0"
                                >
                                    {copiedSellerId === seller.id ? 'Copiado!' : 'Copiar'}
                                </button>
                            </div>
                        </div>
                        <button onClick={() => handleDeleteSeller(seller.id)} className="text-red-500 hover:text-red-700 font-semibold self-end sm:self-center">
                            Eliminar
                        </button>
                    </div>
                ))}
                 {sellers.length === 0 && <p className="text-center text-gray-500">No hay vendedores registrados.</p>}
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