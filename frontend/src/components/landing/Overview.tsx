// Overview.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt,
  faSearch, 
  faChartBar 
} from '@fortawesome/free-solid-svg-icons';

export default function Overview() {
  const features = [
    {
      title: "Pokročilá detekce anomálií",
      description: "MIDARAI využívá umělou inteligenci pro detekci vzorců chování v síťovém provozu a identifikaci potenciálních hrozeb v reálném čase.",
      icon: faShieldAlt
    },
    {
      title: "Komplexní analýza dat",
      description: "Spojuje různé typy datových zdrojů, což umožňuje komplexní pohled na síťový provoz a přesnější detekci hrozeb.",
      icon: faSearch
    },
    {
      title: "Rychlá reakce na incidenty",
      description: "Software je navržen tak, aby okamžitě reagoval na zjištěné hrozby a minimalizoval potenciální rizika pro infrastrukturu.",
      icon: faChartBar
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Klíčové funkce MIDARAI
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
            MIDARAI poskytuje komplexní řešení pro detekci a analýzu síťových hrozeb, které kombinuje pokročilé algoritmy a různé datové zdroje pro maximální účinnost a rychlost reakce.
          </p>
        </div>
      </div>
    </section>
  );
}
