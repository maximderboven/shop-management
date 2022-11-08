import { Product as ProductModel } from "../../../model/Product";
import Typography from "@mui/material/Typography";

export function Price({ product }: { product: ProductModel }) {
  if (!product.discount) {
    return (
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        €{product.price}
      </Typography>
    );
  } else {
    return (
      <div>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <p>
            <span style={{ color: "red", textDecoration: "line-through" }}>
              €{product.price}
            </span>{" "}
            €
            {product.discount
              ? product.price -
                product.price * (product.discountPercentage / 100)
              : product.price}
          </p>
        </Typography>
      </div>
    );
  }
}
