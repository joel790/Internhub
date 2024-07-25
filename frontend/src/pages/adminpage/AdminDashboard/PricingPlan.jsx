import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const PricingPlan = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ type: "", price: "", features: "" });
  const [editingPlan, setEditingPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/plans");
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
      const response = await axios.post("http://localhost:5000/api/admin/plans", newPlan);
      if (response.data) {
        setPlans([...plans, response.data]);
        setNewPlan({ type: "", price: "", features: "" });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating plan", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/plans/${editingPlan._id}`, editingPlan);
      if (response.data) {
        setPlans(plans.map((plan) => (plan._id === editingPlan._id ? response.data : plan)));
        setEditingPlan(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating plan", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/plans/${id}`);
      setPlans(plans.filter((plan) => plan._id !== id));
    } catch (error) {
      console.error("Error deleting plan", error);
    }
  };

  const openModal = (plan = null) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingPlan(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (editingPlan) {
      handleEdit();
    } else {
      handleCreate();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pricing Plans</h1>
        <button
          className="p-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600"
          onClick={() => openModal()}
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
                    onClick={() => openModal(plan)}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">{editingPlan ? "Edit Plan" : "Add Plan"}</h2>
            <input
              type="text"
              className="border border-gray-300 p-2 mb-2 w-full"
              placeholder="Type"
              value={editingPlan ? editingPlan.type : newPlan.type}
              onChange={(e) =>
                editingPlan
                  ? setEditingPlan({ ...editingPlan, type: e.target.value })
                  : setNewPlan({ ...newPlan, type: e.target.value })
              }
            />
            <input
              type="text"
              className="border border-gray-300 p-2 mb-2 w-full"
              placeholder="Price"
              value={editingPlan ? editingPlan.price : newPlan.price}
              onChange={(e) =>
                editingPlan
                  ? setEditingPlan({ ...editingPlan, price: e.target.value })
                  : setNewPlan({ ...newPlan, price: e.target.value })
              }
            />
            <input
              type="text"
              className="border border-gray-300 p-2 mb-2 w-full"
              placeholder="Features (comma separated)"
              value={editingPlan ? editingPlan.features.join(", ") : newPlan.features}
              onChange={(e) =>
                editingPlan
                  ? setEditingPlan({ ...editingPlan, features: e.target.value.split(", ") })
                  : setNewPlan({ ...newPlan, features: e.target.value.split(", ") })
              }
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPlan;
