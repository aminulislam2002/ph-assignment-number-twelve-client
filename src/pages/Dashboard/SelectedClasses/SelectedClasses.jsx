import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const SelectedClasses = () => {
  const { user } = useAuth();
  const { data: selectedClasses = [], refetch } = useQuery(["selectedClasses"], async () => {
    const res = await fetch(
      `https://ph-assignment-number-twelve-server.vercel.app/selectedClasses?userEmail=${user?.email}`
    );
    return res.json();
  });

  const handleDeleteClass = async (classData) => {
    await fetch(`https://ph-assignment-number-twelve-server.vercel.app/selectedClasses/${classData._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Class Removed",
            text: "You have successfully removed the class.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to remove the class. Please try again.",
          });
        }
      });
  };

  return (
    <div
      className="container bg-gray-900 w-full h-full
     mx-auto p-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Selected Classes</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {selectedClasses.map((classItem) => (
          <div key={classItem._id} className="p-8 shadow-md border rounded-lg bg-gray-800 text-white flex">
            <img src={classItem.image} alt={classItem.name} className="h-24 w-24 rounded-md mr-6" />
            <div>
              <h2 className="text-xl font-bold mb-2 text-white">
                Hello, <span className="text-green-300">{user.displayName}</span>! Complete{" "}
                <span className="text-yellow-300">{classItem.name}</span> Course with{" "}
                <span className="text-blue-300">{classItem.instructorName}</span>
              </h2>
              <p className="text-lg text-gray-400 mb-2">
                <span className="font-bold">Fee:</span> {classItem.price}
              </p>
              <p className="text-lg text-gray-400 mb-2">
                <span className="font-bold">Available Seat:</span> {classItem.availableSeats}
              </p>
              <div className="flex justify-between">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out">
                    Pay Now
                  </button>
                
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-red-600 transition-colors duration-300 ease-in-out"
                  onClick={() => handleDeleteClass(classItem)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedClasses;
