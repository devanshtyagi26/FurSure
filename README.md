# FurSure - Cat vs Dog Predictor

![Demo](./public/demo/demo.gif)

> A full-stack Machine Learning app to classify whether an image is of a cat or a dog, using a trained CNN model, FastAPI backend, and a modern Next.js frontend.

---

## 🌟 Features

- 📦 Upload any image and get an instant prediction (Cat or Dog)
- ⚙️ Built with FastAPI + TensorFlow on the backend
- 💅 Frontend built with Next.js and Tailwind CSS
- 🔌 Clean UI/UX with image preview and smooth API integration
- 🌐 Fully deployed on Netlify (frontend) and Render (backend)

---

## 🎯 Use Cases

While the task sounds simple, the architecture and workflow mirror production-level ML systems:

- **Educational Tool**: Great starter project for anyone learning computer vision, ML model deployment, or full-stack AI dev.
- **Scalable Template**: Swap out the model and repurpose the system for:

  - Skin disease detection
  - Garbage classification
  - Food or fashion item identification
  - Wildlife monitoring apps

- **Deployment Blueprint**: Perfect for understanding how to connect ML models with modern web stacks and host them affordably.

---

## 🧱 Tech Stack

| Layer         | Tech                        |
| ------------- | --------------------------- |
| 🧠 Model      | TensorFlow / Keras (CNN)    |
| 🐍 Backend    | FastAPI, Uvicorn            |
| 🎨 Frontend   | Next.js, Tailwind CSS       |
| ☁️ Deployment | Render (API), Netlify (Web) |

---

## 🧠 Model Training (Optional)

The backend uses a pre-trained Keras CNN model. You can train your own with this rough structure:

```python
model = Sequential([
    Conv2D(...),
    MaxPooling2D(...),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(1, activation='sigmoid')
])
```

Trained on \~2,000 cat and dog images from Kaggle using binary crossentropy.

---

## ⚔️ Challenges Faced

- Handling base64 encoded images from frontend to backend
- CORS issues between Netlify ↔ Render
- Keeping model inference time under free-tier limits
- Smoothing user experience without lag or reloads

---

## 💡 Future Improvements

- 📸 **Live Camera Feed**: Real-time classification using webcam
- 📱 **PWA Support**: Make the app installable and offline-ready
- 🧠 **Transfer Learning**: Improve accuracy with MobileNetV2 or EfficientNet
- 🐾 **Multi-Class Support**: Add more pet species or even breeds

---

## 🙌 Acknowledgements

- [TensorFlow](https://www.tensorflow.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Next.js](https://nextjs.org/)
- [Kaggle Dogs vs Cats Dataset](https://www.kaggle.com/c/dogs-vs-cats)

---

## ✨ Author

**Devansh Tyagi** [🐙 GitHub](https://github.com/devanshtyagi26) | [💼 LinkedIn](https://linkedin.com/in/tyagi-devansh)
