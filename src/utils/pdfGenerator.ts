import { jsPDF } from 'jspdf';
import { SavedItinerary } from '../types/travel';
import { formatCurrency } from './calculator';

export function exportItineraryToPDF(itinerary: SavedItinerary): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let cursorY = 22;

  // Header Banner
  doc.setFillColor(11, 19, 43); // #0B132B midnight navy
  doc.rect(0, 0, pageWidth, 36, 'F');

  // Brand Name
  doc.setTextColor(212, 175, 55); // #D4AF37 champagne gold
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.text('A U R E L I A', 14, 18);

  // Subtitle
  doc.setTextColor(230, 230, 230);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text("DON'T JUST VISIT PLACES. EXPERIENCE STORIES.", 14, 26);

  cursorY = 46;

  // Itinerary Title
  doc.setTextColor(20, 25, 40);
  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.text(itinerary.title || `${itinerary.destinationName} Curated Journey`, 14, cursorY);
  cursorY += 8;

  // Meta Information Box
  doc.setFillColor(248, 246, 240); // warm ivory
  doc.roundedRect(14, cursorY, pageWidth - 28, 18, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 90);
  doc.text(`DESTINATION: ${itinerary.destinationName}, ${itinerary.country}`, 18, cursorY + 6);
  doc.text(`DURATION: ${itinerary.travelDays} Days   |   TRAVELERS: ${itinerary.travelers}   |   STYLE: ${itinerary.travelStyle}`, 18, cursorY + 12);

  cursorY += 26;

  // Days Breakdown
  for (const day of itinerary.days) {
    // Check page overflow
    if (cursorY > pageHeight - 40) {
      doc.addPage();
      cursorY = 20;
    }

    // Day Header
    doc.setFillColor(11, 19, 43);
    doc.roundedRect(14, cursorY, pageWidth - 28, 8, 2, 2, 'F');
    doc.setTextColor(212, 175, 55);
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text(`DAY ${day.dayNumber}: ${day.theme.toUpperCase()}`, 18, cursorY + 5.5);
    cursorY += 13;

    // Activities
    for (const act of day.activities) {
      if (cursorY > pageHeight - 25) {
        doc.addPage();
        cursorY = 20;
      }

      // Slot badge
      doc.setTextColor(180, 140, 50);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(`[${act.timeSlot.toUpperCase()}] ${act.title}`, 18, cursorY);

      // Estimated Cost & Location
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 110);
      doc.setFontSize(8);
      const metaText = `${act.location} • Est. ${formatCurrency(act.estimatedCostINR, 'INR')}`;
      doc.text(metaText, pageWidth - 18 - doc.getTextWidth(metaText), cursorY);
      cursorY += 4.5;

      // Description
      doc.setTextColor(60, 60, 70);
      doc.setFontSize(8.5);
      const splitDesc = doc.splitTextToSize(act.description, pageWidth - 36);
      doc.text(splitDesc, 18, cursorY);
      cursorY += splitDesc.length * 4.2 + 3;
    }

    cursorY += 4;
  }

  // Cost Summary & Footer Note
  if (cursorY > pageHeight - 35) {
    doc.addPage();
    cursorY = 20;
  }

  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(14, cursorY, pageWidth - 14, cursorY);
  cursorY += 7;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`TOTAL ESTIMATED EXPENDITURE: ${formatCurrency(itinerary.totalEstimatedCostINR, 'INR')}`, 14, cursorY);

  cursorY += 5;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 130);
  doc.text('Note: All expenses and timings are curated estimates for intelligent planning and may vary by season.', 14, cursorY);

  // Save the PDF
  const filename = `Aurelia_${itinerary.destinationName.replace(/\s+/g, '_')}_Itinerary.pdf`;
  doc.save(filename);
}
