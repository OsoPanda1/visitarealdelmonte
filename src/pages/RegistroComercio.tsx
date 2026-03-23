import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Store, User, Phone, Mail } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import BrumaFooter from "@/components/BrumaFooter";
import FloatingParticles from "@/components/FloatingParticles";
import RealitoBubble from "@/components/RealitoBubble";
import { toast } from "sonner";

const giros = [
  { value: "hoteleria", label: "Hotelería / Hospedaje", price: 500 },
  { value: "platerias", label: "Platerías", price: 400 },
  { value: "pasterias", label: "Pasterías", price: 400 },
  { value: "bares", label: "Bares", price: 350 },
  { value: "artesanias", label: "Locales de Artesanías", price: 300 },
  { value: "tiendas", label: "Tiendas / Misceláneas", price: 250 },
  { value: "camiones", label: "Recorridos Turísticos (Camiones)", price: 400 },
  { value: "cuatrimotos", label: "Cuatrimotos", price: 400 },
  { value: "caminatas", label: "Caminatas y Representaciones", price: 200 },
  { value: "gondolas", label: "Góndolas y Semifijos", price: 150 },
];

const RegistroComercio = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    giro: "",
    phone: "",
    email: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedGiro = giros.find(g => g.value === formData.giro);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.businessName || !formData.giro || !formData.phone) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }
    setSubmitted(true);
    toast.success("Solicitud enviada. Tu registro está pendiente de aprobación.");
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <FloatingParticles />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-12 text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-display text-3xl text-gradient-gold mb-4">¡Solicitud Recibida!</h2>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Tu registro está <span className="text-gold font-semibold">pendiente de aprobación</span>. Te contactaremos pronto.
          </p>
          <Link to="/comercios" className="btn-premium inline-block">Ver Directorio</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FloatingParticles />
      <BrumaHeader />

      <section className="container mx-auto px-6 md:px-12 py-32 max-w-2xl">
        <Link to="/comercios" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-xs tracking-wider uppercase">Volver al directorio</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60 block mb-4">Únete al Ecosistema</span>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight text-gradient-gold mb-4">
            Registra tu Comercio
          </h1>
          <p className="font-display text-lg text-platinum/60 italic mb-12">
            Forma parte de RDM Digital y conecta con miles de visitantes
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Owner Name */}
          <div className="glass-card rounded-xl p-5">
            <label className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2 flex items-center gap-2">
              <User className="w-3 h-3" /> Nombre del propietario *
            </label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) => updateField("ownerName", e.target.value)}
              placeholder="Tu nombre completo"
              className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none mt-2 border-b border-border/30 pb-2 focus:border-gold/40 transition-colors"
            />
          </div>

          {/* Business Name */}
          <div className="glass-card rounded-xl p-5">
            <label className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2 flex items-center gap-2">
              <Store className="w-3 h-3" /> Nombre del negocio *
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              placeholder="Nombre de tu establecimiento"
              className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none mt-2 border-b border-border/30 pb-2 focus:border-gold/40 transition-colors"
            />
          </div>

          {/* Giro */}
          <div className="glass-card rounded-xl p-5">
            <label className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-3 block">
              Giro del negocio *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {giros.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => updateField("giro", g.value)}
                  className={`text-left px-4 py-3 rounded-xl font-body text-xs transition-all duration-300 ${
                    formData.giro === g.value
                      ? "glass-gold border border-gold/40 text-gold"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="block font-medium">{g.label}</span>
                  <span className={`text-[10px] ${formData.giro === g.value ? "text-gold/80" : "text-muted-foreground"}`}>
                    ${g.price} MXN / mes
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected plan summary */}
          {selectedGiro && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="glass-gold rounded-xl p-5 text-center"
            >
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/60 block mb-1">Plan Seleccionado</span>
              <span className="font-display text-2xl text-gradient-gold">${selectedGiro.price} MXN</span>
              <span className="font-body text-xs text-gold/60 block">por mes · {selectedGiro.label}</span>
            </motion.div>
          )}

          {/* Contact */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-5">
              <label className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2 flex items-center gap-2">
                <Phone className="w-3 h-3" /> Teléfono *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="771-123-4567"
                className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none mt-2 border-b border-border/30 pb-2 focus:border-gold/40 transition-colors"
              />
            </div>
            <div className="glass-card rounded-xl p-5">
              <label className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2 flex items-center gap-2">
                <Mail className="w-3 h-3" /> Email (opcional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none mt-2 border-b border-border/30 pb-2 focus:border-gold/40 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div className="glass-card rounded-xl p-5">
            <label className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2 block">
              Descripción breve (opcional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Cuéntanos sobre tu negocio..."
              rows={3}
              className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none mt-2 border-b border-border/30 pb-2 focus:border-gold/40 transition-colors resize-none"
            />
          </div>

          <button type="submit" className="btn-premium w-full !py-4 text-base">
            Enviar solicitud de registro
          </button>
        </form>
      </section>

      <BrumaFooter />
      <RealitoBubble />
    </div>
  );
};

export default RegistroComercio;
