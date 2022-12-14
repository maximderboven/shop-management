import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ShelfProductData } from "../../model/ShelfProduct";

const REQUIRED_FIELD_MESSAGE = "This field is required";
const MINLENGTH = 'Please enter a digit greater than 0';
const MAXLENGTHQUANTITY = (length: number) =>
  `Please enter a value less than the MaxQuantity of ${length}.`;
const MINLENGTHMAXQUANTITY = (length: number) =>
  `Please enter a value greater than the Quantity of ${length}.`;

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: ShelfProductData,
    shelfId: number,
    productId: number
  ) => void;
  shelfId: number;
  productId: number;
}

export default function AddStockDialog({
  isOpen,
  onClose,
  onSubmit,
  productId,
  shelfId,
}: AddItemDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      spot: 0,
      quantity: 10,
      MaxQuantity: 10,
    },
  });

  const _onSubmit = (data: ShelfProductData) => {
    onSubmit(data, Number(shelfId), Number(productId));
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <DialogTitle>Add Stock</DialogTitle>
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
                  {...field}
                  label="Quantity"
                  type="number"
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
                  {...field}
                  label="MaxQuantity"
                  type="number"
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
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
