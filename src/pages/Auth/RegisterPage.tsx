import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

// import { fetchLoginAction } from "../../redux/auth/actions";
import { CoverLayout } from "../../components";
import { RoutePath } from "../../routes";
import bgSignIn from "../../assets/jpgs/body-background.jpg";
// import bgSignIn from "../../assets/pngs/signInImage.png";

export const RegisterPage = () => {
  // const dispatch = useDispatch();
  // const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();

  const doLogin = () => navigate(RoutePath.dashboard);
  // const doLogin = useCallback((id: any) => dispatch(fetchLoginAction(id)), [dispatch]);

  return (
    <CoverLayout
      title="Welcome to back"
      description="Enter your information"
      premotto="INSPIRED BY THE FUTURE"
      motto="TVG Travel Deals"
      image={bgSignIn}
    >
      <Box component="form" role="form">
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography component="label" variant="button">
              Name
            </Typography>
          </Box>
          <TextField type="text" placeholder="Your name..." size="small" sx={{ minWidth: "100%" }} />
        </Box>
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography component="label" variant="button">
              Email
            </Typography>
          </Box>
          <TextField type="email" placeholder="Your email..." size="small" sx={{ minWidth: "100%" }} />
        </Box>
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography component="label" variant="button">
              Password
            </Typography>
          </Box>
          <TextField type="password" placeholder="Your password..." size="small" sx={{ minWidth: "100%" }} />
        </Box>
        {/* <Box display="flex" alignItems="center">
          <Switch color="primary" checked={rememberMe} onChange={() => setRememberMe(!rememberMe))} />
          <Typography
            variant="caption"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember Me
          </Typography>
        </Box> */}
        <Box mt={4} mb={1}>
          <Button variant="contained" color="primary" fullWidth onClick={doLogin}>
            Register
          </Button>
        </Box>
        <Box mt={3} textAlign="center">
          <Typography variant="button" color="text" fontWeight="regular">
            Do you have an account?{" "}
            <Typography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              fontWeight="medium"
              color="primary"
            >
              Login
            </Typography>
          </Typography>
        </Box>
      </Box>
    </CoverLayout>
  );
};
