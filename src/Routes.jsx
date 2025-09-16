import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EmployerDashboardCandidateSearch from './pages/employer-dashboard-candidate-search';
import AuthenticationWalletConnection from './pages/authentication-wallet-connection';
import InstitutionDashboard from './pages/institution-dashboard';
import CredentialUploadVerification from './pages/credential-upload-verification';
import CredentialVerificationAuditTrail from './pages/credential-verification-audit-trail';
import StudentDashboard from './pages/student-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationWalletConnection />} />
        <Route path="/employer-dashboard-candidate-search" element={<EmployerDashboardCandidateSearch />} />
        <Route path="/authentication-wallet-connection" element={<AuthenticationWalletConnection />} />
        <Route path="/institution-dashboard" element={<InstitutionDashboard />} />
        <Route path="/credential-upload-verification" element={<CredentialUploadVerification />} />
        <Route path="/credential-verification-audit-trail" element={<CredentialVerificationAuditTrail />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
