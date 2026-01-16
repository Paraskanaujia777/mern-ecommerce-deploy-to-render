import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { deleteAddress, fetchAllAddresses } from "@/store/shop/address-slice";


function AddressCard({ addressInfo ,editCurrentAddress }) {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);


    function deleteCurrentAddress(currentAddress) {

        console.log(currentAddress)

        dispatch(deleteAddress({ userId: user?.id, addressId: currentAddress._id })).then(() => {
            dispatch(fetchAllAddresses({ userId: user?.id }));
        });

    }

    

    return (
        <Card>
            <CardContent className='grid gap-4 p-4'>
                <Label>Address : {addressInfo?.address}</Label>
                <Label>City : {addressInfo?.city}</Label>
                <Label>Pincode : {addressInfo?.pincode}</Label>
                <Label>Phone : {addressInfo?.phone}</Label>
                <Label>Notes : {addressInfo?.notes}</Label>
            </CardContent>

            <CardFooter className='flex justify-between p-4'>
                <Button onClick={()=> deleteCurrentAddress(addressInfo)} className="">Remove</Button>
                <Button onClick={()=> editCurrentAddress(addressInfo)}  className="">Edit</Button>
            </CardFooter>

        </Card>
    )

}

export default AddressCard;