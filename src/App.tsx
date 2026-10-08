import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CurrencyCode } from './types/finance';
import { ToastProvider } from './components/Toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('INR');

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Homepage Route */}
            <Route
              path="/"
              element={
                <HomePage
                  currentCurrency={currentCurrency}
                  onCurrencyChange={setCurrentCurrency}
                />
              }
            />

            {/* Authenticated Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage
                    currentCurrency={currentCurrency}
                    onCurrencyChange={setCurrentCurrency}
                  />
                </ProtectedRoute>
              }
            />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
