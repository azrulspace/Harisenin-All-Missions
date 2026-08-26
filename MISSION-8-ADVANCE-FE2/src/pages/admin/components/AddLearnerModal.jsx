import React, { useState, useRef } from 'react';

export default function AddLearnerModal({ isOpen, onClose, onAddManual, onAddCSV }) {
  const [activeTab, setActiveTab] = useState('manual');
  
  // Manual Form State
  const [manualForm, setManualForm] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  
  // CSV State
  const [csvFile, setCsvFile] = useState(null);
  const fileInputRef = useRef(null);
  
  if (!isOpen) return null;

  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setManualForm(prev => ({ ...prev, [name]: value }));
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    onAddManual(manualForm);
    setManualForm({ fullName: '', email: '', phone: '' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      setCsvFile(file);
    } else {
      alert("Please upload a valid .csv file");
    }
  };

  const handleCSVSubmit = () => {
    if (!csvFile) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      // Simple CSV parsing for demo purposes
      const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      if (lines.length > 1) {
        // Assume header is first line
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = values[index] ? values[index].trim() : '';
          });
          return obj;
        });
        onAddCSV(data);
        setCsvFile(null);
      }
    };
    reader.readAsText(csvFile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold text-gray-900">Add New Learner</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 shrink-0">
          <button 
            className={`py-4 px-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'manual' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('manual')}
          >
            Manual Input
          </button>
          <button 
            className={`py-4 px-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'csv' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('csv')}
          >
            Upload CSV
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {activeTab === 'manual' ? (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={manualForm.fullName}
                  onChange={handleManualChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={manualForm.email}
                  onChange={handleManualChange}
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number (WhatsApp)</label>
                <input 
                  type="text" 
                  name="phone"
                  value={manualForm.phone}
                  onChange={handleManualChange}
                  required
                  placeholder="e.g. 628123456789"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-[#0070F3] hover:bg-blue-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
                  Add Learner
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm font-medium text-gray-900">Click to upload CSV</p>
                <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept=".csv" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
              </div>
              
              {csvFile && (
                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{csvFile.name}</p>
                      <p className="text-xs text-gray-500">{(csvFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button onClick={() => setCsvFile(null)} className="text-gray-400 hover:text-red-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="pt-4">
                <button 
                  onClick={handleCSVSubmit} 
                  disabled={!csvFile}
                  className="w-full bg-[#0070F3] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-colors"
                >
                  Upload & Import
                </button>
              </div>
              
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 mt-4">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs">
                  <p className="font-semibold mb-1">CSV Format Requirements:</p>
                  <p>File must contain headers: <code>Name</code>, <code>Email</code>, <code>PhoneNumber</code> (case-sensitive).</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
