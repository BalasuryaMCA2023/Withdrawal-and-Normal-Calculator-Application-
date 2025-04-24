import React, { useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import "../App";

const ResultCard = ({
  withdrawalAmount,
  deductionPercentage,
  deductionDecimal,
  deductionValue,
  finalAmount,
}) => {
  const cardRef = useRef();

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Withdrawal Calculation Summary', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Withdrawal Amount', `₹${withdrawalAmount}`],
        ['Deduction Percentage', `${deductionPercentage}%`],
        ['Converted to Decimal', deductionDecimal],
        ['Deduction Amount', `₹${deductionValue}`],
        ['Final Amount', `₹${finalAmount}`],
      ],
    });
    doc.save('withdrawal-summary.pdf');
  };

  const exportToExcel = () => {
    const wsData = [
      ['Field', 'Value'],
      ['Withdrawal Amount', `₹${withdrawalAmount}`],
      ['Deduction Percentage', `${deductionPercentage}%`],
      ['Converted to Decimal', deductionDecimal],
      ['Deduction Amount', `₹${deductionValue}`],
      ['Final Amount', `₹${finalAmount}`],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(data, 'withdrawal-summary.xlsx');
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
  
    try {
      // Capture the screenshot
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2, // Higher quality
      });
  
      const ctx = canvas.getContext("2d");
  
      // Set up watermark text
      const watermarkText = "MyAppName • https://myapp.example.com";
      const fontSize = 20;
      const padding = 20;
  
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.textAlign = "center";
  
      // Draw watermark at the bottom center
      ctx.fillText(watermarkText, canvas.width / 2, canvas.height - padding);
  
      // Convert to Blob
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  
      const file = new File([blob], "summary.png", { type: "image/png" });
  
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Withdrawal Summary",
          text: "Check out this summary from MyApp.",
          files: [file],
        });
      } else {
        saveAs(blob, "summary.png");
        alert("Sharing not supported on this device. Screenshot with watermark saved.");
      }
    } catch (error) {
      console.error("Error during sharing:", error);
      alert("Something went wrong while trying to share.");
    }
  };
  

  return (
    <Card className={`mt-4 resultBox`} ref={cardRef}>
      <h5 className="mb-3">Calculation Summary</h5>
      <p className="resultText">
        Withdrawal Amount: <span className="highlight">₹{withdrawalAmount}</span>
      </p>
      <p className="resultText">
        Deduction Percentage: <span className="highlight">{deductionPercentage}%</span>
      </p>
      <p className="resultText">
        Converted to Decimal: <span className="highlight">{deductionDecimal}</span>
      </p>
      <p className="resultText">
        Deduction Amount: <span className="highlight">₹{deductionValue}</span>
      </p>
      <hr />
      <p className="resultText mt-3">
        Final Amount After Deduction:{' '}
        <span className="highlight">₹{finalAmount}</span>
      </p>

      <div className="mt-3">
        <Button variant="success" onClick={exportToPDF} className="me-2">
          Export to PDF
        </Button>
        <Button variant="info" onClick={exportToExcel} className="me-2">
          Export to Excel
        </Button>
        <Button variant="primary" onClick={handleShare}>
          Share
        </Button>
      </div>
    </Card>
  );
};

export default ResultCard;
