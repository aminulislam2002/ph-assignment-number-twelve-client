import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useStudent from "../hooks/useStudent";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet />
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="menu p-4 w-56 h-full text-base-content flex-row-reverse bg-gray-300">
          <div className="ms-0">
            <div className="p-5">
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <div className="flex justify-center items-center">
                    <img className="rounded-full w-20 h-20" src={user?.photoURL} alt="User Profile" />
                  </div>
                  <h1 className="text-xl font-bold mt-4">{user?.displayName}</h1>
                </div>
              </div>
              <div className="flex gap-5 items-center mt-6">
                <FaHome className="text-xl" />
                <h2 className="text-lg font-semibold">Dashboard</h2>
              </div>
            </div>

            <div>
              <ul>
                {isAdmin && (
                  <>
                    <li>
                      <Link to="/dashboard/manageClasses">Manage Classes</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/manageUsers">Manage Users</Link>
                    </li>
                  </>
                )}
                {isStudent && (
                  <>
                    <li>
                      <Link to="/dashboard/selectedClasses">My Selected Classes</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/enrolledClasses">My Enrolled Classes</Link>
                    </li>
                  </>
                )}
                {isInstructor && (
                  <>
                    <li>
                      <Link to="/dashboard/addClass">Add a Class</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/myClasses">My Classes</Link>
                    </li>
                  </>
                )}

                <div className="divider"></div>

                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/classes">Classes</Link>
                </li>
                <li>
                  <Link to="/instructors">Instructors</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
