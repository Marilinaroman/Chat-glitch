console.log('conectado');

const socketCliente = io();

let user 

Swal.fire({
    title: 'Bienvenido/a',
    text:'Ingrese su Nick',
    input:'text',
    allowOutsideClick: false,
}).then(res=>{
    user=res.value
})

const campo = document.getElementById('msj')
const historia = document.getElementById('historiaMsj')
let elementos = ""



campo.addEventListener('keydown',(e)=>{

    if(e.key==='Enter'){
        socketCliente.emit('message',{
            userName: user,
            message: campo.value,
        })
    }
})

//recibe el msj de todos los clientes
socketCliente.on('historico',(data)=>{
    console.log(data);
    data.forEach(text => {
        elementos = elementos + `<p><strong>${text.userName}</strong>: ${text.message}`
        
    });
    historia.innerHTML = elementos
})

//informa nuevo user conectado
socketCliente.on('newUser',()=>{
    Swal.fire({
        title:'Nuevo usuario conectado',
        toas:true
    })
})