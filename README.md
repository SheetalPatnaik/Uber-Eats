# 🍔 Uber Eats Simulation Project  

## 📌 Overview  
This project is a **full-stack simulation of an online food delivery platform**, replicating core functionalities like **restaurant management, order placement, real-time tracking, billing, and user authentication**.  

Built with **Django (backend) and React.js (frontend)**, the system leverages **WebSockets for live order tracking, Redis for caching, Docker & Kubernetes for deployment, and AWS/GCP for cloud scalability**.  

This project showcases expertise in **microservices, real-time architecture, DevOps, and scalable cloud computing**, making it **highly relevant for backend, DevOps, and full-stack engineering roles**.  

---

## 🎯 Features  
✔ **User & Restaurant Management** – Registration, authentication, and profile updates.  
✔ **Real-Time Order Processing** – WebSockets for live order updates.  
✔ **Dynamic Pricing & Billing** – Auto price calculations, promo codes, and payments.  
✔ **Geolocation-Based Restaurant Recommendations** – Suggests nearby restaurants.  
✔ **Delivery Management** – Assigns drivers & tracks delivery status.  
✔ **Caching & Performance Optimization** – Redis-based session management.  
✔ **Scalable Deployment** – Docker, Kubernetes, and cloud hosting.  

---

## 🏗️ Tech Stack & Tools  
### **🔹 Backend**  
- **Django & Django REST Framework** – API-driven backend  
- **WebSockets (Django Channels)** – Live order tracking  

### **🔹 Frontend**  
- **React.js** – Interactive UI  
- **Redux** – State management  

### **🔹 Database & Caching**  
- **PostgreSQL & MongoDB** – Structured & NoSQL data storage  
- **Redis** – High-speed caching  

### **🔹 DevOps & Cloud Deployment**  
- **Docker & Kubernetes** – Containerized microservices deployment  
- **AWS & Google Cloud** – Scalable cloud hosting  
- **NGINX & Gunicorn** – Web server optimization  

### **🔹 Testing & Performance**  
- **Postman & JMeter** – API testing & load simulation  

### **🔹 System Design**

   <img width="697" alt="image" src="https://github.com/user-attachments/assets/77b3f8f6-1ab8-44a3-ba8f-c204744f6a0e">

---
### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/SheetalPatnaik/Uber-Eats.git
cd Uber-Eats
```

### 2️⃣ Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🐳 Docker Setup
- **Build Docker Images**
```bash
cd backend
docker build -t uber-eats-backend .
cd ../frontend
docker build -t uber-eats-frontend .
```

- **Run Docker Containers**
```bash
# Start PostgreSQL & Redis
docker run --name postgres-container -e POSTGRES_DB=ubereats_db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:latest
docker run --name redis-container -p 6379:6379 -d redis:latest

```
# Run Backend & Frontend
```bash
docker run --name backend-container --link postgres-container --link redis-container -p 8000:8000 uber-eats-backend
docker run --name frontend-container -p 3000:3000 uber-eats-frontend
```
## ☸️ Kubernetes Deployment

1️⃣ Create a Namespace
```bash
kubectl create namespace uber-eats
```
2️⃣ Deploy Services
```bash
kubectl apply -f k8s/postgres-pv.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```
3️⃣ Verify Deployment
```bash
kubectl get pods -n uber-eats
kubectl get services -n uber-eats
```
## 🔧 Minikube Setup
```bash
- Start Minikube
minikube start
```
```bash
- Deploy Application
kubectl apply -f k8s/postgres-pv.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

- Expose Services
minikube service backend-service -n uber-eats
minikube service frontend-service -n uber-eats
```
## 🛠️ Testing
**API Testing**
- Use Postman to test all endpoints.
- Verify user authentication, restaurant management, and payment APIs.
**Load Testing**
- Use JMeter to simulate 1000+ concurrent orders for scalability testing.

## 🔥 Future Enhancements
- 🚀 AI-based Food Recommendations – Suggest dishes based on order history.
- 📡 GPS-Based Real-Time Tracking – Live delivery tracking using Google Maps API.
- 💰 Multiple Payment Gateway Support – Stripe, PayPal, Razorpay integration.
- 📊 Advanced Business Analytics – Custom insights using Power BI/Tableau.



![image](https://github.com/user-attachments/assets/4ead9eda-7937-4c85-927e-a7015f079801)
