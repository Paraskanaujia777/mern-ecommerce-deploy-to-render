import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity} from "@/store/shop/cart-slice";

function UserCartItemsContent({ cartItem }) {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);

    function handleUpdateCartQuantity(getCartItem , typeOfAction){

        dispatch(updateCartQuantity({
            userId : user?.id ,
            productId : getCartItem?.productId ,
            quantity : typeOfAction == "plus" ? getCartItem?.quantity+1 : getCartItem?.quantity-1
        }))

    }

    

    function handleCartItemDelete(getCartItem){

        dispatch(deleteCartItem({userId : user?.id , productId : getCartItem?.productId}))
    }  

    return (
        <div className="flex items-center space-x-4">
            <img src={cartItem?.image} alt={cartItem?.title} className="w-20 h-20 rounded object-cover" />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.title}</h3>
                <div className="flex items-center mt-1 gap-2">
                    <Button onClick={()=> handleUpdateCartQuantity(cartItem , 'minus')} className="h-8 w-8 rounded-full" size="icon">
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>
                    <Button onClick={()=> handleUpdateCartQuantity(cartItem , 'plus')} className="h-8 w-8 rounded-full" size="icon">
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end  ">
                <p className="font-semibold">
                    {((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
                </p>
                <Trash onClick={()=> handleCartItemDelete(cartItem)} size ={20} className="cursor-pointer mt-1"/>

            </div>

        </div>
    )
}

export default UserCartItemsContent;