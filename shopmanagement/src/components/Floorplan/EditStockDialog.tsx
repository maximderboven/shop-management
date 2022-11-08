import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { ShelfProduct, ShelfProductData } from "../../model/ShelfProduct";

const REQUIRED_FIELD_MESSAGE = "This field is required";
const MINLENGTH = 'Please enter a digit greater than 0';
const MAXLENGTHQUANTITY = (length: number) =>
  `Please enter a value less than the MaxQuantity of ${length}.`;
const MINLENGTHMAXQUANTITY = (length: number) =>
  `Please enter a value greater than the Quantity of ${length}.`;

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ShelfProductData) => void;
  product: ShelfProduct;
}

export default function EditStockDialog({
  isOpen,
  onClose,
  onSubmit,
  product,
}: AddItemDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      spot: product?.spot,
      quantity: product?.quantity,
      MaxQuantity: product?.MaxQuantity,
    },
  });

  const _onSubmit = (data: ShelfProductData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  useEffect(() => {
    reset(product);
  }, [product]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <DialogTitle>Edit stock from </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Controller
              name="quantity"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: REQUIRED_FIELD_MESSAGE,
                },
                min: {
                  value: 0,
                  message: MINLENGTH,
                },
                max: {
                  value: (watch("MaxQuantity") as number),
                  message: MAXLENGTHQUANTITY(watch("MaxQuantity") as number),
                },
              }}
              render={({ field }) => (
                <TextField
                  defaultValue={product!.quantity}
                  {...field}
                  label="Quantity"
                  type="number"
                  // value={product.quantity.toString()}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                />
              )}
            />
            <Controller
              name="MaxQuantity"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: REQUIRED_FIELD_MESSAGE,
                },
                min: {
                  value: (watch("quantity") as number),
                  message: MINLENGTHMAXQUANTITY(watch("quantity") as number),
                },
              }}
              render={({ field }) => (
                <TextField
                  defaultValue={product!.MaxQuantity}
                  {...field}
                  label="MaxQuantity"
                  type="number"
                  // value={product.MaxQuantity.toString()}
                  error={!!errors.MaxQuantity}
                  helperText={errors.MaxQuantity?.message}
                />
              )}
            />
          </div>
        </DialogContent>
        <DialogActions
          style={{ paddingRight: "1.5em", paddingBottom: "1.5em" }}
        >
          <Button type="reset" variant="outlined" onClick={() => reset()}>
            Clear
          </Button>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
