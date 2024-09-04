# NutriAID

<p>Welcome to <strong>NutriAID</strong>, a Python-based application designed to help users make informed dietary choices by analyzing food labels. The program uses Optical Character Recognition (OCR) to extract text from food label images and assess the content against predefined health conditions and dietary preferences.</p>

<h2>🛠️ How to Use</h2>
<ul>
  <li>Upload a clear and legible image of a food label to the <code>data/labels/</code> folder. Ensure that the text in the image is not blurry for better accuracy.</li>
  <li>Update the image path in the <code>main.py</code> file to the name of the image you want to analyze:</li>
  <pre><code>image_path = 'data/labels/your_image_name.png'  <!-- Update with your image path --></code></pre>
  <li>Run the program and follow the prompts to analyze the food label and receive feedback on potential dietary concerns.</li>
  <li>If you want to test the accuracy of the OCR extraction, you can use the <code>test_ocr.py</code> script. Simply update the image path in <code>test_ocr.py</code> to the image you want to test:</li>
  <pre><code>image_path = 'data/labels/your_image_name.png'  <!-- Update with your image path --></code></pre>
  <li>Run <code>test_ocr.py</code> to see the extracted text and verify its accuracy. The script will output the text detected from the image to the console, allowing you to compare it with the actual content on the label.</li>
</ul>


<br>

<h2>⚠️ Disclaimer</h2>
<p>Please note the following:</p>
<ul>
  <li><strong>Basic Functionalities:</strong> NutriAID is a prototype and includes only basic functionalities.</li>
  <li><strong>OCR Precision:</strong> The OCR used for text extraction is not always precise or perfect. Some text may not be accurately captured or interpreted.</li>
  <li><strong>Not for Actual Use:</strong> NutriAID is intended for demonstration and educational purposes only. Do not rely on it for making actual dietary or health decisions.</li>
</ul>

<br>

<h2>🚀 How to Run NutriAID</h2>
<h3>Prerequisites</h3>
<ul>
  <li>Ensure you have <strong>Python 3</strong> installed on your system.</li>
  <li>Install the necessary Python packages:</li>
  <pre><code>pip install opencv-python-headless pandas pytesseract</code></pre>
  <li>Install <strong>Tesseract-OCR</strong>:</li>
  <ul>
    <li><strong>Windows:</strong> Download the installer from <a href="https://github.com/tesseract-ocr/tesseract">here</a> and follow the installation instructions.</li>
    <li><strong>Mac:</strong> Use Homebrew:</li>
    <pre><code>brew install tesseract</code></pre>
    <li><strong>Linux:</strong> Install via your package manager:</li>
    <pre><code>sudo apt-get install tesseract-ocr</code></pre>
  </ul>
</ul>
<h3>Steps to Run:</h3>
<ol>
  <li>Install the required Python packages using pip:</li>
  <pre><code>pip install opencv-python-headless pandas pytesseract</code></pre>
  <li>Add your own food label images to the <code>data/labels/</code> folder or use the given 4.</li>
  <li>Update the image path in <code>main.py</code>:</li>
  <pre><code>image_path = 'data/labels/your_image_name.png'</code></pre>
  <li>Run the program:</li>
  <pre><code>python main.py</code></pre>
</ol>
