import pandas as pd
import joblib
import os

# 📦 Chargement du modèle ML une seule fois
model_path = os.path.join(os.path.dirname(__file__), '../../model_temperature_humidity.pkl')
model = joblib.load(model_path)

def predict_temperature_humidity(data):
    productname = data.get('productname')
    category = data.get('category')

    input_df = pd.DataFrame([{
        'productname': productname,
        'category': category
    }])

    prediction = model.predict(input_df)[0]
    return {
        'temperature': round(prediction[0], 2),
        'humidity': round(prediction[1], 2)
    }
