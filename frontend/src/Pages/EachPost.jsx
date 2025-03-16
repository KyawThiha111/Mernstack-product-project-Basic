import { Link, useParams } from "react-router";
import { useEachProductStore } from "../zustand_Store/products";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useProductStore } from "../zustand_Store/products"; // Import useProductStore
import UpdateBox from "../Components/Update";
const SeeEachPost = () => {
    const { matchProduct, fetchProductById, clearFetchProduct } = useEachProductStore();
    const { deleteProduct } = useProductStore(); // Get deleteProduct
    const { id } = useParams();
    const navigate = useNavigate();
    const [clickEdit,setClickEdit] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const { success, message } = await fetchProductById(id);
            console.log(success, message);
        };
        fetchData();
    }, [id, fetchProductById]);
    const deleteButton = async (id) => {
        const { success, message } = await deleteProduct(id);
        if (success) {
            alert("Item deleted!");
            navigate("/seeproducts");
        }
        console.log(success,message);
        return;
    };

    return (
        <div className="container-fluid h-[100vh] lg:container mx-auto relative">
            <div className="w-[70%] lg:w-[50%] mx-auto">
                <div>
                <div>
                    <h1 className="text-2xl lg:text-3xl text-center text-gray-600 my-3">
                        Patient Name:
                        <span className="text-black ms-2 font-bold">{matchProduct?.productname || "Loading..."}</span>
                    </h1>
                </div>

                <div className="bg-gray-400">
                    <p>Patient Price: {matchProduct?.price || "Loading..."}</p>
                    <div>
                        <div className="w-[100%] my-3 mx-auto">
                            <p>Patient Photos:</p>
                            {matchProduct?.photo ? (
                                <img src={matchProduct.photo} alt="Patient Photo" />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                    </div>
                    <div className="flex">
                        <p className="w-[50%]">Registered Date:</p>
                        <p className="w-[50%]">{matchProduct?.createdAt?.split("T")[0] || "N/A"}</p>
                    </div>
                    <div className="flex">
                        <p className="w-[50%]">Registered Time:</p>
                        <p className="w-[50%]">{matchProduct?.createdAt?.split("T")[1] || "N/A"}</p>
                    </div>
                </div>

                {/* Edit delete part */}
                <div className="mx-auto w-[100%] py-3 flex justify-end flex-col">
                    <button onClick={() => deleteButton(id)} className="bg-red-400 py-2 text-center px-3 border shadow-xl border-gray-400 border-2">
                        Remove {matchProduct?.productname || "Product"}
                    </button>
                    <button onClick={()=>setClickEdit(true)}  className="bg-red-400 py-2 text-center px-3 border shadow-xl border-gray-400 border-2">
                        Edit
                    </button>
                </div>
                </div>

                {/* Edit Part */}
                {
                    clickEdit&&(
                     <UpdateBox setClickEdit={setClickEdit} id={id}/>
                    )
                }
            </div>
        </div>
    );
};

export default SeeEachPost;
