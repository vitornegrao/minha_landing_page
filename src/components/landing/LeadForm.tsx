import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Loader2, CheckCircle2, Send } from "lucide-react";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  phone: z.string().trim().min(10, "Telefone deve ter pelo menos 10 dígitos").max(20, "Telefone muito longo"),
  age: z.coerce.number().min(18, "Você deve ser maior de 18 anos").max(120, "Idade inválida"),
  profession: z.string().trim().min(2, "Profissão é obrigatória"),
  area_of_activity: z.string().trim().min(2, "Área de atuação é obrigatória"),
  channel: z.string().min(1, "Selecione por onde nos conheceu"),
});

export const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    profession: "",
    area_of_activity: "",
    channel: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: urlParams.get("utm_source") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, channel: value }));
    if (errors.channel) {
      setErrors((prev) => ({ ...prev, channel: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = leadSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Starting lead submission (Robust Mode)...");
      const finalUtmSource = utmParams.utm_source || formData.channel;
      const finalUtmMedium = utmParams.utm_medium || (utmParams.utm_source ? "manual_selection" : "website_form");

      const insertData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        utm_source: finalUtmSource,
        utm_campaign: utmParams.utm_campaign || null,
        utm_medium: finalUtmMedium,
        utm_term: utmParams.utm_term || null,
        utm_content: `Idade: ${formData.age} | Prof: ${formData.profession} | Área: ${formData.area_of_activity} | Canal: ${formData.channel}${utmParams.utm_content ? ` | ${utmParams.utm_content}` : ""}`,
      };

      let supabaseSuccess = false;
      let supabaseErrorMsg = "";

      console.log("Attempting Supabase insert...");
      try {
        const { error } = await supabase.from("leads").insert(insertData);
        if (error) throw error;
        supabaseSuccess = true;
        console.log("Supabase insert success!");
      } catch (err: any) {
        console.error("Supabase insert failed:", err);
        supabaseErrorMsg = err.message || JSON.stringify(err);
      }

      const emailData = {
        "Nome": formData.name.trim(),
        "E-mail": formData.email.trim().toLowerCase(),
        "Telefone": formData.phone.trim(),
        "Idade": formData.age,
        "Profissão": formData.profession,
        "Área de Atuação": formData.area_of_activity,
        "Como conheceu": formData.channel,
        "Origem (UTM Source)": utmParams.utm_source || "Direto",
        "Campanha (UTM Campaign)": utmParams.utm_campaign || "Nenhuma",
        "_subject": supabaseSuccess
          ? "Novo Lead Capturado - Dados Completos!"
          : "NOVO LEAD (ALERTA: Falha no Supabase!)",
        "_template": "basic"
      };

      if (!supabaseSuccess) {
        // @ts-ignore - Adding dynamic fields for failure context
        emailData["AVISO"] = `Este lead NÃO foi salvo no banco de dados devido ao erro: ${supabaseErrorMsg}.`;
      }

      // Send email via Formsubmit.co
      console.log("Sending email notification...");
      let emailSuccess = false;
      try {
        const response = await fetch("https://formsubmit.co/ajax/vitornegraorocha@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(emailData)
        });
        if (response.ok) {
          emailSuccess = true;
          console.log("Email notification sent successfully!");
        } else {
          console.error("Email notification failed with status:", response.status);
        }
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
      }

      if (supabaseSuccess || emailSuccess) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", age: "", profession: "", area_of_activity: "", channel: "" });
      } else {
        throw new Error("Both Supabase and Email notification failed.");
      }

    } catch (error) {
      console.error("Total submission failure:", error);
      toast({
        title: "Erro ao enviar",
        description: "Pedimos desculpas, mas não conseguimos processar seus dados no momento. Por favor, tente falar diretamente pelo WhatsApp ou Instagram.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="lead-form" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-lg mx-auto text-center">
            <div className="card-elevated p-10 animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">
                Recebido!
              </h3>
              <p className="text-muted-foreground text-lg">
                Entraremos em contato em breve para discutir como podemos impulsionar seus resultados.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
              Vamos Conversar
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Pronto para{" "}
              <span className="text-gradient-gold">Escalar seu Negócio?</span>
            </h2>
            <p className="text-muted-foreground">
              Preencha seus dados e entrarei em contato para entender suas necessidades.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card-elevated p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Nome completo *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium">
                  Telefone / WhatsApp *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground font-medium">
                    Idade *
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="25"
                    className={errors.age ? "border-destructive" : ""}
                  />
                  {errors.age && (
                    <p className="text-sm text-destructive">{errors.age}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession" className="text-foreground font-medium">
                    Profissão *
                  </Label>
                  <Input
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Engenheiro"
                    className={errors.profession ? "border-destructive" : ""}
                  />
                  {errors.profession && (
                    <p className="text-sm text-destructive">{errors.profession}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area_of_activity" className="text-foreground font-medium">
                  Área de Atuação *
                </Label>
                <Input
                  id="area_of_activity"
                  name="area_of_activity"
                  value={formData.area_of_activity}
                  onChange={handleChange}
                  placeholder="Ex: Construção Civil"
                  className={errors.area_of_activity ? "border-destructive" : ""}
                />
                {errors.area_of_activity && (
                  <p className="text-sm text-destructive">{errors.area_of_activity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="channel" className="text-foreground font-medium">
                  Como chegou até aqui? *
                </Label>
                <Select
                  value={formData.channel}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="channel" className={errors.channel ? "border-destructive" : ""}>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                {errors.channel && (
                  <p className="text-sm text-destructive">{errors.channel}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Quero Ser Contatado
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Seus dados estão seguros. Não compartilhamos com terceiros.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
