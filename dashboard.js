const loadprojects = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
    const res = await fetch(url);
    const data = await res.json();
    displayProjects(data.data);
}


const displayProjects = (projects) => {
    const apiContainer=document.getElementById('api-container');
    apiContainer.innerHTML='';

    projects.forEach(project => {
        const div = document.createElement('div');
        div.className='p-1 rounded-lg shadow-lg mb-5';

        div.innerHTML = `
            <div class="card-body flex flex-col gap-2">
                <div class="flex justify-between items-center">
                  <img src="${project.status.toLowerCase() === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}">
                    ${project.priority === 'high' ? 
                        '<div class="badge badge-soft badge-success">High</div>' :
                     project.priority === 'medium' ? 
                        '<div class="badge badge-soft badge-warning">Medium</div>' :
                        '<div class="badge badge-soft badge-error">Low</div>'
                    }
                </div>
                <h2 class="text-lg font-bold">${project.title}</h2>
                <p>${project.description}</p>
                <div class="flex gap-2">
                    ${project.labels.map(label => 
                        `<span class="badge ${
                            label.toLowerCase() === 'bug' ? 'badge-error' :
                            label.toLowerCase() === 'help wanted' ? 'badge-warning' :
                            label.toLowerCase() === 'enhancement' ? 'badge-success' :
                            'badge-info'
                        }">${label}</span>`
                    ).join('')}
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
}

loadprojects();