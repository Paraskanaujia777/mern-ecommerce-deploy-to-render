// import CommonForm from "@/components/common/form.jsx";
import { loginFormControls } from "@/components/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";




let initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      
      if (data?.payload?.success) {
        toast(data?.payload?.message, {
          action: {
            label: "X",
            onClick: () => console.log("Closed"),
          },
        });
        setFormData(initialState);
        navigate("/shop/home");
        
      } else {
        toast("Invalid credentials or error logging in");
      }
    });


  };


  return (
    <>

      <div className="w-full mx-auto max-w-md space-y-6 ">
        <div className="text-center ">
          <h1 className="font-bold text-3xl tracking-tight text-foreground">Login to Account</h1>
          <p className="mt-2">Didnt have an account</p>
          <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register"> Sign up</Link>
        </div>
        <CommonForm formControls={loginFormControls}
          formData={formData}
          buttonText={'Sign in'}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

      </div>
    </>
  );
}

export default AuthLogin;