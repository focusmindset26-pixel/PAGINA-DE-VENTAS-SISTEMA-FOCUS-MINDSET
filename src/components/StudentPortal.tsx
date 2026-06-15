import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, Image as ImageIcon, Volume2, Calendar, LogOut, CheckCircle2, Circle, 
  ChevronRight, Play, Pause, SkipForward, SkipBack, Edit3, Bookmark, 
  Sparkles, Award, Zap, Compass, RotateCcw, ArrowRight, ArrowLeft, ZoomIn, ZoomOut
} from "lucide-react";
import { BOOKS, BONUSES, AUDIO_TRACKS, CHALLENGE_DAYS } from "../data";
import { DayChallenge, BookDetail } from "../types";

interface StudentPortalProps {
  onLogout: () => void;
}

export default function StudentPortal({ onLogout }: StudentPortalProps) {
  const [activeTab, setActiveTab] = useState<"library" | "mindmap" | "audio" | "challenge">("library");
  
  // Book Reader states
  const [selectedBook, setSelectedBook] = useState<BookDetail>(BOOKS[0]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [readerFontSize, setReaderFontSize] = useState<"sm" | "base" | "lg" | "xl">("lg");
  const [notes, setNotes] = useState<{ [key: string]: string }>(() => {
    const saved = localStorage.getItem("focus_mindset_notes");
    return saved ? JSON.parse(saved) : {};
  });
  const [currentNoteText, setCurrentNoteText] = useState("");

  // Audio Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0); // 0 to 100
  const [audioTimer, setAudioTimer] = useState<number | null>(null);

  // Challenge states
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    const saved = localStorage.getItem("focus_mindset_completed_days");
    return saved ? JSON.parse(saved) : [1, 2, 3]; // Default a few completed to engage immediately!
  });

  // Note saving effect
  useEffect(() => {
    const key = `${selectedBook.id}_ch_${activeChapterIndex}`;
    setCurrentNoteText(notes[key] || "");
  }, [selectedBook, activeChapterIndex, notes]);

  const saveNote = () => {
    const key = `${selectedBook.id}_ch_${activeChapterIndex}`;
    const updated = { ...notes, [key]: currentNoteText };
    setNotes(updated);
    localStorage.setItem("focus_mindset_notes", JSON.stringify(updated));
  };

  // Simulated audio progress interval
  useEffect(() => {
    if (isPlaying) {
      const interval = window.setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            // Nest track loop or stop
            if (currentTrackIndex < AUDIO_TRACKS.length - 1) {
              setCurrentTrackIndex((t) => t + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + 1;
        });
      }, 1000);
      setAudioTimer(interval);
      return () => clearInterval(interval);
    } else {
      if (audioTimer) {
        clearInterval(audioTimer);
        setAudioTimer(null);
      }
    }
  }, [isPlaying, currentTrackIndex]);

  // Challenge completion handler
  const toggleDayCompletion = (day: number) => {
    const updated = completedDays.includes(day)
      ? completedDays.filter((d) => d !== day)
      : [...completedDays, day].sort((a, b) => a - b);
    setCompletedDays(updated);
    localStorage.setItem("focus_mindset_completed_days", JSON.stringify(updated));
  };

  const resetChallenge = () => {
    if (window.confirm("¿Seguro que deseas reiniciar el progreso de tus 30 días de disciplina militar?")) {
      setCompletedDays([]);
      localStorage.setItem("focus_mindset_completed_days", JSON.stringify([]));
    }
  };

  // Calculated variables
  const overallChallengeProgress = Math.round((completedDays.length / CHALLENGE_DAYS.length) * 100);
  const totalNotesCount = Object.keys(notes).filter(k => notes[k]?.trim() !== "").length;

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans flex flex-col selection:bg-brand-orange selection:text-black">
      
      {/* Dynamic Top Portal Bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-900 bg-black/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Static rendering of generated logo inside standard UI */}
          <div className="h-8 w-8 rounded-lg border border-brand-orange/40 p-0.5 bg-black overflow-hidden flex items-center justify-center">
            <span className="text-white text-xs font-bold font-display">FM</span>
          </div>
          <span className="font-display font-medium tracking-tight text-white hover:text-brand-orange transition-colors">
            FOCUS MINDSET <span className="text-xxs text-zinc-500 font-mono tracking-widest uppercase ml-2 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">STUDENT HUB</span>
          </span>
        </div>

        {/* User stats overview */}
        <div className="hidden md:flex items-center space-x-6 text-xs text-zinc-400 font-mono">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-brand-orange shrink-0" />
            <span>Reto: <span className="text-white font-bold">{overallChallengeProgress}%</span></span>
            <div className="w-16 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <div className="bg-brand-orange h-full transition-all duration-500" style={{ width: `${overallChallengeProgress}%` }} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Edit3 className="h-4 w-4 text-brand-orange shrink-0" />
            <span>Notas: <span className="text-white font-bold">{totalNotesCount}</span></span>
          </div>
        </div>

        {/* Portal Log Out / Back to landing Button */}
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 border border-zinc-800 hover:border-zinc-750 hover:bg-zinc-900/50 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white transition-all cursor-pointer font-display uppercase tracking-wider"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Volver a la Web</span>
        </button>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <nav id="student_portal_nav" className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-900 bg-zinc-980/45 p-4 flex md:flex-col justify-around md:justify-start gap-2 select-none">
          <div className="hidden md:block pb-4 mb-4 border-b border-zinc-900">
            <p className="text-xxs font-mono uppercase text-zinc-500 tracking-widest mb-1">MÓDULOS DEL SISTEMA</p>
            <p className="text-xs text-zinc-400">Trilogía Digital Premium</p>
          </div>

          <button
            onClick={() => setActiveTab("library")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm transition-all cursor-pointer ${
              activeTab === "library" 
                ? "bg-zinc-900 text-white font-semibold border-l-2 border-brand-orange" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
            }`}
          >
            <BookOpen className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline">Lectura de la Trilogía</span>
          </button>

          <button
            onClick={() => setActiveTab("mindmap")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm transition-all cursor-pointer ${
              activeTab === "mindmap" 
                ? "bg-zinc-900 text-white font-semibold border-l-2 border-brand-orange" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
            }`}
          >
            <Compass className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline">Mapa Mental Propio</span>
          </button>

          <button
            onClick={() => setActiveTab("audio")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm transition-all cursor-pointer ${
              activeTab === "audio" 
                ? "bg-zinc-900 text-white font-semibold border-l-2 border-brand-orange" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
            }`}
          >
            <Volume2 className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline">Audio Resúmenes</span>
          </button>

          <button
            onClick={() => setActiveTab("challenge")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm transition-all cursor-pointer ${
              activeTab === "challenge" 
                ? "bg-zinc-900 text-white font-semibold border-l-2 border-brand-orange" 
                : "text-zinc-400 hover:text-white hover:bg-zinc-900/40"
            }`}
          >
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline">Desafío de 30 Días</span>
          </button>

          <div className="hidden md:block mt-auto pt-6 border-t border-zinc-900 text-xxs text-zinc-600 font-mono leading-relaxed bg-zinc-950/20 p-2.5 rounded-lg">
            <span className="block text-zinc-500 font-bold mb-1">CÓDIGO DE HONOR</span>
            No compartas este material. Has pagado por tu transformación, no por la de otros. Sigue las órdenes al pie de la letra.
          </div>
        </nav>

        {/* Portal Active Panel Workspace */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-5xl mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: BIBLIOTECA DIGITAL / READER */}
            {activeTab === "library" && (
              <motion.div
                key="library-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Book selection buttons */}
                <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-900">
                  {BOOKS.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => { setSelectedBook(book); setActiveChapterIndex(0); }}
                      className={`py-2 px-1 text-center text-xs md:text-sm rounded-lg transition-all ${
                        selectedBook.id === book.id
                          ? "bg-zinc-900 border border-zinc-800 text-brand-orange font-semibold"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <span className="block font-sans text-xxs tracking-widest uppercase opacity-60">Vol. {book.id === 'b1' ? '1' : book.id === 'b2' ? '2' : '3'}</span>
                      <span className="font-display">{book.title}</span>
                    </button>
                  ))}
                </div>

                {/* Main E-Reader layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left panel: Info & Chapter selectors */}
                  <div className="space-y-4 lg:col-span-1">
                    <div className="bg-zinc-950 rounded-xl border border-zinc-900 p-5 space-y-4">
                      
                      {/* Mini Book Cover mockup */}
                      <div className="aspect-[3/4] max-w-[150px] mx-auto rounded-lg overflow-hidden border border-zinc-800 shadow-lg relative bg-black flex items-center justify-center p-3">
                        {/* Elegant styled representation */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-zinc-900/20 z-0" />
                        <div className="relative z-10 text-center flex flex-col justify-between h-full w-full py-4 px-2">
                          <span className="text-smaller font-mono text-zinc-500 tracking-widest uppercase">FOCUS MINDSET</span>
                          <span className={`${
                            selectedBook.id === "b1" ? "text-white" : selectedBook.id === "b2" ? "text-zinc-400" : "text-brand-orange"
                          } font-display font-bold text-base leading-tight mt-2`}>
                            {selectedBook.title}
                          </span>
                          <span className="text-[9px] text-zinc-600 font-mono tracking-widest mt-auto uppercase">VOL. {selectedBook.id === 'b1' ? 'I' : selectedBook.id === 'b2' ? 'II' : 'III'}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="inline-block bg-zinc-900 text-brand-orange text-xxs font-mono uppercase font-bold px-2 py-0.5 rounded border border-zinc-800">
                          {selectedBook.result}
                        </span>
                        <h4 className="font-display font-medium text-white text-sm mt-3">{selectedBook.title}</h4>
                        <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed italic">{selectedBook.description}</p>
                      </div>

                      {/* Chapters dropdown/checklist to track */}
                      <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                        <span className="block text-zinc-500 text-xxs font-mono uppercase tracking-wider mb-2">CAPÍTULOS DISPONIBLES</span>
                        {selectedBook.excerpts.map((excerpt, ix) => (
                          <button
                            key={ix}
                            onClick={() => setActiveChapterIndex(ix)}
                            className={`w-full flex items-center justify-between text-left p-2.5 rounded-lg text-xs transition-all ${
                              activeChapterIndex === ix
                                ? "bg-orange-500/10 border border-brand-orange/30 text-white"
                                : "bg-black/30 text-zinc-500 hover:text-zinc-300 border border-transparent"
                            }`}
                          >
                            <span className="font-medium pr-2 truncate">{excerpt.chapter}</span>
                            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right panel: Active chapter e-reader text & interactive Notes block */}
                  <div className="lg:col-span-2 space-y-4">
                    
                    {/* Size and Layout Adjustments Toolbar */}
                    <div className="bg-zinc-950 rounded-xl border border-zinc-900 p-3.5 flex items-center justify-between">
                      <span className="text-xs text-zinc-400 font-mono">MODO LECTURA EXCLUSIVO</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-zinc-900 border border-zinc-850 rounded-lg p-1">
                          {(["sm", "base", "lg", "xl"] as const).map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setReaderFontSize(sz)}
                              className={`px-2 py-1 text-xxs font-mono rounded-md uppercase transition-all ${
                                readerFontSize === sz
                                  ? "bg-zinc-800 text-brand-orange font-bold"
                                  : "text-zinc-500 hover:text-zinc-300"
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Book Text Area styled for focus and immersion */}
                    <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 md:p-8 min-h-[380px] flex flex-col justify-between">
                      <div>
                        {/* Title of chapter */}
                        <div className="border-b border-zinc-900 pb-4 mb-6">
                          <span className="text-xs font-mono text-zinc-500 tracking-wider">Focus Mindset • Volumen {selectedBook.id === 'b1' ? '1' : selectedBook.id === 'b2' ? '2' : '3'}</span>
                          <h3 className="font-display font-semibold text-white text-xl md:text-2xl tracking-tight mt-1">
                            {selectedBook.excerpts[activeChapterIndex].chapter}
                          </h3>
                        </div>

                        {/* Chapter body text */}
                        <p className={`text-zinc-300 font-sans tracking-wide leading-relaxed ${
                          readerFontSize === "sm" ? "text-sm" :
                          readerFontSize === "base" ? "text-base" :
                          readerFontSize === "lg" ? "text-lg" : "text-xl"
                        }`}>
                          {selectedBook.excerpts[activeChapterIndex].content}
                        </p>
                      </div>

                      {/* Inspirational Quote card on the bottom of text */}
                      <div className="mt-8 pt-6 border-t border-zinc-900/80 flex items-start space-x-3 text-brand-orange italic text-xs leading-relaxed">
                        <Bookmark className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>
                          "Grábate esto a fuego. El obstáculo es el camino. La disciplina no busca placer temporal, busca control espiritual soberano."
                        </span>
                      </div>
                    </div>

                    {/* Stoic Personal Note Pad Area - Fully functional notes */}
                    <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Edit3 className="h-4 w-4 text-brand-orange" />
                          <h4 className="font-display font-medium text-white text-sm">Tu Cuaderno de Acción Estoica</h4>
                        </div>
                        <span className="text-xxs font-mono text-zinc-500">SE GUARDA AUTOMÁTICAMENTE</span>
                      </div>
                      
                      <p className="text-xs text-zinc-400">
                        Escribe aquí bajo qué términos vas a aplicar radicalmente esta regla en tu vida. Tus notas se guardan en este navegador de manera segura.
                      </p>

                      <textarea
                        value={currentNoteText}
                        onChange={(e) => {
                          setCurrentNoteText(e.target.value);
                          // Sincronizar inmediatemente con el guardado local
                          const key = `${selectedBook.id}_ch_${activeChapterIndex}`;
                          const updated = { ...notes, [key]: e.target.value };
                          setNotes(updated);
                          localStorage.setItem("focus_mindset_notes", JSON.stringify(updated));
                        }}
                        placeholder="Ej. Empezaré a despertarme a las 5:30 am sin titubeos. Guardaré el celular en la cocina..."
                        rows={3}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/40 transition-all resize-none font-mono"
                      />
                      
                      <div className="flex justify-end">
                        <button
                          onClick={saveNote}
                          className="px-4 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xxs font-mono text-zinc-300 hover:text-white hover:border-brand-orange transition-all uppercase"
                        >
                          Confirmar Guardar
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: MAPA MENTAL INTERACTIVO NODE COMPONENT */}
            {activeTab === "mindmap" && (
              <motion.div
                key="mindmap-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-brand-orange">
                      <Compass className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-white font-semibold text-lg">Mapa Mental Completo del Sistema</h3>
                      <p className="text-xs text-zinc-500">Visualiza el flujo táctico y los pilares para recablear tu identidad y actuar de inmediato.</p>
                    </div>
                  </div>
                </div>

                {/* The Interactive Node Flowchart Graphic */}
                <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 md:p-8 flex flex-col items-center justify-center relative min-h-[480px] overflow-hidden">
                  
                  {/* Watermark brand emblem */}
                  <div className="absolute inset-0 bg-radial-gradient" />
                  
                  <div className="relative z-10 w-full max-w-2xl space-y-12">
                    
                    {/* Identity center node */}
                    <div className="flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-2xl border-2 border-brand-orange bg-zinc-950 p-6 text-center max-w-xs shadow-xl glow-orange"
                      >
                        <Zap className="h-6 w-6 text-brand-orange mx-auto mb-2" />
                        <span className="block text-xxs font-mono uppercase text-brand-orange tracking-widest font-bold">ETAPA CERO - RAÍZ</span>
                        <h4 className="font-display font-bold text-white text-base mt-1">REDEFICIÓN DE IDENTIDAD</h4>
                        <p className="text-xxs text-zinc-400 mt-1.5 leading-relaxed">
                          La convicción stoica de que tú eres tus decisiones y compromisos actuales. No tu pasado.
                        </p>
                      </motion.div>
                    </div>

                    {/* Flow arrow indicators downward */}
                    <div className="flex justify-center">
                      <div className="w-0.5 h-8 bg-zinc-800 border-dashed" />
                    </div>

                    {/* Three mid column levels connected */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                      
                      {/* Node L1 */}
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center cursor-pointer hover:border-brand-orange transition-all"
                      >
                        <span className="text-xs font-mono font-bold text-zinc-500 block mb-1">CIMIENTO 1</span>
                        <h5 className="font-display text-white font-medium text-sm">MENTALIDAD</h5>
                        <p className="text-smaller text-zinc-400 mt-1 lines-clamp-3">
                          Reconocimiento radical de la esfera de control estoica. Aniquila el victimismo y la queja externa.
                        </p>
                        <span className="block text-[9px] font-mono text-brand-orange mt-3 uppercase font-semibold">Táctico • Pensar Para Ejecutar</span>
                      </motion.div>

                      {/* Node L2 */}
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center cursor-pointer hover:border-brand-orange transition-all"
                      >
                        <span className="text-xs font-mono font-bold text-zinc-500 block mb-1">CIMIENTO 2</span>
                        <h5 className="font-display text-white font-medium text-sm">HÁBITOS</h5>
                        <p className="text-smaller text-zinc-400 mt-1 lines-clamp-3">
                          Ingeniería ambiental y de fricciones de dopamina. Automatización de comportamientos virtuosos.
                        </p>
                        <span className="block text-[9px] font-mono text-brand-orange mt-3 uppercase font-semibold">Táctico • Diseñar Para el Flujo</span>
                      </motion.div>

                      {/* Node L3 */}
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center cursor-pointer hover:border-brand-orange transition-all"
                      >
                        <span className="text-xs font-mono font-bold text-zinc-500 block mb-1">CIMIENTO 3</span>
                        <h5 className="font-display text-white font-medium text-sm">DISCIPLINA</h5>
                        <p className="text-smaller text-zinc-400 mt-1 lines-clamp-3">
                          Pacto de Hierro irrompible. Ejecución forzada e inmediata contra las justificaciones lógicas cómodas.
                        </p>
                        <span className="block text-[9px] font-mono text-brand-orange mt-3 uppercase font-semibold">Táctico • Acción Bajo Presión</span>
                      </motion.div>

                    </div>

                    <div className="flex justify-center">
                      <div className="w-0.5 h-8 bg-zinc-800 border-dashed" />
                    </div>

                    {/* Results target node */}
                    <div className="flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-xl border border-zinc-850 bg-zinc-900 p-4 text-center max-w-xs shadow-lg"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto mb-1" />
                        <span className="block text-[9px] font-mono uppercase text-green-500 tracking-wider">MECANISMO COMPLETADO</span>
                        <h4 className="font-display font-bold text-white text-sm mt-0.5">NUEVAS MÁXIMAS ADQUIRIDAS</h4>
                        <p className="text-xxs text-zinc-400 mt-1 leading-relaxed">
                          Consistencia militar, paz estoica ante el caos y un sistema de ingresos y metas blindado.
                        </p>
                      </motion.div>
                    </div>

                  </div>
                </div>

                {/* Downloader box simulation to make it authentic */}
                <div className="p-4 rounded-xl bg-orange-500/5 border border-brand-orange/25 flex flex-col md:flex-row items-center justify-between text-xs gap-3">
                  <div className="flex items-center space-x-3 text-center md:text-left">
                    <Award className="h-5 w-5 text-brand-orange shrink-0" />
                    <p className="text-zinc-300">
                      ¿Quieres la versión en súper alta resolución vectorizada lista para imprimir y colgar en tu pared de oficina?
                    </p>
                  </div>
                  <button
                    onClick={() => alert("¡Descarga simulada perfecta del mapa mental realizada con éxito! Recibirás los PDF en alta calidad en breve.")}
                    className="font-display font-bold text-black bg-brand-orange hover:bg-orange-400 px-4 py-2 rounded-lg text-xxs transition-all uppercase whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Descargar Mapa PDF HD
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB 3: AUDIOTENCIA DE ALTO RENDIMIENTO (AUDIO PLAYER) */}
            {activeTab === "audio" && (
              <motion.div
                key="audio-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Audio dashboard hero */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Player controls inside box */}
                  <div className="md:col-span-2 bg-zinc-950 rounded-2xl border border-zinc-900 p-6 flex flex-col justify-between min-h-[340px]">
                    <div className="flex items-center justify-between">
                      <span className="bg-zinc-900 text-brand-orange border border-zinc-800 text-xxs px-2.5 py-1 rounded font-mono font-bold tracking-wider">
                        AUDIO REPRODUCTOR DE ACCIÓN
                      </span>
                      <Volume2 className="h-4 w-4 text-zinc-500" />
                    </div>

                    {/* Artwork representation & song listing metadata */}
                    <div className="flex items-center space-x-5 my-6">
                      <div className="h-20 w-20 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-radial-gradient opacity-60" />
                        <Sparkles className="h-8 w-8 text-brand-orange relative z-10 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xxs font-mono text-zinc-500 uppercase tracking-widest">VOLUMEN AUDIBLE EXCLUSIVO</span>
                        <h3 className="font-display text-white font-semibold text-base leading-tight md:text-lg">
                          {AUDIO_TRACKS[currentTrackIndex].title}
                        </h3>
                        <p className="text-xs text-zinc-400">
                          {AUDIO_TRACKS[currentTrackIndex].description}
                        </p>
                      </div>
                    </div>

                    {/* Animated sound equalizer waves with pure CSS jump */}
                    {isPlaying && (
                      <div className="flex items-end justify-center space-x-1.5 h-10 my-4 select-none">
                        {[40, 75, 50, 90, 30, 60, 85, 45, 95, 20, 65, 80, 55].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`, `${h}%`] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
                            className="w-1 rounded-t-full bg-brand-orange"
                          />
                        ))}
                      </div>
                    )}

                    {/* Progress tracking bar */}
                    <div className="space-y-2">
                      <div className="relative w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-850 cursor-pointer">
                        <div 
                          className="bg-gradient-to-r from-orange-600 to-brand-orange h-full transition-all duration-300"
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-xxs font-mono text-zinc-505 text-zinc-500">
                        <span>{isPlaying ? `0:${audioProgress.toString().padStart(2, '0')}` : "0:00"}</span>
                        <span>{AUDIO_TRACKS[currentTrackIndex].duration}</span>
                      </div>
                    </div>

                    {/* Physical player Control action buttons */}
                    <div className="flex items-center justify-center space-x-6 mt-4">
                      <button
                        onClick={() => {
                          if (currentTrackIndex > 0) {
                            setCurrentTrackIndex(currentTrackIndex - 1);
                            setAudioProgress(0);
                          }
                        }}
                        disabled={currentTrackIndex === 0}
                        className="p-2 text-zinc-500 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors cursor-pointer"
                      >
                        <SkipBack className="h-5 w-5" />
                      </button>

                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="h-14 w-14 rounded-full bg-brand-orange text-black flex items-center justify-center shadow-lg hover:bg-orange-400 transition-all cursor-pointer hover:scale-105"
                      >
                        {isPlaying ? <Pause className="h-6 w-6 shrink-0 fill-current" /> : <Play className="h-6 w-6 shrink-0 fill-current translate-x-0.5" />}
                      </button>

                      <button
                        onClick={() => {
                          if (currentTrackIndex < AUDIO_TRACKS.length - 1) {
                            setCurrentTrackIndex(currentTrackIndex + 1);
                            setAudioProgress(0);
                          }
                        }}
                        disabled={currentTrackIndex === AUDIO_TRACKS.length - 1}
                        className="p-2 text-zinc-500 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors cursor-pointer"
                      >
                        <SkipForward className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Sidebar playlist */}
                  <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-5 space-y-4">
                    <h4 className="font-display font-medium text-white text-sm">Capis del Resumen</h4>
                    <div className="space-y-2">
                      {AUDIO_TRACKS.map((track, idx) => (
                        <button
                          key={track.id}
                          onClick={() => { setCurrentTrackIndex(idx); setAudioProgress(0); setIsPlaying(true); }}
                          className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${
                            idx === currentTrackIndex
                              ? "bg-orange-500/10 border-brand-orange/30 text-white"
                              : "bg-black/40 border-zinc-900 text-zinc-400 hover:bg-zinc-900"
                          }`}
                        >
                          <div className="truncate pr-3 space-y-1">
                            <span className="block text-[9px] font-mono text-zinc-500">PISTA {idx + 1}</span>
                            <p className="font-medium truncate">{track.title}</p>
                          </div>
                          <span className="font-mono text-xxs text-zinc-500 shrink-0">{track.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 4: RETO COMPROMISO DE 30 DÍAS DE DISCIPLINA */}
            {activeTab === "challenge" && (
              <motion.div
                key="challenge-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Stats cards block */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Progress circle box widget */}
                  <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-5 flex items-center space-x-4">
                    <div className="relative h-16 w-16 shrink-0 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
                      <span className="text-white text-sm font-bold font-mono">{overallChallengeProgress}%</span>
                    </div>
                    <div>
                      <h4 className="font-display text-white font-medium text-sm">Progreso del Reto</h4>
                      <p className="text-xxs text-zinc-400 mt-1">Completa órdenes físicas para forjar la identidad estoica.</p>
                    </div>
                  </div>

                  {/* Medal unlocked base */}
                  <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-5 flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-brand-orange shrink-0">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-white font-medium text-sm">Rango Militar Actual</h4>
                      <p className="text-xxs text-brand-orange font-mono uppercase font-bold mt-1">
                        {completedDays.length >= 20 ? "Legionario de Hierro" : completedDays.length >= 10 ? "Guerrero Disciplinado" : "Neófito Sometido"}
                      </p>
                    </div>
                  </div>

                  {/* Reset trigger */}
                  <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-5 flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-display text-white font-medium text-sm">Reconfiguración</h4>
                      <p className="text-xxs text-zinc-500">Reiniciar tus registros de disciplina.</p>
                    </div>
                    <button
                      onClick={resetChallenge}
                      className="border border-zinc-800 hover:border-red-900/60 p-2 rounded-xl text-zinc-400 hover:text-red-400 transition-colors"
                      title="Reiniciar Desafío"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Day grid list selector */}
                <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 font-mono text-xxs uppercase tracking-wider">CRONOGRAMA DE 30 DÍAS DE PODER</span>
                    <span className="text-xxs font-mono text-zinc-400">{completedDays.length} de {CHALLENGE_DAYS.length} Días Realizados</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CHALLENGE_DAYS.map((dayObj) => {
                      const isDone = completedDays.includes(dayObj.day);
                      return (
                        <div
                          key={dayObj.day}
                          onClick={() => toggleDayCompletion(dayObj.day)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-4 select-none ${
                            isDone
                              ? "bg-orange-500/5 border-brand-orange/30 text-white"
                              : "bg-black/40 border-zinc-900 text-zinc-400 hover:border-zinc-800"
                          }`}
                        >
                          <div className="pt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2 className="h-5 w-5 text-brand-orange shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 text-zinc-850 hover:text-zinc-500 shrink-0" />
                            )}
                          </div>

                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xxs font-mono text-zinc-500 font-semibold">DÍA {dayObj.day.toString().padStart(2, '0')}</span>
                              <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                                dayObj.category === "disciplina" ? "bg-red-950/40 text-red-400 border border-red-900/40" :
                                dayObj.category === "habito" ? "bg-blue-950/40 text-blue-400 border border-blue-900/40" :
                                "bg-teal-950/40 text-teal-400 border border-teal-900/40"
                              }`}>
                                {dayObj.category}
                              </span>
                            </div>
                            <h5 className="font-display font-medium text-white text-xs md:text-sm leading-snug">{dayObj.title}</h5>
                            <p className="text-xs text-zinc-400 leading-relaxed font-sans">{dayObj.task}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
