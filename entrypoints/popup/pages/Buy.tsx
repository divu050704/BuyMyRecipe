import { useState, useEffect } from 'react';
import { ChevronLeft, ExternalLink, ShoppingBag, Loader2 } from 'lucide-react';
import getIngredients from '../utils/getIngredients';

interface Product {
    index: number;
    name: string;
    image: string | null;
    price: string;
    quantity: string;
    link: string;
    platform: 'blinkit' | 'zepto';
}

interface BuyData {
    status: string;
    products: {
        blinkit: Product[];
        zepto: Product[];
    };
}

interface BuyProps {
    handleSectionOpen: () => void;
    ingredientName: string;
}

function Buy({ handleSectionOpen, ingredientName }: BuyProps) {
    const [buyData, setBuyData] = useState<BuyData>({
        status: "SUCCESS",
        products: {
            blinkit: [],
            zepto: [],
        }
    });
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('');

    const loadingMessages = [
        'Searching 100,000+ products on Blinkit...',
        'Scanning Zepto inventory...',
        'Getting you the best deals...',
        'Comparing prices across platforms...',
        'Finding fresh ingredients...',
        'Almost there...'
    ];

    const handleBuyClick = (link: string) => {
        window.open(link, '_blank');
    };
    console.log(buyData)
    const allProducts: Product[] = [
        ...buyData.products.blinkit.map(product => ({ ...product, platform: 'blinkit' as const })),
        ...buyData.products.zepto.map(product => ({ ...product, platform: 'zepto' as const }))
    ].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
    });

    async function handleGetData() {
        try {
            setIsLoading(true);
            const data = await getIngredients(ingredientName);
            setBuyData(data);
        } catch (error) {
            console.error('Error fetching recipe:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetData();
    }, []);

    useEffect(() => {
        if (!isLoading) return;

        let messageIndex = 0;
        setLoadingMessage(loadingMessages[0]);

        const interval = setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            setLoadingMessage(loadingMessages[messageIndex]);
        }, 2000);

        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <div className='w-96 h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col'>
            {/* Header */}
            <div className='bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-5 shrink-0 shadow-lg'>
                <button
                    onClick={handleSectionOpen}
                    className='flex items-center gap-2 text-emerald-100 hover:text-white transition-colors mb-3'
                >
                    <ChevronLeft size={16} strokeWidth={2.5} />
                    <span className='text-sm font-medium'>Back to Recipe</span>
                </button>
                <h1 className='text-lg font-bold mb-1'>Buy Ingredients</h1>
                <p className='text-emerald-100 text-xs opacity-90 truncate'>
                    Shopping for: {ingredientName}
                </p>
            </div>

            {/* Info Bar */}
            <div className='bg-white border-b border-slate-200 shadow-sm shrink-0 px-4 py-3'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-slate-600'>
                        <span className='font-semibold text-slate-900'>{allProducts.length}</span> products available
                    </p>
                    <p className='text-xs text-slate-500'>Sorted by price</p>
                </div>
            </div>

            {/* Products List */}
            <div className='flex-1 overflow-y-auto p-4'>
                {isLoading ? (
                    <div className='flex flex-col items-center justify-center h-full text-center px-6'>
                        <div className='relative mb-4'>
                            <Loader2 size={56} className='text-emerald-600 animate-spin' />
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <ShoppingBag size={24} className='text-emerald-700' />
                            </div>
                        </div>
                        <p className='text-slate-700 font-semibold text-base mb-2'>
                            Finding the best options...
                        </p>
                        <p className='text-emerald-600 text-sm font-medium animate-pulse'>
                            {loadingMessage}
                        </p>
                    </div>
                ) : allProducts.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-full text-center px-6'>
                        <ShoppingBag size={48} className='text-slate-300 mb-3' />
                        <p className='text-slate-600 font-medium'>No products found</p>
                        <p className='text-slate-400 text-sm mt-1'>
                            Try searching for another ingredient
                        </p>
                    </div>
                ) : (
                    <div className='space-y-3'>
                        {allProducts.map((product: Product, idx: number) => (
                            <div
                                key={`${product.platform}-${idx}`}
                                className='bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all duration-200 overflow-hidden'
                            >
                                <div className='p-3 flex gap-3'>
                                    {/* Product Image */}
                                    <div className='shrink-0 w-20 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200'>
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className='w-full h-full object-cover'
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    const parent = e.currentTarget.parentElement;
                                                    if (parent) {
                                                        parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            `;
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className='w-full h-full flex items-center justify-center'>
                                                <svg className='w-8 h-8 text-slate-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className='flex-1 min-w-0 flex flex-col justify-between'>
                                        <div>
                                            <div className='flex items-start gap-2 mb-1'>
                                                <h3 className='flex-1 font-semibold text-slate-900 text-sm leading-tight line-clamp-2'>
                                                    {product.name}
                                                </h3>
                                                <div className={`shrink-0 px-2 py-0.5 rounded text-xs font-bold ${product.platform === 'blinkit'
                                                    ? 'bg-yellow-400 text-slate-900'
                                                    : 'bg-purple-600 text-white'
                                                    }`}>
                                                    {product.platform === 'blinkit' ? 'BLINKIT' : 'ZEPTO'}
                                                </div>
                                            </div>
                                            <p className='text-xs text-slate-500 font-medium'>
                                                {product.quantity}
                                            </p>
                                        </div>
                                        <div className='flex items-center justify-between mt-2'>
                                            <span className='text-lg font-bold text-emerald-700'>
                                                {product.price}
                                            </span>
                                            <button
                                                onClick={() => handleBuyClick(product.link)}
                                                className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-semibold transition-all shadow-sm hover:shadow-md active:scale-95'
                                            >
                                                <span>Buy Now</span>
                                                <ExternalLink size={12} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Buy;