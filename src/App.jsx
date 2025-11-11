import React, { useState, useEffect, useCallback } from 'react';

// URL del logo de Dynnamo
const DYNNAMO_LOGO_URL = 'https://dynnamo.com/images/Copia%20de%20DYNNAMO%20LOGOTIPO%2002.png';

// --- ESTILOS DE GRADIENTE Y ANIMACIÓN AOS ---
const CustomStyles = () => (
    <style jsx="true">{`
        .accent-gradient {
            background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
        }

        /* Estilos para la animación "Animate On Scroll" (AOS) */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                        transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-on-scroll.loaded {
            opacity: 1;
            transform: translateY(0);
        }
        .animate-delay-1 { transition-delay: 0.1s; }
        .animate-delay-2 { transition-delay: 0.2s; }
        .animate-delay-3 { transition-delay: 0.3s; }
        .animate-delay-4 { transition-delay: 0.4s; }
    `}</style>
);


// ----------------------------------------------------------------------
// --- COMPONENTE: EMBED DE UNICORN STUDIO ---
// ----------------------------------------------------------------------
const UnicornStudioEmbed = () => {
    useEffect(() => {
        if (!window.UnicornStudio) {
            window.UnicornStudio = { isInitialized: false };
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js";
            
            script.onload = function() {
                if (!window.UnicornStudio.isInitialized) {
                    if(window.UnicornStudio.init) {
                       window.UnicornStudio.init();
                       window.UnicornStudio.isInitialized = true;
                    }
                }
            };
            
            document.head.appendChild(script);
        }
    }, []);

    return (
        <div 
            data-us-project="Lsh3KNRmavdVzclnWuKh" 
            className="absolute inset-0 z-0 opacity-40 transition-opacity duration-1000" 
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }} 
        ></div>
    );
};


// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
export const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Función para manejar el scroll suave
    const handleNavigation = useCallback((e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false); 
        }
    }, []);

    // Hook para implementar la lógica de "Animate On Scroll"
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.loaded)');
        animatedElements.forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Datos de navegación
    const navItems = [
        { id: 'inicio', label: 'Inicio' },
        { id: 'servicios', label: 'Servicios' },
        { id: 'ventajas', label: 'Ventajas' },
    ];


    // Componente de navegación
    const Header = () => (
        <header className="sticky top-0 z-50 bg-[#0d1117]/95 backdrop-blur-sm shadow-lg shadow-black/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex justify-between items-center h-16">
                    <a href="#inicio" onClick={(e) => handleNavigation(e, 'inicio')} className="flex items-center">
                        <img src={DYNNAMO_LOGO_URL} alt="Dynnamo Logo" className="h-8 md:h-9" 
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/120x36/0d1117/06b6d4?text=DYNNAMO"; }} 
                        />
                    </a>

                    <div className="hidden md:flex space-x-8 items-center">
                        {navItems.map(item => (
                            <a 
                                key={item.id} 
                                href={`#${item.id}`} 
                                onClick={(e) => handleNavigation(e, item.id)}
                                className="text-gray-300 hover:text-cyan-400 transition duration-300 ease-in-out font-medium"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a href="#contacto" onClick={(e) => handleNavigation(e, 'contacto')} className="py-1 px-4 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition duration-300 ease-in-out">
                            Contacto
                        </a>
                    </div>

                    <button 
                        id="mobile-menu-button" 
                        className="md:hidden text-gray-300 hover:text-cyan-400 focus:outline-none" 
                        aria-label="Abrir menú de navegación"
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </nav>
            </div>
            {/* Menú Móvil */}
            <div id="mobile-menu" className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-[#0d1117]`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                    {navItems.map(item => (
                         <a 
                            key={`mobile-${item.id}`} 
                            href={`#${item.id}`} 
                            onClick={(e) => handleNavigation(e, item.id)}
                            className="text-gray-300 hover:bg-gray-800 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium w-full text-center"
                        >
                            {item.label}
                        </a>
                    ))}
                    <a href="#contacto" onClick={(e) => handleNavigation(e, 'contacto')} className="w-full text-center mt-2">
                        <span className="block py-2 px-4 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition duration-300 ease-in-out">Contacto</span>
                    </a>
                </div>
            </div>
        </header>
    );

    // Componente de Tarjeta de Servicio
    const ServiceCard = ({ iconPath, title, description, border, delay, listItems }) => (
        <article className={`bg-gray-800 p-8 rounded-xl shadow-2xl border-t-4 ${border} transform hover:shadow-cyan-900 transition duration-300 ease-in-out animate-on-scroll animate-delay-${delay}`}>
            <div className={`text-${border.split('-')[2]}-400 mb-4`}>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-400">{description}</p>
            <ul className="list-disc list-inside text-gray-400 mt-4 space-y-1 text-sm">
                {listItems.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </article>
    );
    
    // Componente de Ventaja Competitiva
    const AdvantageItem = ({ number, title, description, delay }) => (
        <div className={`p-6 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700/50 transition duration-300 animate-on-scroll animate-delay-${delay}`}>
            <div className="text-3xl text-cyan-400 mb-3 font-semibold">{number}.</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    );


    return (
        <div className="font-sans antialiased bg-[#0d1117] text-white min-h-screen">
            <CustomStyles />
            <Header />

            <main>
                {/* Sección Hero (Inicio) - CON EMBED DE UNICORN STUDIO Y LOGO DE DYNNAMO */}
                <section id="inicio" className="relative overflow-hidden py-24 sm:py-32 lg:py-40 bg-gray-900 border-b border-gray-800">
                    
                    {/* Componente de Embed de Unicorn Studio */}
                    <UnicornStudioEmbed />

                    {/* Contenido del Hero (Z-index 20 para estar sobre el embed) */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20"> 
                        <p className="text-sm sm:text-base font-semibold text-cyan-400 mb-4 uppercase tracking-widest animate-on-scroll loaded">
                            Soluciones Empresariales Innovadoras
                        </p>
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter mb-6 animate-on-scroll loaded">
                            Software a Medida para impulsar tu
                            <span className="accent-gradient block">Eficiencia Digital</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 animate-on-scroll loaded">
                            En Dynnamo, convertimos tu visión de negocio en aplicaciones robustas, escalables y fáciles de usar, siguiendo los más altos estándares de calidad.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-on-scroll loaded">
                            <a 
                                href="#servicios" 
                                onClick={(e) => handleNavigation(e, 'servicios')}
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg shadow-lg text-white bg-cyan-600 hover:bg-cyan-700 transition duration-300 ease-in-out transform hover:scale-[1.02] z-30"
                            >
                                Explora Nuestros Servicios
                            </a>
                            <a 
                                href="#contacto" 
                                onClick={(e) => handleNavigation(e, 'contacto')}
                                className="inline-flex items-center justify-center px-8 py-3 border border-cyan-500 text-base font-semibold rounded-lg shadow-lg text-cyan-400 bg-transparent hover:bg-gray-800 transition duration-300 ease-in-out z-30"
                            >
                                Solicita un Diagnóstico Gratuito
                            </a>
                        </div>
                    </div>

                    {/* LOGO DE DYNNAMO PARA TAPAR EL LOGO DE UNICORN STUDIO */}
                    {/* Ajusta 'bottom-5' y 'left-1/2 transform -translate-x-1/2' según necesites */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center bg-gray-800 px-4 py-2 rounded-lg w-48">
                        <img 
                            src={DYNNAMO_LOGO_URL} 
                            alt="Dynnamo Logo" 
                            className="h-6 sm:h-7 m-auto  " 
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/90x28/0d1117/06b6d4?text=DYNNAMO"; }}
                        />
                       
                    </div>
                    {/* FIN DEL LOGO DYNNAMO */}

                </section>

                {/* Sección de Servicios */}
                <section id="servicios" className="py-20 sm:py-28 lg:py-36">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-4 animate-on-scroll">
                                Nuestros Servicios Estratégicos
                            </h2>
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-on-scroll animate-delay-1">
                                Te acompañamos en cada fase del ciclo de vida del software, desde la concepción hasta la implementación y soporte continuo.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            <ServiceCard
                                iconPath="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                title="Desarrollo de Software a Medida"
                                description="Creamos sistemas robustos, escalables y optimizados que se adaptan con precisión a tus procesos de negocio, utilizando tecnologías modernas y de vanguardia."
                                border="border-cyan-500"
                                delay={2}
                                listItems={["Modelos Ágiles (Scrum)", "Integración de Sistemas Existentes", "Arquitecturas Microservicios"]}
                            />
                            <ServiceCard
                                iconPath="M12 4.354a4 4 0 010 5.292c.791.956 1.344 1.838 1.488 2.822C13.633 13.91 13 14.887 13 16h-2c0-1.113-.633-2.09-1.512-2.532-.144-.984-.697-1.866-1.488-2.822a4 4 0 010-5.292V4.354zM18 16c0 3.314-4 6-6 6s-6-2.686-6-6h12z"
                                title="Diseño Centrado en el Usuario (UX/UI)"
                                description="Diseñamos soluciones pensando primero en las personas. Garantizamos una experiencia intuitiva, amigable y eficiente para tus usuarios finales."
                                border="border-blue-500"
                                delay={3}
                                listItems={["Análisis de Usabilidad y Flujos", "Prototipado de Alta Fidelidad", "Interfaces Modernas y Atractivas"]}
                            />
                            <ServiceCard
                                iconPath="M15 7a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4zM17 17v4m-2-4h4"
                                title="Diagnóstico y Análisis de Sistemas"
                                description="Evaluamos tus procesos y sistemas actuales para identificar áreas de mejora, riesgos tecnológicos y oportunidades claras de innovación."
                                border="border-green-500"
                                delay={4}
                                listItems={["Auditoría de Procesos Digitales", "Estudio de Viabilidad de Proyectos", "Ruta de Modernización Tecnológica"]}
                            />
                        </div>
                    </div>
                </section>

                <section id="ventajas" className="py-20 sm:py-28 lg:py-36 bg-gray-900 border-t border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-4 animate-on-scroll">
                                ¿Por Qué Elegir Dynnamo?
                            </h2>
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-on-scroll animate-delay-1">
                                Nuestra promesa se basa en la calidad, la transparencia y el compromiso con tu éxito a largo plazo.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AdvantageItem number="01" title="Tecnología de Vanguardia" description="Nos mantenemos a la vanguardia, garantizando que tu solución se construya con las tecnologías más modernas y sólidas del mercado." delay={2} />
                            <AdvantageItem number="02" title="Resultados Tangibles" description="Nuestro enfoque es generar un impacto real en tu negocio: más eficiencia, mayor productividad y un claro retorno de inversión." delay={3} />
                            <AdvantageItem number="03" title="Estándares de Calidad" description="Seguimos modelos ágiles y rigurosos (como Scrum) para asegurar sistemas escalables, robustos y con bajos índices de error." delay={4} />
                            <AdvantageItem number="04" title="Soporte Continuo" description="No solo desarrollamos; te acompañamos con mantenimiento y soporte técnico experto para el crecimiento continuo de tu sistema." delay={2} />
                        </div>
                    </div>
                </section>

                {/* Sección de Llamada a la Acción/Contacto */}
                <section id="contacto" className="py-20 sm:py-28 lg:py-36">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gray-800 p-8 sm:p-12 lg:p-16 rounded-3xl shadow-2xl shadow-cyan-900/50 text-center animate-on-scroll animate-delay-1">
                            <h2 className="text-4xl font-extrabold text-white mb-4">
                                ¿Listo para Digitalizar el Éxito de tu Empresa?
                            </h2>
                            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                                Agenda una reunión con nuestro equipo de consultoría. Te ayudaremos a trazar la ruta tecnológica para tu próximo gran proyecto.
                            </p>
                            <a href="mailto:info@dynnamo.com" className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-full shadow-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.05] focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50">
                                Conversemos Hoy
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Pie de Página */}
            <footer className="bg-gray-900 border-t border-gray-800 mt-12 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 animate-on-scroll animate-delay-1">
                        <div>
                            <a href="#inicio" onClick={(e) => handleNavigation(e, 'inicio')} className="flex items-center">
                                <img src={DYNNAMO_LOGO_URL} alt="Dynnamo Logo" className="h-8 md:h-9" 
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/120x36/0d1117/06b6d4?text=DYNNAMO"; }}
                                />
                            </a>
                            <p className="text-gray-400 text-sm mt-4">
                                Impulsando la productividad empresarial con software a medida desde Bahía Blanca, Argentina.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Mapa del Sitio</h4>
                            <ul className="space-y-2 text-sm">
                                {navItems.map(item => (
                                    <li key={`footer-${item.id}`}>
                                        <a 
                                            href={`#${item.id}`} 
                                            onClick={(e) => handleNavigation(e, item.id)}
                                            className="text-gray-400 hover:text-cyan-400 transition duration-200"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Enfoque</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Desarrollo Ágil</li>
                                <li>UX/UI Profesional</li>
                                <li>Consultoría de Sistemas</li>
                                <li>Soporte Técnico Especializado</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Oficina Principal</h4>
                            <address className="text-gray-400 text-sm not-italic space-y-2">
                                <p>Bahía Blanca, Argentina</p>
                                <p>12 de Octubre 53 Piso 2</p>
                                <p>Tel: +54 291 4439898</p>
                                <a href="mailto:info@dynnamo.com" className="hover:text-cyan-400 transition duration-200">info@dynnamo.com</a>
                            </address>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-6 mt-6 text-center text-sm text-gray-500">
                        <p>&copy; 2025 Dynnamo. Todos los derechos reservados.</p>
                        <p className="mt-1">Desarrollado con React y Tailwind CSS.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;