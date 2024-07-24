import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// Static data to mimic fetched plans
const staticPlans = [
  {
    _id: "1",
    type: "Basic",
    price: "$50/month",
    features: ["Feature A", "Feature B"],
    companiesSubscribed: 20,
  },
  {
    _id: "2",
    type: "Gold",
    price: "$200/month",
    features: ["Feature A", "Feature B", "Feature C"],
    companiesSubscribed: 35,
  },
  {
    _id: "3",
    type: "Silver",
    price: "$100/month",
    features: ["Feature C", "Feature D"],
    companiesSubscribed: 35,
  },
];

const PricingPlan = () => {
  const [plans, setPlans] = useState(staticPlans); // Initialize with static data
  const [newPlan, setNewPlan] = useState({ type: "", price: "", features: "" });
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get("/api/admin/plans");
      if (Array.isArray(response.data)) {
        setPlans(response.data);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching plans", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post("/api/admin/plans", newPlan);
      if (response.data) {
        setPlans([...plans, response.data]);
        setNewPlan({ type: "", price: "", features: "" });
      }
    } catch (error) {
      console.error("Error creating plan", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `/api/admin/plans/${editingPlan._id}`,
        editingPlan
      );
      if (response.data) {
        setPlans(
          plans.map((plan) =>
            plan._id === editingPlan._id ? response.data : plan
          )
        );
        setEditingPlan(null);
      }
    } catch (error) {
      console.error("Error updating plan", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/plans/${id}`);
      setPlans(plans.filter((plan) => plan._id !== id));
    } catch (error) {
      console.error("Error deleting plan", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pricing Plans</h1>
        <button
          className="p-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600"
          onClick={handleCreate}
        >
          <FaPlus className="mr-2" /> Create Plan
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-3 px-4 text-left">Plan Name</th>
            <th className="py-3 px-4 text-left">Features</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.length > 0 ? (
            plans.map((plan) => (
              <tr key={plan._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{plan.type}</td>
                <td className="py-2 px-4">{plan.features.join(", ")}</td>
                <td className="py-2 px-4">{plan.price}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => setEditingPlan(plan)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(plan._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 text-center">
                No plans available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editingPlan && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Edit Plan</h2>
          <input
            type="text"
            className="border border-gray-300 p-2 mb-2 w-full"
            placeholder="Type"
            value={editingPlan.type}
            onChange={(e) =>
              setEditingPlan({ ...editingPlan, type: e.target.value })
            }
          />
          <input
            type="text"
            className="border border-gray-300 p-2 mb-2 w-full"
            placeholder="Price"
            value={editingPlan.price}
            onChange={(e) =>
              setEditingPlan({ ...editingPlan, price: e.target.value })
            }
          />
          <input
            type="text"
            className="border border-gray-300 p-2 mb-2 w-full"
            placeholder="Features"
            value={editingPlan.features.join(", ")}
            onChange={(e) =>
              setEditingPlan({
                ...editingPlan,
                features: e.target.value.split(", "),
              })
            }
          />
          <button
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleEdit}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default PricingPlan;
