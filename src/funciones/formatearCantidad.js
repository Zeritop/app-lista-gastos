const formatearCantidad = (cantidad) => {
    return new Intl.NumberFormat(
        'es-CL',
        {
            style: 'currency',
            currency: 'CLP'
        }
    ).format(cantidad);
}

export default formatearCantidad;