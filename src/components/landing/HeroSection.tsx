import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Target, Zap } from "lucide-react";

export const HeroSection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById("lead-form");
    formElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />



      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <TrendingUp className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute top-40 right-20 animate-float opacity-20" style={{ animationDelay: "2s" }}>
        <Target className="w-12 h-12 text-primary" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float opacity-20" style={{ animationDelay: "4s" }}>
        <Zap className="w-10 h-10 text-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">


            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-tight mb-6 animate-slide-up">
              Tráfego pago orientado a{" "}
              <span className="text-gradient-gold">alta performance e eficiência</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Chega de métricas vazias. Meu foco é gerar{" "}
              <span className="text-foreground font-semibold">leads qualificados</span> no Instagram e Facebook
              que se transformam em <span className="text-primary font-semibold">vendas e lucro</span> para o seu negócio.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button variant="hero" size="xl" onClick={scrollToForm}>
                Quero Mais Clientes
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Atendimento personalizado • Sem contrato de fidelidade
              </p>
            </div>
          </div>

          {/* Right Column - Photo */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end animate-scale-in">
            <div className="relative w-full max-w-[500px] aspect-square lg:aspect-auto lg:h-[600px] rounded-b-[2rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <img
                src="/vitor-photo.png"
                alt="Vitor Negrão - Gestor de Tráfego"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Decorative elements behind photo */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
