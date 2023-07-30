import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const AddClass = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    fetch(`https://ph-assignment-number-twelve-server.vercel.app/classes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged === true) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to add class!",
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
          <h1 className="text-3xl font-bold text-center mb-6">Add a Class</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="Name"
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
                type="text"
                {...register("availableSeats", {
                  required: true,
                  valueAsNumber: true,
                })}
                name="availableSeats"
                placeholder="Available Seats"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.availableSeats && (
                <p className="text-red-600 text-xs italic">Available Seats is required and must be a number</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input
                type="text"
                {...register("price", {
                  required: true,
                  valueAsNumber: true,
                })}
                name="price"
                placeholder="Price"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.price && <p className="text-red-600 text-xs italic">Price is required and must be a number</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
