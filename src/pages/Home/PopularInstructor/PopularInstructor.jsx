import { useQuery } from "@tanstack/react-query";

const PopularInstructor = () => {
  const { data: instructors = [] } = useQuery(["instructors"], async () => {
    const res = await fetch("https://ph-assignment-number-twelve-server.vercel.app/users/instructors");
    return res.json();
  });
  return (
    <div className="bg-gray-900">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12">
        <div className="container mx-auto flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold mb-4">Popular Instructor</h2>
          <p className="text-lg mb-8">Discover our most popular instructors!</p>
          <button className="bg-white text-indigo-600 py-3 px-8 rounded-full font-medium hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">
            Explore Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 container mx-auto p-8">
        {instructors.map((instructor) => (
          <div key={instructor._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img className="w-32 h-32 mx-auto rounded-full mb-4" src={instructor.photo} alt={instructor.name} />
            <div className="text-center">
              <h2 className="text-lg font-bold mb-2 text-white">{instructor.name}</h2>
              <p className="text-sm text-gray-300">{instructor.email}</p>
              <button className="mt-4 w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition duration-300 ease-in-out">
                Contact {instructor.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
