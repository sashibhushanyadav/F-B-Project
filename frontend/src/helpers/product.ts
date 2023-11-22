export const payloadForCartItem = (data: any, qty: any) => {
    return {
      productId: data.id,
      productName: data.name,
      productImage: data.productImage,
      price: data.price,
      qty,
      countInStock: data.countInStock,
    };
  };