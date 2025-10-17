document.addEventListener('DOMContentLoaded', function() {
    const selectFiltro = document.getElementById('filtroProductos');
    const productItems = document.querySelectorAll('[data-category]');

    // Añadir evento change al select
    selectFiltro.addEventListener('change', function() {
        const filterValue = this.value;
        
        productItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'todos' || category === filterValue) {
                item.style.display = '';
                // Asegurar que el padre (col-md-4) también sea visible
                item.closest('.col-md-4').style.display = '';
            } else {
                item.style.display = 'none';
                // Ocultar también el padre (col-md-4)
                item.closest('.col-md-4').style.display = 'none';
            }
        });
    });
});
