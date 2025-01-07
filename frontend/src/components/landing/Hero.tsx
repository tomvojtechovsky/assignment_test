import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import cyberflowBg from '../../assets/images/cyberflow.webp';

export default function HeroSection() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="relative min-h-[600px] md:h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background s překryvem */}
            <div className="absolute inset-0">
                <img
                    src={cyberflowBg}
                    alt="CyberFlow Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                    CyberFlow
                </h1>

                <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-6 max-w-2xl mx-auto">
                    Pokročilá detekce síťových hrozeb v reálném čase. 
                    Analyzuje a monitoruje infrastrukturu pomocí inteligentních algoritmů.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    {!isAuthenticated && (
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-6 py-2 bg-type-all text-white rounded-lg 
                            hover:bg-type-all/90 transition-colors font-medium"
                        >
                            Přihlásit se
                        </Link>
                    )}

                    <Link
                        to="/dashboard"
                        className="w-full sm:w-auto px-6 py-2 bg-white text-gray-900 rounded-lg 
                        hover:bg-gray-100 transition-colors font-medium"
                    >
                        Zobrazit dashboard
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    {[
                        { 
                            main: "2 typy", 
                            sub: "Syslog & Dataflow" 
                        },
                        { 
                            main: "7 kategorií", 
                            sub: "Útoků" 
                        },
                        { 
                            main: "Real-time", 
                            sub: "Monitoring" 
                        }
                    ].map((metric, index) => (
                        <div key={index} className="text-center bg-white/10 p-3 rounded-lg">
                            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                                {metric.main}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-300">
                                {metric.sub}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}