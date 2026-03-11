import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2, Leaf, Sprout, Tractor, PackageSearch, Users, Star, Truck, MapPin, Mail, Phone, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput, useSubmitContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Home() {
  const { toast } = useToast();
  const contactMutation = useSubmitContact();
  
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactInput) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Bericht verzonden!",
          description: "We nemen zo snel mogelijk contact met u op.",
          variant: "default",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Er is iets misgegaan.",
          description: "Probeer het later nog eens.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-primary/20">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* landing page hero scenic dutch potato field agriculture */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1920&auto=format&fit=crop" 
            alt="Uitgestrekte aardappelvelden" 
            className="w-full h-full object-cover object-center"
          />
          {/* Wash gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl pt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
              <Leaf className="w-4 h-4 text-accent" />
              <span>Familiebedrijf uit Maasbree</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Kwaliteits<wbr/>aardappelen <br/>
              <span className="text-accent italic">rechtstreeks</span> van het veld
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
              Aardappel Handel Smeets levert al generaties lang de beste aardappelen voor consumptie, landbouw en industrie. Vertrouwd, lokaal en puur natuur.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <a href="#products" className="px-8 py-4 rounded-xl font-semibold bg-accent text-accent-foreground shadow-xl shadow-accent/20 hover:bg-accent/90 hover:-translate-y-1 transition-all text-center">
                Bekijk Assortiment
              </a>
              <a href="#contact" className="px-8 py-4 rounded-xl font-semibold bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all text-center">
                Neem Contact Op
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeIn} className="text-secondary font-bold tracking-wider uppercase text-sm mb-3">Onze Historie</motion.h2>
              <motion.h3 variants={fadeIn} className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
                Een familiebedrijf geworteld in de Limburgse klei
              </motion.h3>
              
              <motion.div variants={fadeIn} className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  In het hart van Limburg, in het pittoreske Maasbree, vindt u Aardappel Handel Smeets. Ons bedrijf wordt gedreven door passie voor de landbouw en een onwrikbare toewijding aan kwaliteit.
                </p>
                <p>
                  Onder leiding van de broers <strong>Mat Smeets</strong> en <strong>Wilbert Smeets</strong> is de onderneming uitgegroeid tot een betrouwbare schakel tussen teler en afnemer. We kennen de grond, we kennen de boeren en we weten precies wat een aardappel perfect maakt.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-10 grid grid-cols-2 gap-6">
                <div className="bg-background rounded-2xl p-6 border border-border shadow-sm">
                  <h4 className="text-4xl font-serif font-bold text-primary mb-2">40+</h4>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Jaren Ervaring</p>
                </div>
                <div className="bg-background rounded-2xl p-6 border border-border shadow-sm">
                  <h4 className="text-4xl font-serif font-bold text-primary mb-2">100%</h4>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Kwaliteitsgarantie</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                <img 
                  src={`${import.meta.env.BASE_URL}images/mat-smeets.png`}
                  alt="Mat Smeets - Eigenaar" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8 pt-28">
                  <p className="text-white font-serif text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Mat Smeets</p>
                  <p className="text-yellow-300 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Mede-eigenaar</p>
                </div>
              </div>
              
              {/* Floating Wilbert Card */}
              <div className="absolute -bottom-8 -left-8 md:-left-12 bg-white p-5 rounded-2xl shadow-xl border border-border flex items-center gap-5 max-w-xs animate-in slide-in-from-bottom-8 duration-700 delay-300">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
                  <Users size={28} />
                </div>
                <div>
                  <p className="text-foreground font-serif text-lg font-bold">Wilbert Smeets</p>
                  <p className="text-muted-foreground text-sm font-medium">Mede-eigenaar & Logistiek</p>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 md:py-32 bg-background border-y border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-secondary font-bold tracking-wider uppercase text-sm mb-3">Onze Producten</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Wat wij bieden</h3>
            <p className="text-lg text-muted-foreground">
              Voor elk doel de juiste aardappel. Wij leveren maatwerk voor detailhandel, verwerkende industrie en mede-telers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="h-48 relative overflow-hidden">
                {/* fresh potatoes in basket */}
                <img src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop" alt="Consumptieaardappelen" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">Smaakvol</div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-serif font-bold text-foreground mb-2">Consumptie</h4>
                <p className="text-muted-foreground text-sm mb-4">Direct geschikt voor consumptie. Smaakvol, veelzijdig en van de hoogste tafelkwaliteit.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 text-secondary" /> Vastkokend</li>
                  <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 text-secondary" /> Kruimig</li>
                </ul>
              </div>
            </motion.div>

            {/* Product 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="h-48 relative overflow-hidden">
                {/* sprouting seed potatoes */}
                <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop" alt="Pootaardappelen" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">Basis</div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-serif font-bold text-foreground mb-2">Pootgoed</h4>
                <p className="text-muted-foreground text-sm mb-4">De beste basis voor een nieuwe oogst. Gecertificeerd pootgoed met hoge groeikracht.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 text-secondary" /> Ziektevrij</li>
                  <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 text-secondary" /> Hoge opbrengst</li>
                </ul>
              </div>
            </motion.div>

            {/* Product 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="h-48 relative overflow-hidden">
                {/* french fries industrial potatoes */}
                <img src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=800&auto=format&fit=crop" alt="Industrieaardappelen" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">Verwerking</div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-serif font-bold text-foreground mb-2">Industrie</h4>
                <p className="text-muted-foreground text-sm mb-4">Specifiek geteeld voor de verwerkende industrie, perfect voor frites en chips.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 text-secondary" /> Juiste zetmeel</li>
                  <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 text-secondary" /> Bulk levering</li>
                </ul>
              </div>
            </motion.div>

            {/* Product 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="h-48 relative overflow-hidden">
                {/* organic farm soil potatoes */}
                <img src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=800&auto=format&fit=crop" alt="Biologische aardappelen" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">Duurzaam</div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-serif font-bold text-foreground mb-2">Biologisch</h4>
                <p className="text-muted-foreground text-sm mb-4">Puur natuur geteeld met respect voor de bodem en omgeving. SKAL gecertificeerd.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 text-secondary" /> SKAL keurmerk</li>
                  <li className="flex items-center gap-2 text-sm text-foreground/80"><CheckCircle2 className="w-4 h-4 text-secondary" /> 100% Natuurlijk</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="features" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeIn} className="text-accent font-bold tracking-wider uppercase text-sm mb-3">Waarom Kiezen Voor Ons</motion.h2>
              <motion.h3 variants={fadeIn} className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-8 text-white">
                De zekerheid van een echte specialist
              </motion.h3>
              
              <div className="space-y-8">
                <motion.div variants={fadeIn} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-accent">
                    <Star size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">Gegarandeerde Kwaliteit</h4>
                    <p className="text-primary-foreground/80 leading-relaxed">Elke partij aardappelen wordt door ons persoonlijk gecontroleerd op kwaliteit, maat en conditie voordat deze de deur uitgaat.</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeIn} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-accent">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">Snelle & Flexibele Logistiek</h4>
                    <p className="text-primary-foreground/80 leading-relaxed">Dankzij ons eigen logistieke netwerk onder leiding van Wilbert, garanderen we levering op maat, precies wanneer u het nodig heeft.</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">Lokale Verankering</h4>
                    <p className="text-primary-foreground/80 leading-relaxed">Geworteld in Maasbree hebben we een hecht netwerk van vaste, betrouwbare telers opgebouwd in de regio.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
               {/* agricultural tractor harvesting potatoes */}
               <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                 <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=900&auto=format&fit=crop" alt="Aardappeloogst" className="w-full h-full object-cover" />
               </div>
               
               <div className="absolute -bottom-10 -left-10 bg-accent text-accent-foreground p-8 rounded-2xl shadow-xl w-64">
                 <p className="font-serif font-bold text-2xl mb-2">Betrouwbaar</p>
                 <p className="text-sm font-medium">Van teler tot koper, wij verzorgen de complete keten met zorg.</p>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 md:py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-secondary font-bold tracking-wider uppercase text-sm mb-3">Neem Contact Op</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">Hoe kunnen wij u helpen?</h3>
            <p className="text-lg text-muted-foreground">
              Heeft u vragen over ons aanbod of wilt u een offerte opvragen? Vul het formulier in of bel ons direct. We staan voor u klaar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 bg-card rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 bg-background p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <h4 className="text-2xl font-serif font-bold text-foreground mb-8 relative z-10">Contactgegevens</h4>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-foreground mb-1">Locatie</h5>
                    <p className="text-muted-foreground leading-relaxed">
                      Aardappel Handel Smeets<br/>
                      Sevenumse Dijk 6<br/>
                      5993 NK Maasbree<br/>
                      Nederland
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-foreground mb-1">Telefoon</h5>
                    <p className="text-muted-foreground leading-relaxed">
                      +31 (0)77 123 4567<br/>
                      <span className="text-sm">Ma - Vr: 08:00 - 17:00</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-foreground mb-1">E-mail</h5>
                    <p className="text-muted-foreground leading-relaxed">
                      info@smeets-aardappelen.nl
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 p-8 md:p-12">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground">Naam</label>
                    <input 
                      id="name"
                      placeholder="Uw naam of bedrijfsnaam"
                      className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">E-mail</label>
                    <input 
                      id="email"
                      type="email"
                      placeholder="info@bedrijf.nl"
                      className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-foreground">Telefoonnummer (Optioneel)</label>
                  <input 
                    id="phone"
                    placeholder="+31 6 12345678"
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                    {...form.register("phone")}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground">Uw Bericht</label>
                  <textarea 
                    id="message"
                    rows={4}
                    placeholder="Hoe kunnen we u helpen?"
                    className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 resize-none"
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    <>
                      Verstuur Bericht
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
