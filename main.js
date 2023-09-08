alert("Este ejercicio de cajero automático usa las siguientes cuentas y contraseñas: Alberto-1234, Carlos-2345, Felipe-3456");

var buttonAccess = document.getElementById('buttonAccess');
var datos = document.getElementById('inputF');

//ITERACIÓN ACCESO
buttonAccess.addEventListener("click", function(event){
    event.preventDefault();
    // Definimos como variables los datos introducidos
    var inputUser = document.getElementById('inputUserName').value.toLowerCase();
    var inputPassWord = document.getElementById('inputPassWord').value;
    // Iteramos con un for para encontrar si el usuario y el password están correctos
    for (let i=0;i<cuentas.length;i++){
        // Si están correctos los datos:
        if(inputUser == cuentas[i].userName && inputPassWord == cuentas[i].password){
            // Definimos variable de acceso como True
            activeUser = inputUser;
            access = true;
            // Colapsamos input form
            datos.classList.add("d-none");
            // Mostramos bienvenida y opciones a usuario
            var insideAccount = document.getElementById("insideAccount");
            insideAccount.classList.toggle("d-none")
            var usuarioDisplay1 = document.getElementById('usuarioDisplay1')
            usuarioDisplay1.innerHTML += activeUser.charAt(0).toUpperCase() + activeUser.substring(1);
            var usuarioDisplay2 = document.getElementById('usuarioDisplay2')
            usuarioDisplay2.innerHTML += activeUser.charAt(0).toUpperCase() + activeUser.substring(1);
            // Definimos saldo del usuario, usando localStorage
            saldoDisplay = document.getElementById('saldoDisplay')

            if(localStorage.getItem(activeUser)==null){
                userSaldo = cuentas[i].saldo;
            }else{
                userSaldo = parseInt(localStorage.getItem(activeUser));
            }

            return;
        }
        // Si no están correctos los datos, mostramos alerta y dejamos que intente de nuevo:
        else{
            access = false;
        }
    }
    if(access == false){
        swal.fire("",'Usuario o Contraseña incorrectos. Intente de nuevo.',"error");
    }
});

// MOSTRAR SALDO
buttonSaldo.addEventListener("click", function(event1){
    event1.preventDefault();
    // Mostrar saldo
    displaySaldo = document.getElementById("saldoDisplay");
    if (displaySaldo.classList.contains("opacity-0") == true){
        // Mostrar saldo
        displaySaldo.classList.remove("opacity-0")
        saldoDisplay.innerHTML += '$' + userSaldo
        // Ocultar botón
        var buttonSaldo = document.getElementById("buttonSaldo");
        buttonSaldo.classList.add("d-none")
    }
});

// HACER DEPÓSITO
buttonDeposito.addEventListener("click", function(event2){
    event2.preventDefault();

    Swal
        .fire({
            title: "Depósito",
            inputLabel: "¿Cuánto deseas depositar?",
            inputPlaceholder: 'Monto',
            input: "number",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        })
        .then(resultado => {
            if (resultado.value) {
                var depo = parseInt(resultado.value);

                if(depo>0){
                    if(userSaldo + depo <= 990){
                        for(let i=0; i<cuentas.length;i++){
                            if(cuentas[i].userName == activeUser){
                                userSaldo = userSaldo+depo;
                                cuentas[i].saldo = userSaldo;

                                localStorage.setItem(cuentas[i].userName,userSaldo);

                                displaySaldo = document.getElementById("saldoDisplay");
                                document.getElementById("saldoDisplay").innerHTML = "";
                                if (displaySaldo.classList.contains("opacity-0") == true){
                                    // Mostrar saldo
                                    displaySaldo.classList.remove("opacity-0")
                                    var buttonSaldo = document.getElementById("buttonSaldo");
                                    buttonSaldo.classList.add("d-none")
                                }
                                saldoDisplay.innerHTML += '$' + userSaldo;
                                swal.fire("",`¡Depósito exitoso por $${depo} pesos! <br> <br>Tu nuevo saldo es de $${userSaldo} pesos`,"success");
                            }
                        }    
                    }
                    else if(userSaldo + depo > 990){
                        swal.fire("","No puedes tener más de $990 pesos en tu cuenta, intenta otro monto","warning");
                    }
                    else{
                        swal.fire("","Monto incorrecto, intenta otro monto","warning");
                    }
                }else{
                swal.fire("","Monto incorrecto, intenta otro monto","warning");
                }

            }
        })
}); 

// HACER RETIRO
buttonRetiro.addEventListener("click", function(event3){
/*     retiro = parseInt(prompt("¿Cuánto vas a retirar?")); */
    event3.preventDefault();

    Swal
        .fire({
            title: "Retiro",
            inputLabel: "¿Cuánto deseas retirar?",
            inputPlaceholder: 'Monto',
            input: "number",
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        })
        .then(resultado => {
            if (resultado.value) {
                var retiro = parseInt(resultado.value);


                if(retiro>0){
                    if(userSaldo - retiro >= 10){
                        for(let i=0; i<cuentas.length;i++){
                            if(cuentas[i].userName == activeUser){
                                userSaldo = userSaldo - retiro;
                                cuentas[i].saldo = userSaldo;

                                localStorage.setItem(cuentas[i].userName,userSaldo);

                                displaySaldo = document.getElementById("saldoDisplay");
                                document.getElementById("saldoDisplay").innerHTML = "";
                                if (displaySaldo.classList.contains("opacity-0") == true){
                                    // Mostrar saldo
                                    displaySaldo.classList.remove("opacity-0")
                                    var buttonSaldo = document.getElementById("buttonSaldo");
                                    buttonSaldo.classList.add("d-none")
                                }
                                saldoDisplay.innerHTML += '$' + userSaldo;
                                swal.fire("",`¡Retiro exitoso por $${retiro} pesos! Toma tu dinero. <br> <br>Tu nuevo saldo es de $${userSaldo} pesos`,"success");
                            }
                        }    
                    }
                    else if(userSaldo - retiro < 10){
                        swal.fire("","No puedes tener menos de $10 pesos en tu cuenta, intenta otro monto","warning");
                    }
                    else{
                        swal.fire("","Monto incorrecto, intenta otro monto","warning");
                    }
                }
                else{
                    swal.fire("","Monto incorrecto, intenta otro monto","warning");
                }

            }
        })
}); 