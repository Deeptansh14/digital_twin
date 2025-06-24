# Digital Twin of an Academic Block

A full-stack web application built using the **MERN stack** and integrated with an **LSTM-based forecasting model** to enable **real-time control** and **energy optimization** for an academic block's appliances.

## Project Overview

This project simulates a **Digital Twin** of a physical academic block, allowing remote monitoring and intelligent control of appliances like lights, fans, and air conditioners via a web interface. The system uses **historical energy usage data** and **LSTM models** to forecast future consumption and optimize energy efficiency.

##  Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Machine Learning:** Python (LSTM using Keras/TensorFlow)
- **Others:** REST APIs, Socket.io for real-time updates

##  Key Features

- 🌐 **Web Dashboard:** Real-time status and control of devices across different rooms/zones.
- 🔄 **Manual & Auto Modes:** Users can toggle between direct control or intelligent auto-optimization.
- 📉 **Energy Forecasting:** LSTM model achieves **85% accuracy** in predicting usage trends.
- ❄️ **AC Temperature Optimization:** Forecast-based adjustment of AC setpoints to balance comfort and efficiency.
- 💡 **Energy Savings:** Projected energy consumption reduced by up to **10%** through optimized usage patterns.

##  LSTM Forecasting Model

The LSTM model was trained on historical appliance usage and energy consumption data. It forecasts:
- Hourly/daily energy demand
- Optimal AC temperature settings based on occupancy patterns and usage history
