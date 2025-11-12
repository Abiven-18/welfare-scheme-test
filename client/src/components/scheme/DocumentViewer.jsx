import React from 'react';

const DocumentViewer = ({ schemeId, documentPath, schemeTitle }) => {

  if (!documentPath) {
    return (
      <div className="bg-light border border-border rounded p-6 text-center">
        <p className="text-sm text-secondary">No document available</p>
      </div>
    );
  }

  // Support both filename (e.g., "msp.pdf") and full/relative paths (e.g., "server\\uploads\\msp.pdf")
  const fileName = String(documentPath).split(/[/\\\\]/).pop();
  const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
  const src = `${API_BASE_URL.replace('/api', '')}/api/uploads/${encodeURIComponent(fileName)}`;

  return (
    <div className="bg-light border border-border rounded p-6">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-primary mb-1">Scheme Document</h3>
        <p className="text-xs text-secondary">PDF Document</p>
      </div>
      <div className="w-full bg-gray-800 rounded overflow-hidden" style={{ height: '85vh' }}>
        <iframe
          title={`${schemeTitle} Document`}
          src={`${src}#toolbar=1&navpanes=1&scrollbar=1`}
          className="w-full h-full"
          type="application/pdf"
          style={{ border: 'none' }}
        />
      </div>
      <div className="mt-3 text-right">
        <a href={src} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
          Open in new tab
        </a>
      </div>
    </div>
  );
};

export default DocumentViewer;
