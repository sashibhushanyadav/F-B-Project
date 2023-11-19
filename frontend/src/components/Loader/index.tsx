import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

const Loader = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row" />
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loader;
