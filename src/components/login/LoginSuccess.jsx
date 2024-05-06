import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { btRefPath, btSuccess } from "../../actions/buckets";
import { useBucket } from "../../actions/bucket";

function LoginSuccess(props) {
  const navigate = useNavigate();
  // const location = useLocation();

  // let refPath = useBucket(btRefPath);

  useEffect(() => {
    // if (localStorage.getItem("refPath")) {
    //   // btRefPath.set(localStorage.getItem("refPath"));
    //   localStorage.removeItem("refPath");
    // }
    let refPath = localStorage.getItem("refPath");
    console.log("RefPath: ", refPath);
    if (refPath) {
      // localStorage.removeItem("refPath");
      btSuccess.set("Logged in.  Enjoy the games!");
      navigate(refPath);
      // return <Navigate to={refPath} />;
      // btRefPath.set(localStorage.getItem("refPath"));
    }
  });

  return <></>;
}

export default LoginSuccess;
