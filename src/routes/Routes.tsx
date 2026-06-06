import { Route, Routes } from "react-router-dom";
import { TicketsForm } from "../pages/TicketsForm/TicketsForm";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TicketsForm />} />
    </Routes>
  );
};
