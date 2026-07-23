# evaluate_model.py
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# Configuration
TEST_DIR = "E:/Breed Recongination/ai model/dataset/test"
MODEL_PATH = "E:/Breed Recongination/ai model/models/breed_model.h5"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# Define all classes based on your test directory
CLASSES = sorted([d for d in os.listdir(TEST_DIR) if os.path.isdir(os.path.join(TEST_DIR, d))])
print(f"Found {len(CLASSES)} classes in test directory: {CLASSES}")

# Create test data generator
test_datagen = ImageDataGenerator(rescale=1./255)

# Create test generator
test_gen = test_datagen.flow_from_directory(
    TEST_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    color_mode='rgb',
    shuffle=False,
    classes=CLASSES
)

def load_model_with_fixed_output(model_path, num_classes):
    """Load a Keras model and fix output layer for the correct number of classes."""
    # First, load the model without compiling
    model = tf.keras.models.load_model(model_path, compile=False)
    
    # Get the input shape from the model's input
    input_shape = model.input_shape[1:]  # Exclude batch dimension
    print(f"Original model input shape: {input_shape}")
    
    # Create input layer that accepts RGB but converts to grayscale
    input_layer = tf.keras.layers.Input(shape=(*input_shape[:2], 3))  # RGB input
    
    # Convert RGB to grayscale by taking the mean across channels
    x = tf.keras.layers.Lambda(
        lambda img: tf.reduce_mean(img, axis=-1, keepdims=True),
        name='rgb_to_grayscale'
    )(input_layer)
    
    # Get the output of the first layer (after input)
    first_layer_output = model.layers[1](x)
    
    # Connect the rest of the model
    x = first_layer_output
    for layer in model.layers[2:]:  # Skip input and first layer
        x = layer(x)
    
    # If the original model already has a Dense output layer, we'll replace it
    if not isinstance(model.layers[-1], tf.keras.layers.Dense):
        x = tf.keras.layers.Flatten()(x)
    
    # Add a new output layer with the correct number of classes
    output = tf.keras.layers.Dense(
        num_classes, 
        activation='softmax',
        name='breed_prediction'
    )(x)
    
    # Create a new model
    new_model = tf.keras.Model(inputs=input_layer, outputs=output)
    
    # Compile the model
    new_model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return new_model

# Load the model with fixed output layer
print("Loading and preparing model...")
try:
    model = load_model_with_fixed_output(MODEL_PATH, len(CLASSES))
    print("Model loaded and prepared successfully!")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    exit(1)

# Print class mapping
print("\n=== Class Mapping ===")
for idx, class_name in enumerate(CLASSES):
    print(f"Class {idx}: {class_name}")
print("===================")

# Evaluate the model
print("\nEvaluating model on test set...")
test_loss, test_accuracy = model.evaluate(test_gen)
print(f"\nTest Accuracy: {test_accuracy*100:.2f}%")
print(f"Test Loss: {test_loss:.4f}")

# Generate predictions
print("\nGenerating predictions...")
y_pred = model.predict(test_gen)
y_pred_classes = np.argmax(y_pred, axis=1)
y_true = test_gen.classes

# Get class names from the test generator
class_names = list(test_gen.class_indices.keys())

# Classification report
print("\nClassification Report:")
print(classification_report(y_true, y_pred_classes, target_names=class_names))

# Confusion matrix
plt.figure(figsize=(15, 12))
cm = confusion_matrix(y_true, y_pred_classes)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=class_names, 
            yticklabels=class_names)
plt.title('Confusion Matrix')
plt.ylabel('True Label')
plt.xlabel('Predicted Label')
plt.xticks(rotation=45, ha='right')
plt.yticks(rotation=0)
plt.tight_layout()
plt.savefig('confusion_matrix.png')
print("\nConfusion matrix saved as 'confusion_matrix.png'")

# Display some sample predictions
print("\nSample predictions:")
test_files = test_gen.filenames
sample_indices = np.random.choice(len(test_files), min(5, len(test_files)), replace=False)

for idx in sample_indices:
    true_class = class_names[y_true[idx]]
    pred_class = class_names[y_pred_classes[idx]]
    confidence = np.max(y_pred[idx]) * 100
    print(f"\nImage: {test_files[idx]}")
    print(f"True class: {true_class}")
    print(f"Predicted: {pred_class} ({confidence:.2f}% confidence)")