import { Check, X } from "lucide-react";

const personalizedFeatures = [
  "Atendimento direto comigo, sem intermediários",
  "Estratégia 100% personalizada para seu negócio",
  "Acompanhamento próximo e relatórios frequentes",
  "Flexibilidade para ajustes rápidos",
  "Foco em resultados reais: leads e vendas",
  "Investimento justo sem taxas ocultas",
];

const agencyProblems = [
  "Atendimento por estagiários rotativos",
  "Campanhas genéricas e templates prontos",
  "Relatórios automáticos sem análise real",
  "Burocracia para qualquer alteração",
  "Foco em métricas de vaidade",
  "Contratos longos e taxas escondidas",
];

export const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Por que me escolher?
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Especialista Dedicado vs{" "}
            <span className="text-muted-foreground">Agência Comum</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Entenda a diferença entre ter um especialista focado no seu sucesso e ser apenas mais um cliente numa carteira lotada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Personalized - Left Card */}
          <div className="relative p-8 rounded-2xl border-2 border-primary bg-background glow-gold-sm">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full bg-gradient-gold text-primary-foreground text-sm font-bold">
                RECOMENDADO
              </span>
            </div>

            <h3 className="text-2xl font-display font-bold text-center mb-2 mt-4">
              Gestor de Tráfego
            </h3>
            <p className="text-primary text-center font-semibold mb-8">
              Atendimento Personalizado
            </p>

            <ul className="space-y-4">
              {personalizedFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency - Right Card */}
          <div className="relative p-8 rounded-2xl border border-border bg-secondary">
            <h3 className="text-2xl font-display font-bold text-center mb-2 text-foreground">
              Agência Tradicional
            </h3>
            <p className="text-foreground text-center font-semibold mb-8">
              Atendimento Genérico
            </p>

            <ul className="space-y-4">
              {agencyProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-foreground">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
