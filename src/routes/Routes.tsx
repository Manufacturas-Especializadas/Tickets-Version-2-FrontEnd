import { Route, Routes } from "react-router-dom";
import { TicketsForm } from "../pages/TicketsForm/TicketsForm";
import { AdminTickets } from "../pages/Administrator/AdminTickets";
import { Login } from "../pages/Auth/Login";
import { ProtectedRoute } from "../components/Auth/ProtectedRoute";
import { TicketTracking } from "../pages/TicketTracking/TicketTracking";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TicketsForm />} />
      <Route path="/seguimiento" element={<TicketTracking />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/administrador" element={<AdminTickets />} />
      </Route>
    </Routes>
  );
};
