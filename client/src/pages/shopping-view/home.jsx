import { useEffect, useState } from 'react';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import { CloudLightning, Shirt, ShirtIcon, SquareChevronLeftIcon, SquareChevronRightIcon, UmbrellaIcon, WatchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from './product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { toast } from 'sonner';
import ProductDetailsDialog from '@/components/shopping-view/product-details';

const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "women", icon: ShirtIcon },
    { id: "kids", label: "Kids", icon: CloudLightning },
    { id: "accesories", label: "Accesories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
]

const brand = [
    { id: "nike", label: "Nike", icon: Shirt },
    { id: "adidas", label: "Adidas", icon: Shirt },
    { id: "puma", label: "Puma", icon: Shirt },
    { id: "levi", label: "Levi's", icon: Shirt },
    { id: "zara", label: "Zara", icon: Shirt },
    { id: "h&m", label: "H&M", icon: Shirt },
]

function ShoppingHome() {

    const slides = [bannerOne, bannerTwo, bannerThree];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productList, productDetails } = useSelector(state => state.shopProducts);
    const { user } = useSelector(state => state.auth);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const handleGetProductDetails = (id) => {
        console.log(id);
        dispatch(fetchProductDetails(id));
    }
    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetailsDialog(true);
        }
    }, [productDetails]);




    const [currentSlide, setCurrentSlide] = useState(0);

    function handleNavigateToListingPage(getCurrentItem, section) {

        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section]: [getCurrentItem.id]
        }

        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate('/shop/listing')

    }
    function handleNavigateToBrandPage(getCurrentItem, section) {

        sessionStorage.removeItem('brand');
        const currentFilter = {
            [section]: [getCurrentItem.id]
        }

        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate('/shop/listing')

    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 10000); // change every 3 seconds

        return () => clearInterval(interval);

    }, [slides.length])

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))

    }, [dispatch])

    console.log(productList, 'productlist homepage');

    function handleAddtoCart(getCurrentProductId) {
        console.log(getCurrentProductId)
        if (!user || !user.id) {
            alert("Please login to add items to cart");
            return;
        }

        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems({ userId: user?.id }));
                if (dispatch) {
                    toast("Product is added to cart")
                }


            }

        }
        )

    }






    return <div className="flex flex-col min-h-screen">
        <div className="relative w-full h-[600px] overflow-hidden">
            {
                slides.map((slide, index) => <img src={slide} key={index} className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000  ${index === currentSlide ? "opacity-100" : "opacity-0"}`} />)

            }
            <Button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} size='icon' className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'>
                <SquareChevronLeftIcon className='w-4 h-4' />
            </Button>
            <Button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} size='icon' className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'>
                <SquareChevronRightIcon className='w-4 h-4' />
            </Button>
        </div>
        <section className='py-12 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-8'>Shop by category </h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {
                        categoriesWithIcon.map((categoryItem) => {

                            return <Card onClick={() => handleNavigateToListingPage(categoryItem, 'category')} className='cursor-pointer hover:shadow-lg transition-shadow '>
                                <CardContent className='flex flex-col items-center justify-center p-6 '>
                                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                                    <span className='font-bold'> {categoryItem.label}</span>

                                </CardContent>


                            </Card>
                        })
                    }

                </div>

            </div>

        </section >
        <section className='py-12 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-8'>Shop by brands </h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                    {
                        brand.map((brandItem) => {

                            return <Card onClick={() => handleNavigateToBrandPage(brandItem, 'brand')} className='cursor-pointer hover:shadow-lg transition-shadow '>
                                <CardContent className='flex flex-col items-center justify-center p-6 '>
                                    <brandItem.icon className='w-12 h-12 mb-4 text-primary' />
                                    <span className='font-bold'> {brandItem.label}</span>

                                </CardContent>
                            </Card>
                        })
                    }

                </div>

            </div>

        </section >

        <section py-12>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold text-center mb-8'>Feature Products </h2>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

                    {
                        productList && productList.length > 0 ?
                            productList.map((productItem) => <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} handleAddtoCart={handleAddtoCart} product={productItem} />)
                            : null
                    }

                </div>
            </div>
            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
        </section>

    </div >
}

export default ShoppingHome;
