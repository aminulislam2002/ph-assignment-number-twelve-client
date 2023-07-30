import { useQuery } from "@tanstack/react-query";

const PopularClass = () => {
  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await fetch("https://ph-assignment-number-twelve-server.vercel.app/classes?status=approve");
    return res.json();
  });

  return (
    <div className="bg-gray-900 pt-20">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12">
        <div className="container mx-auto flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold mb-4">Popular Classes</h2>
          <p className="text-lg mb-8">Discover our most sought-after classes!</p>
          <button className="bg-white text-indigo-600 py-3 px-8 rounded-full font-medium hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">
            Explore Now
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 container mx-auto p-8">
        {classes.map((classItem) => (
          <div key={classItem._id} className="classItem-card rounded-lg shadow-md flex flex-col justify-between bg-gray-800">
            <img src={classItem.image} alt={classItem.name} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="class-name text-xl font-semibold mb-2 text-white">{classItem.name}</h2>
                <p className="instructor-name text-sm text-gray-300">
                  Instructor: <span className="text-green-400">{classItem.instructorName}</span>
                </p>
                <p className="available-seats text-sm text-gray-300">
                  Available Seats:{" "}
                  <span className={`${classItem.availableSeats === 0 ? "text-red-500" : "text-green-300"}`}>
                    {classItem.availableSeats}
                  </span>
                </p>
                <p className="price text-sm text-gray-300">
                  Price: <span className="text-yellow-400">{classItem.price}</span>
                </p>
              </div>
              <button className="mt-4 bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition duration-300 ease-in-out">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClass;
