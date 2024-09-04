from image_processing import extract_text

def test_ocr_text_detection(image_path):
    # Extract text from the food label image
    extracted_text = extract_text(image_path)
    
    print("OCR Detected Text:")
    print("==================")
    print(extracted_text)
    print("==================")

if __name__ == "__main__":
    # Path to the image you want to test (EDIT THIS PATH TO YOUR IMAGE)
    image_path = 'data/labels/test4.png'
    
    # Run the OCR test
    test_ocr_text_detection(image_path)
