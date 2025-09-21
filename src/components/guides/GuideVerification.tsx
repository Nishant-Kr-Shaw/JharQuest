import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, Upload, User, Award, Clock, Star } from 'lucide-react';
import { guides } from '../../data/mockData';
import { useApp } from '../../contexts/AppContext';

export function GuideVerification() {
  const { dispatch } = useApp();
  const [selectedGuide, setSelectedGuide] = useState(guides[0]);
  const [verificationStep, setVerificationStep] = useState('overview');
  // const [documents, setDocuments] = useState<string[]>([]);

  const handleVerify = (guideId: string, verified: boolean) => {
    dispatch({ 
      type: 'UPDATE_GUIDE_VERIFICATION', 
      payload: { guideId, verified } 
    });
  };

  const blockchainVerification = {
    transactionHash: '0x1234567890abcdef...',
    blockNumber: 15847392,
    timestamp: new Date().toISOString(),
    gasUsed: '21000',
    status: 'Confirmed'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            <span>Blockchain-Secured Verification</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Guide Verification System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure, transparent, and tamper-proof verification of tourist guides using blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Guide List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Guides for Review</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {guides.map((guide) => (
                  <div
                    key={guide.id}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      selectedGuide.id === guide.id ? 'bg-blue-50 border-r-4 border-blue-500' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedGuide(guide)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={guide.photo}
                        alt={guide.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{guide.name}</h3>
                          {guide.verified ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {guide.specialties.slice(0, 2).join(', ')}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{guide.rating}</span>
                          <span className="text-xs text-gray-400">({guide.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: 'overview', label: 'Overview', icon: User },
                    { id: 'documents', label: 'Documents', icon: Upload },
                    { id: 'blockchain', label: 'Blockchain', icon: Shield }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setVerificationStep(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                        verificationStep === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Overview Tab */}
              {verificationStep === 'overview' && (
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    <div className="flex-shrink-0">
                      <img
                        src={selectedGuide.photo}
                        alt={selectedGuide.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedGuide.name}</h2>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedGuide.verified
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {selectedGuide.verified ? 'Verified' : 'Pending'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Experience
                          </label>
                          <p className="text-lg font-semibold text-gray-900">
                            {selectedGuide.experience} years
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rating
                          </label>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-lg font-semibold text-gray-900 ml-1">
                                {selectedGuide.rating}
                              </span>
                            </div>
                            <span className="text-gray-600">({selectedGuide.reviews} reviews)</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Languages
                          </label>
                          <div className="flex flex-wrap gap-1">
                            {selectedGuide.languages.map((lang) => (
                              <span
                                key={lang}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price per Day
                          </label>
                          <p className="text-lg font-semibold text-emerald-600">
                            ₹{selectedGuide.pricePerDay.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Specialties
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedGuide.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Certifications
                        </label>
                        <div className="space-y-2">
                          {selectedGuide.certifications.map((cert) => (
                            <div key={cert} className="flex items-center space-x-2">
                              <Award className="h-4 w-4 text-green-500" />
                              <span className="text-gray-700">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Verification Actions */}
                      {!selectedGuide.verified && (
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleVerify(selectedGuide.id, true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Approve Verification</span>
                          </button>
                          <button
                            onClick={() => handleVerify(selectedGuide.id, false)}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {verificationStep === 'documents' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Submitted Documents
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Government ID', status: 'verified', file: 'aadhar_card.pdf' },
                      { name: 'Guide License', status: 'verified', file: 'guide_license.pdf' },
                      { name: 'Experience Certificate', status: 'pending', file: 'experience_cert.pdf' },
                      { name: 'Training Certificate', status: 'verified', file: 'training_cert.pdf' }
                    ].map((doc, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              doc.status === 'verified'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {doc.status}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{doc.file}</p>
                        <div className="flex space-x-2">
                          <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 transition-colors">
                            View
                          </button>
                          <button className="bg-gray-50 text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blockchain Tab */}
              {verificationStep === 'blockchain' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Blockchain Verification Record
                  </h3>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          Verification Status
                        </h4>
                        <p className="text-sm text-gray-600">
                          Cryptographically secured on blockchain
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Transaction Hash
                        </label>
                        <p className="text-sm font-mono bg-white rounded px-3 py-2 border">
                          {blockchainVerification.transactionHash}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Block Number
                        </label>
                        <p className="text-sm font-mono bg-white rounded px-3 py-2 border">
                          {blockchainVerification.blockNumber.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Timestamp
                        </label>
                        <p className="text-sm font-mono bg-white rounded px-3 py-2 border">
                          {new Date(blockchainVerification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-700">
                            {blockchainVerification.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Smart Contract Details</h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Contract Address:</strong> 0x742d35Cc7Bf58C...</p>
                      <p><strong>Network:</strong> Ethereum Mainnet</p>
                      <p><strong>Gas Used:</strong> {blockchainVerification.gasUsed}</p>
                      <p><strong>Verification Type:</strong> Guide Certification</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}