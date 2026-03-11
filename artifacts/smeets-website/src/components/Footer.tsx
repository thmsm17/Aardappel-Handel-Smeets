import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo.png`} 
                alt="Smeets Logo" 
                className="w-10 h-10 object-contain rounded-md bg-white p-1"
              />
              <span className="font-serif font-bold text-xl">Aardappel Handel Smeets</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed max-w-sm">
              Dé vertrouwde partner voor kwaliteitsaardappelen uit Limburg. 
              Al generaties lang een trots familiebedrijf in Maasbree.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-accent">Contactgegevens</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/90">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>Maasbree, Limburg<br/>Nederland</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/90">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+31 (0)77 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/90">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>info@smeets-aardappelen.nl</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-accent">Snelle Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-primary-foreground/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-primary-foreground/80 hover:text-white transition-colors">Over Ons</a></li>
              <li><a href="#products" className="text-primary-foreground/80 hover:text-white transition-colors">Producten</a></li>
              <li><a href="#contact" className="text-primary-foreground/80 hover:text-white transition-colors">Offerte Aanvragen</a></li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/60 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Aardappel Handel Smeets. Alle rechten voorbehouden.</p>
          <p>KVK: 12345678</p>
        </div>
      </div>
    </footer>
  );
}
