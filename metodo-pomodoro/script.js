const btn_pomodoro = document.getElementById("btn_pomodoro"); //botao que seta o time para 25min
const btn_pausa_curta = document.getElementById("btn_pausa_curta"); //botao que seta o time para 5min
const btn_pausa_longa = document.getElementById("btn_pausa_longa"); //botao que seta o time para 30min
const btn_comecar = document.getElementById("btn_comecar"); //botao que começa a contar o tempo

const time_pomodoro = document.getElementById("time_pomodoro"); //H1 que exibe o Tempo na Tela

const input_tarefa = document.getElementById("input_tarefa"); //Input que recebe a Tarefa
const btn_adicionar = document.getElementById("btn_adicionar"); //botao que adiciona a Tarefa

const div_btns_tempo = document.getElementById("div_btns_tempo"); //Área da Lista, onde serão mostradas as Tarefas
const lista = document.getElementById("lista"); //Área da Lista, onde serão mostradas as Tarefas

let time_atual = null //variavel do tempo atual, que só será atribuido valor quando começar a contagem do tempo
let timer = 1500000 //valor inical do tempo em Milissengundos (25min)
let horario_pomodoro = null; //variavel que armazena o valor do tempo colocado ao inicar a contagem (em milissegundos), que só será atribuido valor quando começar a contagem do tempo
let minutos_pomodoro = null; //variavel que armazena o tempo em minutos, que só será atribuido valor quando começar a contagem do tempo;
let segundos_pomodoro = null; //variavel que armazena o tempo em segundos, que só será atribuido valor quando começar a contagem do tempo;
let pode_cronometrar = true; //variavel booleana que retorna se ao clicar no botão começar, realmente pode começar a cronomertrar
let cronometrando = false;
let time_quando_pausou = null;



let lista_tarefas = []; //Array que contem todas as tarefas, Começa Vazio!


//Função que remove a class btn_selecionado de todos os Botões
const TirarSelecao = () => {
    const btn_selecionado = [...document.querySelectorAll(".btn_selecionado")];
    btn_selecionado.map((btn) => {
        btn.classList.remove("btn_selecionado");
    })
}

const btn_pausar = document.createElement("btn");
const btn_retomar = document.createElement("btn");
let ConfigBtnPausar = () => {
    if(cronometrando == true) {
        
        btn_pausar.setAttribute("class", "btn_pausar");
        btn_pausar.innerHTML = "Pausar";
        div_btns_tempo.appendChild(btn_pausar);
    } else {
        btn_pausar.classList.remove("btn_pausar");
        btn_pausar.innerHTML = "";
        btn_retomar.classList.remove("btn_retomar");
        btn_retomar.innerHTML = "";
    }
}


//Evento Configura o tempo para 25min e a confirmação de contagem de tempo quando clica no botão começar
btn_pomodoro.addEventListener("click", (evt) => {

    // btn_comecar.innerHTML = "Começar";
    // btn_comecar.style.backgroundColor = "#5790AB";
    cronometrando = false;
    ConfigBtnPausar();
    pode_cronometrar = false;
    timer = 1500000;
    horario_pomodoro = new Date(timer)
    minutos_pomodoro = horario_pomodoro.getMinutes() < 10 ? "0" + horario_pomodoro.getMinutes() : horario_pomodoro.getMinutes();
    segundos_pomodoro = horario_pomodoro.getSeconds() < 10 ? "0" + horario_pomodoro.getSeconds() : horario_pomodoro.getSeconds();
    time_pomodoro.innerHTML = minutos_pomodoro + ":" + segundos_pomodoro;

    TirarSelecao();
    evt.target.classList.toggle("btn_selecionado");
    
})

//Evento Configura o tempo para 5min e a confirmação de contagem de tempo quando clica no botão começar
btn_pausa_curta.addEventListener("click", (evt) => {

    // btn_comecar.innerHTML = "Começar";
    // btn_comecar.style.backgroundColor = "#5790AB";
    cronometrando = false;
    ConfigBtnPausar();
    pode_cronometrar = false;
    timer = 300000;
    horario_pomodoro = new Date(timer)
    minutos_pomodoro = horario_pomodoro.getMinutes() < 10 ? "0" + horario_pomodoro.getMinutes() : horario_pomodoro.getMinutes();
    segundos_pomodoro = horario_pomodoro.getSeconds() < 10 ? "0" + horario_pomodoro.getSeconds() : horario_pomodoro.getSeconds();
    time_pomodoro.innerHTML = minutos_pomodoro + ":" + segundos_pomodoro;
    TirarSelecao();
    evt.target.classList.toggle("btn_selecionado");
})

//Evento Configura o tempo para 30min e a confirmação de contagem de tempo quando clica no botão começar
btn_pausa_longa.addEventListener("click", (evt) => {

    // btn_comecar.innerHTML = "Começar";
    // btn_comecar.style.backgroundColor = "#5790AB";
    cronometrando = false;
    ConfigBtnPausar();
    pode_cronometrar = false;
    timer = 1800000;
    horario_pomodoro = new Date(timer)
    minutos_pomodoro = horario_pomodoro.getMinutes() < 10 ? "0" + horario_pomodoro.getMinutes() : horario_pomodoro.getMinutes();
    segundos_pomodoro = horario_pomodoro.getSeconds() < 10 ? "0" + horario_pomodoro.getSeconds() : horario_pomodoro.getSeconds();
    time_pomodoro.innerHTML = minutos_pomodoro + ":" + segundos_pomodoro;
    TirarSelecao();
    evt.target.classList.toggle("btn_selecionado");
})


//Evento que começa a contagem do tempo quando clica no botão começar
btn_comecar.addEventListener("click", (evt) => {
    

    pode_cronometrar = true
    time_Inicial = Date.now();
    cronometrando = true;

    ConfigBtnPausar();

    let acumulator = [0];
    let time_pausa_acumulado = acumulator.reduce((valorAcumulado, elementoAtual) => {
        return valorAcumulado + elementoAtual;
    }, 0);

    
            
    let cronometro = () => {
        if (pode_cronometrar == true) {
            cronometrando = true;
            time_atual = Date.now();
            let time_pausa_acumulado = acumulator.reduce((valorAcumulado, elementoAtual) => {
                return valorAcumulado + elementoAtual;
              }, 0);
              
            
            let horario_final = time_Inicial + timer;

            let timer_cronometro = horario_final + time_pausa_acumulado - time_atual; //10 - 3 = 7 //10 + (6 -3) -6 = 7 //10 - 8 = 6
                            
        
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

    
    
    // btn_pausar.setAttribute("class", "btn_pausar");
    // btn_pausar.innerHTML = "Pausar";
    // div_btns_tempo.appendChild(btn_pausar);

    btn_pausar.addEventListener("click", (evt) => {
        cronometrando = false;
        clearInterval(contar);
        time_quando_pausou = Date.now();
        
        

        btn_pausar.classList.remove("btn_pausar");
        btn_pausar.innerHTML = "";

        btn_retomar.setAttribute("class", "btn_retomar");
        btn_retomar.innerHTML = "Retomar";
        console.log("aaaaaa");

        
                    
    
        div_btns_tempo.appendChild(btn_retomar);
        
    
    });

    btn_retomar.addEventListener("click", (evt) => {
            
        time_pausa = Date.now() - time_quando_pausou;
        acumulator.push(time_pausa);
        cronometrando = true;
        contar = setInterval(cronometro, 50);

        btn_retomar.classList.remove("btn_retomar");
        btn_retomar.innerHTML = "";

        btn_pausar.setAttribute("class", "btn_pausar");
        btn_pausar.innerHTML = "Pausar";

    
        
                    
    
        div_btns_tempo.appendChild(btn_pausar);
        
    
    });

    

    

    
    
})







//Evento que ao clicar no icone de adicionar tarefa, adiciona uma nova tarefa ao array de tarefas
btn_adicionar.addEventListener("click", (evt) => {
    lista_tarefas.push(input_tarefa.value);
    AdicionarTarefa();
})


//Função que remove uma tarefa Específica
const RemoverTarefa = (quem) => {
    lista_tarefas = lista_tarefas.filter((el) => {
        return el != quem;
    })

    
}

//Função que Adiciona as tarefas do array na tela
const AdicionarTarefa = () => {
    
    lista.innerHTML = "";
    lista_tarefas.forEach((t,i) => {
        i++;

        const div = document.createElement("div");
        const icon_remover = document.createElement("img");

        div.setAttribute("class", "item-lista");
        div.setAttribute("data-nome", t);
        div.innerHTML = `<p class = 'text-lista'>${i}. ${t}</p>`;

        icon_remover.setAttribute("src", "img/lixeira-de-reciclagem.png");

        icon_remover.addEventListener("click", (evt) => {
            let quemQueroRemover = evt.target.parentNode.dataset.nome;
            

            RemoverTarefa(quemQueroRemover);

            AdicionarTarefa();

        })

        div.appendChild(icon_remover);
        lista.appendChild(div);

    })

    input_tarefa.value = "";
}




