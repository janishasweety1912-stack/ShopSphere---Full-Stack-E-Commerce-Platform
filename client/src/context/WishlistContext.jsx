import { createContext,useEffect,useState } from "react";

export const WishlistContext=createContext();

function WishlistProvider({children}){

  const [wishlist,setWishlist]=useState(()=>{
    const savedWishlist=localStorage.getItem("wishlist");
    return savedWishlist?JSON.parse(savedWishlist):[];
  });

  const [toast,setToast]=useState("");

  useEffect(()=>{
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  },[wishlist]);


  const showToast=(message)=>{
    setToast(message);

    setTimeout(()=>{
      setToast("");
    },2000);
  };


  const addToWishlist=(product)=>{

    setWishlist(prev=>{

      const exists=prev.find(
        item=>item.id===product.id
      );

      if(exists){
        return prev;
      }

      return [
        ...prev,
        product
      ];

    });

    showToast(`${product.name} added to wishlist`);

  };


  const removeFromWishlist=(id)=>{

    setWishlist(prev=>
      prev.filter(
        item=>item.id!==id
      )
    );

    showToast("Product removed from wishlist");

  };


  const isInWishlist=(id)=>{

    return wishlist.some(
      item=>item.id===id
    );

  };


  return(
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toast
      }}
    >
      {children}
    </WishlistContext.Provider>
  );

}

export default WishlistProvider;