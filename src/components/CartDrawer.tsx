import React, { useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem, PageId } from '../types';
import { SafeImage } from './BrandDecorations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigate: (page: PageId) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onNavigate,
}: CartDrawerProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 6;
  const total = subtotal + shippingCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim()) || !shippingCity.trim()) {
      setErrorMsg('Please fill in your name, a valid email, and shipping address.');
      return;
    }
    setErrorMsg('');
    setOrderConfirmed(true);
    onClearCart();
  };

  const resetAndClose = () => {
    setOrderConfirmed(false);
    setCheckoutOpen(false);
    setRecipientName('');
    setRecipientEmail('');
    setShippingCity('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-[#181725]/40 backdrop-blur-xs"
        onClick={resetAndClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EFEDF6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#6B4CE6]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#181725]">Your Learning Bag</h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close cart"
            className="w-10 h-10 rounded-full hover:bg-[#F5F2FF] flex items-center justify-center text-[#181725] cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {orderConfirmed ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-[#181725]">Order Confirmed!</h3>
              <p className="text-sm text-[#666476] max-w-xs mx-auto leading-relaxed">
                Thank you, {recipientName}! Your BrightSprout learning kits are being packed and a confirmation was sent to {recipientEmail}.
              </p>
              <button
                type="button"
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-full bg-[#6B4CE6] text-white text-sm font-semibold hover:bg-[#5738D1] cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F2FF] text-[#6B4CE6] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#181725]">Your bag is empty</h3>
              <p className="text-sm text-[#666476] max-w-xs mx-auto">
                Explore wooden Montessori kits, art bundles, and activity workbooks built by our teachers.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('shop');
                }}
                className="px-6 py-2.5 rounded-full bg-[#6B4CE6] text-white text-sm font-semibold hover:bg-[#5738D1] cursor-pointer"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            <>
              {/* Free shipping bar */}
              <div className="p-3.5 rounded-2xl bg-[#FAF9FE] border border-[#EFEDF6]">
                <p className="text-xs font-semibold text-[#181725]">
                  {remainingForFreeShipping === 0
                    ? 'You unlocked complimentary shipping!'
                    : `Add $${remainingForFreeShipping} more for free standard shipping`}
                </p>
                <div className="mt-2 h-2 rounded-full bg-[#E9E4FA] overflow-hidden">
                  <div
                    className="h-full bg-[#6B4CE6] rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <ul className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex gap-3.5 p-3 rounded-2xl border border-[#EFEDF6] bg-white"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.title}
                      fallbackLabel={product.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-[#181725] leading-snug line-clamp-2">
                            {product.title}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            aria-label={`Remove ${product.title}`}
                            className="text-[#8E8BA0] hover:text-red-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                        <p className="text-xs text-[#666476] mt-0.5">{product.ageRange}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center gap-1 rounded-full border border-[#E6E3F0] px-1.5 py-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, -1)}
                            aria-label={`Decrease quantity of ${product.title}`}
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F5F2FF] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, 1)}
                            aria-label={`Increase quantity of ${product.title}`}
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F5F2FF] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-[#181725] tabular-nums">
                          ${product.price * quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Inline Checkout Form */}
              {checkoutOpen && (
                <form
                  id="cart-checkout-form"
                  onSubmit={handleCheckoutSubmit}
                  className="p-4 rounded-2xl bg-[#FAF9FE] border border-[#E5E0F5] space-y-3"
                >
                  <h4 className="text-sm font-bold text-[#181725]">Shipping Details</h4>
                  <div>
                    <label htmlFor="checkout-name" className="block text-xs font-semibold text-[#4F4D60] mb-1">
                      Full Name
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Hannah Brooks"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DDD8EE] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className="block text-xs font-semibold text-[#4F4D60] mb-1">
                      Receipt Email
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="hannah@example.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DDD8EE] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-address" className="block text-xs font-semibold text-[#4F4D60] mb-1">
                      Street &amp; City
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      placeholder="742 Maple Ave, Portland, OR"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#DDD8EE] bg-white text-sm"
                    />
                  </div>
                  {errorMsg && (
                    <p className="text-xs font-medium text-red-600" role="alert">
                      {errorMsg}
                    </p>
                  )}
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !orderConfirmed && (
          <div className="px-6 py-5 border-t border-[#EFEDF6] bg-[#FAF9FE] space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#666476]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium">${subtotal}</span>
              </div>
              <div className="flex justify-between text-[#666476]">
                <span>Shipping</span>
                <span className="tabular-nums font-medium">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#181725] pt-1.5 border-t border-[#EAE6F4]">
                <span>Total</span>
                <span className="tabular-nums">${total}</span>
              </div>
            </div>

            {checkoutOpen ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="px-4 py-3 rounded-full border border-[#DDD8EE] bg-white text-sm font-semibold text-[#181725] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="cart-checkout-form"
                  className="flex-1 py-3 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] transition-colors cursor-pointer"
                >
                  Place Order (${total})
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="w-full py-3 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
