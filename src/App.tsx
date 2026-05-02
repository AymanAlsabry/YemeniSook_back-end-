/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Search, 
  Globe, 
  ShieldCheck, 
  Menu, 
  X,
  Code2,
  Palette,
  Languages,
  TrendingUp,
  BarChart3,
  PenTool,
  Smartphone,
  ChevronDown,
  LayoutGrid,
  MapPin,
  CheckCircle,
  Briefcase,
  UserCircle,
  UserPlus,
  Settings,
  BookOpen,
  Phone,
  Map,
  Mail,
  Lock,
  User,
  Linkedin,
  Clock,
  ArrowLeft,
  Building,
  Eye,
  EyeOff,
  ShieldAlert,
  Server,
  Database,
  Activity,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { useState, useMemo, ReactNode, useEffect } from "react";
import { apiService } from './services/apiService';

type Language = 'en' | 'ar';
type View = 'home' | 'talent' | 'how-it-works' | 'category-detail' | 'all-categories' | 'signup' | 'login' | 'management-login' | 'api-test';

interface Freelancer {
  id: string;
  name: { en: string; ar: string };
  skills: string[];
  category: string;
  rating: number;
  completedJobs: number;
  hourlyRate: number;
  avatarUrl: string;
  verified: boolean;
}

const MOCK_FREELANCERS: Freelancer[] = [
  { id: '1', name: { en: 'Ahmed Al-Saadi', ar: 'أحمد السعدي' }, category: 'prog', skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'], rating: 4.9, completedJobs: 124, hourlyRate: 35, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', verified: true },
  { id: '2', name: { en: 'Suaad Mansour', ar: 'سعاد منصور' }, category: 'design', skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Branding'], rating: 4.8, completedJobs: 89, hourlyRate: 40, avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', verified: true },
  { id: '3', name: { en: 'Omar Bakri', ar: 'عمر بكري' }, category: 'data', skills: ['Python', 'Data Science', 'Machine Learning', 'Excel'], rating: 4.7, completedJobs: 45, hourlyRate: 30, avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', verified: true },
  { id: '4', name: { en: 'Layla Idris', ar: 'ليلى إدريس' }, category: 'write', skills: ['Content Writing', 'SEO', 'Translation', 'Creative Writing'], rating: 5.0, completedJobs: 210, hourlyRate: 25, avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200', verified: true },
  { id: '5', name: { en: 'Hassan Jabir', ar: 'حسن جابر' }, category: 'mobile', skills: ['Flutter', 'iOS Dev', 'Android Dev', 'Firebase'], rating: 4.6, completedJobs: 67, hourlyRate: 45, avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', verified: true },
  { id: '6', name: { en: 'Fatima Zaid', ar: 'فاطمة زيد' }, category: 'prog', skills: ['Frontend', 'Vue.js', 'Tailwind', 'Motion UI'], rating: 4.9, completedJobs: 156, hourlyRate: 38, avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?auto=format&fit=crop&q=80&w=200', verified: true },
  { id: '7', name: { en: 'Yaser Fawzi', ar: 'ياسر فوزي' }, category: 'mkt', skills: ['Marketing', 'Ads Management', 'Strategy', 'Analytics'], rating: 4.5, completedJobs: 32, hourlyRate: 50, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', verified: true },
  { id: '8', name: { en: 'Mona Hadi', ar: 'منى هادي' }, category: 'trans', skills: ['Translation', 'En-Ar', 'Transcription', 'Subtitle'], rating: 4.8, completedJobs: 112, hourlyRate: 20, avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200', verified: true },
];

interface Category {
  id: string;
  en: string;
  ar: string;
  description: { en: string; ar: string };
  subcategories: { en: string[]; ar: string[] };
  icon: ReactNode;
}

const CATEGORIES: Category[] = [
  { 
    id: 'prog', 
    en: 'Programming', 
    ar: 'البرمجة والتقنية', 
    description: { 
      en: 'Building scalable software, web applications, and technical solutions.', 
      ar: 'بناء البرمجيات القابلة للتوسع، تطبيقات الويب، والحلول التقنية المبتكرة.' 
    },
    subcategories: {
      en: ['Web Development', 'DevOps', 'E-commerce', 'AI & ML'],
      ar: ['تطوير الويب', 'هندسة السحاب', 'التجارة الإلكترونية', 'الذكاء الاصطناعي']
    },
    icon: <Code2 size={24} /> 
  },
  { 
    id: 'design', 
    en: 'Graphic Design', 
    ar: 'التصميم والابداع', 
    description: { 
      en: 'Visual communication, branding, and user interface excellence.', 
      ar: 'الاتصال المرئي، الهوية البصرية، والتميز في واجهات المستخدم.' 
    },
    subcategories: {
      en: ['Logo Design', 'UI/UX', 'Illustration', 'Motion Graphics'],
      ar: ['تصميم الهوية', 'تجربة المستخدم', 'الرسم الرقمي', 'الموشن جرافيك']
    },
    icon: <Palette size={24} /> 
  },
  { 
    id: 'trans', 
    en: 'Translation', 
    ar: 'الترجمة واللغات', 
    description: { 
      en: 'Bridging languages with accurate and culturally-sensitive translation.', 
      ar: 'جسر اللغات مع ترجمة دقيقة وحساسة ثقافياً.' 
    },
    subcategories: {
      en: ['Legal Translation', 'Creative Writing', 'Transcription', 'Subtitling'],
      ar: ['الترجمة القانونية', 'الكتابة الإبداعية', 'التفريغ الصوتي', 'ترجمة الأفلام']
    },
    icon: <Languages size={24} /> 
  },
  { 
    id: 'mkt', 
    en: 'Marketing', 
    ar: 'التسويق والمبيعات', 
    description: { 
      en: 'Strategic growth, social media management, and advertising.', 
      ar: 'النمو الاستراتيجي، إدارة وسائل التواصل الاجتماعي، والإعلانات.' 
    },
    subcategories: {
      en: ['Social Media', 'SEO', 'Email Marketing', 'Market Research'],
      ar: ['التواصل الاجتماعي', 'تحسين المحركات', 'التسويق بالبريد', 'أبحاث السوق']
    },
    icon: <TrendingUp size={24} /> 
  },
  { 
    id: 'data', 
    en: 'Data Analysis', 
    ar: 'تحليل البيانات', 
    description: { 
      en: 'Turning raw information into actionable business insights.', 
      ar: 'تحويل المعلومات الخام إلى رؤى تجارية قابلة للتنفيذ.' 
    },
    subcategories: {
      en: ['Data Visualization', 'SQL', 'Python Lab', 'Statistics'],
      ar: ['تصوير البيانات', 'قواعد البيانات', 'مختبر بايثون', 'الإحصاء']
    },
    icon: <BarChart3 size={24} /> 
  },
  { 
    id: 'write', 
    en: 'Writing', 
    ar: 'الكتابة والتدقيق', 
    description: { 
      en: 'Professional content creation, editing, and publishing.', 
      ar: 'صناعة المحتوى الاحترافي، التحرير، والنشر.' 
    },
    subcategories: {
      en: ['Copywriting', 'Technical Writing', 'Proofreading', 'Blogging'],
      ar: ['كتابة الإعلانات', 'الكتابة التقنية', 'التدقيق اللغوي', 'التدوين']
    },
    icon: <PenTool size={24} /> 
  },
  { 
    id: 'mobile', 
    en: 'Mobile Dev', 
    ar: 'تطوير التطبيقات', 
    description: { 
      en: 'Native and cross-platform mobile experiences for iOS and Android.', 
      ar: 'تطوير تطبيقات الهواتف الذكية لنظامي أندرويد و iOS.' 
    },
    subcategories: {
      en: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
      ar: ['فلاتر', 'رياكت نيتف', 'سويفت', 'كوتلن']
    },
    icon: <Smartphone size={24} /> 
  },
  { 
    id: 'biz', 
    en: 'Business Strategy', 
    ar: 'الأعمال والاستشارات', 
    description: { 
      en: 'Project management, financial planning, and operational strategy.', 
      ar: 'إدارة المشاريع، التخطيط المالي، والاستراتيجية التشغيلية.' 
    },
    subcategories: {
      en: ['Project Management', 'Financial Analysis', 'Legal advice', 'Supply Chain'],
      ar: ['إدارة المشاريع', 'التحليل المالي', 'الاستشارات القانونية', 'سلاسل الإمداد']
    },
    icon: <Briefcase size={24} /> 
  },
];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<View>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isLogoMenuOpen, setIsLogoMenuOpen] = useState(false);
  const [signupRole, setSignupRole] = useState<'freelancer' | 'employer'>('freelancer');
  const [loginRole, setLoginRole] = useState<'freelancer' | 'employer'>('freelancer');
  
  // Signup Form State
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    agree: false
  });

  // Login Form State
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // API Demo State
  const [backendHealth, setBackendHealth] = useState<{ message: string } | null>(null);
  const [apiUsers, setApiUsers] = useState<any[]>([]);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Effect to test backend connection on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await apiService.getHealth();
        setBackendHealth(data);
      } catch (err) {
        console.warn("Backend not reached at localhost:5000. This is expected if the backend isn't running locally.");
      }
    };
    checkHealth();
  }, []);

  const fetchUsers = async () => {
    setIsApiLoading(true);
    setApiError(null);
    try {
      const users = await apiService.getUsers();
      setApiUsers(users || []);
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsApiLoading(false);
    }
  };
  
  // Talent Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [minJobs, setMinJobs] = useState(0);

  const isRtl = lang === 'ar';

  const selectedCategory = useMemo(() => 
    CATEGORIES.find(c => c.id === selectedCategoryId) || null, 
  [selectedCategoryId]);

  const t = useMemo(() => ({
    brand: isRtl ? 'سوق اليمن' : 'YemeniSook',
    tagline: isRtl ? 'حيث تلتقي المهارة بالفرص' : 'Where Talent Meets Opportunity',
    heroTitle: isRtl ? 'عينك على أفضل الكفاءات اليمنية' : "Yemen's Premier Freelance Marketplace",
    heroDesc: isRtl ? 'سوق متكامل يربط المبدعين اليمنيين بالشركات المحلية والعالمية. وظّف أفضل المبرمجين والمصممين والمترجمين بكل سهولة وأمان.' : 'Connect with verified Yemeni professionals for your next big project. High-quality talent, local payment support, and global standards.',
    findTalent: isRtl ? 'ابحث عن مستقل' : 'Find a Freelancer',
    postJob: isRtl ? 'أضف مشروعاً' : 'Post a Job',
    topCategories: isRtl ? 'تصفح حسب الفئة' : 'Browse Top Categories',
    howItWorks: isRtl ? 'كيف يعمل سوق اليمن' : 'How it Works',
    steps: [
      { t: isRtl ? 'أضف مشروعك' : 'Post a Project', d: isRtl ? 'صف ما تحتاجه وسنقوم بتوصيله للمستقلين' : 'Tell us what you need and we will match you with talent.' },
      { t: isRtl ? 'اختر المستقل' : 'Choose a Pro', d: isRtl ? 'قارن العروض والتقييمات واختر الأنسب لك' : 'Compare proposals, reviews, and portfolios.' },
      { t: isRtl ? 'استلم العمل' : 'Get it Done', d: isRtl ? 'ادفع بأمان عند استلام العمل بنجاح' : 'Pay securely once you are 100% satisfied.' }
    ],
    signup: {
      title: isRtl ? (signupRole === 'employer' ? 'ابدأ بتوظيف المستقلين' : 'أنشئ حسابك المجاني') : (signupRole === 'employer' ? 'Start hiring freelancers' : 'Create your free account'),
      subtitle: isRtl 
        ? (signupRole === 'employer' ? 'استقطب أفضل الكفاءات اليمنية وقم بتوسيع نطاق أعمالك اليوم' : 'انضم إلى أول منصة متكاملة للعمل الحر في اليمن') 
        : (signupRole === 'employer' ? 'Attract top Yemeni talent and scale your business today' : 'Join the first integrated freelance platform in Yemen'),
      fullName: isRtl ? 'الاسم الكامل' : 'Full name',
      email: isRtl ? 'البريد الإلكتروني' : 'Email address',
      password: isRtl ? 'كلمة المرور' : 'Password',
      confirmPassword: isRtl ? 'تأكيد كلمة المرور' : 'Confirm password',
      companyName: isRtl ? 'اسم الشركة (اختياري)' : 'Company name (optional)',
      agreePrefix: isRtl ? 'أنا أوافق على' : 'I agree to the',
      terms: isRtl ? 'شروط الخدمة' : 'Terms of Service',
      and: isRtl ? 'و' : 'and',
      privacy: isRtl ? 'سياسة الخصوصية' : 'Privacy Policy',
      submit: isRtl ? 'إنشاء الحساب' : 'Create account',
      orContinue: isRtl ? 'أو الاستمرار عبر:' : 'Or continue with:',
      alreadyHave: isRtl ? 'لديك حساب بالفعل؟' : 'Already have an account?',
      login: isRtl ? 'تسجيل الدخول' : 'Log in',
      passwordMismatch: isRtl ? 'كلمات المرور غير متطابقة' : 'Passwords do not match'
    },
    login: {
      title: isRtl ? (loginRole === 'employer' ? 'مرحباً بعودتك، ابحث عن موظفين' : 'مرحباً بعودتك يا مستقل') : (loginRole === 'employer' ? 'Welcome back, Work Owner' : 'Welcome back, Freelancer'),
      subtitle: isRtl ? 'سجل دخولك لمواصلة رحلتك في سوق اليمن' : 'Log in to continue your journey on YemeniSook',
      email: isRtl ? 'البريد الإلكتروني' : 'Email address',
      password: isRtl ? 'كلمة المرور' : 'Password',
      rememberMe: isRtl ? 'تذكرني' : 'Remember me',
      forgotPassword: isRtl ? 'نسيت كلمة المرور؟' : 'Forgot password?',
      submit: isRtl ? 'تسجيل الدخول' : 'Log in',
      noAccount: isRtl ? 'ليس لديك حساب؟' : "Don't have an account?",
      signup: isRtl ? 'سجل الآن' : 'Sign up now'
    },
    managementLogin: {
      title: isRtl ? 'بوابة الإدارة والموظفين' : 'Management & Staff Portal',
      subtitle: isRtl ? 'الدخول الموحد لموظفي يمني سوق' : 'Unified access for YemeniSook employees',
      employeeId: isRtl ? 'الرقم الوظيفي' : 'Employee ID',
      securityCode: isRtl ? 'رمز الأمان' : 'Security Code',
      submit: isRtl ? 'تسجيل الدخول للموظفين' : 'Employee Login',
      warning: isRtl ? 'دخول المصرح لهم فقط. يتم مراقبة جميع العمليات.' : 'Authorized personnel only. All activities are monitored.',
      testApi: isRtl ? 'اختبار الربط البرمجي' : 'Test API Connection'
    }
  }), [isRtl, signupRole, loginRole]);

  const freelancers = useMemo(() => {
    return MOCK_FREELANCERS.filter(f => {
      const matchesSearch = f.name.en.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           f.name.ar.includes(searchQuery) ||
                           f.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesRating = f.rating >= minRating;
      const matchesJobs = f.completedJobs >= minJobs;
      const matchesCategory = view === 'category-detail' ? f.category === selectedCategoryId : true;
      return matchesSearch && matchesRating && matchesJobs && matchesCategory;
    });
  }, [searchQuery, minRating, minJobs, view, selectedCategoryId]);

  return (
    <div className={`min-h-screen flex flex-col bg-white ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="relative">
              <button 
                onClick={() => setIsLogoMenuOpen(!isLogoMenuOpen)}
                className="flex items-center gap-2 group cursor-pointer border-none bg-transparent outline-none py-2"
              >
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-brand-accent shadow-lg shadow-brand-primary/10 group-hover:scale-105 transition-all">
                  <Briefcase size={22} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tighter text-brand-primary">
                    {t.brand}
                  </span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isLogoMenuOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Logo Vertical Menu Dropdown */}
              <AnimatePresence>
                {isLogoMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10, originX: isRtl ? 1 : 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className={`absolute top-full mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[60] ${isRtl ? 'right-0' : 'left-0'}`}
                  >
                    <div className="p-4 space-y-1">
                      <div className="px-4 py-2 mb-2 bg-slate-50 rounded-2xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isRtl ? 'استكشف المنصة' : 'Explore Platform'}</p>
                      </div>
                      
                      <button 
                        onClick={() => { setView('home'); setIsLogoMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer border-none bg-transparent text-start ${view === 'home' ? 'bg-brand-primary/5 text-brand-primary' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <LayoutGrid size={18} />
                        {isRtl ? 'الرئيسية' : 'Home Overview'}
                      </button>
                      
                      <button 
                        onClick={() => { setView('all-categories'); setIsLogoMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer border-none bg-transparent text-start ${view === 'all-categories' ? 'bg-brand-primary/5 text-brand-primary' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <Briefcase size={18} />
                        {isRtl ? 'دليل التصنيفات' : 'Service Index'}
                      </button>
                      
                      <button 
                        onClick={() => { setView('talent'); setIsLogoMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer border-none bg-transparent text-start ${view === 'talent' ? 'bg-brand-primary/5 text-brand-primary' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <UserCircle size={18} />
                        {isRtl ? 'شبكة المبدعين' : 'Talent Network'}
                      </button>

                      <div className="h-px bg-slate-100 my-2 mx-4"></div>
                      
                      <button 
                        onClick={() => { setView('how-it-works'); setIsLogoMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer border-none bg-transparent text-start ${view === 'how-it-works' ? 'bg-brand-primary/5 text-brand-primary' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <BookOpen size={18} />
                        {isRtl ? 'طريقة العمل' : 'How it works'}
                      </button>
                      <button 
                        onClick={() => { setView('management-login'); setIsLogoMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer border-none bg-transparent text-start ${view === 'management-login' ? 'bg-brand-primary/5 text-brand-primary' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <ShieldAlert size={18} />
                        {isRtl ? 'إدارة المنصة' : 'Management'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button 
                onClick={() => setView('talent')}
                className={`text-sm font-semibold transition-colors cursor-pointer ${view === 'talent' ? 'text-brand-primary' : 'text-slate-600 hover:text-brand-primary'}`}
              >
                {t.findTalent}
              </button>
              <button 
                onClick={() => setView('how-it-works')}
                className={`text-sm font-semibold transition-colors cursor-pointer ${view === 'how-it-works' ? 'text-brand-primary' : 'text-slate-600 hover:text-brand-primary'}`}
              >
                {t.howItWorks}
              </button>
              <div className="h-6 w-px bg-slate-200"></div>
              
              <button 
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <Globe size={18} />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <button 
                    onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                    className="w-10 h-10 flex items-center justify-center text-brand-primary hover:bg-brand-primary/5 rounded-xl transition-all cursor-pointer border-none bg-transparent group"
                  >
                    <UserCircle size={26} className="group-hover:scale-110 transition-transform" />
                  </button>

                  <AnimatePresence>
                    {isAuthMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20, x: isRtl ? 20 : -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20, x: isRtl ? 20 : -20 }}
                        className={`absolute top-full mt-4 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[60] ${isRtl ? 'left-0' : 'right-0'}`}
                      >
                        <div className="p-4 space-y-1">
                          <div className="px-4 py-2 mb-2 bg-slate-50 rounded-2xl">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isRtl ? 'دخول المستخدمين' : 'Account Access'}</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-0.5">{isRtl ? 'اختر نوع الحساب للمتابعة' : 'Select your role to log in'}</p>
                          </div>
                          
                          <button 
                            onClick={() => { setLoginRole('freelancer'); setView('login'); setIsAuthMenuOpen(false); }}
                            className="w-full flex items-center justify-between px-4 py-4 text-sm font-bold text-slate-700 hover:bg-brand-primary hover:text-white rounded-2xl transition-all cursor-pointer border-none bg-transparent group"
                          >
                            <div className="flex items-center gap-3">
                              <UserCircle size={20} className="text-brand-primary group-hover:text-white" />
                              {isRtl ? 'دخول المستقلين' : 'Freelancer Login'}
                            </div>
                            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                          </button>
                          
                          <button 
                            onClick={() => { setLoginRole('employer'); setView('login'); setIsAuthMenuOpen(false); }}
                            className="w-full flex items-center justify-between px-4 py-4 text-sm font-bold text-slate-700 hover:bg-brand-primary hover:text-white rounded-2xl transition-all cursor-pointer border-none bg-transparent group"
                          >
                            <div className="flex items-center gap-3">
                              <Briefcase size={20} className="text-brand-primary group-hover:text-white" />
                              {isRtl ? 'دخول أصحاب العمل' : 'Work Owner Login'}
                            </div>
                            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                          </button>

                          <div className="h-px bg-slate-50 my-2 mx-2" />

                          <div className="px-4 py-2 mb-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isRtl ? 'ليس لديك حساب؟' : 'New to YemeniSook?'}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 p-2">
                            <button 
                              onClick={() => { setSignupRole('freelancer'); setView('signup'); setIsAuthMenuOpen(false); }}
                              className="flex flex-col items-center gap-2 p-4 bg-brand-accent/5 hover:bg-brand-accent/10 rounded-2xl transition-all cursor-pointer border border-brand-accent/10 group"
                            >
                              <UserPlus size={18} className="text-brand-primary group-hover:scale-110 transition-transform" />
                              <span className="text-[10px] font-black text-slate-700">{isRtl ? 'سجل كمستقل' : 'Freelancer'}</span>
                            </button>
                            <button 
                              onClick={() => { setSignupRole('employer'); setView('signup'); setIsAuthMenuOpen(false); }}
                              className="flex flex-col items-center gap-2 p-4 bg-brand-accent/5 hover:bg-brand-accent/10 rounded-2xl transition-all cursor-pointer border border-brand-accent/10 group"
                            >
                              <CheckCircle size={18} className="text-brand-primary group-hover:scale-110 transition-transform" />
                              <span className="text-[10px] font-black text-slate-700">{isRtl ? 'سجل كصاحب عمل' : 'Work Owner'}</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button 
                  className="bg-brand-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-xl hover:shadow-brand-primary/20 transition-all cursor-pointer border-none"
                >
                  {t.postJob}
                </button>
              </div>
            </nav>

            {/* Mobile Action Buttons */}
            <div className="flex lg:hidden items-center gap-1">
              <div className="relative">
                <button 
                  onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                  className="p-2 text-brand-primary cursor-pointer border-none bg-transparent"
                >
                  <UserCircle size={26} />
                </button>
                {/* Auth Menu specifically for mobile */}
                <AnimatePresence>
                  {isAuthMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -20, x: isRtl ? 20 : -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20, x: isRtl ? 20 : -20 }}
                      className={`absolute top-full mt-4 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[60] ${isRtl ? 'left-0' : 'right-0'}`}
                    >
                      <div className="p-4 space-y-1">
                        <div className="px-4 py-2 mb-2 bg-slate-50 rounded-2xl">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isRtl ? 'دخول المستخدمين' : 'Account Access'}</p>
                          <p className="text-[9px] font-bold text-slate-400 mt-0.5">{isRtl ? 'اختر نوع الحساب للمتابعة' : 'Select your role to log in'}</p>
                        </div>
                        
                        <button 
                          onClick={() => { setLoginRole('freelancer'); setView('login'); setIsAuthMenuOpen(false); }}
                          className="w-full flex items-center justify-between px-4 py-4 text-sm font-bold text-slate-700 hover:bg-brand-primary hover:text-white rounded-2xl transition-all cursor-pointer border-none bg-transparent group"
                        >
                          <div className="flex items-center gap-3">
                            <UserCircle size={20} className="text-brand-primary group-hover:text-white" />
                            {isRtl ? 'دخول المستقلين' : 'Freelancer Login'}
                          </div>
                          <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                        </button>
                        
                        <button 
                          onClick={() => { setLoginRole('employer'); setView('login'); setIsAuthMenuOpen(false); }}
                          className="w-full flex items-center justify-between px-4 py-4 text-sm font-bold text-slate-700 hover:bg-brand-primary hover:text-white rounded-2xl transition-all cursor-pointer border-none bg-transparent group"
                        >
                          <div className="flex items-center gap-3">
                            <Briefcase size={20} className="text-brand-primary group-hover:text-white" />
                            {isRtl ? 'دخول أصحاب العمل' : 'Work Owner Login'}
                          </div>
                          <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                        </button>

                        <div className="h-px bg-slate-50 my-2 mx-2" />

                        <div className="px-4 py-2 mb-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isRtl ? 'ليس لديك حساب؟' : 'New to YemeniSook?'}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 p-2">
                          <button 
                            onClick={() => { setSignupRole('freelancer'); setView('signup'); setIsAuthMenuOpen(false); }}
                            className="flex flex-col items-center gap-2 p-4 bg-brand-accent/5 hover:bg-brand-accent/10 rounded-2xl transition-all cursor-pointer border border-brand-accent/10 group"
                          >
                            <UserPlus size={18} className="text-brand-primary group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black text-slate-700">{isRtl ? 'سجل كمستقل' : 'Freelancer'}</span>
                          </button>
                          <button 
                            onClick={() => { setSignupRole('employer'); setView('signup'); setIsAuthMenuOpen(false); }}
                            className="flex flex-col items-center gap-2 p-4 bg-brand-accent/5 hover:bg-brand-accent/10 rounded-2xl transition-all cursor-pointer border border-brand-accent/10 group"
                          >
                            <CheckCircle size={18} className="text-brand-primary group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black text-slate-700">{isRtl ? 'سجل كصاحب عمل' : 'Work Owner'}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button className="p-2 text-slate-600 cursor-pointer border-none bg-transparent" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-4"
          >
            <div className="flex flex-col gap-6 pt-10">
              <button 
                onClick={() => { setView('talent'); setIsMenuOpen(false); }}
                className="text-2xl font-bold text-slate-800 text-start"
              >
                {t.findTalent}
              </button>
              <button 
                onClick={() => { setView('how-it-works'); setIsMenuOpen(false); }}
                className={`text-2xl font-bold text-start ${view === 'how-it-works' ? 'text-brand-primary' : 'text-slate-800'}`}
              >
                {t.howItWorks}
              </button>
              <button 
                onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setIsMenuOpen(false); }}
                className="flex items-center gap-3 text-2xl font-bold text-brand-accent p-4 bg-brand-primary rounded-2xl w-fit"
              >
                <Globe size={24} />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
              <div className="mt-auto pb-10 flex flex-col gap-4">
                <button className="w-full py-4 text-xl font-bold bg-brand-primary text-white rounded-2xl shadow-xl">{t.postJob}</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content View Switcher */}
      <main className="flex-grow">
        {view === 'api-test' ? (
          <div className="min-h-[80vh] bg-slate-900 text-white py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-12">
                <button 
                  onClick={() => setView('management-login')}
                  className="p-3 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-colors border-none cursor-pointer text-white"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-3xl font-black italic tracking-tight">{t.managementLogin.testApi}</h1>
                  <p className="text-slate-400 font-medium">Developer console for backend integration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Health Check Card */}
                <div className="bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Activity className={backendHealth ? "text-success" : "text-amber-500"} size={24} />
                      <h3 className="text-xl font-bold">System Status</h3>
                    </div>
                    <button 
                      onClick={async () => {
                        setBackendHealth(null);
                        try {
                          const data = await apiService.getHealth();
                          setBackendHealth(data);
                        } catch (e) {
                          alert("Backend unreachable at localhost:5000");
                        }
                      }}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors border-none bg-transparent cursor-pointer text-slate-400"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>
                  
                  <div className={`p-4 rounded-2xl ${backendHealth ? 'bg-success/10 border border-success/20 text-success' : 'bg-slate-900 border border-slate-700 text-slate-500'}`}>
                    <p className="font-mono text-sm">
                      {backendHealth ? backendHealth.message : "Checking connection to http://localhost:5000/api..."}
                    </p>
                  </div>
                  
                  {!backendHealth && (
                    <div className="mt-4 flex items-start gap-3 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                      <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] font-bold text-amber-500/80 leading-relaxed uppercase tracking-wider">
                        Make sure your local backend is running at port 5000 and CORS is enabled.
                      </p>
                    </div>
                  )}
                </div>

                {/* Database Test Card */}
                <div className="bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-6">
                    <Database className="text-brand-primary" size={24} />
                    <h3 className="text-xl font-bold">Database Check</h3>
                  </div>
                  <button 
                    onClick={async () => {
                      try {
                        const data = await apiService.testDbConnection();
                        alert(JSON.stringify(data, null, 2));
                      } catch (e: any) {
                        alert(e.message);
                      }
                    }}
                    className="w-full py-4 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-primary transition-all border-none cursor-pointer"
                  >
                    Run GET /api/test-db
                  </button>
                </div>

                {/* Users List Card */}
                <div className="md:col-span-2 bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-700/50">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <Server className="text-brand-accent" size={24} />
                      <h3 className="text-xl font-bold">User Management (GET /api/users)</h3>
                    </div>
                    <button 
                      onClick={fetchUsers}
                      disabled={isApiLoading}
                      className="px-6 py-3 bg-slate-700 text-white rounded-xl font-bold text-sm hover:bg-slate-600 transition-all border-none cursor-pointer disabled:opacity-50"
                    >
                      {isApiLoading ? "Loading..." : "Fetch Users"}
                    </button>
                  </div>

                  {apiError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3">
                      <AlertTriangle size={18} />
                      <p className="text-sm font-bold">{apiError}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {apiUsers.length > 0 ? apiUsers.map((user: any) => (
                      <div key={user.id} className="bg-slate-900 p-6 rounded-[2rem] border border-slate-700 hover:border-brand-primary/50 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{user.name || "Unnamed User"}</p>
                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">ID: {user.id}</p>
                          </div>
                        </div>
                        <button 
                          onClick={async () => {
                            try {
                              const data = await apiService.getUserById(user.id);
                              alert(JSON.stringify(data, null, 2));
                            } catch (e: any) {
                              alert(e.message);
                            }
                          }}
                          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors border-none cursor-pointer"
                        >
                          View Full Details
                        </button>
                      </div>
                    )) : (
                      <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-700 rounded-[2.5rem]">
                        <p className="font-bold uppercase tracking-widest text-[10px]">No data fetched yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : view === 'management-login' ? (
          <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden relative">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent rounded-full blur-[120px]"></div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md w-full space-y-10 bg-slate-800/50 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-slate-700/50 relative z-10"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-primary/10 text-brand-primary rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <ShieldAlert size={40} />
                </div>
                <h2 className={`text-3xl font-black text-white mb-3 italic tracking-tight ${isRtl ? 'text-right' : 'text-left'}`}>{t.managementLogin.title}</h2>
                <p className={`text-slate-400 font-medium text-sm ${isRtl ? 'text-right' : 'text-left'}`}>{t.managementLogin.subtitle}</p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); }}>
                <div className="space-y-5">
                  <div>
                    <label className={`block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t.managementLogin.employeeId}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-600`}>
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="YS-XXXXXX"
                        className={`block w-full ${isRtl ? 'pr-12 text-right' : 'pl-12 text-left'} py-4 bg-slate-900/50 border border-slate-700 text-white rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all font-medium text-sm placeholder:text-slate-700`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t.managementLogin.securityCode}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-600`}>
                        <Lock size={18} />
                      </div>
                      <input
                        type="password"
                        required
                        className={`block w-full ${isRtl ? 'pr-12 text-right' : 'pl-12 text-left'} py-4 bg-slate-900/50 border border-slate-700 text-white rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all font-medium text-sm`}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-start gap-3 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-6">
                    <ShieldAlert size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-amber-500/80 leading-relaxed uppercase tracking-wider">
                      {t.managementLogin.warning}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center py-5 px-4 border-none rounded-2xl shadow-xl text-sm font-black text-white bg-brand-primary hover:bg-white hover:text-brand-primary focus:outline-none transition-all uppercase tracking-widest cursor-pointer"
                  >
                    {t.managementLogin.submit}
                  </button>
                </div>

                <div className="flex justify-center mt-2">
                  <button 
                    type="button"
                    onClick={() => setView('api-test')}
                    className="flex items-center gap-2 text-[10px] font-black text-brand-accent uppercase tracking-widest hover:underline bg-transparent border-none cursor-pointer"
                  >
                    <Activity size={14} />
                    {t.managementLogin.testApi}
                  </button>
                </div>

                <button 
                  onClick={() => setView('home')}
                  className="w-full text-center text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors bg-transparent border-none cursor-pointer mt-4"
                >
                  {isRtl ? 'العودة للرئيسية' : 'Return to Home'}
                </button>
              </form>
            </motion.div>
          </div>
        ) : view === 'login' ? (
          <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md w-full space-y-10 bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100"
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex bg-slate-100 p-1 rounded-2xl">
                    <button 
                      onClick={() => setLoginRole('freelancer')}
                      className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-none cursor-pointer ${loginRole === 'freelancer' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {isRtl ? 'مستقل' : 'Freelancer'}
                    </button>
                    <button 
                      onClick={() => setLoginRole('employer')}
                      className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-none cursor-pointer ${loginRole === 'employer' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {isRtl ? 'صاحب عمل' : 'Work Owner'}
                    </button>
                  </div>
                </div>
                <h2 className={`text-3xl font-black text-slate-900 mb-3 italic tracking-tight ${isRtl ? 'text-right' : 'text-left'}`}>{t.login.title}</h2>
                <p className={`text-slate-500 font-medium text-sm ${isRtl ? 'text-right' : 'text-left'}`}>{t.login.subtitle}</p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); /* Logic here */ }}>
                <div className="space-y-5">
                  <div>
                    <label className={`block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t.login.email}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-300`}>
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        required
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        className={`block w-full ${isRtl ? 'pr-12 text-right' : 'pl-12 text-left'} py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className={`block text-xs font-black uppercase tracking-widest text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {t.login.password}
                      </label>
                      <button type="button" className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline bg-transparent border-none cursor-pointer">
                        {t.login.forgotPassword}
                      </button>
                    </div>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-300`}>
                        <Lock size={18} />
                      </div>
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        className={`block w-full ${isRtl ? 'pr-12 pl-12 text-right' : 'pl-12 pr-12 text-left'} py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center text-slate-400 hover:text-brand-primary transition-colors cursor-pointer border-none bg-transparent`}
                      >
                        {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={loginForm.rememberMe}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, rememberMe: e.target.checked }))}
                    className="h-5 w-5 text-brand-primary focus:ring-brand-primary border-slate-200 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className={`mx-3 text-xs font-medium text-slate-500 cursor-pointer ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.login.rememberMe}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-5 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-black text-white bg-brand-primary hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all uppercase tracking-widest"
                >
                  {t.login.submit}
                </button>

                <div className="relative mt-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                  <div className="relative flex justify-center text-xs uppercase tracking-widest font-black"><span className="px-4 bg-white text-slate-300">{t.signup.orContinue}</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="flex items-center justify-center gap-3 py-4 border-2 border-slate-50 rounded-2xl bg-white hover:bg-slate-50 transition-all font-bold text-xs cursor-pointer">
                    <Globe size={18} className="text-brand-primary" />
                    Google
                  </button>
                  <button type="button" className="flex items-center justify-center gap-3 py-4 border-2 border-slate-50 rounded-2xl bg-white hover:bg-slate-50 transition-all font-bold text-xs cursor-pointer">
                    <Linkedin size={18} className="text-[#0077b5]" />
                    LinkedIn
                  </button>
                </div>

                <p className={`text-center text-sm font-medium text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t.login.noAccount}{' '}
                  <button 
                    type="button" 
                    onClick={() => { setSignupRole(loginRole); setView('signup'); }}
                    className="text-brand-primary hover:underline font-bold bg-transparent border-none cursor-pointer"
                  >
                    {t.login.signup}
                  </button>
                </p>
              </form>
            </motion.div>
          </div>
        ) : view === 'signup' ? (
          <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md w-full space-y-8 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"
            >
              <div className="text-center">
                <button 
                  onClick={() => setView('home')}
                  className={`mb-6 p-2 hover:bg-slate-50 rounded-full transition-all cursor-pointer border-none bg-transparent flex items-center justify-center mx-auto text-slate-400 hover:text-brand-primary ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
                </button>
                <h2 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tight">
                  {t.signup.title}
                </h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                  {t.signup.subtitle}
                </p>
              </div>
              
              <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t.signup.fullName}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-300`}>
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        required
                        value={signupForm.name}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                        className={`block w-full ${isRtl ? 'pr-12 text-right' : 'pl-12 text-left'} py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t.signup.email}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-300`}>
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        required
                        value={signupForm.email}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                        className={`block w-full ${isRtl ? 'pr-12 text-right' : 'pl-12 text-left'} py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm`}
                      />
                    </div>
                  </div>

                  {signupRole === 'employer' && (
                    <div>
                      <label className={`block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {t.signup.companyName}
                      </label>
                      <div className="relative">
                        <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-300`}>
                          <Building size={18} />
                        </div>
                        <input
                          type="text"
                          value={signupForm.companyName}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, companyName: e.target.value }))}
                          className={`block w-full ${isRtl ? 'pr-12 text-right' : 'pl-12 text-left'} py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm`}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {t.signup.password}
                      </label>
                      <div className="relative">
                        <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-300`}>
                          <Lock size={18} />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={signupForm.password}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                          className={`block w-full ${isRtl ? 'pr-12 pl-12 text-right' : 'pl-12 pr-12 text-left'} py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center text-slate-400 hover:text-brand-primary transition-colors cursor-pointer border-none bg-transparent`}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {t.signup.confirmPassword}
                      </label>
                      <div className="relative">
                        <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-slate-300`}>
                          <Lock size={18} />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={signupForm.confirmPassword}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className={`block w-full ${isRtl ? 'pr-12 pl-12 text-right' : 'pl-12 pr-12 text-left'} py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm ${signupForm.confirmPassword && signupForm.password !== signupForm.confirmPassword ? 'ring-2 ring-red-500/20 shadow-[0_0_0_2px_rgba(239,68,68,0.2)]' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center text-slate-400 hover:text-brand-primary transition-colors cursor-pointer border-none bg-transparent`}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {signupForm.confirmPassword !== '' && signupForm.password !== signupForm.confirmPassword && (
                        <p className={`mt-2 text-[10px] font-bold text-red-500 tracking-wide ${isRtl ? 'text-right' : 'text-left'}`}>
                          {t.signup.passwordMismatch}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <input
                    id="terms"
                    type="checkbox"
                    checked={signupForm.agree}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, agree: e.target.checked }))}
                    className="h-5 w-5 text-brand-primary focus:ring-brand-primary border-slate-200 rounded cursor-pointer"
                  />
                  <label htmlFor="terms" className={`text-xs font-medium text-slate-500 cursor-pointer ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.signup.agreePrefix}{' '}
                    <button type="button" className="text-brand-primary hover:underline bg-transparent border-none p-0 font-bold cursor-pointer">{t.signup.terms}</button>
                    {' '}{t.signup.and}{' '}
                    <button type="button" className="text-brand-primary hover:underline bg-transparent border-none p-0 font-bold cursor-pointer">{t.signup.privacy}</button>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!signupForm.agree || (signupForm.confirmPassword !== '' && signupForm.password !== signupForm.confirmPassword)}
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-black text-white bg-brand-primary hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.signup.submit}
                </button>

                <div className="relative my-8 text-center flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                  </div>
                  <span className="relative px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white">
                    {t.signup.orContinue}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm text-slate-700 cursor-pointer bg-white shadow-sm">
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                       <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                       <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                       <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-1.57z" fill="#FBBC05"/>
                       <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm text-slate-700 cursor-pointer bg-white shadow-sm">
                    <Linkedin size={18} className="text-[#0077b5] flex-shrink-0" />
                    LinkedIn
                  </button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm font-medium text-slate-500">
                    {t.signup.alreadyHave}{' '}
                    <button 
                      onClick={() => { setLoginRole(signupRole); setView('login'); }}
                      className="text-brand-primary font-black hover:underline bg-transparent border-none p-0 cursor-pointer uppercase tracking-widest text-[10px] ml-1"
                    >
                      {t.signup.login}
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        ) : view === 'home' ? (
          <>
            {/* Hero Section */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="z-10 text-center lg:text-start"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 lg:mb-8">
                {t.heroTitle.split(' ').map((word, i) => (
                  <span key={i} className={i >= (isRtl ? 2 : 3) ? 'text-brand-accent' : ''}>{word} </span>
                )) }
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg mb-8 lg:mb-10 mx-auto lg:mx-0">
                {t.heroDesc}
              </p>
              
              <div className="relative max-w-xl mb-10 lg:mb-12">
                <div className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4' : 'left-4'} text-slate-400`}>
                  <Search size={22} className="hidden sm:block" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRtl ? 'ابحث عن مستقل...' : 'Search for talent...'} 
                  className={`w-full py-4 lg:py-5 ${isRtl ? 'pr-4 sm:pr-12 pl-24 sm:pl-32 text-right' : 'pl-4 sm:pl-12 pr-24 sm:pr-32 text-left'} rounded-2xl border-2 border-slate-100 focus:border-brand-primary outline-none text-sm sm:text-base lg:text-lg transition-all shadow-sm focus:shadow-xl font-medium`}
                />
                <button 
                  onClick={() => setView('talent')}
                  className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-1.5 sm:left-2' : 'right-1.5 sm:right-2'} bg-brand-primary text-white py-2.5 lg:py-3 px-4 lg:px-6 rounded-xl font-bold hover:bg-slate-800 transition-colors cursor-pointer text-xs sm:text-sm lg:text-base`}
                >
                  {isRtl ? 'بحث' : 'Search'}
                </button>
              </div>

              <div className="flex flex-wrap gap-6 lg:gap-10 items-center justify-center lg:justify-start">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  {[
                    "https://images.unsplash.com/photo-1544717297-fa154dafaf0b?auto=format&fit=crop&q=80&w=150", // Female professional
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", // Male professional
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", // Female professional 2
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"  // Male professional 2
                  ].map((url, i) => (
                    <img 
                      key={i}
                      src={url} 
                      alt="Verified Freelancer" 
                      className="w-12 h-12 rounded-full border-4 border-white bg-slate-50 ring-1 ring-slate-100 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-brand-accent flex items-center justify-center text-xs font-bold text-white shadow-sm ring-1 ring-slate-100">
                    +5k
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{isRtl ? 'أكثر من 5,000 مستقل معتمد' : 'Over 5,000 Verified Freelancers'}</p>
                  <p className="text-xs text-slate-500 font-medium">{isRtl ? 'بناءً على 10,000+ تقييم' : 'Based on 10,000+ reviews'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative lg:h-[640px] flex items-center justify-center mt-12 lg:mt-0"
            >
              <div className="relative z-10 w-full h-full max-h-[450px] lg:max-h-[580px] rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl border-[10px] lg:border-[16px] border-slate-50 ring-1 ring-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=1000" 
                  alt="Yemeni professional male" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 via-transparent to-transparent"></div>
                
                {/* Floating Tags - Hidden on small mobile */}
                <div className={`hidden sm:inline-flex absolute top-6 lg:top-10 ${isRtl ? 'left-6 lg:left-10' : 'right-6 lg:right-10'} bg-white/95 backdrop-blur items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 rounded-2xl lg:rounded-3xl shadow-xl border border-white/50 animate-bounce duration-[3000ms]`}>
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                    <CheckCircle size={20} className="lg:scale-125" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isRtl ? 'الدفع الآمن' : 'SECURE PAYMENT'}</p>
                    <p className="text-base lg:text-lg font-bold text-slate-900">{isRtl ? 'محمي 100%' : '100% Protected'}</p>
                  </div>
                </div>

                <div className={`absolute bottom-6 lg:bottom-10 ${isRtl ? 'right-6 lg:right-10' : 'left-6 lg:left-10'} bg-brand-primary/95 backdrop-blur text-white p-4 lg:p-6 rounded-2xl lg:rounded-[2.5rem] shadow-2xl border border-white/10 max-w-[220px] lg:max-w-[280px]`}>
                  <p className="text-2xl lg:text-3xl font-black text-brand-accent mb-1 lg:mb-2 text-center lg:text-start">98%</p>
                  <p className="text-xs lg:text-sm font-medium leading-relaxed opacity-90 text-center lg:text-start">
                    {isRtl ? 'من عملائنا يوصون بخدمات المستقلين لدينا لشركائهم.' : 'Of our clients recommend our freelancers to their business partners.'}
                  </p>
                </div>
              </div>
              
              {/* Accents */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col md:flex-row justify-between items-end gap-6 mb-16 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">{t.topCategories}</h2>
                <p className="text-lg text-slate-500 font-medium">
                  {isRtl ? 'تصفح نخبة المتخصيين في مجالات العمل الرقمي' : 'Get inspired by the experts across all digital domains.'}
                </p>
              </div>
              <button 
                onClick={() => { setView('all-categories'); window.scrollTo(0, 0); }}
                className="flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all cursor-pointer border-none bg-transparent"
              >
                {isRtl ? 'تصفح الكل' : 'See all categories'}
                <ArrowRight size={20} className={isRtl ? 'rotate-180' : ''} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {CATEGORIES.map((cat) => (
                <motion.div 
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setView('category-detail');
                    window.scrollTo(0, 0);
                  }}
                  whileHover={{ y: -8, backgroundColor: '#fff', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  className="p-8 rounded-[2rem] border border-slate-100 bg-white/50 backdrop-blur transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-brand-accent group-hover:text-white flex items-center justify-center transition-all mb-8 shadow-sm">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{isRtl ? cat.ar : cat.en}</h3>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-brand-primary transition-colors">
                    {isRtl ? 'عرض المستقلين' : 'View pros'}
                    <ChevronDown size={16} className={isRtl ? 'rotate-90' : '-rotate-90'} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust markers */}
        <section className="py-20 border-y border-slate-100">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { label: isRtl ? 'مشروع مكتمل' : 'Projects Done', val: '12K+' },
                  { label: isRtl ? 'العملات المحلية' : 'Local Payments', val: 'OK' },
                  { label: isRtl ? 'دعم مدار الساعة' : '24/7 Support', val: 'LIVE' },
                  { label: isRtl ? 'مستقل موثق' : 'Verified Talent', val: '100%' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-4xl font-black text-brand-primary mb-2 tracking-tighter">{stat.val}</p>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* How It Works */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-20">
               <h2 className="text-4xl font-black text-slate-900 mb-4">{t.howItWorks}</h2>
               <div className="w-20 h-1.5 bg-brand-accent mx-auto rounded-full"></div>
             </div>
             
             <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Connector line (desktop only) */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-slate-100 -z-10 -translate-y-12"></div>

                {t.steps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    <div className="w-24 h-24 rounded-[2rem] bg-brand-primary text-white flex items-center justify-center text-3xl font-black mb-8 shadow-xl shadow-brand-primary/20 group-hover:bg-brand-accent transition-colors">
                      {i + 1}
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">{step.t}</h4>
                    <p className="text-slate-500 leading-relaxed max-w-[250px]">{step.d}</p>
                  </div>
                ))}
             </div>
             
             <div className="mt-20 text-center">
               <button 
                onClick={() => setView('how-it-works')}
                className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-brand-primary transition-all cursor-pointer group"
               >
                 {isRtl ? 'اعرف المزيد عن نظامنا' : 'Learn more about our system'}
                 <ArrowRight size={20} className={`transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
               </button>
             </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto bg-brand-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-brand-primary/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                {isRtl ? 'جاهز لتحويل أفكارك إلى واقع؟' : 'Ready to turn your ideas into reality?'}
              </h2>
              <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                {isRtl ? 'انضم إلى آلاف الشركات التي تعتمد على سوق اليمن لإيجاد أفضل الفريلانسرز.' : 'Join thousands of businesses that rely on YemeniSook to find the best local freelancers.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className={`bg-brand-accent text-brand-primary px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl shadow-brand-accent/20 cursor-pointer`}>
                  {isRtl ? 'سجل كمستقل' : 'Register as Freelancer'}
                </button>
                <button 
                  onClick={() => setView('talent')}
                  className="bg-white/10 text-white border border-white/20 backdrop-blur px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all cursor-pointer"
                >
                  {isRtl ? 'استعن بمستقل' : 'Hire Talent Now'}
                </button>
              </div>
            </div>
          </div>
        </section>
          </>
        ) : view === 'all-categories' ? (
          /* All Categories Index View */
          <div className="bg-slate-50 min-h-screen py-12 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-16 text-center">
                <button 
                  onClick={() => setView('home')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-brand-primary mb-8 group transition-colors cursor-pointer border-none bg-transparent"
                >
                  <ArrowRight size={18} className={isRtl ? '' : 'rotate-180 group-hover:-translate-x-1 transition-transform'} />
                  {isRtl ? 'العودة للرئيسية' : 'Back to Home'}
                </button>
                <h1 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 font-arabic">
                  {isRtl ? 'دليل تخصصات المنصة' : 'Platform Specialized Index'}
                </h1>
                <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                  {isRtl ? 'تصفح جميع الفئات والمجالات المتوفرة على سوق اليمن للوصول إلى المبدعين' : 'Browse all available fields and specialties on YemeniSook to connect with top creators.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {CATEGORIES.map((cat) => (
                  <motion.div 
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      setView('category-detail');
                      window.scrollTo(0, 0);
                    }}
                    whileHover={{ y: -8 }}
                    className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-brand-accent transition-all shadow-sm">
                      {cat.icon}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-brand-primary transition-colors">
                      {isRtl ? cat.ar : cat.en}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                       {isRtl ? cat.description.ar : cat.description.en}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(isRtl ? cat.subcategories.ar : cat.subcategories.en).slice(0, 2).map((sub, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-50 text-[9px] font-black uppercase text-slate-400 rounded-lg group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-colors">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Future Expansion Note */}
              <div className="mt-20 p-12 bg-brand-primary rounded-[3rem] text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
                <h3 className="text-2xl font-black mb-4">{isRtl ? 'تصنيفات جديدة قريباً' : 'New Categories Coming Soon'}</h3>
                <p className="text-brand-accent/80 font-medium max-w-xl mx-auto">
                  {isRtl ? 'نعمل باستمرار على إضافة تخصصات جديدة لتغطية كافة احتياجات سوق العمل اليمني.' : 'We are constantly working on adding new specialties to cover all the needs of the Yemeni labor market.'}
                </p>
              </div>
            </div>
          </div>
        ) : view === 'category-detail' && selectedCategory ? (
          /* Category Detail View */
          <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category Breadcrumb */}
              <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-brand-primary mb-12 group transition-colors cursor-pointer border-none bg-transparent"
              >
                <ArrowRight size={18} className={isRtl ? '' : 'rotate-180 group-hover:-translate-x-1 transition-transform'} />
                {isRtl ? 'العودة للرئيسية' : 'Back to Home'}
              </button>

              {/* Category Header */}
              <div className={`grid lg:grid-cols-2 gap-12 items-center mb-20 ${isRtl ? 'text-right' : 'text-left'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-20 h-20 bg-brand-primary text-brand-accent rounded-3xl flex items-center justify-center mb-8 shadow-xl">
                    {selectedCategory.icon}
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight">
                    {isRtl ? selectedCategory.ar : selectedCategory.en}
                  </h1>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                    {isRtl ? selectedCategory.description.ar : selectedCategory.description.en}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100"
                >
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">{isRtl ? 'التخصصات الفرعية' : 'Main Subcategories'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(isRtl ? selectedCategory.subcategories.ar : selectedCategory.subcategories.en).map((sub, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl hover:bg-brand-accent/10 transition-colors group cursor-default">
                        <div className="w-2 h-2 rounded-full bg-brand-accent group-hover:scale-150 transition-transform"></div>
                        <span className="font-bold text-slate-700">{sub}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Talent List (Reusing layout from talent view) */}
              <div className="mb-12 flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-xl">
                    <LayoutGrid size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900">{isRtl ? 'المستقلون المتاحون' : 'Available Experts'}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{freelancers.length} {isRtl ? 'خبير معتمد' : 'Verified Pros'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setView('talent'); setSearchQuery(selectedCategory.en); }}
                  className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-primary transition-all cursor-pointer"
                >
                  {isRtl ? 'بحث متقدم' : 'Advanced Search'}
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {freelancers.length > 0 ? (
                  freelancers.map(f => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={f.id}
                      className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="relative">
                          <img 
                            src={f.avatarUrl}
                            alt={f.name.en}
                            className="w-20 h-20 rounded-full bg-slate-50 border-2 border-white shadow-sm"
                            referrerPolicy="no-referrer"
                          />
                          {f.verified && (
                            <div className={`absolute -bottom-1 ${isRtl ? '-left-1' : '-right-1'} bg-success text-white rounded-full p-1 border-2 border-white`}>
                              <CheckCircle size={14} />
                            </div>
                          )}
                        </div>
                        <div className={isRtl ? 'text-left' : 'text-right'}>
                          <div className="flex items-center gap-1 text-brand-accent font-black text-lg justify-end">
                            <span>★</span>
                            <span>{f.rating}</span>
                          </div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.completedJobs} {isRtl ? 'عمل مكتمل' : 'Jobs'}</p>
                        </div>
                      </div>

                      <h3 className={`text-xl font-black text-slate-900 mb-2 truncate group-hover:text-brand-primary transition-colors ${isRtl ? 'text-right' : 'text-left'}`}>
                        {isRtl ? f.name.ar : f.name.en}
                      </h3>
                      
                      <div className={`flex flex-wrap gap-2 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        {f.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-500 rounded-lg group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-colors">
                            {skill}
                          </span>
                        ))}
                        {f.skills.length > 3 && <span className="text-[10px] font-black text-slate-300 py-1">+{f.skills.length - 3}</span>}
                      </div>

                      <div className={`flex items-center justify-between pt-6 border-t border-slate-50 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className={isRtl ? 'text-right' : 'text-left'}>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'يبدأ من' : 'Starting at'}</p>
                          <p className="text-lg font-black text-slate-900">${f.hourlyRate}<span className="text-xs text-slate-400 font-normal">/hr</span></p>
                        </div>
                        <button className="bg-brand-primary text-white p-3 rounded-2xl hover:bg-brand-accent hover:text-brand-primary transition-all cursor-pointer">
                          <ArrowRight size={20} className={isRtl ? 'rotate-180' : ''} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6">
                      <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{isRtl ? 'لا توجد نتائج' : 'No results found'}</h3>
                    <p className="text-slate-400 font-medium">{isRtl ? 'جرب البحث بمعايير أخرى' : 'Try adjusting your filters or search query.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : view === 'how-it-works' ? (
          /* How It Works View */
          <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden bg-brand-primary text-white">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-accent rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-brand-accent rounded-full blur-[80px]"></div>
              </div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                   <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
                   >
                     <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
                     <span className="text-xs font-black uppercase tracking-widest">{isRtl ? 'بوابة المعرفة' : 'Knowledge Portal'}</span>
                   </motion.div>
                   
                   <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black mb-8 leading-tight italic"
                   >
                    {isRtl ? 'رحلتك في سوق اليمن' : 'Your Journey on YemeniSook'}
                   </motion.h2>
                   <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
                    {isRtl ? 'نظام متكامل يضمن الجودة والأمان لجميع الأطراف، مصمم لرفع كفاءة العمل المستقل في اليمن.' : 'A robust system designed to ensure quality and security for everyone, built to elevate freelancing in Yemen.'}
                   </p>
                </div>
              </div>

              {/* Decorative wave */}
              <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-px">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[200%] h-12 lg:h-20 fill-white">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.7,123.6,108.91,189.26,103.12,247.31,98,293.71,72.39,321.39,56.44Z"></path>
                </svg>
              </div>
            </section>

            {/* Core Roles Grid */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid md:grid-cols-2 gap-12 -mt-32 relative z-20">
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="p-10 rounded-[3rem] bg-white shadow-2xl border border-slate-50 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-brand-primary text-brand-accent rounded-3xl flex items-center justify-center mb-8 shadow-xl rotate-3">
                      <Briefcase size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-6">{isRtl ? 'صاحب العمل' : 'Work Owner'}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                      {isRtl ? 'الشخص أو الشركة التي تضع المشاريع، توظف المستقلين، وتدفع مقابل الخدمات. يتمتع بلوحة تحكم كاملة لإدارة عروض العمل.' : 'The person or business that posts jobs, hires freelancers, and pays for services. Enjoy a full dashboard to manage job proposals.'}
                    </p>
                    <div className="flex gap-4 w-full">
                       <span className="flex-1 py-3 px-4 bg-slate-50 rounded-2xl text-[10px] font-black text-brand-primary uppercase tracking-widest">{isRtl ? 'نشر مشاريع' : 'POST JOBS'}</span>
                       <span className="flex-1 py-3 px-4 bg-slate-50 rounded-2xl text-[10px] font-black text-brand-primary uppercase tracking-widest">{isRtl ? 'توظيف خبراء' : 'HIRE EXPERTS'}</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="p-10 rounded-[3rem] bg-brand-accent text-brand-primary flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-brand-primary text-brand-accent rounded-3xl flex items-center justify-center mb-8 shadow-xl -rotate-3">
                      <UserCircle size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-inherit mb-6">{isRtl ? 'المستقل' : 'Freelancer'}</h3>
                    <p className="text-brand-primary/70 font-medium leading-relaxed mb-8">
                      {isRtl ? 'الشخص الذي يقدم الخدمات، يرسل العروض، وينفذ المشاريع المطلوبة. يمتلك معرض أعمال لعرض مهاراته للعالم.' : 'The person who offers services, submits proposals, and completes work. Have a portfolio to showcase your skills to the world.'}
                    </p>
                    <div className="flex gap-4 w-full">
                       <span className="flex-1 py-3 px-4 bg-brand-primary text-brand-accent rounded-2xl text-[10px] font-black uppercase tracking-widest">{isRtl ? 'تقديم عروض' : 'PROPOSE'}</span>
                       <span className="flex-1 py-3 px-4 bg-brand-primary text-brand-accent rounded-2xl text-[10px] font-black uppercase tracking-widest">{isRtl ? 'بناء سمعة' : 'BUILD REP'}</span>
                    </div>
                  </motion.div>
               </div>
            </section>

            {/* Interactive Timeline */}
            <section className="py-32 bg-slate-50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-24">
                    <h2 className="text-5xl font-black text-slate-900 mb-6">{isRtl ? 'رحلة التوثيق الرقمي' : 'Digital Verification Flow'}</h2>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">{isRtl ? 'خطوات مدروسة بدقة لضمان أعلى معايير الموثوقية في المنصة' : 'Meticulously crafted steps to ensure the highest standards of reliability.'}</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden lg:block -z-0"></div>
                    
                    {[
                      { 
                        icon: <UserPlus />,
                        title: isRtl ? 'التسجيل الأولي' : 'Initial Sign-up', 
                        desc: isRtl ? 'فتح حساب جديد بالبريد الإلكتروني.' : 'Quick account setup with email.',
                        gate: isRtl ? 'بوابة الموافقة' : 'Approval Gate'
                      },
                      { 
                        icon: <Settings />,
                        title: isRtl ? 'بناء الملف' : 'Profile Build', 
                        desc: isRtl ? 'إدخال البيانات ورفع وثائق الهوية.' : 'Enter data & upload identity docs.',
                        gate: isRtl ? 'بوابة الهوية' : 'Identity Gate'
                      },
                      { 
                        icon: <ShieldCheck />,
                        title: isRtl ? 'المراجعة البشرية' : 'Human Review', 
                        desc: isRtl ? 'يقوم فريقنا بمراجعة يدوية للوثائق.' : 'Our team manually reviews logs.',
                        gate: isRtl ? 'الفحص الأمني' : 'Security Scan'
                      },
                      { 
                        icon: <CheckCircle />,
                        title: isRtl ? 'الانطلاق الفعلي' : 'Full Activation', 
                        desc: isRtl ? 'فتح كامل ميزات النشر والدردشة.' : 'Unlock all features and chat.',
                        gate: isRtl ? 'مستقل موثق' : 'Verified Badge'
                      }
                    ].map((step, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="relative z-10 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center text-center group"
                      >
                        <div className="w-16 h-16 rounded-[2rem] bg-brand-primary/5 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                          {step.icon}
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-3">{step.title}</h4>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6">{step.desc}</p>
                        <div className="mt-auto px-4 py-2 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-full">{step.gate}</div>
                      </motion.div>
                    ))}
                  </div>
               </div>
            </section>
            {/* Financial Security - Modern Split */}
            <section className="py-24 overflow-hidden border-t border-slate-100">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2 space-y-10">
                      <div className="space-y-6">
                        <h2 className="text-5xl font-black text-slate-900 leading-tight">
                          {isRtl ? 'الأمان المالي وحفظ الحقوق' : 'Zero-Trust Financial Security'}
                        </h2>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed">
                          {isRtl ? 'نحن ندرك أهمية الثقة المالية، لذا قمنا ببناء أقوى نظام ضمان في المنطقة.' : 'We understand financial trust. That\'s why we built the strongest escrow system in the region.'}
                        </p>
                      </div>

                      <div className="space-y-6">
                         <div className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex gap-6 group hover:bg-white hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-success/10 text-success rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
                               <ShieldCheck size={32} />
                            </div>
                            <div>
                               <h4 className="text-xl font-black text-slate-900 mb-2">{isRtl ? 'نظام الضمان الرقمي' : 'Digital Escrow'}</h4>
                               <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                  {isRtl ? 'يتم حجز مبالغ المشاريع في خزانة المنصة ولا يتم إطلاقها للمستقل إلا بعد الموافقة النهائية.' : 'Project funds are locked in the platform vault and released only upon final approval.'}
                               </p>
                            </div>
                         </div>

                         <div className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex gap-6 group hover:bg-white hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-brand-accent/10 text-brand-primary rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
                               <Map size={32} />
                            </div>
                            <div>
                               <h4 className="text-xl font-black text-slate-900 mb-2">{isRtl ? 'توطين المعاملات' : 'Local Payment Bridge'}</h4>
                               <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                  {isRtl ? 'دعم كامل للكريمي بلاس، التحويلات اليدوية، والتسليم النقدي مع مراجعة يدوية بشرية.' : 'Full support for Kurimi Plus, manual wires, and cash delivery with human audit.'}
                               </p>
                            </div>
                         </div>
                      </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                       <div className="relative z-10 p-2 sm:p-4 bg-slate-900 rounded-[4rem] shadow-3xl overflow-hidden group">
                          <img 
                            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1000" 
                            alt="Financial security" 
                            className="w-full h-[500px] object-cover rounded-[3.5rem] opacity-70 group-hover:scale-105 transition-transform duration-1000"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                          <div className="absolute bottom-12 left-12 right-12 text-white">
                             <div className="bg-brand-accent text-brand-primary px-6 py-2 rounded-full w-fit text-xs font-black uppercase tracking-widest mb-4 italic">
                                {isRtl ? 'محمي بالكامل' : '100% Protected'}
                             </div>
                             <h4 className="text-3xl font-black mb-4 leading-tight">{isRtl ? 'عملاتك وحقوقك في أيدٍ أمينة مع فريق سوق اليمن.' : 'Your currency and rights are safe with the YemeniSook team.'}</h4>
                             <p className="text-slate-400 font-medium">{isRtl ? 'نحن نضمن العدارة بين المستقل وصاحب العمل في كل معاملة.' : 'We guarantee fairness between freelancer and work owner in every transaction.'}</p>
                          </div>
                       </div>
                       
                       {/* Accents */}
                       <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-accent/30 rounded-full blur-[100px] pointer-events-none"></div>
                    </div>
                  </div>
               </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-brand-primary rounded-[4rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-3xl">
                     <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                     <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight italic">{isRtl ? 'ابدأ رحلة النجاح الرقمي اليوم' : 'Launch Your Digital Success Today'}</h2>
                        <p className="text-xl text-slate-300 font-medium mb-12 opacity-80 leading-relaxed">
                           {isRtl ? 'سواء كنت تبحث عن مهارات فريدة أو ترغب في تقديم خدماتك للعالم، سوق اليمن هو بوابتك المثالية.' : 'Whether seeking unique skills or wishing to serve the world, YemeniSook is your perfect gateway.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                           <button 
                             onClick={() => { setSignupRole('employer'); setView('signup'); }}
                             className="px-10 py-5 bg-brand-accent text-brand-primary rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-xl shadow-brand-accent/20 cursor-pointer border-none"
                           >
                             {isRtl ? 'سجل كصاحب عمل' : 'Join as Work Owner'}
                           </button>
                            <button 
                              onClick={() => { setSignupRole('freelancer'); setView('signup'); }}
                              className="px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-xl shadow-white/10 cursor-pointer border-none"
                            >
                              {isRtl ? 'سجل كمستقل' : 'Apply as Freelancer'}
                            </button>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
          </div>
        ) : (
          /* Talent Search View */
          <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">
                    {isRtl ? 'المستقلون الموثقون' : 'Verified Freelancers'}
                  </h2>
                  <p className="text-slate-500 font-medium">
                    {isRtl ? 'اكتشف أفضل المهارات في مختلف المجالات' : 'Discover top talent verified for quality and reliability.'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                  <span className="text-brand-primary font-black">{freelancers.length}</span>
                  {isRtl ? 'مستقل متاح حالياً' : 'talents available now'}
                </div>
              </div>

              <div className="grid lg:grid-cols-4 gap-8 items-start">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1 space-y-8 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">{isRtl ? 'بحث حسب المهارة' : 'Search by Skill'}</h4>
                    <div className="relative">
                      <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-300`} size={18} />
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={isRtl ? 'مثلاً: React' : 'e.g. React'}
                        className={`w-full py-3 ${isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium text-sm`}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">{isRtl ? 'الحد الأدنى للتقييم' : 'Min Rating'}</h4>
                    <div className="flex gap-2">
                      {[4, 4.5, 4.8].map(r => (
                        <button 
                          key={r}
                          onClick={() => setMinRating(minRating === r ? 0 : r)}
                          className={`flex-1 py-2 px-1 rounded-xl font-bold text-xs transition-all cursor-pointer ${minRating === r ? 'bg-brand-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                        >
                          {r}+ ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">{isRtl ? 'عدد المشاريع المنفذة' : 'Completed Jobs'}</h4>
                    <div className="space-y-3">
                      {[0, 20, 50, 100].map(j => (
                        <button 
                          key={j}
                          onClick={() => setMinJobs(j)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${minJobs === j ? 'bg-brand-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                        >
                          <span>{j === 0 ? (isRtl ? 'أي عدد' : 'Any') : `${j}+`}</span>
                          {minJobs === j && <CheckCircle size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => { setSearchQuery(''); setMinRating(0); setMinJobs(0); }}
                    className="w-full py-3 text-brand-primary font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                  >
                    {isRtl ? 'إعادة ضبط' : 'Clear Filters'}
                  </button>
                </div>

                {/* Freelancer Grid */}
                <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
                  {freelancers.length > 0 ? (
                    freelancers.map(f => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={f.id}
                        className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className="relative">
                            <img 
                              src={f.avatarUrl}
                              alt={f.name.en}
                              className="w-20 h-20 rounded-full bg-slate-50 border-2 border-white shadow-sm object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {f.verified && (
                              <div className={`absolute -bottom-1 ${isRtl ? '-left-1' : '-right-1'} bg-success text-white rounded-full p-1 border-2 border-white`}>
                                <CheckCircle size={14} />
                              </div>
                            )}
                          </div>
                          <div className={isRtl ? 'text-left' : 'text-right'}>
                            <div className="flex items-center gap-1 text-brand-accent font-black text-lg justify-end">
                              <span>★</span>
                              <span>{f.rating}</span>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.completedJobs} {isRtl ? 'عمل مكتمل' : 'Jobs'}</p>
                          </div>
                        </div>

                        <h3 className={`text-xl font-black text-slate-900 mb-2 truncate group-hover:text-brand-primary transition-colors ${isRtl ? 'text-right' : 'text-left'}`}>
                          {isRtl ? f.name.ar : f.name.en}
                        </h3>
                        
                        <div className={`flex flex-wrap gap-2 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          {f.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-500 rounded-lg group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-colors">
                              {skill}
                            </span>
                          ))}
                          {f.skills.length > 3 && <span className="text-[10px] font-black text-slate-300 py-1">+{f.skills.length - 3}</span>}
                        </div>

                        <div className={`flex items-center justify-between pt-6 border-t border-slate-50 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <div className={isRtl ? 'text-right' : 'text-left'}>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'يبدأ من' : 'Starting at'}</p>
                            <p className="text-lg font-black text-slate-900">${f.hourlyRate}<span className="text-xs text-slate-400 font-normal">/hr</span></p>
                          </div>
                          <button className="bg-brand-primary text-white p-3 rounded-2xl hover:bg-brand-accent hover:text-brand-primary transition-all cursor-pointer">
                            <ArrowRight size={20} className={isRtl ? 'rotate-180' : ''} />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6">
                        <Search size={40} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">{isRtl ? 'لا توجد نتائج' : 'No results found'}</h3>
                      <p className="text-slate-400 font-medium">{isRtl ? 'جرب البحث بمعايير أخرى' : 'Try adjusting your filters or search query.'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0b1121] text-slate-400 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-brand-accent shadow-lg">
                  <Briefcase size={22} />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">
                  {t.brand}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-8 font-medium text-slate-400 max-w-sm">
                {isRtl ? 'سوق اليمن هو أول منصة متكاملة للعمل الحر في اليمن، تهدف لتمكين الشباب وتوفير فرص عمل حقيقية في الاقتصاد الرقمي.' : 'YemeniSook is the first integrated freelance platform in Yemen, aiming to empower youth and provide real job opportunities in the digital economy.'}
              </p>
              <div className="flex items-center gap-3 text-white">
                <MapPin size={16} className="text-brand-primary" />
                <span className="text-xs font-black uppercase tracking-widest">{isRtl ? 'صنعاء، اليمن' : 'Sana\'a, Yemen'}</span>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h5 className="text-white font-black mb-8 uppercase tracking-widest text-[10px] italic">{isRtl ? 'للمستقلين' : 'For Freelancers'}</h5>
              <ul className="space-y-4 text-sm font-bold">
                <li><button className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-500">{isRtl ? 'تصفح المشاريع' : 'Browse Projects'}</button></li>
                <li><button className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-500">{isRtl ? 'نظام العمولات' : 'Commission System'}</button></li>
                <li><button className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-500">{isRtl ? 'سحب الأرباح' : 'Withdraw Earnings'}</button></li>
                <li><button className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-500">{isRtl ? 'مركز المساعدة' : 'Help Center'}</button></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
               <h5 className="text-white font-black mb-8 uppercase tracking-widest text-[10px] italic">{isRtl ? 'للعملاء' : 'For Clients'}</h5>
               <ul className="space-y-4 text-sm font-bold">
                  <li><button className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-500">{isRtl ? 'أضف مشروعاً' : 'Post a Project'}</button></li>
                  <li><button onClick={() => setView('talent')} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-500">{isRtl ? 'ابحث عن مستقل' : 'Find Freelancers'}</button></li>
                  <li><button className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-500">{isRtl ? 'ضمان الحقوق' : 'Secure Rights'}</button></li>
                  <li><button className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer text-slate-500">{isRtl ? 'خطة المؤسسات' : 'Business Plan'}</button></li>
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h5 className="text-white font-black mb-8 uppercase tracking-widest text-[10px] italic">{isRtl ? 'تواصل معنا' : 'Contact Us'}</h5>
               <ul className="space-y-4 text-sm font-bold">
                  <li className="text-slate-500">support@yemenisook.com</li>
                  <li className="text-slate-500">+967 77X XXX XXX</li>
                  <li className="pt-6 flex gap-4">
                     <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all cursor-pointer text-slate-500">
                        <TrendingUp size={18} />
                     </div>
                     <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all cursor-pointer text-slate-500">
                        <ShieldCheck size={18} />
                     </div>
                  </li>
               </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none">
              &copy; {new Date().getFullYear()} {t.brand}. {isRtl ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest italic">
              <a href="#" className="text-slate-600 hover:text-white transition-colors">{isRtl ? 'الخصوصية' : 'Privacy'}</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">{isRtl ? 'الشروط' : 'Terms'}</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors">{isRtl ? 'ملفات الارتباط' : 'Cookies'}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


