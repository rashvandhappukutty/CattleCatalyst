# 1. First, install required package
# Run this in your terminal:
# pip install tensorflow-addons

# 2. Replace your train_model.py with this improved version:

# 1. First, install required package
# Run this in your terminal:
# pip install tensorflow-addons

import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import (
    Dense, GlobalAveragePooling2D, Dropout, 
    BatchNormalization, Conv2D, MaxPooling2D,
    Input, Add, Multiply, Lambda, Concatenate
)
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import (
    ModelCheckpoint, EarlyStopping, 
    ReduceLROnPlateau, TensorBoard
)
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers.schedules import ExponentialDecay
from tensorflow.keras.regularizers import l2
from sklearn.utils.class_weight import compute_class_weight
import numpy as np
import os
import datetime
import matplotlib.pyplot as plt

# Enhanced Configuration for 80% Accuracy
DATA_DIR = "E:/Breed Recongination/ai model/dataset/train"
IMG_SIZE = (224, 224)
BATCH_SIZE = 16  # Optimal for stability and memory
EPOCHS = 100     # Increased epochs for better convergence
MODEL_DIR = "E:/Breed Recongination/ai model/models"
CHANNELS = 3

# Create model directory if it doesn't exist
os.makedirs(MODEL_DIR, exist_ok=True)

# Enhanced Data Augmentation for Better Generalization
train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=30,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.15,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest',
    brightness_range=[0.8, 1.2],
    channel_shift_range=0.1,
    featurewise_center=False,
    samplewise_center=False,
    featurewise_std_normalization=False,
    samplewise_std_normalization=False
)

val_datagen = ImageDataGenerator(rescale=1./255)

# Data generators
print("Loading training data...")
train_gen = train_datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    subset="training",
    class_mode="categorical",
    shuffle=True,
    seed=42
)

print("Loading validation data...")
val_gen = val_datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    subset="validation", 
    class_mode="categorical",
    shuffle=False,
    seed=42
)

# Calculate class weights for imbalanced datasets
if len(train_gen.classes) > 0:
    class_weights = compute_class_weight(
        'balanced',
        classes=np.unique(train_gen.classes),
        y=train_gen.classes
    )
    class_weights = dict(enumerate(class_weights))
else:
    class_weights = None

num_classes = len(train_gen.class_indices)
print(f"Detected {num_classes} classes for breed recognition")
print("Class distribution:", train_gen.class_indices)

def create_attention_block(x, filters):
    """Channel and Spatial Attention Block"""
    # Channel Attention
    gap = GlobalAveragePooling2D()(x)
    ca = Dense(filters // 8, activation='relu')(gap)
    ca = Dense(filters, activation='sigmoid')(ca)
    ca = tf.keras.layers.Reshape((1, 1, filters))(ca)
    x_ca = Multiply()([x, ca])
    
    # Spatial Attention
    sa_gap = Lambda(lambda x: tf.reduce_mean(x, axis=-1, keepdims=True))(x_ca)
    sa_gmp = Lambda(lambda x: tf.reduce_max(x, axis=-1, keepdims=True))(x_ca)
    sa = Concatenate(axis=-1)([sa_gap, sa_gmp])
    sa = Conv2D(1, (7, 7), padding='same', activation='sigmoid')(sa)
    x_sa = Multiply()([x_ca, sa])
    
    return x_sa

def create_enhanced_breed_model(input_shape, num_classes):
    """Enhanced CNN Architecture for 80%+ Accuracy"""
    inputs = Input(shape=input_shape, name='breed_input')
    
    # Initial feature extraction
    x = Conv2D(64, (7, 7), strides=2, padding='same', activation='relu', name='initial_conv')(inputs)
    x = BatchNormalization(name='initial_bn')(x)
    x = MaxPooling2D((3, 3), strides=2, padding='same', name='initial_pool')(x)
    x = Dropout(0.1, name='initial_dropout')(x)
    
    # Stage 1: 64 filters
    x = Conv2D(64, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = Conv2D(64, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = create_attention_block(x, 64)
    x = MaxPooling2D((2, 2))(x)
    x = Dropout(0.2)(x)
    
    # Stage 2: 128 filters
    x = Conv2D(128, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = Conv2D(128, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = create_attention_block(x, 128)
    x = MaxPooling2D((2, 2))(x)
    x = Dropout(0.3)(x)
    
    # Stage 3: 256 filters
    x = Conv2D(256, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = Conv2D(256, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = create_attention_block(x, 256)
    x = MaxPooling2D((2, 2))(x)
    x = Dropout(0.4)(x)
    
    # Stage 4: 512 filters
    x = Conv2D(512, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = Conv2D(512, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = create_attention_block(x, 512)
    
    # Global feature aggregation
    gap = GlobalAveragePooling2D(name='global_avg_pool')(x)
    gmp = tf.keras.layers.GlobalMaxPooling2D(name='global_max_pool')(x)
    global_features = Concatenate(name='global_concat')([gap, gmp])
    
    # Enhanced classifier head
    x = Dense(2048, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.001), name='fc1')(global_features)
    x = BatchNormalization(name='fc1_bn')(x)
    x = Dropout(0.5, name='fc1_dropout')(x)
    
    x = Dense(1024, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.001), name='fc2')(x)
    x = BatchNormalization(name='fc2_bn')(x)
    x = Dropout(0.5, name='fc2_dropout')(x)
    
    x = Dense(512, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.001), name='fc3')(x)
    x = BatchNormalization(name='fc3_bn')(x)
    x = Dropout(0.3, name='fc3_dropout')(x)
    
    # Output layer
    outputs = Dense(num_classes, activation='softmax', name='breed_predictions')(x)
    
    return Model(inputs=inputs, outputs=outputs, name='EnhancedBreedNet')

# Alternative: Transfer Learning with EfficientNet (Often achieves higher accuracy)
def create_transfer_learning_model(input_shape, num_classes):
    """Transfer learning model using EfficientNetB0"""
    base_model = EfficientNetB0(
        weights='imagenet',
        include_top=False,
        input_shape=input_shape
    )
    
    # Freeze early layers, fine-tune later layers
    for layer in base_model.layers[:-20]:
        layer.trainable = False
    
    inputs = base_model.input
    x = base_model.output
    
    # Enhanced classifier
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.001))(x)
    x = BatchNormalization()(x)
    x = Dropout(0.5)(x)
    
    x = Dense(512, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.001))(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)
    
    outputs = Dense(num_classes, activation='softmax')(x)
    
    return Model(inputs=inputs, outputs=outputs, name='EfficientBreedNet')

# Create model - Choose between custom or transfer learning
print("Building Enhanced Breed Recognition Model...")
# Option 1: Custom architecture
model = create_enhanced_breed_model((*IMG_SIZE, CHANNELS), num_classes)

# Option 2: Transfer learning (uncomment to use)
# model = create_transfer_learning_model((*IMG_SIZE, CHANNELS), num_classes)

# Advanced learning rate schedule
def cosine_annealing_schedule(epoch, lr):
    """Cosine annealing learning rate schedule"""
    if epoch < 10:  # Warmup
        return 1e-4 + (1e-3 - 1e-4) * epoch / 10
    else:
        # Cosine annealing
        return 1e-5 + (1e-3 - 1e-5) * 0.5 * (1 + np.cos(np.pi * (epoch - 10) / (EPOCHS - 10)))

# Compile model with advanced optimizer settings
model.compile(
    optimizer=Adam(
        learning_rate=1e-3,
        beta_1=0.9,
        beta_2=0.999,
        epsilon=1e-7
    ),
    loss='categorical_crossentropy',
    metrics=['accuracy', 'top_3_accuracy']
)

print(f"Model has {model.count_params():,} trainable parameters")
model.summary()

# Enhanced callbacks for 80% accuracy target
log_dir = f"logs/breed_training_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}"
callbacks = [
    ModelCheckpoint(
        os.path.join(MODEL_DIR, 'best_breed_model_80.h5'),
        monitor='val_accuracy',
        save_best_only=True,
        mode='max',
        verbose=1,
        save_weights_only=False
    ),
    EarlyStopping(
        monitor='val_accuracy',
        patience=25,
        restore_best_weights=True,
        min_delta=0.001,
        verbose=1
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.3,
        patience=10,
        min_lr=1e-7,
        verbose=1,
        cooldown=5
    ),
    tf.keras.callbacks.LearningRateScheduler(
        cosine_annealing_schedule,
        verbose=1
    ),
    TensorBoard(
        log_dir=log_dir,
        histogram_freq=1,
        update_freq='epoch'
    )
]

print("Training Enhanced Breed Recognition Model for 80%+ accuracy...")
print("=" * 60)
print("ENHANCED FEATURES:")
print("   • Attention mechanisms for better feature focus")
print("   • Advanced data augmentation")
print("   • Cosine annealing learning rate schedule")
print("   • Regularization and dropout for generalization")
print("   • Dual global feature aggregation")
print("   • Enhanced classifier head")
print("=" * 60)

# Training (removed problematic parameters)
try:
    history = model.fit(
        train_gen,
        validation_data=val_gen,
        epochs=EPOCHS,
        callbacks=callbacks,
        class_weight=class_weights,
        verbose=1
    )
    
    # Save final model
    final_model_path = os.path.join(MODEL_DIR, "final_breed_model_80.h5")
    model.save(final_model_path)
    print(f"Final model saved to {final_model_path}")
    
    # Final evaluation
    print("\nFinal Evaluation:")
    val_loss, val_accuracy, val_top3 = model.evaluate(val_gen, verbose=0)
    print(f"Final Validation Accuracy: {val_accuracy*100:.2f}%")
    print(f"Final Top-3 Accuracy: {val_top3*100:.2f}%")
    
    # Success check
    if val_accuracy >= 0.80:
        print("\n🎉 SUCCESS! Model achieved 80%+ accuracy target!")
    elif val_accuracy >= 0.75:
        print(f"\n⚡ Close! Achieved {val_accuracy*100:.2f}% accuracy. Consider:")
        print("  1. Training for more epochs")
        print("  2. Using transfer learning approach (EfficientNet)")
        print("  3. Adjusting learning rate schedule")
    else:
        print(f"\n⚠️ Current accuracy: {val_accuracy*100:.2f}%. Recommendations:")
        print("  1. Use transfer learning model (uncomment EfficientNet option)")
        print("  2. Increase training data")
        print("  3. Adjust data augmentation parameters")
        print("  4. Consider ensemble methods")

    # Plot training history
    def plot_training_history(history):
        """Plot training metrics"""
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
        
        # Accuracy
        ax1.plot(history.history['accuracy'], label='Training')
        ax1.plot(history.history['val_accuracy'], label='Validation')
        ax1.set_title('Model Accuracy')
        ax1.set_xlabel('Epoch')
        ax1.set_ylabel('Accuracy')
        ax1.legend()
        ax1.grid(True)
        
        # Loss
        ax2.plot(history.history['loss'], label='Training')
        ax2.plot(history.history['val_loss'], label='Validation')
        ax2.set_title('Model Loss')
        ax2.set_xlabel('Epoch')
        ax2.set_ylabel('Loss')
        ax2.legend()
        ax2.grid(True)
        
        plt.tight_layout()
        plt.savefig(os.path.join(MODEL_DIR, 'training_history_80.png'))
        plt.show()
    
    plot_training_history(history)
    
except Exception as e:
    print(f"Training error: {str(e)}")
    print("Trying alternative approach...")
    
    # Fallback: Simpler fit call
    history = model.fit(
        train_gen,
        validation_data=val_gen,
        epochs=EPOCHS,
        callbacks=callbacks,
        verbose=1
    )

print("\nTraining completed!")

# Additional tips for reaching 80%
print("\n" + "="*60)
print("TIPS TO REACH 80% ACCURACY:")
print("1. Use transfer learning with pre-trained models")
print("2. Increase dataset size (aim for 500+ images per class)")
print("3. Ensure data quality and consistency")
print("4. Use ensemble methods (combine multiple models)")
print("5. Implement test-time augmentation")
print("6. Fine-tune hyperparameters systematically")
print("7. Consider using larger input image sizes (299x299)")
print("="*60)
from tensorflow.keras.regularizers import l2
from sklearn.utils.class_weight import compute_class_weight
import numpy as np
import os
import datetime

# Config
DATA_DIR = "E:/Breed Recongination/ai model/dataset/train"
IMG_SIZE = (224, 224)
BATCH_SIZE = 16  # Reduced batch size for better memory management
EPOCHS = 50
MODEL_DIR = "E:/Breed Recongination/ai model/models"
USE_GRAYSCALE = False  # Using color images for better feature extraction

# Data Augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=40,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest',
    brightness_range=[0.7, 1.3]
)

# ... [rest of the implementation remains the same]

# Training generator
train_gen = train_datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    subset="training",
    class_mode="categorical",
    color_mode=COLOR_MODE,
    shuffle=True
)

# Validation generator
val_gen = val_datagen.flow_from_directory(
    DATA_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    subset="validation",
    class_mode="categorical",
    color_mode=COLOR_MODE,
    shuffle=False
)

# Calculate class weights
class_weights = compute_class_weight(
    'balanced',
    classes=np.unique(train_gen.classes),
    y=train_gen.classes
)
class_weights = dict(enumerate(class_weights))

num_classes = len(train_gen.class_indices)
print(f"✅ Detected {num_classes} classes")
print("Class indices:", train_gen.class_indices)

# ----------------------------
# CNN Architecture
# ----------------------------
def create_cnn_model(input_shape, num_classes):
    inputs = Input(shape=input_shape)
    
    # Block 1
    x = Conv2D(32, (3, 3), padding='same', activation='relu')(inputs)
    x = BatchNormalization()(x)
    x = MaxPooling2D((2, 2))(x)
    x = Dropout(0.3)(x)
    
    # Block 2
    x = Conv2D(64, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = MaxPooling2D((2, 2))(x)
    x = Dropout(0.4)(x)
    
    # Block 3
    x = Conv2D(128, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = MaxPooling2D((2, 2))(x)
    x = Dropout(0.4)(x)
    
    # Block 4
    x = Conv2D(256, (3, 3), padding='same', activation='relu')(x)
    x = BatchNormalization()(x)
    x = GlobalAveragePooling2D()(x)
    x = Dropout(0.5)(x)
    
    # Dense layers
    x = Dense(512, activation='relu')(x)
    x = BatchNormalization()(x)
    x = Dropout(0.5)(x)
    
    # Output layer
    outputs = Dense(num_classes, activation='softmax')(x)
    
    return Model(inputs=inputs, outputs=outputs)

# Create and compile model
model = create_cnn_model((*IMG_SIZE, CHANNELS), num_classes)

# Learning rate schedule
def lr_schedule(epoch):
    """Learning rate schedule with warmup"""
    lr = 1e-3
    if epoch > 50:
        lr *= 0.1
    if epoch > 75:
        lr *= 0.1
    return lr

model.compile(
    optimizer=Adam(learning_rate=1e-3),
    loss='categorical_crossentropy',
    metrics=['accuracy', tf.keras.metrics.AUC()]
)

# Print model summary
model.summary()

# ----------------------------
# Callbacks
# ----------------------------
callbacks = [
    ModelCheckpoint(
        os.path.join(MODEL_DIR, 'breed_model.h5'),
        monitor='val_accuracy',
        save_best_only=True,
        mode='max'
    ),
    EarlyStopping(
        monitor='val_accuracy',
        patience=20,
        restore_best_weights=True,
        min_delta=0.001
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.2,
        patience=10,
        min_lr=1e-6,
        verbose=1
    ),
    tf.keras.callbacks.LearningRateScheduler(lr_schedule),
    TensorBoard(
        log_dir=log_dir,
        histogram_freq=1,
        update_freq='batch'
    )
]

# ----------------------------
# Training
# ----------------------------
print("🚀 Starting training...")
history = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=EPOCHS,
    callbacks=callbacks,
    class_weight=class_weights,
    verbose=1
)

# Save final model
final_model_path = os.path.join(MODEL_DIR, "final_breed_model.h5")
model.save(final_model_path)
print(f"✅ Final model saved to {final_model_path}")

# Evaluate the model
print("\nEvaluating on validation set...")
val_loss, val_accuracy, val_auc = model.evaluate(val_gen)
print(f"\nValidation Accuracy: {val_accuracy*100:.2f}%")
print(f"Validation AUC: {val_auc*100:.2f}%")

if val_accuracy >= 0.7:
    print("\n🎉 Success! Model achieved target accuracy of 70% or higher!")
else:
    print("\n⚠️ Model did not reach target accuracy. Consider:")
    print("  1. Training for more epochs")
    print("  2. Increasing model capacity")
    print("  3. Collecting more training data")
    print("  4. Adjusting data augmentation")

print("\nTraining completed!")