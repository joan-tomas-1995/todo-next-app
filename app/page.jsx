"use client";

import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    const response = await axios("/api");
    setTodoData(response.data.todos);
  };

  const deleteTodo = async (idTodo) => {
    const response = await axios.delete("/api", {
      params: {
        mongoId: idTodo,
      },
    });
    toast.success(response.data.msg);
    fetchTodos();
  };

  const completedTodo = async (idTodo) => {
    try {
      const response = await axios.put(
        "/api/todos/complete",
        {},
        {
          params: {
            mongoId: idTodo,
          },
        }
      );
      toast.success(response.data.msg);
      fetchTodos();
    } catch (error) {
      toast.error("Error completing Todo");
      console.error(error);
    }
  };

  const undoCompletedTodo = async (idTodo) => {
    try {
      const response = await axios.put(
        "/api/todos/undoCompleted",
        {},
        {
          params: {
            mongoId: idTodo,
          },
        }
      );
      toast.success(response.data.msg);
      fetchTodos();
    } catch (error) {
      toast.error("Error undoing Todo completion");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api", formData);
      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      });
      await fetchTodos();
    } catch (error) {
      toast.error("Error!");
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto ">
        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Enter title..."
          className="px-3 py-2 border-2 w-full"
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter description...."
          className="px-3 py-2 border-2 w-full"></textarea>
        <button
          type="submit"
          className="bg-green-600 py-3 px-11 text-white">
          Añadir
        </button>
      </form>

      <div className="relative overflow-x-auto mt-20 w-[70%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3">
                Id
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  title={item.title}
                  description={item.description}
                  completed={item.isCompleted}
                  mongoId={item._id}
                  deleteTodo={deleteTodo}
                  completedTodo={completedTodo}
                  undoCompletedTodo={undoCompletedTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
