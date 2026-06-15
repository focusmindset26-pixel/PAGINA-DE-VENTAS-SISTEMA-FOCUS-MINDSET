import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Lock, CreditCard, Sparkles, CheckCircle2, ChevronRight, X, Smartphone, AlertCircle } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | "paypal">("card");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const maskedValue = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(maskedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCardCvv(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Por favor, ingresa tu nombre completo.");
    if (!email.trim() || !email.includes("@")) return setError("Ingresa un correo electrónico válido.");
    
    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) return setError("Número de tarjeta inválido.");
      if (cardExpiry.length < 5) return setError("Fecha de vencimiento inválida.");
      if (cardCvv.length < 3) return setError("CVV inválido.");
    }

    setError("");
    setLoading(true);

    // Simulate elite secure authorization processing speed
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="checkout_overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Checkout Surface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl md:p-8"
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/10 text-brand-orange">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-white text-lg">Pago Seguro Encriptado</h3>
                  <p className="text-xs text-zinc-500">Procesado de forma segura en segundos</p>
                </div>
              </div>
              <button
                id="close_checkout_btn"
                onClick={onClose}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Price stack summaries */}
            <div className="my-5 rounded-lg bg-zinc-900/50 p-4 border border-zinc-900">
              <div className="flex justify-between items-center text-sm text-zinc-400 mb-2">
                <span>Trilogía Focus Mindset + Todos los Bonos</span>
                <span className="line-through text-zinc-600">USD 84,00</span>
              </div>
              <div className="flex justify-between items-center border-t border-zinc-800/60 pt-2 font-display">
                <span className="text-white font-medium text-sm">Pago único (Oferta de Lanzamiento)</span>
                <span className="text-xl font-bold text-brand-orange">USD 9,99</span>
              </div>
            </div>

            {/* General state screens */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative h-16 w-16 mb-6">
                  {/* Outer spinning ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-zinc-800 border-t-brand-orange animate-spin" />
                  {/* Subtle inner pulsing dot */}
                  <div className="absolute inset-3 rounded-full bg-zinc-900 flex items-center justify-center">
                    <Lock className="h-4 w-4 text-zinc-500" />
                  </div>
                </div>
                <h4 className="font-display text-white font-medium text-lg mb-1">Autorizando Transacción...</h4>
                <p className="text-xs text-zinc-500 max-w-xs">
                  Estableciendo canal cifrado SSL AES-256. Por favor, no recargues esta página.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 rounded-lg bg-red-950/40 border border-red-900/50 p-3 text-red-400 text-xs"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Tabs for payment methods */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { setPaymentMethod("card"); setError(""); }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs gap-1.5 font-medium transition-all ${
                      paymentMethod === "card"
                        ? "bg-orange-500/10 border-brand-orange text-white"
                        : "bg-zinc-900/30 border-zinc-800 text-zinc-400 hover:bg-zinc-950"
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Tarjeta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setPaymentMethod("pix"); setError(""); }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs gap-1.5 font-medium transition-all ${
                      paymentMethod === "pix"
                        ? "bg-orange-500/10 border-brand-orange text-white"
                        : "bg-zinc-900/30 border-zinc-800 text-zinc-400 hover:bg-zinc-950"
                    }`}
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>Transferencia</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setPaymentMethod("paypal"); setError(""); }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs gap-1.5 font-medium transition-all ${
                      paymentMethod === "paypal"
                        ? "bg-orange-500/10 border-brand-orange text-white"
                        : "bg-zinc-900/30 border-zinc-800 text-zinc-400 hover:bg-zinc-950"
                    }`}
                  >
                    <span className="font-bold font-sans italic text-sm text-sky-400">Pay<span className="text-white">Pal</span></span>
                    <span>Cuenta</span>
                  </button>
                </div>

                {/* Shared User Info fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-zinc-500 text-xxs font-mono uppercase mb-1 tracking-wider">Nombre Completo</label>
                    <input
                      id="cardholder_name_input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. David Goggins"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 text-sm text-white placeholder-zinc-600 focus:border-brand-orange focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-500 text-xxs font-mono uppercase mb-1 tracking-wider">Correo Electrónico de Acceso</label>
                    <input
                      id="cardholder_email_input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@email.com"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 text-sm text-white placeholder-zinc-600 focus:border-brand-orange focus:outline-none transition-all"
                    />
                    <p className="text-smaller text-zinc-500 mt-1">Este correo recibirá el acceso digital inmediato de Hotmart.</p>
                  </div>
                </div>

                {/* Card-specific details section */}
                {paymentMethod === "card" && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-zinc-500 text-xxs font-mono uppercase mb-1 tracking-wider">Número de Tarjeta</label>
                      <div className="relative">
                        <input
                          id="card_number_input"
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="0000 0000 0000 0000"
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 pl-10 text-sm text-white placeholder-zinc-600 focus:border-brand-orange focus:outline-none transition-all font-mono"
                        />
                        <div className="absolute left-3.5 top-3.5 text-zinc-600">
                          <CreditCard className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-500 text-xxs font-mono uppercase mb-1 tracking-wider">Vencimiento</label>
                        <input
                          id="card_expiry_input"
                          type="text"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/AA"
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 text-sm text-white placeholder-zinc-600 focus:border-brand-orange focus:outline-none transition-all font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-500 text-xxs font-mono uppercase mb-1 tracking-wider">CVV / Cóg. Seguridad</label>
                        <input
                          id="card_cvv_input"
                          type="password"
                          value={cardCvv}
                          onChange={handleCvvChange}
                          placeholder="***"
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 text-sm text-white placeholder-zinc-600 focus:border-brand-orange focus:outline-none transition-all font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pix-specific details section */}
                {paymentMethod === "pix" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 text-xs text-zinc-400 space-y-2 mt-2"
                  >
                    <p className="text-white font-medium">Instrucciones de Transferencia Instantánea:</p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-500">
                      <li>El acceso se liberará inmediatamente una vez que el sistema detecte la transacción.</li>
                      <li>Al hacer clic abajo, se generará una clave aleatoria y un código QR único.</li>
                      <li>No tienes recargos ni impuestos adicionales.</li>
                    </ul>
                  </motion.div>
                )}

                {/* Paypal-specific details section */}
                {paymentMethod === "paypal" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 text-zinc-500 text-xs space-y-2 mt-2"
                  >
                    Se abrirá la ventana oficial de Paypal para que autentiques tu cuenta e inicies tu cobro único de USD 9.99 sin comisiones ocultas.
                  </motion.div>
                )}

                {/* Submitting button */}
                <button
                  id="checkout_submit_btn"
                  type="submit"
                  className="w-full mt-4 flex items-center justify-center space-x-2 rounded-xl bg-orange-600 p-4 font-display font-bold text-white shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-all glow-orange-subtle hover:scale-[1.01] cursor-pointer"
                >
                  <span>AUTORIZAR COBRO DE USD 9,99</span>
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* SSL Trust footer */}
                <div className="flex items-center justify-center space-x-6 pt-4 text-zinc-600 text-xxs font-mono">
                  <span className="flex items-center">
                    <Lock className="h-3.5 w-3.5 text-zinc-600 mr-1 shrink-0" />
                    CONEXIÓN ENCRIPTADA SSL
                  </span>
                  <span className="flex items-center">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-700 mr-1 shrink-0" />
                    GARANTÍA HOTMART RESPALDADA
                  </span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
