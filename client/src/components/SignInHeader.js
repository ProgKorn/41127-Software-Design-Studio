import React from "react";
import ResponsiveAppBar from "./NavBar";

export default function signInHeader() {
  const signInRoutes = {
    Home: '/',
    HelpCentre: '/helpcentre',
    ContactUs: 'https://www.uts.edu.au/current-students/support',
  }

  return (
    <div>
      <ResponsiveAppBar routes={signInRoutes} type='signIn'/>
    </div>
  );
}