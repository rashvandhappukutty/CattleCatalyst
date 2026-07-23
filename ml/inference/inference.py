import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

model = tf.keras.models.load_model("ai_model/models/breed_model.h5")
class_names = ['Gir', 'Murrah', 'Sahiwal']  # update with your classes

def predict(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_class = class_names[np.argmax(predictions)]
    confidence = np.max(predictions)

    print(f"Prediction: {predicted_class} ({confidence:.2f})")

predict("ai_model/dataset/Gir/gir1.jpg")
