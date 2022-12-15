import React from 'react';
import './Footer.css';
import HouseIcon from '@mui/icons-material/House';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import CoPresentIcon from '@mui/icons-material/CoPresent';



function Footer() {
  return (
    <div>
      <div className="footer-container">

        <div className="footer-section-container">
          <h2>Acerca de nosotros</h2>
          <div className='iconfoot-container'>
            <HouseIcon sx={{ fontSize: 30 }} />
          </div>

        </div>

        <div className="footer-section-container">
          <h2>Términos y condiciones</h2>
          <div className='iconfoot-container'>
            <AccessibilityIcon sx={{ fontSize: 30 }} />
          </div>

        </div>

        <div className="footer-section-container">
          <h2>Accessibilidad</h2>
          <div className='iconfoot-container'>
            <CoPresentIcon sx={{ fontSize: 30 }} />
          </div>

        </div>

        

      </div>
      <div className='footer-lineseparator'></div>
      <footer className='footer-dir'>
          <h5>Quito-Ecuador</h5>
          <h5>Derechos reservados © 2022</h5>
      </footer>
    </div>
  )
}

export default Footer