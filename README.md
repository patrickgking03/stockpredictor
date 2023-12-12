# Stock Predictor Web Application

## Overview
The Stock Predictor is a web application designed to provide predictions on stock prices. This application allows users to input a stock symbol and receive a prediction based on historical data and analysis.

## Features
- Input field for stock symbols.
- Button to request stock predictions.
- Display area for showing prediction results.

## Technologies Used
- **Front-end:**
  - HTML: For structuring the web page.
  - CSS: For styling the web page.
  - JavaScript: For handling user interactions and asynchronous requests.
  - jQuery: JavaScript library for simplifying DOM manipulation and AJAX requests.
  - jQuery UI: For the autocomplete feature.
  - Chart.js: For creating interactive charts to display stock price history.

- **Back-end:**
  - Python (Flask): For server-side logic and handling API requests.
  - Flask: A lightweight WSGI web application framework in Python.
  - Requests: For making HTTP requests to external APIs.
  - yfinance: For fetching historical stock data and making price predictions.
  - scikit-learn: For machine learning-based stock price predictions.

## Setup and Running the Application
1. Ensure Python and Flask are installed.
2. Run `main.py` to start the Flask server.
3. Access the application via a web browser at `localhost:5000`.

## Created By
Patrick King

## Date Created
December 11, 2023