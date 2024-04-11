import React, { useState } from 'react';
import '../styles/fileUploadForm.css';
import { createAlertWithCallback } from '../utils/alerts';

const FileUploadForm = () => {
  const [identificationFile, setIdentificationFile] = useState(null);
  const [addressProofFile, setAddressProofFile] = useState(null);
  const [bankStatementFile, setBankStatementFile] = useState(null);

  const handleIdentificationFileChange = (event) => {
    setIdentificationFile(event.target.files[0]);
  };

  const handleAddressProofFileChange = (event) => {
    setAddressProofFile(event.target.files[0]);
  };

  const handleBankStatementFileChange = (event) => {
    setBankStatementFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('identification', identificationFile);
      formData.append('address_proof', addressProofFile);
      formData.append('bank_statement', bankStatementFile);

      const response = await fetch('https://api49980.onrender.com/api/users/current/documents', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        createAlertWithCallback('success', 'Éxito', 'Documentación enviada', () => {
          window.location.href = "/profile";
        });
      } else {
        createAlertWithCallback('error', 'Error', 'Por favor carga los 3 archivos', () => {
          window.location.href = "/file-upload";
        });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  return (
    <form className="form-container" onSubmit={handleFormSubmit}>
      <div>
        <label>Identificación:</label>
        <input type="file" className="file-input" onChange={handleIdentificationFileChange} />
      </div>
      <div>
        <label>Comprobante de Domicilio:</label>
        <input type="file" className="file-input" onChange={handleAddressProofFileChange} />
      </div>
      <div>
        <label>Comprobante de Estado de Cuenta:</label>
        <input type="file" className="file-input" onChange={handleBankStatementFileChange} />
      </div>
      <button type="submit" className="submit-button">Subir Archivos</button>
    </form>
  );
};

export default FileUploadForm;
