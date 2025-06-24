
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListingDetail from "./component/ListingDetails";
import ListingGrid from "./component/ListingGrid";
import Login from "./component/Login";
import Register from "./component/Register";
import BookingPage from "./component/Bookingpage";
import HostDashboard from "./component/Hostdashboard";
import CreateListing from "./component/CreateListing";
import EditListing from "./component/EditListing";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingGrid />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/Register" element = {<Register/>}/>
        <Route path="/book/:listingId" element={<BookingPage />} />
        <Route path="/host/dashboard" element={<HostDashboard/>}/>
        <Route path="/host/create-listing" element={<CreateListing />} />
<Route path="host/edit-listing/:id" element={<EditListing />} />


      </Routes>
    </Router>
  );
}

export default App;
