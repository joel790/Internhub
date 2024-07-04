import { useState } from "react";
import PostInternshipForm from "./PostInternshipForm";
import DataTable from "../../../components/tables/DataTable";

const PostedInternship = () => {
  const [add, setAdd] = useState(false);
  const columns = ["Name", "Position", "Status"];
  const data = [
    { Name: "Neil Sims", Position: "React Developer", Status: "Online" },
    { Name: "Bonnie Green", Position: "Designer", Status: "Online" },
    { Name: "Jese Leos", Position: "Vue JS Developer", Status: "Online" },
    { Name: "Thomas Lean", Position: "UI/UX Engineer", Status: "Online" },
    { Name: "Leslie Livingston", Position: "SEO Specialist", Status: "Offline" }
  ];
  const actions = [
    { label: "Edit", onClick: (row) => console.log("Edit", row) }
  ];

  const handleAddClick = () => {
    setAdd(!add);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-4 md:p-8 rounded-lg ">
       
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <button
            className="text-white bg-green-500 rounded px-4 py-2 hover:bg-green-600 transition"
            onClick={handleAddClick}
          >
            {add ? "Close Form" : "Add Internship"}
          </button>
        </div>
        {add && (
          <div className="mb-4">
            <PostInternshipForm />
          </div>
        )}
        {!add&& <DataTable columns={columns} data={data} actions={actions} />
}
      </div>
    </div>
  );
};

export default PostedInternship;