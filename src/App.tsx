import React, { useState } from 'react';
import { CartItem, FamilyProfile, PageId, BlogPost, ShopProduct } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SignInModal } from './components/SignInModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { QuizPage } from './pages/QuizPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { GamesPage } from './pages/GamesPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [user, setUser] = useState<FamilyProfile | null>(null);

  const navigate = (page: PageId) => {
    setCurrentPage(page);
    if (page !== 'blog') {
      setSelectedBlogPost(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setCurrentPage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: ShopProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#181725]">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        onOpenSignIn={() => setIsSignInOpen(true)}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigate}
            onSelectBlogPost={handleOpenBlogPost}
          />
        )}
        {currentPage === 'shop' && <ShopPage onAddToCart={handleAddToCart} />}
        {currentPage === 'quiz' && <QuizPage />}
        {currentPage === 'activities' && <ActivitiesPage onNavigate={navigate} />}
        {currentPage === 'games' && <GamesPage />}
        {currentPage === 'about' && <AboutPage onNavigate={navigate} />}
        {currentPage === 'blog' && (
          <BlogPage
            selectedPost={selectedBlogPost}
            onSelectPost={setSelectedBlogPost}
          />
        )}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={navigate} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onNavigate={navigate}
      />

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        user={user}
        onSignIn={setUser}
        onSignOut={() => setUser(null)}
      />
    </div>
  );
}
