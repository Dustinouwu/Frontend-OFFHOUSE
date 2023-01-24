import React from 'react';
import './Footer.css';
import HouseIcon from '@mui/icons-material/House';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import CoPresentIcon from '@mui/icons-material/CoPresent';



function Footer() {
  return (
    <div className='footercatch' style={{marginTop: '5%'}}>
      
      <div className='footer-lineseparator'></div>
      <footer className='footer-dir'>
          <h5>Quito-Ecuador</h5>
          <h5>Derechos reservados © 2023</h5>
      </footer>
    </div>
  )
}

export default Footer