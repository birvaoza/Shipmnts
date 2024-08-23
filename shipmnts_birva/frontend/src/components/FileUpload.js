import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [tableData, setTableData] = useState([]);

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            setTableData(worksheet);
        };
        reader.readAsArrayBuffer(selectedFile);
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/upload`, tableData);
            alert('Data uploaded successfully');
        } catch (error) {
            alert('Failed to upload data');
        }
    };

    return (
        <div>
            <h2>Upload Company and Contact Data</h2>
            <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
            {tableData.length > 0 && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(tableData[0]).map((key, index) => (
                                    <th key={index}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, i) => (
                                        <td key={i}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleSubmit}>Confirm Upload</button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
