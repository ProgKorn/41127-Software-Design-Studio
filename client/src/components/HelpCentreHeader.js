import React from "react";
import ResponsiveAppBar from "./NavBar";

export default function helpCentreHeader() {
  const helpCentreRoutes = {
    Home: '/',
    signIn: '/login',
    ContactUs: 'https://www.uts.edu.au/current-students/support',
  }

  return (
    <div>
      <ResponsiveAppBar routes={helpCentreRoutes} type='helpCentre'/>
    </div>
  );
}