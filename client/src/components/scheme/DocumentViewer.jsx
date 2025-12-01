
const DocumentViewer = ({ documentUrl, schemeTitle }) => {

  if (!documentUrl) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded p-6 text-center">
        <p className="text-sm text-gray-600">No document available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 border border-gray-300 rounded p-6">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-black mb-1">Scheme Document</h3>
        <p className="text-xs text-gray-600">PDF Document</p>
      </div>
      <div className="w-full bg-white rounded overflow-hidden" style={{ height: '85vh' }}>
        <iframe
          title={`${schemeTitle} Document`}
          src={`${documentUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          className="w-full h-full"
          type="application/pdf"
          style={{ border: 'none' }}
        />
      </div>
      <div className="mt-3 flex gap-3 justify-end">
        <a 
          href={documentUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="text-sm text-primary hover:text-secondary underline"
        >
          Open in new tab
        </a>
        <a 
          href={documentUrl} 
          download 
          className="text-sm text-primary hover:text-secondary underline"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default DocumentViewer;
