import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { btRefPath, btSuccess } from "../../actions/buckets";
import { useBucket } from "../../actions/bucket";

function LoginSuccess(props) {
  const history = useNavigate();
  const location = useLocation();

  let refPath = useBucket(btRefPath);

  useEffect(() => {
    if (localStorage.getItem("refPath")) {
      btRefPath.set(localStorage.getItem("refPath"));
      localStorage.removeItem("refPath");
    }
  });

  btSuccess.set("Logged in.  Enjoy the games!");

  return <Navigate to={refPath} />;
}

export default LoginSuccess;
