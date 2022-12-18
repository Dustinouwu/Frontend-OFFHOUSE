import React from 'react'
import './Form.css'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

/* VALIDACIÓN DE SOLO NÚMEROS CAPO PRECIO */
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(#00) 000-0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite

        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}

            thousandSeparator
            isNumericString
            prefix="$"

        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function Form() {

    const [values, setValues] = React.useState({
        textmask: '(100) 000-0000',
        numberformat: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className='formproduct-container' >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className='formproduct'>
                    <h1 id='labelhelp'>SUBE EL PRODUCTO QUE QUIERAS VENDER</h1>
                    <div>
                        <TextField
                            id="outlined-number"
                            label="Nombre Producto"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-number"
                            label="Marca"
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <div>
                        <TextField
                            id="outlined-number"
                            label="Stock"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-number"
                            label="Estado del producto"
                            select
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </div>


                    <FormControl fullWidth sx={{ mr: 2, maxWidth: 435 }}>
                        <TextField

                            label="Precio"

                            value={values.numberformat}
                            onChange={handleChange}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}

                        />
                    </FormControl>
                    <input
                        type='file'
                    >
                    </input>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>


                    <TextField
                        id="outlined-multiline-static"
                        label="Descripción"
                        multiline
                        rows={6}


                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                        <Button variant="contained">SUBIR PRODUCTO</Button>
                    </div>






                </div>



            </Box>
        </div>
    )
}

export default Form