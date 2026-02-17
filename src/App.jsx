import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Anchor, Menu, X, ArrowRight, MessageCircle, Play, Smartphone,
  Monitor, Check, Download, ExternalLink, Zap, 
  Mail, Phone as PhoneIcon, Users, Building2, Ship, Bell, Calendar,
  Shield, BarChart3, Wifi, Sun, Moon, Linkedin, Globe,
  Instagram, Briefcase, Sparkles, Send, ChevronDown, Star
} from 'lucide-react';

/* ─── STATIC ASSETS ─── */
const mobileScreens = [
  '/Screenshot_1.png', '/Screenshot_2.png', '/Screenshot_3.png',
  '/Screenshot_4.png', '/Screenshot_5.png', '/Screenshot_6.png', '/Screenshot_7.png'
];

const techStack = [
  { name: 'Google Cloud',    logo: 'https://img.icons8.com/color/512/google-cloud.png' },
  { name: 'Google Calendar', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg' },
  { name: 'Make.com',        logo: 'https://cdn.simpleicons.org/make/6f42c1' },
  { name: 'AppSheet',        logo: 'https://make-cxp-documentation.ams3.digitaloceanspaces.com/apps-center-icons/appsheet.png' },
  { name: 'Apps Script',     logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Apps_Script.svg' }
];

const stats = [
  { value: 30,  suffix: '+', label: { en: 'Clients Served Worldwide', tr: 'Dünya Geneli Müşteri' } },
  { value: 94,  suffix: '%', label: { en: 'Job Success Score',        tr: 'İş Başarı Puanı' } },
  { value: 80,  suffix: '%', label: { en: 'Migration Success Rate',   tr: 'Geçiş Başarı Oranı' } }
];

const waSamples = {
  en: [
    { type: 'out', text: '📍 Your boat tour starts in 2 hours! Meet at Karaköy Marina, Pier 4. Captain Ahmet will greet you.' },
    { type: 'out', text: '☀️ Enjoying the trip? Add a private BBQ on deck for just $40 extra. Reply YES to confirm!' },
    { type: 'in',  text: 'YES please!' },
    { type: 'out', text: '🌊 Thank you for sailing with us! Share your experience: [feedback-link]. See you next time! ⚓' }
  ],
  tr: [
    { type: 'out', text: '📍 Tekne turunuz 2 saat içinde başlıyor! Karaköy Marina, İskele 4\'te buluşuyoruz. Kaptan Ahmet sizi karşılayacak.' },
    { type: 'out', text: '☀️ Turu beğeniyor musunuz? Güvertede özel barbekü ekleyin, sadece 400₺ ekstra. Onaylamak için EVET yazın!' },
    { type: 'in',  text: 'EVET lütfen!' },
    { type: 'out', text: '🌊 Bizimle seyahat ettiğiniz için teşekkürler! Deneyiminizi paylaşın: [geri-bildirim-linki]. Görüşmek üzere! ⚓' }
  ]
};

const content = {
  en: {
    nav: {
      whoWeServe: 'Who We Serve', features: 'Features', demo: 'Demo',
      pricing: 'Pricing', contact: 'Contact', portfolio: 'Portfolio'
    },
    hero: {
      tag: 'Full Automation · One-Time Setup · Zero Subscriptions',
      headline: 'Put Your Yacht Business on Autopilot.',
      subheadline: 'Stop wrestling with Excel. In 48 hours you get a fully automated system that collects payments, syncs your calendar, and sends smart reminders — while you focus on the sea.',
      ctaDemo: 'See It in Action', ctaContact: 'Book a Free Demo'
    },
    whoWeServe: {
      icon: '🎯', title: 'Who We Serve',
      subtitle: 'Built for every level of boat business — from solo owners to large fleets',
      audiences: [
        { icon: 'Ship',      title: 'Boat Owners',       description: 'Rent your boat without spreadsheet chaos. Automated booking, payments, and reminders — all in one place.' },
        { icon: 'Building2', title: 'Charter Companies', description: 'Scale confidently. Manage multiple boats, track revenue, and automate your entire customer journey.' },
        { icon: 'Users',     title: 'Fleet Managers',    description: 'Full-fleet visibility on one dashboard. Analytics, P&L reports, and automated lifecycle in a single tap.' }
      ]
    },
    features: {
      icon: '⚡', title: 'Powerful Features',
      subtitle: 'Save hours every week — every feature is built to give time back to you',
      items: [
        { icon: 'Zap',       title: 'Instant Payments',     description: 'Automatic Iyzico payment links via WhatsApp. From booking to paid in under 2 minutes.' },
        { icon: 'Calendar',  title: 'Calendar Sync',         description: 'Real-time Google Calendar sync. Double-bookings become impossible, automatically.' },
        { icon: 'Bell',      title: 'Smart Reminders',       description: 'Auto location drop, upsell offers, and post-tour feedback — sent exactly when they matter.' },
        { icon: 'BarChart3', title: 'Financial Reports',     description: 'Revenue, expenses, and profit per boat. Know which vessel earns the most with one click.' },
        { icon: 'Shield',    title: 'Secure Infrastructure', description: 'Google Cloud-hosted. Your data is encrypted, backed up, and always yours.' },
        { icon: 'Wifi',      title: 'Access Anywhere',       description: 'Mobile, tablet, or desktop — perfectly synced across every device you own.' }
      ]
    },
    experience: { icon: '📱', title: 'See It Live', mobile: 'Mobile App', desktop: 'Desktop View' },
    whatsapp: {
      icon: '💬', title: 'What Your Clients Receive',
      subtitle: 'Every message is sent automatically — you never have to type these yourself',
      labels: ['Location Drop', 'Upsell Offer', 'Client Reply', 'Thank You + Feedback']
    },
    workflow: {
      title: '⚙️ How It Works', subtitle: 'Four steps. Fully automatic.',
      steps: [
        { title: '1. Booking Entry',    desc: 'Captain enters reservation details into AppSheet — takes 30 seconds.' },
        { title: '2. Auto-Payment',     desc: 'System instantly sends the Iyzico payment link via WhatsApp to the client.' },
        { title: '3. Sync & Confirm',   desc: 'On payment, Google Calendar is updated and a confirmation ticket is sent.' },
        { title: '4. Lifecycle Engine', desc: 'Location on tour day · upsell 2 hrs before · feedback link after. All automatic.' }
      ]
    },
    offers: {
      icon: '🌙', title: 'Ramadan Special Offer',
      subtitle: 'One-time agency fee. No monthly subscriptions. Ever.',
      discount: '30% OFF',
      core: {
        name: 'Core System', price: '$388', originalPrice: '$554',
        badge: 'Digital Logbook & 48h Setup',
        features: ['Calendar-Only Sync', 'Booking Management', 'Google Cloud Infrastructure', '2 Weeks Onboarding Support']
      },
      manager: {
        name: 'Manager Pro', price: '$788', originalPrice: '$1,126',
        badge: 'Full Automation (Iyzico + WhatsApp) & 4-Day Setup',
        features: ['Everything in Core', 'WhatsApp Automation (Make.com)', 'Iyzico Payment Integration', 'Financial & P&L Reports', 'Lifecycle Engine']
      },
      viewWorkflow: '⚙️ View How It Works', hideWorkflow: 'Hide Workflow'
    },
    tech:      { icon: '🔧', title: 'Powered By' },
    stats:     { icon: '📊', title: 'Our Track Record' },
    portfolio: {
      icon: '💼', title: 'Our Portfolio',
      subtitle: 'See real projects we have delivered for clients across industries',
      cta: 'View Full Portfolio'
    },
    bookDemo: {
      icon: '🚀', title: 'Book a Free Demo',
      subtitle: 'Let us walk you through the system in 20 minutes — no commitment, just clarity.',
      namePlaceholder: 'Your name',
      msgPlaceholder: 'Tell us about your boat business (number of boats, current challenges...)',
      send: 'Send Message via WhatsApp',
      or: 'or email us directly at'
    },
    footer: {
      brand: 'YachtMaster', tagline: 'The new standard in luxury boat management.',
      quickLinks: 'Quick Links', portfolio: 'Our Portfolio', website: 'AppSheet Solutions',
      contact: { title: 'Contact' },
      email: 'erkinjonovsamandar2@gmail.com', phone: '+90 551 520 95 56',
      whatsapp: '+998337323505', social: 'Social Media', instagramComing: 'Coming Soon',
      rights: '© 2026 YachtMaster. All rights reserved.'
    }
  },
  tr: {
    nav: {
      whoWeServe: 'Kimler İçin', features: 'Özellikler', demo: 'Demo',
      pricing: 'Fiyatlar', contact: 'İletişim', portfolio: 'Portföy'
    },
    hero: {
      tag: 'Tam Otomasyon · Tek Seferlik Kurulum · Abonelik Yok',
      headline: 'Yat İşletmenizi Otopilota Alın.',
      subheadline: 'Excel ile boğuşmayı bırakın. 48 saatte ödeme toplayan, takvim senkronize eden ve hatırlatma gönderen tam otomatik sisteminiz hazır — siz denize odaklanın.',
      ctaDemo: 'Sistemi Görün', ctaContact: 'Ücretsiz Demo'
    },
    whoWeServe: {
      icon: '🎯', title: 'Kimler İçin Tasarlandı',
      subtitle: 'Bireysel sahipten büyük filoya kadar her seviyede tekne işletmesi için',
      audiences: [
        { icon: 'Ship',      title: 'Tekne Sahipleri',    description: 'Teknenizi tablolar karmaşası olmadan kiraya verin. Otomasyon her şeyi halleder.' },
        { icon: 'Building2', title: 'Kiralama Şirketleri', description: 'Güvenle büyüyün. Birden fazla tekneyi yönetin, geliri takip edin.' },
        { icon: 'Users',     title: 'Filo Yöneticileri',  description: 'Tek panoda tam filo görünürlüğü. Analitik ve otomatik yaşam döngüsü.' }
      ]
    },
    features: {
      icon: '⚡', title: 'Güçlü Özellikler',
      subtitle: 'Her özellik size zaman kazandırmak için tasarlandı',
      items: [
        { icon: 'Zap',       title: 'Anında Ödeme',         description: 'WhatsApp üzerinden otomatik Iyzico linki. Rezervasyondan ödemeye 2 dakika.' },
        { icon: 'Calendar',  title: 'Takvim Senkronu',       description: 'Google Takvim ile gerçek zamanlı senkron. Çakışma imkânsız.' },
        { icon: 'Bell',      title: 'Akıllı Hatırlatmalar', description: 'Konum paylaşımı, upsell teklifleri, geri bildirim — tam zamanında otomatik.' },
        { icon: 'BarChart3', title: 'Finansal Raporlar',     description: 'Tekne başına gelir, gider, kâr. Hangisinin en çok kazandırdığını görün.' },
        { icon: 'Shield',    title: 'Güvenli Altyapı',       description: 'Google Cloud barındırmalı. Verileriniz şifreli, yedekli ve size ait.' },
        { icon: 'Wifi',      title: 'Her Yerden Erişim',     description: 'Mobil, tablet, masaüstü — tüm cihazlarda tam senkron.' }
      ]
    },
    experience: { icon: '📱', title: 'Canlı Görün', mobile: 'Mobil Uygulama', desktop: 'Masaüstü Görünümü' },
    whatsapp: {
      icon: '💬', title: 'Müşterileriniz Ne Alıyor',
      subtitle: 'Her mesaj otomatik gönderilir — tek bir mesaj yazmak zorunda değilsiniz',
      labels: ['Konum Paylaşımı', 'Upsell Teklifi', 'Müşteri Yanıtı', 'Teşekkür + Geri Bildirim']
    },
    workflow: {
      title: '⚙️ Nasıl Çalışır', subtitle: 'Dört adım. Tamamen otomatik.',
      steps: [
        { title: '1. Rezervasyon Girişi',  desc: 'Kaptan AppSheet\'e rezervasyon detaylarını girer — 30 saniye.' },
        { title: '2. Otomatik Ödeme',      desc: 'Sistem anında müşteriye WhatsApp üzerinden Iyzico linki gönderir.' },
        { title: '3. Senkronizasyon',      desc: 'Ödeme alındıktan sonra Google Takvim güncellenir, onay bileti gönderilir.' },
        { title: '4. Yaşam Döngüsü',       desc: 'Tur günü konum · 2 saat önce upsell · sonrasında geri bildirim. Hepsi otomatik.' }
      ]
    },
    offers: {
      icon: '🌙', title: 'Ramazan Özel Fırsatı',
      subtitle: 'Tek seferlik ajans ücreti. Hiçbir zaman aylık abonelik yok.',
      discount: '%30 İndirim',
      core: {
        name: 'Core System', price: '$388', originalPrice: '$554',
        badge: 'Dijital Kayıt & 48 Saat Kurulum',
        features: ['Sadece Takvim Senkronu', 'Rezervasyon Yönetimi', 'Google Cloud Altyapısı', '2 Hafta Destek']
      },
      manager: {
        name: 'Manager Pro', price: '$788', originalPrice: '$1,126',
        badge: 'Tam Otomasyon (Iyzico + WhatsApp) & 4 Günlük Kurulum',
        features: ['Core\'daki Her Şey', 'WhatsApp Otomasyonu (Make.com)', 'Iyzico Ödeme Entegrasyonu', 'Finansal & Kâr/Zarar Raporları', 'Yaşam Döngüsü Motoru']
      },
      viewWorkflow: '⚙️ Nasıl Çalışır', hideWorkflow: 'Gizle'
    },
    tech:      { icon: '🔧', title: 'Güçlü Altyapı' },
    stats:     { icon: '📊', title: 'Başarı Geçmişimiz' },
    portfolio: {
      icon: '💼', title: 'Proje Portföyümüz',
      subtitle: 'Farklı sektörlerdeki müşteriler için teslim ettiğimiz gerçek projeleri görün',
      cta: 'Portföyü Görüntüle'
    },
    bookDemo: {
      icon: '🚀', title: 'Ücretsiz Demo Rezervasyonu',
      subtitle: '20 dakikada sistemi birlikte inceleyelim — taahhüt yok, sadece netlik.',
      namePlaceholder: 'Adınız',
      msgPlaceholder: 'Tekne işletmeniz hakkında bilgi verin (kaç tekne, mevcut zorluklar...)',
      send: "WhatsApp'tan Mesaj Gönder",
      or: 'veya bize doğrudan e-posta gönderin'
    },
    footer: {
      brand: 'YachtMaster', tagline: 'Lüks tekne yönetiminde yeni standart.',
      quickLinks: 'Hızlı Bağlantılar', portfolio: 'Proje Portföyümüz', website: 'AppSheet Solutions',
      contact: { title: 'İletişim' },
      email: 'erkinjonovsamandar2@gmail.com', phone: '+90 551 520 95 56',
      whatsapp: '+998337323505', social: 'Sosyal Medya', instagramComing: 'Yakında',
      rights: '© 2026 YachtMaster. Tüm hakları saklıdır.'
    }
  }
};

const iconMap = { Ship, Building2, Users, Zap, Calendar, Bell, BarChart3, Shield, Wifi };

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        let val = 0;
        const step = 16;
        const inc = target / (1600 / step);
        const timer = setInterval(() => {
          val += inc;
          if (val >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(val));
        }, step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── FLOATING BOAT SVG ─── */
function FloatingBoat({ theme }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 3, -3]);
  return (
    <motion.div style={{ y, rotate, position:'fixed', right:'1.5rem', bottom:'7rem', zIndex:30, pointerEvents:'none' }}
      initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8 }}>
      <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}>
        <svg width="52" height="38" viewBox="0 0 52 38" fill="none">
          <path d="M3 26 Q26 34 49 26 L45 32 Q26 38 7 32 Z" fill={theme==='dark'?'#3b82f6':'#2563eb'} opacity="0.9"/>
          <rect x="9" y="20" width="34" height="8" rx="3" fill={theme==='dark'?'#60a5fa':'#3b82f6'}/>
          <rect x="17" y="12" width="16" height="10" rx="2" fill={theme==='dark'?'#93c5fd':'#60a5fa'}/>
          <line x1="26" y1="1" x2="26" y2="20" stroke={theme==='dark'?'#e2e8f0':'#1e293b'} strokeWidth="1.5"/>
          <path d="M26 3 L39 17 L26 17 Z" fill={theme==='dark'?'rgba(255,255,255,0.12)':'rgba(59,130,246,0.18)'} stroke={theme==='dark'?'rgba(255,255,255,0.25)':'#3b82f6'} strokeWidth="0.8"/>
          <path d="M1 35 Q9 32 17 35 Q25 38 33 35 Q41 32 51 35" stroke={theme==='dark'?'#60a5fa':'#93c5fd'} strokeWidth="1.5" fill="none" opacity="0.55"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─── WHATSAPP BUBBLE ─── */
function WaBubble({ msg, index, label }) {
  return (
    <motion.div
      initial={{ opacity:0, x: msg.type==='out' ? 24 : -24 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true }}
      transition={{ delay: index * 0.2, duration: 0.4 }}
      className={`flex flex-col ${msg.type==='out' ? 'items-end' : 'items-start'} mb-3`}>
      {label && <span className="text-xs text-slate-400 mb-1 px-2">{label}</span>}
      <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed shadow ${
        msg.type==='out' ? 'bg-[#dcf8c6] text-slate-800 rounded-tr-sm' : 'bg-white text-slate-800 rounded-tl-sm'
      }`}>
        {msg.text}
        {msg.type==='out' && <div className="text-right text-[10px] text-slate-400 mt-1">✓✓</div>}
      </div>
    </motion.div>
  );
}

/* ─── SECTION ICON HEADING ─── */
function SectionHead({ emoji, title, subtitle, className='' }) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <motion.div className="flex flex-col items-center gap-2 mb-4" whileHover={{ scale:1.02 }}>
        <span className="text-4xl sm:text-5xl select-none leading-none">{emoji}</span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold section-title font-serif">{title}</h2>
      </motion.div>
      {subtitle && <p className="text-xl sm:text-2xl section-subtitle max-w-3xl mx-auto mt-4 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

/* ════════════════════════════════ APP ════════════════════════════════ */
export default function App() {
  const [lang, setLang]           = useState('en');
  const [theme, setTheme]         = useState('light');
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeTab, setActiveTab] = useState('mobile');
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showWorkflow, setShowWorkflow]   = useState(false);
  const [demoName, setDemoName]   = useState('');
  const [demoMsg, setDemoMsg]     = useState('');

  const t = content[lang];
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -70]);
  const isDark = theme === 'dark';

  useEffect(() => {
    const iv = setInterval(() => setCurrentScreen(p => (p+1) % mobileScreens.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const fadeUp = {
    hidden:  { opacity:0, y:36 },
    visible: { opacity:1, y:0, transition:{ duration:0.58, ease:[0.22,1,0.36,1] } }
  };
  const stagger = {
    hidden:  { opacity:0 },
    visible: { opacity:1, transition:{ staggerChildren:0.13, delayChildren:0.05 } }
  };
  const scaleIn = {
    hidden:  { scale:0.86, opacity:0 },
    visible: { scale:1, opacity:1, transition:{ duration:0.46, ease:'easeOut' } }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' });
    setMenuOpen(false);
  };

  const sendDemo = () => {
    const msg = `Hello! I'd like a free demo.\n\nName: ${demoName}\n\n${demoMsg}`;
    window.open(`https://wa.me/${t.footer.whatsapp.replace(/[^0-9]/g,'')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const navBg = isDark ? 'bg-[#0f172a]/90 border-white/10' : 'bg-white/90 border-slate-200';
  const navItems = ['whoWeServe','features','demo','pricing','contact','portfolio'];

  return (
    <div className={`min-h-screen ${isDark ? 'theme-dark' : 'theme-light'}`}>

      <FloatingBoat theme={theme}/>

      {/* ══ NAVBAR ══ */}
      <motion.nav initial={{ y:-100 }} animate={{ y:0 }} transition={{ duration:0.5, ease:'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div className="flex items-center gap-3 cursor-pointer" whileHover={{ scale:1.05 }}
              onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}>
              <Anchor className="w-8 h-8 text-[#3b82f6]"/>
              <span className="text-2xl font-bold nav-brand font-serif">YachtMaster</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-5">
              {navItems.map(s => (
                <motion.button key={s} onClick={() => scrollTo(s)}
                  className="nav-link hover:text-[#3b82f6] transition font-medium text-sm"
                  whileHover={{ y:-2 }} whileTap={{ scale:0.95 }}>
                  {t.nav[s]}
                </motion.button>
              ))}
              <motion.button onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-[#3b82f6]/10 transition"
                whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}>
                {isDark ? <Sun className="w-5 h-5 text-yellow-400"/> : <Moon className="w-5 h-5 text-blue-600"/>}
              </motion.button>
              <div className={`flex items-center p-1 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                {['en','tr'].map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      lang===l ? 'bg-[#3b82f6] text-white shadow' : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                    }`}>
                    <img src={`https://flagcdn.com/w40/${l==='en'?'us':'tr'}.png`} alt={l} className="w-4 h-3 object-cover rounded-sm"/>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <motion.button onClick={() => setTheme(isDark?'light':'dark')} className="p-2 rounded-lg" whileTap={{ scale:0.9 }}>
                {isDark ? <Sun className="w-5 h-5 text-yellow-400"/> : <Moon className="w-5 h-5 text-blue-600"/>}
              </motion.button>
              <motion.button onClick={() => setMenuOpen(!menuOpen)} className="p-2" whileTap={{ scale:0.9 }}>
                {menuOpen ? <X className="w-6 h-6 nav-link"/> : <Menu className="w-6 h-6 nav-link"/>}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
              exit={{ opacity:0, height:0 }} transition={{ duration:0.3 }}
              className={`md:hidden border-t ${isDark ? 'bg-[#0f172a] border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="px-4 py-6 space-y-4">
                {navItems.map(s => (
                  <motion.button key={s} onClick={() => scrollTo(s)}
                    className="block w-full text-left nav-link hover:text-[#3b82f6] py-2 font-medium"
                    whileHover={{ x:4 }}>{t.nav[s]}
                  </motion.button>
                ))}
                <div className={`flex w-full mt-4 p-1 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                  {['en','tr'].map(l => (
                    <button key={l} onClick={() => setLang(l)}
                      className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        lang===l ? 'bg-[#3b82f6] text-white' : (isDark ? 'text-slate-400' : 'text-slate-500')
                      }`}>
                      <img src={`https://flagcdn.com/w40/${l==='en'?'us':'tr'}.png`} alt={l} className="w-5 rounded-sm"/>
                      {l==='en'?'English':'Türkçe'}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ══ HERO ══ */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden section-hero">
        <motion.div className={`absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl ${isDark?'bg-blue-500 opacity-20':'bg-blue-300 opacity-30'}`}
          animate={{ scale:[1,1.2,1], x:[0,50,0], y:[0,30,0] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}/>
        <motion.div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl ${isDark?'bg-purple-500 opacity-20':'bg-indigo-300 opacity-30'}`}
          animate={{ scale:[1.2,1,1.2], x:[0,-50,0], y:[0,-30,0] }} transition={{ duration:10, repeat:Infinity, ease:'easeInOut' }}/>

        <motion.div className="max-w-5xl mx-auto text-center relative z-10" style={{ y:heroY }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 border ${isDark?'bg-blue-500/10 border-blue-500/30 text-blue-300':'bg-blue-50 border-blue-200 text-blue-700'}`}>
              <Sparkles className="w-4 h-4"/> {t.hero.tag}
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl lg:text-8xl font-black mb-8 font-serif leading-tight">
              {t.hero.headline.split(' ').map((w,i) => (
                <motion.span key={i} className="inline-block mr-3 sm:mr-4 last:mr-0"
                  animate={{ color: isDark ? '#ffffff' : '#0f172a' }} transition={{ duration:0.3 }}
                  whileHover={{ scale:1.05, color:'#3b82f6', transition:{duration:0.2} }}>{w}</motion.span>
              ))}
            </motion.h1>

            <motion.p variants={fadeUp}
              className={`text-xl sm:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed ${isDark?'text-slate-300':'text-slate-600'}`}>
              {t.hero.subheadline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5 justify-center">
              <motion.button onClick={() => scrollTo('demo')}
                className="bg-[#3b82f6] text-white px-10 py-5 rounded-full inline-flex items-center justify-center gap-3 text-lg font-bold royal-button-primary"
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
                <Play className="w-6 h-6 fill-current"/> {t.hero.ctaDemo}
              </motion.button>
              <motion.button onClick={() => scrollTo('bookDemo')}
                className={`border-2 px-10 py-5 rounded-full inline-flex items-center justify-center gap-3 text-lg font-bold transition ${isDark?'border-white/20 text-white hover:bg-white/10':'border-blue-200 text-blue-700 hover:bg-blue-50'}`}
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
                <MessageCircle className="w-6 h-6"/> {t.hero.ctaContact}
              </motion.button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 flex justify-center">
              <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.6, repeat:Infinity }}
                className={`flex flex-col items-center gap-1 cursor-pointer ${isDark?'text-slate-500':'text-slate-400'}`}
                onClick={() => scrollTo('whoWeServe')}>
                <span className="text-xs font-medium tracking-widest uppercase">Explore</span>
                <ChevronDown className="w-5 h-5"/>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ WHO WE SERVE ══ */}
      <section id="whoWeServe" className="py-32 px-4 sm:px-6 lg:px-8 section-who-serve">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={fadeUp}>
            <SectionHead emoji={t.whoWeServe.icon} title={t.whoWeServe.title} subtitle={t.whoWeServe.subtitle}/>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }} variants={stagger}
            className="grid md:grid-cols-3 gap-8">
            {t.whoWeServe.audiences.map((a,i) => {
              const Icon = iconMap[a.icon];
              return (
                <motion.div key={i} variants={scaleIn} whileHover={{ y:-10, transition:{duration:0.3} }}
                  className="who-serve-card p-10 rounded-3xl cursor-pointer">
                  <motion.div whileHover={{ rotate:[0,-10,10,-10,0] }} transition={{ duration:0.5 }}>
                    <Icon className="w-14 h-14 mb-6 vivid-icon vivid-icon-blue"/>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 card-title font-serif">{a.title}</h3>
                  <p className="card-description leading-relaxed">{a.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 section-features">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={fadeUp}>
            <SectionHead emoji={t.features.icon} title={t.features.title} subtitle={t.features.subtitle}/>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.1 }} variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.items.map((f,i) => {
              const Icon = iconMap[f.icon];
              return (
                <motion.div key={i} variants={fadeUp} whileHover={{ scale:1.03, transition:{duration:0.2} }}
                  className="glass-ultra p-10 rounded-3xl group cursor-pointer">
                  <motion.div whileHover={{ scale:1.1, rotate:5 }} transition={{ duration:0.3 }}>
                    <Icon className="w-14 h-14 mb-6 vivid-icon vivid-icon-blue"/>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3 card-title font-serif">{f.title}</h3>
                  <p className="card-description leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ DEMO ══ */}
      <section id="demo" className="py-32 px-4 sm:px-6 lg:px-8 section-demo">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={fadeUp}>
            <SectionHead emoji={t.experience.icon} title={t.experience.title}/>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} className="mb-12">
            <div className="tab-container flex justify-center rounded-2xl p-2 max-w-xs mx-auto">
              {[{key:'mobile',label:t.experience.mobile,Icon:Smartphone},{key:'desktop',label:t.experience.desktop,Icon:Monitor}].map(({key,label,Icon}) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={`tab-button flex-1 flex items-center justify-center gap-2 ${activeTab===key?'tab-button-active':'tab-button-inactive'}`}>
                  <Icon className="w-4 h-4"/> <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
          {activeTab==='mobile' && (
  <motion.div 
    key="mobile" 
    initial={{ opacity:0, x:40 }} 
    animate={{ opacity:1, x:0 }}
    exit={{ opacity:0, x:-40 }} 
    transition={{ duration:0.32 }} 
    className="flex justify-center"
  >
    <div className="iphone-frame">
      <div className="iphone-notch"/>
      <div className="iphone-screen" style={{ overflow: 'hidden' }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.img 
            key={currentScreen} 
            src={mobileScreens[currentScreen]}
            alt={`Screen ${currentScreen+1}`}
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ 
              duration: 0.6, 
              ease: [0.43, 0.13, 0.23, 0.96] // Professional easing curve
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block'
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  </motion.div>
)}
            {activeTab==='desktop' && (
              <motion.div key="desktop" initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:40 }} transition={{ duration:0.32 }}
                className={`video-container max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden border ${isDark ? 'border-white/10 bg-gray-900' : 'border-slate-200 bg-slate-50'}`}>
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/EQHG6qoa3cQ"
                  title="YachtMaster Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ WHATSAPP PREVIEW ══ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 section-who-serve">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={fadeUp}>
            <SectionHead emoji={t.whatsapp.icon} title={t.whatsapp.title} subtitle={t.whatsapp.subtitle}/>
          </motion.div>
          <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.56 }} className="max-w-sm mx-auto">
            <div className={`rounded-3xl overflow-hidden shadow-2xl border ${isDark?'border-white/10':'border-slate-200'}`}>
              <div className="bg-[#075e54] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
                  <Ship className="w-5 h-5 text-white"/>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">YachtMaster Bot</p>
                  <p className="text-green-300 text-xs">Online</p>
                </div>
              </div>
              <div className="bg-[#ece5dd] px-3 py-4 min-h-64">
                {waSamples[lang].map((msg,i) => (
                  <WaBubble key={i} msg={msg} index={i} label={t.whatsapp.labels[i]}/>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 section-pricing">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={fadeUp}>
            <SectionHead emoji={t.offers.icon} title={t.offers.title} subtitle={t.offers.subtitle}/>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }} variants={stagger}
            className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Core */}
            <motion.div variants={scaleIn} whileHover={{ y:-6 }} className="glass-ultra p-10 rounded-3xl relative">
              <span className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold rotate-12 shadow">{t.offers.discount}</span>
              <p className="text-sm font-semibold text-blue-400 mb-2">{t.offers.core.badge}</p>
              <h3 className="text-3xl font-bold mb-2 card-title font-serif">{t.offers.core.name}</h3>
              <div className="mb-8">
                <span className="text-5xl font-black gold-gradient-text">{t.offers.core.price}</span>
                <span className="text-xl ml-3 line-through card-description opacity-60">{t.offers.core.originalPrice}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.offers.core.features.map((f,i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"/>
                    <span className="card-description">{f}</span>
                  </li>
                ))}
              </ul>
              <motion.button onClick={() => scrollTo('bookDemo')}
                className="w-full royal-button-primary px-6 py-4 rounded-full font-bold"
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}>Get The Deal</motion.button>
            </motion.div>

            {/* Manager Pro */}
            <motion.div variants={scaleIn} whileHover={{ y:-6 }} className="glass-ultra-highlight p-10 rounded-3xl relative">
              {/* glow blob — contained via pointer-events none, no overflow-hidden needed */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20 pointer-events-none" style={{ zIndex:0 }}/>
              {/* 30% badge — now visible, not clipped */}
              <span className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg" style={{ transform:'rotate(12deg)', zIndex:20 }}>{t.offers.discount}</span>
              <div className="flex justify-center mb-1" style={{ position:'relative', zIndex:1 }}>
                <span className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-xs font-bold shadow inline-flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current"/> POPULAR
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-400 mb-2 mt-2" style={{ position:'relative', zIndex:1 }}>{t.offers.manager.badge}</p>
              <h3 className="text-3xl font-bold mb-2 card-title font-serif" style={{ position:'relative', zIndex:1 }}>{t.offers.manager.name}</h3>
              <div className="mb-8" style={{ position:'relative', zIndex:1 }}>
                <span className="text-5xl font-black gold-gradient-text">{t.offers.manager.price}</span>
                <span className="text-xl ml-3 line-through card-description opacity-60">{t.offers.manager.originalPrice}</span>
              </div>
              <ul className="space-y-3 mb-8" style={{ position:'relative', zIndex:1 }}>
                {t.offers.manager.features.map((f,i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"/>
                    <span className="card-description">{f}</span>
                  </li>
                ))}
              </ul>
              <motion.button onClick={() => scrollTo('bookDemo')}
                className="w-full royal-button-primary px-6 py-4 rounded-full font-bold" style={{ position:'relative', zIndex:1 }}
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}>Get The Deal</motion.button>
            </motion.div>
          </motion.div>

          {/* Workflow toggle — BELOW both cards */}
          <div className="text-center mt-10">
            <motion.button onClick={() => setShowWorkflow(!showWorkflow)}
              className="royal-button-secondary px-8 py-3.5 rounded-full inline-flex items-center gap-2 font-semibold"
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
              <motion.span animate={{ rotate: showWorkflow ? 90 : 0 }} transition={{ duration:0.28 }}>
                <ArrowRight className="w-5 h-5"/>
              </motion.span>
              {showWorkflow ? t.offers.hideWorkflow : t.offers.viewWorkflow}
            </motion.button>
          </div>

          <AnimatePresence>
            {showWorkflow && (
              <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
                exit={{ opacity:0, height:0 }} transition={{ duration:0.42 }}
                className="mt-14 overflow-hidden">
                <div className="text-center mb-10">
                  <h3 className="text-3xl sm:text-5xl font-bold section-title font-serif">{t.workflow.title}</h3>
                  <p className="text-xl section-subtitle mt-2">{t.workflow.subtitle}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {t.workflow.steps.map((step,i) => (
                    <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                      transition={{ delay:i*0.1 }} whileHover={{ scale:1.02 }}
                      className="glass-ultra p-8 rounded-2xl flex items-start gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {i+1}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 card-title">{step.title}</h4>
                        <p className="card-description">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <motion.a href="https://app.supademo.com/demo/cml7rvvdt78zazsad49bgxgk4?utm_source=link"
              target="_blank" rel="noopener noreferrer"
              className="royal-button-primary px-8 py-4 rounded-full inline-flex items-center gap-2"
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
              <ExternalLink className="w-5 h-5"/> Interactive Demo
            </motion.a>
            <motion.a href="https://drive.google.com/file/d/1XH4D8R_o4HefhD1iUWZ4z-d_rez4km4e/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="royal-button-secondary px-8 py-4 rounded-full inline-flex items-center gap-2"
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
              <Download className="w-5 h-5"/> Demo PDF
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══ TECH STACK ══ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 section-tech">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={fadeUp}>
            <SectionHead emoji={t.tech.icon} title={t.tech.title}/>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.2 }} variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {techStack.map((tech,i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y:-8, rotate:[0,-4,4,0], transition:{duration:0.4} }}
                className="glass-ultra p-6 text-center rounded-2xl cursor-pointer">
                <img src={tech.logo} alt={tech.name} className="w-14 h-14 mx-auto mb-3 object-contain"/>
                <p className="card-title font-bold text-sm">{tech.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ STATS + PORTFOLIO ══ */}
      <section id="portfolio" className="py-32 px-4 sm:px-6 lg:px-8 section-who-serve">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={fadeUp}>
            <SectionHead emoji={t.stats.icon} title={t.stats.title}/>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-24">
            {stats.map((s,i) => (
              <motion.div key={i} variants={scaleIn} className="glass-ultra p-10 rounded-3xl text-center">
                <div className="text-5xl sm:text-6xl font-black gold-gradient-text mb-3">
                  <AnimatedCounter target={s.value} suffix={s.suffix}/>
                </div>
                <p className="card-description font-semibold text-lg">{s.label[lang]}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={fadeUp} className="text-center">
            <motion.div className="flex flex-col items-center gap-2 mb-4" whileHover={{ scale:1.02 }}>
              <span className="text-4xl sm:text-5xl select-none leading-none">{t.portfolio.icon}</span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold section-title font-serif">{t.portfolio.title}</h2>
            </motion.div>
            <p className="text-xl sm:text-2xl section-subtitle mb-10 max-w-3xl mx-auto mt-4">{t.portfolio.subtitle}</p>
            <motion.a href="https://appsheet-solutions.notion.site/portfolio"
              target="_blank" rel="noopener noreferrer"
              className="royal-button-primary px-10 py-5 rounded-full inline-flex items-center gap-3 text-lg"
              whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}>
              <ExternalLink className="w-6 h-6"/> {t.portfolio.cta}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══ BOOK A DEMO ══ */}
      <section id="bookDemo" className="py-32 px-4 sm:px-6 lg:px-8 section-features">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={fadeUp}>
            <SectionHead emoji={t.bookDemo.icon} title={t.bookDemo.title} subtitle={t.bookDemo.subtitle}/>
          </motion.div>
          <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.56 }}
            className="glass-ultra p-10 rounded-3xl">
            <div className="space-y-5">
              <input type="text" value={demoName} onChange={e => setDemoName(e.target.value)}
                placeholder={t.bookDemo.namePlaceholder}
                className={`w-full px-5 py-4 rounded-2xl border font-medium outline-none transition focus:ring-2 focus:ring-blue-400 ${isDark?'bg-white/5 border-white/10 text-white placeholder-slate-500':'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`}/>
              <textarea rows={4} value={demoMsg} onChange={e => setDemoMsg(e.target.value)}
                placeholder={t.bookDemo.msgPlaceholder}
                className={`w-full px-5 py-4 rounded-2xl border font-medium outline-none transition focus:ring-2 focus:ring-blue-400 resize-none ${isDark?'bg-white/5 border-white/10 text-white placeholder-slate-500':'bg-white border-slate-200 text-slate-900 placeholder-slate-400'}`}/>
              <motion.button onClick={sendDemo}
                className="w-full royal-button-primary py-5 rounded-2xl text-lg font-bold inline-flex items-center justify-center gap-3"
                whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}>
                <MessageCircle className="w-6 h-6"/> {t.bookDemo.send}
              </motion.button>
              <p className={`text-center text-sm ${isDark?'text-slate-500':'text-slate-400'}`}>
                {t.bookDemo.or}{' '}
                <a href={`mailto:${t.footer.email}`} className="text-[#3b82f6] hover:underline font-medium">{t.footer.email}</a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer id="contact" className="py-20 px-4 sm:px-6 lg:px-8 section-footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <motion.div className="flex items-center gap-3 mb-5" whileHover={{ scale:1.05 }}>
                <Anchor className="w-8 h-8 text-[#3b82f6]"/>
                <h4 className="text-2xl font-bold footer-brand font-serif">{t.footer.brand}</h4>
              </motion.div>
              <p className="footer-text mb-6 leading-relaxed">{t.footer.tagline}</p>
            </div>
            <div>
              <h4 className="footer-column-title mb-5">{t.footer.quickLinks}</h4>
              <div className="space-y-4">
                <motion.a href="https://appsheet-solutions.notion.site/portfolio" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 footer-contact group" whileHover={{ x:4 }}>
                  <Briefcase className="w-5 h-5 group-hover:text-[#3b82f6] transition"/> <span>{t.footer.portfolio}</span>
                </motion.a>
                <motion.a href="https://earnest-conkies-7a833f.netlify.app/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 footer-contact group" whileHover={{ x:4 }}>
                  <Globe className="w-5 h-5 group-hover:text-[#3b82f6] transition"/> <span>{t.footer.website}</span>
                </motion.a>
              </div>
            </div>
            <div>
              <h4 className="footer-column-title mb-5">{t.footer.contact.title}</h4>
              <div className="space-y-4 mb-6">
                <motion.a href={`mailto:${t.footer.email}`} className="flex items-center gap-3 footer-contact" whileHover={{ x:4 }}>
                  <Mail className="w-5 h-5"/> <span className="text-sm break-all">{t.footer.email}</span>
                </motion.a>
                <motion.a href={`tel:${t.footer.phone}`} className="flex items-center gap-3 footer-contact" whileHover={{ x:4 }}>
                  <PhoneIcon className="w-5 h-5"/> <span>{t.footer.phone}</span>
                </motion.a>
                <motion.a href={`https://wa.me/${t.footer.whatsapp.replace(/[^0-9]/g,'')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#25D366] hover:underline" whileHover={{ x:4 }}>
                  <MessageCircle className="w-5 h-5"/> <span>{t.footer.whatsapp}</span>
                </motion.a>
              </div>
              <h4 className="footer-column-title mb-3 text-sm">{t.footer.social}</h4>
              <div className="flex items-center gap-3">
                <motion.a href="https://linkedin.com/company/appsheetsolutions" target="_blank" rel="noopener noreferrer"
                  className="social-icon p-2 rounded-lg hover:bg-[#3b82f6]/20 transition"
                  whileHover={{ scale:1.1, y:-2 }} whileTap={{ scale:0.9 }}>
                  <Linkedin className="w-5 h-5"/>
                </motion.a>
                <motion.a href="https://www.instagram.com/yachtmaster.agency/" target="_blank" rel="noopener noreferrer"
                  className="social-icon p-2 rounded-lg hover:bg-[#e1306c]/20 transition"
                  whileHover={{ scale:1.1, y:-2 }} whileTap={{ scale:0.9 }}>
                  <Instagram className="w-5 h-5"/>
                </motion.a>
              </div>
            </div>
          </div>
          <div className="border-t footer-border pt-8 text-center">
            <p className="footer-text">{t.footer.rights}</p>
          </div>
        </div>
      </footer>

      {/* ── STICKY WHATSAPP ── */}
      <motion.a href={`https://wa.me/${t.footer.whatsapp.replace(/[^0-9]/g,'')}`}
        target="_blank" rel="noopener noreferrer"
        initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:1.2, type:'spring' }}
        whileHover={{ scale:1.15 }} whileTap={{ scale:0.9 }}
        className="fixed bottom-10 right-10 bg-[#25D366] text-white p-5 rounded-full shadow-2xl z-50">
        <MessageCircle className="w-10 h-10"/>
      </motion.a>
    </div>
  );
}