import React, { useState } from 'react';
import { AppState, Product, TieredSeller } from '../types';

type AdminPanelProps = {
  appState: AppState;
  onSave: (newState: AppState) => void;
  onLogout: () => void;
};

const AdminPanel: React.FC<AdminPanelProps> = ({ appState, onSave, onLogout }) => {
  const [state, setState] = useState<AppState>(appState);
  const [newSellerName, setNewSellerName] = useState('');
  const [newSellerRole, setNewSellerRole] = useState<'Agent' | 'Promoter'>('Promoter');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lang: 'es' | 'en' | null = null) => {
    const { name, value } = e.target;
    if (name === 'name') {
        setState(s => ({ ...s, brand: { ...s.brand, name: value } }));
    } else if (lang) {
        setState(s => ({ ...s, brand: { ...s.brand, slogan: { ...s.brand.slogan, [lang]: value } } }));
    }
  };

  const handlePricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(s => ({ ...s, pricing: { ...s.pricing, [name]: parseFloat(value) || 0 } }));
  };

  const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lang: 'es' | 'en' | null = null) => {
    const { name, value } = e.target;
    const newProducts = [...state.products];
    const product = { ...newProducts[index] };

    if (name === 'baseCost') {
        (product as any)[name] = parseFloat(value) || 0;
    } else if (name === 'name' || name === 'description') {
        if (lang) {
            (product as any)[name][lang] = value;
        }
    } else {
        (product as any)[name] = value;
    }
    newProducts[index] = product;
    setState(s => ({ ...s, products: newProducts }));
  };

  const handleAddSeller = () => {
    if (!newSellerName.trim()) return;
    const slug = newSellerName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newSeller: TieredSeller = {
      id: `${newSellerRole === 'Agent' ? 'agent' : 'promo'}-${slug}-${randomId}`,
      name: newSellerName,
      role: newSellerRole,
    };
    setState(s => ({ ...s, sellers: [...s.sellers, newSeller] }));
    setNewSellerName('');
  };

  const handleDeleteSeller = (id: string) => {
    setState(s => ({ ...s, sellers: s.sellers.filter(seller => seller.id !== id) }));
  };
  
  const getShareableLink = (seller: TieredSeller) => {
      const baseUrl = window.location.origin + window.location.pathname.replace(/#admin$/, '');
      const param = seller.role === 'Agent' ? 'ref' : 'promoter';
      const config = {
        v: state.pricing.configVersion,
        a: state.pricing.adminMargin,
        g: state.pricing.agentMargin,
        p: state.pricing.promoterCommission
      };
      const encodedConfig = btoa(JSON.stringify(config));
      return `${baseUrl}?${param}=${seller.id}&cfg=${encodedConfig}`;
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 max-w-4xl mx-auto my-10 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
        <div>
          <button onClick={() => onSave(state)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 hover:bg-blue-700 transition-colors">Guardar Cambios</button>
          <button onClick={onLogout} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Cerrar Sesión</button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Brand Config */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Configuración de Marca</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" value={state.brand.name} onChange={handleBrandChange} placeholder="Nombre de la Marca" className="p-2 border rounded" />
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input type="text" name="slogan" value={state.brand.slogan.es} onChange={(e) => handleBrandChange(e, 'es')} placeholder="Slogan (ES)" className="p-2 border rounded" />
            <input type="text" name="slogan" value={state.brand.slogan.en} onChange={(e) => handleBrandChange(e, 'en')} placeholder="Slogan (EN)" className="p-2 border rounded" />
           </div>
        </div>

        {/* Pricing Config */}
        <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Márgenes de Precios (%)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="number" name="adminMargin" value={state.pricing.adminMargin} onChange={handlePricingChange} placeholder="Margen Administrador (%)" className="p-2 border rounded" />
                <input type="number" name="agentMargin" value={state.pricing.agentMargin} onChange={handlePricingChange} placeholder="Margen Agente (%)" className="p-2 border rounded" />
                <input type="number" name="promoterCommission" value={state.pricing.promoterCommission} onChange={handlePricingChange} placeholder="Comisión Promotor (%)" className="p-2 border rounded" />
            </div>
        </div>
        
        {/* Seller Management */}
        <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Gestión de Vendedores</h2>
            <div className="flex gap-2 mb-4">
                <input type="text" value={newSellerName} onChange={(e) => setNewSellerName(e.target.value)} placeholder="Nombre del nuevo vendedor" className="flex-grow p-2 border rounded" />
                <select value={newSellerRole} onChange={(e) => setNewSellerRole(e.target.value as any)} className="p-2 border rounded bg-white">
                    <option value="Agent">Agente</option>
                    <option value="Promoter">Promotor</option>
                </select>
                <button onClick={handleAddSeller} className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors">Añadir</button>
            </div>
            <div className="space-y-3">
                {state.sellers.map(seller => {
                    const link = getShareableLink(seller);
                    return (
                        <div key={seller.id} className="bg-gray-50 p-3 rounded-lg border flex items-center justify-between">
                           <div>
                                <span className="font-bold">{seller.name}</span>
                                <span className={`text-xs font-semibold ml-2 px-2 py-0.5 rounded-full ${seller.role === 'Agent' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{seller.role}</span>
                                <div className="text-sm text-gray-600 mt-1 flex items-center">
                                  <input type="text" readOnly value={link} className="w-full bg-gray-100 border-none p-1 rounded text-xs" />
                                  <button onClick={() => copyLink(link)} className="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-300 w-20">
                                      {copiedLink === link ? 'Copiado!' : 'Copiar'}
                                  </button>
                                </div>
                           </div>
                            <button onClick={() => handleDeleteSeller(seller.id)} className="text-red-500 hover:text-red-700 font-semibold">Eliminar</button>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Products */}
        <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Productos</h2>
            {state.products.map((p, i) => (
            <div key={p.id} className="mb-6 p-4 border rounded-md">
                <h3 className="font-bold mb-2 text-lg text-gray-600">Producto #{i + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" value={p.name.es} onChange={(e) => handleProductChange(i, e, 'es')} placeholder="Nombre (ES)" className="p-2 border rounded" />
                    <input type="text" name="name" value={p.name.en} onChange={(e) => handleProductChange(i, e, 'en')} placeholder="Nombre (EN)" className="p-2 border rounded" />
                    <textarea name="description" value={p.description.es} onChange={(e) => handleProductChange(i, e, 'es')} placeholder="Descripción (ES)" className="p-2 border rounded md:col-span-2" rows={2}></textarea>
                    <textarea name="description" value={p.description.en} onChange={(e) => handleProductChange(i, e, 'en')} placeholder="Descripción (EN)" className="p-2 border rounded md:col-span-2" rows={2}></textarea>
                    <input type="number" name="baseCost" value={p.baseCost} onChange={(e) => handleProductChange(i, e)} placeholder="Costo Base" className="p-2 border rounded" />
                    <input type="text" name="itemId" value={p.itemId} onChange={(e) => handleProductChange(i, e)} placeholder="ItemID" className="p-2 border rounded" />
                    <input type="text" name="paypalEmail" value={p.paypalEmail} onChange={(e) => handleProductChange(i, e)} placeholder="Email de PayPal" className="p-2 border rounded md:col-span-2" />
                    <input type="text" name="imageUrl" value={p.imageUrl} onChange={(e) => handleProductChange(i, e)} placeholder="URL de Imagen (.jpg, .png)" className="p-2 border rounded md:col-span-2" />
                    <input type="text" name="videoUrl" value={p.videoUrl} onChange={(e) => handleProductChange(i, e)} placeholder="URL de Video (YouTube o .mp4, opcional)" className="p-2 border rounded md:col-span-2" />
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
