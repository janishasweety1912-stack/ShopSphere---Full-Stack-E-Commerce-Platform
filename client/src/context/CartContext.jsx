import { createContext,useEffect,useState } from "react";

export const CartContext=createContext();

function CartProvider({children}){

  const [cartItems,setCartItems]=useState(()=>{
    const savedCart=localStorage.getItem("cartItems");
    return savedCart?JSON.parse(savedCart):[];
  });

  const [toast,setToast]=useState("");

  const [orderDetails,setOrderDetails]=useState(null);

  const [orders,setOrders]=useState(()=>{
    const savedOrders=localStorage.getItem("orders");
    return savedOrders?JSON.parse(savedOrders):[];
  });

  useEffect(()=>{
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  },[cartItems]);

  useEffect(()=>{
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  },[orders]);

  const showToast=(message)=>{
    setToast(message);

    setTimeout(()=>{
      setToast("");
    },2000);
  };

  const addToCart=(product)=>{

    setCartItems(prevItems=>{

      const existingProduct=prevItems.find(
        item=>item.id===product.id
      );

      if(existingProduct){

        return prevItems.map(item=>
          item.id===product.id
          ?
          {
            ...item,
            quantity:(item.quantity||1)+(product.quantity||1)
          }
          :
          item
        );

      }

      return[
        ...prevItems,
        {
          ...product,
          quantity:product.quantity||1
        }
      ];

    });

    showToast(`${product.name} added to cart`);

  };

  const removeFromCart=(id)=>{

    setCartItems(prevItems=>
      prevItems.filter(
        item=>item.id!==id
      )
    );

    showToast("Product removed from cart");

  };

  const increaseQuantity=(id)=>{

    setCartItems(prevItems=>
      prevItems.map(item=>
        item.id===id
        ?
        {
          ...item,
          quantity:(item.quantity||1)+1
        }
        :
        item
      )
    );

  };

  const decreaseQuantity=(id)=>{

    setCartItems(prevItems=>
      prevItems.map(item=>
        item.id===id&&item.quantity>1
        ?
        {
          ...item,
          quantity:item.quantity-1
        }
        :
        item
      )
    );

  };

  const clearCart=()=>{
    setCartItems([]);
  };

  const saveOrder=(order)=>{

    const newOrder={
      id:"ZS"+Math.floor(100000+Math.random()*900000),
      date:new Date().toLocaleDateString(),
      status:"Placed",
      ...order
    };

    setOrders(prevOrders=>[
      ...prevOrders,
      newOrder
    ]);

    setOrderDetails(newOrder);

  };

  return(
    <CartContext.Provider
      value={{
        cart:cartItems,
        cartItems,
        addToCart,
        toast,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        orderDetails,
        saveOrder,
        orders
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;