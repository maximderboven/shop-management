import { Chip } from "@mui/material";
import { useContext } from "react";
import "./css/floorplan.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { getColor } from "../../utils/colorgrading";
import { ShelfProduct } from "../../model/ShelfProduct";
import UserContext, { IUserContext } from "../../context/UserContext";
import { Role } from "../../model/Role";
import { Price } from "../Products/properties/Price";
import EditIcon from "@mui/icons-material/Edit";
import { Product } from "../../model/Product";
import { useStoredProducts } from "../../hooks/useStoredProducts";

export function ProductOnShelf({
  product,
  storedproduct,
  onClickEdit,
}: {
  product: Product;
  storedproduct: ShelfProduct;
  onClickEdit: (storedproduct: ShelfProduct) => void;
}) {
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
  const {
    deleteProductMutation,
  } = useStoredProducts();

  const deleteStoredProduct = (id: number) => {
    deleteProductMutation(id);
  };

  return (
    <div className="product">
      {loggedIn && role === Role.Admin && (
        <CancelIcon
          onClick={() => deleteStoredProduct(storedproduct.id)}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 0,
            right: 0,
            color: "red",
            zIndex: 100,
          }}
        />
      )}
      <div className="wrap">
        <img
          src={product?.image}
          alt={product?.name}
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      <div className="text">
        <span>
          {product?.name}
          <br />
          <Price product={product} />
          <br />
          {loggedIn && role === Role.Admin ? (
            <Chip
              onClick={() => onClickEdit(storedproduct)}
              icon={<EditIcon />}
              style={{
                backgroundColor: getColor(
                  1 - storedproduct.quantity / storedproduct.MaxQuantity
                ),
              }}
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
              label={storedproduct.quantity + "/" + storedproduct.MaxQuantity}
            />
          ) : null}
        </span>
      </div>
    </div>
  );
}
