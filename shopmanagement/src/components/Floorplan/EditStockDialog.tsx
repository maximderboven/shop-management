import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ShelfProduct, ShelfProductData } from "../../model/ShelfProduct";

// TODO validate URL fields and add icon andornments
const REQUIRED_FIELD_MESSAGE = "This field is required";
const MIN_LENGHT_MESSAGE = (length: number) =>
  `Please enter minimum ${length} characters.`;

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
                  value: 1,
                  message: MIN_LENGHT_MESSAGE(1),
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
                  value: 1,
                  message: MIN_LENGHT_MESSAGE(1),
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
