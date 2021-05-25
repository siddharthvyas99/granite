import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TableRow = ({
  type = "pending",
  data,
  destroyTask,
  updateTask,
  handleProgressToggle,
  showTask,
}) => {
  const isCompleted = type === "completed";
  const toggledProgress = isCompleted ? "pending" : "completed";

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.id}>
          <td className="px-6 py-4 text-center">
            <input
              type="checkbox"
              checked={isCompleted}
              className="ml-6 w-4 h-4 text-bb-purple border-gray-300
               rounded form-checkbox focus:ring-bb-purple cursor-pointer"
              onChange={() =>
                handleProgressToggle({
                  slug: rowData.slug,
                  progress: toggledProgress,
                })
              }
            />
          </td>
          <td
            className={classnames(
              "px-6 py-4 text-sm font-medium leading-5 whitespace-no-wrap text-bb-purple",
              {
                "cursor-pointer": !isCompleted,
              },
              { "text-opacity-50": isCompleted }
            )}
            onClick={() => !isCompleted && showTask(rowData.slug)}
          >
            {rowData.title}
          </td>
          {/* <td
            className="px-6 py-4 text-sm font-medium
            leading-5 text-bb-gray whitespace-no-wrap"
          >
            {rowData.user_id}
          </td> */}
          {!isCompleted && (
            <td
              className="px-6 py-4 text-sm font-medium leading-5
             text-bb-gray-600 whitespace-no-wrap"
            >
              {/* {rowData.assigned_user.name} */}
              {rowData.user_id}
            </td>
          )}
          {isCompleted && (
            <>
              <td style={{ width: "164px" }}></td>
              <td className="px-6 py-4 text-center cursor-pointer">
                <i
                  className="text-2xl text-center text-bb-border
                  transition duration-300 ease-in-out
                  ri-delete-bin-5-line hover:text-bb-red"
                  onClick={() => destroyTask(rowData.slug)}
                ></i>
              </td>
            </>
          )}
          <td
            className="px-6 py-4 text-sm font-medium
            leading-5 text-right cursor-pointer"
          >
            <a
              className="text-indigo-600 hover:text-indigo-900"
              onClick={() => updateTask(rowData.slug)}
            >
              Edit
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  destroyTask: PropTypes.func,
  updateTask: PropTypes.func,
  showTask: PropTypes.func,
  handleProgressToggle: PropTypes.func,
};

export default TableRow;
