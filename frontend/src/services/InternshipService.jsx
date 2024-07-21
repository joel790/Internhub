// services/internshipService.js
import axios from 'axios';

const getInternshipsOfCompany = async (companyId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/company/companyinternship/${companyId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching internships');
    }
};

export default { getInternshipsOfCompany };
