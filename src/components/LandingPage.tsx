import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, Check, ArrowRight, Clock, Star, Flame, ChevronDown, CheckCircle, 
  BookOpen, HelpCircle, Lock, Award, Eye, UserCheck, Key, Sparkles, Zap,
  X, AlertTriangle, RefreshCw, Skull, MapPin, MessageSquare, Play, Pause
} from "lucide-react";
import { TESTIMONIALS, FAQS } from "../data";

const STAGES_DATA = [
  {
    num: "01",
    label: "MOTIVACIÓN",
    title: "🔥 MOTIVACIÓN ALTA",
    quote: "«Esta vez sí voy a cambiar. Voy por todo.»",
    desc: "Sientes un subidón irreal de optimismo. Planificas tu vida ideal a las 2 AM empapándote de videos motivacionales de YouTube o Instagram.",
    dopamine: 100,
    energy: 90,
    focus: 60,
    color: "text-orange-500",
    glow: "hover:border-orange-500/30",
    bgClass: "bg-orange-500/10 border-orange-500/20",
    colorHex: "#f97316",
    actionTip: "La motivación de corto plazo es un pico transitorio de dopamina. Jamás servirá como base de tu vida.",
    iconName: "Flame"
  },
  {
    num: "02",
    label: "ACCIÓN INTENSA",
    title: "⚡ INTENTO AGRESIVO",
    quote: "«Día 1 superado. Soy imparable.»",
    desc: "Empiezas con todo. Reduces horas de sueño, te exiges el triple y buscas ver cambios inmediatos para alimentar tu entusiasmo.",
    dopamine: 85,
    energy: 100,
    focus: 85,
    color: "text-yellow-400",
    glow: "hover:border-yellow-400/30",
    bgClass: "bg-yellow-400/10 border-yellow-400/20",
    colorHex: "#eab308",
    actionTip: "El sobreesfuerzo drástico sin un hábitat diseñado drena rápidamente tus reservas de glucosa prefrontal.",
    iconName: "Zap"
  },
  {
    num: "03",
    label: "REALIDAD",
    title: "⚠️ IMPACTO DE RESISTENCIA",
    quote: "«Hoy no dormí bien... Mejor lo hago mañana.»",
    desc: "El entusiasmo se desvanece. Aparece el cansancio acumulado, las responsabilidades diarias y las ganas inconscientes de posponer.",
    dopamine: 40,
    energy: 50,
    focus: 40,
    color: "text-amber-500",
    glow: "hover:border-amber-500/30",
    bgClass: "bg-amber-500/15 border-amber-500/20",
    colorHex: "#f59e0b",
    actionTip: "Aquí es donde caes si no tienes un ambiente diseñado. Con el Tomo II aprendes a mecanizar la acción sin depender de tus ganas.",
    iconName: "AlertTriangle"
  },
  {
    num: "04",
    label: "ABANDONO",
    title: "❌ CAÍDA SILENCIOSA",
    quote: "«Ya rompí la racha hoy. Qué más da...»",
    desc: "Postergas el primer día. Luego el segundo. Rompes la cadena de hábitos de golpe, y el impulso inicial se extingue por completo.",
    dopamine: 15,
    energy: 25,
    focus: 10,
    color: "text-red-500",
    glow: "hover:border-red-500/30",
    bgClass: "bg-red-500/10 border-red-500/20",
    colorHex: "#ef4444",
    actionTip: "La regla de 'Nunca fallar 2 veces consecutivas' del Tomo II protege tu consistencia ante cualquier desvío imprevisto.",
    iconName: "X"
  },
  {
    num: "05",
    label: "FRUSTRACIÓN",
    title: "💀 DIÁLOGO DE AUTOSABOTAJE",
    quote: "«No sirvo para esto. No tengo fuerza de voluntad.»",
    desc: "Cae tu autoestima al piso. Crees que tu inacción se debe a un defecto en tu cerebro, tu genética o tu falta de carácter personal.",
    dopamine: 5,
    energy: 10,
    focus: 5,
    color: "text-red-700",
    glow: "hover:border-red-700/30",
    bgClass: "bg-red-700/10 border-red-700/20",
    colorHex: "#b91c1c",
    actionTip: "La fuerza de voluntad es biológicamente finita. El problema no eres tú; el problema es sostener un sistema que está roto de raíz.",
    iconName: "Skull"
  },
  {
    num: "06",
    label: "REINICIO",
    title: "🔄 FALSO NUEVO COMIENZO",
    quote: "«Comienzo el lunes sin falta.»",
    desc: "Esperas pasivamente que termine la semana, que llegue otro lunes, otro mes o ver otra frase motivadora para repetir el ciclo.",
    dopamine: 55,
    energy: 35,
    focus: 20,
    color: "text-zinc-400",
    glow: "hover:border-zinc-400/30",
    bgClass: "bg-zinc-500/10 border-zinc-500/20",
    colorHex: "#a1a1aa",
    actionTip: "Romper el ciclo requiere un Pacto de Hierro (explicado en el Tomo III) para desvincular tus emociones de tu ejecución diaria.",
    iconName: "RefreshCw"
  }
];

interface LandingPageProps {
  onTriggerCheckout: () => void;
}

export default function LandingPage({ onTriggerCheckout }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  // Real-time ticking urgent countdown timer (persists in state)
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 55 });

  // Custom live purchase notification state
  const [currentNotification, setCurrentNotification] = useState<{ name: string; city: string } | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Active state for mechanism comparison tab
  const [mecanismoTab, setMecanismoTab] = useState<"avg" | "system">("system");

  // Active state for transformation process hover index
  const [activeStage, setActiveStage] = useState<number | null>(null);

  // Active state for motivation comparison section
  const [motivationState, setMotivationState] = useState<"motivation" | "focus">("focus");

  // Selected stage for the interactive diagnostic timeline
  const [selectedTimelineStage, setSelectedTimelineStage] = useState(0);
  const [isPlayingSimulation, setIsPlayingSimulation] = useState(false);

  // Auto-play interval for the loop simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlayingSimulation) {
      interval = setInterval(() => {
        setSelectedTimelineStage((prev) => (prev + 1) % 6);
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingSimulation]);

  // Active filter for testimonials
  const [filtroTestimonio, setFiltroTestimonio] = useState<string>("todos");

  useEffect(() => {
    const names = [
      "Alejandro M.", "Carlos R.", "Diego L.", "Mateo H.", "Andrés C.", 
      "Santiago B.", "Daniel V.", "Juan D.", "Mateo G.", "Sebastián T.", 
      "Nicolás P.", "Javier R.", "Gabriel F.", "Lucas M.", "Adrián S."
    ];
    const cities = [
      "Bogotá", "Madrid", "Ciudad de México", "Buenos Aires", "Lima", 
      "Santiago", "Guayaquil", "San José", "Montevideo", "Caracas"
    ];

    const triggerNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setCurrentNotification({ name: randomName, city: randomCity });
      setShowNotification(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    };

    // Initial notification after 4 seconds
    const initialTimeout = setTimeout(triggerNotification, 4000);

    // Highlight notification repeat sequence to be exactly 13 seconds (13000ms)
    const interval = setInterval(triggerNotification, 13000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 14, seconds: 55 }; // Reset to maintain persistent illusion
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToCheckoutAction = () => {
    const element = document.getElementById("checkout-to-scroll");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="bg-black text-zinc-100 min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange selection:text-black">
      
      {/* Dynamic Urgency Topbar */}
      <div className="bg-brand-orange text-black py-2.5 px-4 text-center text-xs font-mono font-bold tracking-widest flex items-center justify-center space-x-2 relative z-30 shadow-md">
        <Flame className="h-4 w-4 text-black animate-pulse" />
        <span className="uppercase">OFERTA EXCLUSIVA DE ENTRADA • TERMINA EN:</span>
        <span className="bg-black text-brand-orange px-2 py-0.5 rounded ml-1 font-mono tracking-normal">
          {timeLeft.minutes.toString().padStart(2, "0")}:{timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </div>



      {/* ==========================================================
          SECCIÓN 1: HERO SECTION
          Objetivo psicológico: Capturar atención, generar identificación, crear curiosidad.
          ========================================================== */}
      <section className="relative pt-12 pb-24 px-6 md:px-12 bg-black overflow-hidden border-b border-zinc-900">
        
        {/* Subtle orange/gray radial glows representing particles & glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[126px] pointer-events-none" />
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-zinc-900/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
          
          {/* Centered Brand Logo */}
          <div className="flex flex-col items-center space-y-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="h-28 w-28 rounded-2xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-[0_0_50px_rgba(249,115,22,0.15)] relative overflow-hidden flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="https://i.imgur.com/0Md3eqi.jpg"
                alt="Focus Mindset White Eagle Logo"
                className="h-full w-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            

          </div>

          {/* Epic Main Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none max-w-5xl mx-auto uppercase">
            ¿OTRA VEZ EN EL PUNTO CERO? <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-500 to-yellow-500">
              DEJA LA MOTIVACIÓN, CONSTRUYE UN SISTEMA.
            </span>
          </h1>

          {/* Subheadline copy */}
          <p className="text-zinc-350 text-base md:text-xl max-w-4xl mx-auto leading-relaxed font-sans">
            La trilogía <strong className="text-white font-bold">"Sistema Focus Mindset"</strong> es la reingeniería definitiva de tus hábitos y disciplina para que ejecutes con frialdad matemática, incluso cuando no tengas ganas de levantarte de la cama.
          </p>

          {/* Support text generating curiosity and urgency */}
          <p className="text-zinc-500 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed italic">
            No es autoayuda barata ni positivismo vacío. Es un manual técnico de ejecución física y mental creado para hombres decididos a erradicar la inconsistencia para siempre por solo $9.99 USD.
          </p>

          {/* Massive Orange Primary CTA */}
          <div className="flex flex-col items-center space-y-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleScrollToCheckoutAction}
              className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-black px-10 py-5 rounded-xl font-display font-black tracking-widest text-sm uppercase transition-all shadow-[0_10px_40px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_50px_rgba(249,115,22,0.55)] cursor-pointer"
            >
              SÍ, QUIERO CONSTRUIR MI SISTEMA DE EJECUCIÓN
            </motion.button>
            
            {/* Microtext to eliminate fear */}
            <div className="flex items-center justify-center gap-1.5 text-zinc-500 text-[10px] sm:text-xs font-mono uppercase tracking-wider">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>PAGO ÚNICO DE $9.99 USD • DESCARGA INMEDIATA • GARANTÍA INCONDICIONAL DE 7 DÍAS</span>
            </div>
          </div>

          {/* Epic Professional Trilogy Mockup Image */}
          <div className="pt-10 relative">
            {/* Ambient gold glow behind the mockup to highlight the premium status */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-r from-brand-orange/15 to-amber-500/10 rounded-full blur-[100px] opacity-70 pointer-events-none" />
            
            <div className="relative rounded-3xl border-2 border-zinc-800 bg-zinc-950 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_45px_rgba(249,115,22,0.15)] max-w-3xl mx-auto overflow-hidden group hover:border-brand-orange/40 transition-all duration-500 z-10">
              {/* Premium glassy highlight sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none" />
              
              <div className="overflow-hidden rounded-2xl relative bg-zinc-900/40">
                <img
                  src="https://i.imgur.com/LMBjCiw.png"
                  alt="Focus Mindset Trilogy Mockup"
                  className="w-full h-auto object-cover rounded-2xl scale-[1.005] group-hover:scale-[1.03] transition-transform duration-700 ease-out contrast-[1.05] brightness-[1.05] saturate-[1.08]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Sticker price highlight */}
              <div className="absolute top-6 right-6 bg-black/95 border-2 border-brand-orange text-white py-3 px-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-mono text-center z-10 scale-100 group-hover:scale-[1.04] transition-transform duration-500">
                <span className="block text-zinc-600 line-through text-[9px] uppercase tracking-wider font-bold">VALOR GLOBAL: $84 USD</span>
                <span className="text-brand-orange font-black text-xl font-display tracking-tight">HOY: $9.99 USD</span>
                <span className="block text-[8px] text-emerald-400 font-bold uppercase mt-1 tracking-widest animate-pulse">¡SISTEMA COMPLETO!</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 2: AGITACIÓN DE DOLOR (ESPEJO FRÍO DE LA INCONSISTENCIA)
          Objetivo: Que el lector se sientan plenamente identificado y entienda el costo real de su situación
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-900 relative overflow-hidden">
        {/* Soft, ominous radial glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-red-950/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center space-y-5">
            <span className="text-red-500 font-mono text-xs font-black tracking-widest bg-red-500/10 px-3 py-1 rounded-md border border-red-500/25 inline-block">ESPEJO DE REALIDAD</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
              SABES EXACTAMENTE LO QUE TIENES QUE HACER. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-zinc-400">
                ¿POR QUÉ SIGUES EN EL MISMO LUGAR?
              </span>
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Mírate al espejo con total honestidad. Si te quitas las excusas cotidianas que le cuentas al resto del mundo, la realidad se reduce a una sola verdad incómoda.
            </p>
          </div>

          {/* Grid of the 6 core progressive symptoms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "01",
                title: "El ritual del scroll infinito al despertar",
                desc: "Te despiertas con la firme intención de hacer que hoy cuente. Pero tu mano va directamente al teléfono de manera mecánica. Consumes 45 minutos de dopamina barata antes de poner un pie en el suelo, y tu atención ya comienza el día totalmente secuestrada."
              },
              {
                id: "02",
                title: "El cementerio de proyectos a medias",
                desc: "Tienes carpetas llenas de ideas que iban a revolucionar tu vida, cursos comprados al 10% de avance y agendas impecables que solo tienen las primeras tres páginas escritas. Eres un experto absoluto en iniciar, pero un completo desconocido en terminar."
              },
              {
                id: "03",
                title: "El debate mental que te agota antes de actuar",
                desc: "Pasas hasta 2 horas en una negociación interna desgastante sobre si deberías estudiar, trabajar en tu negocio o ir al gimnasio. Cuando finalmente te decides a arrancar, estás tan exhausto de debatir contigo mismo que ya no tienes energía real para ejecutar."
              },
              {
                id: "04",
                title: "La fantasía reconfortante del \"mañana sí\"",
                desc: "Te convences de que el lunes, o el próximo mes, o cuando 'tengas más tiempo' empezarás de verdad. Sientes un alivio ficticio que químicamente es idéntico al logro real... pero que se destruye por completo en cuanto suena la primera alarma de la semana."
              },
              {
                id: "05",
                title: "La bofetada silenciosa de ver a otros avanzar",
                desc: "Observas a personas con la mitad de tu talento, menos ideas y capacidades inferiores lograr el éxito que tú mereces. La diferencia no está en su inteligencia; está en que ellos ejecutan de forma aburrida, fría y predecible, mientras tú sigues esperando 'sentirte listo'."
              },
              {
                id: "06",
                title: "La traición definitiva: Ya no confías en tu palabra",
                desc: "Este es el dolor más profundo y destructivo. Cuando te dices 'mañana voy a levantarme a las 6' o 'esta semana completaré esta tarea', una voz silenciosa dentro de ti se burla. Te has acostumbrado tanto a romper tus propias promesas que has perdido el respeto por ti mismo."
              }
            ].map((symptom) => (
              <div 
                key={symptom.id} 
                className="bg-zinc-950/75 border border-zinc-900 rounded-2xl p-6 hover:border-red-500/25 transition-all duration-300 text-left flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      SÍNTOMA {symptom.id}
                    </span>
                    <AlertTriangle className="h-4 w-4 text-red-500/40 group-hover:text-red-500 transition-colors" />
                  </div>
                  <h3 className="font-display font-black text-white text-sm sm:text-base uppercase tracking-tight leading-snug">
                    {symptom.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed font-sans group-hover:text-zinc-400 transition-colors">
                    {symptom.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Validation & Re-framing Closing Block */}
          <div className="bg-gradient-to-r from-zinc-950 via-zinc-900/40 to-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />
            
            <div className="space-y-4">
              <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest font-bold block">ENTIENDE ESTO DE UNA VEZ POR TODAS:</span>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans max-w-3xl mx-auto">
                No eres flojo, ni incapaz, ni te falta inteligencia. Tu único error ha sido intentar operar bajo un <strong className="text-white font-black">modelo biológicamente insostenible</strong>: depender de cómo te sientes para poder actuar. Es hora de dejar de luchar contra tu propio cerebro y empezar a gobernarlo con un sistema frío y predecible.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 3: DIAGNÓSTICO EMOCIONAL DEL CICLO DE INCONSISTENCIA (SIMULADOR DE BUCLE INTERACTIVO)
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-900 overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
              SIEMPRE EMPIEZAS FUERTE. <br/>
              <span className="text-brand-orange block mt-2">SIEMPRE TERMINAS EN EL MISMO LUGAR.</span>
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-3 pt-2">
              <p className="text-zinc-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest flex flex-wrap justify-center gap-x-4 gap-y-1">
                <span>No te falta inteligencia</span>
                <span className="text-zinc-800">•</span>
                <span>No te falta potencial</span>
                <span className="text-zinc-800">•</span>
                <span>No te falta información</span>
              </p>
              <p className="text-zinc-300 text-sm sm:text-base font-medium max-w-lg mx-auto">
                Te falta un sistema biológicamente viable que funcione de manera automática cuando la motivación desaparece de tu torrente sanguíneo.
              </p>
            </div>
          </div>

          {/* SIMULATOR HUB CARD */}
          <div className="bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative mt-8">
            
            {/* Absolute accent background glow */}
            <div 
              className="absolute -right-24 -top-24 w-80 h-80 rounded-full blur-[110px] pointer-events-none opacity-15 transition-all duration-700"
              style={{ backgroundColor: STAGES_DATA[selectedTimelineStage].colorHex }}
            />

            {/* Dashboard grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              
              {/* LEFT: Stage Track Selector (5-Cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Control Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900 pb-4">
                  <div>
                    <h3 className="font-display font-black text-white text-xs tracking-wider uppercase">SIMULADOR DE FASES</h3>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase">Haz clic en una etapa o inicia el análisis dinámico</p>
                  </div>
                  
                  {/* Play / Pause button */}
                  <button
                    onClick={() => setIsPlayingSimulation(!isPlayingSimulation)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                      isPlayingSimulation 
                        ? "bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25"
                    }`}
                  >
                    {isPlayingSimulation ? (
                      <>
                        <Pause className="h-3 w-3 shrink-0 animate-pulse text-red-400" />
                        <span>Detener</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 shrink-0 text-emerald-400" />
                        <span>Simular Bucle</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Vertical interactive track list */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
                  {STAGES_DATA.map((stage, idx) => {
                    const isSelected = selectedTimelineStage === idx;
                    const IconComp = (() => {
                      switch (stage.iconName) {
                        case "Flame": return Flame;
                        case "Zap": return Zap;
                        case "AlertTriangle": return AlertTriangle;
                        case "X": return X;
                        case "Skull": return Skull;
                        case "RefreshCw": return RefreshCw;
                        default: return Check;
                      }
                    })();

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedTimelineStage(idx);
                          setIsPlayingSimulation(false); // Pause auto-simulation on manual tap
                        }}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer group relative ${
                          isSelected 
                            ? "bg-zinc-950 border-zinc-800 shadow-[0_4px_15px_rgba(0,0,0,0.6)]" 
                            : "bg-zinc-950/20 border-zinc-900/60 " + stage.glow
                        }`}
                      >
                        {/* Selector marker */}
                        {isSelected && (
                          <motion.div 
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/4 bottom-1/4 w-0.75 bg-brand-orange rounded-r-full"
                          />
                        )}

                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                          isSelected ? "bg-zinc-900 text-white ring-1 ring-zinc-800" : "bg-black/30 text-zinc-650 group-hover:text-zinc-400"
                        }`}>
                          <IconComp className={`h-4.5 w-4.5 ${isSelected ? stage.color : "text-zinc-600"}`} />
                        </div>

                        <div className="min-w-0 flex-1 leading-tight">
                          <span className="text-[8px] font-mono font-bold block text-zinc-600">FASE {stage.num}</span>
                          <span className={`text-[10px] font-display font-extrabold uppercase tracking-wide truncate block ${
                            isSelected ? "text-white" : "text-zinc-500"
                          }`}>
                            {stage.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT: Real-time Telemetry Dashboard (7-Cols) */}
              <div className="lg:col-span-7 bg-zinc-950/90 border border-zinc-900 rounded-2xl p-5 sm:p-6 space-y-6">
                
                {/* Stage Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900/80 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        selectedTimelineStage >= 3 ? "bg-red-500" : "bg-emerald-500"
                      }`} />
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                        selectedTimelineStage >= 3 ? "bg-red-500" : "bg-emerald-500"
                      }`} />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-extrabold">Telemetría de Comportamiento</span>
                  </div>
                  
                  <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] font-black tracking-widest border ${STAGES_DATA[selectedTimelineStage].bgClass} ${STAGES_DATA[selectedTimelineStage].color}`}>
                    PROCESO DE AUTOSABOTAJE
                  </span>
                </div>

                {/* Animated Phase Content Section */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTimelineStage}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Stage Title and Quote */}
                    <div className="space-y-3">
                      <h4 className="text-xl font-display font-black text-white uppercase tracking-wide">
                        {STAGES_DATA[selectedTimelineStage].title}
                      </h4>
                      <p className="text-sm italic font-display font-light text-zinc-400 bg-zinc-900/20 border-l border-zinc-800 pl-3 py-1">
                        {STAGES_DATA[selectedTimelineStage].quote}
                      </p>
                    </div>

                    {/* Compact Punchy text */}
                    <p className="text-xs text-zinc-450 leading-relaxed font-sans">
                      {STAGES_DATA[selectedTimelineStage].desc}
                    </p>

                    {/* BIOCHEMICAL METRICS METERS */}
                    <div className="space-y-3 pt-2">
                      <h5 className="text-[9px] font-mono font-black text-zinc-550 uppercase tracking-widest">Niveles Bioquímicos de Ejecución</h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                        {/* Meter 1 */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                            <span>RESERVA DE DOPAMINA</span>
                            <span className="font-bold text-zinc-300">{STAGES_DATA[selectedTimelineStage].dopamine}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-900/60 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-350"
                              style={{ 
                                width: `${STAGES_DATA[selectedTimelineStage].dopamine}%`,
                                backgroundColor: STAGES_DATA[selectedTimelineStage].dopamine > 70 ? "#10b981" : STAGES_DATA[selectedTimelineStage].dopamine > 30 ? "#f59e0b" : "#ef4444" 
                              }}
                            />
                          </div>
                        </div>

                        {/* Meter 2 */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                            <span>ENERGÍA EJECUTIVA</span>
                            <span className="font-bold text-zinc-300">{STAGES_DATA[selectedTimelineStage].energy}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-900/60 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-350"
                              style={{ 
                                width: `${STAGES_DATA[selectedTimelineStage].energy}%`,
                                backgroundColor: STAGES_DATA[selectedTimelineStage].energy > 70 ? "#10b981" : STAGES_DATA[selectedTimelineStage].energy > 30 ? "#f59e0b" : "#ef4444" 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DIAGNOSTIC ESCAPE STATEMENT */}
                    <div className="p-3.5 bg-black/50 border border-zinc-900 rounded-xl space-y-1">
                      <span className="text-[8px] font-mono font-bold text-brand-orange uppercase block tracking-wider">EL RESCATE REQUERIDO:</span>
                      <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                        {STAGES_DATA[selectedTimelineStage].actionTip}
                      </p>
                    </div>

                  </motion.div>
                </AnimatePresence>
                
              </div>

            </div>
          </div>

          {/* COMPACT & AESTHETIC METRIC: THE REAL COST */}
          <div className="max-w-4xl mx-auto pt-6 text-center">
            <span className="text-[9px] font-mono font-black text-zinc-550 uppercase tracking-widest block mb-4">Consecuencia Acumulada</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "AUTOFÉ DEBILITADA", desc: "Cada promesa que te rompes a ti mismo deteriora tu autoconfianza profunda." },
                { title: "ANSIEDAD SILENCIOSA", desc: "La culpa mental constante de saber lo que debes hacer y postergarlo indefinidamente." },
                { title: "FRICCIÓN DE IDENTIDAD", desc: "Te acostumbras a vivir bajo tus capacidades reales y te adaptas al conformismo." }
              ].map((item, idx) => (
                <div key={idx} className="bg-zinc-950/40 border border-zinc-900/80 p-4 rounded-2xl text-center hover:border-zinc-800 transition-colors">
                  <h4 className="text-[11px] font-mono font-black text-red-500 uppercase tracking-wider mb-1">
                    [ {item.title} ]
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-sans leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Realization Transition Arrow */}
          <div className="text-center pt-8">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-brand-orange text-4xl sm:text-5xl font-black select-none pointer-events-none"
            >
              ↓
            </motion.div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 4: REENCUADRE COGNITIVO (EL PUNTO DE QUIEBRE)
          Objetivo: Que el lector deje de culparse, entienda la lógica científica/biológica y desee el sistema.
          ========================================================== */}
      <section id="reencuadre-cognitivo" className="py-28 px-6 md:px-12 bg-black border-b border-zinc-900 relative overflow-hidden">
        {/* Premium technical dot grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
        
        {/* Soft elegant orange spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-12 relative z-10 text-center">
          
          <div className="space-y-4">
            <span className="text-brand-orange font-mono text-xs font-black tracking-widest bg-brand-orange/10 px-3 py-1 rounded-md border border-brand-orange/25 inline-block uppercase">
              EL PUNTO DE QUIEBRE EN TU PRODUCTIVIDAD
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">
              LA FUERZA DE VOLUNTAD ES UN MITO BIOLÓGICO. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">
                EL PROBLEMA NUNCA FUE TU CARÁCTER.
              </span>
            </h2>
          </div>

          {/* Premium tactical-glassmorphic text container */}
          <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800/80 rounded-3xl p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-w-3xl mx-auto space-y-8 relative group hover:border-brand-orange/40 transition-all duration-500">
            
            {/* High-end Tactical Orange Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-brand-orange/60 rounded-tl-3xl pointer-events-none group-hover:border-brand-orange transition-colors duration-500" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-brand-orange/60 rounded-tr-3xl pointer-events-none group-hover:border-brand-orange transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-brand-orange/60 rounded-bl-3xl pointer-events-none group-hover:border-brand-orange transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-brand-orange/60 rounded-br-3xl pointer-events-none group-hover:border-brand-orange transition-colors duration-500" />



            <p className="text-zinc-200 text-sm sm:text-base md:text-lg leading-relaxed font-sans text-left relative z-10 pt-2">
              Tu cerebro está evolutivamente programado para ahorrar energía y buscar gratificación inmediata, no para sostener metas de largo plazo bajo emociones fluctuantes. Tratar de cambiar tu vida confiando en "cómo te sientes" cada mañana es como intentar cruzar el océano en un barco de papel. La inconsistencia que arrastras no es una falla de tu identidad ni una falta de coraje; es la consecuencia matemática exacta de operar sin reglas de ejecución predecibles.
            </p>

            {/* Scientific Breakdown: Mito vs Realidad */}
            <div className="border-t border-b border-zinc-900/90 py-8 my-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-left relative z-10">
              
              {/* Mito Container */}
              <div className="space-y-3 bg-zinc-950/60 p-6 rounded-2xl border-l-4 border-rose-500/80 border-t border-r border-b border-zinc-900/80 shadow-md hover:bg-zinc-900/20 transition-all">
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-widest block flex items-center gap-1.5">
                  <span className="text-rose-500">✖</span> EL MITO POPULAR (LA CULPA)
                </span>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  "No tengo suficiente autodisciplina. Procrastino porque soy perezoso, no tengo carácter, o simplemente no quiero mis objetivos con suficiente fuerza."
                </p>
                <div className="pt-2 border-t border-zinc-900/50">
                  <p className="text-xxs text-rose-400/80 italic font-mono uppercase tracking-wider">
                    → Consecuencia: Culpa, frustración y abandono.
                  </p>
                </div>
              </div>

              {/* Realidad Container */}
              <div className="space-y-3 bg-zinc-950/60 p-6 rounded-2xl border-l-4 border-emerald-500/80 border-t border-r border-b border-zinc-900/80 shadow-md hover:bg-brand-orange/[0.02] transition-all">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block flex items-center gap-1.5">
                  <span className="text-emerald-500">✔</span> LA REALIDAD BIOLÓGICA (EL SISTEMA)
                </span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  "Tu cerebro prefiere dopamina barata para preservar calorías. No puedes ganarle a la evolución con fuerza de voluntad; tienes que diseñar un hábitat que haga imposible fallar."
                </p>
                <div className="pt-2 border-t border-zinc-900/50">
                  <p className="text-xxs text-emerald-400 font-mono uppercase tracking-wider">
                    → Solución: Reglas de ejecución incondicional.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Key Feature indicator with subtle orange line */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3.5 text-left">
                <div className="h-11 w-11 rounded-xl bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20 shrink-0 shadow-inner group-hover:bg-brand-orange/20 transition-all duration-300">
                  <Key className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono block uppercase tracking-wider">LA CLAVE DE LA TRANSFORMACIÓN</span>
                  <span className="text-xs sm:text-sm text-white font-bold uppercase tracking-wider font-display">EL CONTROL ESTÁ EN TU ARQUITECTURA, NO EN TU ESFUERZO</span>
                </div>
              </div>
            </div>
            
          </div>

          <div className="max-w-3xl mx-auto pt-4">
            <p className="font-display font-black text-brand-orange text-lg sm:text-xl lg:text-2xl tracking-tight uppercase leading-snug">
              Para romper el ciclo no necesitas más motivación barata de dos minutos; necesitas sustituir tus impulsos por un sistema de ejecución frío y predecible.
            </p>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 5: PRESENTACIÓN DE LA TRILOGÍA
          Objetivo: Presentar detalladamente los libros (Tarjetas verticales, portada, resultados)
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-zinc-995 bg-black border-b border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="text-brand-orange font-mono text-xxs font-bold uppercase tracking-wider">EL SISTEMA INTEGRAL</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight">
              EL SISTEMA FOCUS MINDSET
            </h2>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto font-mono">
              La estrategia completa dividida en tres módulos de alta densidad conceptual y práctica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Libro 1 - MENTALIDAD */}
            <div className="bg-gradient-to-b from-zinc-950 to-black rounded-3xl border border-zinc-900 p-6 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.08)] group/card relative overflow-hidden">
              {/* Ambient top gold rim line on hover */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/0 to-transparent group-hover/card:via-brand-orange/40 transition-all duration-700" />
              
              <div>
                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-955 relative shadow-2xl mb-6 group/img">
                  {/* Realistic paper book shadow edge detail */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-black/60 via-black/10 to-transparent z-20" />
                  {/* Highlight sweep overlay reflex */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10 opacity-70 group-hover/card:opacity-45 transition-opacity duration-500" />
                  
                  <img
                    src="https://i.imgur.com/RkPt9az.png"
                    alt="Libro 1 MENTALIDAD Cover"
                    className="w-full h-full object-cover rounded-xl contrast-[1.05] brightness-[1.04] saturate-[1.05] transition-all duration-700 group-hover/card:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[9px] bg-brand-orange text-black font-mono font-black uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">VOLUMEN I</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-white text-xl uppercase tracking-wide">LIBRO 1 — MENTALIDAD</h3>
                <p className="text-brand-orange text-xs font-mono uppercase tracking-wider mt-1 block leading-snug font-bold">
                  La deconstrucción de la autolimitación y el fin de la dependencia de la motivación.
                </p>
                
                {/* Lo que vas a lograr (3 bullets concretos orientados a resultado) */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-3">
                  <span className="block text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-black">LO QUE VAS A LOGRAR:</span>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 shrink-0 select-none">✔</span>
                      <span><strong className="text-white">Identidad de Ejecutor:</strong> Define quién eres por lo que haces y no por cómo te sientes, desactivando el boicot mental antes de empezar.</span>
                    </div>
                    <div className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 shrink-0 select-none">✔</span>
                      <span><strong className="text-white">Soberanía Intelectual:</strong> Toma decisiones lógicas con frialdad científica cuando tu cerebro intente negociar con excusas baratas.</span>
                    </div>
                    <div className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 shrink-0 select-none">✔</span>
                      <span><strong className="text-white">Responsabilidad Radical:</strong> Adquiere el control absoluto de tus circunstancias eliminando la justificación externa de tus fracasos para siempre.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900 bg-zinc-900/10 p-4 rounded-xl text-center">
                <p className="text-zinc-400 text-xs italic leading-normal">
                  "La mente no se motiva; se gobierna."
                </p>
              </div>
            </div>

            {/* Libro 2 - HÁBITOS */}
            <div className="bg-gradient-to-b from-zinc-950 to-black rounded-3xl border border-zinc-900 p-6 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.08)] group/card relative overflow-hidden">
              {/* Ambient top gold rim line on hover */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/0 to-transparent group-hover/card:via-brand-orange/40 transition-all duration-700" />
              
              <div>
                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-955 relative shadow-2xl mb-6 group/img">
                  {/* Realistic paper book shadow edge detail */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-black/60 via-black/10 to-transparent z-20" />
                  {/* Highlight sweep overlay reflex */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10 opacity-70 group-hover/card:opacity-45 transition-opacity duration-500" />
                  
                  <img
                    src="https://i.imgur.com/VKwisSL.png"
                    alt="Libro 2 HÁBITOS Cover"
                    className="w-full h-full object-cover rounded-xl contrast-[1.05] brightness-[1.04] saturate-[1.05] transition-all duration-700 group-hover/card:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[9px] bg-brand-orange text-black font-mono font-black uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">VOLUMEN II</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-white text-xl uppercase tracking-wide">LIBRO 2 — HÁBITOS</h3>
                <p className="text-brand-orange text-xs font-mono uppercase tracking-wider mt-1 block leading-snug font-bold">
                  La ingeniería del comportamiento automático para diseñar un día a prueba de fallas.
                </p>
                
                {/* Lo que vas a lograr (3 bullets concretos orientados a resultado) */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-3">
                  <span className="block text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-black">LO QUE VAS A LOGRAR:</span>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 shrink-0 select-none">✔</span>
                      <span><strong className="text-white">Arquitectura de Entorno:</strong> Estructura un entorno físico y digital que haga imposible procrastinar, convirtiendo el trabajo enfocado en el camino de menor esfuerzo.</span>
                    </div>
                    <div className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 shrink-0 select-none">✔</span>
                      <span><strong className="text-white">Anclaje Automático:</strong> Transforma micro-acciones difíciles en hábitos automáticos e inconscientes que no consuman tu energía mental de reserva.</span>
                    </div>
                    <div className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 shrink-0 select-none">✔</span>
                      <span><strong className="text-white">Cierre de Fugas Dopamínicas:</strong> Desmantela el circuito de recompensa que te ancla al scroll infinito y la gratificación instantánea.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900 bg-zinc-900/10 p-4 rounded-xl text-center">
                <p className="text-zinc-400 text-xs italic leading-normal">
                  "No te elevas al nivel de tus metas; caes al nivel de tus sistemas."
                </p>
              </div>
            </div>

            {/* Libro 3 - DISCIPLINA */}
            <div className="bg-gradient-to-b from-zinc-950 to-black rounded-3xl border border-zinc-900 p-6 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.08)] group/card relative overflow-hidden">
              {/* Ambient top gold rim line on hover */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/0 to-transparent group-hover/card:via-brand-orange/40 transition-all duration-700" />
              
              <div>
                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-955 relative shadow-2xl mb-6 group/img">
                  {/* Realistic paper book shadow edge detail */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-black/60 via-black/10 to-transparent z-20" />
                  {/* Highlight sweep overlay reflex */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10 opacity-70 group-hover/card:opacity-45 transition-opacity duration-500" />
                  
                  <img
                    src="https://i.imgur.com/L8lqbYG.png"
                    alt="Libro 3 DISCIPLINA Cover"
                    className="w-full h-full object-cover rounded-xl contrast-[1.05] brightness-[1.04] saturate-[1.05] transition-all duration-700 group-hover/card:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[9px] bg-brand-orange text-black font-mono font-black uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider">VOLUMEN III</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-white text-xl uppercase tracking-wide">LIBRO 3 — DISCIPLINA</h3>
                <p className="text-brand-orange text-xs font-mono uppercase tracking-wider mt-1 block leading-snug font-bold">
                  La ciencia de la consistencia incondicional para ejecutar sin importar tu estado de ánimo.
                </p>
                
                {/* Lo que vas a lograr (3 bullets concretos orientados a resultado) */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-3">
                  <span className="block text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-black">LO QUE VAS A LOGRAR:</span>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 shrink-0 select-none">✔</span>
                      <span><strong className="text-white">Blindaje Emocional:</strong> Cumple tus compromisos diarios incluso si te sientes cansado, deprimido o bajo una intensa tormenta emocional.</span>
                    </div>
                    <div className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 shrink-0 select-none">✔</span>
                      <span><strong className="text-white">Autocontrol Extremo:</strong> Fortalece el músculo de resistencia mental necesario para tolerar la incomodidad física y la tentación del abandono.</span>
                    </div>
                    <div className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed">
                      <span className="text-emerald-400 shrink-0 select-none">✔</span>
                      <span><strong className="text-white">Cumplimiento de Palabra:</strong> Recupera el respeto absoluto por tus propias promesas de una vez por todas.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900 bg-zinc-900/10 p-4 rounded-xl text-center">
                <p className="text-zinc-400 text-xs italic leading-normal">
                  "La disciplina es el puente inquebrantable entre la intención y el imperio."
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 6: BONOS (REDISEÑADA EN VERDE - 100% GRATIS)
          Objetivo: Presentar bonos incluidos sin costo extra con tonalidades verdes y mockup visual
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center space-y-6">
            <span className="text-emerald-400 font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-block animate-pulse">
              🎁 ACCESO EXCLUSIVO TOTALMENTE GRATUITO
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              BONOS DE ALTO VALOR <span className="text-emerald-400 block sm:inline">INCLUIDOS SIN COSTO</span>
            </h2>
            <p className="text-zinc-500 text-sm max-w-xl mx-auto leading-relaxed">
              Acelera drásticamente tu transformación e implementa cada concepto de inmediato con recursos de acción rápida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Bono 1 */}
            <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 flex flex-col justify-between space-y-5 shadow-2xl hover:border-emerald-500/30 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)] transition-all duration-300 overflow-hidden group">
              <span className="absolute top-4 right-4 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-black py-1 px-3 rounded-full uppercase tracking-wider z-20 shadow-sm">
                100% GRATIS
              </span>

              <div className="space-y-4">
                {/* Product Mockup Image */}
                <div className="w-full h-56 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 relative flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/30 shadow-inner group-hover:scale-[1.01]">
                  <img
                    src="https://i.imgur.com/qBKDGgq.png"
                    alt="Mapa mental Focus Mindset"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glassy overlay showing details */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm border-t border-zinc-900 p-2.5 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">MAPA INTEGRAL DE EJECUCIÓN</span>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-black uppercase">DIAGRAMA HD</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-emerald-500/80 font-mono text-[10px] font-bold block uppercase tracking-widest">• RECURSO ACCIÓN 01 •</span>
                  <h4 className="font-display text-white font-extrabold text-lg uppercase tracking-wide group-hover:text-emerald-400 transition-colors">Mapa Mental de Activación Inmediata</h4>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed font-sans min-h-[60px]">
                  El mapa visual completo de la trilogía estructurado para desactivar las excusas mentales en menos de 60 segundos ante cualquier síntoma de procrastinación o bloqueo del entorno.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900/80 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500 line-through">Valor: $19.00 USD</span>
                <span className="text-emerald-400 font-black tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/15">INCLUIDO GRATIS</span>
              </div>
            </div>

            {/* Bono 2 */}
            <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 flex flex-col justify-between space-y-5 shadow-2xl hover:border-emerald-500/30 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)] transition-all duration-300 overflow-hidden group">
              <span className="absolute top-4 right-4 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-black py-1 px-3 rounded-full uppercase tracking-wider z-20 shadow-sm">
                100% GRATIS
              </span>

              <div className="space-y-4">
                {/* Product Mockup Image */}
                <div className="w-full h-56 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 relative flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/30 shadow-inner group-hover:scale-[1.01]">
                  <img
                    src="https://i.imgur.com/DBJlEUw.png"
                    alt="Audio Resumen Completo"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glassy overlay showing details */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm border-t border-zinc-900 p-2.5 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">VERSION AUDIO HQ MP3</span>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-black uppercase">AUDIOBOOK</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-emerald-500/80 font-mono text-[10px] font-bold block uppercase tracking-widest">• RECURSO ACCIÓN 02 •</span>
                  <h4 className="font-display text-white font-extrabold text-lg uppercase tracking-wide group-hover:text-emerald-400 transition-colors">Audiolibro: El Manifiesto del Ejecutor</h4>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed font-sans min-h-[60px]">
                  La versión en audio de alta fidelidad para reprogramar tu autopercepción y absorber los principios lógicos del sistema incondicional mientras entrenas, conduces o caminas.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900/80 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500 line-through">Valor: $29.00 USD</span>
                <span className="text-emerald-400 font-black tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/15">INCLUIDO GRATIS</span>
              </div>
            </div>

            {/* Bono 3 */}
            <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 flex flex-col justify-between space-y-5 shadow-2xl hover:border-emerald-500/30 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)] transition-all duration-300 overflow-hidden group">
              <span className="absolute top-4 right-4 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-black py-1 px-3 rounded-full uppercase tracking-wider z-20 shadow-sm">
                100% GRATIS
              </span>

              <div className="space-y-4">
                {/* Product Mockup Image */}
                <div className="w-full h-56 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 relative flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/30 shadow-inner group-hover:scale-[1.01]">
                  <img
                    src="https://i.imgur.com/ovWIEkx.png"
                    alt="Guía de Implementación 30 Días"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glassy overlay showing details */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm border-t border-zinc-900 p-2.5 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">PROTOCOLOS DE SEGUIMIENTO 30D</span>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-black uppercase">POCKET WORKBOOK</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-emerald-500/80 font-mono text-[10px] font-bold block uppercase tracking-widest">• RECURSO ACCIÓN 03 •</span>
                  <h4 className="font-display text-white font-extrabold text-lg uppercase tracking-wide group-hover:text-emerald-400 transition-colors">Protocolo de Implementación Rápida (30 Días)</h4>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed font-sans min-h-[60px]">
                  El manual táctico diario con el plan exacto para instalar un pilar de hábitos y disciplina al día sin desgastar tu fuerza de voluntad ni negociar contigo mismo.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900/80 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500 line-through">Valor: $37.00 USD</span>
                <span className="text-emerald-400 font-black tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/15">INCLUIDO GRATIS</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 7: SISTEMA INTERACTIVO DE GANANCIA Y RECONSTRUCCIÓN
          Objetivo: Mostrar la impresionante ganancia de no depender de la motivación y completar Focus Mindset
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-900 overflow-hidden relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-650/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center space-y-4">
            <span className="text-brand-orange font-mono text-xs font-black tracking-widest bg-brand-orange/10 px-3 py-1 rounded-md border border-brand-orange/20 inline-block">SISTEMA INCONDICIONAL</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">
              LO QUE CAMBIA AL COMPLETAR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">EL SISTEMA FOCUS MINDSET</span>
            </h2>
            <p className="text-zinc-450 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              La motivación es una emoción impredecible y fisiológicamente inestable. Al completar esta trilogía construyes una estructura de ejecución fría que te blinda por completo contra tus propios estados de ánimo.
            </p>
          </div>

          {/* Interactive Toggle Switch */}
          <div className="flex justify-center">
            <div className="bg-zinc-950 p-1 rounded-2xl border border-zinc-900 flex max-w-md w-full relative">
              <button
                onClick={() => setMotivationState("motivation")}
                className={`flex-1 py-3 text-center rounded-xl font-mono text-[10px] font-black uppercase tracking-wider transition-all duration-350 cursor-pointer relative z-10 ${
                  motivationState === "motivation" ? "text-red-400" : "text-zinc-550 hover:text-zinc-300"
                }`}
              >
                🔴 DEPENDENS DE MOTIVACIÓN
              </button>
              <button
                onClick={() => setMotivationState("focus")}
                className={`flex-1 py-3 text-center rounded-xl font-mono text-[10px] font-black uppercase tracking-wider transition-all duration-350 cursor-pointer relative z-10 ${
                  motivationState === "focus" ? "text-brand-orange" : "text-zinc-550 hover:text-zinc-300"
                }`}
              >
                🔥 SISTEMA COMPLETADO
              </button>

              {/* Background pill selector */}
              <motion.div
                className="absolute top-1 bottom-1 rounded-xl bg-zinc-900 border border-zinc-850 shadow-inner"
                layoutId="motivationTogglePill"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                style={{
                  left: motivationState === "motivation" ? "4px" : "calc(50% - 2px)",
                  right: motivationState === "motivation" ? "calc(50% - 2px)" : "4px"
                }}
              />
            </div>
          </div>

          {/* Dynamic Comparison Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Left side: Interactive Stats and Visual Gauge */}
            <div className="md:col-span-5 bg-zinc-950/60 border border-zinc-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-black">Métrica de Rendimiento Humano</span>
                  <span className="text-[9px] font-mono font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-850 text-zinc-400">LECTURA EN VIVO</span>
                </div>

                <AnimatePresence mode="wait">
                  {motivationState === "motivation" ? (
                    <motion.div
                      key="gauge-motivation"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="text-center py-4 relative">
                        <div className="text-5xl font-display font-black text-red-500 uppercase tracking-tight">15%</div>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold mt-1 block">EFECTIVIDAD DE ACCIÓN</span>
                        {/* Static indicator bar */}
                        <div className="w-24 h-1 bg-red-950 mx-auto mt-3 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 w-[15%]" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-[9px] font-mono text-zinc-550 uppercase">
                          <span>Estabilidad Neuronal</span>
                          <span className="text-red-400 font-extrabold">Inestable</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-red-650 w-[20%]" />
                        </div>

                        <div className="flex justify-between text-[9px] font-mono text-zinc-550 uppercase">
                          <span>Horas Recuperadas / Día</span>
                          <span className="text-red-400 font-extrabold">0 Horas</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-red-650 w-[5%]" />
                        </div>

                        <div className="flex justify-between text-[9px] font-mono text-zinc-550 uppercase">
                          <span>Fuerza de Resistencia Psíquica</span>
                          <span className="text-red-400 font-extrabold">Mínima</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-red-650 w-[12%]" />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="gauge-focus"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div className="text-center py-4 relative">
                        {/* Pulse effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-brand-orange/5 rounded-full blur-xl animate-pulse" />
                        <div className="text-5xl font-display font-black text-brand-orange uppercase tracking-tight relative z-10">95%</div>
                        <span className="text-[9px] font-mono text-brand-orange uppercase tracking-widest font-black mt-1 block relative z-10">EFECTIVIDAD DE ACCIÓN</span>
                        {/* Animated gradient bar */}
                        <div className="w-24 h-1 bg-zinc-900 mx-auto mt-3 rounded-full overflow-hidden relative z-10">
                          <div className="h-full bg-gradient-to-r from-brand-orange to-yellow-500 w-full" />
                        </div>
                      </div>

                      <div className="space-y-3 relative z-10">
                        <div className="flex justify-between text-[9px] font-mono text-zinc-450 uppercase">
                          <span>Estabilidad Neuronal</span>
                          <span className="text-emerald-400 font-extrabold">Piloto Automático</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[95%]" />
                        </div>

                        <div className="flex justify-between text-[9px] font-mono text-zinc-450 uppercase">
                          <span>Horas Recuperadas / Día</span>
                          <span className="text-emerald-400 font-extrabold">+3 Horas Netas</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[88%]" />
                        </div>

                        <div className="flex justify-between text-[9px] font-mono text-zinc-450 uppercase">
                          <span>Fuerza de Resistencia Psíquica</span>
                          <span className="text-emerald-400 font-extrabold">Barrera Impermeable</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[98%]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-zinc-900/80 pt-4 mt-6">
                <p className="text-[10px] text-zinc-500 font-mono text-center uppercase tracking-wide">
                  {motivationState === "motivation" 
                    ? "⚠️ Al depender de estados emocionales, tu cerebro sabotea la acción diaria en cuanto se desvanece la dopamina." 
                    : "⚡ Al automatizar el hábitat con el Sistema Focus, tu disciplina se vuelve tu estado por defecto."
                  }
                </p>
              </div>
            </div>

            {/* Right side: Splitted dynamic comparison parameters */}
            <div className="md:col-span-7 flex flex-col justify-between spacing-y-4">
              <AnimatePresence mode="wait">
                {motivationState === "motivation" ? (
                  <motion.div
                    key="content-motivation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 gap-4"
                  >
                    {[
                      {
                        title: "1. Ejecución Bajo Emociones",
                        desc: "Solo trabajas intensamente cuando te sientes inspirado. Esto genera un ciclo de fatiga insoportable: picos breves seguidos de semanas abandonado en la inacción profunda.",
                        impact: "Resignación total e inconsistencia perpetua."
                      },
                      {
                        title: "2. Fricción del Inicio Devastadora",
                        desc: "Tu cerebro debate silenciosamente 'si tiene ganas' de arrancar cada racha de estudio o trabajo. En este debate, las ganas de procrastinar ganan el 85% de las veces.",
                        impact: "Horas perdidas mirando la pantalla sin hacer nada."
                      },
                      {
                        title: "3. Hábitat Permeable al Scroll",
                        desc: "Tu entorno está gobernado por notificaciones y distracciones continuas. Tu fuerza de voluntad prefrontal lucha contra algoritmos diseñados por ingenieros de Silicon Valley.",
                        impact: "Tu cerebro se funde y agota antes de dar el primer paso."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 hover:border-red-500/20 transition-all duration-300 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-red-500 text-xs">✕</span>
                          <h4 className="font-display font-bold text-zinc-200 text-xs sm:text-sm uppercase tracking-wide">{item.title}</h4>
                        </div>
                        <p className="text-zinc-500 text-xs leading-relaxed font-sans">{item.desc}</p>
                        <div className="mt-3 pt-2.5 border-t border-zinc-900/60 flex items-center gap-2">
                          <span className="text-[10px] font-mono text-red-500/80 font-black tracking-wider uppercase bg-red-500/5 px-2 py-0.5 rounded border border-red-500/10">CONSECUENCIA:</span>
                          <span className="text-zinc-400 font-sans text-xs italic">{item.impact}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="content-focus"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 gap-4"
                  >
                    {[
                      {
                        title: "1. Ejecución Incondicional (Tomo I)",
                        desc: "Adquieres claridad radical e inmutable sobre tu dirección. Des programamos el victimismo biológico para que tu cerebro opere mecánicamente, independientemente de tus ganas hoy.",
                        impact: "Haces lo que dijiste que ibas a hacer."
                      },
                      {
                        title: "2. Fricción Cero e Inversa (Tomo II)",
                        desc: "Reestructuramos físicamente tu háditat para que ejecutar un bloque de estudio o trabajo requiera menos esfuerzo que encender las redes. Tu productividad entra en piloto automático.",
                        impact: "Eliminas la procrastinación en menos de 5 segundos."
                      },
                      {
                        title: "3. Disciplina Blindada Ultra-Enfocada (Tomo III)",
                        desc: "Sustentado por el Pacto de Hierro unilateral, desarmas el saboteo emocional diario. Mantienes un entorno blindado que opera como un escudo invisible contra emergencias o distracciones.",
                        impact: "Soberanía total de tu enfoque y respeto propio."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-zinc-950 border border-zinc-900 rounded-2xl p-5 hover:border-emerald-550/30 transition-all duration-300 text-left relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-emerald-400 text-sm font-bold">✓</span>
                          <h4 className="font-display font-black text-white text-xs sm:text-sm uppercase tracking-wide">{item.title}</h4>
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed font-sans">{item.desc}</p>
                        <div className="mt-3 pt-2.5 border-t border-zinc-900/60 flex items-center gap-2">
                          <span className="text-[10px] font-mono text-emerald-400 font-black tracking-wider uppercase bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/20">LO QUE GANAS:</span>
                          <span className="text-emerald-400 font-sans text-xs font-bold">{item.impact}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Tangible Reward Grid - What you actually receive and achieve */}
          <div className="bg-gradient-to-r from-zinc-950 via-zinc-900/40 to-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />
            
            <h3 className="font-display font-extrabold text-white text-lg sm:text-xl uppercase tracking-wider mb-2">
              EL RETORNO DE INVERSIÓN: LO QUE CONSIGUES AL COMPLETAR LA TRILOGÍA
            </h3>
            <p className="text-zinc-500 text-xs max-w-2xl mx-auto mb-6">
              Esta obra no está diseñada para acumular polvo en tu estantería. Está creada para inyectar un cambio fisiológico y mecánico inmediato en tu día a día.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "+3 HORAS AL DÍA", subtitle: "Soberanía del Tiempo", desc: "Al automatizar la rutina del Tomo II y reducir tus tiempos muertos de procrastinación inconsciente, recuperas un promedio de 15 a 20 horas netas por semana." },
                { title: "98% DE ASOCIACIÓN AL PLAN", subtitle: "Predecibilidad de Metas", desc: "Nunca más te irás a dormir sintiendo la culpa de haber tenido un día vacío. Sigues tu cronograma diario con precisión quirúrgica gracias al Pacto de Hierro." },
                { title: "ALTA AUTORIDAD PERSONAL", subtitle: "Soberanía Emocional", desc: "El fin definitivo del autoboicot. Desarrollas un carácter inquebrantable basado en cumplir incondicionalmente la promesa que te hiciste a ti mismo." }
              ].map((reward, i) => (
                <div key={i} className="bg-black/60 p-4 rounded-xl border border-zinc-900/70 text-left space-y-1.5 hover:border-emerald-500/20 transition-all">
                  <span className="text-emerald-400 font-mono text-xs font-black uppercase tracking-wider block">{reward.title}</span>
                  <span className="text-white font-display font-bold text-xs uppercase tracking-tight block">{reward.subtitle}</span>
                  <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">{reward.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 8: TESTIMONIOS
          Objetivo: Mostrar testimoniales reales filtrables con estética ultra-premium y humana
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-brand-orange font-mono text-xxs font-bold uppercase tracking-wider">COMUNIDAD IMPLACABLE</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight">
              RESULTADOS DE NUESTRA COMUNIDAD
            </h2>
            <p className="text-zinc-500 text-sm max-w-xl mx-auto">
              Descubra la experiencia real de profesionales y estudiantes que hackearon su procrastinación con la saga.
            </p>
          </div>

          {/* Social Proof Trust Dashboard */}
          <div className="bg-zinc-950/40 border border-zinc-900/80 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-5 text-center sm:text-left max-w-4xl mx-auto backdrop-blur-sm shadow-xl">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex text-amber-500">
                <Star className="h-4.5 w-4.5 fill-current text-brand-orange" />
                <Star className="h-4.5 w-4.5 fill-current text-brand-orange" />
                <Star className="h-4.5 w-4.5 fill-current text-brand-orange" />
                <Star className="h-4.5 w-4.5 fill-current text-brand-orange" />
                <Star className="h-4.5 w-4.5 fill-current text-brand-orange" />
              </div>
              <div>
                <div className="text-white text-xs font-black tracking-wide font-display uppercase">4.9 / 5 Calificación Promedio</div>
                <div className="text-[10px] text-zinc-500 font-mono uppercase">Rebotes auditados e importados de Hotmart Marketplace</div>
              </div>
            </div>
            
            <div className="hidden sm:block h-8 w-px bg-zinc-800" />
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs font-mono">
              <div className="text-center sm:text-left">
                <span className="text-zinc-500 block text-[9px] uppercase">Garantía</span>
                <span className="text-emerald-400 font-bold">7 DÍAS TOTAL</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-zinc-500 block text-[9px] uppercase">Lectores Activos</span>
                <span className="text-white font-bold">1,240+ HOY</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-zinc-500 block text-[9px] uppercase">Fuente</span>
                <span className="text-brand-orange font-bold">ALUMNOS REALES</span>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto pt-2">
            {[
              { id: "todos", label: "Todos los comentarios", count: TESTIMONIALS.length },
              { id: "mindset", label: "Tomo I", count: TESTIMONIALS.filter(t => t.category === "mindset").length },
              { id: "habits", label: "Tomo II", count: TESTIMONIALS.filter(t => t.category === "habits").length },
              { id: "discipline", label: "Tomo III", count: TESTIMONIALS.filter(t => t.category === "discipline").length },
              { id: "practico", label: "Casos & TDAH", count: TESTIMONIALS.filter(t => t.category === "productivity" || t.category === "general").length }
            ].map((chip) => {
              const active = filtroTestimonio === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setFiltroTestimonio(chip.id)}
                  className={`px-3 py-1.5 rounded-xl text-xxs font-bold transition-all duration-300 border flex items-center gap-1.5 cursor-pointer ${
                    active 
                      ? "bg-brand-orange text-black border-brand-orange font-mono shadow-[0_0_15px_rgba(235,94,40,0.15)] font-black" 
                      : "bg-zinc-950/60 text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-white"
                  }`}
                >
                  <span>{chip.label}</span>
                  <span className={`px-1.5 py-0.5 text-[8px] rounded-full font-mono ${
                    active ? "bg-black/20 text-black font-extrabold" : "bg-zinc-900 text-zinc-550"
                  }`}>
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Testimonial Cards Layout (Filtered with dynamic visual layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            <AnimatePresence mode="popLayout">
              {TESTIMONIALS.filter((test) => {
                if (filtroTestimonio === "todos") return true;
                if (filtroTestimonio === "practico") return test.category === "productivity" || test.category === "general";
                return test.category === filtroTestimonio;
              }).map((test) => {
                // Get human-friendly category label and layout styling
                let catLabel = "Saga Fundamental";
                let catColor = "text-zinc-500 border-zinc-900/60 bg-zinc-900/10";
                if (test.category === "mindset") {
                  catLabel = "Tomo I: Mentalidad";
                  catColor = "text-sky-400 border-sky-500/10 bg-sky-500/5";
                } else if (test.category === "habits") {
                  catLabel = "Tomo II: Hábitos";
                  catColor = "text-emerald-400 border-emerald-500/10 bg-emerald-500/5";
                } else if (test.category === "discipline") {
                  catLabel = "Tomo III: Disciplina";
                  catColor = "text-rose-400 border-rose-500/10 bg-rose-500/5";
                } else if (test.category === "productivity") {
                  catLabel = "Eficiencia Dopamínica";
                  catColor = "text-amber-400 border-amber-500/10 bg-amber-500/5";
                } else if (test.category === "general") {
                  catLabel = "Implementación Total";
                  catColor = "text-violet-400 border-violet-500/10 bg-violet-500/5";
                }

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    key={test.id}
                    className="bg-zinc-950/70 rounded-2xl border border-zinc-900 p-6 flex flex-col justify-between hover:border-zinc-800/80 hover:bg-zinc-950 transition-all duration-300 min-h-[310px] relative overflow-hidden group shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                  >
                    {/* Watermark quote symbol */}
                    <span className="absolute -top-3 -right-2 text-[100px] font-serif text-zinc-900/10 select-none pointer-events-none group-hover:text-zinc-900/15 transition-colors">
                      “
                    </span>

                    <div className="space-y-4 relative z-10">
                      {/* Card Header Info */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={test.avatarUrl}
                            alt={test.name}
                            className="h-10 w-10 rounded-full object-cover border-2 border-zinc-900 shadow-md group-hover:border-zinc-800 transition-colors"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <h4 className="text-xs font-extrabold text-white font-display leading-none">{test.name}</h4>
                              {test.verified && (
                                <span title="Compra Verificada" className="text-[9px] text-emerald-400 bg-emerald-500/10 rounded-full inline-flex items-center justify-center h-3.5 w-3.5 font-bold leading-none select-none">
                                  ✓
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-zinc-500 font-mono leading-tight">{test.role}</p>
                            
                            {/* Location & Status Badges */}
                            <div className="flex items-center gap-1.5 mt-1">
                              {test.location && (
                                <span className="inline-flex items-center gap-0.5 text-zinc-500 text-[8px] font-mono whitespace-nowrap">
                                  <MapPin className="h-2 w-2 text-zinc-650" />
                                  {test.location}
                                </span>
                              )}
                              <span className="inline-flex items-center px-1 py-0.5 text-[7px] font-mono font-bold tracking-wider bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/10 uppercase select-none">
                                Alumno Verificado
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[8px] font-mono text-zinc-650 whitespace-nowrap bg-zinc-900/30 px-1.5 py-0.5 rounded select-none">{test.date}</span>
                      </div>

                      {/* Score stars */}
                      <div className="flex text-orange-500 space-x-0.5">
                        {Array.from({ length: test.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current text-brand-orange" />
                        ))}
                      </div>

                      {/* Content excerpt with natural pacing */}
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans font-light">
                        "{test.content}"
                      </p>
                    </div>

                    {/* Footer specifying study material */}
                    <div className="pt-3.5 mt-4 border-t border-zinc-900 flex items-center justify-between text-[9px] font-mono uppercase relative z-10 select-none">
                      <span className="text-zinc-550">VOLUMEN CLAVE:</span>
                      <span className={`px-2 py-0.5 font-bold rounded-lg border ${catColor}`}>
                        {catLabel}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Comunidad y Calificación visual debajo de los testimonios */}
          <div className="pt-12 border-t border-zinc-900/60 text-center space-y-4 max-w-2xl mx-auto">
            <p className="text-zinc-400 text-sm leading-relaxed font-sans">
              Únete a <strong className="text-white">más de 1,240 personas</strong> que ya han reconfigurado sus patrones mentales, destruido la procrastinación y tomado el control absoluto de sus vidas con esta trilogía.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-zinc-950/80 border border-zinc-900 px-6 py-3 rounded-2xl shadow-xl">
              <div className="flex text-brand-orange space-x-1">
                <Star className="h-4 w-4 fill-current text-brand-orange" />
                <Star className="h-4 w-4 fill-current text-brand-orange" />
                <Star className="h-4 w-4 fill-current text-brand-orange" />
                <Star className="h-4 w-4 fill-current text-brand-orange" />
                <Star className="h-4 w-4 fill-current text-brand-orange" />
              </div>
              <span className="text-xs font-mono text-zinc-400">
                <strong className="text-white">★★★★★ 4.9/5</strong> basado en más de <strong className="text-white">384 reseñas de alumnos reales</strong>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 9: LA DECISIÓN DE IDENTIDAD (CIERRE EMOCIONAL)
          Objetivo: Ofrecer el cierre masivo, contundente y enfocado en quién quiere ser el lector
          ========================================================== */}
      <section className="py-24 px-6 bg-black text-center relative overflow-hidden border-b border-zinc-950">
        
        {/* Subtle orange/gray radial glows at footer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_rgba(249,115,22,0.06))] pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-12 relative z-10">
          
          <div className="flex justify-center">
            {/* Centered logo icon of white-eagle */}
            <div className="h-20 w-20 rounded-2xl border border-zinc-850 bg-zinc-950 p-1 flex items-center justify-center shadow-lg">
              <img
                src="https://i.imgur.com/0Md3eqi.jpg"
                alt="Focus Mindset Logo Final"
                className="h-full w-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <span className="text-zinc-600 font-mono text-xs font-bold uppercase tracking-widest">LA DECISIÓN FINAL</span>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight uppercase font-display max-w-4xl mx-auto">
            ¿VAS A SEGUIR NEGOCIANDO CONTIGO MISMO O VAS A CONVERTIRTE EN EL HOMBRE QUE CUMPLE SU PALABRA?
          </h2>

          <div className="max-w-2xl mx-auto">
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
              Hay un momento donde tienes que dejar de buscar trucos de productividad y mirarte al espejo. La persona que quieres ser no procrastina, no inventa excusas brillantes cuando está cansada y no depende de si amaneció con ánimos para ponerse a trabajar. Ese hombre simplemente ejecuta porque es lo que hace. El Sistema Focus Mindset no es un curso que vas a memorizar; es la decisión activa de enterrar tu antigua versión indisciplinada hoy mismo.
            </p>
          </div>

          <div className="pt-4 flex flex-col items-center space-y-6">
            <button
              onClick={handleScrollToCheckoutAction}
              className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-black px-12 py-5 rounded-xl font-display font-black tracking-widest text-sm uppercase transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.5)] cursor-pointer"
            >
              ASUMO EL COMPROMISO: EMPEZAR AHORA
            </button>

            <span className="text-xxs sm:text-xs text-zinc-500 font-mono uppercase tracking-wider">
              Acceso instantáneo para siempre por $9.99 USD • Protegido por nuestra garantía incondicional de 30 días
            </span>

            {/* Absolute security details */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-zinc-500 uppercase tracking-wider bg-zinc-950/80 border border-zinc-900/40 p-3 px-6 rounded-xl">
              <span className="flex items-center gap-1.5 font-bold text-zinc-400">
                <Shield className="h-4 w-4 text-emerald-500" /> Pago Seguro
              </span>
              <span className="flex items-center gap-1.5 font-bold text-zinc-400">
                <CheckCircle className="h-4 w-4 text-brand-orange" /> Acceso Inmediato
              </span>
              <span className="flex items-center gap-1.5 font-bold text-zinc-400">
                <Award className="h-4 w-4 text-brand-orange" /> Garantía Hotmart
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 10: STACK DE VALOR Y PRECIO
          Objetivo: Estructura impecable de valor percibido vs descuento irresistible
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-950">
        <div className="max-w-3xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.9)] space-y-10 relative overflow-hidden">
          
          {/* Top light glow representer */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
          
          <div className="text-center space-y-2">
            <span className="text-brand-orange font-mono text-xs font-bold uppercase tracking-wider">EL PRECIO DE LA INDECISIÓN ES MUCHO MAYOR</span>
            <h2 className="font-display text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase leading-tight">
              CONSTRUYE UN SISTEMA DE EJECUCIÓN INQUEBRANTABLE
            </h2>
            <p className="text-zinc-500 text-sm font-sans max-w-xl mx-auto">
              Suma todo el valor de las herramientas de alto rendimiento que vas a recibir hoy por una fracción de su costo real de desarrollo.
            </p>
          </div>

          {/* Table representing absolute real values */}
          <div className="space-y-4 font-mono text-xs sm:text-sm text-zinc-400">
            
            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-white flex items-center gap-2">
                <span className="text-brand-orange">✔</span> Libro I: Mentalidad — El Despertar del Soberano Interno
              </span>
              <span className="text-zinc-500 font-bold">$27.00 USD</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-white flex items-center gap-2">
                <span className="text-brand-orange">✔</span> Libro II: Hábitos — Ingeniería del Comportamiento Automático
              </span>
              <span className="text-zinc-500 font-bold">$27.00 USD</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-white flex items-center gap-2">
                <span className="text-brand-orange">✔</span> Libro III: Disciplina — Consistencia Incondicional sin Excusas
              </span>
              <span className="text-zinc-500 font-bold">$27.00 USD</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-emerald-400 flex items-center gap-2">
                <span className="text-emerald-500">✚</span> Bono 1: Mapa Mental de Activación Inmediata (HD)
              </span>
              <span className="text-zinc-500 font-bold">$19.00 USD</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-emerald-400 flex items-center gap-2">
                <span className="text-emerald-500">✚</span> Bono 2: Audiolibro Completo — El Manifiesto del Ejecutor
              </span>
              <span className="text-zinc-500 font-bold">$29.00 USD</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-emerald-400 flex items-center gap-2">
                <span className="text-emerald-500">✚</span> Bono 3: Protocolo de Implementación Rápida (30 Días)
              </span>
              <span className="text-zinc-500 font-bold">$17.00 USD</span>
            </div>

          </div>

          {/* Pricing final section */}
          <div className="pt-6 border-t border-zinc-850 text-center space-y-6">
            <span className="text-zinc-500 text-sm block uppercase font-mono tracking-widest">
              Valor total: <span className="line-through text-zinc-400 font-bold">$146.00 USD</span> — Hoy lo conseguís por:
            </span>
            
            <div className="flex flex-col items-center">
              <span className="text-6xl sm:text-7xl font-black font-display text-brand-orange tracking-tight antialiased drop-shadow-[0_4px_24px_rgba(249,115,22,0.15)]">
                $9.99 USD
              </span>
              
              <div className="max-w-lg mx-auto pt-3 pb-5">
                <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
                  No reducimos este precio para liquidar el sistema, sino para remover cualquier barrera económica. Si $9.99 USD te parecen costosos para reprogramar tu disciplina para siempre, tu principal problema no es el dinero.
                </p>
              </div>
              
              {/* Premium checkout button directly below the reduced price */}
              <div id="checkout-to-scroll" className="w-full max-w-md pb-4 flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open("https://pay.hotmart.com/P106317868U", "_blank", "noopener,noreferrer")}
                  className="w-full bg-brand-orange hover:bg-orange-600 text-black py-4 px-8 rounded-xl font-display font-black tracking-widest text-xs sm:text-sm uppercase transition-all shadow-[0_10px_35px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_45px_rgba(249,115,22,0.55)] cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>DESBLOQUEAR SISTEMA FOCUS MINDSET</span>
                  <ArrowRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Secure Payment Methods Image */}
                <div className="mt-4 w-full max-w-[340px] opacity-80 hover:opacity-100 transition-opacity">
                  <img
                    src="https://i.imgur.com/ThbziAr.png"
                    alt="Métodos de pago aceptados"
                    className="w-full h-auto object-contain select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* 30-Day Guarantee Copy */}
              <div className="pt-6 border-t border-zinc-900 w-full max-w-xl space-y-3">
                <p className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-widest">
                  🛡️ GARANTÍA INCONDICIONAL DE 30 DÍAS
                </p>
              </div>

              {/* Hotmart Satisfaction Guarantee badge */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <img
                  src="https://i.imgur.com/l7BL98b.png"
                  alt="Garantía Hotmart"
                  className="w-24 h-auto object-contain select-none"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider max-w-sm">
                  Venta procesada y garantizada por <span className="text-brand-orange font-bold">Hotmart</span>
                </p>
              </div>

              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-4">
                Un solo pago seguro • Acceso ilimitado permanente sin mensualidades
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          FOOTER LEGAL Y DE CONTROL DE MARCA
          ========================================================== */}
      <footer className="py-20 px-6 bg-black text-center relative overflow-hidden z-10 border-t border-zinc-950">
        <div className="relative z-10 max-w-4xl mx-auto text-[10px] font-mono text-zinc-600 space-y-4">
          <p>© 2026 FOCUS MINDSET. TODOS LOS DERECHOS RESERVADOS. EL ORDEN ES PODER ABSOLUTO.</p>
          <p className="text-zinc-500 font-medium tracking-wide uppercase text-[11px] select-none pt-2">
            "La mente no se motiva; se gobierna. El orden es poder."
          </p>
          <p className="max-w-2xl mx-auto opacity-50 select-none">
            Descargo de responsabilidad: Las marcas Hotmart es de su respectivo dueño. Ninguno de estos infoproductos interactivos constituye asesoramiento médico. La simulación interactiva forma parte del entorno de validación pedagógica segura de Google AI Studio.
          </p>
        </div>
      </footer>

      {/* Real-time Purchase notification toast (dynamic floating component) */}
      <AnimatePresence>
        {showNotification && currentNotification && (
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="fixed bottom-6 left-6 z-50 max-w-xs w-[calc(100%-3rem)] bg-zinc-950/95 backdrop-blur border border-zinc-800 rounded-xl p-3 px-4 shadow-[0_10px_30px_rgb(0,0,0,0.8)] flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
              <img 
                src="https://i.imgur.com/v2KtC5h.jpg" 
                alt="Focus Mindset User Logo" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Acceso desbloqueado</span>
                <span className="text-[8px] font-mono text-brand-orange shrink-0 font-medium">Hace instante</span>
              </div>
              <p className="text-xs text-white font-semibold font-sans mt-0.5 truncate">
                {currentNotification.name} <span className="text-zinc-500 font-normal">({currentNotification.city})</span>
              </p>
              <p className="text-[10px] text-zinc-400 font-sans mt-0.5 truncate">
                Desbloqueó el Sistema Focus Mindset
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
