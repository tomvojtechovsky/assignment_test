// src/components/landing/Overview.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserSecret,
  faChartLine, 
  faMagnifyingGlassChart 
} from '@fortawesome/free-solid-svg-icons';

export default function Overview() {
  const features = [
    {
      title: "Monitoring & Detekce",
      description: "Sledování Syslog a Dataflow v reálném čase. Automatická detekce a klasifikace bezpečnostních hrozeb s okamžitým upozorněním.",
      icon: faUserSecret
    },
    {
      title: "Analýza & Vizualizace",
      description: "Interaktivní grafy a statistiky poskytují okamžitý přehled o stavu vaší sítě. Sledování trendů a identifikace potenciálních rizik.",
      icon: faChartLine
    },
    {
      title: "Pokročilá Analýza",
      description: "Využití pokročilých algoritmů pro detekci vzorců chování. Prediktivní analýza pro včasnou identifikaci bezpečnostních hrozeb.",
      icon: faMagnifyingGlassChart
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Komplexní bezpečnostní monitoring
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-lg p-8 
                        transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-16 h-16 
                            bg-type-all/10 rounded-lg mb-6 mx-auto">
                <FontAwesomeIcon 
                  icon={feature.icon} 
                  className="h-8 w-8 text-type-all"
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            CyberFlow poskytuje komplexní řešení pro monitoring a analýzu 
            síťového provozu. Přihlaste se a získejte detailní přehled o 
            bezpečnosti vaší infrastruktury.
          </p>
        </div>
      </div>
    </section>
  );
}