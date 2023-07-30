import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateClass = () => {
  const { user } = useAuth();
  const singleClassData = useLoaderData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await fetch(`https://ph-assignment-number-twelve-server.vercel.app/classes/${singleClassData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            reset();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to update class!",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to add class:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Update a Class</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="Name"
                defaultValue={singleClassData.name}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.name && <p className="text-red-600 text-xs italic">Name is required</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <input
                type="text"
                {...register("description", { required: true })}
                name="description"
                placeholder="Description"
                defaultValue={singleClassData.description}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.description && <p className="text-red-600 text-xs italic">Description is required</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
              <input
                type="text"
                {...register("image", { required: true })}
                name="image"
                placeholder="Image URL"
                defaultValue={singleClassData.image}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.image && <p className="text-red-600 text-xs italic">Image URL is required</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Instructor Name</label>
              <input
                type="text"
                {...register("instructorName", { required: true })}
                name="instructorName"
                placeholder="Instructor Name"
                defaultValue={user.displayName}
                readOnly
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.instructorName && <p className="text-red-600 text-xs italic">Instructor Name is required</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Instructor Email</label>
              <input
                type="email"
                {...register("instructorEmail", { required: true })}
                name="instructorEmail"
                placeholder="Instructor Email"
                defaultValue={user.email}
                readOnly
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.instructorEmail && <p className="text-red-600 text-xs italic">Instructor Email is required</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Available Seats</label>
              <input
                type="number"
                {...register("availableSeats", { required: true })}
                name="availableSeats"
                placeholder="Available Seats"
                defaultValue={singleClassData.availableSeats}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.availableSeats && <p className="text-red-600 text-xs italic">Available Seats is required</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input
                type="number"
                {...register("price", { required: true })}
                name="price"
                placeholder="Price"
                defaultValue={singleClassData.price}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.price && <p className="text-red-600 text-xs italic">Price is required</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClass;
