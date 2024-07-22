/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const DataTable = ({ columns, data, onEdit, onView, ondeleteShow }) => {
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortBy) {
            const first = a[sortBy];
            const second = b[sortBy];
            if (sortOrder === 'asc') {
                if (first < second) return -1;
                if (first > second) return 1;
                return 0;
            } else {
                if (first > second) return -1;
                if (first < second) return 1;
                return 0;
            }
        }
        return 0;
    });

    const filteredData = sortedData.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="relative overflow-x-auto bg-white  rounded-lg border border-gray-200 ml-10 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                <div className="flex items-center space-x-4">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-full md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 
                </div>
            </div>

            <table className="w-full text-sm text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">
                                    Select All
                                </label>
                            </div>
                        </th>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 cursor-pointer text-left"
                                onClick={() => handleSort(column)}
                            >
                                {column}
                                {sortBy === column && (
                                    <span className="ml-2 text-xs">
                                        {sortOrder === 'asc' ? '▲' : '▼'}
                                    </span>
                                )}
                            </th>
                        ))}
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? filteredData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="bg-white border-b hover:bg-gray-100 transition-colors duration-200"
                        >
                            <td className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-table-${rowIndex}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`checkbox-table-${rowIndex}`} className="sr-only">
                                        Select Row
                                    </label>
                                </div>
                            </td>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 text-sm text-gray-900">
                                    {row[column]}
                                </td>
                            ))}
                            <td className="px-6 py-4 flex space-x-2">
                                <button
                                    className="px-4 py-2 text-blue-600 bg-blue-100 rounded hover:bg-blue-200 transition-colors duration-200"
                                    onClick={() => onEdit(row.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-4 py-2 text-red-600 bg-red-100 rounded hover:bg-red-200 transition-colors duration-200"
                                    onClick={() => ondeleteShow(row.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="px-4 py-2 text-green-600 bg-green-100 rounded hover:bg-green-200 transition-colors duration-200"
                                    onClick={() => onView(row.id)}
                                >
                                    applicants
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-500">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;