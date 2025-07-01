# api/utils.py
import io
import pdfplumber

def extract_text_from_pdf(pdf_file):
    """
    Extract text from a PDF file
    """
    text = ""
    try:
        with pdfplumber.open(io.BytesIO(pdf_file.read())) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text() or ""
                text += extracted + "\n\n"
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""