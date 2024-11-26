import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addbook, deletebook, getbooks, updatebook } from "../../utils/services/userService";
import toast from "react-hot-toast";

// Modal Component for Editing Book
const Modal: React.FC<{ isOpen: boolean; book: Partial<Book>; onClose: () => void; onSave: (book: Partial<Book>) => void; }> = ({ isOpen, book, onClose, onSave }) => {
  const [editedBook, setEditedBook] = useState<Partial<Book>>(book);

  useEffect(() => {
    setEditedBook(book);

  }, [book]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async() => {
    onSave(editedBook);
    const id = editedBook._id;
   const body={
    title:editedBook.title,
    author:editedBook.author,
    status:editedBook.status,
    publishedYear: editedBook.publishedYear
   }

    try{
     let res = await updatebook(id,body);
     if(res.isSuccess){
      toast.success(res.message)
    
     }
    }catch(err){
      console.log(err);
    }
    onClose();
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h3 className="text-xl font-bold mb-4">Edit Book</h3>
          <input
            name="title"
            value={editedBook.title || ""}
            onChange={handleInputChange}
            className="border p-2 w-full mb-4"
            placeholder="Title"
          />
          <input
            name="author"
            value={editedBook.author || ""}
            onChange={handleInputChange}
            className="border p-2 w-full mb-4"
            placeholder="Author"
          />
          <select
            name="status"
            value={editedBook.status || "available"}
            onChange={handleInputChange}
            className="border p-2 w-full mb-4"
          >
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
          </select>
          <input
            name="publishedYear"
            type="number"
            value={editedBook.publishedYear || ""}
            onChange={handleInputChange}
            className="border p-2 w-full mb-4"
            placeholder="Published Year"
          />
          <div className="flex justify-end">
            <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2">
              Save
            </button>
            <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

interface Book {
  id: number;
  title: string;
  author: string;
  status: "available" | "borrowed";
  publishedYear: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<Book>>({});
  const [newBook, setNewBook] = useState<Partial<Book>>({});

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

 async function fetchBooks(){
    try {
      const response = await getbooks();
      toast.success(response.message);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deletebook(id);
      if (res.isSuccess) {
        toast.success(res.message);
        fetchBooks();
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  const handleSave = async (book: Partial<Book>) => {
    try {
      const res = await updatebook(book.id!, book); // Assuming book has id
      if (res.isSuccess) {
        toast.success(res.message);
        fetchBooks();
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentBook({});
  };

  const handleAddBook = async () => {
    try {
      const response = await addbook(newBook);
      if (response.isSuccess) {
        toast.success(response.message);
        fetchBooks();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Manage Books</h2>

        {isAdding ? (
          <div className="bg-white p-4 mb-4 shadow-md rounded">
            <h3 className="text-lg font-bold mb-2">Add New Book</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="title"
                placeholder="Title"
                value={newBook.title || ""}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                className="border p-2"
              />
              <input
                name="author"
                placeholder="Author"
                value={newBook.author || ""}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                className="border p-2"
              />
              <select
                name="status"
                value={newBook.status || "available"}
                onChange={(e) => setNewBook({ ...newBook, status: e.target.value as "available" | "borrowed" })}
                className="border p-2"
              >
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
              </select>
              <input
                name="publishedYear"
                type="number"
                placeholder="Published Year"
                value={newBook.publishedYear || ""}
                onChange={(e) => setNewBook({ ...newBook, publishedYear: +e.target.value })}
                className="border p-2"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleAddBook}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mr-2 rounded"
              >
                Add Book
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Add Book
          </button>
        )}

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Book Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Published Year</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.status}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.publishedYear}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        book={currentBook}
        onClose={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminDashboard;
