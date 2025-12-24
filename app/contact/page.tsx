"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honey: "", // honeypot
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors = { name: "", email: "", phone: "", subject: "", message: "" };
    let isValid = true;

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    const phone = formData.phone.trim();
    if (phone.startsWith("+91")) {
      if (!/^\+91\d{10}$/.test(phone)) {
        newErrors.phone = "Invalid phone number";
        isValid = false;
      }
    } else {
      if (!/^\d{10}$/.test(phone)) {
        newErrors.phone = "Invalid phone number";
        isValid = false;
      }
    }

    if (!formData.subject.trim() || formData.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
      isValid = false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honey.trim() !== "") return;
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          honey: formData.honey,
        }),
      });

      if (!res.ok) throw new Error();

      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        honey: "",
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 sm:py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Success Alert */}
        {showSuccess && (
          <div className='mb-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-slide-in'>
            <CheckCircle2 className='h-6 w-6 flex-shrink-0' />
            <div>
              <p className='font-semibold'>Message Sent Successfully!</p>
              <p className='text-sm text-green-100'>We&apos;ll get back to you within 24 hours</p>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3'>
            Contact Us
          </h1>
          <p className='text-gray-600 text-base sm:text-lg max-w-2xl mx-auto'>
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Main Content */}
        <div className='flex lg:flex-row flex-col gap-6 lg:gap-8 items-start'>

          {/* LEFT — CONTACT INFO */}
          <div className='w-full lg:w-2/5 space-y-6'>
            
            {/* Our Showroom */}
            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                  <MapPin className='h-6 w-6 text-blue-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-900'>Our Showroom</h3>
              </div>
              <p className='text-gray-700 leading-relaxed'>
                Shop no.2A, first floor A wing, Aman Highland Park, Sanjay Nagar, Malad East, Mumbai 400097.
              </p>
            </div>

            {/* Quick Help */}
            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                  <MessageCircle className='h-6 w-6 text-green-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-900'>Quick Help</h3>
              </div>
              <p className='text-gray-700 mb-4'>
                You can ask anything you want to know about our products
              </p>
              
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Mail className='h-5 w-5 text-blue-600' />
                  <a href='mailto:contact@razacashkart.com' className='text-gray-700 hover:text-blue-600 transition-colors'>
                    contact@razacashkart.com
                  </a>
                </div>
                <div className='flex items-center gap-3'>
                  <Phone className='h-5 w-5 text-blue-600' />
                  <a href='tel:+919987857886' className='text-gray-700 hover:text-blue-600 transition-colors'>
                    +91 9987857886
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — CONTACT FORM */}
          <div className='w-full lg:w-3/5 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
            <div className='bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-6'>
              <h2 className='text-2xl sm:text-3xl font-bold text-white flex items-center gap-3'>
                <Send className='h-7 w-7' />
                Send us a Message
              </h2>
              <p className='text-blue-100 mt-2'>Fill out the form below and we&apos;ll get back to you</p>
            </div>

            <form onSubmit={handleSubmit} className='p-6 sm:p-8 space-y-6'>
              
              {/* Honeypot */}
              <input
                type='text'
                value={formData.honey}
                onChange={(e) => setFormData({ ...formData, honey: e.target.value })}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete='off'
              />

              {/* Name Field */}
              <div className='space-y-2'>
                <label className='text-sm font-semibold text-gray-700'>
                  Your Name
                </label>
                <input
                  required
                  type='text'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder='Enter your full name'
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className='text-red-600 text-sm'>{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className='space-y-2'>
                <label className='text-sm font-semibold text-gray-700'>
                  Email
                </label>
                <input
                  required
                  type='email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder='your.email@example.com'
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className='text-red-600 text-sm'>{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className='space-y-2'>
                <label className='text-sm font-semibold text-gray-700'>
                  Phone Number
                </label>
                <input
                  required
                  type='tel'
                  value={formData.phone}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const cleaned = raw.replace(/[^0-9+]/g, "");
                    if (cleaned.includes("+") && !cleaned.startsWith("+")) return;
                    setFormData({ ...formData, phone: cleaned });
                  }}
                  placeholder='+91 or 10-digit number'
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className='text-red-600 text-sm'>{errors.phone}</p>
                )}
              </div>

              {/* Subject Field */}
              <div className='space-y-2'>
                <label className='text-sm font-semibold text-gray-700'>
                  Subject
                </label>
                <input
                  required
                  type='text'
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder='What is this about?'
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.subject && (
                  <p className='text-red-600 text-sm'>{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div className='space-y-2'>
                <label className='text-sm font-semibold text-gray-700'>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder='Tell us more about your inquiry...'
                  className={`w-full resize-none px-4 py-3 border-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {errors.message && (
                  <p className='text-red-600 text-sm'>{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
              >
                {loading ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className='h-5 w-5' />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}