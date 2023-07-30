import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Classes = () => {
  const { user } = useAuth();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await fetch("https://ph-assignment-number-twelve-server.vercel.app/classes?status=approve");
    return res.json();
  });

  const { data: currentUser = [] } = useQuery(["currentUser"], async () => {
    const res = await fetch(`https://ph-assignment-number-twelve-server.vercel.app/user/${user?.email}`);
    return res.json();
  });
  console.log(user?.email);

  const handleSelectClass = async (classData) => {
    const selectedClass = {
      ...classData,
      userEmail: user.email,
    };

    delete selectedClass._id;

    fetch(`https://ph-assignment-number-twelve-server.vercel.app/selectedClasses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedClass),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged == true) {
          refetch();
          console.log("Selected Class:", classData);
          Swal.fire({
            icon: "success",
            title: "Seat Selected",
            text: "You have successfully selected a seat.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to select a seat. Please try again.",
          });
        }
      });
  };

  return (
    <div className="container mx-auto bg-gray-900 min-h-screen mt-20">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">Classes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classes.map((classData) => (
          <div
            key={classData._id}
            className={`class-card ${
              classData.availableSeats === 0 ? "bg-red-100" : "bg-gray-800"
            } p-4 rounded-lg shadow-lg flex flex-col`}
          >
            <div className="class-image-wrapper mb-4">
              <img className="class-image w-full h-40 rounded-md" src={classData.image} alt={classData.name} />
            </div>
            <div className="class-details flex flex-col justify-between">
              <div>
                <h2 className="class-name text-xl font-semibold mb-2 text-white">{classData.name}</h2>
                <p className="instructor-name text-sm text-gray-300">
                  Instructor: <span className="text-green-400">{classData.instructorName}</span>
                </p>
                <p className="available-seats text-sm text-gray-300">
                  Available Seats:{" "}
                  <span className={`${classData.availableSeats === 0 ? "text-red-500" : "text-green-300"}`}>
                    {classData.availableSeats}
                  </span>
                </p>
                <p className="price text-sm text-gray-300">
                  Price: <span className="text-yellow-400">{classData.price}</span>
                </p>
              </div>
              <button
                className="select-button mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  currentUser.role === "admin" || currentUser.role === "instructor" || classData.availableSeats === 0
                }
                onClick={() => handleSelectClass(classData)}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
