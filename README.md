# 🐄 CattleCatalyst

<div align="center">

### AI-Powered Cattle & Buffalo Breed Recognition System

*An intelligent deep learning platform for livestock breed identification and agricultural insights.*

![Python](https://img.shields.io/badge/Python-3.9+-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

# 📖 Overview

**CattleCatalyst** is an AI-powered livestock breed recognition system that uses deep learning to identify cattle and buffalo breeds from images. The platform provides real-time breed classification along with agricultural insights, making it suitable for researchers, farmers, veterinarians, and smart farming applications.

The application combines a modern React frontend, a FastAPI backend, and a TensorFlow-based machine learning engine into a scalable architecture.

---

# ✨ Features

- 🐄 AI-powered cattle & buffalo breed recognition
- 📸 Drag-and-drop image upload
- ⚡ Real-time image inference
- 🧠 CNN with Attention Mechanism
- 📊 Confidence score prediction
- 📱 Modern responsive UI
- 🚀 FastAPI REST API
- 🔄 Easy model retraining pipeline
- 📈 Evaluation with confusion matrix & metrics
- 🌾 Designed for smart agriculture

---

# 🏗️ Project Structure

```text
Cattle-Catalyst-main/

├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── hero/
│   │   │   ├── navigation/
│   │   │   ├── upload/
│   │   │   ├── results/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── lib/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── ml/
│   ├── training/
│   │   ├── train_model.py
│   │   └── dataset_rgb.py
│   ├── inference/
│   │   ├── inference.py
│   │   └── evaluate_model.py
│   └── datasets/
│
├── docs/
│
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/CattleCatalyst.git

cd CattleCatalyst
```

---

# 🖥 Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate it.

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Run the FastAPI server.

```bash
python main.py
```

Server:

```
http://localhost:8000
```

---

# 💻 Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install packages.

```bash
npm install
```

Start development server.

```bash
npm run dev
```

Frontend:

```
http://localhost:8080
```

---

# 🧠 Machine Learning Pipeline

The ML engine is built using an Enhanced Convolutional Neural Network (CNN) integrated with Channel Attention and Spatial Attention mechanisms.

The model extracts unique visual characteristics including:

- Horn shape
- Ear length
- Face structure
- Snout curvature
- Coat texture
- Hump size
- Body profile

Supported breeds include:

- Gir
- Murrah
- Sahiwal
- Jersey
- Holstein Friesian
- Indigenous breeds
- Additional custom classes

---

## Train Model

```bash
python ml/training/train_model.py
```

---

## Evaluate Model

```bash
python ml/inference/evaluate_model.py
```

---

# 📊 Model Features

- CNN Architecture
- Attention Mechanism
- TensorFlow/Keras
- Image Augmentation
- Dropout Regularization
- Batch Normalization
- Early Stopping
- Model Checkpointing

Saved model:

```
models/breed_model.h5
```

---

# 🔌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Health Check |
| POST | `/predict` | Predict Breed |
| GET | `/docs` | Swagger UI |
| GET | `/redoc` | API Documentation |

---

# 🛠 Tech Stack

## Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Radix UI
- shadcn/ui
- Lucide Icons

## Backend

- FastAPI
- Python
- TensorFlow
- NumPy
- Pillow
- Uvicorn

## Machine Learning

- TensorFlow
- Keras
- Scikit-Learn
- OpenCV
- Matplotlib
- Seaborn

---

# 🌾 Applications

- Smart Farming
- Livestock Monitoring
- Veterinary Assistance
- Breed Authentication
- Dairy Farm Automation
- Agricultural Research
- Animal Husbandry

---

# 📈 Future Enhancements

- Mobile Application
- Cloud Deployment
- Multi-Animal Detection
- Disease Detection
- Weight Estimation
- Age Prediction
- Milk Yield Prediction
- Offline Edge AI Support
- Farmer Dashboard
- Analytics Portal

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📄 License

This project is intended for educational, agricultural research, and smart farming applications.

Please ensure proper attribution for datasets, pretrained models, and third-party assets.

---

<div align="center">

**Made with ❤️ using React, FastAPI & TensorFlow**

**Empowering Smart Agriculture Through Artificial Intelligence 🌾🐄**

</div>
