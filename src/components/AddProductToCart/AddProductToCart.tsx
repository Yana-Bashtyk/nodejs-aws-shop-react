import Typography from "@mui/material/Typography";
import { Product } from "~/models/Product";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { useCart, useInvalidateCart, useUpsertCart } from "~/queries/cart";
import { DataReturn } from "~/models/CartItem";

type AddProductToCartProps = {
  product: Product;
};

export default function AddProductToCart({ product }: AddProductToCartProps) {
  const { data = {} as DataReturn, isFetching } = useCart();
  const { mutate: upsertCart } = useUpsertCart();
  const invalidateCart = useInvalidateCart();

  const cartItem = data.cart ? data.cart.items.find((i: any) => i.product.id === product.id) : undefined;

  const addProduct = () => {
    upsertCart(
      { product, count: cartItem ? cartItem.count + 1 : 1 },
      { onSuccess: invalidateCart }
    );
  };

  const removeProduct = () => {
    if (cartItem) {
      upsertCart(
        { ...cartItem, count: cartItem.count - 1 },
        { onSuccess: invalidateCart }
      );
    }
  };

  return cartItem ? (
    <>
      <IconButton disabled={isFetching} onClick={removeProduct} size="large">
        <Remove color={"secondary"} />
      </IconButton>
      <Typography align="center">{cartItem.count}</Typography>
      <IconButton disabled={isFetching} onClick={addProduct} size="large">
        <Add color={"secondary"} />
      </IconButton>
    </>
  ) : (
    <IconButton disabled={isFetching} onClick={addProduct} size="large">
      <CartIcon color={"secondary"} />
    </IconButton>
  );
}
