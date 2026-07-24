import { Alert, type AlertProps } from "@mui/material";

interface Props extends AlertProps {}

const InfoAlert = ({ children, ...props }: Props) => {
  return (
    <Alert
      severity="info"
      sx={{
        borderRadius: 2,
        mb: 3,
      }}
      {...props}
    >
      {children}
    </Alert>
  );
};

export default InfoAlert;
