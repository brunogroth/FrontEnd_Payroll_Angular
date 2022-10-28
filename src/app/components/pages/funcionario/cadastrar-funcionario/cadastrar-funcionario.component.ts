import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
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

  constructor(private http : HttpClient) {}

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
      next : (funcionario) => {
        console.log("Funcionário gravado ",funcionario)//Caso a requisição for bem sucedida
      }
    });


  }
}
