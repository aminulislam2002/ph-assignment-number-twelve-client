import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: manageClasses = [], refetch } = useQuery(["manageClasses"], async () => {
    const res = await axiosSecure.get("/manageClasses");
    return res.data;
  });

  const [feedback, setFeedback] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleMakeStatus = (classItem, status) => {
    fetch(`https://ph-assignment-number-twelve-server.vercel.app/classes/status/${classItem._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update class status");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.acknowledged === true) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${classItem.name}'s status is now ${status}!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to update class status:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const handleSendFeedback = () => {
    fetch(`https://ph-assignment-number-twelve-server.vercel.app/classes/feedback/${selectedClass._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to send feedback");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.acknowledged === true) {
          refetch();
          setFeedback("");
          setModalOpen(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Feedback sent for ${selectedClass.name}!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to send feedback:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const openFeedbackModal = (classItem) => {
    setSelectedClass(classItem);
    setModalOpen(true);
  };

  return (
    <div className="w-full h-full py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Classes</h1>
        {manageClasses.length === 0 ? (
          <p>No classes found.</p>
        ) : (
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="py-3 px-4">Class Image</th>
                <th className="py-3 px-4">Class Name</th>
                <th className="py-3 px-4">Instructor Name</th>
                <th className="py-3 px-4">Instructor Email</th>
                <th className="py-3 px-4">Available Seats</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
                <th className="py-3 px-4">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {manageClasses.map((classItem) => (
                <tr key={classItem._id} className="border-t">
                  <td className="py-4 px-4">
                    <img src={classItem.image} alt="Image" />
                  </td>
                  <td className="py-4 px-4">{classItem.name}</td>
                  <td className="py-4 px-4">{classItem.instructorName}</td>
                  <td className="py-4 px-4">{classItem.instructorEmail}</td>
                  <td className="py-4 px-4">{classItem.availableSeats}</td>
                  <td className="py-4 px-4">{classItem.price}</td>
                  <td>
                    {classItem.status === "approve" ? (
                      <span className="badge badge-primary">Approve</span>
                    ) : classItem.status === "deny" ? (
                      <span className="badge badge-success">Deny</span>
                    ) : (
                      <span className="badge badge-info">Pending</span>
                    )}
                  </td>
                  <td>
                    {classItem.status !== "approve" && (
                      <button
                        onClick={() => handleMakeStatus(classItem, "approve")}
                        className="btn w-full text-sm bg-indigo-600 text-white"
                        disabled={classItem.status === "approve"}
                      >
                        Approve
                      </button>
                    )}
                    {classItem.status !== "deny" && (
                      <button
                        onClick={() => handleMakeStatus(classItem, "deny")}
                        className="btn w-full text-sm bg-green-600 text-white"
                        disabled={classItem.status === "deny"}
                      >
                        Deny
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => openFeedbackModal(classItem)}
                      className="btn w-3/2 text-sm bg-blue-600 text-white"
                    >
                      Feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {modalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">Feedback</h2>
            <textarea
              className="w-full h-24 border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Enter your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button onClick={handleSendFeedback} className="btn bg-blue-600 text-white">
                Send
              </button>
              <button onClick={() => setModalOpen(false)} className="btn bg-gray-400 text-white ml-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
