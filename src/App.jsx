import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Anchor, Menu, X, ArrowRight, MessageCircle, Play, Smartphone,
  Monitor, Check, Download, ExternalLink, Database, Zap, 
  Lock, Server, Mail, Phone as PhoneIcon, MapPin, CreditCard,
  Users, Building2, Ship, Clock, Bell, Calendar, DollarSign,
  Shield, BarChart3, Wifi, Sun, Moon, Linkedin, Globe,
  Instagram, Briefcase, Sparkles
} from 'lucide-react';

/* STATIC ASSETS */
const mobileScreens = [
  '/Screenshot_1.png',
  '/Screenshot_2.png',
  '/Screenshot_3.png',
  '/Screenshot_4.png',
  '/Screenshot_5.png',
  '/Screenshot_6.png',
  '/Screenshot_7.png'
];

const techStack = [
  { name: 'Google Cloud', logo: 'https://img.icons8.com/color/512/google-cloud.png' },
  { name: 'Google Calendar', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg' },
  { name: 'Make.com', logo: 'https://cdn.simpleicons.org/make/6f42c1' },
  { name: 'AppSheet', logo: 'https://make-cxp-documentation.ams3.digitaloceanspaces.com/apps-center-icons/appsheet.png' }
];

/* CONTENT DICTIONARY */
const content = {
  tr: {
    nav: { features: 'Özellikler', demo: 'Demo', contact: 'İletişim', whoWeServe: 'Kimler İçin', portfolio: 'Portföy' },
    hero: {
      headline: 'Yat İşletmenizi Otopilota Alın.',
      subheadline: "Excel ile boğuşmayı bırakın. WhatsApp üzerinden ödeme toplayan, takviminizi güncelleyen ve hatırlatmaları yöneten tam otomatik sistem.",
      ctaDemo: 'Sistemi Görün',
      ctaContact: 'Bize Ulaşın'
    },
    whoWeServe: {
      title: 'Kimler İçin Tasarlandı',
      subtitle: 'YachtMaster, teknelerini profesyonelce yönetmek isteyen herkes için',
      audiences: [
        {
          icon: 'Ship',
          title: 'Tekne Sahipleri',
          description: 'Kendi teknelerini kiralayan ve rezervasyonları, ödemeleri ve müşteri iletişimini optimize etmek isteyen bireysel sahipler.'
        },
        {
          icon: 'Building2',
          title: 'Kiralama Şirketleri',
          description: 'Birden fazla tekne işleten, satış ve müşteri yaşam döngüsünü ölçeklendirmek isteyen profesyonel operatörler.'
        },
        {
          icon: 'Users',
          title: 'Filo Yöneticileri',
          description: 'Büyük filosu tek bir platformda yöneten, veri analitiği ve otomatikleştirilmiş raporlama gerektiren şirketler.'
        }
      ]
    },
    features: {
      title: 'Güçlü Özellikler',
      subtitle: 'Teknelerinizi büyütmek için ihtiyacınız olan her şey',
      items: [
        {
          icon: 'Zap',
          title: 'Anında Ödeme',
          description: 'WhatsApp üzerinden otomatik Iyzico ödeme linkleri. Rezervasyondan ödemeye 2 dakika.'
        },
        {
          icon: 'Calendar',
          title: 'Takvim Senkronizasyonu',
          description: 'Google Takvim ile gerçek zamanlı senkronizasyon. Çakışmaları otomatik engeller.'
        },
        {
          icon: 'Bell',
          title: 'Akıllı Hatırlatmalar',
          description: 'Tur öncesi konum, upsell teklifleri ve tur sonrası geri bildirim otomasyonu.'
        },
        {
          icon: 'BarChart3',
          title: 'Finansal Raporlar',
          description: 'Gelir, masraf ve karlılık analizleri. Hangi teknenin en çok kazandırdığını görün.'
        },
        {
          icon: 'Shield',
          title: 'Güvenli Altyapı',
          description: 'Google Cloud üzerinde. Verileriniz şifrelenir, yedeklenir ve korunur.'
        },
        {
          icon: 'Wifi',
          title: 'Her Yerden Erişim',
          description: 'Mobil, tablet, masaüstü. Tüm cihazlarınızda senkronize çalışır.'
        }
      ]
    },
    experience: {
      title: 'Dijital Deneyim',
      desktop: 'Masaüstü Görünümü',
      mobile: 'Mobil Görünümü'
    },
    workflow: {
      title: 'Manager Pro İş Akışı',
      subtitle: 'Tam otomasyon döngüsü',
      steps: [
        { title: '1. Rezervasyon Girişi', desc: 'Kaptan rezervasyon detaylarını AppSheet\'e girer.' },
        { title: '2. Otomatik Ödeme', desc: 'Sistem anında müşteriye WhatsApp üzerinden Iyzico ödeme linki gönderir.' },
        { title: '3. Senkronizasyon & Onay', desc: 'Ödeme alındıktan sonra Google Takvim etkinliği oluşturur ve onay bileti gönderir.' },
        { title: '4. Yaşam Döngüsü', desc: 'Sistem tur gününde konum + 2 saat önce ek hizmet teklifleri + sonrasında geri bildirim linki gönderir.' }
      ]
    },
    offers: {
      title: 'Şubat Özel Fırsatı',
      subtitle: 'Ajans modeli: Tek seferlik ödeme',
      discount: '%30 İndirimli',
      core: {
        name: 'Core System',
        price: '$388',
        originalPrice: '$554',
        badge: 'Dijital Günlük & 48 Saatte Kurulum',
        features: ['WhatsApp → Takvim Entegrasyonu', 'Rezervasyon Yönetimi', 'Google Cloud Altyapısı', '2 Hafta Destek']
      },
      manager: {
        name: 'Manager Pro',
        price: '$788',
        originalPrice: '$1,126',
        badge: 'Tam Otomasyon (Iyzico + WhatsApp) & 4 Gün Kurulum',
        features: ['Tüm Core Özellikleri', 'Iyzico + WhatsApp Otomasyonu', 'Finansal Raporlar', 'Yaşam Döngüsü Yönetimi']
      },
      viewWorkflow: 'İş Akışını Görüntüle',
      hideWorkflow: 'İş Akışını Gizle'
    },
    tech: { title: 'Güçlü Altyapı' },
    footer: {
      brand: 'YachtMaster',
      tagline: 'Lüks tekne yönetiminde yeni standart.',
      quickLinks: 'Hızlı Bağlantılar',
      portfolio: 'Proje Portföyümüz',
      website: 'AppSheet Solutions',
      contact: {
        title: 'İletişim'
      },
      email: 'erkinjonovsamandar2@gmail.com',
      phone: '+90 551 520 95 56',
      whatsapp: '+998337323505',
      social: 'Sosyal Medya',
      instagramComing: 'Yakında',
      rights: '© 2026 YachtMaster. Tüm hakları saklıdır.'
    }
  },
  en: {
    nav: { features: 'Features', demo: 'Demo', contact: 'Contact', whoWeServe: 'Who We Serve', portfolio: 'Portfolio' },
    hero: {
      headline: 'Put Your Yacht Business on Autopilot.',
      subheadline: "Stop wrestling with Excel. A fully automated system that collects payments via WhatsApp, updates your calendar, and handles reminders.",
      ctaDemo: 'View System',
      ctaContact: 'Contact Us'
    },
    whoWeServe: {
      title: 'Who We Serve',
      subtitle: 'YachtMaster is built for anyone who wants to manage their boats professionally',
      audiences: [
        {
          icon: 'Ship',
          title: 'Boat Owners',
          description: 'Individual owners who rent out their boats and want to optimize reservations, payments, and customer communication.'
        },
        {
          icon: 'Building2',
          title: 'Charter Companies',
          description: 'Professional operators managing multiple boats who need to scale their sales and customer lifecycle.'
        },
        {
          icon: 'Users',
          title: 'Fleet Managers',
          description: 'Companies managing large fleets on a single platform, requiring data analytics and automated reporting.'
        }
      ]
    },
    features: {
      title: 'Powerful Features',
      subtitle: 'Everything you need to grow your boat business',
      items: [
        {
          icon: 'Zap',
          title: 'Instant Payments',
          description: 'Automatic Iyzico payment links via WhatsApp. From booking to payment in 2 minutes.'
        },
        {
          icon: 'Calendar',
          title: 'Calendar Sync',
          description: 'Real-time sync with Google Calendar. Automatically prevents double bookings.'
        },
        {
          icon: 'Bell',
          title: 'Smart Reminders',
          description: 'Pre-trip location, upsell offers, and post-trip feedback automation.'
        },
        {
          icon: 'BarChart3',
          title: 'Financial Reports',
          description: 'Revenue, expense, and profitability analysis. See which boat earns the most.'
        },
        {
          icon: 'Shield',
          title: 'Secure Infrastructure',
          description: 'Built on Google Cloud. Your data is encrypted, backed up, and protected.'
        },
        {
          icon: 'Wifi',
          title: 'Access Anywhere',
          description: 'Mobile, tablet, desktop. Works seamlessly across all your devices.'
        }
      ]
    },
    experience: {
      title: 'Digital Experience',
      desktop: 'Desktop View',
      mobile: 'Mobile View'
    },
    workflow: {
      title: 'Manager Pro Workflow',
      subtitle: 'Complete automation cycle',
      steps: [
        { title: '1. Booking Entry', desc: 'Captain enters reservation details into AppSheet.' },
        { title: '2. Automatic Payment', desc: 'System instantly sends Iyzico payment link via WhatsApp to customer.' },
        { title: '3. Sync & Confirmation', desc: 'After payment received, creates Google Calendar event and sends confirmation ticket.' },
        { title: '4. Lifecycle', desc: 'System sends location on tour day + upsell offers 2 hours before + feedback link after tour.' }
      ]
    },
    offers: {
      title: 'February Special Offer',
      subtitle: 'Agency model: One-time payment',
      discount: '30% OFF',
      core: {
        name: 'Core System',
        price: '$388',
        originalPrice: '$554',
        badge: 'Digital Logbook & 48hr Setup',
        features: ['WhatsApp → Calendar Integration', 'Booking Management', 'Google Cloud Infrastructure', '2 Weeks Support']
      },
      manager: {
        name: 'Manager Pro',
        price: '$788',
        originalPrice: '$1,126',
        badge: 'Full Automation (Iyzico + WhatsApp) & 4 Day Setup',
        features: ['All Core Features', 'Iyzico + WhatsApp Automation', 'Financial Reports', 'Lifecycle Management']
      },
      viewWorkflow: 'View Workflow',
      hideWorkflow: 'Hide Workflow'
    },
    tech: { title: 'Powerful Infrastructure' },
    footer: {
      brand: 'YachtMaster',
      tagline: 'The new standard in luxury boat management.',
      quickLinks: 'Quick Links',
      portfolio: 'Our Portfolio',
      website: 'AppSheet Solutions',
      contact: {
        title: 'Contact'
      },
      email: 'erkinjonovsamandar2@gmail.com',
      phone: '+90 551 520 95 56',
      whatsapp: '+998337323505',
      social: 'Social Media',
      instagramComing: 'Coming Soon',
      rights: '© 2026 YachtMaster. All rights reserved.'
    }
  }
};

const iconMap = {
  Ship, Building2, Users, Zap, Calendar, Bell, BarChart3, Shield, Wifi
};

function App() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('desktop');
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const t = content[lang];

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % mobileScreens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${theme === 'dark' ? 'bg-[#0f172a]/90 border-white/10' : 'bg-white/90 border-slate-200'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Anchor className="w-8 h-8 text-[#3b82f6] vivid-icon vivid-icon-blue" />
              <span className="text-2xl font-bold nav-brand font-serif">YachtMaster</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['whoWeServe', 'features', 'demo', 'contact', 'portfolio'].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="nav-link hover:text-[#3b82f6] transition font-medium"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.nav[section]}
                </motion.button>
              ))}
              
              {/* Language Toggle */}
              <div className="royal-toggle flex">
                <button
                  onClick={() => setLang('en')}
                  className={`toggle-button ${lang === 'en' ? 'toggle-button-active' : 'toggle-button-inactive'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('tr')}
                  className={`toggle-button ${lang === 'tr' ? 'toggle-button-active' : 'toggle-button-inactive'}`}
                >
                  TR
                </button>
              </div>

              {/* Theme Toggle */}
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-[#3b82f6] hover:bg-opacity-20 transition"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Theme Toggle */}
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-[#3b82f6] hover:bg-opacity-20 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </motion.button>

              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2"
                whileTap={{ scale: 0.9 }}
              >
                {menuOpen ? (
                  <X className="w-6 h-6 nav-link" />
                ) : (
                  <Menu className="w-6 h-6 nav-link" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mobile-menu border-t border-[#3b82f6] border-opacity-20"
            >
              <div className="px-4 py-6 space-y-4">
                {['whoWeServe', 'features', 'demo', 'contact', 'portfolio'].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left nav-link hover:text-[#3b82f6] transition py-2 font-medium"
                    whileHover={{ x: 4 }}
                  >
                    {t.nav[section]}
                  </motion.button>
                ))}
                
                <div className="royal-toggle flex w-full mt-4">
                  <button
                    onClick={() => setLang('en')}
                    className={`toggle-button flex-1 ${lang === 'en' ? 'toggle-button-active' : 'toggle-button-inactive'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang('tr')}
                    className={`toggle-button flex-1 ${lang === 'tr' ? 'toggle-button-active' : 'toggle-button-inactive'}`}
                  >
                    TR
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background - Adjusted for light mode visibility */}
        <motion.div
          className={`absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl ${theme === 'dark' ? 'bg-blue-500 opacity-20' : 'bg-blue-300 opacity-40'}`}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl ${theme === 'dark' ? 'bg-purple-500 opacity-20' : 'bg-purple-300 opacity-40'}`}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div 
          className="max-w-6xl mx-auto text-center relative z-10"
          style={{ y: y1, opacity }}
        >
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            {/* HEADLINE FIX: Added 'mr-3' for spacing and theme colors */}
            <motion.h1 
              variants={fadeUp}
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 font-serif leading-tight"
            >
              {t.hero.headline.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3 sm:mr-4 last:mr-0"
                  // ⚡ FORCE COLOR UPDATE via Framer Motion
                  animate={{ 
                    color: theme === 'dark' ? '#ffffff' : '#0f172a' 
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.05, 
                    color: '#3b82f6',
                    transition: { duration: 0.2 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* SUBHEADLINE FIX: Added theme colors */}
            <motion.p 
              variants={fadeUp}
              className={`text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto mb-12 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={() => scrollToSection('demo')}
                className="bg-[#3b82f6] text-white px-10 py-5 rounded-full inline-flex items-center space-x-3 text-lg font-bold hover:bg-blue-600 transition shadow-lg hover:shadow-blue-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6 fill-current" />
                <span>{t.hero.ctaDemo}</span>
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('contact')}
                className={`border px-10 py-5 rounded-full inline-flex items-center space-x-3 text-lg font-bold transition ${theme === 'dark' ? 'border-white/20 hover:bg-white/10 text-white' : 'border-slate-300 hover:bg-slate-100 text-[#0f172a]'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-6 h-6" />
                <span>{t.hero.ctaContact}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHO WE SERVE */}
      <section id="whoWeServe" className="py-32 px-4 sm:px-6 lg:px-8 relative section-who-serve">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-6 h-6 text-[#3b82f6]" />
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold section-title font-serif">
                {t.whoWeServe.title}
              </h2>
            </motion.div>
            <p className="text-xl sm:text-2xl section-subtitle mt-6">{t.whoWeServe.subtitle}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {t.whoWeServe.audiences.map((audience, i) => {
              const Icon = iconMap[audience.icon];
              return (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{ 
                    y: -12,
                    transition: { duration: 0.3 }
                  }}
                  className="who-serve-card p-10 rounded-3xl cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-16 h-16 mb-6 vivid-icon vivid-icon-blue" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 card-title">{audience.title}</h3>
                  <p className="card-description leading-relaxed">{audience.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative section-features">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 section-title font-serif">
              {t.features.title}
            </h2>
            <p className="text-xl sm:text-2xl section-subtitle">{t.features.subtitle}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {t.features.items.map((feature, i) => {
              const Icon = iconMap[feature.icon];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  className="glass-ultra p-10 rounded-3xl group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-14 h-14 mb-6 vivid-icon vivid-icon-blue group-hover:vivid-icon-purple transition-all" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 card-title">{feature.title}</h3>
                  <p className="card-description leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* DEMO EXPERIENCE */}
      <section id="demo" className="py-32 px-4 sm:px-6 lg:px-8 relative section-demo">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 section-title font-serif">
              {t.experience.title}
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-12"
          >
            <div className="tab-container flex justify-center rounded-2xl p-2 max-w-md mx-auto">
              <button
                onClick={() => setActiveTab('desktop')}
                className={`tab-button flex-1 flex items-center justify-center space-x-2 ${
                  activeTab === 'desktop' ? 'tab-button-active' : 'tab-button-inactive'
                }`}
              >
                <Monitor className="w-5 h-5" />
                <span>{t.experience.desktop}</span>
              </button>
              <button
                onClick={() => setActiveTab('mobile')}
                className={`tab-button flex-1 flex items-center justify-center space-x-2 ${
                  activeTab === 'mobile' ? 'tab-button-active' : 'tab-button-inactive'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span>{t.experience.mobile}</span>
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
          {activeTab === 'desktop' && (
              <motion.div
                key="desktop"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
                // Added "aspect-video" and styling here to ensure it has height
                className="video-container max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
              >
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/EQHG6qoa3cQ" 
                  title="Demo Video" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
              </motion.div>
            )}

            {activeTab === 'mobile' && (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center"
              >
                <div className="iphone-frame">
                  <div className="iphone-notch"></div>
                  <div className="iphone-screen">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentScreen}
                        src={mobileScreens[currentScreen]}
                        alt={`Mobile Screenshot ${currentScreen + 1}`}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6 }}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 relative section-pricing">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 section-title font-serif">
              {t.offers.title}
            </h2>
            <p className="text-xl sm:text-2xl section-subtitle">{t.offers.subtitle}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {/* Core System Card */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-ultra p-10 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-blue-500 bg-opacity-20 text-blue-400 rounded-full text-sm font-bold border border-blue-500 border-opacity-30">
                  {t.offers.discount}
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-4 card-title">{t.offers.core.name}</h3>
              <p className="text-sm card-description mb-6">{t.offers.core.badge}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-black gold-gradient-text">{t.offers.core.price}</span>
                <span className="text-2xl ml-3 line-through card-description">{t.offers.core.originalPrice}</span>
              </div>

              <div className="space-y-4">
                {t.offers.core.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="card-description">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Manager Pro Card */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-ultra-highlight p-10 rounded-3xl relative overflow-hidden"
            >
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-bold shadow-lg">
                  {t.offers.discount}
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-4 card-title">{t.offers.manager.name}</h3>
              <p className="text-sm card-description mb-6">{t.offers.manager.badge}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-black gold-gradient-text">{t.offers.manager.price}</span>
                <span className="text-2xl ml-3 line-through card-description">{t.offers.manager.originalPrice}</span>
              </div>

              <div className="space-y-4">
                {t.offers.manager.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="card-description">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => setShowWorkflow(!showWorkflow)}
                className="mt-8 w-full royal-button-primary px-6 py-4 rounded-full inline-flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowRight className="w-5 h-5" />
                <span>{showWorkflow ? t.offers.hideWorkflow : t.offers.viewWorkflow}</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Workflow Section */}
          <AnimatePresence>
            {showWorkflow && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-16 overflow-hidden"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="text-center mb-12"
                >
                  <h3 className="text-3xl sm:text-5xl font-bold mb-4 section-title font-serif">
                    {t.workflow.title}
                  </h3>
                  <p className="text-xl section-subtitle">{t.workflow.subtitle}</p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                >
                  {t.workflow.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      whileHover={{ scale: 1.03 }}
                      className="glass-ultra p-8 rounded-2xl"
                    >
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center text-white font-bold text-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {i + 1}
                        </motion.div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 card-title">{step.title}</h4>
                          <p className="card-description">{step.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mt-16"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="https://app.supademo.com/demo/cml7rvvdt78zazsad49bgxgk4?utm_source=link"
                target="_blank"
                rel="noopener noreferrer"
                className="royal-button-primary px-8 py-4 rounded-full inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Interactive Demo</span>
              </motion.a>
              <motion.a 
                href="https://drive.google.com/file/d/1XH4D8R_o4HefhD1iUWZ4z-d_rez4km4e/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="royal-button-secondary px-8 py-4 rounded-full inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                <span>Demo PDF</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative section-tech">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-4xl sm:text-6xl font-bold text-center mb-20 section-title font-serif"
          >
            {t.tech.title}
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ 
                  y: -8, 
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.4 }
                }}
                className="glass-ultra p-8 text-center rounded-2xl cursor-pointer"
              >
                <motion.img 
                  src={tech.logo} 
                  alt={tech.name}
                  className="w-16 h-16 mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                />
                <p className="card-title font-bold">{tech.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-32 px-4 sm:px-6 lg:px-8 relative section-who-serve">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Briefcase className="w-8 h-8 text-[#3b82f6]" />
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold section-title font-serif">
                {t.footer.portfolio}
              </h2>
            </motion.div>
            <p className="text-xl sm:text-2xl section-subtitle mb-12 max-w-3xl mx-auto">
              {lang === 'en' 
                ? 'Explore our complete collection of successful projects and client solutions' 
                : 'Başarılı projelerimizin ve müşteri çözümlerimizin tam koleksiyonunu keşfedin'}
            </p>
            
            <motion.a
              href="https://appsheet-solutions.notion.site/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="royal-button-primary px-10 py-5 rounded-full inline-flex items-center space-x-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-6 h-6" />
              <span>{lang === 'en' ? 'View Portfolio' : 'Portföyü Görüntüle'}</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative section-footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Anchor className="w-8 h-8 text-[#3b82f6] vivid-icon vivid-icon-blue" />
                <h4 className="text-2xl font-bold footer-brand font-serif">{t.footer.brand}</h4>
              </motion.div>
              <p className="footer-text mb-8 leading-relaxed">{t.footer.tagline}</p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="footer-column-title mb-6">{t.footer.quickLinks}</h4>
              <div className="space-y-4">
                <motion.a 
                  href="https://appsheet-solutions.notion.site/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 footer-contact group"
                  whileHover={{ x: 4 }}
                >
                  <Briefcase className="w-5 h-5 group-hover:text-[#3b82f6] transition" />
                  <span>{t.footer.portfolio}</span>
                </motion.a>
                <motion.a 
                  href="https://earnest-conkies-7a833f.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 footer-contact group"
                  whileHover={{ x: 4 }}
                >
                  <Globe className="w-5 h-5 group-hover:text-[#3b82f6] transition" />
                  <span>{t.footer.website}</span>
                </motion.a>
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="footer-column-title mb-6">{t.footer.contact.title}</h4>
              <div className="space-y-4 mb-6">
                <motion.a 
                  href={`mailto:${t.footer.email}`} 
                  className="flex items-center space-x-3 footer-contact"
                  whileHover={{ x: 4 }}
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm break-all">{t.footer.email}</span>
                </motion.a>
                <motion.a 
                  href={`tel:${t.footer.phone}`} 
                  className="flex items-center space-x-3 footer-contact"
                  whileHover={{ x: 4 }}
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span>{t.footer.phone}</span>
                </motion.a>
                <motion.a 
                  href={`https://wa.me/${t.footer.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-[#25D366] hover:underline transition"
                  whileHover={{ x: 4 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.footer.whatsapp}</span>
                </motion.a>
              </div>

              {/* Social Media */}
              <h4 className="footer-column-title mb-4 text-sm">{t.footer.social}</h4>
              <div className="flex items-center space-x-4">
                <motion.a 
                  href="https://linkedin.com/company/appsheetsolutions" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon p-2 rounded-lg hover:bg-[#3b82f6] hover:bg-opacity-20 transition"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <div className="social-icon p-2 rounded-lg opacity-40 cursor-not-allowed">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {t.footer.instagramComing}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="border-t footer-border pt-8 text-center">
            <p className="footer-text">{t.footer.rights}</p>
          </div>
        </div>
      </footer>

      {/* STICKY WHATSAPP */}
      <motion.a
        href={`https://wa.me/${t.footer.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 bg-[#25D366] text-white p-5 rounded-full shadow-2xl z-50"
      >
        <MessageCircle className="w-10 h-10" />
      </motion.a>
    </div>
  );
}

export default App;