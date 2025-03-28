import {create} from "zustand";

export const useProductStore = create((set)=>({
    products:[],
    fetchProducts:async()=>{
     try {
      const response = await fetch(`/api/products/displayproducts`)
     const data = await response.json()
     set({products:data.product})
     return {success:true,message:data.product}
     } catch (error) {
      console.log(error)
      return {success:false,message:"Unknown error occured!"}
     }
    },
    createProduct:async(newProduct)=>{
        if(!newProduct.productname||!newProduct.price||!newProduct.photo||!newProduct.note){
            return {success:false,message:"Fill the fields!"}
        }
        if(!newProduct.projectOwner) return {success:false,message:"Error with login token"}
      try {
        const response = await fetch(`/api/products/addpost`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await response.json();
        set((state)=>({products:[...state.products,data.message]}))
        console.log("adId",newProduct.projectOwner)
        console.log("adId",data.message._id)
        const responseFromPut = await fetch("/api/admins/addpatientstoadmin",{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({adminID:newProduct.projectOwner,patientID:data.message._id})
        })
        if (!responseFromPut.ok) {
          throw new Error("Failed to update admin's patients");
      }
        const dataFromPut = await responseFromPut.json();
        console.log(dataFromPut.message.patients)
        alert("Added the data to the database!")
       return {success:true,message:"Added to the database"}
      } catch (error) {
        console.log(error);
        return {success:false,message:"Internal server error."}
      }
    },
    updateProduct:async(id,productbody)=>{
     try {
      const response = await fetch(`/api/products/updateproduct/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(productbody)
      })
      if(!response.ok) throw new Error("Error while fetching.")
        const data = await response.json();
       //update the UI without refreshing
      set((state)=>{state.products.map((product)=>product._id===id?data.updatedProduct:product)})
       return {success:true,message:data.updatedProduct}
      } catch (error) {
      return {success:false,message:error.message}
     } 
    },
    deleteProduct:async(id)=>{
      try {
        const response = await fetch(`/api/products/deleteproduct/${id}`,{
          method:"DELETE"
        })
        const data = await response.json();
        if(!data.success) return {success:false,message:data.message};
        set((state)=>({products:state.products.filter(product=>product._id!==id)}))
        return {success:true,message:data.message}
      } catch (error) {
        set((state)=>({products:{...state.products}}))
        return {success:false,message:data.message};
      }
    }
}))

export const useEachProductStore = create((set)=>(
  {
    matchProduct:null,
    fetchProductById: async (id) => {
      try {
        const response = await fetch(`/api/products/displayeachproduct/${id}`);
        
        if (!response.ok) throw new Error("Error while fetching!");
    
        const data = await response.json();
        console.log(data)
        if(!data.success){
          return { success: false, message: data.message || "Failed to fetch product" };
        }
    
        set({ matchProduct: data.message });
    
        return { success: true, message: data.message };
      } catch (error) {
        return { success: false, message: error.message || "An unknown error occurred" };
      }
    }, 
    clearFetchProduct:async()=>{
     set({matchProduct:null})
    }
  }
))