import { Shelf } from "../../model/Shelf";
import { useContext } from "react";
import "./css/floorplan.css";
import { getColor } from "../../utils/colorgrading";
import { ShelfProduct } from "../../model/ShelfProduct";
import UserContext, { IUserContext } from "../../context/UserContext";
import { Role } from "../../model/Role";
import { Product } from "../../model/Product";
import { ProductOnShelf } from "./ProductOnShelf";

export function ShelfOnFloorplan({
  shelf,
  storedproduct,
  products,
  selectedproduct,
  onClickEdit,
}: {
  shelf: Shelf;
  storedproduct: ShelfProduct;
  products: Product[];
  selectedproduct: String | undefined;
  onClickEdit: (storedproduct: ShelfProduct) => void;
}) {
  const { loggedIn, role } = useContext<IUserContext>(UserContext);
  return (
    <div
      className="shelf"
      key={shelf.id}
      style={{
        position: "absolute",
        bottom: (shelf.x / 936) * 100 + "%",
        left: (shelf.y / 1920) * 100 + "%",
        height: (shelf.height / 936) * 100 + "%",
        width: (shelf.width / 1920) * 100 + "%",
        border: "5px solid",
        borderColor:
          loggedIn && role === Role.Admin
            ? getColor(1 - storedproduct.quantity / storedproduct.MaxQuantity)
            : storedproduct.productId.toString() === selectedproduct
            ? "Gold"
            : "black",
      }}
    >
      {products
        .filter((product) => product.id === storedproduct.productId)
        .map((product) => {
          return (
            <ProductOnShelf
              product={product}
              storedproduct={storedproduct}
              onClickEdit={onClickEdit}
            />
          );
        })}
    </div>
  );
}
