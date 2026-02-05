import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Anchor, Menu, X, ArrowRight, MessageCircle, Play, Smartphone,
  Monitor, Check, Download, ExternalLink, Database, Zap, 
  Lock, Server, Mail, Phone as PhoneIcon, MapPin, CreditCard,
  Users, Building2, Ship, Clock, Bell, Calendar, DollarSign,
  Shield, BarChart3, Wifi, Sun, Moon, Github, Twitter, Linkedin,
  Instagram, Facebook
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
    nav: { features: 'Özellikler', demo: 'Demo', contact: 'İletişim', whoWeServe: 'Kimler İçin' },
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
      contact: {
        title: 'İletişim'
      },
      email: 'erkinjonovsamandar2@gmail.com',
      phone: '+90 551 520 95 56',
      whatsapp: '+998337323505',
      rights: '© 2026 YachtMaster. Tüm hakları saklıdır.'
    }
  },
  en: {
    nav: { features: 'Features', demo: 'Demo', contact: 'Contact', whoWeServe: 'Who We Serve' },
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
          description: 'Hosted on Google Cloud. Your data is encrypted, backed up, and protected.'
        },
        {
          icon: 'Wifi',
          title: 'Access Anywhere',
          description: 'Mobile, tablet, desktop. Works in sync across all your devices.'
        }
      ]
    },
    experience: {
      title: 'The Digital Experience',
      desktop: 'Desktop View',
      mobile: 'Mobile View'
    },
    workflow: {
      title: 'Manager Pro Workflow',
      subtitle: 'Complete automation cycle',
      steps: [
        { title: '1. Booking Entry', desc: 'Captain enters booking details in AppSheet.' },
        { title: '2. Auto-Payment', desc: 'System instantly sends an Iyzico payment link to client via WhatsApp.' },
        { title: '3. Sync & Confirm', desc: 'Once paid, Google Calendar creates event and sends confirmation ticket.' },
        { title: '4. Lifecycle', desc: 'System sends location on trip day + upsell offers 2h before + feedback link after.' }
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
        badge: 'Digital Logbook & 48h Setup',
        features: ['WhatsApp → Calendar Sync', 'Reservation Management', 'Google Cloud Infrastructure', '2 Weeks Support']
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
    tech: { title: 'Powered By' },
    footer: {
      brand: 'YachtMaster',
      tagline: 'The new standard in luxury yacht management.',
      contact: {
        title: 'Contact'
      },
      email: 'erkinjonovsamandar2@gmail.com',
      phone: '+90 551 520 95 56',
      whatsapp: '+998337323505',
      rights: '© 2026 YachtMaster. All rights reserved.'
    }
  }
};

function App() {
  const [lang, setLang] = useState('tr');
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('desktop');
  const [showWorkflow, setShowWorkflow] = useState(false);

  const t = content[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mobileScreens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const slideVariants = {
    enter: { x: '100%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 }
  };

  const iconComponents = {
    Ship,
    Building2,
    Users,
    Zap,
    Calendar,
    Bell,
    BarChart3,
    Shield,
    Wifi
  };

  return (
    <div className={`min-h-screen overflow-x-hidden ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 royal-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <Anchor className="w-8 h-8 text-[#3b82f6] vivid-icon vivid-icon-blue" />
              <span className="text-2xl font-bold nav-brand font-serif">YachtMaster</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#who-we-serve" className="font-semibold nav-link hover:text-[#3b82f6] transition">{t.nav.whoWeServe}</a>
              <a href="#features" className="font-semibold nav-link hover:text-[#3b82f6] transition">{t.nav.features}</a>
              <a href="#demo" className="font-semibold nav-link hover:text-[#3b82f6] transition">{t.nav.demo}</a>
              <a href="#contact" className="font-semibold nav-link hover:text-[#3b82f6] transition">{t.nav.contact}</a>
              
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-[#f59e0b]" />
                ) : (
                  <Moon className="w-5 h-5 text-[#3b82f6]" />
                )}
              </button>

              <div className="royal-toggle">
                <button
                  onClick={() => setLang('tr')}
                  className={`toggle-button ${lang === 'tr' ? 'toggle-button-active' : 'toggle-button-inactive'}`}
                >
                  TR
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`toggle-button ${lang === 'en' ? 'toggle-button-active' : 'toggle-button-inactive'}`}
                >
                  EN
                </button>
              </div>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden nav-link"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mobile-menu"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#who-we-serve" className="block font-semibold nav-link hover:text-[#3b82f6]" onClick={() => setMobileMenuOpen(false)}>{t.nav.whoWeServe}</a>
                <a href="#features" className="block font-semibold nav-link hover:text-[#3b82f6]" onClick={() => setMobileMenuOpen(false)}>{t.nav.features}</a>
                <a href="#demo" className="block font-semibold nav-link hover:text-[#3b82f6]" onClick={() => setMobileMenuOpen(false)}>{t.nav.demo}</a>
                <a href="#contact" className="block font-semibold nav-link hover:text-[#3b82f6]" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</a>
                
                <div className="flex items-center space-x-4 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition"
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-5 h-5 text-[#f59e0b]" />
                    ) : (
                      <Moon className="w-5 h-5 text-[#3b82f6]" />
                    )}
                  </button>
                  
                  <div className="royal-toggle">
                    <button
                      onClick={() => setLang('tr')}
                      className={`toggle-button ${lang === 'tr' ? 'toggle-button-active' : 'toggle-button-inactive'}`}
                    >
                      TR
                    </button>
                    <button
                      onClick={() => setLang('en')}
                      className={`toggle-button ${lang === 'en' ? 'toggle-button-active' : 'toggle-button-inactive'}`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 section-hero">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                variants={fadeUp}
                className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 hero-headline font-serif leading-tight"
              >
                {t.hero.headline}
              </motion.h1>
              <motion.p 
                variants={fadeUp}
                className="text-xl sm:text-2xl hero-subheadline max-w-4xl mx-auto mb-12 leading-relaxed"
              >
                {t.hero.subheadline}
              </motion.p>
              <motion.div 
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <a 
                  href="#demo"
                  className="royal-button-primary px-10 py-5 rounded-full inline-flex items-center justify-center space-x-3 text-lg"
                >
                  <Play className="w-6 h-6" />
                  <span>{t.hero.ctaDemo}</span>
                </a>
                <a 
                  href="#contact"
                  className="royal-button-secondary px-10 py-5 rounded-full inline-flex items-center justify-center space-x-3 text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>{t.hero.ctaContact}</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="wave-divider-bottom">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="wave-fill"/>
          </svg>
        </div>
      </section>

      {/* WHO WE SERVE SECTION */}
      <section id="who-we-serve" className="py-32 px-4 sm:px-6 lg:px-8 relative section-who-serve">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 section-title font-serif">
              {t.whoWeServe.title}
            </h2>
            <p className="text-xl section-subtitle max-w-3xl mx-auto">
              {t.whoWeServe.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {t.whoWeServe.audiences.map((audience, i) => {
              const IconComponent = iconComponents[audience.icon];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="who-serve-card p-10 rounded-3xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#2563eb] mb-6">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 card-title font-serif">{audience.title}</h3>
                  <p className="card-description leading-relaxed">{audience.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative section-features">
        <div className="wave-divider-top">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="wave-fill"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 section-title font-serif">
              {t.features.title}
            </h2>
            <p className="text-xl section-subtitle max-w-3xl mx-auto">
              {t.features.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {t.features.items.map((feature, i) => {
              const IconComponent = iconComponents[feature.icon];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="glass-ultra p-8 rounded-2xl"
                >
                  <IconComponent className={`w-12 h-12 mb-6 vivid-icon ${
                    i % 4 === 0 ? 'vivid-icon-blue' :
                    i % 4 === 1 ? 'vivid-icon-green' :
                    i % 4 === 2 ? 'vivid-icon-purple' : 'vivid-icon-gold'
                  }`} />
                  <h3 className="text-xl font-bold mb-3 card-title font-serif">{feature.title}</h3>
                  <p className="card-description leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="wave-divider-bottom">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="wave-fill"/>
          </svg>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section id="demo" className="py-32 px-4 sm:px-6 lg:px-8 relative section-demo">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 section-title font-serif">
              {t.experience.title}
            </h2>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-2xl p-2 tab-container">
              <button
                onClick={() => setActiveTab('desktop')}
                className={`tab-button ${activeTab === 'desktop' ? 'tab-button-active' : 'tab-button-inactive'}`}
              >
                <Monitor className="w-5 h-5 inline-block mr-2" />
                {t.experience.desktop}
              </button>
              <button
                onClick={() => setActiveTab('mobile')}
                className={`tab-button ${activeTab === 'mobile' ? 'tab-button-active' : 'tab-button-inactive'}`}
              >
                <Smartphone className="w-5 h-5 inline-block mr-2" />
                {t.experience.mobile}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'desktop' && (
              <motion.div
                key="desktop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto"
              >
                <div className="video-container aspect-video">
                  <iframe
                    className="w-full h-full rounded-3xl"
                    src="https://www.youtube.com/embed/EQHG6qoa3cQ"
                    title="YachtMaster Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            )}

            {activeTab === 'mobile' && (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="iphone-frame">
                  <div className="iphone-notch"></div>
                  <div className="iphone-screen">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={mobileScreens[currentSlide]}
                        alt={`Mobile Screenshot ${currentSlide + 1}`}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-contain"
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative section-workflow">
        <div className="wave-divider-top">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="wave-fill"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 section-title font-serif">
              {t.workflow.title}
            </h2>
            <p className="text-2xl section-subtitle">{t.workflow.subtitle}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {t.workflow.steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-ultra p-8 rounded-2xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center text-white font-bold text-lg">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 card-title">{step.title}</h3>
                    <p className="card-description">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="wave-divider-bottom">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="wave-fill"/>
          </svg>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative section-pricing">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 section-title font-serif">
              {t.offers.title}
            </h2>
            <p className="text-2xl section-subtitle">{t.offers.subtitle}</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto"
          >
            {/* Core System Card */}
            <motion.div variants={fadeUp} className="pricing-card-light p-10 rounded-3xl relative">
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg rotate-12">
                {t.offers.discount}
              </div>
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                {t.offers.core.badge}
              </div>
              <h3 className="text-3xl font-bold mb-3 text-slate-900 font-serif">{t.offers.core.name}</h3>
              <div className="mb-8">
                <div className="text-2xl text-slate-400 line-through mb-2">{t.offers.core.originalPrice}</div>
                <div className="text-5xl font-bold text-[#3b82f6]">{t.offers.core.price}</div>
              </div>
              <ul className="space-y-4 mb-10">
                {t.offers.core.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3 text-slate-700 font-semibold">
                    <Check className="w-5 h-5 text-[#3b82f6] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block w-full text-center bg-white border-2 border-[#3b82f6] text-[#3b82f6] font-bold py-4 rounded-full hover:bg-[#3b82f6] hover:text-white transition-all duration-300"
              >
                Get The Deal
              </a>
            </motion.div>

            {/* Manager Pro Card - Dark with Gold accents */}
            <motion.div variants={fadeUp} className="pricing-card-dark p-10 rounded-3xl relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg z-10">
                ⭐ POPULAR
              </div>
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg rotate-12">
                {t.offers.discount}
              </div>
              <div className="inline-block bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                {t.offers.manager.badge}
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white font-serif">{t.offers.manager.name}</h3>
              <div className="mb-8">
                <div className="text-2xl text-slate-400 line-through mb-2">{t.offers.manager.originalPrice}</div>
                <div className="text-5xl font-bold gold-gradient-text">{t.offers.manager.price}</div>
              </div>
              <ul className="space-y-4 mb-10">
                {t.offers.manager.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3 text-white font-semibold">
                    <Check className="w-5 h-5 text-[#f59e0b] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block w-full text-center bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white font-bold py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get The Deal
              </a>
            </motion.div>
          </motion.div>

          {/* View Workflow Button */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowWorkflow(!showWorkflow)}
              className="royal-button-secondary px-10 py-4 rounded-full inline-flex items-center space-x-3 text-lg"
            >
              <ArrowRight className={`w-6 h-6 transition-transform ${showWorkflow ? 'rotate-90' : ''}`} />
              <span>{showWorkflow ? t.offers.hideWorkflow : t.offers.viewWorkflow}</span>
            </button>
          </motion.div>

          {/* Collapsible Workflow Section */}
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
                      className="glass-ultra p-8 rounded-2xl"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center text-white font-bold text-lg">
                          {i + 1}
                        </div>
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
              <a 
                href="https://app.supademo.com/demo/cml7rvvdt78zazsad49bgxgk4?utm_source=link"
                target="_blank"
                rel="noopener noreferrer"
                className="royal-button-primary px-8 py-4 rounded-full inline-flex items-center space-x-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Interactive Demo</span>
              </a>
              <a 
                href="https://drive.google.com/file/d/1XH4D8R_o4HefhD1iUWZ4z-d_rez4km4e/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="royal-button-secondary px-8 py-4 rounded-full inline-flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Demo PDF</span>
              </a>
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
                variants={fadeUp}
                className="glass-ultra p-8 text-center rounded-2xl"
              >
                <img 
                  src={tech.logo} 
                  alt={tech.name}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <p className="card-title font-bold">{tech.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative section-footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Anchor className="w-8 h-8 text-[#3b82f6] vivid-icon vivid-icon-blue" />
                <h4 className="text-2xl font-bold footer-brand font-serif">{t.footer.brand}</h4>
              </div>
              <p className="footer-text mb-8 leading-relaxed">{t.footer.tagline}</p>
              
              {/* Social Media Icons */}
              <div className="flex items-center space-x-4">
                <a href="#" className="social-icon p-2 rounded-lg hover:bg-[#3b82f6] hover:bg-opacity-20 transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="social-icon p-2 rounded-lg hover:bg-[#3b82f6] hover:bg-opacity-20 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="social-icon p-2 rounded-lg hover:bg-[#3b82f6] hover:bg-opacity-20 transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="social-icon p-2 rounded-lg hover:bg-[#3b82f6] hover:bg-opacity-20 transition">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="footer-column-title mb-6">{t.footer.contact.title}</h4>
              <div className="space-y-4">
                <a href={`mailto:${t.footer.email}`} className="flex items-center space-x-3 footer-contact">
                  <Mail className="w-5 h-5" />
                  <span>{t.footer.email}</span>
                </a>
                <a href={`tel:${t.footer.phone}`} className="flex items-center space-x-3 footer-contact">
                  <PhoneIcon className="w-5 h-5" />
                  <span>{t.footer.phone}</span>
                </a>
                <a 
                  href={`https://wa.me/${t.footer.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-[#25D366] hover:underline transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.footer.whatsapp}</span>
                </a>
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