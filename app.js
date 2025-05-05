class ValidadorCPF {
    constructor(cpfEnviado){
        this.cpfLimpo = cpfEnviado.replace(/\D+/g, '');

        console.log(`CPF Original: ${cpfEnviado}`);
        console.log(`CPF Limpo: ${this.cpfLimpo}`);
    }

    eSequencia(){
        const primeiroDigito = this.cpfLimpo[0];
        const sequencia = primeiroDigito.repeat(this.cpfLimpo.length);
        return sequencia === this.cpfLimpo;
    }

    validacoes(){
        if(this.cpfLimpo.length !== 11){
            console.log(`CPF inválido: deve ter 11 dígitos.`);
            return false;
        }

        if(this.eSequencia()){
            console.log(`CPF inválido: é uma sequência repetida`);
            return false;
        }

        console.log("Passou pelas validações básicas.");
        return true;
    }

    static criaDigito(cpfParcial){
        const cpfArray = Array.from(cpfParcial);
        let regressivo = cpfArray.length + 1;

        const total = cpfArray.reduce((acumulador, valor) =>{
            console.log(regressivo, valor, regressivo * valor);
            acumulador += (Number(valor) * regressivo);
            regressivo--;
            return acumulador;
        }, 0);

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    }

    valida() {
        if(!this.validacoes()){
            return;
        }

        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidadorCPF.criaDigito(cpfParcial);
        const digito2 = ValidadorCPF.criaDigito(cpfParcial + digito1);


        console.log(digito1);
        console.log(digito2);

        const novoCpf = cpfParcial + digito1 + digito2;
        console.log(`Novo CPF calculado: ${novoCpf}`);

        return novoCpf === this.cpfLimpo ? console.log("CPF Válido") : console.log("CPF Inválido");
    }   
}


const cpf = new ValidadorCPF('111.111.111-11');

cpf.validacoes();
cpf.valida();