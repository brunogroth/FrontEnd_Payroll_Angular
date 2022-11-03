import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClientRequest } from "http";
import { Funcionario } from "src/app/models/funcionario";

@Component({
  selector: "app-cadastrar-funcionario",
  templateUrl: "./cadastrar-funcionario.component.html",
  styleUrls: ["./cadastrar-funcionario.component.css"],
})
export class CadastrarFuncionarioComponent implements OnInit {
  nome: string = "";
  cpf: string = "";
  errormessage!: string;

  constructor(private http : HttpClient,
    private router: Router) {}

  ngOnInit(): void {}

  cadastrar(): void {
    let funcionario : Funcionario = {
      name: this.nome,
      cpf : this.cpf,
      wage: 950,
      email: "awawa@gmail.com",
      birth: "2022-10-27"

    };

    //Configurando a requisição para a API
    
    this.http.post<Funcionario>("https://localhost:7277/api/Employee/register", funcionario)
    //Executar a requisição
    .subscribe({
      //Caso a requisição for bem sucedida cai no next
      next: (funcionario) => {
        this.router.navigate(["pages/funcionario/listar"]);
      },
      //Caso dê erro
      error: (error) => {
        if(error.status == 400){
          this.errormessage = "Erro de Validação. Revise os dados e tente novamente.";
        }else if(error.status == 0){
          this.errormessage="A WebAPI está inacessível.";
        }
      }
    });


  }
}
