import { Button } from "@/components/ui/button";
import { Fragment, useEffect, useState } from "react";
import {
    Sheet, SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/components/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { toast } from "sonner";
import AdminProductTile from "./product-tile";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: 0,
    salePrice: "",
    totalStock: "",
}


function AdminProducts() {

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);

    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);

    const dispatch = useDispatch();
    const { productList } = useSelector(state => state.adminProducts);


    function onSubmit(event) {
        event.preventDefault();

        currentEditedId !== null ? dispatch(editProduct({ id: currentEditedId, formData })).then((data) => { data?.payload?.success ? dispatch(fetchAllProducts(),  setOpenCreateProductsDialog(false), setFormData(initialFormData), setCurrentEditedId(null)) : null }) :

            dispatch(addNewProduct({
                ...formData,
                image: uploadedImageUrl

            })).then((data) => {
                console.log(data);
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    console.log(productList);
                    setImageFile(null);
                    setUploadedImageUrl("");
                    setFormData(initialFormData);
                    setOpenCreateProductsDialog(false)
                    toast("Product added successfully", {
                        action: {
                            label: "X",
                            onClick: () => console.log("Undo"),
                        }
                    })

                }

            })

    }

    function handleDelete(idToDelete) {

        dispatch(deleteProduct({ id: idToDelete })).then((data) => {
            console.log(data);
            // data?.payload?.success ? dispatch(fetchAllProducts()) : null
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
            }
        })

    }

    useEffect(() => {
        if (uploadedImageUrl) {
            setFormData((prev) => ({
                ...prev,
                image: uploadedImageUrl
            }));
        }
    }, [uploadedImageUrl]);


    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])

    // console.log(productList ,uploadedImageUrl)

    return (<><Fragment>
        <div className="mb-5 w-full flex justify-end">
            <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {
                productList && productList.length > 0 ?
                    productList.map(productItem => <AdminProductTile setUploadedImageUrl={setUploadedImageUrl} setFormData={setFormData} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setCurrentEditedId={setCurrentEditedId} key={productItem._id} product={productItem} handleDelete={handleDelete} />) : null
            }
        </div>
        <Sheet open={openCreateProductsDialog} onOpenChange={() => {
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            setFormData(initialFormData);
        }}>

            <SheetContent side="right" className="overflow-auto ">
                <div className="flex flex-col h-full">
                    <SheetHeader className="border-b">
                        <SheetTitle className="">

                            <span>{currentEditedId != null ? "Edit The Product" : "Add New Product"} </span>
                        </SheetTitle>

                    </SheetHeader>
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} isEditMode={currentEditedId !== null} />
                    <div className="py-6">
                        <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText={currentEditedId !== null ? "Save Edit" : "Add"} formControls={addProductFormElements}
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    </Fragment>
    </>

    )


}

export default AdminProducts;