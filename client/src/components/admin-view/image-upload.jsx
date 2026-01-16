import { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";




function ProductImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, imageLoadingState, isEditMode }) {

    const inputRef = useRef(null);

    const [allowChange, setAllowChange] = useState(false);


    function handleImageFileChange(e) {
        // console.log(e.target.files);
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setImageFile(selectedFile);
        // e.preventDefault();

    }

    function handleRemoveImage() {
        setImageFile(null);
        setUploadedImageUrl("");
        setAllowChange(false);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }


    async function uploadImageToCloudinary() {
        console.log(imageFile)
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', imageFile);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        // console.log(response.data, 'response');
        if (response?.data?.success) setUploadedImageUrl(response.data.data.secure_url);
        setImageLoadingState(false);

    }

    useEffect(() => {
        if (imageFile !== null) {
            uploadImageToCloudinary();
        }
    }, [imageFile])

    function handleDragOver(e) {
        e.preventDefault();


    }

    function handleDrop(e) {
        e.preventDefault();

        if (isEditMode && !allowChange) return;

        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }

    useEffect(() => {
        if (!isEditMode) {
            setAllowChange(false);
        }
    }, [isEditMode]);




    return (

        <div className="w-full max-w-md mx-auto mt-4">

            {isEditMode && uploadedImageUrl && (
                <div className="mb-3">
                    <img
                        src={uploadedImageUrl}
                        alt="Product"
                        className="w-full h-48 object-cover rounded-md"
                    />
                </div>
            )}

            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

            {isEditMode && !allowChange && (
                <Button
                    variant="outline"
                    className="w-full mb-2"
                    onClick={() => setAllowChange(true)}
                >
                    Change Image
                </Button>
            )}


            <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
                <Input type="file" id="image-upload" className=" hidden cursor-pointer" ref={inputRef}
                    onChange={handleImageFileChange} disabled={isEditMode && !allowChange} />

                {
                    !imageFile ?
                        (<label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer"> <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                            <span>Drag & Drop or Click to Upload</span>
                        </label>)
                        :
                        (
                            imageLoadingState ? <Skeleton className="h-10 bg-gray-100" /> :
                                <div className="flex items-center justify-between ">
                                    <div className="flex items-center">
                                        <FileIcon className="w-8 text-primary mr-2 h-8" />

                                    </div>
                                    <p className="text-sm font-medium">{imageFile.name}</p>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground " onClick={handleRemoveImage} >
                                        <XIcon className="w-4 h-4" />
                                        {/* <span>Remove file</span> */}
                                    </Button>

                                </div>)
                }
            </div>
        </div>
    )
}


export default ProductImageUpload;
