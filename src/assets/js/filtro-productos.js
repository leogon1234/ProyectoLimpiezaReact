document.addEventListener('DOMContentLoaded', function() {
    const selectFiltro = document.getElementById('filtroProductos');
    const productItems = document.querySelectorAll('[data-category]');

   
    selectFiltro.addEventListener('change', function() {
        const filterValue = this.value;
        
        productItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'todos' || category === filterValue) {
                item.style.display = '';
               
                item.closest('.col-md-4').style.display = '';
            } else {
                item.style.display = 'none';
                
                item.closest('.col-md-4').style.display = 'none';
            }
        });
    });
});
