import { useQuery } from "@tanstack/react-query";

const Instructor = () => {
  const { data: instructors = [] } = useQuery(["instructors"], async () => {
    const res = await fetch("https://ph-assignment-number-twelve-server.vercel.app/users/instructors");
    return res.json();
  });

  return (
    <div className="container mx-auto bg-gray-900 min-h-screen mt-20 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Instructors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {instructors.map((instructor) => (
          <div key={instructor._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img className="w-32 h-32 mx-auto rounded-full mb-4" src={instructor.photo} alt={instructor.name} />
            <div className="text-center">
              <h2 className="text-lg font-bold mb-2 text-white">{instructor.name}</h2>
              <p className="text-sm text-gray-300">{instructor.email}</p>
              <button className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out">
                Contact {instructor.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructor;
