const API_BASE_URL = 'http://localhost:8000';

export interface PredictionResult {
  breed: string;
  confidence: number;
  description: string;
}

export const predictBreed = async (imageFile: File): Promise<PredictionResult> => {
  console.log('Creating form data with file:', imageFile);
  
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    console.log('Sending request to:', `${API_BASE_URL}/predict`);
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header, let the browser set it with the correct boundary
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'Failed to predict breed';
      try {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch (e) {
        console.error('Failed to parse error response:', e);
        const text = await response.text();
        console.error('Raw response:', text);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Received prediction result:', result);
    return result;
    
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to connect to the prediction service. Please try again.'
    );
  }
};

export const checkApiStatus = async (): Promise<boolean> => {
  try {
    console.log('Checking API status at:', `${API_BASE_URL}/`);
    const response = await fetch(`${API_BASE_URL}/`);
    console.log('API status response:', response.status);
    return response.ok;
  } catch (error) {
    console.error('API status check failed:', error);
    return false;
  }
};
