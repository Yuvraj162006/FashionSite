import React, { useState, useEffect } from 'react';
import { getAllProducts } from './data/allProducts';
import Navbar from './components/Navbar';
import Panel from './components/Panel';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import Sidebar from './components/Sidebar';
import ProductsGrid from './components/ProductsGrid';
import ProductModal from './components/ProductModal';
import CartModal from './components/CartModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import WishlistModal from './components/WishlistModal';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';
import OrderTracking from './components/OrderTracking';
import UserDashboard from './components/UserDashboard';
import ProductComparison from './components/ProductComparison';
import LocationModal from './components/LocationModal';
import CustomPrintDesigner from './components/CustomPrintDesigner';
import CustomizationSection from './components/CustomizationSection';
import AdminDashboard from './components/AdminDashboard';
import './styles/App.css';

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [];
    });
    const [wishlistItems, setWishlistItems] = useState(() => {
        const saved = localStorage.getItem('wishlistItems');
        return saved ? JSON.parse(saved) : [];
    });
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved === 'true';
    });
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('popular');
    const [showCart, setShowCart] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [toast, setToast] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [navigationFilter, setNavigationFilter] = useState('All');
    const [showDashboard, setShowDashboard] = useState(false);
    const [showOrderTracking, setShowOrderTracking] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    });
    const [comparisonProducts, setComparisonProducts] = useState([]);
    const [showComparison, setShowComparison] = useState(false);
    const [userLocation, setUserLocation] = useState(() => {
        const saved = localStorage.getItem('userLocation');
        return saved ? JSON.parse(saved) : { city: 'Mumbai', pincode: '400001' };
    });
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showCustomDesigner, setShowCustomDesigner] = useState(false);
    const [customizingProduct, setCustomizingProduct] = useState(null);
    const [showCustomizationSection, setShowCustomizationSection] = useState(false);
    const [showAdminPanel, setShowAdminPanel] = useState(false);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                console.log('🔄 Fetching products from backend...');
                const response = await fetch('http://localhost:5000/api/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('📦 Received data:', data.length, 'products');
                
                // Transform backend data to match frontend format
                const transformedProducts = data.map(product => ({
                    id: product._id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    originalPrice: product.price * 1.3,
                    rating: product.rating,
                    reviews: product.numReviews,
                    image: product.image,
                    discount: Math.round(((product.price * 1.3 - product.price) / (product.price * 1.3)) * 100),
                    description: product.description,
                    specifications: {
                        Brand: product.brand,
                        Stock: product.countInStock > 0 ? 'In Stock' : 'Out of Stock'
                    }
                }));
                
                setProducts(transformedProducts);
                setLoading(false);
                console.log(`✅ Loaded ${transformedProducts.length} products from backend`);
            } catch (error) {
                console.error('❌ Error fetching products:', error);
                console.log('⚠️ Loading fallback local products...');
                
                // Fallback to local products with 300 items
                const fallbackProducts = getAllProducts();
                setProducts(fallbackProducts);
                setLoading(false);
                console.log(`✅ Loaded ${fallbackProducts.length} products from local data`);
                showToast(`Loaded ${fallbackProducts.length} products (offline mode)`, 'success');
            }
        };

        fetchProducts();
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Save wishlist to localStorage
    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Save dark mode and apply class
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // Save user to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Save location to localStorage
    useEffect(() => {
        localStorage.setItem('userLocation', JSON.stringify(userLocation));
    }, [userLocation]);

    // Filter and sort products
    useEffect(() => {
        let result = [...products];

        // Category filter
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Navigation filter
        if (navigationFilter !== 'All') {
            result = result.filter(p => p.category === navigationFilter);
        }

        // Search filter
        if (searchQuery.trim()) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Price filter
        result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        // Sort
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result.reverse();
                break;
            default:
                result.sort((a, b) => b.reviews - a.reviews);
        }

        setFilteredProducts(result);
    }, [searchQuery, selectedCategory, sortBy, priceRange, products, navigationFilter]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleNavigation = (navItem) => {
        if (navItem === 'home') {
            setShowCustomizationSection(false);
            setNavigationFilter('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        setShowCustomizationSection(false);
        setNavigationFilter(navItem);
        window.scrollTo({ top: 400, behavior: 'smooth' });
        showToast(`Showing ${navItem} items`, 'success');
    };

    const handlePanelClick = (panelItem) => {
        if (panelItem === 'customize') {
            setShowCustomizationSection(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('Welcome to Custom Print Studio! 🎨', 'success');
            return;
        }
        
        if (panelItem === 'trending' || panelItem === 'bestsellers') {
            setSortBy('popular');
        } else if (panelItem === 'new-arrivals') {
            setSortBy('newest');
        } else if (panelItem === 'deals') {
            // Can add a discount filter later, for now set sort by price
            setSortBy('price-low');
        }
        setShowCustomizationSection(false);
        showToast(`Viewing ${panelItem.replace('-', ' ')} collection`, 'success');
        window.scrollTo({ top: 600, behavior: 'smooth' });
    };

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }

        showToast(`${product.name} added to cart!`, 'success');
    };

    const handleToggleWishlist = (product) => {
        const existing = wishlistItems.find(item => item.id === product.id);
        if (existing) {
            setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
            showToast(`${product.name} removed from wishlist`, 'success');
        } else {
            setWishlistItems([...wishlistItems, product]);
            showToast(`${product.name} added to wishlist!`, 'success');
        }
    };

    const handleRemoveFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
        showToast('Item removed from cart', 'success');
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(productId);
        } else {
            setCartItems(cartItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        }
    };

    const handlePlaceOrder = (orderData) => {
        const newOrder = {
            _id: Date.now().toString(),
            orderItems: cartItems.map(item => ({
                name: item.name,
                qty: item.quantity,
                image: item.image,
                price: item.price,
                product: item.id
            })),
            shippingAddress: orderData.shippingAddress,
            paymentMethod: orderData.paymentMethod,
            deliveryOption: orderData.deliveryOption,
            itemsPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            taxPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.18,
            shippingPrice: orderData.shippingPrice || 0,
            totalPrice: orderData.totalPrice,
            isPaid: true,
            paidAt: new Date().toISOString(),
            status: 'Processing',
            createdAt: new Date().toISOString(),
            user: user?._id || 'guest'
        };

        const updatedOrders = [newOrder, ...orders];
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        setCartItems([]);
        setShowCheckout(false);
        showToast('Order placed successfully!', 'success');
    };

    const handleViewOrderTracking = (order) => {
        setSelectedOrder(order);
        setShowOrderTracking(true);
        setShowDashboard(false);
    };

    const handleToggleComparison = (product) => {
        const existing = comparisonProducts.find(p => p.id === product.id);
        if (existing) {
            setComparisonProducts(comparisonProducts.filter(p => p.id !== product.id));
            showToast(`${product.name} removed from comparison`, 'success');
        } else {
            if (comparisonProducts.length >= 4) {
                showToast('Maximum 4 products can be compared', 'error');
                return;
            }
            setComparisonProducts([...comparisonProducts, product]);
            showToast(`${product.name} added to comparison`, 'success');
        }
    };

    const handleOpenDashboard = () => {
        if (!user) {
            setShowLogin(true);
            showToast('Please login to view dashboard', 'error');
            return;
        }
        
        // Check if user is admin
        if (user.role === 'admin') {
            setShowAdminPanel(true);
        } else {
            setShowDashboard(true);
        }
    };

    const handleUpdateLocation = (newLocation) => {
        setUserLocation(newLocation);
        setShowLocationModal(false);
        showToast(`Location updated to ${newLocation.city}`, 'success');
    };

    const handleCustomizeProduct = (product) => {
        setCustomizingProduct(product);
        setShowCustomDesigner(true);
    };

    const handleSaveCustomDesign = (designData) => {
        // Create a customized product with design data
        const customizedProduct = {
            ...customizingProduct,
            id: `${customizingProduct.id}-custom-${Date.now()}`,
            name: `${customizingProduct.name} (Custom Print)`,
            customDesign: designData,
            isCustomized: true
        };

        // Add to cart
        handleAddToCart(customizedProduct);
        
        // Close designer
        setShowCustomDesigner(false);
        setCustomizingProduct(null);
        
        showToast('Custom design saved and added to cart!', 'success');
    };

    // Save orders to localStorage
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // Listen for comparison button click
    useEffect(() => {
        const handleShowComparison = () => {
            if (comparisonProducts.length > 0) {
                setShowComparison(true);
            }
        };
        window.addEventListener('showComparison', handleShowComparison);
        return () => window.removeEventListener('showComparison', handleShowComparison);
    }, [comparisonProducts]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const categories = ['All', ...new Set(products.map(p => p.category))];

    return (
        <div className="App">
            {showAdminPanel ? (
                <AdminDashboard
                    user={user}
                    onClose={() => setShowAdminPanel(false)}
                    onLogout={() => {
                        setUser(null);
                        setShowAdminPanel(false);
                        showToast('Logged out successfully', 'success');
                    }}
                />
            ) : (
                <>
                    <Navbar
                cartCount={cartItems.length}
                wishlistCount={wishlistItems.length}
                darkMode={darkMode}
                user={user}
                userLocation={userLocation}
                onLogout={() => {
                    setUser(null);
                    showToast('Logged out successfully', 'success');
                }}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
                onSearchChange={handleSearch}
                onCartClick={() => setShowCart(true)}
                onWishlistClick={() => setShowWishlist(true)}
                onLoginClick={() => setShowLogin(true)}
                onDashboardClick={handleOpenDashboard}
                onLocationClick={() => setShowLocationModal(true)}
                searchQuery={searchQuery}
                onNavigate={handleNavigation}
            />

            <Panel onPanelClick={handlePanelClick} />

            <HeroSection />

            {showCustomizationSection ? (
                <CustomizationSection onCustomize={handleCustomizeProduct} />
            ) : (
                <>
                    <CategorySection
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                    />

                    {loading ? (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '100px 20px',
                            fontSize: '1.5rem',
                            color: darkMode ? '#fff' : '#333'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
                            <p>Loading products...</p>
                            <p style={{ fontSize: '1rem', color: '#666', marginTop: '10px' }}>
                                Fetching {products.length > 0 ? products.length : 'all'} products from database
                            </p>
                        </div>
                    ) : (
                        <div className="main-content">
                            <Sidebar
                                priceRange={priceRange}
                                onPriceChange={setPriceRange}
                            />

                            <ProductsGrid
                                products={filteredProducts}
                                onViewDetails={setSelectedProduct}
                                onAddToCart={handleAddToCart}
                                wishlistItems={wishlistItems}
                                onToggleWishlist={handleToggleWishlist}
                                comparisonProducts={comparisonProducts}
                                onToggleComparison={handleToggleComparison}
                                sortBy={sortBy}
                                onSortChange={setSortBy}
                            />
                        </div>
                    )}
                </>
            )}

            <Footer />

            {/* Modals */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCart}
                />
            )}

            {showCart && (
                <CartModal
                    cartItems={cartItems}
                    onClose={() => setShowCart(false)}
                    onRemoveItem={handleRemoveFromCart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onCheckout={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                    }}
                />
            )}

            {showCheckout && (
                <CheckoutModal
                    cartItems={cartItems}
                    total={cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.18}
                    onClose={() => setShowCheckout(false)}
                    onPlaceOrder={handlePlaceOrder}
                    user={user}
                />
            )}

            {showDashboard && (
                <UserDashboard
                    user={user}
                    orders={orders}
                    onClose={() => setShowDashboard(false)}
                    onLogout={() => {
                        setUser(null);
                        setShowDashboard(false);
                        showToast('Logged out successfully', 'success');
                    }}
                    onViewOrder={handleViewOrderTracking}
                />
            )}

            {showOrderTracking && selectedOrder && (
                <OrderTracking
                    order={selectedOrder}
                    onClose={() => {
                        setShowOrderTracking(false);
                        setSelectedOrder(null);
                    }}
                />
            )}

            {showComparison && comparisonProducts.length > 0 && (
                <ProductComparison
                    products={comparisonProducts}
                    onClose={() => setShowComparison(false)}
                    onRemoveProduct={(productId) => {
                        setComparisonProducts(comparisonProducts.filter(p => p.id !== productId));
                    }}
                />
            )}

            {showWishlist && (
                <WishlistModal
                    wishlistItems={wishlistItems}
                    onClose={() => setShowWishlist(false)}
                    onRemoveFromWishlist={(id) => setWishlistItems(wishlistItems.filter(item => item.id !== id))}
                    onAddToCart={handleAddToCart}
                />
            )}

            {showLogin && (
                <LoginModal 
                    onClose={() => setShowLogin(false)} 
                    onLogin={(userData) => {
                        setUser(userData);
                        setShowLogin(false);
                        showToast(`Welcome back, ${userData.name}!`, 'success');
                    }}
                />
            )}

            {showLocationModal && (
                <LocationModal
                    currentLocation={userLocation}
                    onClose={() => setShowLocationModal(false)}
                    onUpdate={handleUpdateLocation}
                />
            )}

            {showCustomDesigner && customizingProduct && (
                <CustomPrintDesigner
                    product={customizingProduct}
                    onClose={() => {
                        setShowCustomDesigner(false);
                        setCustomizingProduct(null);
                    }}
                    onSaveDesign={handleSaveCustomDesign}
                />
            )}

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
                </>
            )}
        </div>
    );
}

export default App;
