import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, Check, ArrowRight, Clock, Star, Flame, ChevronDown, CheckCircle, 
  BookOpen, HelpCircle, Lock, Award, Eye, UserCheck, Key, Sparkles, Zap,
  X, AlertTriangle, RefreshCw, Skull
} from "lucide-react";
import { TESTIMONIALS, FAQS } from "../data";

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

  // Selected stage for the interactive diagnostic timeline
  const [selectedTimelineStage, setSelectedTimelineStage] = useState(0);

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
          SECCIÓN 3: DIAGNÓSTICO EMOCIONAL DEL CICLO DE INCONSISTENCIA
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-900">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="text-center space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6.5xl font-black text-white uppercase tracking-tight leading-tight">
              SIEMPRE EMPIEZAS FUERTE. <br/>
              <span className="text-brand-orange block mt-2">SIEMPRE TERMINAS EN EL MISMO LUGAR.</span>
            </h2>
            <div className="max-w-2xl mx-auto space-y-3 pt-2">
              <p className="text-zinc-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest flex flex-wrap justify-center gap-x-4 gap-y-1">
                <span>No te falta inteligencia.</span>
                <span className="text-zinc-800">•</span>
                <span>No te falta potencial.</span>
                <span className="text-zinc-800">•</span>
                <span>No te falta información.</span>
              </p>
              <p className="text-zinc-300 text-sm sm:text-lg font-medium leading-relaxed max-w-xl mx-auto pt-2">
                Te falta un sistema que funcione cuando la motivación desaparece.
              </p>
            </div>
          </div>

          {/* Interactive Visual Timeline */}
          <div className="space-y-10">
            {/* Timeline track nodes */}
            <div className="relative">
              {/* Connector line behind */}
              <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-zinc-90 w-[calc(100%-2rem)] -translate-y-1/2 z-0 hidden md:block" />
              
              {/* Dynamic glowing active bar segment */}
              <div 
                className="absolute top-1/2 left-4 h-0.5 bg-brand-orange -translate-y-1/2 z-0 transition-all duration-500 hidden md:block" 
                style={{
                  width: `${(selectedTimelineStage / 5) * 85}%`,
                  backgroundImage: "linear-gradient(to right, #f97316, #d97706)"
                }}
              />

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10">
                {[
                  { label: "MOTIVACIÓN", num: "01", icon: Flame, color: "text-orange-500", glow: "hover:border-orange-500/40" },
                  { label: "ACCIÓN INTENSA", num: "02", icon: Zap, color: "text-yellow-400", glow: "hover:border-yellow-400/40" },
                  { label: "REALIDAD", num: "03", icon: AlertTriangle, color: "text-amber-600", glow: "hover:border-amber-600/40" },
                  { label: "ABANDONO", num: "04", icon: X, color: "text-red-500", glow: "hover:border-red-500/40" },
                  { label: "FRUSTRACIÓN", num: "05", icon: Skull, color: "text-red-700", glow: "hover:border-red-700/40" },
                  { label: "REINICIO", num: "06", icon: RefreshCw, color: "text-zinc-500", glow: "hover:border-zinc-500/40" }
                ].map((step, idx) => {
                  const IconComponent = step.icon;
                  const isSelected = selectedTimelineStage === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTimelineStage(idx)}
                      className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 text-center cursor-pointer group ${
                        isSelected 
                          ? "bg-zinc-950 border-zinc-700/80 shadow-[0_4px_25px_rgba(255,255,255,0.03)]" 
                          : "bg-zinc-950/40 border-zinc-900/60 " + step.glow
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected 
                          ? "bg-zinc-900 scale-110 ring-2 ring-brand-orange" 
                          : "bg-zinc-950 border border-zinc-900 group-hover:scale-105"
                      }`}>
                        <IconComponent className={`h-5 w-5 ${isSelected ? step.color : "text-zinc-500 group-hover:text-zinc-300"}`} />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 mt-3 uppercase tracking-wider block font-bold">ETAPA {step.num}</span>
                      <span className={`text-[11px] font-display font-medium uppercase tracking-tight mt-1 transition-colors ${
                        isSelected ? "text-white font-black" : "text-zinc-400"
                      }`}>{step.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Diagnostic Details Screen */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 min-h-[160px] relative overflow-hidden transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              {/* Dynamic soft background glow */}
              <div 
                className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20 transition-all duration-700"
                style={{
                  backgroundColor: 
                    selectedTimelineStage === 0 ? "#f97316" :
                    selectedTimelineStage === 1 ? "#eab308" :
                    selectedTimelineStage === 2 ? "#d97706" :
                    selectedTimelineStage === 3 ? "#ef4444" :
                    selectedTimelineStage === 4 ? "#b91c1c" : "#71717a"
                }}
              />

              <AnimatePresence mode="wait">
                {selectedTimelineStage === 0 && (
                  <motion.div
                    key="stage-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                      <span className="text-orange-500 font-mono text-xs uppercase tracking-widest font-black">ETAPA 1</span>
                      <h3 className="text-xl font-display font-black text-white tracking-wide uppercase">🔥 MOTIVACIÓN</h3>
                    </div>
                    <div className="border-l-2 border-orange-500/20 pl-4 py-1">
                      <p className="text-xl sm:text-2xl font-display italic font-light text-zinc-300">
                        "Esta vez sí voy a cambiar."
                      </p>
                    </div>
                  </motion.div>
                )}

                {selectedTimelineStage === 1 && (
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-yellow-400 animate-ping" />
                      <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest font-black">ETAPA 2</span>
                      <h3 className="text-xl font-display font-black text-white tracking-wide uppercase">⚡ ACCIÓN INTENSA</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1 pt-1">
                      {[
                        "Empiezas con energía.",
                        "Lees.",
                        "Planificas.",
                        "Te esfuerzas."
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-zinc-900/40 border border-zinc-900 py-3 px-4 rounded-xl">
                          <Check className="h-4 w-4 text-yellow-400 shrink-0" />
                          <span className="text-sm font-sans text-zinc-300 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {selectedTimelineStage === 2 && (
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-amber-605 animate-ping" />
                      <span className="text-amber-600 font-mono text-xs uppercase tracking-widest font-black">ETAPA 3</span>
                      <h3 className="text-xl font-display font-black text-white tracking-wide uppercase">⚠️ REALIDAD</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-1 pt-1">
                      {[
                        "Aparece el cansancio.",
                        "Aparecen las excusas.",
                        "Aparece la resistencia."
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-zinc-900/60 border border-zinc-900/80 py-3 px-4 rounded-xl">
                          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                          <span className="text-sm font-sans text-zinc-300 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {selectedTimelineStage === 3 && (
                  <motion.div
                    key="stage-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                      <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-black">ETAPA 4</span>
                      <h3 className="text-xl font-display font-black text-white tracking-wide uppercase">❌ ABANDONO</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-1 pt-1">
                      {[
                        "Rompes tu rutina.",
                        "Postergas.",
                        "Pierdes impulso."
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-zinc-900/60 border border-zinc-900/80 py-3 px-4 rounded-xl">
                          <X className="h-4 w-4 text-red-500 shrink-0" />
                          <span className="text-sm font-sans text-zinc-300 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {selectedTimelineStage === 4 && (
                  <motion.div
                    key="stage-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-red-700 animate-ping" />
                      <span className="text-red-700 font-mono text-xs uppercase tracking-widest font-black">ETAPA 5</span>
                      <h3 className="text-xl font-display font-black text-white tracking-wide uppercase">💀 FRUSTRACIÓN</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1 pt-1">
                      {[
                        "Pierdes confianza en ti mismo.",
                        "Empiezas a creer que eres el problema."
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-zinc-905 border border-zinc-900/80 py-3 px-4 rounded-xl">
                          <Skull className="h-4 w-4 text-red-700 shrink-0" />
                          <span className="text-sm font-sans text-zinc-300 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {selectedTimelineStage === 5 && (
                  <motion.div
                    key="stage-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-zinc-500 animate-ping" />
                      <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest font-black">ETAPA 6</span>
                      <h3 className="text-xl font-display font-black text-white tracking-wide uppercase">🔄 REINICIO</h3>
                    </div>
                    <div className="space-y-3 pl-1">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          "Esperas otro lunes.",
                          "Otro mes.",
                          "Otro video motivacional."
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2.5 bg-zinc-900/40 border border-zinc-900 py-3 px-4 rounded-xl">
                            <span className="text-[11px] font-mono font-bold text-zinc-500 bg-zinc-900 h-5 w-5 rounded-full flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <span className="text-sm font-sans text-zinc-300 font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm font-sans font-bold text-zinc-400 pt-2 pl-1 animate-pulse">
                        ➔ Y el ciclo vuelve a comenzar.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Caja de impacto visual - EL COSTO REAL */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 relative max-w-2xl mx-auto space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <h3 className="font-display font-black text-white tracking-widest text-lg sm:text-xl uppercase">
                EL COSTO REAL
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Objetivos abandonados",
                "Promesas rotas",
                "Menos confianza",
                "Menos autoestima",
                "Menos respeto propio",
                "Mismos resultados año tras año"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-black/40 border border-zinc-900/60 rounded-xl hover:border-red-950/40 transition-colors">
                  <span className="text-red-500 select-none font-sans mt-0.5 shrink-0 text-xs">❌</span>
                  <span className="text-zinc-300 font-sans text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ending arrow and focus realization phrase */}
          <div className="text-center pt-8 space-y-8">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-brand-orange text-5xl sm:text-6xl font-black select-none pointer-events-none"
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
          SECCIÓN 4: PROCESO DE TRANSFORMACIÓN EN GRANDE
          Objetivo: Mostrar la evolución visual y progresiva de la trilogía
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-900">
        <div className="max-w-4xl mx-auto space-y-20">
          
          <div className="text-center space-y-6">
            <span className="text-brand-orange font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-brand-orange/10 px-3.5 py-1.5 rounded-full border border-brand-orange/20 inline-block">SISTEMA PROGRESIVO DE ALTO ENFOQUE</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-black text-white uppercase tracking-tight leading-tight">
              LA TRANSFORMACIÓN NO OCURRE POR MOTIVACIÓN. <br />
              <span className="text-brand-orange block mt-2">OCURRE POR CONSTRUCCIÓN.</span>
            </h2>
            <div className="max-w-2xl mx-auto pt-2 space-y-2">
              <p className="text-zinc-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest flex flex-wrap justify-center gap-x-4 gap-y-1">
                <span>Primero cambias tu mente.</span>
                <span className="text-zinc-805">•</span>
                <span>Después automatizas tus acciones.</span>
                <span className="text-zinc-850">•</span>
                <span>Finalmente te conviertes en alguien que ejecuta.</span>
              </p>
            </div>
          </div>

          {/* Premium Vertical Progress Line */}
          <div className="relative max-w-3xl mx-auto py-8">
            {/* Background/Passive connector line */}
            <div className="absolute left-6 sm:left-10 md:left-12 top-4 bottom-4 w-[2px] bg-zinc-900 rounded-full" />
            
            {/* Illuminated glowing connector segment line */}
            <div className="absolute left-6 sm:left-10 md:left-12 top-4 bottom-16 w-[2px] bg-gradient-to-b from-brand-orange via-yellow-500 to-amber-700 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.55)]" />

            <div className="space-y-16">
              
              {/* FASE 1 */}
              <div className="relative pl-14 sm:pl-20 md:pl-24 group">
                {/* Illuminated Icon Node */}
                <div className="absolute left-6 sm:left-10 md:left-12 -translate-x-1/2 top-1.5 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-zinc-950 border-2 border-brand-orange flex items-center justify-center text-lg sm:text-xl shadow-[0_0_20px_rgba(249,115,22,0.45)] group-hover:shadow-[0_0_30px_rgba(249,115,22,0.65)] transition-all duration-300 z-10">
                  🧠
                </div>

                <div className="bg-zinc-950 border border-zinc-900/60 hover:border-brand-orange/30 rounded-2xl p-6 sm:p-8 space-y-4 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_35px_rgba(249,115,22,0.05)]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-brand-orange font-mono text-[9px] sm:text-[10px] uppercase font-black tracking-widest bg-brand-orange/15 px-2.5 py-1 rounded-md border border-brand-orange/20">FASE 1</span>
                    <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider font-bold">• MENTALIDAD •</span>
                    <span className="text-zinc-400 font-mono text-[10px] uppercase font-bold bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-850">LIBRO 1</span>
                  </div>

                  <h3 className="font-display font-black text-white text-xl sm:text-2xl tracking-tight uppercase">
                    DOMINAS TU MENTE
                  </h3>

                  <div className="space-y-3 pt-2">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block font-bold">Problemas que elimina:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Victimismo",
                        "Excusas",
                        "Falta de dirección",
                        "Dependencia emocional"
                      ].map((prob, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-black/40 border border-zinc-900/40 py-2.5 px-3 rounded-xl">
                          <span className="text-red-500 text-xs select-none">❌</span>
                          <span className="text-zinc-300 font-sans text-xs sm:text-sm font-semibold">{prob}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-zinc-900/80 pt-4 mt-2">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block font-bold mb-1.5">Resultado:</span>
                    <p className="text-zinc-200 font-display text-sm sm:text-base font-bold italic">
                      ➔ Empiezas a pensar como una persona que ejecuta.
                    </p>
                  </div>
                </div>
              </div>

              {/* FASE 2 */}
              <div className="relative pl-14 sm:pl-20 md:pl-24 group">
                {/* Illuminated Icon Node */}
                <div className="absolute left-6 sm:left-10 md:left-12 -translate-x-1/2 top-1.5 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-zinc-950 border-2 border-yellow-500 flex items-center justify-center text-lg sm:text-xl shadow-[0_0_20px_rgba(234,179,8,0.35)] group-hover:shadow-[0_0_30px_rgba(234,179,8,0.55)] transition-all duration-300 z-10">
                  ⚙️
                </div>

                <div className="bg-zinc-950 border border-zinc-900/60 hover:border-yellow-500/20 rounded-2xl p-6 sm:p-8 space-y-4 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_35px_rgba(234,179,8,0.03)]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-yellow-500 font-mono text-[9px] sm:text-[10px] uppercase font-black tracking-widest bg-yellow-500/10 px-2.5 py-1 rounded-md border border-yellow-500/10">FASE 2</span>
                    <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider font-bold">• HÁBITOS •</span>
                    <span className="text-zinc-400 font-mono text-[10px] uppercase font-bold bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-850">LIBRO 2</span>
                  </div>

                  <h3 className="font-display font-black text-white text-xl sm:text-2xl tracking-tight uppercase">
                    AUTOMATIZAS TU ÉXITO
                  </h3>

                  <div className="space-y-3 pt-2">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block font-bold">Problemas que elimina:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Procrastinación",
                        "Desorden",
                        "Falta de enfoque",
                        "Improvisación"
                      ].map((prob, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-black/40 border border-zinc-900/40 py-2.5 px-3 rounded-xl">
                          <span className="text-red-500 text-xs select-none">❌</span>
                          <span className="text-zinc-300 font-sans text-xs sm:text-sm font-semibold">{prob}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-zinc-900/80 pt-4 mt-2">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block font-bold mb-1.5">Resultado:</span>
                    <p className="text-zinc-200 font-display text-sm sm:text-base font-bold italic">
                      ➔ Dejas de depender de la motivación.
                    </p>
                  </div>
                </div>
              </div>

              {/* FASE 3 */}
              <div className="relative pl-14 sm:pl-20 md:pl-24 group">
                {/* Illuminated Icon Node */}
                <div className="absolute left-6 sm:left-10 md:left-12 -translate-x-1/2 top-1.5 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-zinc-950 border-2 border-red-500 flex items-center justify-center text-lg sm:text-xl shadow-[0_0_20px_rgba(239,68,68,0.35)] group-hover:shadow-[0_0_30px_rgba(239,68,68,0.55)] transition-all duration-300 z-10">
                  🛡️
                </div>

                <div className="bg-zinc-950 border border-zinc-900/60 hover:border-red-500/20 rounded-2xl p-6 sm:p-8 space-y-4 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_35px_rgba(239,68,68,0.03)]">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-red-500 font-mono text-[9px] sm:text-[10px] uppercase font-black tracking-widest bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/10">FASE 3</span>
                    <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider font-bold">• DISCIPLINA •</span>
                    <span className="text-zinc-400 font-mono text-[10px] uppercase font-bold bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-850">LIBRO 3</span>
                  </div>

                  <h3 className="font-display font-black text-white text-xl sm:text-2xl tracking-tight uppercase">
                    TE CONVIERTES EN UN EJECUTOR
                  </h3>

                  <div className="space-y-3 pt-2">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block font-bold">Problemas que elimina:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Pereza",
                        "Inconsistencia",
                        "Abandono",
                        "Falta de autocontrol"
                      ].map((prob, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-black/40 border border-zinc-900/40 py-2.5 px-3 rounded-xl">
                          <span className="text-red-500 text-xs select-none">❌</span>
                          <span className="text-zinc-300 font-sans text-xs sm:text-sm font-semibold">{prob}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-zinc-900/80 pt-4 mt-2">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block font-bold mb-1.5">Resultado:</span>
                    <p className="text-zinc-200 font-display text-sm sm:text-base font-bold italic">
                      ➔ Haces lo que dijiste que ibas a hacer.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bloque Final Gigante - NUEVA IDENTIDAD */}
          <div className="relative pt-12">
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-x-2 border-y border-brand-orange/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-[0_20px_60px_rgba(249,115,22,0.15)] max-w-4xl mx-auto">
              {/* Futuristic geometric line accents */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
              <div className="absolute -right-32 -top-32 w-80 h-80 rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />
              <div className="absolute -left-32 -bottom-32 w-80 h-80 rounded-full bg-orange-650/10 blur-[120px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side: Bold Statement */}
                <div className="lg:col-span-5 text-left space-y-4">
                  <span className="text-brand-orange font-mono text-[9px] font-black tracking-[0.2em] uppercase border border-brand-orange/30 px-3 py-1 rounded bg-brand-orange/10 inline-block shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                    TRANSFORMACIÓN INTEGRAL
                  </span>
                  <h3 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-none">
                    NUEVA <br className="hidden lg:block"/>IDENTIDAD
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans mt-2">
                    El sistema no cambia simplemente lo que haces: cambia profundamente <strong className="text-white">quién eres</strong>. Cuando tu identidad se reconfigura, la disciplina deja de requerir esfuerzo mental porque se convierte en tu forma natural de operar.
                  </p>
                </div>

                {/* Right Side: Immersive Visual Layout */}
                <div className="lg:col-span-7 space-y-4">
                  {/* The three clean blocks representing the core shifts */}
                  <div className="space-y-2.5">
                    {[
                      { icon: "⚡", bold: "YA NO", text: "necesitas sentir ganas para actuar." },
                      { icon: "✨", bold: "YA NO", text: "dependes de la inspiración para dar el paso." },
                      { icon: "🔥", bold: "YA NO", text: "buscas o requieres de motivación externa." }
                    ].map((item, i) => (
                      <div key={i} className="bg-black/60 border border-zinc-900/80 hover:border-brand-orange/20 p-4 rounded-xl flex items-center space-x-4 transition-all duration-300">
                        <span className="text-base shrink-0">{item.icon}</span>
                        <p className="text-zinc-300 text-xs sm:text-sm font-sans leading-relaxed text-left">
                          <strong className="text-brand-orange font-mono uppercase tracking-wider mr-1.5">{item.bold}</strong>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-brand-orange/15 to-transparent border border-brand-orange/30 p-5 rounded-2xl space-y-4 text-left shadow-[inset_0_1px_20px_rgba(249,115,22,0.05)]">
                    <p className="font-display font-black text-white text-sm sm:text-base uppercase tracking-wider flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                      Te conviertes en la persona que ejecuta:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { title: "INCONDICIONAL", desc: "Aunque no tengas ganas." },
                        { title: "IMPARABLE", desc: "Aunque sea difícil." },
                        { title: "SILENCIOSO", desc: "Aunque nadie te esté viendo." }
                      ].map((item, i) => (
                        <div key={i} className="bg-black/80 border border-zinc-900/60 rounded-lg p-3 text-left">
                          <span className="block text-[9px] font-mono text-brand-orange font-black uppercase tracking-wider">{item.title}</span>
                          <span className="block text-[10px] text-zinc-400 font-sans mt-0.5 leading-tight">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frase final enorme */}
          <div className="text-center pt-8 space-y-4">
            <p className="font-mono text-brand-orange text-4xl sm:text-5xl select-none font-black animate-bounce">
              ↓
            </p>
            <h4 className="font-display font-black text-zinc-500 text-lg sm:text-xl uppercase tracking-widest">
              NO ES UNA TRILOGÍA DE LIBROS.
            </h4>
            <p className="font-display font-black text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-brand-orange pb-2">
              ES UN SISTEMA DE RECONSTRUCCIÓN PERSONAL.
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
          SECCIÓN 7: BENEFICIOS
          Objetivo: Mostrar la ganancia de no depender de la motivación (Grid)
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-zinc-995 bg-black border-b border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="text-brand-orange font-mono text-xxs font-bold uppercase tracking-wider">REFORZAMIENTO POSITIVO</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight">
              LO QUE CAMBIA CUANDO DEJAS DE DEPENDER DE LA MOTIVACIÓN
            </h2>
            <p className="text-zinc-500 text-sm max-w-xl mx-auto">
              La libertad no es hacer lo que quieres. La libertad es ser capaz de obligarte a hacer lo correcto a través de un sistema.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Más enfoque", desc: "Silencias las perturbaciones del scroll." },
              { label: "Más disciplina", desc: "Actúas como una máquina sin dudar." },
              { label: "Más confianza", desc: "Construyes respeto propio al cumplir." },
              { label: "Más productividad", desc: "Haces en 2 horas lo que otros en días." },
              { label: "Menos procrastinación", desc: "Anulas la justificación mental." },
              { label: "Menos distracciones", desc: "Un entorno búnker que te protege" },
              { label: "Más autocontrol", desc: "Soberanía total contra impulsos." },
              { label: "Más resultados", desc: "Efecto compuesto en tu carrera." }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-zinc-950 p-5 rounded-2xl border border-zinc-900 flex flex-col justify-between min-h-[120px] hover:border-brand-orange/20 transition-all">
                <div className="h-8 w-8 rounded-lg bg-orange-500/5 flex items-center justify-center text-brand-orange mb-3">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-display text-sm uppercase tracking-wide leading-tight">{benefit.label}</h4>
                  <p className="text-zinc-500 text-[11px] mt-1 font-sans">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 8: TESTIMONIOS
          Objetivo: Mostrar 6 tarjetas premium bien preparadas
          ========================================================== */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="text-brand-orange font-mono text-xxs font-bold uppercase tracking-wider">COMUNIDAD IMPLACABLE</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight">
              RESULTADOS DE NUESTRA COMUNIDAD
            </h2>
            <p className="text-zinc-500 text-sm max-w-xl mx-auto">
              Estudiantes e ingenieros reales que hackearon sus niveles de acción personal con la saga.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div key={test.id} className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 space-y-4 hover:border-zinc-800 transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={test.avatarUrl}
                        alt={test.name}
                        className="h-10 w-10 rounded-full object-cover border border-zinc-800"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-extrabold text-white font-display leading-tight">{test.name}</h4>
                        <p className="text-[10px] text-zinc-500 font-mono">{test.role}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-650">{test.date}</span>
                  </div>

                  <div className="flex text-orange-500 space-x-0.5">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current text-brand-orange" />
                    ))}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-sans italic">
                    "{test.content}"
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-900 flex justify-between items-center text-[9px] font-mono uppercase text-zinc-500">
                  <span>Volumen Utilizado:</span>
                  <span className="text-brand-orange font-bold">{test.category}</span>
                </div>
              </div>
            ))}
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
