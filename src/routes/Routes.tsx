import { Route, Routes } from "react-router-dom";
import { TicketsForm } from "../pages/TicketsForm/TicketsForm";
import { AdminTickets } from "../pages/Administrator/AdminTickets";
import { Login } from "../pages/Auth/Login";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TicketsForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/administrador" element={<AdminTickets />} />
    </Routes>
  );
};
