import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunicationLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/communications');
        setLogs(res.data);
      } catch (err) {
        setError('Failed to load communication logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Message History (Communication Log)</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    No communication records found.
                  </td>
                </tr>
              )}
              {logs.map((log) => (
                <tr key={log._id}>
                  <td>{log.customerId}</td>
                  <td>{log.name}</td>
                  <td>{log.email}</td>
                  <td>{log.message}</td>
                  <td>{log.subject}</td>
                  <td>{log.status}</td>
                  <td>{new Date(log.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5">
            <h5 className="mb-3">Customer Communication Analytics</h5>
            <iframe
              style={{
                background: '#FFFFFF',
                border: 'none',
                borderRadius: '2px',
                boxShadow: '0 2px 10px 0 rgba(70, 76, 79, 0.2)'
              }}
              width="100%"
              height="480"
              src="https://charts.mongodb.com/charts-project-0-xvhpzje/embed/charts?id=449039b2-2228-4562-af51-762e8125968e&maxDataAge=3600&theme=light&autoRefresh=true"
              title="MongoDB Chart"
            ></iframe>
          </div>
        </>
      )}
    </div>
  );
};

export default CommunicationLog;
