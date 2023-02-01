import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function HelpInformation() {

  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  return (
    <div style={{marginTop: '5%', marginLeft: '5%', marginRight: '5%'}}>
      <Typography variant="h2" gutterBottom component="div" align='center'>
        Ayuda para el usuario
      </Typography>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Como hacer una suscripción</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Para poder realizar tu suscripción primero tienes que crear un producto, si quieres hacerlo
            haz click en el botón "Crear tu producto"
          </Typography>
          <Button variant="contained" color="primary" size="small" sx={{ ml: 1 }} onClick={() => navigate('/CreateProduct')}>
            Crear tu producto
          </Button>
          <Divider sx={{ my: 2 }} />
          <Typography>
            Si ya tienes un producto creado, puedes suscribirlo, haciendo click en el botón "Mis productos"
          </Typography>
          <Button variant="contained" color="primary" size="small" sx={{ ml: 1 }} onClick={() => navigate('/productlist')}>
            Mis productos
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Contáctanos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Puedes comunicarnos cualquier duda o sugerencia a través de nuestro correo electrónico 
            <br/>
            <strong>eduardo.muzo@epn.edu.ec</strong>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default HelpInformation