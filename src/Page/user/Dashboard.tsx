import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getallbooks } from "../../utils/services/userService";


interface Book {
  id: number;
  title: string;
  author: string;
  status: "available" | "borrowed";
  publishedYear: number;
}
const Dashboard: React.FC = () => {
const[books,setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
     navigate("/");
  };
const fetchdata = async()=>{
  try{
   const res = await getallbooks();
   console.log(res.data);
   setBooks(res.data);
  }catch(err){
    console.log(err)
  }
}
useEffect(()=>{
  fetchdata()
},[])
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Library Management</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Books
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Table */}
      <div className="container mx-auto mt-8 p-4">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Book Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Published Year</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${
                      book.status === "Available" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {book.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{book.publishedYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
