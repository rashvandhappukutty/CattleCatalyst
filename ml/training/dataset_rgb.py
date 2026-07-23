import os
from PIL import Image

# Path to your original dataset
input_dataset_path = r"E:\Breed Recongination\ai model\dataset\train"

# Path where the RGB dataset will be saved
output_dataset_path = r"E:\Breed Recongination\ai model\dataset_rgb"

# Create output directory if it doesn't exist
if not os.path.exists(output_dataset_path):
    os.makedirs(output_dataset_path)

# Loop through all class folders
for class_name in os.listdir(input_dataset_path):
    class_input_path = os.path.join(input_dataset_path, class_name)
    class_output_path = os.path.join(output_dataset_path, class_name)

    if not os.path.isdir(class_input_path):
        continue  # skip non-folders

    # Create class folder in output directory
    if not os.path.exists(class_output_path):
        os.makedirs(class_output_path)

    # Process all images in this class
    for image_name in os.listdir(class_input_path):
        image_input_path = os.path.join(class_input_path, image_name)
        image_output_path = os.path.join(class_output_path, image_name)

        try:
            # Open image
            img = Image.open(image_input_path)

            # Convert to RGB
            img_rgb = img.convert("RGB")

            # Save to new location
            img_rgb.save(image_output_path)
        except Exception as e:
            print(f"Skipping {image_input_path}: {e}")

print(" All images converted to RGB and saved successfully!")
