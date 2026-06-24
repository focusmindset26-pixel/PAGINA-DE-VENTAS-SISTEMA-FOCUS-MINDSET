import { Testimonial, FAQ, BookDetail, Bonus, AudioTrack, DayChallenge } from "./types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Andrés Blanco",
    role: "Estudiante y Freelancer",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "Siempre me despertaba cansado y lo primero que hacía era mirar TikTok o Instagram por casi una hora. Sentía que el cerebro me quedaba frito desde las 8 AM. Empecé a aplicar la regla de desactivación física del Tomo 2 y, por primera vez en años, llevo 10 días seguidos levantándome sin tocar el teléfono en la primera hora. Parece una tontería, pero el cambio en mi energía es de otro planeta.",
    category: "mindset",
    date: "Hace 10 días",
    location: "Buenos Aires, Argentina",
    verified: true
  },
  {
    id: "2",
    name: "Mateo Herrera",
    role: "Diseñador UX",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "Estando en casa me costaba la vida concentrarme. Abría Figma y a los diez minutos ya estaba buscando qué comer o chequeando WhatsApp. El Tomo de Hábitos me abrió los ojos con el tema de la 'arquitectura del entorno'. Saqué las distracciones de mi rango visual y creé mis bloques sin fricción. En tres semanas saqué adelante dos entregas pendientes que me tenían estresadísimo. Funciona porque no te pide que 'tengas fuerza de voluntad', te cambia las reglas del juego.",
    category: "habits",
    date: "Hace 3 semanas",
    location: "Santiago, Chile",
    verified: true
  },
  {
    id: "3",
    name: "Carlos Mendoza",
    role: "Programador & Atleta Amateur",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "Llevaba dos años pagando el gimnasio para ir solo la primera semana de cada mes. Mi problema era que si tenía un día pesado en la oficina, mi mente me daba mil excusas perfectas para quedarme en el sillón. El Tomo de Mentalidad me hizo entender que estaba actuando bajo mis emociones y no bajo una identidad. Apliqué el 'pacto de hierro' y ya cumplí un mes entrenando 4 días por semana sin fallar uno solo. No es que ahora tenga más ganas; es que dejé de negociar conmigo mismo.",
    category: "discipline",
    date: "Hace 1 mes",
    location: "Ciudad de México",
    verified: true
  },
  {
    id: "4",
    name: "Sebastián Ortega",
    role: "Creador de Contenido & Coproductor",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "Tengo carpetas llenas de ideas, guiones a la mitad y dominios comprados que nunca usé. Cada vez que iniciaba algo nuevo, me duraba la emoción una semana y luego lo abandonaba porque 'no estaba inspirado'. El Tomo de Disciplina me curó esa inmadurez. Entendí que los amateurs actúan cuando están motivados y los profesionales cuando toca. En 20 días estructuré, grabé y lancé mi primer infoproducto de punta a punta. Este sistema te obliga a dejar de lamerte las heridas y ponerte a laburar de verdad.",
    category: "productivity",
    date: "Hace 20 días",
    location: "Bogotá, Colombia",
    verified: true
  },
  {
    id: "5",
    name: "Diego Ruiz",
    role: "Trader & Consultor de Negocios",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "En mi trabajo la falta de disciplina cuesta dinero real. Me costaba mantener la cabeza fría y terminaba tomando decisiones estúpidas por pura frustración o codicia de último minuto. Esta trilogía me dio un bofetón de realidad estoica. El concepto de disociar el impulso físico de la ejecución es lo más potente que he leído. Recuperé el respeto por mi propia palabra. Mis operaciones de este mes cerraron limpias y sin un solo error de indisciplina. Pagué $9.99 dólares por algo que me ha ahorrado miles de euros en malas decisiones. Es ridículamente barato.",
    category: "general",
    date: "Hace 1 mes",
    location: "Madrid, España",
    verified: true
  }
];

export const FAQS: FAQ[] = [
  {
    id: "faq_1",
    question: "¿Cuándo recibo el producto?",
    answer: "El acceso es de inmediato. Tras completar el pago seguro a través de nuestra plataforma, recibirás un correo electrónico automático con tus credenciales exclusivas para acceder a la biblioteca digital Focus Mindset y comenzar hoy mismo."
  },
  {
    id: "faq_2",
    question: "¿En qué formato viene la trilogía?",
    answer: "Viene en un formato digital interactivo multiplataforma de alta definición. Además de PDFs optimizados y listos para descargar (ideales para Kindle, tablets o lectores electrónicos), tendrás acceso a un portal interactivo para consumir el contenido cómodamente."
  },
  {
    id: "faq_3",
    question: "¿Puedo leerlo desde mi celular o tablet?",
    answer: "Absolutamente. El diseño responsivo de la plataforma y el formato libre de DRM te permite leer el material desde cualquier teléfono inteligente, tableta o computadora o importarlos directamente a tu e-reader favorito."
  },
  {
    id: "faq_4",
    question: "¿Necesito experiencia previa en estoicismo o productividad?",
    answer: "No. El Sistema Focus Mindset está diseñado desde los principios básicos de la psicología conductual y el autodesarrollo stoico. No tiene tecnicismos complejos de relleno; te llevamos directamente de cero a un sistema de ejecución implacable."
  },
  {
    id: "faq_5",
    question: "¿Hay alguna garantía de satisfacción?",
    answer: "Sí, cuentas con una garantía de reembolso de 7 días respaldada por la seguridad de Hotmart. Si sientes que la trilogía no aporta valor masivo a tu vida, puedes solicitar el 100% de tu dinero de vuelta con un solo clic. Sin preguntas complicadas."
  }
];

export const BOOKS: BookDetail[] = [
  {
    id: "b1",
    title: "MENTALIDAD",
    subtitle: "Cómo construir una mente que ejecuta incluso cuando no tiene ganas.",
    coverImage: "libro_mentalidad",
    lessons: [
      "Responsabilidad absoluta",
      "Construcción de identidad",
      "Pensamiento ganador",
      "Eliminar victimismo",
      "Desarrollar confianza"
    ],
    description: "La mayoría de las personas fracasa porque intenta cambiar sus hábitos conservando una vieja identidad de víctima. En este volumen establecerás la piedra angular estoica: el principio del control interno.",
    result: "Pensar como alguien que ejecuta.",
    excerpts: [
      {
        chapter: "Capítulo 1: El Principio de Responsabilidad Radical",
        content: "El victimismo es el sedante intelectual más cómodo que existe. Cuando culpas a la economía, a tus padres, a tu genética o a la suerte, estás entregando tu poder. La respuesta estoica es simple: tú no controlas los eventos externos, pero controlas tu juicio soberano y tu acción racional inmediata. Acepta que todo resultado en tu vida actual es consecuencia directa de tus decisiones y tu respuesta disciplinada."
      },
      {
        chapter: "Capítulo 2: Reescribir la Identidad desde la Raíz",
        content: "No actúas de acuerdo a lo que quieres, actúas de acuerdo a lo que crees que eres. Si te identificas como un programador perezoso o un procastinador crónico, tu subconsciente saboteará cualquier esfuerzo de mejora para mantenerse congruente. Debes redefinir tu identidad: 'Soy una persona que hace lo difícil primero, que respeta su palabra'. Cada pequeña decisión correcta es un voto por este nuevo ser humano."
      }
    ]
  },
  {
    id: "b2",
    title: "HÁBITOS",
    subtitle: "El sistema para construir una vida productiva sin depender de la fuerza de voluntad.",
    coverImage: "libro_habitos",
    lessons: [
      "Crear hábitos sólidos",
      "Eliminar distracciones",
      "Diseñar rutinas",
      "Productividad práctica",
      "Sistemas diarios"
    ],
    description: "La fuerza de voluntad es una energía limitada que se agota antes del mediodía. Los ganadores no dependen de ella; construyen una arquitectura ambiental que automatiza sus decisiones productivas de forma natural.",
    result: "Automatizar comportamientos ganadores.",
    excerpts: [
      {
        chapter: "Capítulo 1: El mito de la Motivación Humana",
        content: "La motivación es excelente para iniciar un sprint, pero inútil para la maratón de la vida. Confiar en tener 'ganas' es una estrategia infantil para aficionados. Los profesionales del alto rendimiento diseñan sistemas ambientales donde el buen comportamiento es la opción por defecto, y la procrastinación tiene barreras de fricción insalvables."
      },
      {
        chapter: "Capítulo 2: Ingeniería de Dopamina y Fricción",
        content: "Si tu celular está a 10 centímetros de tus ojos, tu cerebro elegirá el scrolling sin importar cuánto desees trabajar. Diseña tu espacio de trabajo como un búnker de alta concentración. Coloca tu teléfono en otra habitación, bloquea sitios web reactivos y simplifica brutalmente los disparadores del comportamiento enfocado."
      }
    ]
  },
  {
    id: "b3",
    title: "DISCIPLINA",
    subtitle: "El sistema para actuar incluso cuando tu mente te pide que abandones.",
    coverImage: "libro_disciplina",
    lessons: [
      "Cumplir tu palabra",
      "Vencer la procrastinación",
      "Autocontrol",
      "Consistencia extrema",
      "Ejecutar bajo presión"
    ],
    description: "La disciplina militar no es rigidez sin sentido; es la máxima libertad. Es la capacidad de cumplir el pacto que hiciste contigo mismo sin importar las excusas de comodidad que tu cerebro invente en el último segundo.",
    result: "Convertirte en alguien que hace lo que dice.",
    excerpts: [
      {
        chapter: "Capítulo 1: El Pacto de Hierro Personal",
        content: "Cuando dices que vas a entrenar a las 6:00 AM y decides dormir 30 minutos más, estás programando a tu mente para que asocie tus planes con palabras vacías. Estás perdiendo el respeto propio. Debes tratar tus compromisos personales como órdenes militares de seguridad nacional. El cansancio no es un factor de negociación."
      },
      {
        chapter: "Capítulo 2: Domar la Mente Reactiva bajo Presión",
        content: "En el momento de actuar, tu mente te gritará excusas razonables: 'hoy hace frío', 'trabajaste duro ayer'. Aprende a disociar el impulso de comodidad del control muscular de ejecución. Escucha el susurro flojo con frialdad y actúa mientras sigue hablando. El cuerpo hace lo que el soberano mental manda."
      }
    ]
  }
];

export const BONUSES: Bonus[] = [
  {
    id: "b_1",
    number: "BONO 01",
    title: "Mapa Mental Completo Focus Mindset",
    tagline: "Estructura Visual de Alto Enfoque",
    value: "USD 9.00",
    description: "La hoja de ruta visual en una sola página para repasar todos los conceptos ante cualquier momento de debilidad o duda mental.",
    bullets: [
      "Visión global de las 3 etapas interconectadas",
      "Estrategias rápidas de desactivación de procrastinación",
      "Formato listo para impresión"
    ],
    impactLabel: "ACCESO DIRECTO E INSTANTÁNEO"
  },
  {
    id: "b_2",
    number: "BONO 02",
    title: "Audio Resumen Completo de la Trilogía",
    tagline: "Inyección Auditiva en Movimiento",
    value: "USD 9.00",
    description: "El formato de audio premium sintetizado y narrado con un tono enérgico para recablear tu subconsciente mientras entrenas, viajas o caminas.",
    bullets: [
      "75 minutos de puro oro e ideas pragmáticas",
      "Técnicas de reprogramación subconsciente estoica",
      "Narrado con alta intensidad inspiradora"
    ],
    impactLabel: "IDEAL PARA OPTIMIZAR TIEMPOS MUERTOS"
  },
  {
    id: "b_3",
    number: "BONO 03",
    title: "Guía Rápida de Implementación de 30 Días",
    tagline: "De la Teoría a la Práctica Diaria",
    value: "USD 9.00",
    description: "Una plantilla de control micro-paso para garantizar que cada uno de los 30 días de tu transformación esté respaldado por una acción medible.",
    bullets: [
      "Calendario con 1 micro-reto productivo diario",
      "Plantilla autoevaluable de hábitos stoicos",
      "Instrucciones breves de 3 minutos por mañana"
    ],
    impactLabel: "ACCIÓN DIARIA SIN FRICCIÓN"
  }
];

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: "track_1",
    title: "Módulo 1: La Reconfiguración de Identidad (Estoicismo Moderno)",
    duration: "18:42",
    description: "Destruye el autogolpe mental y establece el soberano interno estoico."
  },
  {
    id: "track_2",
    title: "Módulo 2: Arquitectura del Entorno de Ultra Foco",
    duration: "21:15",
    description: "Cómo silenciar distracciones digitales y hackear dopamina limpia."
  },
  {
    id: "track_3",
    title: "Módulo 3: El Pacto de Hierro y Desencadenamiento Físico",
    duration: "17:08",
    description: "Técnicas de ejecución motora cuando tu mente te grita que abandones."
  },
  {
    id: "track_4",
    title: "Módulo 4: Sistemas vs Objetivos (Estructuras de Consistencia)",
    duration: "18:20",
    description: "El método micro-atómico para una productividad perpetua sin fuerza de voluntad."
  }
];

export const CHALLENGE_DAYS: DayChallenge[] = [
  { day: 1, title: "Despertador sin Posponer", task: "Coloca tu celular a 3 metros de la cama antes de dormir. Levántate al instante sin tocar el botón snooze.", category: "disciplina" },
  { day: 2, title: "Ducha Fría de 1 Minuto", task: "Termina tu ducha con 60 segundos de agua fría pura. Demuéstrale a tu cerebro quién tiene el mando físico.", category: "disciplina" },
  { day: 3, title: "El Búnker de Enfoque", task: "Selecciona un bloque de 60 minutos de trabajo. Apaga tu teléfono y ponlo fuera de tu vista.", category: "habito" },
  { day: 4, title: "Regla de los 5 Segundos", task: "Al sentir el impulso de procrastinar en una tarea, cuenta atrás '5-4-3-2-1' y actúa físicamente.", category: "mentalidad" },
  { day: 5, title: "Diario de Control Interno", task: "Escribe 3 cosas que te frustren hoy y define qué elemento de ellas puedes controlar y qué no.", category: "mentalidad" },
  { day: 6, title: "Identificar Parásitos de Dopamina", task: "Registra cuánto tiempo pasas en redes de scrolling. Limita el uso a máximo 20 minutos hoy.", category: "habito" },
  { day: 7, title: "Ayuno de Medios Matutino", task: "Mantén el modo avión activado por las primeras 2 horas del día. Haz tu rutina principal concentrado.", category: "habito" },
  { day: 8, title: "El Almuerzo Consciente", task: "Almuerza sin mirar ninguna pantalla (ni teléfono, televisión ni laptop). Disfruta y entrena tu atención.", category: "habito" },
  { day: 9, title: "Cumplimiento Extremo", task: "Prométete hacer una tarea específica de 30 minutos a una hora exacta. Cúmplela sin importar cansancio.", category: "disciplina" },
  { day: 10, title: "Monólogo Estoico", task: "Cuando sientas fatiga o excusas mentales hoy, descríbelas como meros impulsos físicos temporales sin poder real.", category: "mentalidad" },
  { day: 11, title: "Ducha fría de 2 minutos", task: "Extiende el choque térmico estoico a 2 minutos completos. Entrena la mente bajo incomodidad táctica.", category: "disciplina" },
  { day: 12, title: "Cero Azúcar Procesada", task: "Evita cualquier refresco, dulce o carbohidrato refinado hoy. Domina tus antojos biológicos.", category: "habito" },
  { day: 13, title: "Elimina una Queja", task: "Hoy tienes prohibido quejarte de cualquier cosa externa (clima, tráfico, personas). Solo soluciones.", category: "mentalidad" },
  { day: 14, title: "Planificación Nocturna", task: "Escribe hoy antes de dormir las 3 tareas cruciales de mañana. No dejes tu mañana al azar.", category: "habito" },
  { day: 15, title: "Ejecución Prioritaria", task: "Mañana realiza la tarea más difícil y pesada como primera acción del día, antes de revisar correos.", category: "disciplina" },
  { day: 16, title: "Ayuno Dopaminérgico de 4 Horas", task: "Sostén 4 horas continuas de cero estimulación artificial (sin música, podcasts, chat ni redes).", category: "habito" },
  { day: 17, title: "La Pausa de Presión", task: "Ante cualquier contratiempo o rabia hoy, cuenta hasta 10 antes de emitir cualquier palabra o respuesta.", category: "mentalidad" },
  { day: 18, title: "Doble o Nada de Enfoque", task: "Establece dos bloques continuos de 50 minutos con 10 de descanso. No te levantes del asiento.", category: "disciplina" },
  { day: 19, title: "Lectura de Transformación", task: "Dedica 20 minutos a leer un capítulo de la trilogía sin realizar multicomputación.", category: "habito" },
  { day: 20, title: "La Meditación del Águila", task: "Pasa 5 minutos en absoluto silencio imaginando que observas tus problemas cotidianos desde 10,000 metros.", category: "mentalidad" },
  { day: 21, title: "Desconexión Total a las 9 PM", task: "Apaga pantallas electrónicas y enfoca tu última hora a la reflexión estoica o estiramientos leves.", category: "habito" },
  { day: 22, title: "Ducha Fría de 3 Minutos", task: "La prueba final de resistencia física térmica voluntaria. Mantén la respiración lenta.", category: "disciplina" },
  { day: 23, title: "Responsabilidad Radicada", task: "Si algo sale mal hoy, asume la culpa por completo y busca cómo evitarlo activamente en el futuro.", category: "mentalidad" },
  { day: 24, title: "El Método Pomodoro Militar", task: "Ejecuta 4 vueltas perfectas de 25 minutos con 5 de descanso. Cero pestañas extra en navegador.", category: "habito" },
  { day: 25, title: "Revisar Estados Financieros", task: "Analiza tus gastos hormonales o pánicos de compra recientes. Cancela una suscripción inútil.", category: "disciplina" },
  { day: 26, title: "No Justificación de Falla", task: "Si tienes un tropiezo hoy, no busques una excusa consoladora. Admite que faltó foco y sigue.", category: "mentalidad" },
  { day: 27, title: "La Prueba del Silencio", task: "Pasa una hora en tu habitación en silencio estricto sin hacer nada. Observa por dónde vaga tu cerebro.", category: "mentalidad" },
  { day: 28, title: "Trabajo Continuo Sin Música", task: "Realiza tu jornada laboral en silencio absoluto. Descubre el poder de tu diálogo de foco.", category: "habito" },
  { day: 29, title: "Agradecimiento de Batalla", task: "Agradece un obstáculo o sufrimiento reciente. Te ha forjado el carácter necesario.", category: "mentalidad" },
  { day: 30, title: "Inspección de Identidad", task: "Haz un recuento de estos 30 días. Observa cómo has actuado y declara tu liberación de la pereza.", category: "disciplina" }
];
