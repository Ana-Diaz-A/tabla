const transactions = [
    {
        src: 'img/perfil1.jpg',
        name: 'Javier Prieto',
        alias: '@javier',
        amount: '1,000€',
        email: 'javier@example.com',
        status: 'completado',
        date: '2023-10-20T16:12:00Z',
    },
    {
        src: 'img/perfil2.jpg',
        name: 'Laura Vera',
        alias: '@laura',
        amount: '1,200€',
        email: 'laura.vera@example.com',
        date: '2023-10-22T13:12:00Z',
        status: 'error',
    },
    {
        src: 'img/perfil3.jpg',
        name: 'Enrique Cano',
        amount: '8,300€',
        email: 'enrique.cano@example.com',
        status: 'completado',
        date: '2023-10-22T18:12:00Z',
    },
    {
        src: 'img/perfil4.jpg',
        name: 'David Rodriguez',
        amount: '1,750€',
        email: 'david@example.com',
        status: 'error',
        date: '2023-10-22T22:05:00Z',
    },
    {
        name: 'Juan Barroso',
        amount: '220€',
        src: 'img/perfil5.jpg',
        email: 'juan@example.com',
        status: 'pendiente',
        date: '2023-10-24T19:05:00Z',
    },
    {
        name: 'Antonio Sanchez',
        amount: '700€',
        src: 'img/perfil6.jpg',
        email: 'antonio.sanchez@example.com',
        status: 'completado',
        date: '2023-10-25T22:05:00Z',
    },
    {
        src: 'img/perfil7.jpg',
        amount: '6000€',
        name: 'Fernando Arias',
        email: 'fernando@example.com',
        date: '2023-10-26T23:05:00Z',
        status: 'error',
    },
    {
        name: 'Sergio Ramos',
        amount: '650€',
        src: 'img/perfil8.jpg',
        email: 'sergio@example.com',
        status: 'completado',
        date: '2023-10-29T20:05:00Z',
    },
    {
        src: 'img/perfil9.jpg',
        amount: '300€',
        name: 'Eduardo Flores',
        email: 'Eduardo@example.com',
        date: '2023-10-30T22:05:00Z',
        status: 'completado',
    },
    {
        src: 'img/perfil10.jpg',
        amount: '800€',
        name: 'Tomás Santos',
        email: 'tomas@example.com',
        date: '2023-11-28T23:05:00Z',
        status: 'completado',
    },
];

const tableWidget = document.getElementsByClassName('table-widget'); //almacena todos los elementos del documento HTML que tienen la clase 'table-widget'

const itemsOnPage = 5;

const numberOfPages = Math.ceil(transactions.length / itemsOnPage); //calcula el número de páginas necesarias para mostrar todas las transacciones (dividiendo la longitud del arreglo transactions entre el número de elementos por página (itemsOnPage) y redondeando hacia arriba)

const start = (new URLSearchParams(window.location.search)).get('page') || 1; //asigna el valor del parámetro 'page' en la URL actual, si no se encuentra el parámetro se asigna el valor 1

const mappedRecords = transactions
    .filter((_, i) => (
        ((start - 1) * itemsOnPage) < i + 1) && 
        (i+1 <= start * itemsOnPage)
    )
    .map(
        (teamMember) => {
            // Se genera una cadena de texto que representa una fila de una tabla HTML
            return `<tr>
                <td class="team-member-profile">
                    <img
                        src="${teamMember.src}"
                        alt="${teamMember.name}"
                    >
                    <span class="profile-info">
                        <span class="profile-info__name">
                            ${teamMember.name}
                        </span>
                        <span class=profile-info__alias>
                            ${teamMember.email}
                        </span>
                    </span>
                </td>
                <td>
                    ${teamMember.amount}
                </td>
                <td>
                    <span
                        class="status status--${teamMember.status}"
                    >
                        ${teamMember.status}
                    </span>
                </td>
                <td>
                    ${new Date(teamMember.date).toLocaleDateString('es-ES', 
                        {
                            'weekday': 'short',
                            'year': 'numeric', 
                            'month': 'short', 
                            'day': 'numeric',
                            'hour': 'numeric',
                            'minute': 'numeric',
                        }
                    )}
                </td>
            </tr>`;
        }
    );


const linkList = []; //declara una constante llamada linkList e inicializa su valor como un arreglo vacío

for (let i = 0; i < numberOfPages; i++) {
    // Se declara una variable pageNumber que almacena el número de página actual
    const pageNumber = i + 1;
    // Se agrega un elemento a la lista linkList utilizando el método push()
    linkList.push(
        `<li>
            <a
                href="?page=${pageNumber}" 
                ${pageNumber == start ? 'class="active"' : ''} 
                title="page ${pageNumber}">
                ${pageNumber}
            </a>
        </li>`
    );
}

//crea una tabla HTML dinámica con contenido generado a partir de las variables "mappedRecords" y "linkList", 
//y asegura que el contenido HTML sea seguro antes de ser insertado en el documento
const table = DOMPurify.sanitize(`<table>
    <caption>
        Transacciones
        <span class="table-row-count">(${transactions.length})</span>
    </caption> 
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Procesada</th>
        </tr>
    </thead>
    <tbody id="table-rows">
        ${mappedRecords.join('')}
    </tbody>
    <tfoot>
        <tr>
            <td colspan="4">
                <ul class="pagination">
                    <!--? generated pages -->
                    ${linkList.join('')}
                </ul>
            </td>
        </tr>
    </tfoot>
</table>`);

tableWidget[0].innerHTML = table; //actualiza el contenido de un elemento HTML en la página web con el contenido de la variable table.
                                  //El elemento HTML que se actualiza se encuentra en la posición 0 del arreglo tableWidget.