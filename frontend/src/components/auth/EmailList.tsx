import React, { useState } from 'react';

interface EmailHeader {
  name: string;
  value: string;
}

interface EmailPayload {
  headers: EmailHeader[];
  body: {
    data?: string;
  };
}

interface Email {
  id: string;
  payload: EmailPayload;
  internalDate: string;
  snippet: string;
}

interface EmailListProps {
  emails: Email[];
  loading: boolean;
  error: Error | null;
  fromField: string;
}

const EmailList: React.FC<EmailListProps> = ({ emails, loading, error, fromField }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 10;

  const totalPages = Math.ceil(emails.length / emailsPerPage);

  const getHeader = (headers: EmailHeader[], name: string) => {
    return headers.find(header => header.name === name)?.value || '';
  };

  const handleEmailClick = (email: Email) => {
    // Logic to show email details can go here, e.g., navigate to a detail page or open a modal
    alert(`Show details for email with ID: ${email.id}`);
  };

  const paginatedEmails = emails.slice((currentPage - 1) * emailsPerPage, currentPage * emailsPerPage);

  if (error) return <div>Error fetching emails: {error.message}</div>;

  return (
    <div className="border-gray-300 border rounded-md max-w-screen-md p-3 h-full overflow-auto">
      <h1 className="text-gray-900 text-2xl font-medium">Emails</h1>
      <p>Your latest emails.</p>

      <div className="mt-5 py-3 px-5 grid grid-cols-3 gap-12 border-b border-gray-300">
        <h1 className="font-medium">{fromField}</h1>
        <h1 className="font-medium">Subject</h1>
        <h1 className="font-medium">Date</h1>
      </div>

      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="py-3 px-5 grid grid-cols-3 gap-12 border-b border-gray-300 animate-pulse rounded-lg"
          >
            <div className="flex flex-col truncate">
              <p className="bg-gray-300 h-6 w-24 mb-2"></p>
              <p className="bg-gray-200 h-4 w-32"></p>
            </div>
            <div className="flex flex-col truncate">
              <p className="bg-gray-300 h-6 w-24 mb-2"></p>
              <p className="bg-gray-200 h-4 w-48"></p>
            </div>
            <p className="bg-gray-300 h-6 w-16"></p>
          </div>
        ))
      ) : paginatedEmails.length > 0 ? (
        paginatedEmails.map((email) => {
          const fromHeader = getHeader(email.payload.headers, fromField) || "Null";
          const subjectHeader = getHeader(email.payload.headers, 'Subject');
          const bodyData = email.snippet || '';
          const [name, emailAddr] = fromHeader.split('<');

          return (
            <div
              key={email.id}
              className="py-3 px-5 grid grid-cols-3 gap-12 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => handleEmailClick(email)}
            >
              <div className="flex flex-col truncate">
                <p className="font-medium text-black truncate">{name?.trim()}</p>
                <p className="text-gray-500 truncate">{emailAddr ? emailAddr.replace('>', '').trim() : ''}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-medium text-black truncate">{subjectHeader}</p>
                <p className="text-gray-500">{bodyData}</p>
              </div>
              <p className="truncate">{new Date(parseInt(email.internalDate)).toLocaleDateString()}</p>
            </div>
          );
        })
      ) : (
        <p>No emails found.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="p-2 border rounded-md bg-gray-200 hover:bg-gray-300"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="p-2 border rounded-md bg-gray-200 hover:bg-gray-300"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmailList;
