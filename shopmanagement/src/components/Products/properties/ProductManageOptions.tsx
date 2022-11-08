import { Product as ProductModel } from "../../../model/Product";
import { Alert, CardMedia, CircularProgress, Fab } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import UserContext, { IUserContext } from "../../../contexts/UserContext";
import { Role } from "../../../model/Role";
import { useProduct } from "../../../hooks/useProduct";
import { Navigate } from "react-router-dom";

export function ProductManageOptions({ product }: { product: ProductModel }) {
  const { isDeletingProduct, isDeletingProductError, deleteProductMutation } =
    useProduct(product.id.toString());
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
  const navigate = useNavigate();
  if (loggedIn && role === Role.Admin) {
    return (
      <div>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Options
          </Typography>
          <Divider />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => navigate('edit')}>
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteProductMutation(product.id);
                setIsSuccessful(true);
              }}
            >
              Delete
            </Button>
            {isDeletingProduct && <CircularProgress />}
            {isDeletingProductError && (
              <Alert severity="error">Error</Alert>
            )}
            {isSuccessful && !isDeletingProductError && !isDeletingProduct && (
              <Navigate to="/products" />
            )}
          </Stack>
        </Paper>
      </div>
    );
  } else {
    return null;
  }
}
