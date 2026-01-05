fetch('/api/users')
.then(r=>r.json())
.then(data=>{
  const t=document.getElementById('list');
  data.forEach(u=>{
    const r=document.createElement('tr');
    r.innerHTML=`<td>${u.name}</td>`;
    t.appendChild(r);
  });
});