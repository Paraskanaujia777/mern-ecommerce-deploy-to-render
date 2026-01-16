import CommonForm from "@/components/common/form.jsx";
import { registerFormControls } from "@/components/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";



const initialState = {
  userName: "",
  email: "",
  password: "",

};


function AuthRegister() {

  const [formData, setFormData] = useState(initialState);

  console.log(formData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth/login");
        toast("Registration succesful", {
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          }
        })
      }
      else {
        toast("registration failed", {
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          }
        })
      }
    })


  };


  return (
    <>

      <div className="w-full mx-auto max-w-md space-y-6 ">
        <div className="text-center ">
          <h1 className="font-bold text-3xl tracking-tight text-forground">Create New Account</h1>
          <p className="mt-2">Already have an account</p>
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">  Login</Link>
        </div>
        <CommonForm formControls={registerFormControls}
          formData={formData}
          buttonText={'Sign Up'}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

      </div>
    </>
  );
}

export default AuthRegister;