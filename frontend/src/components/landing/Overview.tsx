// Overview.tsx

export default function Overview() {
    const features = [
      {
        title: "Monitoring",
        description: "Sledujeme datové zprávy v reálném čase a poskytujeme podrobné informace o jejich obsahu.",
        icon: "📡",
      },
      {
        title: "Analýza",
        description: "Dashboard vizualizuje hrozby, detekce a jejich distribuci v časových intervalech.",
        icon: "📊",
      },
      {
        title: "Bezpečnost",
        description: "Zajišťujeme bezpečný přístup pouze ověřeným uživatelům pro lepší ochranu dat.",
        icon: "🔒",
      },
    ];
  
    return (
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Co aplikace nabízí?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  