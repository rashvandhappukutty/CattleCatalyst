import os
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from typing import Dict, Any
import uvicorn

# Suppress TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # 0=INFO, 1=WARNING, 2=ERROR, 3=FATAL
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

app = FastAPI(title="Cattle Breed Recognition API")

# Enable CORS with specific origins
origins = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",  # Alternative localhost
    "http://localhost:8000",  # FastAPI server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and class names
try:
    # Look for 'ai model' in parent directory (when run in backend/) or parent's parent
    parent_dir = os.path.dirname(os.path.dirname(__file__))
    model_dir = os.path.join(parent_dir, "ai model", "models")
    if not os.path.exists(os.path.join(model_dir, "breed_model.h5")):
        # Fallback to parent's parent's parent (when inside backend/ and ai model is outside project root)
        model_dir = os.path.join(os.path.dirname(parent_dir), "ai model", "models")
    model_path = os.path.join(model_dir, "breed_model.h5")
    
    print(f"Looking for model at: {model_path}")
    if not os.path.exists(model_path):
        available_models = os.listdir(model_dir)
        print(f"Model not found. Available models: {available_models}")
        raise FileNotFoundError(f"Model file not found at {model_path}")
        
    print("Loading model...")
    model = load_model(model_path, compile=False)  # Load without compiling first
    
    # Compile the model with appropriate metrics
    model.compile(optimizer='adam',
                 loss='categorical_crossentropy',
                 metrics=['accuracy'])
    print("Model loaded and compiled successfully!")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Model path attempted: {model_path}")
    raise

# Define class names (make sure this matches your model's training classes)
class_names = ['Gir', 'Murrah', 'Sahiwal']  # Update this list to match your model's classes

# Print class mapping for debugging
print("\n=== Class Mapping ===")
for idx, name in enumerate(class_names):
    print(f"Class {idx}: {name}")
print("===================\n")

# Add breed descriptions
breed_descriptions = {
    'Gir': 'Gir cattle are a popular dairy cattle breed from India, known for their distinctive appearance with large, drooping ears and a prominent hump.',
    'Alambadi': 'Alambadi cattle are a breed of cattle from India, known for their distinctive appearance with large, drooping ears and a prominent hump.',
    'Ayrsire': 'Ayrsire cattle are a breed of cattle from India, known for their distinctive appearance with large, drooping ears and a prominent hump.',
    'Sahiwal': 'Sahiwal is a breed of Zebu cattle which is primarily used in dairy production. The breed originated from the Sahiwal district of Pakistan.'
}

# Add request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"\n=== Incoming Request ===")
    print(f"Method: {request.method}")
    print(f"URL: {request.url}")
    print(f"Headers: {dict(request.headers)}")
    
    # Log form data for file uploads
    if request.method == "POST" and "multipart/form-data" in request.headers.get("content-type", ""):
        form_data = await request.form()
        if "file" in form_data:
            file = form_data["file"]
            print(f"File uploaded: {file.filename}, Size: {file.size} bytes")
    
    response = await call_next(request)
    print(f"Response status: {response.status_code}")
    print("======================\n")
    return response

@app.post("/predict", response_model=Dict[str, Any])
async def predict_breed(file: UploadFile = File(...)):
    # Check if the file is an image
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File provided is not an image.")
    
    try:
        # Save the uploaded file temporarily
        temp_file = "temp_upload.jpg"
        with open(temp_file, "wb") as buffer:
            buffer.write(await file.read())
        
        # Load and preprocess the image
        img = image.load_img(temp_file, target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Make prediction
        print("\n=== Prediction Debug Info ===")
        print(f"Input shape: {img_array.shape}")
        print(f"Input range: [{img_array.min()}, {img_array.max()}]")
        
        predictions = model.predict(img_array)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx])
        predicted_class = class_names[predicted_class_idx]
        
        # Print prediction details
        print("Raw predictions:", predictions[0])
        print("Class indices:", list(range(len(class_names))))
        print("Class names:", class_names)
        print(f"Predicted class index: {predicted_class_idx}")
        print(f"Predicted class: {predicted_class}")
        print(f"Confidence: {confidence:.2f}")
        print("===========================\n")
        
        # Clean up the temporary file
        if os.path.exists(temp_file):
            os.remove(temp_file)
        
        return {
            "breed": predicted_class,
            "confidence": round(confidence * 100, 2),  # Convert to percentage
            "description": breed_descriptions.get(predicted_class, "No description available.")
        }
        
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        if os.path.exists("temp_upload.jpg"):
            os.remove("temp_upload.jpg")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Cattle Breed Recognition API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
