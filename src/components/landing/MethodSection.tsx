import { Search, Target, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Análise Estratégica",
    description: "Estudo profundo do seu negócio, público-alvo e concorrência para criar campanhas certeiras.",
    number: "01",
  },
  {
    icon: Target,
    title: "Segmentação Inteligente",
    description: "Encontro as pessoas certas que realmente têm interesse e poder de compra do seu produto/serviço.",
    number: "02",
  },
  {
    icon: Rocket,
    title: "Campanhas Otimizadas",
    description: "Criativos persuasivos e copywriting estratégico que convertem curiosos em clientes.",
    number: "03",
  },
  {
    icon: BarChart3,
    title: "Otimização Contínua",
    description: "Análise diária de métricas e ajustes em tempo real para maximizar seus resultados.",
    number: "04",
  },
];

export const MethodSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Metodologia Comprovada
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Meu Método de{" "}
            <span className="text-gradient-gold">Captação de Leads</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Um processo estruturado e testado que transforma seu investimento em tráfego em oportunidades reais de negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Number */}
              <span className="absolute top-4 right-4 text-6xl font-display font-black text-border/50 group-hover:text-primary/20 transition-colors duration-500">
                {step.number}
              </span>
              
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <step.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
