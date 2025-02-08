const btn_pomodoro = document.getElementById("btn_pomodoro");
const btn_pausa_curta = document.getElementById("btn_pausa_curta");
const btn_pausa_longa = document.getElementById("btn_pausa_longa");
const btn_comecar = document.getElementById("btn_comecar");

const time_pomodoro = document.getElementById("time_pomodoro");

const input_tarefa = document.getElementById("input_tarefa");
const btn_adicionar = document.getElementById("btn_adicionar");

const lista = document.getElementById("lista");

let time_atual = null
let timer = 1500000
let horario_pomodoro = null;
let minutos_pomodoro = null;
let segundos_pomodoro = null;
let pode_cronometrar = true;

// const MudarBotaoComecar = () => {
//     btn_comecar.innerHTML = "Pausar";
//     btn_comecar.style.backgroundColor = "red";

//     btn_comecar.addEventListener("click", (evt) => {
//         pode_cronometrar = false;
//     })
// }

let lista_tarefas = [];

const TirarSelecao = () => {
    const btn_selecionado = [...document.querySelectorAll(".btn_selecionado")];
    btn_selecionado.map((btn) => {
        btn.classList.remove("btn_selecionado");
    })
}

const RemoverTarefa = (quem) => {
    lista_tarefas = lista_tarefas.filter((el) => {
        return el != quem;
    })

    
}

const AdicionarTarefa = () => {
    
    console.log(lista_tarefas);
    lista.innerHTML = "";
    lista_tarefas.forEach((t,i) => {
        i++;

        const div = document.createElement("div");
        const btn_remover = document.createElement("button");

        div.setAttribute("data-nome", t);
        div.innerHTML = `<p>${i}. ${t}</p>`;

        btn_remover.innerHTML = "Remover";
        btn_remover.addEventListener("click", (evt) => {
            let quemQueroRemover = evt.target.parentNode.dataset.nome;
            

            RemoverTarefa(quemQueroRemover);

            AdicionarTarefa();

        })

        div.appendChild(btn_remover);
        lista.appendChild(div);

    })

    input_tarefa.value = "";
}


btn_pomodoro.addEventListener("click", (evt) => {

    btn_comecar.innerHTML = "Começar";
    btn_comecar.style.backgroundColor = "#5790AB";
    pode_cronometrar = false;
    timer = 1500000;
    horario_pomodoro = new Date(timer)
    minutos_pomodoro = horario_pomodoro.getMinutes() < 10 ? "0" + horario_pomodoro.getMinutes() : horario_pomodoro.getMinutes();
    segundos_pomodoro = horario_pomodoro.getSeconds() < 10 ? "0" + horario_pomodoro.getSeconds() : horario_pomodoro.getSeconds();
    time_pomodoro.innerHTML = minutos_pomodoro + ":" + segundos_pomodoro;

    TirarSelecao();
    evt.target.classList.toggle("btn_selecionado");
    
})

btn_pausa_curta.addEventListener("click", (evt) => {

    btn_comecar.innerHTML = "Começar";
    btn_comecar.style.backgroundColor = "#5790AB";
    pode_cronometrar = false;
    timer = 300000;
    horario_pomodoro = new Date(timer)
    minutos_pomodoro = horario_pomodoro.getMinutes() < 10 ? "0" + horario_pomodoro.getMinutes() : horario_pomodoro.getMinutes();
    segundos_pomodoro = horario_pomodoro.getSeconds() < 10 ? "0" + horario_pomodoro.getSeconds() : horario_pomodoro.getSeconds();
    time_pomodoro.innerHTML = minutos_pomodoro + ":" + segundos_pomodoro;
    TirarSelecao();
    evt.target.classList.toggle("btn_selecionado");
})


btn_pausa_longa.addEventListener("click", (evt) => {

    btn_comecar.innerHTML = "Começar";
    btn_comecar.style.backgroundColor = "#5790AB";
    pode_cronometrar = false;
    timer = 1800000;
    horario_pomodoro = new Date(timer)
    minutos_pomodoro = horario_pomodoro.getMinutes() < 10 ? "0" + horario_pomodoro.getMinutes() : horario_pomodoro.getMinutes();
    segundos_pomodoro = horario_pomodoro.getSeconds() < 10 ? "0" + horario_pomodoro.getSeconds() : horario_pomodoro.getSeconds();
    time_pomodoro.innerHTML = minutos_pomodoro + ":" + segundos_pomodoro;
    TirarSelecao();
    evt.target.classList.toggle("btn_selecionado");
})


btn_comecar.addEventListener("click", (evt) => {
    pode_cronometrar = true
    time_Inicial = Date.now();
    let cronometro = () => {
        if (pode_cronometrar == true) {
            time_atual = Date.now();
            let horario_final = time_Inicial + timer;
            let timer_cronometro = horario_final - time_atual;
            if (timer_cronometro > 10) {
                let timer_atual_cronometro = new Date(timer_cronometro);
                minutos_pomodoro = timer_atual_cronometro.getMinutes() < 10 ? "0" + timer_atual_cronometro.getMinutes() : timer_atual_cronometro.getMinutes();
                segundos_pomodoro = timer_atual_cronometro.getSeconds() < 10 ? "0" + timer_atual_cronometro.getSeconds() : timer_atual_cronometro.getSeconds();
                time_pomodoro.innerHTML = minutos_pomodoro + ":" + segundos_pomodoro;

                // MudarBotaoComecar();

            } else {
                pode_cronometrar = false;

                // time_Inicial = Date.now();
                // time_atual = Date.now();
                // horario_final = time_Inicial + timer;
                // timer_cronometro = horario_final - time_atual;
                // timer_atual_cronometro = new Date(timer_cronometro);
                // minutos_pomodoro = timer_atual_cronometro.getMinutes() < 10 ? "0" + timer_atual_cronometro.getMinutes() : timer_atual_cronometro.getMinutes();
                // segundos_pomodoro = timer_atual_cronometro.getSeconds() < 10 ? "0" + timer_atual_cronometro.getSeconds() : timer_atual_cronometro.getSeconds();
                // time_pomodoro.innerHTML = minutos_pomodoro + ":" + segundos_pomodoro;
            }

           
        } else {
            clearInterval(contar); 
        }
    }

    //diminuir o tempo é uma solução temporaria!
    let contar = setInterval(cronometro, 50);

    
    
})


btn_adicionar.addEventListener("click", (evt) => {
    lista_tarefas.push(input_tarefa.value);
    AdicionarTarefa();
})




