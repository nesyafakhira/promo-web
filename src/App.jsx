import React, { useState, useEffect } from 'react';
import { 
    ShoppingBag, Plus, Minus, X, ArrowLeft, CheckCircle, 
    Phone, ChefHat, MessageCircle, Download, Check 
} from 'lucide-react';

// --- IMPORT GAMBAR DARI FOLDER ASSETS ---
import imgCarbonara from './assets/pasta-carbonara.png';
import imgBolognese from './assets/pasta-bolognese.png';
import imgCheesecake from './assets/cheesecake-oreo.jpeg';
import imgIcetea from './assets/ice-tea.png';
import imgLychee from './assets/lychee-tea.png';
import imgBundling1 from './assets/bundling-1.png'; 
import imgBundling2 from './assets/bundling-2.png';
import imgHero from './assets/hero.png';
import imgQris from './assets/qris.jpeg'; 
import imgLogo from './assets/logo.jpeg';

// --- DATA ---
const MENUS = [
    { id: 'm1', name: 'Pasta Carbonara', price: 18000, desc: 'Saus creamy lembut, gurih khas Italia dengan taburan keju melimpah.', badge: 'Paling Dicari', 
      imgPlaceholder: <img src={imgCarbonara} alt="Carbonara" className="w-full h-full object-cover" /> },
    { id: 'm2', name: 'Pasta Bolognese', price: 18000, desc: 'Saus tomat rempah dipadukan daging cincang kaya rasa. Ramah di perut lapar.', badge: null, 
      imgPlaceholder: <img src={imgBolognese} alt="Bolognese" className="w-full h-full object-cover" /> },
    { id: 'm3', name: 'Cheesecake Oreo', price: 13000, desc: 'Layer oreo utuh berpadu cream cheese lumer. Perfect mood booster!', badge: '⭐ Bintang 5', 
      imgPlaceholder: <img src={imgCheesecake} alt="Cheesecake" className="w-full h-full object-cover" /> },
    { id: 'm4', name: 'Lychee Tea', price: 8000, desc: 'Kesegaran teh pilihan dipadukan dengan buah leci asli yang manis.', badge: 'Menyegarkan', 
      imgPlaceholder: <img src={imgLychee} alt="Lychee Tea" className="w-full h-full object-cover" /> },
    { id: 'm5', name: 'Ice Tea', price: 5000, desc: 'Teh manis dingin klasik yang segar. Pas banget untuk pelepas dahaga.', badge: null, 
      imgPlaceholder: <img src={imgIcetea} alt="Ice Tea" className="w-full h-full object-cover" /> }
];

const BUNDLINGS = [
    { 
        id: 'b1', 
        name: 'Bundling 1', 
        desc: '1x Pasta Bolognese + 1x Ice Tea Segar', 
        oldPrice: 23000, 
        price: 20000, 
        badge: 'HEMAT 3K', 
        imgPlaceholder: <img src={imgBundling1} alt="Bundling 1" className="w-full h-full object-cover" /> 
    },
    { 
        id: 'b2', 
        name: 'Bundling 2', 
        desc: '1x Pasta Carbonara + 1x Ice Tea Segar', 
        oldPrice: 23000, 
        price: 20000, 
        badge: 'FAVORIT SEMUA ORANG', 
        imgPlaceholder: <img src={imgBundling2} alt="Bundling 2" className="w-full h-full object-cover" /> 
    }
];

const PICKUP_DATES = [
    'Selasa, 5 Mei 2026', 
    'Rabu, 6 Mei 2026', 
    'Kamis, 7 Mei 2026'
];

export default function App() {
    const [page, setPage] = useState('home'); // 'home', 'checkout', 'success'
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [orderData, setOrderData] = useState({ name: '', date: '' });

    // Animasi Scroll Reveal
    useEffect(() => {
        const handleScroll = () => {
            const reveals = document.querySelectorAll(".reveal");
            const windowHeight = window.innerHeight;
            reveals.forEach(reveal => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - 80) {
                    reveal.classList.add("active");
                }
            });
        };
        if (page === 'home') {
            window.addEventListener("scroll", handleScroll);
            handleScroll(); // Trigger awal
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page]);

    // Cart Logic
    const addToCart = (item) => {
        const exist = cart.find(x => x.id === item.id);
        if (exist) {
            setCart(cart.map(x => x.id === item.id ? { ...exist, qty: exist.qty + 1 } : x));
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
        setSelectedItem(null); 
        setIsCartOpen(true); 
    };

    const updateQty = (id, amount) => {
        const exist = cart.find(x => x.id === id);
        if (exist.qty === 1 && amount === -1) {
            setCart(cart.filter(x => x.id !== id));
        } else {
            setCart(cart.map(x => x.id === id ? { ...exist, qty: exist.qty + amount } : x));
        }
    };

    const formatRp = (num) => "Rp " + num.toLocaleString('id-ID');
    const totalItems = cart.reduce((a, c) => a + c.qty, 0);
    const totalPrice = cart.reduce((a, c) => a + (c.price * c.qty), 0);

    return (
        <div className="font-sans text-[#2D2D2D] bg-[#F9F6F0] min-h-screen flex flex-col relative overflow-x-hidden">
            {/* INJECTED STYLES FOR FONTS AND ANIMATIONS */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600&display=swap');
                .brand-font { font-family: 'Playfair Display', serif; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #E6C287; border-radius: 10px; }
                
                .marquee-container { display: flex; overflow: hidden; white-space: nowrap; }
                .marquee-content { display: flex; animation: marquee 15s linear infinite; }
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
                
                .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
                .reveal.active { opacity: 1; transform: translateY(0); }
                
                @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
                .animate-slide-in { animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
                
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
            `}</style>

            {/* NAVBAR */}
            <header className="fixed w-full top-0 bg-[#F9F6F0]/90 backdrop-blur-md z-40 border-b border-[#E6C287]/30 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                    {/* LOGO */}
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {setPage('home'); window.scrollTo(0,0);}}>
                        
                        {/* KOTAK LOGO BARU */}
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-sm group-hover:scale-105 transition transform border-2 border-[#E6C287]/50">
                            <img 
                                src={imgLogo} 
                                alt="Logo Chef's Kiss" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        
                        <h1 className="font-bold text-2xl md:text-3xl brand-font text-[#8A151B]">Chef's Kiss</h1>
                    </div>
                    
                    {/* MENU DESKTOP */}
                    {page === 'home' && (
                        <nav className="hidden md:flex space-x-8">
                            <a href="#home" className="text-[#2D2D2D] hover:text-[#8A151B] font-medium transition">Home</a>
                            <a href="#promo" className="text-[#2D2D2D] hover:text-[#8A151B] font-medium transition">Bundling</a>
                            <a href="#menu" className="text-[#2D2D2D] hover:text-[#8A151B] font-medium transition">Menu Utama</a>
                            <a href="#social" className="text-[#2D2D2D] hover:text-[#8A151B] font-medium transition">Social</a>
                        </nav>
                    )}

                    {/* KERANJANG BUTTON */}
                    <div className="flex items-center gap-4">
                        {page !== 'home' && (
                            <button onClick={() => setPage('home')} className="hidden sm:block text-sm font-semibold text-[#2D2D2D]/70 hover:text-[#8A151B] transition">Beranda</button>
                        )}
                        <button onClick={() => setIsCartOpen(true)} className="relative flex items-center gap-2 bg-white border border-[#E6C287]/50 px-4 py-2 rounded-full hover:bg-[#E6C287]/10 transition shadow-sm group">
                            <ShoppingBag className="w-5 h-5 text-[#2D2D2D] group-hover:text-[#8A151B] transition" />
                            <span className="hidden sm:inline font-bold text-[#2D2D2D] group-hover:text-[#8A151B] transition">Keranjang</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#8A151B] text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">{totalItems}</span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* ROUTING HALAMAN */}
            <main className="flex-grow pt-20">
                {page === 'home' && (
                    <HomePage MENUS={MENUS} BUNDLINGS={BUNDLINGS} formatRp={formatRp} setSelectedItem={setSelectedItem} />
                )}
                {page === 'checkout' && (
                    <CheckoutPage cart={cart} totalPrice={totalPrice} formatRp={formatRp} orderData={orderData} setOrderData={setOrderData} setPage={setPage} />
                )}
                {page === 'success' && (
                    <SuccessPage cart={cart} totalPrice={totalPrice} formatRp={formatRp} orderData={orderData} setPage={setPage} setCart={setCart} />
                )}
            </main>

            {/* MODAL POP UP DETAIL MENU */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}></div>
                    <div className="bg-white rounded-[2rem] overflow-hidden max-w-sm w-full relative z-10 shadow-2xl">
                        <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full p-2 text-[#2D2D2D] hover:text-[#8A151B] z-20 shadow-sm">
                            <X size={20} />
                        </button>
                        
                        <div className="h-56 bg-[#E6C287]/20 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                            <div className="text-[#2D2D2D]/40 text-sm font-medium z-0">{selectedItem.imgPlaceholder}</div>
                            {selectedItem.badge && (
                                <span className="absolute top-4 left-4 z-20 bg-[#8A151B] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">{selectedItem.badge}</span>
                            )}
                        </div>
                        
                        <div className="p-6 relative z-20 -mt-6 bg-white rounded-t-3xl">
                            <h3 className="text-2xl font-bold brand-font text-[#2D2D2D] mb-1">{selectedItem.name}</h3>
                            <p className="text-[#8A151B] font-bold text-xl mb-3">{formatRp(selectedItem.price)}</p>
                            <p className="text-sm text-[#2D2D2D]/70 mb-6 leading-relaxed">{selectedItem.desc}</p>
                            <button onClick={() => addToCart(selectedItem)} className="w-full bg-[#8A151B] text-white py-3.5 rounded-xl font-bold hover:bg-[#8A151B]/90 transition shadow-lg flex items-center justify-center gap-2">
                                Konfirmasi Tambah <Check size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SIDEBAR KERANJANG */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
                    
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
                        <div className="p-5 border-b border-[#E6C287]/30 flex justify-between items-center bg-[#F9F6F0] z-10">
                            <h2 className="text-xl font-bold brand-font text-[#8A151B] flex items-center gap-2">
                                <ShoppingBag className="w-6 h-6" /> Keranjang ({totalItems})
                            </h2>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 text-[#2D2D2D]/50 hover:text-[#8A151B] bg-white rounded-full shadow-sm transition">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50">
                            {cart.length === 0 ? (
                                <div className="text-center text-[#2D2D2D]/40 mt-32 flex flex-col items-center">
                                    <ShoppingBag className="w-20 h-20 mb-4 opacity-30" />
                                    <p className="font-medium">Keranjangmu masih kosong nih.</p>
                                    <button onClick={() => setIsCartOpen(false)} className="mt-4 text-[#8A151B] font-bold underline">Yuk Pilih Menu</button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex gap-4 mb-4 bg-white p-3 rounded-2xl shadow-sm border border-[#E6C287]/20 items-center">
                                        <div className="w-16 h-16 bg-[#E6C287]/10 rounded-xl shrink-0 border border-[#E6C287]/20 overflow-hidden">
                                            {item.imgPlaceholder}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-[#2D2D2D] leading-tight mb-1">{item.name}</h4>
                                            <p className="text-[#8A151B] font-bold text-sm">{formatRp(item.price)}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-3 shrink-0">
                                            <button onClick={() => updateQty(item.id, -item.qty)} className="text-[#2D2D2D]/30 hover:text-red-500 transition">
                                                <X size={16} />
                                            </button>
                                            <div className="flex items-center gap-1 bg-[#F9F6F0] rounded-lg border border-[#E6C287]/30 p-1">
                                                <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-lg font-medium hover:bg-[#8A151B] hover:text-white transition"><Minus size={14}/></button>
                                                <span className="w-6 text-center text-sm font-bold text-[#2D2D2D]">{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-lg font-medium hover:bg-[#8A151B] hover:text-white transition"><Plus size={14}/></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-[#E6C287]/30 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                                <div className="flex justify-between font-bold text-lg mb-4 text-[#2D2D2D]">
                                    <span>Total Pesanan:</span>
                                    <span className="text-[#8A151B] text-xl">{formatRp(totalPrice)}</span>
                                </div>
                                <button onClick={() => { setIsCartOpen(false); setPage('checkout'); window.scrollTo(0,0); }} className="w-full bg-[#8A151B] text-white py-4 rounded-xl font-bold hover:bg-[#8A151B]/90 transition shadow-lg flex items-center justify-center gap-2 text-lg">
                                    Lanjut Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* FLOATING WA BUTTON */}
            {page === 'home' && (
                <a href="https://wa.me/6282171237157?text=Halo%20Admin%20Chef's%20Kiss!%20Saya%20mau%20tanya-tanya%20nih." target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-30 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center animate-bounce">
                    <MessageCircle size={28} />
                </a>
            )}

            {/* FOOTER */}
            <footer className="bg-[#2D2D2D] text-[#F9F6F0] pt-16 pb-8 border-t-[8px] border-[#8A151B] mt-auto">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold brand-font text-[#E6C287] mb-4">Chef's Kiss</h2>
                    <p className="text-[#F9F6F0]/70 text-sm md:text-base max-w-sm md:max-w-md mx-auto mb-8">Menyajikan kebahagiaan premium di setiap gigitan untuk mahasiswa!</p>
                    <div className="border-t border-[#F9F6F0]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs md:text-sm text-[#F9F6F0]/50">© 2026 Chef's Kiss. All rights reserved.</p>
                        <div className="flex gap-6 text-sm">
                            <a href="https://instagram.com/chefskisstory" target="_blank" rel="noreferrer" className="text-[#F9F6F0]/50 hover:text-[#E6C287] transition font-medium">Instagram</a>
                            <a href="https://wa.me/6282171237157" target="_blank" rel="noreferrer" className="text-[#F9F6F0]/50 hover:text-[#E6C287] transition font-medium">WhatsApp</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// --- SUB COMPONENTS ---

function HomePage({ MENUS, BUNDLINGS, formatRp, setSelectedItem }) {
    return (
        <div className="w-full">
            {/* HERO */}
            <section id="home" className="pt-8 pb-12 md:pt-20 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="flex-1 w-full relative z-10 reveal order-1 md:order-2">
                    <div className="absolute inset-0 bg-[#E6C287]/20 rounded-full blur-3xl transform scale-110 -z-10"></div>
                    <div className="relative w-full aspect-[4/3] md:aspect-square rounded-t-full rounded-bl-[4rem] rounded-br-2xl border-4 md:border-8 border-white shadow-xl md:shadow-2xl overflow-hidden bg-gray-100 flex items-center justify-center group">
                        <div className="w-full h-full bg-cover bg-center transition-transform duration-700 md:group-hover:scale-110 flex items-center justify-center">
                          <img 
                            src={imgHero} 
                            alt="Chef's Kiss Premium Pasta" 
                            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110" 
                        />
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-2 md:p-4 rounded-full shadow-lg animate-float-fast border border-[#E6C287]/30">
                        <div className="bg-[#8A151B] text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center font-bold">
                            <span className="text-[10px] md:text-xs">Sejak</span>
                            <span className="text-sm md:text-lg leading-none">2026</span>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 text-[#E6C287] text-3xl md:text-5xl animate-pulse">★</div>
                </div>

                <div className="flex-1 text-center md:text-left z-10 reveal order-2 md:order-1 mt-4 md:mt-0 relative">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 text-[#2D2D2D] brand-font">
                        Kenikmatan <span className="italic text-[#8A151B]">Premium</span>,<br/> Harga Mahasiswa.
                    </h1>
                    <p className="text-base md:text-lg text-[#2D2D2D]/80 mb-6 md:mb-8 max-w-xl mx-auto md:mx-0">
                        Nikmati creamy-nya pasta khas Italia dan manisnya Cheesecake Oreo. Praktis, nikmat, dan porsinya pas buat nemenin tugas!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                        <a href="#menu" className="w-full sm:w-auto bg-[#8A151B] text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-[#8A151B]/90 transition shadow-lg text-center transform md:hover:scale-105 duration-200">
                            Lihat Menu
                        </a>
                        <a href="#promo" className="w-full sm:w-auto bg-transparent border-2 border-[#E6C287] text-[#2D2D2D] px-8 py-3.5 rounded-full font-semibold text-base hover:bg-[#E6C287]/20 transition text-center flex items-center justify-center gap-2">
                            Cek Bundling
                        </a>
                    </div>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="bg-[#8A151B] text-[#F9F6F0] py-3 border-y-[3px] md:border-y-4 border-[#E6C287] relative">
                <div className="marquee-container">
                    <div className="marquee-content text-sm md:text-base font-bold uppercase tracking-widest items-center">
                        <span className="mx-4">★ CREAMY PASTA</span><span className="mx-4">★ REFRESHING LYCHEE TEA</span><span className="mx-4">★ SWEET CHEESECAKE OREO</span><span className="mx-4">★ MAHASISWA BUDGET</span>
                    </div>
                    <div className="marquee-content text-sm md:text-base font-bold uppercase tracking-widest items-center" aria-hidden="true">
                        <span className="mx-4">★ CREAMY PASTA</span><span className="mx-4">★ REFRESHING LYCHEE TEA</span><span className="mx-4">★ SWEET CHEESECAKE OREO</span><span className="mx-4">★ MAHASISWA BUDGET</span>
                    </div>
                </div>
            </div>

            {/* PROMO BUNDLING */}
            <section id="promo" className="py-16 md:py-24 bg-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-16 reveal">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#8A151B] brand-font mb-4">Best Deals!</h2>
                        <p className="text-base md:text-lg text-[#2D2D2D]/70 max-w-2xl mx-auto">Pilih paket hemat buat kenyang dengan harga yang ramah dikantong.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                        {BUNDLINGS.map((bundle, index) => (
                            <div key={bundle.id} className="border border-[#E6C287]/40 rounded-[2rem] overflow-hidden bg-[#F9F6F0] transform md:hover:-translate-y-2 transition duration-300 shadow-md hover:shadow-xl reveal group">
                                <div className="relative h-48 bg-gray-200 overflow-hidden flex items-center justify-center">
                                    <div className={`absolute top-0 right-0 z-10 ${index === 0 ? 'bg-[#8A151B] text-white animate-pulse' : 'bg-[#2D2D2D] text-[#E6C287]'} px-5 py-2 rounded-bl-2xl font-bold text-sm shadow-md`}>
                                        {bundle.badge}
                                    </div>
                                    <div className="text-[#2D2D2D]/40 text-sm font-medium transition-transform duration-500 group-hover:scale-105">{bundle.imgPlaceholder}</div>
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="text-2xl font-bold brand-font mb-2 text-[#2D2D2D]">{bundle.name}</h3>
                                    <p className="text-base text-[#2D2D2D]/70 mb-5 border-b border-[#E6C287]/40 pb-5">{bundle.desc}</p>
                                    <div className="flex items-end gap-3 mb-6">
                                        <span className="text-[#2D2D2D]/40 line-through text-sm">{formatRp(bundle.oldPrice)}</span>
                                        <span className="text-3xl font-bold text-[#8A151B]">{formatRp(bundle.price)}</span>
                                    </div>
                                    <button onClick={() => setSelectedItem(bundle)} className={`w-full py-3.5 rounded-xl font-bold transition shadow-sm flex justify-center items-center gap-2 text-base ${index === 0 ? 'bg-[#8A151B] text-white hover:bg-[#8A151B]/90' : 'bg-transparent border-2 border-[#8A151B] text-[#8A151B] hover:bg-[#8A151B] hover:text-white'}`}>
                                        Pesan Bundling <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MENU UTAMA */}
            <section id="menu" className="py-16 md:py-24 bg-[#F9F6F0] relative">
                <div className="absolute top-10 right-10 text-[#E6C287]/30 text-6xl hidden md:block">★</div>
                
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-10 md:mb-16 reveal">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#8A151B] brand-font mb-4">Eksplorasi Rasa</h2>
                        <p className="text-base md:text-lg text-[#2D2D2D]/70 max-w-2xl mx-auto">Dibuat dengan bahan berkualitas untuk rasa otentik yang pas di kantong.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {MENUS.map((menu) => (
                            <div key={menu.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E6C287]/30 group reveal flex flex-col relative">
                                <div className="relative h-56 bg-gray-100 overflow-hidden flex items-center justify-center shrink-0">
                                    <div className="text-[#2D2D2D]/40 text-sm font-medium transition-transform duration-500 group-hover:scale-105">{menu.imgPlaceholder}</div>
                                    {menu.badge && (
                                        <div className="absolute top-0 right-0 z-10 bg-[#E6C287] text-[#2D2D2D] font-bold px-3 py-1.5 rounded-bl-[1.5rem] shadow-md text-xs">
                                            {menu.badge}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-1 relative">
                                    <div className="flex justify-between items-start mb-2 pr-12">
                                        <h3 className="text-xl font-bold brand-font text-[#2D2D2D] leading-tight">{menu.name}</h3>
                                    </div>
                                    <p className="text-[#8A151B] font-bold text-xl mb-1">{formatRp(menu.price)}</p>
                                    <p className="text-sm text-[#2D2D2D]/70 mb-4 h-[2.5rem] line-clamp-2 pr-10">{menu.desc}</p>
                                    
                                    <button onClick={() => setSelectedItem(menu)} className="absolute bottom-6 right-6 w-12 h-12 bg-white border-2 border-[#8A151B] text-[#8A151B] rounded-full flex items-center justify-center text-2xl font-medium hover:bg-[#8A151B] hover:text-white transition-all shadow-md hover:scale-110 z-10">
                                        <Plus size={24} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INSTAGRAM SECTION */}
            {/* INSTAGRAM SECTION */}
            <section className="py-16 md:py-24 bg-white border-t border-[#E6C287]/20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-12 reveal">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#8A151B] brand-font mb-4" id="social">Ikuti Perjalanan Kami</h2>
                        <a href="https://instagram.com/chefskisstory" target="_blank" rel="noreferrer" className="text-[#2D2D2D]/60 hover:text-[#8A151B] transition font-medium text-base inline-flex items-center gap-2">
                            @chefskisstory 
                            {/* Logo IG diganti pakai SVG murni agar anti-error */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 reveal">
                        {[1, 2, 3, 4].map((item, index) => (
                            <div key={item} className={`w-32 h-32 md:w-56 md:h-56 bg-gray-200 rounded-2xl overflow-hidden group ${index === 3 ? 'hidden sm:block' : ''}`}>
                                <div className="w-full h-full bg-[#E6C287]/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                    <div className="text-[#2D2D2D]/40 text-xs md:text-sm font-medium">[IG Feed {item}]</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10 md:mt-14 reveal">
                        <a href="https://instagram.com/chefskisstory" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#2D2D2D] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#2D2D2D]/80 transition shadow-lg text-base">
                            Follow Instagram Kami 
                            {/* Logo IG diganti pakai SVG murni agar anti-error */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

// --- COMPONENT: CHECKOUT ---
function CheckoutPage({ cart, totalPrice, formatRp, orderData, setOrderData, setPage }) {
    useEffect(() => { window.scrollTo(0,0); }, []);

    const handlePay = () => {
        if(cart.length === 0) { alert("Keranjang kosong!"); return; }
        if(!orderData.name.trim() || !orderData.date) {
            alert("⚠️ Mohon isi Nama Lengkap dan pilih Tanggal Pengambilan terlebih dahulu!");
            return;
        }
        setPage('success');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 animate-fade-in">
            <button onClick={() => setPage('home')} className="text-[#2D2D2D]/60 hover:text-[#8A151B] mb-6 font-semibold flex items-center gap-2 transition text-sm">
                <ArrowLeft size={18} /> Kembali Belanja
            </button>
            
            <h2 className="text-3xl md:text-4xl font-bold brand-font text-[#2D2D2D] mb-8">Checkout Pesanan</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#E6C287]/40">
                        <h3 className="font-bold text-xl mb-6 text-[#8A151B] border-b border-[#E6C287]/20 pb-4">Informasi Pemesan</h3>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                            <input type="text" value={orderData.name} onChange={e => setOrderData({...orderData, name: e.target.value})} placeholder="Ketik namamu di sini..." className="w-full border border-[#E6C287]/50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#8A151B] outline-none bg-[#F9F6F0]/50 font-medium"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Pilih Tanggal Pengambilan <span className="text-red-500">*</span></label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {PICKUP_DATES.map(date => (
                                    <label key={date} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${orderData.date === date ? 'border-[#8A151B] bg-[#8A151B]/5 ring-1 ring-[#8A151B]' : 'border-gray-200 hover:border-[#E6C287] bg-white'}`}>
                                        <input type="radio" name="pickupDate" value={date} checked={orderData.date === date} onChange={e => setOrderData({...orderData, date: e.target.value})} className="mr-3 w-5 h-5 text-[#8A151B] focus:ring-[#8A151B] border-gray-300"/>
                                        <span className="text-sm font-bold text-[#2D2D2D]">{date}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-[#F9F6F0] p-6 md:p-8 rounded-3xl shadow-sm border border-[#E6C287] sticky top-28">
                        <h3 className="font-bold text-xl mb-6 text-[#8A151B] border-b border-[#E6C287]/30 pb-4">Ringkasan Bill</h3>
                        
                        <div className="space-y-4 mb-6 border-b border-[#E6C287]/30 pb-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm items-start gap-2">
                                    <span className="text-[#2D2D2D] font-medium leading-tight">
                                        <span className="text-[#8A151B] font-bold mr-1">{item.qty}x</span> {item.name}
                                    </span>
                                    <span className="font-semibold shrink-0">{formatRp(item.price * item.qty)}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center text-sm text-[#2D2D2D]/70">
                                <span>Total Item:</span>
                                <span className="font-bold">{cart.reduce((a, c) => a + c.qty, 0)} Porsi</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-[#2D2D2D]/70">
                                <span>Tanggal Ambil:</span>
                                <span className="font-bold text-right text-[#8A151B]">{orderData.date || '-'}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-6 border-t-2 border-[#E6C287] border-dashed mb-8">
                            <span className="font-bold text-base">Total Bayar</span>
                            <span className="font-bold text-2xl md:text-3xl text-[#8A151B]">{formatRp(totalPrice)}</span>
                        </div>

                        <button onClick={handlePay} className="w-full bg-[#8A151B] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#8A151B]/90 transition shadow-lg flex justify-center items-center gap-2">
                            Bayar Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- COMPONENT: SUCCESS PAGE ---
function SuccessPage({ cart, totalPrice, formatRp, orderData, setPage, setCart }) {
    useEffect(() => { window.scrollTo(0,0); }, []);

    const waNumber = "6282171237157";
    
    const handleWAConfirm = () => {
        let text = `Halo Admin Chef's Kiss! ✨\nSaya mau konfirmasi pesanan dari Website:\n\n👤 *Nama:* ${orderData.name}\n📆 *Tgl Ambil:* ${orderData.date}\n\n*Detail Pesanan:*\n`;
        cart.forEach(item => { text += `- ${item.qty}x ${item.name} = ${formatRp(item.price * item.qty)}\n`; });
        text += `\n💰 *Total Bayar:* ${formatRp(totalPrice)}\n\nSaya sudah scan QRIS, bukti transfer akan saya lampirkan. Terima kasih!`;
        window.open(`https://wa.me/${6282171237157}?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleDownloadQRIS = () => {
        // Membuat elemen link sementara
        const link = document.createElement('a');
        link.href = imgQris; // Mengambil gambar QRIS yang sudah di-import
        link.download = 'QRIS-Chefs-Kiss.png'; // Nama file saat tersimpan di HP/Laptop
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-md mx-auto px-4 py-12 text-center animate-fade-in">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle size={48} />
            </div>
            
            <h2 className="text-3xl font-bold brand-font text-[#2D2D2D] mb-2">Order Direkam!</h2>
            <p className="text-base text-[#2D2D2D]/70 mb-10">Selesaikan pembayaranmu dengan scan barcode QRIS di bawah ini.</p>

            <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-[#E6C287]/40 mb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#8A151B]"></div>
                
                <div className="w-64 h-64 mx-auto mb-6 flex items-center justify-center bg-white p-2 rounded-2xl border-2 border-[#E6C287]/50 shadow-md">
                    <img 
                        src={imgQris} 
                        alt="QRIS Pembayaran Chef's Kiss" 
                        className="w-full h-full object-contain" 
                    />
                </div>
                
                <p className="text-sm text-[#2D2D2D]/60 font-medium">Total Tagihan:</p>
                <p className="font-bold text-4xl text-[#8A151B] mb-1">{formatRp(totalPrice)}</p>
                <p className="text-xs font-bold text-[#2D2D2D]/40 uppercase tracking-widest mb-6">a.n Chef's Kiss</p>
                
                <button onClick={handleDownloadQRIS} className="text-sm font-bold text-[#8A151B] bg-[#8A151B]/10 px-8 py-3 rounded-full hover:bg-[#8A151B]/20 transition flex items-center justify-center gap-2 mx-auto">
                    <Download size={16}/> Simpan QRIS
                </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl mb-8 text-left text-sm text-yellow-800 shadow-sm">
                <p className="font-bold text-base mb-1">Tahap Terakhir: Wajib Konfirmasi!</p>
                <p className="leading-relaxed">Pesanan melalui web ini <strong className="text-yellow-900">baru diproses</strong> setelah bukti transfer dikirim via WhatsApp.</p>
            </div>

            <div className="space-y-4">
                <button onClick={handleWAConfirm} className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition shadow-xl flex items-center justify-center gap-3">
                    <MessageCircle size={24} /> Konfirmasi via WhatsApp
                </button>
                <button onClick={() => { setCart([]); setPage('home'); }} className="w-full bg-transparent text-[#2D2D2D]/60 py-4 rounded-2xl font-bold hover:bg-gray-100 hover:text-[#2D2D2D] transition flex items-center justify-center gap-2">
                    <ArrowLeft size={20} /> Kembali ke Halaman Utama
                </button>
            </div>
        </div>
    );
}