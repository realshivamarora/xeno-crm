import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SegmentHistory = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/segments');
        setSegments(res.data);
      } catch (err) {
        console.error('Failed to fetch segment history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSegments();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  if (loading) return <div>Loading segment history...</div>;

  return (
    <div className="container mt-4">
      <h3>Segment History</h3>
      {segments.length === 0 ? (
        <p>No segment history found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Query</th>
            </tr>
          </thead>
          <tbody>
            {segments.map(({ _id, date, time, query }) => (
              <tr key={_id}>
                <td>{formatDate(date)}</td>
                <td>{time}</td>
                <td style={{ whiteSpace: 'pre-wrap' }}>{query}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SegmentHistory;
