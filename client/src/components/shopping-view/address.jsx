import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, editAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: '',
}

function Address() {

    const [formData, setFormData] = useState(initialAddressFormData);

    const [selectedAddressId, setSelectedAddressId] = useState(null);


    const dispatch = useDispatch();

    const { addressList } = useSelector(state => state.shopAddress);
    const { user } = useSelector(state => state.auth);

    function isFormValid() {
        return Object.keys(formData).map((key) => formData[key].trim() !== '').every(item => item)
    }

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchAllAddresses({ userId: user?.id }))
        }
    }, [dispatch , user?.id]);


    function handleManageAddress(event) {

        event.preventDefault();

        if(!selectedAddressId && addressList.length >= 3){
            toast("Can not add more than 3 addresses" )
            setFormData(initialAddressFormData)

            return;
        }

        if (selectedAddressId) {

            dispatch(editAddress({ formData, userId: user?.id, addressId: selectedAddressId })).then(() => {

                dispatch(fetchAllAddresses({ userId: user?.id }));
                setSelectedAddressId(null);
                setFormData(initialAddressFormData);
                toast("Address edited successfully")
            });

        }
        else {
            dispatch(addNewAddress({ ...formData, userId: user?.id })
            ).then(data => {
                // console.log(data);
                if (data?.payload?.success) {
                    dispatch(fetchAllAddresses({ userId: user?.id }))
                    setFormData(initialAddressFormData)
                    toast("Address added successfully")
                }

            }

            );

        }
    }

    function editCurrentAddress(currentAddress) {

        setFormData({
            address: currentAddress?.address,
            city: currentAddress.city,
            pincode: currentAddress.pincode,
            phone: currentAddress.phone,
            notes: currentAddress.notes
        })

        setSelectedAddressId(currentAddress?._id)
    }

    console.log(addressList, "addresses list")



    return <Card className=''>
        <div className="mb-5 p-3 grid grid-cols1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {
                addressList && addressList.length > 0 ? addressList.map((singleAddressItem) => {
                    return <AddressCard editCurrentAddress={editCurrentAddress} addressInfo={singleAddressItem} />
                }) : null
            }
        </div>
        <CardHeader>
            <CardTitle>
                {
                    selectedAddressId !== null ? "Edit The Address" : "Add New Address"
                }
            </CardTitle>

        </CardHeader>

        <CardContent className='space-y-3' >

            <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={selectedAddressId !== null ? "Save Edit" : "Add"} onSubmit={handleManageAddress} isBtnDisabled={!isFormValid()}>

            </CommonForm>

        </CardContent>


        <CardFooter>

        </CardFooter>
    </Card>

}

export default Address;