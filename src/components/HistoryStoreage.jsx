import React, { useEffect, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';

// Group entries by date
const groupByDate = (data) => {
  const grouped = {};
  data.forEach((item) => {
    const date = new Date(item.timestamp || item.time).toLocaleDateString();
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });
  return grouped;
};

const HistoryList = ({ type }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(type);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setHistory(parsed);
      } catch (e) {
        console.error("Invalid JSON in localStorage", e);
      }
    }
  }, [type]);

  const groupedHistory = groupByDate(history);

  return (
    <div>
      {Object.keys(groupedHistory).length === 0 ? (
        <p className="text-muted">No history found.</p>
      ) : (
        <Accordion defaultActiveKey="0">
          {Object.entries(groupedHistory).map(([date, records], idx) => (
            <Accordion.Item eventKey={idx.toString()} key={date}>
              <Accordion.Header>{date}</Accordion.Header>
              <Accordion.Body>
                {records.map((entry, i) => (
                  <Card key={i} className="mb-2">
                    <Card.Body>
                      {type === 'withdrawalHistory' ? (
                        <>
                          <div><strong>Withdrawal Amount:</strong> ₹{entry.input?.withdrawalAmount}</div>
                          <div><strong>Deduction %:</strong> {entry.input?.deductionPercentage}%</div>
                          <div><strong>Final Amount:</strong> ₹{entry.result}</div>
                        </>
                      ) : (
                        <>
                          <div><strong>Expression:</strong> {entry.expression}</div>
                          <div><strong>Result:</strong> {entry.result}</div>
                        </>
                      )}
                      <div className="text-muted small mt-2">
                        Time: {entry.time || new Date(entry.timestamp).toLocaleTimeString()}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default HistoryList;
