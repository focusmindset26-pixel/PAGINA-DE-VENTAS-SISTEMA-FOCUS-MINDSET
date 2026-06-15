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
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-normal max-w-5xl mx-auto uppercase">
            SI LLEVAS AÑOS INTENTANDO CAMBIAR TU VIDA Y <span className="text-brand-orange underline decoration-orange-500/30">SIEMPRE TERMINAS VOLVIENDO</span> AL MISMO LUGAR, ESTE SISTEMA FUE CREADO PARA TI.
          </h1>

          {/* Subheadline copy */}
          <p className="text-zinc-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-sans">
            Desarrolla la mentalidad, los hábitos y la disciplina que necesitas para convertirte en alguien que ejecuta de manera implacable, incluso cuando no tiene ganas.
          </p>

          {/* Massive Orange Primary CTA */}
          <div className="flex flex-col items-center space-y-5 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleScrollToCheckoutAction}
              className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-black px-10 py-5 rounded-xl font-display font-black tracking-widest text-sm uppercase transition-all shadow-[0_10px_40px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_50px_rgba(249,115,22,0.55)] cursor-pointer"
            >
              QUIERO CONVERTIRME EN MI MEJOR VERSIÓN
            </motion.button>
          </div>

          {/* Epic Professional Trilogy Mockup Image */}
          <div className="pt-10">
            <div className="relative rounded-3xl border border-zinc-900 bg-zinc-950 p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-w-3xl mx-auto overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none" />
              <img
                src="https://i.imgur.com/LMBjCiw.png"
                alt="Focus Mindset Trilogy Mockup"
                className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.01] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Sticker price highlight */}
              <div className="absolute top-5 right-5 bg-black/95 border border-brand-orange text-white py-3 px-4 rounded-2xl shadow-2xl font-mono text-center">
                <span className="block text-zinc-600 line-through text-[10px]">VALOR: $84 USD</span>
                <span className="text-brand-orange font-bold text-lg font-display">HOY: $9.99 USD</span>
              </div>
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

          {/* Realization Title */}
          <div className="text-center pt-8 space-y-8">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-brand-orange text-4xl sm:text-5xl font-black select-none pointer-events-none"
            >
              ↓
            </motion.div>
            
            <div className="space-y-4 max-w-3xl mx-auto px-4">
              <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-tight text-white uppercase leading-tight">
                EL PROBLEMA NO ES TU FUERZA DE VOLUNTAD.
              </h3>
              <p className="font-display font-black text-brand-orange text-xl sm:text-2xl lg:text-3xl tracking-tight uppercase leading-tight">
                ES QUE NUNCA TE ENSEÑARON A CONSTRUIR UN SISTEMA.
              </p>
            </div>

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
            <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 flex flex-col justify-between hover:border-brand-orange/30 transition-all duration-300">
              <div>
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden border border-zinc-900 bg-zinc-900 relative shadow-xl mb-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img
                    src="https://i.imgur.com/RkPt9az.png"
                    alt="Libro 1 MENTALIDAD Cover"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[9px] bg-brand-orange text-black font-mono font-bold uppercase px-2 py-0.5 rounded">VOLUMEN I</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-white text-2xl tracking-wide">LIBRO 1: MENTALIDAD</h3>
                <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-widest mt-1 block leading-normal">
                  Cómo construir una mente que ejecuta incluso cuando no tiene ganas
                </p>
                
                <div className="space-y-4 mt-4 text-xs text-zinc-400 font-sans leading-relaxed">
                  <p>
                    La mayoría de las personas cree que sus resultados dependen de las circunstancias.
                  </p>
                  <p>
                    La realidad es que todo comienza mucho antes. <strong className="text-white">Comienza en la mente.</strong>
                  </p>
                  <p>
                    Este libro está diseñado para ayudarte a eliminar las creencias, excusas y patrones mentales que te mantienen atrapado en el mismo lugar año tras año.
                  </p>
                  <p>
                    Aprenderás por qué la motivación es una de las herramientas más sobrevaloradas del desarrollo personal, cómo desarrollar responsabilidad absoluta sobre tu vida y cómo construir una identidad basada en la acción y la ejecución.
                  </p>
                </div>

                {/* El dolor que ataca */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-2">
                  <span className="block text-[10px] font-mono text-rose-400/80 uppercase tracking-widest font-black">El dolor que ataca:</span>
                  <div className="grid grid-cols-1 gap-1.5 pl-1.5">
                    {[
                      "Falta de confianza",
                      "Victimismo",
                      "Pensamientos limitantes",
                      "Dependencia de la motivación",
                      "Falta de dirección",
                      "Falta de claridad"
                    ].map((idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xxs text-zinc-400">
                        <span className="text-rose-500 font-mono">•</span>
                        <span>{idx}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lo que representa */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-1">
                  <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Lo que representa:</span>
                  <p className="text-zinc-300 text-xs font-medium">La reconstrucción de tu forma de pensar.</p>
                </div>

                {/* Lo que aprenderás */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-2">
                  <span className="block text-[10px] font-mono text-emerald-400/90 uppercase tracking-widest font-black">Lo que aprenderás:</span>
                  <div className="space-y-1.5 pl-1">
                    {[
                      "Cómo piensan las personas disciplinadas",
                      "Cómo desarrollar una mentalidad de ejecución",
                      "Cómo asumir responsabilidad total",
                      "Cómo fortalecer tu confianza personal",
                      "Cómo construir una identidad poderosa"
                    ].map((item) => (
                      <div key={item} className="flex items-start space-x-2 text-xs text-zinc-300">
                        <span className="text-emerald-400 shrink-0 select-none">✔</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900 bg-zinc-900/10 p-4 rounded-xl space-y-2">
                <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Resultado final:</span>
                <p className="text-brand-orange text-xs font-bold font-display uppercase tracking-wide">
                  Pensar como una persona que ejecuta.
                </p>
                <p className="text-zinc-400 text-xxs leading-normal">
                  Ya no actuarás según cómo te sientas. Comenzarás a actuar según quién has decidido convertirte.
                </p>
              </div>
            </div>

            {/* Libro 2 - HÁBITOS */}
            <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 flex flex-col justify-between hover:border-brand-orange/30 transition-all duration-300">
              <div>
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden border border-zinc-900 bg-zinc-900 relative shadow-xl mb-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img
                    src="https://i.imgur.com/VKwisSL.png"
                    alt="Libro 2 HÁBITOS Cover"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[9px] bg-brand-orange text-black font-mono font-bold uppercase px-2 py-0.5 rounded">VOLUMEN II</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-white text-2xl tracking-wide">LIBRO 2: HÁBITOS</h3>
                <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-widest mt-1 block leading-normal">
                  El sistema para construir una vida productiva sin depender de la fuerza de voluntad
                </p>
                
                <div className="space-y-4 mt-4 text-xs text-zinc-400 font-sans leading-relaxed">
                  <p>
                    Saber qué hacer no cambia tu vida.
                  </p>
                  <p>
                    <strong className="text-white">Lo que cambia tu vida es lo que haces todos los días.</strong>
                  </p>
                  <p>
                    Este libro te enseña cómo transformar acciones aisladas en comportamientos automáticos que trabajen a tu favor.
                  </p>
                  <p>
                    Descubrirás por qué la mayoría de los hábitos fracasan, cómo diseñar sistemas sostenibles, cómo eliminar distracciones y cómo crear rutinas capaces de generar resultados reales a largo plazo.
                  </p>
                  <p className="italic text-zinc-500">
                    Porque el éxito no depende de una gran decisión. Depende de miles de pequeñas decisiones repetidas correctamente.
                  </p>
                </div>

                {/* El dolor que ataca */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-2">
                  <span className="block text-[10px] font-mono text-rose-400/80 uppercase tracking-widest font-black">El dolor que ataca:</span>
                  <div className="grid grid-cols-1 gap-1.5 pl-1.5">
                    {[
                      "Procrastinación",
                      "Desorganización",
                      "Distracciones constantes",
                      "Mala gestión del tiempo",
                      "Falta de enfoque",
                      "Inconsistencia"
                    ].map((idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xxs text-zinc-400">
                        <span className="text-rose-500 font-mono">•</span>
                        <span>{idx}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lo que representa */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-1">
                  <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Lo que representa:</span>
                  <p className="text-zinc-300 text-xs font-medium">La construcción de sistemas que funcionan incluso cuando no tienes ganas.</p>
                </div>

                {/* Lo que aprenderás */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-2">
                  <span className="block text-[10px] font-mono text-emerald-400/90 uppercase tracking-widest font-black">Lo que aprenderás:</span>
                  <div className="space-y-1.5 pl-1">
                    {[
                      "Cómo crear hábitos duraderos",
                      "Cómo eliminar hábitos destructivos",
                      "Cómo diseñar rutinas efectivas",
                      "Cómo aumentar tu productividad",
                      "Cómo construir sistemas de éxito personal"
                    ].map((item) => (
                      <div key={item} className="flex items-start space-x-2 text-xs text-zinc-300">
                        <span className="text-emerald-400 shrink-0 select-none">✔</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900 bg-zinc-900/10 p-4 rounded-xl space-y-2">
                <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Resultado final:</span>
                <p className="text-brand-orange text-xs font-bold font-display uppercase tracking-wide">
                  Automatizar comportamientos ganadores.
                </p>
                <p className="text-zinc-400 text-xxs leading-normal">
                  Dejarás de depender de la motivación para actuar y comenzarás a avanzar mediante sistemas diseñados para el progreso constante.
                </p>
              </div>
            </div>

            {/* Libro 3 - DISCIPLINA */}
            <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 flex flex-col justify-between hover:border-brand-orange/30 transition-all duration-300">
              <div>
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden border border-zinc-900 bg-zinc-900 relative shadow-xl mb-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img
                    src="https://i.imgur.com/L8lqbYG.png"
                    alt="Libro 3 DISCIPLINA Cover"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[9px] bg-brand-orange text-black font-mono font-bold uppercase px-2 py-0.5 rounded">VOLUMEN III</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-white text-2xl tracking-wide">LIBRO 3: DISCIPLINA</h3>
                <p className="text-zinc-500 text-[9px] font-mono uppercase tracking-widest mt-1 block leading-normal">
                  El sistema para actuar incluso cuando no tienes motivación.
                </p>
                
                <div className="space-y-4 mt-4 text-xs text-zinc-400 font-sans leading-relaxed">
                  <p>
                    La disciplina es el factor que separa a quienes sueñan de quienes construyen.
                  </p>
                  <p>
                    La mayoría de las personas tiene objetivos.
                  </p>
                  <p>
                    <strong className="text-white">Pocas tienen la capacidad de mantenerse firmes cuando aparece el cansancio, la incomodidad o la dificultad.</strong>
                  </p>
                  <p>
                    Este libro te enseñará cómo desarrollar autocontrol, vencer la procrastinación, fortalecer tu carácter y convertirte en una persona que cumple su palabra independientemente de las circunstancias.
                  </p>
                  <p className="italic text-zinc-500">
                    Aquí aprenderás que la disciplina no es un talento. Es una identidad.
                  </p>
                </div>

                {/* El dolor que ataca */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-2">
                  <span className="block text-[10px] font-mono text-rose-400/80 uppercase tracking-widest font-black">El dolor que ataca:</span>
                  <div className="grid grid-cols-1 gap-1.5 pl-1.5">
                    {[
                      "Abandono constante de objetivos",
                      "Pereza",
                      "Falta de consistencia",
                      "Falta de autocontrol",
                      "Excusas permanentes",
                      "Incapacidad para sostener hábitos"
                    ].map((idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xxs text-zinc-400">
                        <span className="text-rose-500 font-mono">•</span>
                        <span>{idx}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lo que representa */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-1">
                  <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Lo que representa:</span>
                  <p className="text-zinc-300 text-xs font-medium">La transformación definitiva de intención en ejecución.</p>
                </div>

                {/* Lo que aprenderás */}
                <div className="pt-4 mt-4 border-t border-zinc-900 space-y-2">
                  <span className="block text-[10px] font-mono text-emerald-400/90 uppercase tracking-widest font-black">Lo que aprenderás:</span>
                  <div className="space-y-1.5 pl-1">
                    {[
                      "Cómo desarrollar disciplina real",
                      "Cómo eliminar excusas",
                      "Cómo vencer la procrastinación",
                      "Cómo fortalecer el autocontrol",
                      "Cómo mantener la consistencia a largo plazo",
                      "Cómo convertir la ejecución en tu estándar personal"
                    ].map((item) => (
                      <div key={item} className="flex items-start space-x-2 text-xs text-zinc-300">
                        <span className="text-emerald-400 shrink-0 select-none">✔</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900 bg-zinc-900/10 p-4 rounded-xl space-y-2">
                <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Resultado final:</span>
                <p className="text-brand-orange text-xs font-bold font-display uppercase tracking-wide">
                  Convertirte en alguien que hace lo que dice que hará.
                </p>
                <div className="text-zinc-400 text-xxs leading-normal space-y-1">
                  <p>• No dependerás de la motivación.</p>
                  <p>• No dependerás de las emociones.</p>
                  <p>• No dependerás de las circunstancias.</p>
                  <p className="font-medium text-zinc-300 pt-1">
                    Te convertirás en una persona capaz de ejecutar de forma consistente durante años.
                  </p>
                </div>
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
                    <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">MAPA MENTAL INTERACTIVO</span>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-black uppercase">DESCARGABLE</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-emerald-500/80 font-mono text-[10px] font-bold block uppercase tracking-widest">• RECURSO 01 •</span>
                  <h4 className="font-display text-white font-extrabold text-lg uppercase tracking-wide group-hover:text-emerald-400 transition-colors">Mapa Mental Focus Mindset</h4>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed font-sans min-h-[60px]">
                  La estructura lógica e interconectada en una sola página. Ten una guía clara de desactivación mental lista en cualquier contratiempo o distracción cotidiana.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900/80 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500 line-through">Valor: $9.00 USD</span>
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
                    <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">VERSION AUDIO MP3 HQ</span>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-black uppercase">AUDIOBOOK</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-emerald-500/80 font-mono text-[10px] font-bold block uppercase tracking-widest">• RECURSO 02 •</span>
                  <h4 className="font-display text-white font-extrabold text-lg uppercase tracking-wide group-hover:text-emerald-400 transition-colors">Audio Resumen Completo</h4>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed font-sans min-h-[60px]">
                  Escucha los principios fundamentales del soberano interno y la desactivación física del cansancio mientras entrenas o caminas en piloto automático.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900/80 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500 line-through">Valor: $9.00 USD</span>
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
                    <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">CALENDARIO ESTRATÉGICO 30D</span>
                    <span className="text-[9px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-black uppercase">WORKBOOK</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-emerald-500/80 font-mono text-[10px] font-bold block uppercase tracking-widest">• RECURSO 03 •</span>
                  <h4 className="font-display text-white font-extrabold text-lg uppercase tracking-wide group-hover:text-emerald-400 transition-colors">Guía de Implementación 30 Días</h4>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed font-sans min-h-[60px]">
                  El manual estratégico de micro-acciones que te guiará paso a paso para aplicar un pilar táctico diario sin fatigar tu autodisciplina.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-900/80 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500 line-through">Valor: $9.00 USD</span>
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

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 9: STACK DE VALOR
          Objetivo: Estructura impecable de valor percibido vs descuento irresistible
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-zinc-995 bg-black border-b border-zinc-950">
        <div className="max-w-3xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.9)] space-y-10 relative overflow-hidden">
          
          {/* Top light glow representer */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
          
          <div className="text-center space-y-2">
            <span className="text-brand-orange font-mono text-xxs font-bold uppercase tracking-wider">RESUMEN INTEGRAL DE LA PROPUESTA</span>
            <h2 className="font-display text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase">
              TODO EL SISTEMA DE VALOR PERCIBIDO
            </h2>
            <p className="text-zinc-500 text-xs font-mono">
              La oferta más completa de transformación conductual libre de riesgos.
            </p>
          </div>

          {/* Table representing absolute real values */}
          <div className="space-y-4 font-mono text-xs sm:text-sm text-zinc-400">
            
            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-white">✓ Libro 1: Mentalidad</span>
              <span className="text-zinc-500">$19.00 USD</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-white">✓ Libro 2: Hábitos</span>
              <span className="text-zinc-500">$19.00 USD</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-white">✓ Libro 3: Disciplina</span>
              <span className="text-zinc-500">$19.00 USD</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                Bono 1: Mapa Mental Focus Mindset
              </span>
              <span className="text-emerald-400 font-black text-xs font-mono uppercase tracking-wider bg-emerald-950/40 border border-emerald-500/10 px-1.5 py-0.5 rounded">GRATIS</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                Bono 2: Audio Resumen Completo
              </span>
              <span className="text-emerald-400 font-black text-xs font-mono uppercase tracking-wider bg-emerald-950/40 border border-emerald-500/10 px-1.5 py-0.5 rounded">GRATIS</span>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                Bono 3: Guía de Implementación 30 Días
              </span>
              <span className="text-emerald-400 font-black text-xs font-mono uppercase tracking-wider bg-emerald-950/40 border border-emerald-500/10 px-1.5 py-0.5 rounded">GRATIS</span>
            </div>

          </div>

          {/* Pricing final section */}
          <div className="pt-6 border-t border-zinc-800 text-center space-y-4">
            <span className="text-zinc-500 text-xs block uppercase font-mono tracking-widest">
              VALOR TOTAL CALCULADO: <strong className="line-through text-zinc-650">$84.00 USD</strong>
            </span>
            <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest">PRECIO REDUCIDO HOY:</span>
            
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-black font-display text-brand-orange tracking-tight antialiased">
                $9.99 USD
              </span>
              
              {/* Premium checkout button directly below the reduced price */}
              <div id="checkout-to-scroll" className="w-full max-w-md pt-5 pb-3 flex flex-col items-center">
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

              {/* Hotmart Satisfaction Guarantee */}
              <div className="mt-3 mb-4 flex flex-col items-center gap-2">
                <img
                  src="https://i.imgur.com/l7BL98b.png"
                  alt="Garantía Hotmart"
                  className="w-24 h-auto object-contain select-none"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider max-w-sm">
                  Venta procesada y garantizada por <span className="text-brand-orange font-bold">Hotmart</span>
                </p>
              </div>

              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-1">
                Un solo pago seguro • Acceso ilimitado permanente sin mensualidades
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 10: CTA FINAL
          Objetivo: Ofrecer el cierre masivo, contundente y con los logos correctos
          ========================================================== */}
      <section className="py-24 px-6 bg-black text-center relative overflow-hidden">
        
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

          <span className="text-zinc-600 font-mono text-xs font-bold uppercase tracking-widest">CIERRE DEL CURSO</span>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight uppercase font-display max-w-2xl mx-auto">
            NO NECESITAS MÁS MOTIVACIÓN.
          </h2>

          <p className="font-display text-brand-orange font-bold text-lg sm:text-2xl tracking-tight max-w-2xl mx-auto uppercase leading-snug">
            NECESITAS CONVERTIRTE EN LA PERSONA QUE ACTÚA INCLUSO CUANDO NO TIENE GANAS.
          </p>

          <div className="pt-4 flex flex-col items-center space-y-6">
            <button
              onClick={handleScrollToCheckoutAction}
              className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-black px-12 py-5 rounded-xl font-display font-black tracking-widest text-sm uppercase transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.5)] cursor-pointer"
            >
              OBTENER ACCESO INMEDIATO
            </button>

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

        {/* Dynamic Legal and disclaimer footer */}
        <div className="relative z-10 pt-16 mt-20 border-t border-zinc-900/60 max-w-4xl mx-auto text-[10px] font-mono text-zinc-600 space-y-4">
          <p>© 2026 FOCUS MINDSET. TODOS LOS DERECHOS RESERVADOS. EL ORDEN ES PODER ABSOLUTO.</p>
          <p className="max-w-2xl mx-auto opacity-50 select-none">
            Descargo de responsabilidad: Las marcas Hotmart es de su respectivo dueño. Ninguno de estos infoproductos interactivos constituye asesoramiento médico. La simulación interactiva forma parte del entorno de validación pedagógica segura de Google AI Studio.
          </p>
        </div>
      </section>

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
