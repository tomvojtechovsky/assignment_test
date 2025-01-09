// Technologies.tsx
export default function Technologies() {
    return (
        <section className="bg-type-flow/10 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Technologie za MIDARAI
                </h2>

                <p className="text-lg sm:text-xl text-gray-600 mb-8 text-center">
                    MIDARAI využívá pokročilé modely umělé inteligence a moderní přístupy
                    k detekci anomálií v síťovém provozu.
                    <br />
                    Kombinace různých datových zdrojů zajišťuje komplexní a efektivní monitorování.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-type-syslog/20 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Pokročilé modely umělé inteligence
                        </h3>
                        <p className="text-gray-600">
                            MIDARAI využívá umělou inteligenci pro detekci vzorců chování v síťovém provozu. Pomocí prediktivní analýzy a strojového učení je schopný předvídat potenciální hrozby a minimalizovat rizika.
                        </p>
                    </div>
                    <div className="bg-type-flow/20 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            Kombinace více datových zdrojů
                        </h3>
                        <p className="text-gray-800">
                            MIDARAI spojuje různé datové zdroje, jako jsou Syslog a Dataflow, aby poskytl
                            komplexní analýzu síťového provozu. Tento přístup zajišťuje přesnější detekci anomálií a efektivnější reakci na bezpečnostní incidenty.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Díky těmto pokročilým technologiím nabízí MIDARAI vysokou úroveň ochrany, která je schopna detekovat a reagovat na hrozby v reálném čase, čímž zajišťuje bezpečnost vaší infrastruktury.
                    </p>
                </div>
            </div>
        </section>
    );
}
