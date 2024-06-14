import React from "react";

const Todo = ({
  id,
  title,
  description,
  mongoId,
  completed,
  deleteTodo,
  completedTodo,
  undoCompletedTodo,
}) => {
  return (
    <tr
      className={`bg-white border-b dark:border-gray-700 ${
        completed ? "dark:bg-gray-900" : "dark:bg-gray-800"
      }`}>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {id + 1}
      </th>
      <td className={`px-6 py-4 ${completed ? "line-through" : ""}`}>{title}</td>
      <td className={`px-6 py-4 ${completed ? "line-through" : ""}`}>{description}</td>
      <td className="px-6 py-4">{completed ? "Completed" : "Pending"}</td>
      <td className="px-6 py-4 flex gap-2">
        <button
          onClick={() => deleteTodo(mongoId)}
          className="py-2 px-4 bg-red-500 text-white">
          Delete
        </button>
        {completed ? (
          <button
            onClick={() => undoCompletedTodo(mongoId)}
            className="py-2 px-4 bg-orange-500 text-white">
            Undo
          </button>
        ) : (
          <button
            onClick={() => completedTodo(mongoId)}
            className="py-2 px-4 bg-green-500 text-white">
            Done
          </button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
