import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, Switch, TextField, Typography } from "@mui/material";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { APP_IMAGES } from "../../config";
import { LogInDto } from "../../dtos";
import {
  LoadingLogoView,
  CoverLayout,
  textFieldInputProps,
  autoFillTextFieldSxProps,
  textSXProps,
} from "../../components";
import { fetchLoginAction } from "../../redux/auth/actions";
import { authSelector } from "../../redux/auth/selector";
import { RoutePath } from "../../routes";

const resolver = classValidatorResolver(LogInDto);

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { authorizing, isLoggedIn, error } = useSelector(authSelector);

  useEffect(() => {
    const abortController = new AbortController();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn && !error) {
      navigate(RoutePath.dashboard);
    } else if (error && error.message) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
    }
  }, [error, isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInDto>({ resolver, defaultValues: { email: "", password: "" } });

  const onSubmit = (data: LogInDto) => {
    setErrorMessage("");
    dispatch(fetchLoginAction(data));
  };

  return (
    <CoverLayout
      title="Welcome to back"
      description="Enter your email and password"
      premotto="INSPIRED BY THE FUTURE"
      motto="TVG Travel Deals"
      image={APP_IMAGES.bgSignIn2}
    >
      <LoadingLogoView variant="primary" visible={authorizing} />
      <Box component="form" role="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography component="label" variant="button">
              Email
            </Typography>
          </Box>
          <TextField
            required
            fullWidth
            type="email"
            size="small"
            autoComplete="email"
            placeholder="Your email..."
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
            InputProps={textFieldInputProps}
            InputLabelProps={textFieldInputProps}
            sx={{ ...autoFillTextFieldSxProps, ...textSXProps, textTransform: "lowercase" }}
          />
        </Box>
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography component="label" variant="button">
              Password
            </Typography>
          </Box>
          <TextField
            required
            fullWidth
            type="password"
            size="small"
            placeholder="Your password..."
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            InputProps={textFieldInputProps}
            InputLabelProps={textFieldInputProps}
            sx={{ ...autoFillTextFieldSxProps, ...textSXProps, textTransform: "lowercase" }}
          />
        </Box>
        <Box display="none" alignItems="center">
          <Switch color="primary" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
          <Typography
            variant="caption"
            fontWeight="medium"
            onClick={() => setRememberMe(!rememberMe)}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember Me
          </Typography>
        </Box>
        {errorMessage && (
          <Alert variant="outlined" severity="error" sx={{ mt: 2, mb: 1, width: 300 }}>
            {errorMessage}
          </Alert>
        )}
        <Box mt={8} mb={1}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            SIGN IN
          </Button>
        </Box>
        <Box mt={3} textAlign="center" display="none">
          <Typography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <Typography component={Link} to="/register" variant="button" fontWeight="medium" color="primary">
              Register
            </Typography>
          </Typography>
        </Box>
      </Box>
    </CoverLayout>
  );
};
