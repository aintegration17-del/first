import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Shield, CheckCircle, ArrowRight } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  investmentExperience: string;
  riskTolerance: string;
  initialInvestment: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

export const Registration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    investmentExperience: '',
    riskTolerance: '',
    initialInvestment: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic information' },
    { id: 2, title: 'Investment Profile', description: 'Your investment goals' },
    { id: 3, title: 'Security', description: 'Account protection' },
    { id: 4, title: 'Verification', description: 'Complete setup' }
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;
      case 2:
        if (!formData.investmentExperience) newErrors.investmentExperience = 'Please select your experience level';
        if (!formData.riskTolerance) newErrors.riskTolerance = 'Please select your risk tolerance';
        if (!formData.initialInvestment) newErrors.initialInvestment = 'Please select initial investment amount';
        break;
      case 3:
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions' as any;
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      setCurrentStep(4);
      // Here you would typically submit the form data
      console.log('Form submitted:', formData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Investment Experience</label>
              <div className="grid grid-cols-1 gap-3">
                {['Beginner', 'Intermediate', 'Advanced', 'Professional'].map((level) => (
                  <label key={level} className="flex items-center p-3 border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      value={level}
                      checked={formData.investmentExperience === level}
                      onChange={(e) => handleInputChange('investmentExperience', e.target.value)}
                      className="mr-3 text-emerald-500"
                    />
                    <span className="text-slate-700">{level}</span>
                  </label>
                ))}
              </div>
              {errors.investmentExperience && <p className="text-red-500 text-sm mt-1">{errors.investmentExperience}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Risk Tolerance</label>
              <div className="grid grid-cols-1 gap-3">
                {['Conservative', 'Moderate', 'Aggressive', 'Very Aggressive'].map((risk) => (
                  <label key={risk} className="flex items-center p-3 border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="risk"
                      value={risk}
                      checked={formData.riskTolerance === risk}
                      onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                      className="mr-3 text-emerald-500"
                    />
                    <span className="text-slate-700">{risk}</span>
                  </label>
                ))}
              </div>
              {errors.riskTolerance && <p className="text-red-500 text-sm mt-1">{errors.riskTolerance}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Initial Investment Amount</label>
              <div className="grid grid-cols-2 gap-3">
                {['$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+'].map((amount) => (
                  <label key={amount} className="flex items-center p-3 border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="investment"
                      value={amount}
                      checked={formData.initialInvestment === amount}
                      onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                      className="mr-3 text-emerald-500"
                    />
                    <span className="text-slate-700 text-sm">{amount}</span>
                  </label>
                ))}
              </div>
              {errors.initialInvestment && <p className="text-red-500 text-sm mt-1">{errors.initialInvestment}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Create a strong password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 mr-3 text-emerald-500"
                />
                <span className="text-sm text-slate-600">
                  I agree to the <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a> and <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms as string}</p>}

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.subscribeNewsletter}
                  onChange={(e) => handleInputChange('subscribeNewsletter', e.target.checked)}
                  className="mt-1 mr-3 text-emerald-500"
                />
                <span className="text-sm text-slate-600">
                  Subscribe to newsletter for market updates and investment tips
                </span>
              </label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Account Created Successfully!</h3>
              <p className="text-slate-600">
                Welcome to our investment platform. Your account has been created and is ready to use.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h4 className="font-semibold text-slate-900 mb-4">Next Steps:</h4>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Verify your email address</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Complete identity verification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Fund your account</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Start investing</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl transition-colors">
              Go to Dashboard
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Secure Registration
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Start Your Investment Journey
          </h2>
          <p className="text-xl text-slate-600">
            Join thousands of investors who trust us with their financial future
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-slate-50 px-8 py-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.id 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : step.id}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`font-medium ${currentStep >= step.id ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {step.title}
                    </div>
                    <div className="text-sm text-slate-400">{step.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentStep === 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={currentStep === 3 ? handleSubmit : handleNext}
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors inline-flex items-center"
                >
                  {currentStep === 3 ? 'Create Account' : 'Next Step'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};