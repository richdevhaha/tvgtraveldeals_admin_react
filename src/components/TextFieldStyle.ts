export const autoFillTextFieldSxProps = {
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px transparent inset !important",
      backgroundColor: "transparent",
    },
  },
};

export const textFieldInputProps = {
  style: { fontSize: 14, height: 40 },
};

export const textSXProps = {
  // marginTop: 1,
  // "& .MuiOutlinedInput-root": {
  //   backgroundColor: "rgba(40, 44, 70, 0.5)",
  //   "&:hover": { backgroundColor: "rgba(40, 44, 70, 1)" },
  //   "&.Mui-focused": { backgroundColor: "rgba(40, 44, 70, 1)" },
  //   "& fieldset": { borderColor: "transparent" },
  //   "&.Mui-focused fieldset": { borderColor: "white", borderWidth: "1px" },
  // },
};
