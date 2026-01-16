import { sortOptions } from "@/components/config";
import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "./product-tile";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramsValue = value.join(',')

            queryParams.push(`${key}=${encodeURIComponent(paramsValue)}`)
        }
    }

    return queryParams.join("&")

}

function ShoppingListing() {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
   


    const { productList } = useSelector(state => state.shopProducts);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const { productDetails } = useSelector(state => state.shopProducts);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

    function handleSort(value) {
        // console.log(value);
        setSort(value);

    }

    function handleFilter(getSectionId, getCurrentOption) {
        console.log(getSectionId, getCurrentOption);

        let cpyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            }
        }
        else {
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

            if (indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption)
            else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)

        }

        console.log(cpyFilters);

        setFilters(cpyFilters);

        sessionStorage.setItem('filters', JSON.stringify(cpyFilters));

    }

    function handleAddtoCart(getCurrentProductId) {
        console.log(getCurrentProductId)
        if (!user || !user.id) {
            alert("Please login to add items to cart");
            return;
        }

        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems({ userId: user?.id }));
                if(dispatch){
                    toast("Product is added to cart")
                }
                

            }

        }
        )

    }

    useEffect(() => {
        setSort('price-lowtohigh');
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
    }, []);

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString))
        }
    }, [])


    useEffect(() => {

        if (filters !== null && sort !== null)
            dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
    }, [dispatch, sort, filters]);

    console.log(filters, searchParams, "filters");

    const handleGetProductDetails = (id) => {
        console.log(id);
        dispatch(fetchProductDetails(id));
    }
    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetailsDialog(true);
        }
    }, [productDetails]);

    console.log(productDetails);

    
    // console.log(cartItems);






    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="border-b flex items-center justify-between ">
                    <h2 className="text-lg font-extrabold ">All Products</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{productList?.length} Products</span>
                        <DropdownMenu  >
                            <DropdownMenuTrigger asChild >
                                <Button size="sm" className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="h-4 w-4" />
                                    <span>Sort by</span>
                                </Button>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>

                                    {
                                        sortOptions.map(sortItem => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.label}>{sortItem.label}</DropdownMenuRadioItem>)
                                    }

                                </DropdownMenuRadioGroup>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

                    {productList.map((productItem) => <ShoppingProductTile handleAddtoCart={handleAddtoCart} productDetails={productDetails} handleGetProductDetails={handleGetProductDetails} key={productItem._id} product={productItem} />)}

                </div>
            </div>

            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />

        </div>

    )
}

export default ShoppingListing;