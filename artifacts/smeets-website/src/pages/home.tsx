import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2, Leaf, Sprout, Tractor, PackageSearch, Star, Truck, MapPin, Mail, Phone, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput, useSubmitContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";

type Product = {
  id: string;
  title: string;
  badge: string;
  image: string;
  shortDesc: string;
  bullets: string[];
  fullDesc: string;
  details: { label: string; value: string }[];
};

const products: Product[] = [
  {
    id: "consumptie",
    title: "Consumptie",
    badge: "Smaakvol",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Direct geschikt voor consumptie. Smaakvol, veelzijdig en van de hoogste tafelkwaliteit.",
    bullets: ["Vastkokend", "Kruimig"],
    fullDesc: "Onze consumptieaardappelen worden zorgvuldig geselecteerd op smaak, formaat en kwaliteit. Ze zijn geschikt voor de detailhandel, supermarkten, groenteboeren en horecagroothandel.",
    details: [
      { label: "Rassen", value: "Nicola, Asterix, Charlotte, Bintje, Desiree" },
      { label: "Gebruik", value: "Koken, stoven, frituren, salade, oven" },
      { label: "Verpakking", value: "25 kg zakken · 1,5 en 2,5 kg consumentenverpakking" },
      { label: "Seizoen", value: "Augustus t/m april" },
      { label: "Levering", value: "Regionaal en nationaal" },
    ],
  },
  {
    id: "pootgoed",
    title: "Pootgoed",
    badge: "Basis",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
    shortDesc: "De beste basis voor een nieuwe oogst. Gecertificeerd pootgoed met hoge groeikracht.",
    bullets: ["Ziektevrij", "Hoge opbrengst"],
    fullDesc: "Wij leveren NAK-gecertificeerd pootgoed in diverse klassen en rassen. Ons pootgoed is afkomstig van betrouwbare telers en voldoet aan de strengste fytosanitaire eisen. Wij adviseren u graag bij de rassenkeuze passend bij uw grondsoort en doel.",
    details: [
      { label: "Certificering", value: "NAK gecertificeerd (klasse E, A en B)" },
      { label: "Rassen", value: "Divers — op aanvraag, afgestemd op uw teelt" },
      { label: "Leverperiode", value: "November t/m april" },
      { label: "Advies", value: "Persoonlijk rassenkeuzeadvies beschikbaar" },
      { label: "Verpakking", value: "25 kg zakken of bigbag" },
    ],
  },
  {
    id: "industrie",
    title: "Industrie",
    badge: "Verwerking",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Specifiek geteeld voor de verwerkende industrie, perfect voor frites en chips.",
    bullets: ["Juiste zetmeel", "Bulk levering"],
    fullDesc: "Voor de frites- en chipsindustrie leveren wij partijen met de juiste knolvorm, droge stofgehalte en laag reducerend suikergehalte. Directe afvoer van het veld is mogelijk. Wij werken samen met grote verwerkende bedrijven en kunnen ook op contract leveren.",
    details: [
      { label: "Toepassingen", value: "Frites, chips, puree, zetmeelproductie" },
      { label: "Kwaliteitseisen", value: "Hoog droge stof · laag reducerend suiker · juiste knolvorm" },
      { label: "Leveringsvolume", value: "Vanaf 25 ton per levering" },
      { label: "Levering", value: "Jaarrond beschikbaar, directe veldafvoer mogelijk" },
      { label: "Contract", value: "Contractteelt op aanvraag" },
    ],
  },
  {
    id: "biologisch",
    title: "Biologisch",
    badge: "Duurzaam",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Puur natuur geteeld met respect voor de bodem en omgeving. SKAL gecertificeerd.",
    bullets: ["SKAL keurmerk", "100% Natuurlijk"],
    fullDesc: "Onze biologische aardappelen worden geteeld zonder chemische gewasbescherming of kunstmest, volledig in lijn met de SKAL-richtlijnen. Duurzame teelt voor een gezondere bodem en een schoner product voor de consument.",
    details: [
      { label: "Certificering", value: "SKAL gecertificeerd" },
      { label: "Teeltmethode", value: "Zonder chemische bestrijdingsmiddelen of kunstmest" },
      { label: "Rassen", value: "Op aanvraag — beperkt maar groeiend aanbod" },
      { label: "Seizoen", value: "Beperkt seizoensaanbod" },
      { label: "Prijsklasse", value: "Meerprijs van toepassing t.o.v. gangbare teelt" },
    ],
  },
];

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
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
            src={`${import.meta.env.BASE_URL}images/hero-potatoes.jpg`}
            alt="Aardappeloogst - Smeets Maasbree" 
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
              <Leaf className="w-4 h-4 text-red-500" />
              <span>Familiebedrijf uit Maasbree</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Kwaliteits<wbr/>aardappelen <br/>
              <span className="text-red-500 italic">rechtstreeks</span> van het veld
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
              Aardappel Handel Smeets levert al generaties lang de beste aardappelen voor consumptie, landbouw en industrie. Vertrouwd, lokaal en puur natuur.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <a href="#products" className="btn-animate px-8 py-4 rounded-xl font-semibold bg-red-600 text-white shadow-xl shadow-red-900/30 text-center">
                Bekijk Assortiment
              </a>
              <a href="#contact" className="btn-animate px-8 py-4 rounded-xl font-semibold bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 text-center">
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
                <div className="absolute bottom-4 right-4 bg-white px-4 py-3 rounded-xl shadow-lg border border-border flex items-center gap-3">
                  <div>
                    <p className="text-foreground font-serif text-lg font-bold leading-tight">Mat Smeets</p>
                    <p className="text-primary text-sm font-medium">Mede-eigenaar</p>
                  </div>
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
            {products.map((product, i) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1 }}
                onClick={() => setSelectedProduct(product)}
                className="bg-card rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">{product.badge}</div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-serif font-bold text-foreground mb-2">{product.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{product.shortDesc}</p>
                  <ul className="space-y-2 mb-4">
                    {product.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Meer informatie <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.button>
            ))}
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
                      <a href="tel:+31774652200" className="hover:text-primary transition-colors">077 465 22 00</a><br/>
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
                      <a href="mailto:info@gebrsmeets.nl" className="hover:text-primary transition-colors">info@gebrsmeets.nl</a>
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
                  className="btn-animate w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                    {selectedProduct.badge}
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-white mt-2">
                    {selectedProduct.title}aardappelen
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                <p className="text-muted-foreground text-base leading-relaxed mb-8">
                  {selectedProduct.fullDesc}
                </p>

                <div className="space-y-3 mb-8">
                  {selectedProduct.details.map((d) => (
                    <div key={d.label} className="flex gap-3 pb-3 border-b border-border last:border-0">
                      <span className="text-sm font-bold text-foreground w-32 shrink-0">{d.label}</span>
                      <span className="text-sm text-muted-foreground">{d.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href="#contact"
                    onClick={() => setSelectedProduct(null)}
                    className="btn-animate flex-1 py-3 px-6 rounded-xl font-semibold bg-primary text-primary-foreground text-center"
                  >
                    Offerte Aanvragen
                  </a>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="btn-animate py-3 px-6 rounded-xl font-semibold border border-border text-foreground hover:bg-background transition-colors"
                  >
                    Sluiten
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
