const countElement = document.getElementById('count');
const apiContainer = document.getElementById('api-container');
const cardModal = document.getElementById('card');
const pdetails = document.getElementById('pdetails');
const author = document.getElementById('author');
const date = document.getElementById('date');
const description = document.getElementById('description');
const nme = document.getElementById('name');
const priority = document.getElementById('priority');
const allbtn = document.getElementById('allbtn');
const openbtn = document.getElementById('openbtn');
const closedbtn = document.getElementById('closedbtn');
const label1 = document.getElementById('label1');
const label2 = document.getElementById('label2');
let allprojects = []; 
const loadprojects = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
    allprojects = data.data;
    displayProjects(allprojects);
};

function getBadgeClass(label) {
    label = label.toLowerCase();
    if (label === 'bug') return 'badge-error';
    if (label === 'help wanted') return 'badge-warning';
    if (label === 'enhancement') return 'badge-success';

    return 'badge-info';
}

const displayProjects = (projects) => {

    apiContainer.innerHTML = '';
    countElement.innerText = `${projects.length} issues`;

    projects.forEach(project => {

        const div = document.createElement('div');

        div.className = 'p-1 rounded-lg shadow-lg mb-5';

        div.innerHTML = `
        <div class="card-body flex gap-2">

            <div class="flex justify-between items-center">
                <img src="${project.status.toLowerCase() === 'open' 
                ? './assets/Open-Status.png' 
                : './assets/Closed-Status.png'}">

                ${project.priority === 'high'
                ? '<div class="badge badge-soft badge-success">High</div>'
                : project.priority === 'medium'
                ? '<div class="badge badge-soft badge-warning">Medium</div>'
                : '<div class="badge badge-soft badge-error">Low</div>'}
            </div>

            <h2 onclick="toggleModal(${project.id})" 
            class="text-lg font-bold cursor-pointer">
            ${project.title}
            </h2>

            <p>${project.description}</p>

            <div class="flex gap-2">

            ${project.labels.map(label => `
                <span class=" badge ${getBadgeClass(label)}">
                ${label}
                </span>
            `).join('')}

            </div>

            <hr class="my-2">

            <div class="text-sm text-gray-600">
                <p>#${project.id} by ${project.author}</p>
                <p>Created on: ${new Date(project.createdAt).toLocaleDateString()}</p>
            </div>

        </div>
        `;

        apiContainer.appendChild(div);
    });
};

const selectcategory = (type) => {
    let filteredProjects = [];
    let buttons = [allbtn, openbtn, closedbtn];
    buttons.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-soft');
    });
    if (type==='allbtn') {
        filteredProjects = allprojects;
        allbtn.classList.add('btn-primary');
        allbtn.classList.remove('btn-soft');
    } 
    else if (type === 'openbtn') {
        filteredProjects = allprojects.filter(p=>p.status==='open');
        openbtn.classList.add('btn-primary');
        openbtn.classList.remove('btn-soft');
    }
     else if (type ==='closedbtn') {
        filteredProjects = allprojects.filter(p => p.status === 'closed');
        closedbtn.classList.add('btn-primary');
        closedbtn.classList.remove('btn-soft');
    }

    displayProjects(filteredProjects);
};

async function toggleModal(id) {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const project = await res.json();
    const detail = project.data;

    pdetails.innerText = `#${detail.id} ${detail.title}`;
    author.innerText = `${detail.status} by ${detail.author}`;
    date.innerText = `${new Date(detail.createdAt).toLocaleDateString()}`;

    if (detail.labels[0]) {
        label1.innerText = detail.labels[0];
        label1.className = `badge ${getBadgeClass(detail.labels[0])}`;
    }

    if (detail.labels[1]) {
        label2.innerText = detail.labels[1];
        label2.className = `badge ${getBadgeClass(detail.labels[1])}`;
    }
    description.innerText = detail.description;

    nme.innerText = detail.assignee || "Unassigned";

    priority.innerText = detail.priority;

    cardModal.showModal();
}

function closeModal() {
    cardModal.close();
}

document.getElementById('inpbtn').addEventListener('click', check);
async function check() {
    const searchTerm = document.getElementById('inpval').value.toLowerCase().trim();
   const srch = fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues?search=${searchTerm}`)
   const res = await srch;
   const data = await res.json();
   const searchResults = data.data;
   const searchfiltered = searchResults.filter(result =>result.title.toLowerCase().includes(searchTerm) || result.description.toLowerCase().includes(searchTerm));
   displayProjects(searchfiltered);

}

loadprojects();