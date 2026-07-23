# CattleCatalyst 🐄🌾

CattleCatalyst is an advanced, production-ready, AI-powered breed recognition system for cattle and buffalo. Using deep learning architectures, the system analyzes livestock images to recognize distinct breeds instantly and provide actionable, detailed agricultural insights.

---

## 🏗️ Architecture & Folder Structure

The project has been organized into a professional, modular directory structure separating frontend, backend, and machine learning operations:

```text
Cattle-Catalyst-main/
│
├── frontend/                  # React Vite TS Frontend Application
│   ├── public/                # Static assets served directly
│   ├── src/
│   │   ├── assets/            # App assets (images, icons, global styles)
│   │   │   └── images/
│   │   ├── components/        # Reusable React components
│   │   │   ├── hero/          # Hero section components (e.g., PremiumHero)
│   │   │   ├── navigation/    # Navigation headers
│   │   │   ├── upload/        # Image drop and upload sections
│   │   │   ├── results/       # Analysis and breed display
│   │   │   ├── layout/        # General layout components
│   │   │   └── ui/            # Shadcn UI low-level design primitives
│   │   ├── hooks/             # Custom React hooks (e.g., use-toast, use-mobile)
│   │   ├── pages/             # View pages (Index, NotFound)
│   │   ├── services/          # API integration services (api.ts)
│   │   ├── lib/               # Custom libraries and utility functions
│   │   ├── App.tsx            # Main App routing and providers wrapper
│   │   └── main.tsx           # React entry point
│   ├── package.json           # Frontend dependencies & scripts
│   ├── vite.config.ts         # Vite bundler configuration
│   ├── tsconfig.json          # TypeScript configurations
│   └── tailwind.config.ts     # Tailwind styling rules
│
├── backend/                   # FastAPI Backend Server
│   ├── main.py                # REST API entry point (endpoints, model loaders)
│   └── requirements.txt       # Python backend dependencies
│
├── ml/                        # Machine Learning Pipelines
│   ├── training/              # Training scripts and preprocessing
│   │   ├── train_model.py     # CNN Attention model training pipeline
│   │   └── dataset_rgb.py     # Dataset channels preprocessing script
│   ├── inference/             # Inference and testing code
│   │   ├── inference.py       # Basic prediction test script
│   │   └── evaluate_model.py  # Model metrics generation & matrix evaluator
│   └── datasets/              # Local breed image training directories
│
├── docs/                      # Documentation resources
└── README.md                  # Project landing documentation
```

---

## 🚀 Getting Started

### 1. Backend API Server Setup
The backend runs on a **FastAPI** framework and loads the trained `.h5` model to perform real-time breed inferences.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the backend server:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`.

---

### 2. Frontend React Client Setup
The client-side interface is built with **React, Vite, TypeScript, and Tailwind CSS**.

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` (or the console printed port) in your web browser.

---

## 🧠 Machine Learning Engine

The ML subsystem uses an **Enhanced Convolutional Neural Network (CNN)** with integrated **Channel and Spatial Attention Blocks** to extract local structural features (such as horns, snout curvature, hump shape, and ear length) to reach high classification accuracy.

- **Supported Breeds**: Gir, Murrah, Sahiwal, and others.
- **Model checkpoints**: Model saves its weights to `breed_model.h5` inside the `models` directory.
- **Data Augmentation**: Enhances training using rotation, brightness variations, zooms, and horizontal flips.
- **Training pipeline**:
  To start a training run:
  ```bash
  python ml/training/train_model.py
  ```
- **Evaluation pipeline**:
  Generate accuracy reports and confusion matrices:
  ```bash
  python ml/inference/evaluate_model.py
  ```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Radix UI Primitives, Lucide Icons, Shadcn/ui.
- **Backend**: Python 3.9+, FastAPI, Uvicorn, TensorFlow / Keras, NumPy, Pillow.
- **ML & Data Analysis**: TensorFlow 2.x, Scikit-Learn, Matplotlib, Seaborn, PIL.

---

## 📄 License & Attributions

This project is prepared for modern agricultural research and smart-farming applications. All breed images, templates, and dataset parameters are properties of their respective researchers and annotators.
# CattleCatalyst
