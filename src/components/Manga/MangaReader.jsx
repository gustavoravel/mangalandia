import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '../ui/button';

// Set worker URL for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const MangaReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  // Mock manga data - replace with actual data fetching
  const manga = {
    id: id,
    title: "Dragon's Destiny",
    chapter: 1,
    pdfUrl: "https://example.com/manga.pdf" // Replace with actual PDF URL from Firebase Storage
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };

  const adjustZoom = (delta) => {
    setScale(prevScale => {
      const newScale = prevScale + delta;
      return Math.min(Math.max(0.5, newScale), 2.0);
    });
  };

  return (
    <div className="min-h-screen bg-secondary-darker pt-16">
      {/* Header */}
      <div className="fixed top-16 left-0 right-0 bg-secondary-dark z-40 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/catalog')}
              >
                <X className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-manga text-white">{manga.title}</h1>
                <p className="text-sm text-gray-400">Capítulo {manga.chapter}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustZoom(-0.1)}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-white text-sm">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustZoom(0.1)}
                disabled={scale >= 2.0}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reader */}
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-center">
          <div className="relative">
            <Document
              file={manga.pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onContextMenu={(e) => e.preventDefault()}
              className="max-w-full"
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className="shadow-xl"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-secondary-dark border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <span className="text-white">
              Página {pageNumber} de {numPages}
            </span>
            
            <Button
              variant="outline"
              onClick={() => changePage(1)}
              disabled={pageNumber >= numPages}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaReader;