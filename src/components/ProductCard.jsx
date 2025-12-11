"use client";

import React, { useState } from "react";
import { Heart, Check, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import { setOrderDetails } from "../store/checkoutSlice";


// 1. New Custom Modal 
const QuickViewModal = ({
  isOpen,
  onClose,
  product,
  modalType,
  onAddToCart,
  onBuyNow,
  selectedSize,
  selectedColor,
  quantity,
  setSelectedSize,
  setSelectedColor,
  setQuantity,
}) => {
  if (!isOpen || !product) return null;


  let selectedSizeObj = null;

  if (selectedSize) {
    selectedSizeObj = product.sizes.find(s => s.size === selectedSize);
  }

  // 2: Find cheapest size for default display
  const cheapestSize = product.sizes.reduce((min, s) => {
    const current = s.discountPrice ?? s.price;
    const minVal = min.discountPrice ?? min.price;
    return current < minVal ? s : min;
  }, product.sizes[0]);

  // 3: Final price (based on selection OR cheapest)
  const finalPrice = selectedSizeObj
    ? selectedSizeObj.discountPrice ?? selectedSizeObj.price
    : cheapestSize.discountPrice ?? cheapestSize.price;

  const originalPrice = selectedSizeObj
    ? selectedSizeObj.price
    : cheapestSize.price;

  // 4: Discount
  const finalDiscount = originalPrice > finalPrice
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    : 0;

  const getSelectedSizeStock = () => {
    if (!selectedSize) return 0;
    const sizeObj = product.sizes?.find(s => s.size === selectedSize);
    return sizeObj ? sizeObj.stock : 0;
  };

  const handleAction = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    if (modalType === "cart") {
      onAddToCart();
    } else {
      onBuyNow();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-md shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex border-b bg-green-50 border-gray-100">
          <div className="w-1/3 aspect-[3/4]">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="w-2/3 p-5 py-6  m-auto  ">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category?.name}</p>
            <h3 className="text-2xl font-serif text-gray-900 mb-1 ">{product.productName}</h3>

            <div className="flex items-baseline gap-2 ">
              <span className="text-xl font-bold text-gray-900">
                ₹{finalPrice.toLocaleString('en-IN')}
              </span>

              {finalPrice !== originalPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>

                  {finalDiscount > 0 && (
                    <span className="text-sm font-bold text-[#9CAF88]">
                      ({finalDiscount}% OFF)
                    </span>
                  )}
                </>
              )}
            </div>

          </div>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Colors */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider mb-3 block">Select Color</span>
            <div className="flex gap-3">
              {product.colors?.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border transition 
                    ${selectedColor === color.name ? "ring-2 ring-black scale-110" : "ring-1 ring-gray-200"}
                  `}
                  style={{ backgroundColor: color.hex }}
                ></button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase">Select Size</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes?.map(s => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  disabled={s.stock <= 0}
                  className={`py-2 text-xs font-medium border 
                    ${selectedSize === s.size ? "bg-black text-white" : "bg-white"}
                    ${s.stock <= 0 ? "opacity-40 cursor-not-allowed line-through" : ""}
                  `}
                >
                  {s.size}
                </button>
              ))}
            </div>

            {selectedSize && getSelectedSizeStock() < 5 && getSelectedSizeStock() > 0 && (
              <p className="text-[10px] text-red-600 mt-1">
                Only {getSelectedSizeStock()} left!
              </p>
            )}
          </div>

          {/* Quantity + CTA */}
          <div className="pt-4 border-t flex gap-4">

            {/* Qty Stepper */}
            <div className="flex items-center border h-12 w-24 justify-between px-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= getSelectedSizeStock()}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAction}
              disabled={!selectedSize || !selectedColor}
              className={`flex-1 h-12 font-bold uppercase
                ${!selectedSize || !selectedColor ? "bg-gray-200" : "bg-black text-white"}
              `}
            >
              {modalType === "cart" ? "Add to Bag" : "Buy Now"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};


const ProductCard = ({ product = {} }) => {
  const {
    media = [],
    category = {}, // { name, slug }
    productName = "Product Name",
    description = "Product description",
    colors = [],
    sizes = [], // { size, price, discountPrice, stock }
    _id,
  } = product;

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const wishlist = useSelector((s) => s.wishlist.items);


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("cart");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // --- CAROUSEL LOGIC ---
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % media.length);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  // --- PRICE & STOCK LOGIC (FROM OLD CARD) ---
  const availableSizes = sizes.filter((s) => s.stock > 0);
  const cheapestSize = availableSizes.length
    ? availableSizes.reduce((min, s) => {
      const currentPrice = s.discountPrice || s.price;
      const minPrice = min.discountPrice || min.price;
      return currentPrice < minPrice ? s : min;
    })
    : sizes.length > 0 ? sizes[0] : null;

  const productPrice = cheapestSize ? cheapestSize.price : 0;
  const productDiscountPrice = cheapestSize
    ? cheapestSize.discountPrice || cheapestSize.price
    : 0;
  const productStock = cheapestSize ? cheapestSize.stock : 0;
  const isOutOfStock = (Math.floor(Number(productStock)) || 0) <= 0;

  const discountPercentage = productPrice > productDiscountPrice ?
    Math.round(((productPrice - productDiscountPrice) / productPrice) * 100) : 0;
  // --- RATING LOGIC (once per product) ---
  const realRating = product.rating;
  const [displayRating] = useState(
    realRating ? Number(realRating).toFixed(1) : (Math.random() * 1 + 4).toFixed(1)
  );


  // --- HANDLERS (FROM OLD CARD) ---
  const handleNavigate = () => {
    if (product.slug && category?.slug) {
      router.push(`/${category.slug}/${product.slug}`);
    }
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (isOutOfStock) {
      toast("Product is out of stock, please add it to wishlist");
      return;
    }
    setModalType("cart");
    setIsModalOpen(true);
  };

  const handleBuyNowClick = (e) => {
    e.stopPropagation();
    if (isOutOfStock) {
      toast.error("Product is out of stock");
      return;
    }
    setModalType("buy");
    setIsModalOpen(true);
  };

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select size and color");
      return;
    }

    const selectedSizeObj = sizes.find((s) => s.size === selectedSize);
    if (!selectedSizeObj) {
      toast.error("Invalid size selected");
      return;
    }

    if (quantity > selectedSizeObj.stock) {
      toast.error(`Sorry, only ${selectedSizeObj.stock} items available.`);
      return;
    }

    const cartItem = {
      product: _id,
      productName,
      price: selectedSizeObj.price,
      discountPrice: selectedSizeObj.discountPrice || selectedSizeObj.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
      image: media?.[0]?.url || "",
    };

    try {
      await dispatch(addToCart([cartItem])).unwrap();
      toast.success("Added to cart");
      setIsModalOpen(false);
      setSelectedColor("");
      setSelectedSize("");
      setQuantity(1);
    } catch (error) {
      toast.error("Please login first to continue.");
    }
  };

  const handleCheckout = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select size and color before checkout");
      return;
    }

    const selectedSizeObj = sizes.find((s) => s.size === selectedSize);
    if (!selectedSizeObj) {
      toast.error("Invalid size selected");
      return;
    }

    if (quantity > selectedSizeObj.stock) {
      toast.error(`Sorry, only ${selectedSizeObj.stock} items available.`);
      return;
    }

    const productToBuy = {
      product: _id,
      productName,
      price: selectedSizeObj.price,
      discountPrice: selectedSizeObj.discountPrice || selectedSizeObj.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
      image: media?.[0]?.url || "",
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "checkoutState",
        JSON.stringify({
          orderDetails: productToBuy,
          cartFromCheckout: [],
        })
      );
    }

    setIsModalOpen(false);

    if (!user) {
      router.push("/create-account?redirect=/checkout");
    }

    dispatch(setOrderDetails(productToBuy));
    router.push("/checkout");
  };

  const isWishlisted = wishlist.some((item) => item._id === _id);
  const toggleWishlist = async (e) => {
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await dispatch(removeFromWishlist(_id)).unwrap();
        toast.success("Removed from Wishlist!");
      } else {
        await dispatch(addToWishlist(product)).unwrap();
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      toast.error(error || "Wishlist update failed");
    }
  };

  const getSelectedSizeStock = () => {
    const sizeObj = sizes.find((s) => s.size === selectedSize);
    return sizeObj ? sizeObj.stock : 0;
  };

  // --- UTILITY FOR JSX ---
  const currentImageUrl = media?.[currentImageIndex]?.url || "https://placehold.co/600x800/FFD368/333?text=Product";

  return (
    <>
      <div
        className="flex flex-col group   overflow-hidden transition-shadow duration-300  cursor-pointer"
        onClick={handleNavigate}
      >
        {/* Image Carousel Container (NEW DESIGN) */}
        <div className="relative border w-full aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={currentImageUrl}
            alt={productName}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out"
          />

          {/* Carousel Arrows (Visible on Hover) */}
          {media.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 w-8 h-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hover:bg-white"
              >
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 w-8 h-8 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hover:bg-white"
              >
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </>
          )}

          {/* Rating Badge (Bottom Left - NEW DESIGN) */}
          <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 flex items-center gap-1 shadow-sm text-sm">
            <span className="text-xs font-bold">{displayRating}</span>
            <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
          </div>

          {/* Carousel Dots (Bottom Right - NEW DESIGN) */}
          {media.length > 1 && (
            <div className="absolute bottom-3 right-3 flex gap-1">
              {media.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? 'bg-black' : 'bg-white/60'}`}
                />
              ))}
            </div>
          )}

          {/* Wishlist Button  */}
          {user && (
            <button
              className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-white transition z-10"
              onClick={toggleWishlist}
            >
              <Heart
                size={20}
                strokeWidth={1.5}
                color={isWishlisted ? "#ef4444" : "gray"}
                fill={isWishlisted ? "#ef4444" : "white"}
              />
            </button>
          )}

          {/* Out of Stock/Coupon Badge (Top Left - OLD CARD LOGIC) */}
          {isOutOfStock ? (
            <div className="absolute top-3 left-3 bg-red-400 text-white text-xs font-bold px-2 py-0.5 rounded-sm z-10">
              Out of Stock
            </div>
          ) : product?.coupon && (
            <div
              className="absolute top-3 left-3 bg-[#9CAF88] text-white text-[12px] font-bold px-2 py-0.5 shadow-md z-10"
            >
              {product.coupon.discount_type === "percentage"
                ? `${product.coupon.discount_value}% OFF`
                : `₹${product.coupon.discount_value} OFF`}
            </div>
          )}
        </div>

        {/* Product Info  */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Tags  */}
          <div className="flex flex-wrap gap-2 mb-2">
            {category?.name && (
              <span className="px-2 py-1 border border-gray-200 text-[10px] uppercase tracking-wide text-gray-600">
                {category.name}
              </span>
            )}
          </div>

          <h3 className="text-base font-medium text-gray-900 mb-1 line-clamp-2">{productName}</h3>

          {/* Price Row */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-gray-900">₹{productDiscountPrice.toLocaleString('en-IN')}</span>
            {productDiscountPrice !== productPrice && (
              <>
                <span className="text-sm text-gray-400 line-through decoration-1">₹{productPrice.toLocaleString('en-IN')}</span>
                {discountPercentage > 0 && (
                  <span className="text-sm font-bold text-[#9CAF88]">({discountPercentage}% OFF)</span>
                )}
              </>
            )}
          </div>

          {/* Add to Bag/Buy Buttons */}
          <div className="flex gap-2 pt-2 mt-auto">
            <button
              onClick={handleAddToCartClick}
              disabled={isOutOfStock}
              className={`flex-1 py-2 border border-gray-900 text-sm font-bold uppercase tracking-wider transition-colors duration-300 
                          ${isOutOfStock ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed' : 'hover:bg-gray-900 hover:text-white'}`}
            >
              {isOutOfStock ? "Out of Stock" : "Add"}
            </button>
            <button
              onClick={handleBuyNowClick}
              disabled={isOutOfStock}
              className={`flex-1 py-2 bg-[#9CAF88] text-white text-sm font-bold uppercase tracking-wider transition-colors duration-300 
                          ${isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#717d65]'}`}
            >
              Buy
            </button>
          </div>

        </div>
      </div>

      {/* MODAL*/}
      <QuickViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalType={modalType}
        product={{
          ...product,
          images: media?.map(m => m.url) || [],
          colors,
          sizes
        }}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        quantity={quantity}
        setSelectedSize={setSelectedSize}
        setSelectedColor={setSelectedColor}
        setQuantity={setQuantity}
        onAddToCart={handleAddToCart}
        onBuyNow={handleCheckout}
      />

    </>
  );
};

export default ProductCard;