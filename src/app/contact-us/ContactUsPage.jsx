'use client';


import React, { useState } from 'react';
import axios from 'axios';

import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowUpRight,
  Globe,
  Sparkles,
  Zap,
  Clock,
  User,
  MessageSquare,
  Youtube,
  Facebook,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const toast = {
  success: (msg) => console.log("Toast Success:", msg),
  error: (msg) => console.log("Toast Error:", msg)
};

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Logic from your provided code
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        formData
      );
      toast.success(res.data.message || 'Message sent successfully');


      // Simulating API Call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const contactOptions = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email Us",
      value: "trendikalait@gmail.com",
      href: "mailto:trendikalait@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Call Us",
      value: "+91 9220440585",
      href: "tel:9220440585"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Business Hours",
      value: "9:00 AM - 9:00 PM",
      href: "#"
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={24} />, url: 'https://www.facebook.com/share/14JLn8svZCB/?mibextid=wwXIfr', color: 'hover:text-blue-600' },
    { icon: <Instagram size={24} />, url: 'https://www.instagram.com/trendikalaofficial?igsh=MXdidTA0YmY2Ymd3YQ%3D%3D&utm_source=qr', color: 'hover:text-pink-600' },
    { icon: <Youtube size={24} />, url: 'https://www.youtube.com/@trendikala', color: 'hover:text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-blue-100">
      {/* Premium Background Decor */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-blue-100/40 rounded-xl blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#9CAF88]/20 rounded-xl blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:pt-24">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black font-heading font-bold tracking-tighter mb-6 bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text text-transparent"
          >
            Get in Touch with <br />
            <span className="text-[#9CAF88]">TrendiKala</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-xl font-medium font-body"
          >
            Have a question about our designs, orders, or custom creations?
            We’d love to hear from you — our team is here to help you every step of the way.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column: Contact Details */}
          <div className=" space-y-3">

            {/* Contact Bento Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 rounded-[1rem] font-body bg-white border border-slate-200 shadow-xl shadow-slate-100/50"
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-slate-800">
                Contact Details
              </h3>
              <div className="space-y-4">
                {contactOptions.map((opt, i) => (
                  <a
                    key={i}
                    href={opt.href}
                    className="group flex items-center justify-between p-4 rounded-[1rem] hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl text-[#9CAF88] group-hover:bg-[#9CAF88] group-hover:text-white transition-all">
                        {opt.icon}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{opt.label}</p>
                        <p className="font-medium text-slate-700">{opt.value}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="text-slate-300 group-hover:text-[#9CAF88] transition-colors" size={18} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Address Bento Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-[1rem] bg-slate-50 border border-slate-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-[#9CAF88]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2 font-home">Our Location</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium font-body">
                    Shop No. 225, Panchsheel Square Mall,<br />
                    Crossing Republik, Ghaziabad,<br />
                    Uttar Pradesh - 201016
                  </p>
                </div>
              </div>
            </motion.div>


          </div>

          <div className='space-y-3'>
            {/* Right Column: Premium Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-7"
            >
              <div className="h-full rounded-[1rem] bg-white border border-slate-200 p-8 lg:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-8 relative z-10"
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body">
                        <div className="relative">
                          <label className="text-[10px]  uppercase tracking-widest font-bold text-slate-400 mb-2 block ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#9CAF88]" size={18} />
                            <input
                              required
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              type="text"
                              className="w-full bg-transparent border-b border-slate-200 pl-7 py-3 focus:border-[#9CAF88] outline-none transition-all placeholder:text-slate-300 font-medium"
                              placeholder="Your Name"
                            />
                          </div>
                        </div>
                        <div className="relative ">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2 block ml-1">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#9CAF88]" size={18} />
                            <input
                              required
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              type="email"
                              className="w-full bg-transparent border-b border-slate-200 pl-7 py-3 focus:border-[#9CAF88] outline-none transition-all placeholder:text-slate-300 font-medium"
                              placeholder="your@gmail.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="relative font-body">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2 block ml-1">Your Message</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-0 top-3 text-slate-300 group-focus-within:text-[#9CAF88]" size={18} />
                          <textarea
                            required
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={1}
                            className="w-full bg-transparent border-b border-slate-200 pl-7 py-3 focus:border-[#9CAF88] outline-none transition-all placeholder:text-slate-300 font-medium resize-none"
                            placeholder="Tell us about your requirements..."
                          />
                        </div>
                      </div>

                      <button
                        disabled={loading}
                        type="submit"
                        className="group w-full relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-slate-900 rounded-[1.5rem] hover:bg-[#9CAF88] shadow-lg active:scale-95 disabled:opacity-50 overflow-hidden"
                      >
                        {loading ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-xl animate-spin" />
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="relative z-10">Send Message</span>
                            <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </div>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-24 h-24 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-8 border border-green-100 shadow-inner">
                        <CheckCircle2 size={48} />
                      </div>
                      <h2 className="text-4xl font-black font-heading mb-4 tracking-tighter text-slate-900">Message Received!</h2>
                      <p className="text-slate-500 font-body mb-8 max-w-sm font-medium">Thank you for contacting Trendi Kala. Our team will get back to you shortly.</p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-8 py-3 bg-slate-100 text-slate-600 font-heading rounded-2xl font-bold hover:bg-slate-200 transition-all"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Social Connect Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-[1rem] bg-[#9CAF88] text-white flex flex-col justify-between min-h-[166px] "
            >
              <h2 className="text-2xl font-black ">Connect With Us</h2>
              <div className="flex gap-4 ">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-[#9CAF88] transition-all shadow-lg border border-white/20"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Integrated Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 md:h-[500px] w-full rounded-[1rem] overflow-hidden border border-slate-200 relative group "
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2512.475565913287!2d77.43174877375253!3d28.630891584158345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefdc1da8ebe3%3A0x360edd4ea09c2493!2sTrendi%20Kala!5e1!3m2!1sen!2sin!4v1763147587507!5m2!1sen!2sin"
            className="w-full h-full border-0 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />


        </motion.div>


      </main>
    </div>
  );

};

export default App;