import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]); // Trigger fetchCustomers when currentPage changes

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/customers?page=${currentPage}&search=${searchTerm}&sort=${sortBy}');
    setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
    fetchCustomers();
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <select value={sortBy} onChange={handleSort}>
        <option value="">Sort By</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Customer name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{(currentPage - 1) * 20 + index + 1}</td> {/* Calculate serial number based on current page */}
              <td>{customer.name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{customer.created_at}</td> {/* Needs formatting */}
              <td>{customer.created_at}</td> {/* Needs formatting */}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {/* Pagination */}
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        {[...Array(5)].map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;